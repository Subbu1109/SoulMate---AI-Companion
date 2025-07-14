'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, RotateCcw, Heart, Leaf, Lightbulb } from 'lucide-react';

const wellnessVideos = [
  {
    id: 1,
    title: '5-Minute Morning Meditation',
    duration: '5:00',
    type: 'Meditation',
    thumbnail: 'https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg?auto=compress&cs=tinysrgb&w=400',
    videoUrl: 'https://www.youtube.com/embed/inpok4MKVLM'
  },
  {
    id: 2,
    title: 'Breathing Exercise for Anxiety',
    duration: '3:30',
    type: 'Breathing',
    thumbnail: 'https://images.pexels.com/photos/4056723/pexels-photo-4056723.jpeg?auto=compress&cs=tinysrgb&w=400',
    videoUrl: 'https://www.youtube.com/embed/tybOi4hjZFQ'
  },
  {
    id: 3,
    title: 'Gentle Yoga Flow',
    duration: '10:00',
    type: 'Yoga',
    thumbnail: 'https://images.pexels.com/photos/4056535/pexels-photo-4056535.jpeg?auto=compress&cs=tinysrgb&w=400',
    videoUrl: 'https://www.youtube.com/embed/v7AYKMP6rOE'
  },
  {
    id: 4,
    title: 'Progressive Muscle Relaxation',
    duration: '8:00',
    type: 'Relaxation',
    thumbnail: 'https://images.pexels.com/photos/3823488/pexels-photo-3823488.jpeg?auto=compress&cs=tinysrgb&w=400',
    videoUrl: 'https://www.youtube.com/embed/1nePKM6Y3aE'
  },
  {
    id: 5,
    title: 'Mindful Walking Meditation',
    duration: '12:00',
    type: 'Mindfulness',
    thumbnail: 'https://images.pexels.com/photos/4498318/pexels-photo-4498318.jpeg?auto=compress&cs=tinysrgb&w=400',
    videoUrl: 'https://www.youtube.com/embed/6p_yaNFSYao'
  },
  {
    id: 6,
    title: 'Sleep Preparation Routine',
    duration: '15:00',
    type: 'Sleep',
    thumbnail: 'https://images.pexels.com/photos/3771069/pexels-photo-3771069.jpeg?auto=compress&cs=tinysrgb&w=400',
    videoUrl: 'https://www.youtube.com/embed/1ZYbU82GVz4'
  }
];

const breathingPatterns = [
  { name: '4-7-8 Technique', inhale: 4, hold: 7, exhale: 8, description: 'Calming technique for anxiety' },
  { name: 'Box Breathing', inhale: 4, hold: 4, exhale: 4, description: 'Navy SEAL technique for focus' },
  { name: 'Calm Breathing', inhale: 3, hold: 0, exhale: 6, description: 'Simple relaxation method' }
];



