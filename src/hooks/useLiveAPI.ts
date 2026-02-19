import { useEffect, useRef, useState, useCallback } from "react";
import { GoogleGenAI, LiveServerMessage, Modality } from "@google/genai";
import { SYSTEM_INSTRUCTION } from "../data";

// Audio Context and Processor for recording
const AUDIO_CTX_SAMPLE_RATE = 16000;

export function useLiveAPI() {
  const [connected, setConnected] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wsRef = useRef<any>(null); // Using any for the session object to avoid strict type issues with the preview SDK
  const audioContextRef = useRef<AudioContext | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const audioWorkletNodeRef = useRef<AudioWorkletNode | null>(null);
  const audioQueueRef = useRef<string[]>([]);
  const isPlayingRef = useRef(false);
  const currentSourceRef = useRef<AudioBufferSourceNode | null>(null);

  // Initialize Audio Context
  const ensureAudioContext = async () => {
    if (!audioContextRef.current) {
      audioContextRef.current = new AudioContext({ sampleRate: 24000 });
    } else if (audioContextRef.current.state === 'suspended') {
      await audioContextRef.current.resume();
    }
    return audioContextRef.current;
  };

  // Play audio chunk
  const playAudioChunk = async (base64Audio: string) => {
    try {
      const ctx = await ensureAudioContext();
      const binaryString = window.atob(base64Audio);
      const len = binaryString.length;
      const bytes = new Uint8Array(len);
      for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }
      
      // Decode audio data
      // Note: In a real production app, we should use a custom PCM decoder for streaming
      // to avoid the overhead of decodeAudioData for every chunk, but for this preview
      // decodeAudioData is often sufficient for short chunks if the format is supported.
      // However, the Live API returns raw PCM usually. 
      // Let's assume the model returns PCM 24kHz as per docs.
      
      // Create buffer for PCM data (1 channel, 24kHz)
      const pcmData = new Int16Array(bytes.buffer);
      const float32Data = new Float32Array(pcmData.length);
      for (let i = 0; i < pcmData.length; i++) {
        float32Data[i] = pcmData[i] / 32768.0;
      }
      
      const buffer = ctx.createBuffer(1, float32Data.length, 24000);
      buffer.getChannelData(0).set(float32Data);
      
      const source = ctx.createBufferSource();
      source.buffer = buffer;
      source.connect(ctx.destination);
      
      currentSourceRef.current = source;
      
      source.onended = () => {
        isPlayingRef.current = false;
        processAudioQueue();
      };
      
      source.start();
      setIsSpeaking(true);
    } catch (err) {
      console.error("Error playing audio:", err);
      isPlayingRef.current = false;
      processAudioQueue();
    }
  };

  const processAudioQueue = () => {
    if (isPlayingRef.current || audioQueueRef.current.length === 0) {
      if (audioQueueRef.current.length === 0) {
        setIsSpeaking(false);
      }
      return;
    }
    
    isPlayingRef.current = true;
    const nextChunk = audioQueueRef.current.shift();
    if (nextChunk) {
      playAudioChunk(nextChunk);
    }
  };

  const connect = async () => {
    try {
      setError(null);
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      
      const session = await ai.live.connect({
        model: "gemini-2.5-flash-native-audio-preview-09-2025",
        config: {
          responseModalities: [Modality.AUDIO],
          systemInstruction: { parts: [{ text: SYSTEM_INSTRUCTION }] },
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: "Kore" } },
          },
        },
        callbacks: {
          onopen: () => {
            console.log("Connected to Live API");
            setConnected(true);
          },
          onmessage: (message: LiveServerMessage) => {
            // Handle audio output
            const base64Audio = message.serverContent?.modelTurn?.parts?.[0]?.inlineData?.data;
            if (base64Audio) {
              audioQueueRef.current.push(base64Audio);
              processAudioQueue();
            }
            
            if (message.serverContent?.interrupted) {
              // Clear queue and stop current playback
              audioQueueRef.current = [];
              if (currentSourceRef.current) {
                currentSourceRef.current.stop();
              }
              isPlayingRef.current = false;
              setIsSpeaking(false);
            }
          },
          onclose: () => {
            console.log("Disconnected from Live API");
            setConnected(false);
            setIsRecording(false);
          },
          onerror: (err) => {
            console.error("Live API Error:", err);
            setError("Connection error. Please try again.");
            setConnected(false);
          }
        }
      });
      
      wsRef.current = session;
      return true;
    } catch (err) {
      console.error("Failed to connect:", err);
      setError("Failed to connect to AI service.");
      return false;
    }
  };

  const disconnect = () => {
    if (wsRef.current) {
      // The SDK might not have a close method exposed directly on the session promise result in all versions,
      // but usually it does. If not, we just drop the ref.
      // Checking if close exists
      // @ts-ignore
      if (typeof wsRef.current.close === 'function') {
         // @ts-ignore
        wsRef.current.close();
      }
      wsRef.current = null;
    }
    setConnected(false);
    stopRecording();
  };

  const startRecording = async () => {
    if (!wsRef.current || !connected) {
       const success = await connect();
       if (!success) return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: {
        sampleRate: 16000,
        channelCount: 1,
        echoCancellation: true
      } });
      
      mediaStreamRef.current = stream;
      
      // Setup Audio Worklet for processing
      // For simplicity in this environment, we'll use a ScriptProcessor (deprecated but easier to inline)
      // or just simple interval reading if we can't load external worklet files easily.
      // Actually, let's use a simple base64 conversion in a ScriptProcessorNode for now.
      
      const ctx = new AudioContext({ sampleRate: 16000 });
      const source = ctx.createMediaStreamSource(stream);
      const processor = ctx.createScriptProcessor(4096, 1, 1);
      
      processor.onaudioprocess = (e) => {
        if (!wsRef.current) return;
        
        const inputData = e.inputBuffer.getChannelData(0);
        
        // Convert float32 to int16
        const pcmData = new Int16Array(inputData.length);
        for (let i = 0; i < inputData.length; i++) {
          pcmData[i] = Math.max(-1, Math.min(1, inputData[i])) * 0x7FFF;
        }
        
        // Convert to base64
        const buffer = new Uint8Array(pcmData.buffer);
        let binary = '';
        for (let i = 0; i < buffer.byteLength; i++) {
          binary += String.fromCharCode(buffer[i]);
        }
        const base64 = window.btoa(binary);
        
        wsRef.current.sendRealtimeInput({
          media: {
            mimeType: "audio/pcm;rate=16000",
            data: base64
          }
        });
      };
      
      source.connect(processor);
      processor.connect(ctx.destination); // Needed for the processor to run
      
      audioWorkletNodeRef.current = processor as any; // Storing as any to fit ref type
      setIsRecording(true);
      
    } catch (err) {
      console.error("Error starting recording:", err);
      setError("Could not access microphone.");
    }
  };

  const stopRecording = () => {
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach(track => track.stop());
      mediaStreamRef.current = null;
    }
    if (audioWorkletNodeRef.current) {
      audioWorkletNodeRef.current.disconnect();
      audioWorkletNodeRef.current = null;
    }
    setIsRecording(false);
  };

  const toggleConnection = async () => {
    if (connected) {
      disconnect();
    } else {
      await startRecording();
    }
  };

  const sendText = (text: string) => {
    if (!wsRef.current) {
      console.error("Not connected");
      return;
    }
    wsRef.current.send({
      clientContent: {
        turns: [{ role: "user", parts: [{ text }] }],
        turnComplete: true
      }
    });
  };

  useEffect(() => {
    return () => {
      disconnect();
    };
  }, []);

  return {
    connected,
    isRecording,
    isSpeaking,
    error,
    toggleConnection,
    connect,
    disconnect,
    sendText
  };
}
