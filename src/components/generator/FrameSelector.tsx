'use client';

import { motion } from 'framer-motion';
import { FRAME_STYLES, FRAME_FORMATS } from '@/lib/config';

interface FrameSelectorProps {
  selectedStyle: string;
  selectedFormat: string;
  onStyleChange: (style: string) => void;
  onFormatChange: (format: string) => void;
}

const styleGradients: Record<string, string> = {
  monsoon: 'linear-gradient(135deg, #1E5B3A 0%, #2d5a3f 50%, #163D28 100%)',
  sunburst: 'linear-gradient(135deg, #3B1306 0%, #6E2208 50%, #210A03 100%)',
  night: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
  sea: 'linear-gradient(135deg, #1e6091 0%, #2980b9 50%, #1a5276 100%)',
};

const formatIcons: Record<string, React.ReactNode> = {
  portrait: (
    <svg viewBox="0 0 24 32" className="w-4 h-5" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="1" y="1" width="22" height="30" rx="1" />
    </svg>
  ),
  landscape: (
    <svg viewBox="0 0 32 24" className="w-5 h-4" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="1" y="1" width="30" height="22" rx="1" />
    </svg>
  ),
  square: (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="1" y="1" width="22" height="22" rx="1" />
    </svg>
  ),
  arch: (
    <svg viewBox="0 0 24 32" className="w-4 h-5" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M1 32V12C1 6 5.5 1 12 1s11 5 11 11v20" />
    </svg>
  ),
  pfp: (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="11" />
    </svg>
  ),
  vip: (
    <svg viewBox="0 0 20 32" className="w-3 h-5" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="1" y="1" width="18" height="30" rx="1" />
      <line x1="1" y1="8" x2="19" y2="8" />
    </svg>
  ),
  team: (
    <svg viewBox="0 0 32 20" className="w-5 h-3" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="1" y="1" width="30" height="18" rx="1" />
    </svg>
  ),
  ornate: (
    <svg viewBox="0 0 24 32" className="w-4 h-5" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="1" y="1" width="22" height="30" rx="1" />
      <rect x="3" y="3" width="18" height="26" rx="0.5" />
    </svg>
  ),
};

export function FrameSelector({
  selectedStyle,
  selectedFormat,
  onStyleChange,
  onFormatChange,
}: FrameSelectorProps) {
  return (
    <div className="space-y-6">
      {/* Style selector */}
      <div>
        <label className="text-label text-xs text-dark-ink/60 mb-3 block">
          Pick a vibe that represents you.
        </label>
        <div className="grid grid-cols-4 gap-3">
          {FRAME_STYLES.map((style) => {
            const isSelected = selectedStyle === style.id;
            return (
              <motion.button
                key={style.id}
                onClick={() => onStyleChange(style.id)}
                whileTap={{ scale: 0.95 }}
                className={`relative overflow-hidden aspect-square border-2 transition-all ${
                  isSelected
                    ? 'border-hot-pink ring-2 ring-hot-pink/30'
                    : 'border-dark-ink/15 hover:border-dark-ink/30'
                }`}
                aria-pressed={isSelected}
                aria-label={style.label}
              >
                <div
                  className="absolute inset-0"
                  style={{ background: styleGradients[style.id] }}
                />
                {/* Sun/moon indicator */}
                <div className="absolute inset-0 flex items-center justify-center">
                  {style.id === 'night' ? (
                    <div className="w-6 h-6 rounded-full bg-white/20" />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-white/15" />
                  )}
                </div>
                <span className="absolute bottom-1 left-0 right-0 text-center text-white text-label" style={{ fontSize: '0.5rem' }}>
                  {style.label}
                </span>
                {isSelected && (
                  <motion.div
                    layoutId="style-indicator"
                    className="absolute top-1 right-1 w-2.5 h-2.5 bg-hot-pink rounded-full"
                    transition={{ type: 'spring', bounce: 0.3, duration: 0.3 }}
                  />
                )}
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Format selector */}
      <div>
        <label className="text-label text-xs text-dark-ink/60 mb-3 block">
          Pick your format.
        </label>
        <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
          {FRAME_FORMATS.map((format) => {
            const isSelected = selectedFormat === format.id;
            return (
              <motion.button
                key={format.id}
                onClick={() => onFormatChange(format.id)}
                whileTap={{ scale: 0.95 }}
                className={`flex flex-col items-center gap-1 p-2 border-2 transition-all ${
                  isSelected
                    ? 'border-hot-pink bg-hot-pink/5'
                    : 'border-dark-ink/10 bg-cream-light hover:border-dark-ink/20'
                }`}
                aria-pressed={isSelected}
                aria-label={format.label}
              >
                <div className={isSelected ? 'text-hot-pink' : 'text-dark-ink/40'}>
                  {formatIcons[format.id]}
                </div>
                <span
                  className={`text-label ${isSelected ? 'text-hot-pink' : 'text-dark-ink/40'}`}
                  style={{ fontSize: '0.45rem' }}
                >
                  {format.label}
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
