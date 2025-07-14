'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Calendar, Heart, Brain, Smile, Frown, Meh, Plus, Save, Trash2 } from 'lucide-react';

interface DiaryEntry {
  id: string;
  date: Date;
  title: string;
  content: string;
  emotion: 'happy' | 'sad' | 'neutral' | 'excited' | 'anxious' | 'calm' | 'angry';
  sentiment: 'positive' | 'negative' | 'neutral';
  keywords: string[];
}

// Simple sentiment analysis function
const analyzeSentiment = (text: string): { sentiment: 'positive' | 'negative' | 'neutral', emotion: DiaryEntry['emotion'], keywords: string[] } => {
  const positiveWords = ['happy', 'joy', 'excited', 'love', 'amazing', 'wonderful', 'great', 'fantastic', 'awesome', 'brilliant', 'perfect', 'beautiful', 'grateful', 'blessed', 'peaceful', 'calm', 'relaxed'];
  const negativeWords = ['sad', 'angry', 'frustrated', 'upset', 'worried', 'anxious', 'stressed', 'terrible', 'awful', 'horrible', 'hate', 'depressed', 'lonely', 'scared', 'afraid', 'nervous'];
  const neutralWords = ['okay', 'fine', 'normal', 'usual', 'regular', 'average', 'typical'];
  
  const words = text.toLowerCase().split(/\s+/);
  let positiveCount = 0;
  let negativeCount = 0;
  let neutralCount = 0;
  const foundKeywords: string[] = [];
  
  words.forEach(word => {
    if (positiveWords.includes(word)) {
      positiveCount++;
      foundKeywords.push(word);
    } else if (negativeWords.includes(word)) {
      negativeCount++;
      foundKeywords.push(word);
    } else if (neutralWords.includes(word)) {
      neutralCount++;
      foundKeywords.push(word);
    }
  });
  
  let sentiment: 'positive' | 'negative' | 'neutral';
  let emotion: DiaryEntry['emotion'];
  
  if (positiveCount > negativeCount) {
    sentiment = 'positive';
    if (words.some(w => ['excited', 'amazing', 'fantastic', 'awesome'].includes(w))) {
      emotion = 'excited';
    } else if (words.some(w => ['calm', 'peaceful', 'relaxed'].includes(w))) {
      emotion = 'calm';
    } else {
      emotion = 'happy';
    }
  } else if (negativeCount > positiveCount) {
    sentiment = 'negative';
    if (words.some(w => ['angry', 'frustrated', 'hate'].includes(w))) {
      emotion = 'angry';
    } else if (words.some(w => ['anxious', 'worried', 'stressed', 'nervous'].includes(w))) {
      emotion = 'anxious';
    } else {
      emotion = 'sad';
    }
  } else {
    sentiment = 'neutral';
    emotion = 'neutral';
  }
  
  return { sentiment, emotion, keywords: foundKeywords };
};

const emotionColors = {
  happy: 'from-yellow-500/20 to-orange-600/20',
  sad: 'from-blue-500/20 to-indigo-600/20',
  neutral: 'from-gray-500/20 to-slate-600/20',
  excited: 'from-pink-500/20 to-red-600/20',
  anxious: 'from-purple-500/20 to-violet-600/20',
  calm: 'from-green-500/20 to-teal-600/20',
  angry: 'from-red-500/20 to-orange-600/20'
};

const emotionEmojis = {
  happy: '😊',
  sad: '😢',
  neutral: '😐',
  excited: '🤩',
  anxious: '😰',
  calm: '😌',
  angry: '😠'
};

