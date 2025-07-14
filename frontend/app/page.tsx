'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Brain, Heart, Activity, Zap, Sparkles, Sun } from 'lucide-react';
import { MoodSelector } from '@/components/MoodSelector';
import { StatsCard } from '@/components/StatsCard';
import { QuickActions } from '@/components/QuickActions';

export default function Home() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [currentMood, setCurrentMood] = useState('neutral');

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12 pt-8"
      >
        <motion.div
          animate={{ 
            rotate: [0, 5, -5, 0],
            scale: [1, 1.1, 1] 
          }}
          transition={{ 
            duration: 3, 
            repeat: Infinity,
            repeatType: "reverse" 
          }}
          className="text-8xl mb-6"
        >
          🤖
        </motion.div>
        
        <h1 className="text-6xl font-bold gradient-text mb-4">
          SoulMate.AGI
        </h1>
        <p className="text-2xl text-white/80 mb-2">
          Your Emotional Intelligence Companion
        </p>
        <p className="text-lg text-white/60">
          {getGreeting()}! Ready to explore your emotional journey today?
        </p>
      </motion.div>

      {/* Mood Selection */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="mb-8"
      >
        <h2 className="text-2xl font-semibold mb-6 text-white text-center">How are you feeling right now?</h2>
        <MoodSelector onMoodSelect={setCurrentMood} />
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
      >
        <StatsCard 
          icon={<Zap className="w-6 h-6" />}
          label="Energy Level"
          value="87%"
          color="text-yellow-400"
        />
        <StatsCard 
          icon={<Heart className="w-6 h-6" />}
          label="Mood Score"
          value="8.5/10"
          color="text-pink-400"
        />
        <StatsCard 
          icon={<Activity className="w-6 h-6" />}
          label="Wellness"
          value="Good"
          color="text-green-400"
        />
        <StatsCard 
          icon={<Brain className="w-6 h-6" />}
          label="Focus"
          value="High"
          color="text-purple-400"
        />
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="mb-8"
      >
        <h2 className="text-2xl font-semibold mb-6 text-white text-center">What would you like to do?</h2>
        <QuickActions />
      </motion.div>

      {/* Daily Insights */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="glass-panel p-8"
      >
        <h2 className="text-2xl font-semibold mb-6 text-white flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-yellow-400" />
          Today's Insights
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="glass-panel p-6 bg-gradient-to-br from-blue-500/20 to-purple-600/20">
            <Sun className="w-8 h-8 text-yellow-400 mb-3" />
            <h3 className="text-white font-semibold mb-2">Morning Boost</h3>
            <p className="text-white/80 text-sm">Your energy peaks around 10 AM. Schedule important tasks during this time.</p>
          </div>
          <div className="glass-panel p-6 bg-gradient-to-br from-green-500/20 to-teal-600/20">
            <Heart className="w-8 h-8 text-pink-400 mb-3" />
            <h3 className="text-white font-semibold mb-2">Emotional Balance</h3>
            <p className="text-white/80 text-sm">You've maintained positive emotions for 3 consecutive days. Great progress!</p>
          </div>
          <div className="glass-panel p-6 bg-gradient-to-br from-purple-500/20 to-pink-600/20">
            <Brain className="w-8 h-8 text-purple-400 mb-3" />
            <h3 className="text-white font-semibold mb-2">Focus Pattern</h3>
            <p className="text-white/80 text-sm">Your concentration improves after short meditation sessions.</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}