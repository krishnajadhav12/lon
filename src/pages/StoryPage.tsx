import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, History, Microscope, Scroll, Leaf, Lightbulb, PlayCircle } from 'lucide-react';
import hotspots from '../data/hotspots.json';

export default function StoryPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const spot = hotspots.find(s => s.id === id);

  if (!spot) return <div className="p-10 text-center">Story not found.</div>;

  const sections = [
    { icon: History, title: "History", content: spot.history },
    { icon: Microscope, title: "Science", content: spot.science },
    { icon: Scroll, title: "Mythology", content: spot.mythology },
    { icon: Leaf, title: "Biodiversity", content: spot.biodiversity },
    { icon: Lightbulb, title: "Fun Fact", content: spot.fun_fact },
  ];

  return (
    <div className="min-h-screen pb-24">
      <div className="relative h-[40vh]">
        <img src={spot.image} alt={spot.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
        <div className="absolute inset-0 bg-gradient-to-t from-cosmic-black to-transparent" />
        <button 
          onClick={() => navigate(-1)}
          className="absolute top-6 left-6 p-2 bg-black/40 backdrop-blur-md rounded-full border border-white/20"
        >
          <ArrowLeft size={20} />
        </button>
      </div>

      <div className="px-6 -mt-10 relative z-10 space-y-8">
        <header>
          <h1 className="text-4xl font-bold mb-2">{spot.title}</h1>
          <p className="text-neon-blue text-sm font-medium">{spot.description}</p>
        </header>

        <section className="glass-card p-6 border-neon-blue/30 bg-neon-blue/5">
          <div className="flex items-center gap-3 mb-4">
            <PlayCircle className="text-neon-blue" size={24} />
            <h2 className="font-bold">Watch the Story</h2>
          </div>
          <div className="aspect-video bg-cosmic-black rounded-xl overflow-hidden border border-white/10">
            {spot.video ? (
              <video 
                src={spot.video} 
                className="w-full h-full object-cover" 
                controls 
                poster={spot.image}
              />
            ) : (
              <div className="h-full flex items-center justify-center text-center p-6">
                <p className="text-xs text-gray-500 italic">
                  "Animated story video will appear here"<br/>
                  <span className="text-[10px] mt-2 block">(Scan QR code at location to unlock)</span>
                </p>
              </div>
            )}
          </div>
        </section>

        <div className="space-y-6">
          {sections.map((section, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-2"
            >
              <div className="flex items-center gap-2 text-meteor-orange">
                <section.icon size={18} />
                <h3 className="font-bold uppercase text-xs tracking-widest">{section.title}</h3>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed">
                {section.content}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
