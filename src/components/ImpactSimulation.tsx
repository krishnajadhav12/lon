import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, RotateCcw, Info } from 'lucide-react';

export default function ImpactSimulation() {
  const [step, setStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const steps = [
    { title: "The Approach", desc: "A massive meteor weighing 2 million tonnes enters Earth's atmosphere." },
    { title: "The Impact", desc: "Striking at 90,000 km/h, the kinetic energy creates a massive explosion." },
    { title: "Crater Formation", desc: "The shockwave excavates a 1.8km wide hole in the basaltic rock." },
    { title: "The Lake", desc: "Over thousands of years, water fills the basin, creating the saline lake." }
  ];

  useEffect(() => {
    let interval: any;
    if (isPlaying) {
      interval = setInterval(() => {
        setStep(prev => (prev < steps.length - 1 ? prev + 1 : 0));
      }, 4000);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <div className="flex flex-col h-full bg-cosmic-black">
      <div className="relative flex-1 flex items-center justify-center overflow-hidden">
        {/* Background Stars */}
        <div className="absolute inset-0 opacity-30">
          {[...Array(50)].map((_, i) => (
            <div 
              key={i} 
              className="absolute bg-white rounded-full"
              style={{
                width: Math.random() * 2 + 'px',
                height: Math.random() * 2 + 'px',
                top: Math.random() * 100 + '%',
                left: Math.random() * 100 + '%',
              }}
            />
          ))}
        </div>

        {/* Animation Area */}
        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.div 
              key="step0"
              initial={{ x: -200, y: -200, opacity: 0 }}
              animate={{ x: 0, y: 0, opacity: 1 }}
              exit={{ scale: 2, opacity: 0 }}
              className="relative"
            >
              <div className="w-20 h-20 bg-meteor-orange rounded-full blur-sm shadow-[0_0_50px_#f27d26]"></div>
              <div className="absolute -top-10 -left-10 w-40 h-1 bg-gradient-to-r from-transparent to-meteor-orange rotate-45"></div>
            </motion.div>
          )}

          {step === 1 && (
            <motion.div 
              key="step1"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [1, 1.5, 1], opacity: 1 }}
              className="w-40 h-40 bg-white rounded-full blur-2xl opacity-80"
            />
          )}

          {step === 2 && (
            <motion.div 
              key="step2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="relative w-64 h-32 border-b-4 border-gray-600 rounded-[100%]"
            >
              <motion.div 
                initial={{ y: 0 }}
                animate={{ y: 20 }}
                className="absolute inset-0 bg-gray-800/50 rounded-[100%]"
              />
            </motion.div>
          )}

          {step === 3 && (
            <motion.div 
              key="step3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="relative w-64 h-32 border-b-4 border-gray-600 rounded-[100%] bg-neon-blue/20"
            >
              <div className="absolute inset-0 bg-neon-blue/40 rounded-[100%] blur-md" />
            </motion.div>
          )}
        </AnimatePresence>

        <div className="absolute bottom-10 left-0 right-0 px-6">
          <motion.div 
            key={step}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="glass-card p-4 text-center"
          >
            <h3 className="text-xl font-bold text-meteor-orange mb-1">{steps[step].title}</h3>
            <p className="text-sm text-gray-300">{steps[step].desc}</p>
          </motion.div>
        </div>
      </div>

      <div className="p-6 bg-white/5 border-t border-white/10 flex justify-center gap-4">
        <button 
          onClick={() => setIsPlaying(!isPlaying)}
          className="flex items-center gap-2 px-6 py-3 bg-meteor-orange rounded-full font-bold"
        >
          {isPlaying ? <RotateCcw size={20} /> : <Play size={20} />}
          {isPlaying ? "Reset" : "Start Simulation"}
        </button>
      </div>
    </div>
  );
}
