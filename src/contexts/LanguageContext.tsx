import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'mr' | 'hi';

interface Translations {
  [key: string]: {
    en: string;
    mr: string;
    hi: string;
  };
}

const translations: Translations = {
  home: { en: 'Home', mr: 'मुख्यपृष्ठ', hi: 'होम' },
  map: { en: 'Map', mr: 'नकाशा', hi: 'नक्शा' },
  quest: { en: 'Quest', mr: 'शोध', hi: 'खोज' },
  guide: { en: 'Guide', mr: 'मार्गदर्शक', hi: 'गाइड' },
  nature: { en: 'Nature', mr: 'निसर्ग', hi: 'प्रकृति' },
  welcome: { en: 'Welcome to LonarVerse', mr: 'लोणारवर्समध्ये आपले स्वागत आहे', hi: 'लोनारवर्स में आपका स्वागत है' },
  explore_mystery: { en: 'Explore the cosmic mystery of Lonar Lake', mr: 'लोणार सरोवराचे वैश्विक रहस्य शोधा', hi: 'लोनार झील के ब्रह्मांडीय रहस्य का अन्वेषण करें' },
  start_adventure: { en: 'Start Adventure', mr: 'साहस सुरू करा', hi: 'साहसिक कार्य शुरू करें' },
  impact_simulation: { en: 'Impact Simulation', mr: 'आघात सिम्युलेशन', hi: 'प्रभाव सिमुलेशन' },
  view_360: { en: '360° View', mr: '३६०° दृश्य', hi: '३६०° दृश्य' },
  photo_spots: { en: 'Photo Spots', mr: 'फोटो स्पॉट्स', hi: 'फोटो स्पॉट्स' },
  adventure_quest: { en: 'Adventure Quest', mr: 'साहसी शोध', hi: 'साहसिक खोज' },
  ai_tour_guide: { en: 'AI Tour Guide', mr: 'AI मार्गदर्शक', hi: 'AI टूर गाइड' },
  biodiversity: { en: 'Biodiversity', mr: 'जैवविविधता', hi: 'जैव विविधता' },
  ask_anything: { en: 'Ask me anything...', mr: 'काहीही विचारा...', hi: 'मुझसे कुछ भी पूछें...' },
  scan_qr: { en: 'Scan QR Code', mr: 'QR कोड स्कॅन करा', hi: 'QR कोड स्कैन करें' },
  points: { en: 'Points', mr: 'गुण', hi: 'अंक' },
  level: { en: 'Level', mr: 'पातळी', hi: 'स्तर' },
  best_photo_spots: { en: 'Best Photo Spots', mr: 'सर्वोत्तम फोटो स्पॉट्स', hi: 'सबसे अच्छे फोटो स्पॉट' },
  capture_cosmic: { en: 'Capture the cosmic beauty of Lonar.', mr: 'लोणारचे वैश्विक सौंदर्य टिपून घ्या.', hi: 'लोनार की ब्रह्मांडीय सुंदरता को कैद करें।' },
  unique_biodiversity: { en: 'Unique Biodiversity', mr: 'अद्वितीय जैवविविधता', hi: 'अद्वितीय जैव विविधता' },
  discover_species: { en: 'Discover the unique flora and fauna of the crater.', mr: 'विवरातील अद्वितीय वनस्पती आणि प्राणी शोधा.', hi: 'क्रेटर की अद्वितीय वनस्पतियों और जीवों की खोज करें।' },
  explore_story: { en: 'Explore Story', mr: 'कथा पहा', hi: 'कहानी देखें' },
  quick_fact: { en: 'Quick Fact', mr: 'त्वरित तथ्य', hi: 'त्वरित तथ्य' },
  cosmic_hotspot: { en: 'Cosmic Hotspot', mr: 'कॉस्मिक हॉटस्पॉट', hi: 'कॉस्मिक हॉटस्पॉट' },
  video_preview: { en: 'Video Preview', mr: 'व्हिडिओ पूर्वावलोकन', hi: 'वीडियो पूर्वावलोकन' },
  live_hotspots: { en: 'Live Hotspots Active', mr: 'थेट हॉटस्पॉट्स सक्रिय', hi: 'लाइव हॉटस्पॉट सक्रिय' },
  online_ready: { en: 'Online & Ready', mr: 'ऑनलाइन आणि तयार', hi: 'ऑनलाइन और तैयार' },
  cosmic_impact_site: { en: 'Cosmic Impact Site', mr: 'कॉस्मिक इम्पॅक्ट साइट', hi: 'कॉस्मिक इम्पॅक्ट साइट' },
  legend_lonasura: { en: 'The Legend of Lonasura', mr: 'लोणासुराची दंतकथा', hi: 'लोणासुर की किंवदंती' },
  read_more: { en: 'Read More', mr: 'अधिक वाचा', hi: 'अधिक पढ़ें' },
  learn_more: { en: 'Learn More', mr: 'अधिक जाणून घ्या', hi: 'अधिक जानें' },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string) => {
    return translations[key]?.[language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
