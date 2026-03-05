import React from 'react';
import { Camera, MapPin, Star } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const photoSpots = [
  {
    name: "Rim Overlook",
    location: "North Rim",
    tip: "Best for sunset shots. Use wide-angle lens.",
    image: "https://picsum.photos/seed/view1/400/300"
  },
  {
    name: "Temple Reflection",
    location: "Daitya Sudan",
    tip: "Capture the intricate carvings during golden hour.",
    image: "https://picsum.photos/seed/view2/400/300"
  },
  {
    name: "Pink Water Edge",
    location: "South Shore",
    tip: "Get low to the water for vibrant color contrast.",
    image: "https://picsum.photos/seed/view3/400/300"
  }
];

export default function PhotoSpots() {
  const { t } = useLanguage();

  return (
    <div className="p-6 space-y-6">
      <header>
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Camera className="text-meteor-orange" />
          {t('best_photo_spots')}
        </h2>
        <p className="text-xs text-gray-400">{t('capture_cosmic')}</p>
      </header>

      <div className="space-y-4">
        {photoSpots.map((spot, i) => (
          <div key={i} className="glass-card overflow-hidden">
            <img src={spot.image} alt={spot.name} className="w-full h-48 object-cover" referrerPolicy="no-referrer" />
            <div className="p-4 space-y-2">
              <div className="flex justify-between items-start">
                <h3 className="font-bold">{spot.name}</h3>
                <div className="flex items-center gap-1 text-yellow-500">
                  <Star size={12} fill="currentColor" />
                  <span className="text-[10px] font-bold">Top Rated</span>
                </div>
              </div>
              <div className="flex items-center gap-1 text-[10px] text-neon-blue uppercase font-bold">
                <MapPin size={10} />
                {spot.location}
              </div>
              <p className="text-xs text-gray-400 italic">" {spot.tip} "</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
