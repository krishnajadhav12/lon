import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Globe } from 'lucide-react';

export default function LanguageSelector() {
  const { language, setLanguage } = useLanguage();

  const languages = [
    { code: 'en', label: 'EN' },
    { code: 'mr', label: 'मराठी' },
    { code: 'hi', label: 'हिंदी' },
  ];

  return (
    <div className="flex items-center gap-2 bg-white/5 backdrop-blur-md border border-white/10 rounded-full px-3 py-1.5">
      <Globe size={14} className="text-neon-blue" />
      <div className="flex gap-2">
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => setLanguage(lang.code as any)}
            className={`text-[10px] font-bold transition-colors ${
              language === lang.code ? 'text-neon-blue' : 'text-gray-500 hover:text-white'
            }`}
          >
            {lang.label}
          </button>
        ))}
      </div>
    </div>
  );
}
