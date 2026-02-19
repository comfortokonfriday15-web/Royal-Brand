import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mic, X, Loader2, Volume2, MessageSquare, Send } from 'lucide-react';
import { useLiveAPI } from '../hooks/useLiveAPI';

export default function VoiceAgentWidget() {
  const { connected, isSpeaking, error, toggleConnection, sendText } = useLiveAPI();
  const [isOpen, setIsOpen] = useState(false);
  const [inputText, setInputText] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleToggle = () => {
    if (!isOpen) {
      setIsOpen(true);
      toggleConnection();
    } else {
      setIsOpen(false);
      toggleConnection(); // This will disconnect
    }
  };

  const handleSendText = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputText.trim() && connected) {
      sendText(inputText);
      setInputText("");
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="mb-4 w-80 rounded-2xl bg-white shadow-2xl border border-gray-200 overflow-hidden flex flex-col"
          >
            <div className="bg-accent-gold p-4 text-white flex justify-between items-center shrink-0">
              <div>
                <h3 className="font-serif font-bold text-lg">Robyn's Assistant</h3>
                <p className="text-xs opacity-90">AI Voice Agent • 24/7</p>
              </div>
              <button onClick={handleToggle} className="text-white/80 hover:text-white">
                <X size={20} />
              </button>
            </div>
            
            <div className="p-6 flex flex-col items-center justify-center min-h-[200px] bg-bg-cream grow">
              {error ? (
                <div className="text-red-500 text-center text-sm p-4">
                  {error}
                </div>
              ) : (
                <>
                  <div className="relative mb-6">
                    {/* Ripple effect when speaking */}
                    {isSpeaking && (
                      <>
                        <motion.div
                          animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0, 0.3] }}
                          transition={{ repeat: Infinity, duration: 2 }}
                          className="absolute inset-0 bg-accent-gold rounded-full"
                        />
                        <motion.div
                          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                          transition={{ repeat: Infinity, duration: 1.5 }}
                          className="absolute inset-0 bg-accent-gold rounded-full"
                        />
                      </>
                    )}
                    
                    <div className={`w-20 h-20 rounded-full flex items-center justify-center shadow-lg transition-colors duration-300 ${connected ? 'bg-accent-gold text-white' : 'bg-gray-200 text-gray-400'}`}>
                      {connected ? <Mic size={32} /> : <Loader2 size={32} className="animate-spin" />}
                    </div>
                  </div>
                  
                  <div className="text-center space-y-2">
                    <p className="font-medium text-text-primary">
                      {connected ? (isSpeaking ? "Speaking..." : "Listening...") : "Connecting..."}
                    </p>
                    <p className="text-xs text-gray-500 px-4">
                      Ask about properties, market trends, or Robyn's experience.
                    </p>
                  </div>
                </>
              )}
            </div>

            {/* Text Input Area */}
            <div className="p-3 bg-white border-t border-gray-100 shrink-0">
              <form onSubmit={handleSendText} className="relative flex items-center">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder={connected ? "Type a message..." : "Connecting..."}
                  disabled={!connected}
                  className="w-full bg-gray-50 border border-gray-200 rounded-full py-2 pl-4 pr-10 text-sm focus:outline-none focus:border-accent-gold focus:ring-1 focus:ring-accent-gold disabled:opacity-50"
                />
                <button 
                  type="submit" 
                  disabled={!inputText.trim() || !connected}
                  className="absolute right-2 p-1.5 bg-accent-gold text-white rounded-full hover:bg-[#B08D4B] disabled:opacity-50 disabled:hover:bg-accent-gold transition-colors"
                >
                  <Send size={14} />
                </button>
              </form>
              <div className="mt-2 text-[10px] text-center text-gray-400">
                Powered by Gemini Native Audio
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleToggle}
        className={`h-16 w-16 rounded-full shadow-xl flex items-center justify-center transition-colors duration-300 ${isOpen ? 'bg-accent-charcoal text-white' : 'bg-accent-gold text-white'}`}
      >
        {isOpen ? <X size={28} /> : <Mic size={28} />}
      </motion.button>
    </div>
  );
}
