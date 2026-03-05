import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import MapPage from './pages/MapPage';
import StoryPage from './pages/StoryPage';
import BiodiversityPage from './pages/BiodiversityPage';
import TreasureHunt from './components/TreasureHunt';
import AIChat from './components/AIChat';
import Viewer360 from './components/Viewer360';
import ImpactSimulation from './components/ImpactSimulation';
import AdminDashboard from './components/AdminDashboard';
import Navbar from './components/Navbar';

import PhotoSpots from './components/PhotoSpots';

import FloatingChat from './components/FloatingChat';

import { LanguageProvider } from './contexts/LanguageContext';

export default function App() {
  return (
    <LanguageProvider>
      <Router>
        <div className="max-w-md mx-auto bg-cosmic-black min-h-screen relative shadow-2xl overflow-hidden">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/map" element={<MapPage />} />
            <Route path="/story/:id" element={<StoryPage />} />
            <Route path="/treasure" element={<div className="min-h-screen pt-6"><h1 className="text-3xl font-bold px-6 mb-4">Adventure Quest</h1><TreasureHunt /></div>} />
            <Route path="/guide" element={<div className="h-screen pb-28 pt-6 flex flex-col"><h1 className="text-3xl font-bold px-6 mb-4">AI Tour Guide</h1><AIChat /></div>} />
            <Route path="/biodiversity" element={<BiodiversityPage />} />
            <Route path="/360" element={<div className="h-screen"><Viewer360 /></div>} />
            <Route path="/simulation" element={<div className="h-screen"><ImpactSimulation /></div>} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/photo-spots" element={<PhotoSpots />} />
          </Routes>
          
          <FloatingChat />
          <Navbar />
        </div>
      </Router>
    </LanguageProvider>
  );
}
