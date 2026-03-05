import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, X, Send, Bot, Sparkles, Minimize2, Maximize2 } from 'lucide-react';

interface Message {
  role: 'user' | 'bot';
  text: string;
}

export default function FloatingChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'bot', text: "I'm your Lonar AI Guide. How can I help your adventure today?" }
  ]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen, isMinimized]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg = { role: 'user' as const, text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');

    setTimeout(() => {
      let response = "That's interesting! Lonar Lake is full of such mysteries. Would you like to know about the meteor impact or the ancient temples?";
      
      const lowerInput = input.toLowerCase();
      if (lowerInput.includes('what is lonar')) {
        response = "Lonar Lake is a unique saline-alkaline lake formed by a meteorite impact in basaltic rock about 52,000 years ago.";
      } else if (lowerInput.includes('formed') || lowerInput.includes('meteor')) {
        response = "It was formed when a 2-million-tonne meteor hit Earth at 90,000 km/h. It's the only such crater in the world!";
      } else if (lowerInput.includes('pink')) {
        response = "The water turned pink in 2020 due to 'Haloarchaea' microbes reacting to high salinity and low water levels.";
      }

      setMessages(prev => [...prev, { role: 'bot', text: response }]);
    }, 800);
  };

  return (
    <div className="fixed bottom-24 right-4 z-[3000] flex flex-col items-end pointer-events-none">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20, transformOrigin: 'bottom right' }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              y: 0,
              height: isMinimized ? '60px' : '400px',
              width: '300px'
            }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="glass-card mb-4 overflow-hidden flex flex-col pointer-events-auto shadow-2xl border-neon-blue/20"
          >
            {/* Header */}
            <div className="p-3 bg-cosmic-purple/80 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-meteor-orange flex items-center justify-center">
                  <Bot size={14} className="text-white" />
                </div>
                <span className="text-xs font-bold">Lonar AI Guide</span>
              </div>
              <div className="flex items-center gap-1">
                <button 
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="p-1 hover:bg-white/10 rounded"
                >
                  {isMinimized ? <Maximize2 size={14} /> : <Minimize2 size={14} />}
                </button>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-1 hover:bg-white/10 rounded"
                >
                  <X size={14} />
                </button>
              </div>
            </div>

            {!isMinimized && (
              <>
                {/* Messages */}
                <div 
                  ref={scrollRef}
                  className="flex-1 overflow-y-auto p-4 space-y-3 no-scrollbar bg-cosmic-black/40"
                >
                  {messages.map((msg, i) => (
                    <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[85%] p-2.5 rounded-xl text-xs ${
                        msg.role === 'user' 
                          ? 'bg-meteor-orange text-white rounded-tr-none' 
                          : 'bg-white/10 text-white border border-white/10 rounded-tl-none'
                      }`}>
                        {msg.text}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Input Bar */}
                <div className="p-3 bg-white/5 border-t border-white/10">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                      placeholder="Ask me anything..."
                      className="flex-1 bg-white/10 border border-white/20 rounded-full px-3 py-1.5 text-xs focus:outline-none focus:border-neon-blue"
                    />
                    <button 
                      onClick={handleSend}
                      className="w-8 h-8 rounded-full bg-neon-blue flex items-center justify-center text-cosmic-black"
                    >
                      <Send size={14} />
                    </button>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`pointer-events-auto w-14 h-14 rounded-full flex items-center justify-center shadow-xl transition-colors ${
          isOpen ? 'bg-white text-cosmic-black' : 'bg-neon-blue text-cosmic-black'
        }`}
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
        {!isOpen && (
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute -top-1 -right-1 w-4 h-4 bg-meteor-orange rounded-full border-2 border-cosmic-black"
          />
        )}
      </motion.button>
    </div>
  );
}
