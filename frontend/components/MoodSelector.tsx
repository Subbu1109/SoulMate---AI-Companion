'use client';

import { motion } from 'framer-motion';
import { useTheme } from './ThemeProvider';

const moods = [
  { emoji: '😊', label: 'Happy', value: 'happy' },
  { emoji: '😌', label: 'Calm', value: 'calm' },
  { emoji: '😔', label: 'Sad', value: 'sad' },
  { emoji: '😠', label: 'Angry', value: 'angry' },
  { emoji: '😐', label: 'Neutral', value: 'neutral' },
];

interface MoodSelectorProps {
  onMoodSelect: (mood: string) => void;
}

export function MoodSelector({ onMoodSelect }: MoodSelectorProps) {
  const { emotion, setEmotion } = useTheme();

  const handleMoodSelect = (moodValue: string) => {
    onMoodSelect(moodValue);
    setEmotion(moodValue as any);
  };

  return (
    <div className="flex flex-wrap gap-4 justify-center">
      {moods.map((mood, index) => (
        <motion.button
          key={mood.value}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handleMoodSelect(mood.value)}
          className={`glass-panel p-4 w-20 h-20 flex flex-col items-center justify-center rounded-2xl transition-all duration-300 ${
            emotion === mood.value 
              ? 'ring-2 ring-white/50 bg-white/20' 
              : 'hover:bg-white/10'
          }`}
        >
          <span className="text-2xl mb-1">{mood.emoji}</span>
          <span className="text-xs text-white/70 font-medium">{mood.label}</span>
        </motion.button>
      ))}
    </div>
  );
}