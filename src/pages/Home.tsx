import React from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Map as MapIcon, Compass, Play, ArrowRight, Globe, Camera, Shield } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import LanguageSelector from '../components/LanguageSelector';

export default function Home() {
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <div className="min-h-screen pb-24">
      {/* Hero Section */}
      <section className="relative h-[70vh] flex flex-col items-center justify-center text-center px-6 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://picsum.photos/seed/lonar-hero/1920/1080" 
            alt="Lonar Crater" 
            className="w-full h-full object-cover opacity-40"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-cosmic-black/20 via-cosmic-black/60 to-cosmic-black" />
        </div>

        <div className="absolute top-6 right-6 z-30 flex items-center gap-2">
          <button 
            onClick={() => navigate('/admin')}
            className="p-2 bg-white/5 backdrop-blur-md border border-white/10 rounded-full text-gray-500 hover:text-neon-blue transition-colors"
          >
            <Shield size={18} />
          </button>
          <LanguageSelector />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="z-10 space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-meteor-orange/20 border border-meteor-orange/30 text-meteor-orange text-[10px] font-bold uppercase tracking-widest">
            <Sparkles size={12} />
            {t('cosmic_impact_site')}
          </div>
          <h1 className="text-5xl font-bold leading-tight">
            Lonar<span className="text-neon-blue">Verse</span>
          </h1>
          <p className="text-gray-400 text-sm max-w-xs mx-auto">
            {t('explore_mystery')}
          </p>
          
          <div className="pt-6 flex flex-col gap-3">
            <button 
              onClick={() => navigate('/map')}
              className="px-8 py-4 bg-meteor-orange text-white rounded-2xl font-bold shadow-lg shadow-meteor-orange/20 flex items-center justify-center gap-2"
            >
              {t('start_adventure')} <ArrowRight size={18} />
            </button>
            <button 
              onClick={() => navigate('/simulation')}
              className="px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl font-bold flex items-center justify-center gap-2"
            >
              <Play size={18} className="text-neon-blue" />
              {t('impact_simulation')}
            </button>
          </div>
        </motion.div>
      </section>

      {/* Quick Actions */}
      <section className="px-6 -mt-10 relative z-20 grid grid-cols-2 gap-4">
        <div 
          onClick={() => navigate('/treasure')}
          className="glass-card p-4 flex flex-col gap-3 cursor-pointer hover:bg-white/20 transition-colors"
        >
          <div className="w-10 h-10 rounded-xl bg-neon-blue/20 flex items-center justify-center text-neon-blue">
            <Compass size={24} />
          </div>
          <div>
            <h3 className="font-bold text-sm">{t('quest')}</h3>
            <p className="text-[10px] text-gray-500">Solve clues, win badges</p>
          </div>
        </div>
        <div 
          onClick={() => navigate('/360')}
          className="glass-card p-4 flex flex-col gap-3 cursor-pointer hover:bg-white/20 transition-colors"
        >
          <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center text-purple-400">
            <Globe size={24} />
          </div>
          <div>
            <h3 className="font-bold text-sm">{t('view_360')}</h3>
            <p className="text-[10px] text-gray-500">Virtual crater tour</p>
          </div>
        </div>

        <div 
          onClick={() => navigate('/photo-spots')}
          className="glass-card p-4 flex flex-col gap-3 cursor-pointer hover:bg-white/20 transition-colors col-span-2"
        >
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400">
            <Camera size={24} />
          </div>
          <div>
            <h3 className="font-bold text-sm">{t('photo_spots')}</h3>
            <p className="text-[10px] text-gray-500">Capture the perfect crater shot</p>
          </div>
        </div>
      </section>

      {/* Featured Story */}
      <section className="px-6 mt-10 space-y-4">
        <div className="flex justify-between items-end">
          <h2 className="text-xl font-bold">{t('legend_lonasura')}</h2>
          <span className="text-xs text-neon-blue font-medium">{t('read_more')}</span>
        </div>
        <div className="glass-card overflow-hidden">
          <img src="https://picsum.photos/seed/myth/600/300" alt="Mythology" className="w-full h-40 object-cover" referrerPolicy="no-referrer" />
          <div className="p-4">
            <p className="text-sm text-gray-300 line-clamp-2">
              Ancient texts speak of a demon king who hid within the earth, only to be defeated by the cosmic power of Vishnu...
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
