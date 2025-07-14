'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Brain, Heart, Activity, Smile, Zap, Target, Award } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

// Dynamic data that updates over time
const generateMoodData = () => {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  return days.map(day => ({
    day,
    mood: Math.floor(Math.random() * 4) + 6, // 6-10 range
    energy: Math.floor(Math.random() * 4) + 6,
    stress: Math.floor(Math.random() * 5) + 1, // 1-5 range
    focus: Math.floor(Math.random() * 4) + 6,
  }));
};

const generateEmotionData = () => [
  { emotion: 'Joy', value: Math.floor(Math.random() * 30) + 70 },
  { emotion: 'Calm', value: Math.floor(Math.random() * 30) + 60 },
  { emotion: 'Confidence', value: Math.floor(Math.random() * 30) + 70 },
  { emotion: 'Energy', value: Math.floor(Math.random() * 30) + 65 },
  { emotion: 'Focus', value: Math.floor(Math.random() * 30) + 80 },
  { emotion: 'Gratitude', value: Math.floor(Math.random() * 20) + 80 },
];

const generateHourlyData = () => {
  const hours = Array.from({ length: 24 }, (_, i) => i);
  return hours.map(hour => ({
    hour: `${hour}:00`,
    mood: Math.sin((hour - 6) * Math.PI / 12) * 3 + 7 + Math.random(),
    energy: Math.sin((hour - 8) * Math.PI / 10) * 2.5 + 6.5 + Math.random(),
  }));
};

const emotionColors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD'];

