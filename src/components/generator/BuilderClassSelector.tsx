'use client';

import { motion } from 'framer-motion';
import { RefreshCw } from 'lucide-react';
import { BUILDER_CLASSES } from '@/lib/config';

interface BuilderClassSelectorProps {
  selected: (typeof BUILDER_CLASSES)[number] | null;
  onSelect: (builderClass: (typeof BUILDER_CLASSES)[number]) => void;
  onReroll: () => void;
}

const classIcons: Record<string, React.ReactNode> = {
  shipper: (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
    </svg>
  ),
  hacker: (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 17l6-6-6-6M12 19h8" />
    </svg>
  ),
  designer: (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
      <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
    </svg>
  ),
  founder: (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M3 21h18M9 8h6M9 12h6M9 16h6M5 21V5l7-3 7 3v16" />
    </svg>
  ),
  researcher: (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
    </svg>
  ),
  architect: (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M2 20h20M5 20V10l7-7 7 7v10M9 20v-4h6v4" />
    </svg>
  ),
  tinkerer: (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="3" /><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
    </svg>
  ),
  degen: (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="2" y="2" width="20" height="20" rx="2" /><path d="M16 8l-8 8M8 8l8 8" />
    </svg>
  ),
  creator: (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="13.5" cy="6.5" r="2.5" /><path d="M17.5 12.5c-1.38 0-2.5-1.12-2.5-2.5" /><path d="M3 20c0-4.97 4.03-9 9-9s9 4.03 9 9" />
    </svg>
  ),
  'systems-thinker': (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" />
    </svg>
  ),
  'product-person': (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8M12 17v4" />
    </svg>
  ),
};

export function BuilderClassSelector({
  selected,
  onSelect,
  onReroll,
}: BuilderClassSelectorProps) {
  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <span className="text-label text-xs text-dark-ink/60">
          Your archetype. Your energy.
        </span>
        <button
          onClick={onReroll}
          className="flex items-center gap-1 text-label text-xs text-hot-pink hover:text-hot-pink-dark transition-colors"
          aria-label="Reroll builder class"
        >
          <RefreshCw size={12} />
          Reroll
        </button>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
        {BUILDER_CLASSES.map((bc) => {
          const isSelected = selected?.id === bc.id;
          return (
            <motion.button
              key={bc.id}
              onClick={() => onSelect(bc)}
              whileTap={{ scale: 0.95 }}
              className={`relative flex flex-col items-center gap-1.5 p-3 border-2 transition-all ${
                isSelected
                  ? 'border-hot-pink bg-hot-pink/5 shadow-card'
                  : 'border-dark-ink/15 bg-cream-light hover:border-dark-ink/30'
              }`}
              aria-pressed={isSelected}
              aria-label={bc.label}
            >
              <div
                className={`${
                  isSelected ? 'text-hot-pink' : 'text-dark-ink/50'
                }`}
              >
                {classIcons[bc.id] || (
                  <span className="text-lg">{bc.icon}</span>
                )}
              </div>
              <span
                className={`text-label text-center leading-tight ${
                  isSelected ? 'text-hot-pink' : 'text-dark-ink/60'
                }`}
                style={{ fontSize: '0.55rem' }}
              >
                {bc.label}
              </span>

              {isSelected && (
                <motion.div
                  layoutId="class-indicator"
                  className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-hot-pink"
                  transition={{ type: 'spring', bounce: 0.3, duration: 0.4 }}
                />
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
