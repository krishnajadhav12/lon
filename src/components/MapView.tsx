import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import hotspots from '../data/hotspots.json';
import touristPlaces from '../data/touristplaces.json';
import { Layers, Info, Map as MapIcon, X, ArrowRight, Play } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../contexts/LanguageContext';

// Fix for default marker icons in Leaflet with React
const markerIcon = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png';
const markerShadow = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

const hotspotIcon = L.divIcon({
  className: 'custom-hotspot-container',
  html: `<div class="w-5 h-5 bg-neon-blue rounded-full border-2 border-white shadow-[0_0_15px_#00d2ff] marker-pulse"></div>`,
  iconSize: [20, 20],
  iconAnchor: [10, 10]
});

const LONAR_COORDS: [number, number] = [19.985, 76.511];

const MapModeControl = ({ mode, setMode }: { mode: string, setMode: (m: string) => void }) => {
  return (
    <div className="absolute top-4 right-4 z-[1000] flex flex-col gap-2">
      <button 
        onClick={() => setMode(mode === 'satellite' ? 'standard' : 'satellite')}
        className="p-3 bg-cosmic-black/80 backdrop-blur-md border border-white/20 rounded-full text-white shadow-xl hover:bg-meteor-orange transition-colors"
      >
        {mode === 'satellite' ? <MapIcon size={20} /> : <Layers size={20} />}
      </button>
    </div>
  );
};

export default function MapView() {
  const [mode, setMode] = useState('satellite');
  const [selectedSpot, setSelectedSpot] = useState<any>(null);
  const navigate = useNavigate();
  const { t } = useLanguage();

  const satelliteUrl = "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}";
  const standardUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";

  return (
    <div className="relative w-full h-full overflow-hidden">
      <MapContainer 
        center={LONAR_COORDS} 
        zoom={14} 
        scrollWheelZoom={true}
        className="z-0"
        zoomControl={false}
      >
        <TileLayer
          url={mode === 'satellite' ? satelliteUrl : standardUrl}
          attribution='&copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
        />
        
        {/* Hotspots */}
        {hotspots.map((spot) => (
          <Marker 
            key={spot.id} 
            position={spot.coords as [number, number]}
            icon={hotspotIcon}
            eventHandlers={{
              click: () => setSelectedSpot(spot),
            }}
          />
        ))}

        {/* Tourist Places */}
        {touristPlaces.map((place, idx) => (
            <Marker 
                key={idx} 
                position={place.coords as [number, number]}
                icon={L.divIcon({
                    className: 'bg-white rounded-full border-2 border-meteor-orange flex items-center justify-center marker-pulse',
                    html: `<div class="w-2 h-2 bg-meteor-orange rounded-full" style="--pulse-color: rgba(242, 125, 38, 0.4)"></div>`,
                    iconSize: [12, 12]
                })}
            />
        ))}
      </MapContainer>
      
      <MapModeControl mode={mode} setMode={setMode} />

      {/* Side Panel Popup */}
      <AnimatePresence>
        {selectedSpot && (
          <>
            {/* Backdrop for mobile to close when clicking outside */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedSpot(null)}
              className="absolute inset-0 bg-black/40 z-[1500]"
            />
            
            <motion.div
              initial={{ x: '100%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '100%', opacity: 0 }}
              transition={{ 
                type: 'spring', 
                damping: 30, 
                stiffness: 300,
                opacity: { duration: 0.2 }
              }}
              className="absolute top-0 right-0 h-full w-[85%] max-w-sm z-[2000] bg-cosmic-black/95 backdrop-blur-xl border-l border-white/10 shadow-2xl flex flex-col"
            >
              <div className="relative h-48 flex-shrink-0">
                <img 
                  src={selectedSpot.image} 
                  alt={selectedSpot.title} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-cosmic-black via-transparent to-transparent" />
                <button 
                  onClick={() => setSelectedSpot(null)}
                  className="absolute top-4 right-4 p-2 bg-black/40 backdrop-blur-md rounded-full border border-white/20 text-white hover:bg-meteor-orange transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="p-6 flex-1 overflow-y-auto space-y-4 no-scrollbar">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-1">{selectedSpot.title}</h3>
                  <div className="flex items-center gap-2 text-neon-blue text-xs font-bold uppercase tracking-widest">
                    <Info size={12} />
                    {t('cosmic_hotspot')}
                  </div>
                </div>

                <p className="text-gray-300 text-sm leading-relaxed">
                  {selectedSpot.description}
                </p>

                {selectedSpot.video && (
                  <div className="space-y-2">
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                      <Play size={12} className="text-neon-blue" />
                      {t('video_preview')}
                    </h4>
                    <div className="aspect-video rounded-xl overflow-hidden bg-white/5 border border-white/10 relative group">
                      <video 
                        src={selectedSpot.video} 
                        className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity"
                        muted
                        loop
                        playsInline
                        autoPlay
                      />
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="w-10 h-10 rounded-full bg-neon-blue/20 backdrop-blur-md flex items-center justify-center text-neon-blue border border-neon-blue/30 group-hover:scale-110 transition-transform">
                          <Play size={20} fill="currentColor" />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="glass-card p-4 space-y-2">
                  <h4 className="text-xs font-bold text-meteor-orange uppercase tracking-wider">{t('quick_fact')}</h4>
                  <p className="text-xs text-gray-400 italic">
                    {selectedSpot.fun_fact}
                  </p>
                </div>

                <button 
                  onClick={() => navigate(`/story/${selectedSpot.id}`)}
                  className="w-full py-4 bg-meteor-orange text-white rounded-xl font-bold shadow-lg flex items-center justify-center gap-2 hover:bg-white hover:text-cosmic-black transition-all group"
                >
                  {t('explore_story')}
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      
      <div className="absolute bottom-24 left-4 z-[1000] glass-card p-3 flex items-center gap-2">
        <div className="w-3 h-3 bg-blue-500 rounded-full marker-pulse"></div>
        <span className="text-xs font-medium">{t('live_hotspots')}</span>
      </div>
    </div>
  );
}