export default function Diary() {
  const [entries, setEntries] = useState<DiaryEntry[]>([]);
  const [isWriting, setIsWriting] = useState(false);
  const [currentEntry, setCurrentEntry] = useState({ title: '', content: '' });
  const [selectedEntry, setSelectedEntry] = useState<DiaryEntry | null>(null);

  // Load entries from localStorage on component mount
  useEffect(() => {
    const savedEntries = localStorage.getItem('diaryEntries');
    if (savedEntries) {
      const parsed = JSON.parse(savedEntries);
      setEntries(parsed.map((entry: any) => ({
        ...entry,
        date: new Date(entry.date)
      })));
    }
  }, []);

  // Save entries to localStorage whenever entries change
  useEffect(() => {
    localStorage.setItem('diaryEntries', JSON.stringify(entries));
  }, [entries]);

  const handleSaveEntry = () => {
    if (!currentEntry.title.trim() || !currentEntry.content.trim()) return;

    const analysis = analyzeSentiment(currentEntry.content);
    
    const newEntry: DiaryEntry = {
      id: Date.now().toString(),
      date: new Date(),
      title: currentEntry.title,
      content: currentEntry.content,
      emotion: analysis.emotion,
      sentiment: analysis.sentiment,
      keywords: analysis.keywords
    };

    setEntries(prev => [newEntry, ...prev]);
    setCurrentEntry({ title: '', content: '' });
    setIsWriting(false);
  };

  const handleDeleteEntry = (id: string) => {
    setEntries(prev => prev.filter(entry => entry.id !== id));
    setSelectedEntry(null);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold gradient-text mb-4">Personal Diary</h1>
        <p className="text-xl text-white/70">Express your thoughts and track your emotional journey</p>
      </motion.div>

      {/* Write New Entry Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-center mb-8"
      >
        <button
          onClick={() => setIsWriting(true)}
          className="glass-button px-8 py-4 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center gap-2 mx-auto"
        >
          <Plus className="w-5 h-5" />
          Write New Entry
        </button>
      </motion.div>

      {/* Writing Interface */}
      <AnimatePresence>
        {isWriting && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="glass-panel p-8 mb-8"
          >
            <h2 className="text-2xl font-semibold text-white mb-6 flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-blue-400" />
              New Diary Entry
            </h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">Title</label>
                <input
                  type="text"
                  value={currentEntry.title}
                  onChange={(e) => setCurrentEntry(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="What's on your mind today?"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-white/40"
                />
              </div>
              
              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">Content</label>
                <textarea
                  value={currentEntry.content}
                  onChange={(e) => setCurrentEntry(prev => ({ ...prev, content: e.target.value }))}
                  placeholder="Share your thoughts, feelings, and experiences..."
                  rows={8}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 resize-none focus:outline-none focus:border-white/40"
                />
              </div>
              
              <div className="flex gap-4">
                <button
                  onClick={handleSaveEntry}
                  className="glass-button px-6 py-3 rounded-lg bg-gradient-to-br from-green-500 to-teal-600 flex items-center gap-2"
                >
                  <Save className="w-5 h-5" />
                  Save Entry
                </button>
                <button
                  onClick={() => {
                    setIsWriting(false);
                    setCurrentEntry({ title: '', content: '' });
                  }}
                  className="glass-button px-6 py-3 rounded-lg"
                >
                  Cancel
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Entries List */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Entries Grid */}
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-semibold text-white mb-6">Your Entries</h2>
          
          {entries.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="glass-panel p-8 text-center"
            >
              <BookOpen className="w-16 h-16 text-white/30 mx-auto mb-4" />
              <p className="text-white/70">No entries yet. Start writing to track your emotional journey!</p>
            </motion.div>
          ) : (
            <div className="space-y-4">
              {entries.map((entry, index) => (
                <motion.div
                  key={entry.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  className={`glass-panel p-6 cursor-pointer bg-gradient-to-br ${emotionColors[entry.emotion]}`}
                  onClick={() => setSelectedEntry(entry)}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{emotionEmojis[entry.emotion]}</span>
                      <div>
                        <h3 className="text-white font-semibold text-lg">{entry.title}</h3>
                        <p className="text-white/60 text-sm">
                          {entry.date.toLocaleDateString('en-US', { 
                            weekday: 'long', 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                          })}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        entry.sentiment === 'positive' ? 'bg-green-500/20 text-green-300' :
                        entry.sentiment === 'negative' ? 'bg-red-500/20 text-red-300' :
                        'bg-gray-500/20 text-gray-300'
                      }`}>
                        {entry.sentiment}
                      </span>
                    </div>
                  </div>
                  
                  <p className="text-white/80 line-clamp-3 mb-4">{entry.content}</p>
                  
                  {entry.keywords.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {entry.keywords.slice(0, 3).map((keyword, i) => (
                        <span
                          key={i}
                          className="px-2 py-1 bg-white/10 rounded-full text-xs text-white/70"
                        >
                          {keyword}
                        </span>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* Entry Detail / Emotion Summary */}
        <div className="lg:col-span-1">
          {selectedEntry ? (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="glass-panel p-6 sticky top-24"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-white">Entry Details</h3>
                <button
                  onClick={() => handleDeleteEntry(selectedEntry.id)}
                  className="text-red-400 hover:text-red-300 p-2"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="text-4xl">{emotionEmojis[selectedEntry.emotion]}</span>
                  <div>
                    <p className="text-white font-medium capitalize">{selectedEntry.emotion}</p>
                    <p className="text-white/60 text-sm capitalize">{selectedEntry.sentiment} sentiment</p>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-white font-medium mb-2">{selectedEntry.title}</h4>
                  <p className="text-white/60 text-sm mb-4">
                    {selectedEntry.date.toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
                
                <div className="max-h-64 overflow-y-auto">
                  <p className="text-white/80 text-sm leading-relaxed">{selectedEntry.content}</p>
                </div>
                
                {selectedEntry.keywords.length > 0 && (
                  <div>
                    <h4 className="text-white font-medium mb-2">Detected Keywords</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedEntry.keywords.map((keyword, i) => (
                        <span
                          key={i}
                          className="px-2 py-1 bg-white/10 rounded-full text-xs text-white/70"
                        >
                          {keyword}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="glass-panel p-6 sticky top-24"
            >
              <h3 className="text-xl font-semibold text-white mb-4">Emotion Summary</h3>
              
              {entries.length > 0 ? (
                <div className="space-y-4">
                  <div>
                    <h4 className="text-white/80 text-sm font-medium mb-2">Recent Emotions</h4>
                    <div className="flex flex-wrap gap-2">
                      {Array.from(new Set(entries.slice(0, 10).map(e => e.emotion))).map(emotion => (
                        <div key={emotion} className="flex items-center gap-2 px-3 py-2 bg-white/10 rounded-lg">
                          <span className="text-lg">{emotionEmojis[emotion]}</span>
                          <span className="text-white/80 text-sm capitalize">{emotion}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-white/80 text-sm font-medium mb-2">Sentiment Trend</h4>
                    <div className="space-y-2">
                      {['positive', 'neutral', 'negative'].map(sentiment => {
                        const count = entries.filter(e => e.sentiment === sentiment).length;
                        const percentage = entries.length > 0 ? (count / entries.length) * 100 : 0;
                        return (
                          <div key={sentiment} className="flex items-center gap-3">
                            <span className="text-white/70 text-sm capitalize w-16">{sentiment}</span>
                            <div className="flex-1 bg-white/10 rounded-full h-2">
                              <div 
                                className={`h-2 rounded-full ${
                                  sentiment === 'positive' ? 'bg-green-500' :
                                  sentiment === 'negative' ? 'bg-red-500' : 'bg-gray-500'
                                }`}
                                style={{ width: `${percentage}%` }}
                              ></div>
                            </div>
                            <span className="text-white/60 text-sm">{count}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-white/60 text-sm">Start writing entries to see your emotion patterns!</p>
              )}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}