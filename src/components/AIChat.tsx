import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Bot, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import hotspots from '../data/hotspots.json';
import { useLanguage } from '../contexts/LanguageContext';

interface Message {
  role: 'user' | 'bot';
  text: string;
}

export default function AIChat() {
  const { t, language } = useLanguage();
  const [messages, setMessages] = useState<Message[]>([
    { role: 'bot', text: language === 'mr' ? "नमस्ते! मी तुमचा लोणारवर्स मार्गदर्शक आहे. विवर, त्याचा इतिहास किंवा स्थानिक दंतकथांबद्दल मला काहीही विचारा!" : language === 'hi' ? "नमस्ते! मैं आपका लोनारवर्स गाइड हूं। क्रेटर, इसके इतिहास या स्थानीय किंवदंतियों के बारे में मुझसे कुछ भी पूछें!" : "Namaste! I am your LonarVerse guide. Ask me anything about the crater, its history, or local legends!" }
  ]);
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg = { role: 'user' as const, text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');

    // Simple simulated AI response logic
    setTimeout(() => {
      let response = language === 'mr' ? "हा एक चांगला प्रश्न आहे! लोणार सरोवर हे एक अद्वितीय भौगोलिक ठिकाण आहे. तुम्हाला त्याच्या विज्ञानाबद्दल किंवा पौराणिक कथांबद्दल काही विशेष जाणून घ्यायचे आहे का?" : language === 'hi' ? "यह एक बहुत अच्छा सवाल है! लोनार झील एक अद्वितीय भूगर्भीय स्थल है। क्या विज्ञान या पौराणिक कथाओं के बारे में कुछ विशेष है जो आप जानना चाहेंगे?" : "That's a great question! Lonar Lake is a unique geological site. Is there something specific about its science or mythology you'd like to know?";
      
      const lowerInput = input.toLowerCase();
      if (lowerInput.includes('what is lonar') || lowerInput.includes('लोणार काय आहे') || lowerInput.includes('लोनार क्या है')) {
        response = language === 'mr' ? "लोणार सरोवर हे भारतातील महाराष्ट्र राज्यातील बुलढाणा जिल्ह्यातील लोणार येथे स्थित एक खारट, अल्कधर्मी सरोवर आहे. हे प्लिस्टोसीन युगात उल्कापातामुळे तयार झाले होते." : language === 'hi' ? "लोनार झील भारत के महाराष्ट्र राज्य के बुलढाणा जिले के लोनार में स्थित एक खारी, क्षारीय झील है। यह प्लेइस्टोसिन युग के दौरान एक उल्का प्रभाव द्वारा बनाई गई थी।" : "Lonar Lake is a saline, alkaline lake located at Lonar in Buldhana district, Maharashtra, India. It was created by a meteor impact during the Pleistocene Epoch.";
      } else if (lowerInput.includes('how was it formed') || lowerInput.includes('meteor') || lowerInput.includes('कसे तयार झाले') || lowerInput.includes('कैसे बना')) {
        response = language === 'mr' ? "हे सुमारे ५२,००० वर्षांपूर्वी तयार झाले होते जेव्हा २ दशलक्ष टन वजनाची उल्का ९०,००० किमी/तास वेगाने पृथ्वीवर आदळली होती!" : language === 'hi' ? "यह लगभग 52,000 साल पहले बना था जब 2 मिलियन टन वजन का एक उल्का 90,000 किमी/घंटा की गति से पृथ्वी से टकराया था!" : "It was formed about 52,000 years ago when a meteor weighing 2 million tonnes hit the earth at a speed of 90,000 km/h!";
      } else if (lowerInput.includes('pink') || lowerInput.includes('गुलाबी')) {
        response = language === 'mr' ? "जून २०२० मध्ये सरोवराचे पाणी गुलाबी झाले! हे मोठ्या प्रमाणात मीठ-प्रेमी 'Haloarchaea' सूक्ष्मजीव आणि कमी पाण्याच्या पातळीमुळे झाले." : language === 'hi' ? "जून 2020 में झील का पानी गुलाबी हो गया! यह नमक-प्रेमी 'हेलोआर्चिया' रोगाणुओं और कम पानी के स्तर की बड़ी उपस्थिति के कारण था।" : "In June 2020, the lake water turned pink! This was due to a large presence of salt-loving 'Haloarchaea' microbes and low water levels.";
      }

      setMessages(prev => [...prev, { role: 'bot', text: response }]);
    }, 1000);
  };

  return (
    <div className="flex-1 flex flex-col bg-cosmic-black/50 backdrop-blur-lg rounded-t-3xl overflow-hidden border-t border-white/10">
      <div className="p-4 border-b border-white/10 flex items-center gap-3 bg-cosmic-purple/30">
        <div className="w-10 h-10 rounded-full bg-meteor-orange flex items-center justify-center shadow-lg">
          <Bot className="text-white" size={20} />
        </div>
        <div>
          <h3 className="font-bold text-sm">{t('ai_tour_guide')}</h3>
          <p className="text-[10px] text-neon-blue flex items-center gap-1">
            <Sparkles size={10} /> {t('online_ready')}
          </p>
        </div>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar">
        <AnimatePresence initial={false}>
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                msg.role === 'user' 
                  ? 'bg-meteor-orange text-white rounded-tr-none' 
                  : 'bg-white/10 text-white border border-white/10 rounded-tl-none'
              }`}>
                {msg.text}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="p-4 bg-white/5 border-t border-white/10">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder={t('ask_anything')}
            className="flex-1 bg-white/10 border border-white/20 rounded-full px-4 py-2 text-sm focus:outline-none focus:border-neon-blue transition-colors"
          />
          <button 
            onClick={handleSend}
            className="w-10 h-10 rounded-full bg-neon-blue flex items-center justify-center text-cosmic-black hover:bg-white transition-colors"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
