import React from 'react';
import type { RiskLevel } from '../types';

interface RiskBadgeProps {
  score: number;
  level: RiskLevel;
  showLabel?: boolean;
  size?: 'sm' | 'md';
}

export const RiskBadge: React.FC<RiskBadgeProps> = ({ score, level, showLabel = true, size = 'sm' }) => {
  const getColors = (level: RiskLevel) => {
    switch (level) {
      case 'critical':
        return {
          dot: '#ef4444',
          bg: '#fef2f2',
          border: '#fecaca',
          text: '#b91c1c'
        };
      case 'high':
        return {
          dot: '#f97316',
          bg: '#fff7ed',
          border: '#fed7aa',
          text: '#c2410c'
        };
      case 'medium':
        return {
          dot: '#f59e0b',
          bg: '#fffbeb',
          border: '#fcd34d',
          text: '#92400e'
        };
      case 'low':
        return {
          dot: '#22c55e',
          bg: '#f0fdf4',
          border: '#86efac',
          text: '#15803d'
        };
    }
  };

  const colors = getColors(level);
  const fontSize = size === 'sm' ? 'text-[11px]' : 'text-[12px]';

  return (
    <span
      className={`inline-flex items-center gap-1.5 ${fontSize} font-bold px-2 py-0.5 rounded-full border`}
      style={{
        backgroundColor: colors.bg,
        borderColor: colors.border,
        color: colors.text
      }}
    >
      <span
        className="w-1.5 h-1.5 rounded-full"
        style={{ backgroundColor: colors.dot }}
      />
      <span className="font-mono">{score}</span>
      {showLabel && <span className="capitalize">{level}</span>}
    </span>
  );
};