export default function Wellness() {
  const [selectedVideo, setSelectedVideo] = useState<number | null>(null);
  const [breathingActive, setBreathingActive] = useState(false);
  const [currentPattern, setCurrentPattern] = useState(breathingPatterns[0]);
  const [breathingPhase, setBreathingPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale');
  const [breathingTimer, setBreathingTimer] = useState(0);

  const breathingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (breathingActive) {
      interval = setInterval(() => {
        setBreathingTimer(prev => {
          const currentDuration = 
            breathingPhase === 'inhale' ? currentPattern.inhale :
            breathingPhase === 'hold' ? currentPattern.hold :
            currentPattern.exhale;
          
          if (prev >= currentDuration) {
            // Move to next phase
            if (breathingPhase === 'inhale') {
              setBreathingPhase(currentPattern.hold > 0 ? 'hold' : 'exhale');
            } else if (breathingPhase === 'hold') {
              setBreathingPhase('exhale');
            } else {
              setBreathingPhase('inhale');
            }
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [breathingActive, breathingPhase, currentPattern]);

  const handleScrollToBreathing = () => {
  if (breathingRef.current) {
    const yOffset = -150;  // adjust this number as you like
    const y = breathingRef.current.getBoundingClientRect().top + window.pageYOffset + yOffset;

    window.scrollTo({ top: y, behavior: 'smooth' });
  }
};

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold gradient-text mb-4">Wellness Center</h1>
        <p className="text-xl text-white/70">Your personal space for mindfulness and healing</p>
      </motion.div>

      {/* Top Section: Breathing Exercise and Guided Sessions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Breathing Exercise */}
        <motion.div
          ref={breathingRef}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-panel p-8"
        >
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-white mb-6 flex items-center justify-center gap-2">
              <Leaf className="w-6 h-6 text-green-400" />
              Breathing Exercise
            </h2>
            
            {/* Breathing Circle */}
            <div className="relative mb-8">
              <motion.div
                animate={{
                  scale: breathingActive ? (breathingPhase === 'exhale' ? 0.7 : breathingPhase === 'hold' ? 1.3 : 1.2) : 1,
                }}
                transition={{
                  duration: breathingPhase === 'inhale' ? currentPattern.inhale : 
                           breathingPhase === 'hold' ? currentPattern.hold : currentPattern.exhale,
                  ease: 'easeInOut'
                }}
                className="w-48 h-48 mx-auto rounded-full bg-gradient-to-br from-green-400/30 to-blue-400/30 backdrop-blur-sm border border-white/20 flex items-center justify-center"
              >
                <div className="text-center">
                  <p className="text-white text-lg capitalize mb-2">{breathingPhase}</p>
                  <Heart className="w-8 h-8 text-pink-400 mx-auto mb-2" />
                  <p className="text-white/70 text-sm">{breathingTimer}s</p>
                </div>
              </motion.div>
            </div>

            {/* Current Pattern Info */}
            <div className="glass-panel p-4 mb-6 bg-gradient-to-br from-blue-500/20 to-purple-600/20">
              <h3 className="text-white font-semibold mb-2">{currentPattern.name}</h3>
              <p className="text-white/70 text-sm mb-2">{currentPattern.description}</p>
              <p className="text-white/60 text-xs">
                Inhale: {currentPattern.inhale}s • Hold: {currentPattern.hold}s • Exhale: {currentPattern.exhale}s
              </p>
            </div>

            {/* Pattern Selection */}
            <div className="grid grid-cols-1 gap-2 mb-6">
              {breathingPatterns.map((pattern) => (
                <button
                  key={pattern.name}
                  onClick={() => {
                    setCurrentPattern(pattern);
                    setBreathingActive(false);
                    setBreathingPhase('inhale');
                    setBreathingTimer(0);
                  }}
                  className={`glass-button p-3 rounded-lg text-left ${
                    currentPattern.name === pattern.name ? 'bg-white/20' : ''
                  }`}
                >
                  <div className="text-sm font-medium text-white">{pattern.name}</div>
                  <div className="text-xs text-white/60">{pattern.description}</div>
                </button>
              ))}
            </div>
            

            {/* Controls */}
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => {
                  setBreathingActive(!breathingActive);
                  handleScrollToBreathing();
                }}
                className="glass-button px-6 py-3 rounded-lg bg-gradient-to-br from-green-500 to-teal-600 flex items-center gap-2"
              >
                {breathingActive ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                {breathingActive ? 'Pause' : 'Start'}
              </button>
              <button
                onClick={() => {
                  setBreathingActive(false);
                  setBreathingPhase('inhale');
                  setBreathingTimer(0);
                }}
                className="glass-button px-6 py-3 rounded-lg flex items-center gap-2"
              >
                <RotateCcw className="w-5 h-5" />
                Reset
              </button>
            </div>
          </div>
        </motion.div>

        {/* Guided Sessions */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-panel p-6 overflow-visible"
        >
          <h2 className="text-2xl font-semibold text-white mb-6">Guided Sessions</h2>
          
          {selectedVideo && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mb-6"
            >
              <div className="aspect-video rounded-lg overflow-hidden mb-4">
                <iframe
                  src={wellnessVideos.find(v => v.id === selectedVideo)?.videoUrl}
                  className="w-full h-full"
                  allowFullScreen
                  title="Wellness Video"
                />
              </div>
              <button
                onClick={() => setSelectedVideo(null)}
                className="glass-button px-4 py-2 rounded-lg"
              >
                Close Video
              </button>
            </motion.div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {wellnessVideos.map((video, index) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                whileHover={{ scale: 1.02 }}
                className="glass-panel overflow-hidden cursor-pointer"
                onClick={() => setSelectedVideo(video.id)}
              >
                <div className="aspect-video relative">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <Play className="w-8 h-8 text-white" />
                  </div>
                </div>
                <div className="p-3">
                  <h3 className="text-white font-semibold text-sm mb-1">{video.title}</h3>
                  <div className="flex justify-between items-center">
                    <span className="text-white/70 text-xs">{video.type}</span>
                    <span className="text-white/70 text-xs">{video.duration}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Daily Wellness Tips */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="glass-panel p-6"
      >
        <h2 className="text-2xl font-semibold text-white mb-6 flex items-center gap-2">
          <Lightbulb className="w-6 h-6 text-yellow-400" />
          Daily Wellness Tips
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { icon: '🌬️', tip: 'Take 5 deep breaths when you feel stressed', color: 'from-blue-500/20 to-cyan-600/20' },
            { icon: '🙏', tip: 'Practice gratitude by listing 3 things you\'re thankful for', color: 'from-purple-500/20 to-pink-600/20' },
            { icon: '☀️', tip: 'Get some sunlight to boost your mood naturally', color: 'from-yellow-500/20 to-orange-600/20' },
            { icon: '💧', tip: 'Stay hydrated throughout the day', color: 'from-cyan-500/20 to-blue-600/20' },
            { icon: '🧘', tip: 'Take short breaks every hour to stretch', color: 'from-green-500/20 to-teal-600/20' },
            { icon: '🍎', tip: 'Practice mindful eating during meals', color: 'from-red-500/20 to-pink-600/20' },
            { icon: '🚶', tip: 'Take a 10-minute walk to clear your mind', color: 'from-indigo-500/20 to-purple-600/20' },
            { icon: '😴', tip: 'Maintain a consistent sleep schedule', color: 'from-violet-500/20 to-purple-600/20' },
            { icon: '📱', tip: 'Limit screen time before bedtime', color: 'from-gray-500/20 to-slate-600/20' }
          ].map((item, index) => (
            <motion.div 
              key={index} 
              className={`glass-panel p-4 bg-gradient-to-br ${item.color}`}
              whileHover={{ scale: 1.02, y: -2 }}
            >
              <div className="text-2xl mb-2">{item.icon}</div>
              <p className="text-white/90 text-sm">{item.tip}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}