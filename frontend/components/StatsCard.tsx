'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface StatsCardProps {
  icon: ReactNode;
  label: string;
  value: string;
  color: string;
}

export function StatsCard({ icon, label, value, color }: StatsCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -5 }}
      className="glass-panel p-6 text-center floating-animation"
    >
      <div className={`${color} mb-3 flex justify-center`}>
        {icon}
      </div>
      <h3 className="text-2xl font-bold text-white mb-1">{value}</h3>
      <p className="text-white/70 text-sm">{label}</p>
    </motion.div>
  );
}