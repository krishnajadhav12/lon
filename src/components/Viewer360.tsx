import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Move, Maximize2, Minimize2, Map as MapIcon } from 'lucide-react';

const viewpoints = [
  { id: 'rim', name: 'Crater Rim', image: 'https://picsum.photos/seed/rim/1200/600' },
  { id: 'shore', name: 'Lake Shore', image: 'https://picsum.photos/seed/shore/1200/600' },
  { id: 'temple', name: 'Temple Complex', image: 'https://picsum.photos/seed/complex/1200/600' },
  { id: 'forest', name: 'Forest Trail', image: 'https://picsum.photos/seed/trail/1200/600' },
];

export default function Viewer360() {
  const [activeView, setActiveView] = useState(viewpoints[0]);
  const [isPanning, setIsPanning] = useState(false);
  const [offset, setOffset] = useState(0);

  // Simple simulated 360 pan
  useEffect(() => {
    let interval: any;
    if (!isPanning) {
      interval = setInterval(() => {
        setOffset(prev => (prev + 0.1) % 100);
      }, 50);
    }
    return () => clearInterval(interval);
  }, [isPanning]);

  return (
    <div className="relative h-full bg-black overflow-hidden">
      <div 
        className="absolute inset-0 w-[200%] h-full transition-transform duration-100 ease-linear"
        style={{ 
          backgroundImage: `url(${activeView.image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          transform: `translateX(-${offset}%)`
        }}
        onMouseDown={() => setIsPanning(true)}
        onMouseUp={() => setIsPanning(false)}
      />

      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60 pointer-events-none" />

      <div className="absolute top-6 left-6 right-6 flex justify-between items-start pointer-events-none">
        <div className="pointer-events-auto">
          <h2 className="text-2xl font-bold text-white drop-shadow-lg">{activeView.name}</h2>
          <p className="text-xs text-neon-blue uppercase tracking-widest">Virtual 360° View</p>
        </div>
        <button className="pointer-events-auto p-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
          <Maximize2 size={20} />
        </button>
      </div>

      <div className="absolute bottom-24 left-6 right-6 pointer-events-none">
        <div className="flex gap-3 overflow-x-auto pb-4 pointer-events-auto no-scrollbar">
          {viewpoints.map(view => (
            <button
              key={view.id}
              onClick={() => setActiveView(view)}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-xs font-bold transition-all border ${
                activeView.id === view.id 
                  ? 'bg-meteor-orange border-meteor-orange text-white' 
                  : 'bg-black/40 border-white/20 text-gray-300 backdrop-blur-md'
              }`}
            >
              {view.name}
            </button>
          ))}
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-2 text-[10px] text-white/40 uppercase tracking-widest">
        <Move size={12} />
        Drag or wait to explore
      </div>
    </div>
  );
}
