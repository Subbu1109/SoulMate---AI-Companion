'use client';

import { createContext, useContext, useState, useEffect } from 'react';

type Emotion = 'happy' | 'calm' | 'sad' | 'angry' | 'neutral';

interface ThemeContextType {
  emotion: Emotion;
  setEmotion: (emotion: Emotion) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [emotion, setEmotion] = useState<Emotion>('neutral');

  useEffect(() => {
    // Apply emotion-based theme to document
    document.documentElement.className = `emotion-${emotion}`;
    
    // Update CSS custom properties for dynamic theming
    const root = document.documentElement;
    
    switch (emotion) {
      case 'happy':
        root.style.setProperty('--primary-hue', '45');
        root.style.setProperty('--secondary-hue', '320');
        root.style.setProperty('--accent-hue', '180');
        break;
      case 'calm':
        root.style.setProperty('--primary-hue', '200');
        root.style.setProperty('--secondary-hue', '160');
        root.style.setProperty('--accent-hue', '280');
        break;
      case 'sad':
        root.style.setProperty('--primary-hue', '215');
        root.style.setProperty('--secondary-hue', '45');
        root.style.setProperty('--accent-hue', '175');
        break;
      case 'angry':
        root.style.setProperty('--primary-hue', '350');
        root.style.setProperty('--secondary-hue', '45');
        root.style.setProperty('--accent-hue', '270');
        break;
      default: // neutral
        root.style.setProperty('--primary-hue', '220');
        root.style.setProperty('--secondary-hue', '260');
        root.style.setProperty('--accent-hue', '50');
    }
  }, [emotion]);

  return (
    <ThemeContext.Provider value={{ emotion, setEmotion }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}