export default function Analytics() {
  const [moodData, setMoodData] = useState(generateMoodData());
  const [emotionRadarData, setEmotionRadarData] = useState(generateEmotionData());
  const [hourlyData, setHourlyData] = useState(generateHourlyData());
  const [selectedTimeframe, setSelectedTimeframe] = useState('week');

  // Update data every 5 seconds to show dynamic behavior
  useEffect(() => {
    const interval = setInterval(() => {
      setMoodData(generateMoodData());
      setEmotionRadarData(generateEmotionData());
      setHourlyData(generateHourlyData());
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const insights = [
    {
      icon: TrendingUp,
      title: 'Mood Improvement',
      description: `Your mood has increased by ${Math.floor(Math.random() * 20) + 10}% this week`,
      color: 'text-green-400',
      value: '+15%'
    },
    {
      icon: Brain,
      title: 'High Focus Days',
      description: `You had ${Math.floor(Math.random() * 3) + 4} high-focus days this week`,
      color: 'text-purple-400',
      value: '5 days'
    },
    {
      icon: Heart,
      title: 'Stress Management',
      description: `Stress levels are ${Math.floor(Math.random() * 15) + 15}% lower than last week`,
      color: 'text-pink-400',
      value: '-20%'
    },
    {
      icon: Zap,
      title: 'Energy Patterns',
      description: 'Peak energy occurs around mid-week',
      color: 'text-yellow-400',
      value: 'Wed-Thu'
    }
  ];

  const pieData = [
    { name: 'Happy', value: 35, color: '#4ECDC4' },
    { name: 'Calm', value: 25, color: '#45B7D1' },
    { name: 'Focused', value: 20, color: '#96CEB4' },
    { name: 'Neutral', value: 15, color: '#FFEAA7' },
    { name: 'Stressed', value: 5, color: '#FF6B6B' },
  ];

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold gradient-text mb-4">Emotional Analytics</h1>
        <p className="text-xl text-white/70">Deep insights into your emotional patterns and growth</p>
        
        {/* Timeframe Selector */}
        <div className="flex justify-center gap-2 mt-6">
          {['day', 'week', 'month'].map((timeframe) => (
            <button
              key={timeframe}
              onClick={() => setSelectedTimeframe(timeframe)}
              className={`glass-button px-6 py-2 rounded-lg capitalize ${
                selectedTimeframe === timeframe ? 'bg-white/20' : ''
              }`}
            >
              {timeframe}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Key Insights */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
      >
        {insights.map((insight, index) => {
          const Icon = insight.icon;
          return (
            <motion.div
              key={insight.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="glass-panel p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <Icon className={`w-8 h-8 ${insight.color}`} />
                <span className={`text-2xl font-bold ${insight.color}`}>{insight.value}</span>
              </div>
              <h3 className="text-white font-semibold mb-2">{insight.title}</h3>
              <p className="text-white/70 text-sm">{insight.description}</p>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Main Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Mood Trends */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-panel p-6"
        >
          <h2 className="text-2xl font-semibold text-white mb-6 flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-blue-400" />
            Weekly Mood Trends
          </h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={moodData}>
                <defs>
                  <linearGradient id="moodGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4ECDC4" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#4ECDC4" stopOpacity={0.1}/>
                  </linearGradient>
                  <linearGradient id="energyGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FFE66D" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#FFE66D" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="day" stroke="rgba(255,255,255,0.7)" />
                <YAxis stroke="rgba(255,255,255,0.7)" />
                <Area 
                  type="monotone" 
                  dataKey="mood" 
                  stroke="#4ECDC4" 
                  fillOpacity={1} 
                  fill="url(#moodGradient)"
                  strokeWidth={3}
                />
                <Area 
                  type="monotone" 
                  dataKey="energy" 
                  stroke="#FFE66D" 
                  fillOpacity={1} 
                  fill="url(#energyGradient)"
                  strokeWidth={3}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Emotion Radar */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
          className="glass-panel p-6"
        >
          <h2 className="text-2xl font-semibold text-white mb-6 flex items-center gap-2">
            <Brain className="w-6 h-6 text-purple-400" />
            Emotion Profile
          </h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={emotionRadarData}>
                <PolarGrid stroke="rgba(255,255,255,0.2)" />
                <PolarAngleAxis dataKey="emotion" tick={{ fill: 'rgba(255,255,255,0.7)', fontSize: 12 }} />
                <PolarRadiusAxis 
                  angle={90} 
                  domain={[0, 100]} 
                  tick={{ fill: 'rgba(255,255,255,0.7)', fontSize: 10 }}
                />
                <Radar
                  name="Emotions"
                  dataKey="value"
                  stroke="#A66CFF"
                  fill="#A66CFF"
                  fillOpacity={0.3}
                  strokeWidth={3}
                  dot={{ fill: '#A66CFF', strokeWidth: 2, r: 4 }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Secondary Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Hourly Patterns */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="glass-panel p-6"
        >
          <h2 className="text-2xl font-semibold text-white mb-6 flex items-center gap-2">
            <Activity className="w-6 h-6 text-green-400" />
            Daily Patterns
          </h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={hourlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis 
                  dataKey="hour" 
                  stroke="rgba(255,255,255,0.7)"
                  interval={3}
                />
                <YAxis stroke="rgba(255,255,255,0.7)" />
                <Line 
                  type="monotone" 
                  dataKey="mood" 
                  stroke="#4ECDC4" 
                  strokeWidth={3}
                  dot={{ fill: '#4ECDC4', r: 3 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="energy" 
                  stroke="#FFE66D" 
                  strokeWidth={3}
                  dot={{ fill: '#FFE66D', r: 3 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Emotion Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          className="glass-panel p-6"
        >
          <h2 className="text-2xl font-semibold text-white mb-6 flex items-center gap-2">
            <Smile className="w-6 h-6 text-yellow-400" />
            Emotion Distribution
          </h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* AI Recommendations */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
        className="glass-panel p-6"
      >
        <h2 className="text-2xl font-semibold text-white mb-6 flex items-center gap-2">
          <Target className="w-6 h-6 text-blue-400" />
          AI-Powered Recommendations
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="glass-panel p-4 bg-gradient-to-br from-green-500/20 to-teal-600/20">
            <Award className="w-8 h-8 text-green-400 mb-3" />
            <h3 className="text-white font-semibold mb-2">🌱 Wellness Focus</h3>
            <p className="text-white/80 text-sm">Your stress peaks on Thursdays. Consider scheduling relaxation time mid-week for better balance.</p>
          </div>
          <div className="glass-panel p-4 bg-gradient-to-br from-blue-500/20 to-purple-600/20">
            <Brain className="w-8 h-8 text-blue-400 mb-3" />
            <h3 className="text-white font-semibold mb-2">🧠 Cognitive Enhancement</h3>
            <p className="text-white/80 text-sm">Your focus peaks at 10 AM. Schedule important tasks during this golden hour for maximum productivity.</p>
          </div>
          <div className="glass-panel p-4 bg-gradient-to-br from-pink-500/20 to-red-600/20">
            <Heart className="w-8 h-8 text-pink-400 mb-3" />
            <h3 className="text-white font-semibold mb-2">❤️ Emotional Balance</h3>
            <p className="text-white/80 text-sm">Gratitude practices show strong correlation with mood improvement. Continue your daily gratitude journal.</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}