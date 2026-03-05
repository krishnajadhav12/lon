import React from 'react';
import biodiversityData from '../data/biodiversity.json';
import { motion } from 'motion/react';
import { Search, Filter } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function BiodiversityPage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen pb-24 px-6 pt-6 space-y-8">
      <header>
        <h1 className="text-3xl font-bold">{t('unique_biodiversity')}</h1>
        <p className="text-gray-400 text-sm">{t('discover_species')}</p>
      </header>

      <div className="flex gap-2">
        <div className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 flex items-center gap-2">
          <Search size={16} className="text-gray-500" />
          <input type="text" placeholder="Search species..." className="bg-transparent text-sm focus:outline-none w-full" />
        </div>
        <button className="p-3 bg-white/5 border border-white/10 rounded-xl">
          <Filter size={16} />
        </button>
      </div>

      <div className="space-y-10">
        {biodiversityData.map((category, idx) => (
          <div key={idx} className="space-y-4">
            <h2 className="text-lg font-bold text-neon-blue flex items-center gap-2">
              <span className="w-1 h-4 bg-neon-blue rounded-full"></span>
              {category.category}
            </h2>
            <div className="grid grid-cols-1 gap-4">
              {category.items.map((item, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="glass-card overflow-hidden flex"
                >
                  <img src={item.image} alt={item.name} className="w-24 h-full object-cover" referrerPolicy="no-referrer" />
                  <div className="p-4 flex-1 flex flex-col">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-bold text-sm leading-tight">{item.name}</h3>
                      <span className="text-[8px] px-1.5 py-0.5 bg-neon-blue/20 border border-neon-blue/30 rounded-full text-neon-blue uppercase font-bold tracking-tighter">
                        {item.status}
                      </span>
                    </div>
                    <p className="text-[10px] text-gray-400 line-clamp-3 mb-3">{item.description}</p>
                    <button className="mt-auto text-[10px] font-bold text-neon-blue flex items-center gap-1 hover:underline">
                      {t('learn_more')} <span className="text-lg leading-none">→</span>
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
