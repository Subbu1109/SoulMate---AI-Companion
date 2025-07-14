'use client';

import { motion } from 'framer-motion';
import { Brain, Heart, Shield, Zap, Users, Target, Award, Sparkles } from 'lucide-react';

const features = [
  {
    icon: Brain,
    title: 'Advanced AI Intelligence',
    description: 'Powered by cutting-edge machine learning algorithms that understand and respond to human emotions with unprecedented accuracy.',
    color: 'text-purple-400'
  },
  {
    icon: Heart,
    title: 'Emotional Intelligence',
    description: 'Real-time sentiment analysis and emotion detection that adapts to your unique emotional patterns and needs.',
    color: 'text-pink-400'
  },
  {
    icon: Shield,
    title: 'Privacy & Security',
    description: 'Your personal data is encrypted and stored securely. We prioritize your privacy above all else.',
    color: 'text-green-400'
  },
  {
    icon: Zap,
    title: 'Instant Support',
    description: '24/7 availability means you always have someone to talk to, whenever you need emotional support.',
    color: 'text-yellow-400'
  }
];

const benefits = [
  {
    icon: '🧠',
    title: 'Mental Wellness',
    description: 'Improve your mental health through guided conversations and personalized insights.'
  },
  {
    icon: '📈',
    title: 'Emotional Growth',
    description: 'Track your emotional journey and see patterns that help you grow and develop.'
  },
  {
    icon: '🎯',
    title: 'Personalized Experience',
    description: 'AI that learns from your interactions to provide increasingly relevant support.'
  },
  {
    icon: '🌟',
    title: 'Holistic Approach',
    description: 'Combines therapy techniques, mindfulness, and wellness practices in one platform.'
  },
  {
    icon: '🔒',
    title: 'Safe Space',
    description: 'A judgment-free environment where you can express yourself freely and authentically.'
  },
  {
    icon: '⚡',
    title: 'Immediate Access',
    description: 'No appointments needed - get support the moment you need it, day or night.'
  }
];

const stats = [
  { number: '10M+', label: 'Conversations', icon: '💬' },
  { number: '500K+', label: 'Users Helped', icon: '👥' },
  { number: '95%', label: 'Satisfaction Rate', icon: '⭐' },
  { number: '24/7', label: 'Availability', icon: '🕐' }
];

export default function About() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <motion.div
          animate={{ 
            rotate: [0, 10, -10, 0],
            scale: [1, 1.1, 1] 
          }}
          transition={{ 
            duration: 4, 
            repeat: Infinity,
            repeatType: "reverse" 
          }}
          className="text-8xl mb-8"
        >
          🤖✨
        </motion.div>
        
        <h1 className="text-5xl font-bold gradient-text mb-6">About SoulMate.AGI</h1>
        <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
          Your personal AI companion designed to understand, support, and grow with you on your emotional journey. 
          We're revolutionizing mental wellness through advanced artificial intelligence and human-centered design.
        </p>
      </motion.div>

      {/* Mission Statement */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass-panel p-8 mb-12 text-center"
      >
        <Sparkles className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
        <h2 className="text-3xl font-bold text-white mb-4">Our Mission</h2>
        <p className="text-lg text-white/80 max-w-4xl mx-auto leading-relaxed">
          To democratize access to emotional support and mental wellness tools by creating an AI companion that truly understands 
          human emotions, provides personalized guidance, and helps individuals develop better emotional intelligence and resilience.
        </p>
      </motion.div>

      {/* Key Features */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mb-16"
      >
        <h2 className="text-3xl font-bold text-white text-center mb-12">Why Choose SoulMate.AGI?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="glass-panel p-8"
              >
                <Icon className={`w-12 h-12 ${feature.color} mb-4`} />
                <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                <p className="text-white/80 leading-relaxed">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Statistics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="glass-panel p-8 mb-16"
      >
        <h2 className="text-3xl font-bold text-white text-center mb-12">Our Impact</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 * index }}
              className="text-center"
            >
              <div className="text-4xl mb-2">{stat.icon}</div>
              <div className="text-3xl font-bold gradient-text mb-2">{stat.number}</div>
              <div className="text-white/70">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Benefits Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="mb-16"
      >
        <h2 className="text-3xl font-bold text-white text-center mb-12">Benefits You'll Experience</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              whileHover={{ scale: 1.02, y: -3 }}
              className="glass-panel p-6 bg-gradient-to-br from-blue-500/10 to-purple-600/10"
            >
              <div className="text-3xl mb-3">{benefit.icon}</div>
              <h3 className="text-lg font-semibold text-white mb-2">{benefit.title}</h3>
              <p className="text-white/80 text-sm leading-relaxed">{benefit.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* How It Works */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0 }}
        className="glass-panel p-8 mb-16"
      >
        <h2 className="text-3xl font-bold text-white text-center mb-12">How SoulMate.AGI Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">1️⃣</span>
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">Share Your Feelings</h3>
            <p className="text-white/80">Express yourself through text, voice, or even facial expressions. Our AI understands multiple forms of communication.</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">2️⃣</span>
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">AI Analysis</h3>
            <p className="text-white/80">Advanced algorithms analyze your emotional state, patterns, and needs to provide personalized insights and support.</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">3️⃣</span>
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">Personalized Support</h3>
            <p className="text-white/80">Receive tailored guidance, coping strategies, and wellness recommendations designed specifically for your unique situation.</p>
          </div>
        </div>
      </motion.div>

      {/* Call to Action */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
        className="text-center glass-panel p-8"
      >
        <h2 className="text-3xl font-bold text-white mb-4">Ready to Start Your Journey?</h2>
        <p className="text-xl text-white/80 mb-8">
          Join thousands of users who have already discovered the power of AI-assisted emotional wellness.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="glass-button px-8 py-4 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 text-white font-semibold"
          >
            Start Chatting Now
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="glass-button px-8 py-4 rounded-lg text-white font-semibold"
          >
            Learn More
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}