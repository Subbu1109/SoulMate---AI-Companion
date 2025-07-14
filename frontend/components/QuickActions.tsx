'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { MessageCircle, Brain, Heart, BookOpen} from 'lucide-react';

const actions = [
  { 
    icon: MessageCircle, 
    label: 'Start Chat', 
    href: '/chat',
    color: 'from-blue-500 to-purple-600' 
  },
  { 
    icon: Brain, 
    label: 'View Analytics', 
    href: '/analytics',
    color: 'from-purple-500 to-pink-600' 
  },
  { 
    icon: Heart, 
    label: 'Wellness', 
    href: '/wellness',
    color: 'from-pink-500 to-red-600' 
  },
  { 
    icon: BookOpen, 
    label: 'Diary', 
    href: '/diary',
    color: 'from-green-500 to-teal-600' 
  },
];

export function QuickActions() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {actions.map((action, index) => {
        const Icon = action.icon;
        
        return (
          <Link key={action.label} href={action.href}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className={`glass-panel p-6 text-center cursor-pointer bg-gradient-to-br ${action.color} bg-opacity-20`}
            >
              <Icon className="w-8 h-8 mx-auto mb-3 text-white" />
              <p className="text-white font-medium">{action.label}</p>
            </motion.div>
          </Link>
        );
      })}
    </div>
  );
}

