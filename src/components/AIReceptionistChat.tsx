import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Bot, User, MessageSquare, ArrowRight, Loader2, Calendar, Phone, Sparkles } from 'lucide-react';

interface Message {
  role: 'user' | 'model';
  text: string;
  time: string;
}

interface AIReceptionistChatProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AIReceptionistChat: React.FC<AIReceptionistChatProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'model',
      text: "Hello! Welcome to Smart Realty. 🌟 I am your **AI Receptionist**.\n\nI can answer questions about our luxury properties in Lagos and Abuja, share prices, collect your brief details, and coordinate immediate viewings.\n\nHow can I guide your real estate journey today?",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isLoading]);

  const handleSend = async (textToSend: string) => {
    if (!textToSend.trim() || isLoading) return;

    const userMsg: Message = {
      role: 'user',
      text: textToSend,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      // Map frontend Message history format to server/Gemini expected format:
      // Turn history containing {role, text}
      const historyPayload = messages.map((m) => ({
        role: m.role,
        text: m.text
      }));

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: textToSend,
          history: historyPayload
        })
      });

      if (!response.ok) {
        throw new Error('Could not contact the AI receptionist server.');
      }

      const data = await response.json();
      const modelMsg: Message = {
        role: 'model',
        text: data.text,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, modelMsg]);
    } catch (error: any) {
      console.error(error);
      const errMsg: Message = {
        role: 'model',
        text: "I apologize, but I am experiencing a brief communication issue with our network. Please try again or feel free to reach Smart Realty directly on WhatsApp at [wa.me/2348000000000](https://wa.me/2348000000000).",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, errMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const parseMarkdown = (text: string) => {
    // Basic Markdown Parser for bold text, line breaks, and links
    let html = text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" class="text-accent-gold underline hover:text-white">$1</a>')
      .split('\n')
      .join('<br />');
    return <span dangerouslySetInnerHTML={{ __html: html }} />;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/60 backdrop-blur-sm p-0 md:p-4">
      {/* Overlay Back closer */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Main Panel */}
      <motion.div
        initial={{ opacity: 0, x: '100%' }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="relative w-full md:max-w-md h-full md:h-[650px] bg-primary-blue border-l md:border border-white/10 flex flex-col md:rounded-[2.5rem] shadow-2xl overflow-hidden text-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-white/10 bg-gradient-to-r from-primary-blue via-primary-blue to-accent-gold/10 flex justify-between items-center shrink-0">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-accent-gold/20 text-accent-gold flex items-center justify-center border border-accent-gold/30 relative">
              <Bot size={22} />
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-primary-blue" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="font-serif text-lg font-light">AI Receptionist</h4>
                <span className="text-[9px] bg-green-500/10 text-green-400 border border-green-500/20 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">Online</span>
              </div>
              <p className="text-[10px] text-white/40 tracking-wider">Smart Realty Concierge Service</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-white/60 hover:text-white hover:bg-white/5 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content Box */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Map through conversation history */}
          <div className="space-y-6">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex gap-4 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {m.role === 'model' && (
                  <div className="w-8 h-8 rounded-full bg-accent-gold/10 text-accent-gold flex items-center justify-center border border-accent-gold/20 shrink-0 self-start">
                    <Bot size={14} />
                  </div>
                )}
                
                <div className="flex flex-col max-w-[80%]">
                  <div
                    className={`rounded-2xl p-4 text-sm font-sans leading-relaxed ${
                      m.role === 'user'
                        ? 'bg-accent-gold text-white rounded-tr-none'
                        : 'bg-white/5 border border-white/10 text-white/90 rounded-tl-none'
                    }`}
                  >
                    {parseMarkdown(m.text)}
                  </div>
                  <span className={`text-[9px] text-white/30 mt-1.5 font-mono ${m.role === 'user' ? 'text-right' : 'text-left'}`}>
                    {m.time}
                  </span>
                </div>

                {m.role === 'user' && (
                  <div className="w-8 h-8 rounded-full bg-white/10 text-white flex items-center justify-center border border-white/10 shrink-0 self-start">
                    <User size={14} />
                  </div>
                )}
              </div>
            ))}

            {/* Simulated typing/thinking state */}
            {isLoading && (
              <div className="flex gap-4 items-center text-white/40 text-xs italic font-sans">
                <div className="w-8 h-8 rounded-full bg-accent-gold/10 text-accent-gold flex items-center justify-center border border-accent-gold/20 shrink-0 animate-pulse">
                  <Bot size={14} />
                </div>
                <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-3 rounded-2xl rounded-tl-none">
                  <Loader2 size={12} className="animate-spin text-accent-gold" />
                  <span>AI Receptionist is checking properties...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend(input);
          }}
          className="p-4 border-t border-white/10 bg-primary-blue flex gap-2 items-center shrink-0"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your question (e.g. Price for Lekki Duplex...)"
            className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-4 py-4 text-sm text-white placeholder-white/40 focus:outline-none focus:border-accent-gold transition-all"
            disabled={isLoading}
          />
          <button
            type="submit"
            className="w-12 h-12 rounded-2xl bg-accent-gold text-white flex items-center justify-center hover:bg-accent-gold-alt transition-colors shrink-0 disabled:opacity-45"
            disabled={!input.trim() || isLoading}
          >
            <Send size={16} />
          </button>
        </form>
      </motion.div>
    </div>
  );
};
