import React from 'react';
import MapView from '../components/MapView';

export default function MapPage() {
  return (
    <div className="h-screen w-full relative">
      <MapView />
      
      {/* Overlay UI */}
      <div className="absolute top-6 left-6 z-[1000]">
        <h1 className="text-2xl font-bold text-white drop-shadow-md">Lonar Explorer</h1>
        <p className="text-[10px] text-neon-blue uppercase tracking-widest font-bold">Interactive Satellite Map</p>
      </div>

      <div className="absolute bottom-28 right-6 z-[1000] flex flex-col gap-3">
        <button className="p-4 bg-meteor-orange rounded-full shadow-xl text-white">
          <span className="text-xs font-bold">SOS</span>
        </button>
      </div>
    </div>
  );
}
