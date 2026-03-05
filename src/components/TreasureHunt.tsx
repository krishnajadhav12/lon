import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Trophy, QrCode, ChevronRight, CheckCircle2, Users, Info } from 'lucide-react';
import treasureHuntData from '../data/treasurehunt.json';

export default function TreasureHunt() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isScanning, setIsScanning] = useState(false);
  const [points, setPoints] = useState(0);
  const [completed, setCompleted] = useState(false);

  const step = treasureHuntData[currentStep];

  const handleScan = () => {
    setIsScanning(true);
    // Simulate QR scanning
    setTimeout(() => {
      setIsScanning(false);
      setPoints(prev => prev + step.points);
      if (currentStep < treasureHuntData.length - 1) {
        setCurrentStep(prev => prev + 1);
      } else {
        setCompleted(true);
      }
    }, 2000);
  };

  if (completed) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="p-6 text-center space-y-6"
      >
        <div className="w-24 h-24 bg-meteor-orange rounded-full flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(242,125,38,0.5)]">
          <Trophy size={48} className="text-white" />
        </div>
        <h2 className="text-3xl font-bold text-meteor-orange">Lonar Explorer!</h2>
        <p className="text-gray-300">You've successfully navigated the cosmic secrets of Lonar Lake.</p>
        <div className="glass-card p-4">
          <p className="text-sm text-gray-400 uppercase tracking-widest">Total Points</p>
          <p className="text-4xl font-bold text-neon-blue">{points}</p>
        </div>
        <button className="w-full py-4 bg-neon-blue text-cosmic-black font-bold rounded-xl shadow-lg">
          Download Digital Souvenir
        </button>
      </motion.div>
    );
  }

  return (
    <div className="p-4 space-y-6">
      <div className="flex justify-between items-center bg-white/5 p-4 rounded-2xl border border-white/10">
        <div className="flex items-center gap-2">
          <Trophy className="text-meteor-orange" size={20} />
          <span className="font-bold">{points} pts</span>
        </div>
        <div className="flex items-center gap-2">
          <Users className="text-neon-blue" size={20} />
          <span className="text-xs text-gray-400">Solo Mode</span>
        </div>
      </div>

      <div className="relative">
        <div className="flex justify-between mb-2">
          {treasureHuntData.map((_, i) => (
            <div 
              key={i}
              className={`h-1.5 flex-1 mx-0.5 rounded-full transition-colors ${
                i <= currentStep ? 'bg-meteor-orange' : 'bg-white/10'
              }`}
            />
          ))}
        </div>
        <p className="text-[10px] text-right text-gray-500">Step {currentStep + 1} of {treasureHuntData.length}</p>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="glass-card p-6 space-y-4"
        >
          <div className="flex items-start gap-3">
            <div className="p-2 bg-meteor-orange/20 rounded-lg">
              <MapPin className="text-meteor-orange" size={24} />
            </div>
            <div>
              <h3 className="text-xl font-bold">{step.location}</h3>
              <p className="text-xs text-neon-blue">Current Objective</p>
            </div>
          </div>

          <div className="bg-cosmic-black/40 p-4 rounded-xl border border-white/5 italic text-gray-200">
            "{step.clue}"
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-400">
            <Info size={14} />
            <span>Hint: {step.hint}</span>
          </div>
        </motion.div>
      </AnimatePresence>

      <button 
        onClick={handleScan}
        disabled={isScanning}
        className={`w-full py-6 rounded-2xl flex flex-col items-center justify-center gap-2 transition-all ${
          isScanning ? 'bg-white/10' : 'bg-meteor-orange shadow-[0_10px_20px_rgba(242,125,38,0.3)]'
        }`}
      >
        {isScanning ? (
          <>
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
            >
              <QrCode size={32} />
            </motion.div>
            <span className="text-sm font-bold">Scanning Location...</span>
          </>
        ) : (
          <>
            <QrCode size={32} />
            <span className="text-sm font-bold">Scan QR at Location</span>
          </>
        )}
      </button>

      <div className="text-center">
        <button className="text-xs text-gray-500 underline">Switch to Group Hunt</button>
      </div>
    </div>
  );
}
