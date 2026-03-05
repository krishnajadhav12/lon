import React from 'react';
import { NavLink } from 'react-router-dom';
import { Map, Compass, MessageSquare, Info, LayoutDashboard, Leaf } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function Navbar() {
  const { t } = useLanguage();

  const navItems = [
    { to: '/', icon: Info, label: t('home') },
    { to: '/map', icon: Map, label: t('map') },
    { to: '/treasure', icon: Compass, label: t('quest') },
    { to: '/guide', icon: MessageSquare, label: t('guide') },
    { to: '/biodiversity', icon: Leaf, label: t('nature') },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-[2000] bg-cosmic-black/80 backdrop-blur-xl border-t border-white/10 px-6 pb-6 pt-3">
      <div className="max-w-md mx-auto flex justify-between items-center">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) => `
              flex flex-col items-center gap-1 transition-all
              ${isActive ? 'text-neon-blue scale-110' : 'text-gray-500 hover:text-white'}
            `}
          >
            <item.icon size={20} />
            <span className="text-[10px] font-medium uppercase tracking-tighter">{item.label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
