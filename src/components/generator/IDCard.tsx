'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface IDCardProps {
  photo: string | null;
  name: string;
  stack: string;
  builderClass: string;
  builderId: string;
  frameStyle?: string;
  vibe?: string;
  zoom?: number;
  position?: { x: number; y: number };
  rotation?: number;
  brightness?: number;
  contrast?: number;
  saturation?: number;
}

const VIBE_THEMES: Record<
  string,
  {
    cardBg: string;
    borderColor: string;
    innerBorder: string;
    accentText: string;
    secondaryText: string;
    stampBg: string;
    stampText: string;
    stampBorder: string;
    photoBg: string;
    ropeGradient: string;
    ropeRingBorder: string;
    badgeBg: string;
    badgeText: string;
    showSunburstRays?: boolean;
  }
> = {
  sunburst: {
    cardBg: 'bg-gradient-to-b from-[#3B1306] via-[#5C2007] to-[#210A03]',
    borderColor: 'border-[#1A0802]',
    innerBorder: 'border-[#FFD700]',
    accentText: 'text-[#FFE566]',
    secondaryText: 'text-[#FFF5D6]',
    stampBg: 'bg-[#2A0B03]',
    stampText: 'text-[#FFD700]',
    stampBorder: 'border-[#FFD700]',
    photoBg: 'bg-[#1C0802]',
    ropeGradient: 'from-[#D49E1F] via-[#FFD700] to-[#D49E1F]',
    ropeRingBorder: 'border-[#FFD700]',
    badgeBg: 'bg-[#FFD700]',
    badgeText: 'text-[#210A03]',
    showSunburstRays: true,
  },
  'sunset-pink': {
    cardBg: 'bg-gradient-to-b from-[#581C87] via-[#BE123C] to-[#4C0519]',
    borderColor: 'border-[#380413]',
    innerBorder: 'border-[#F5DD3B]',
    accentText: 'text-[#F5DD3B]',
    secondaryText: 'text-[#FFF1F2]',
    stampBg: 'bg-[#881337]',
    stampText: 'text-[#F5DD3B]',
    stampBorder: 'border-[#F5DD3B]',
    photoBg: 'bg-[#4C0519]',
    ropeGradient: 'from-[#E62E78] via-[#F5DD3B] to-[#E62E78]',
    ropeRingBorder: 'border-[#F5DD3B]',
    badgeBg: 'bg-[#E62E78]',
    badgeText: 'text-white',
  },
  night: {
    cardBg: 'bg-gradient-to-b from-[#0F172A] via-[#1E293B] to-[#090D16]',
    borderColor: 'border-[#020617]',
    innerBorder: 'border-[#38BDF8]',
    accentText: 'text-[#38BDF8]',
    secondaryText: 'text-[#F1F5F9]',
    stampBg: 'bg-[#0F172A]',
    stampText: 'text-[#38BDF8]',
    stampBorder: 'border-[#38BDF8]',
    photoBg: 'bg-[#020617]',
    ropeGradient: 'from-[#0284C7] via-[#38BDF8] to-[#0284C7]',
    ropeRingBorder: 'border-[#38BDF8]',
    badgeBg: 'bg-[#38BDF8]',
    badgeText: 'text-[#090D16]',
  },
  sea: {
    cardBg: 'bg-gradient-to-b from-[#0F4C81] via-[#1E6091] to-[#0A2E50]',
    borderColor: 'border-[#051C33]',
    innerBorder: 'border-[#38BDF8]',
    accentText: 'text-[#38BDF8]',
    secondaryText: 'text-[#E0F2FE]',
    stampBg: 'bg-[#0A2E50]',
    stampText: 'text-[#38BDF8]',
    stampBorder: 'border-[#38BDF8]',
    photoBg: 'bg-[#051C33]',
    ropeGradient: 'from-[#0284C7] via-[#38BDF8] to-[#0284C7]',
    ropeRingBorder: 'border-[#38BDF8]',
    badgeBg: 'bg-[#38BDF8]',
    badgeText: 'text-[#0A2E50]',
  },
  monsoon: {
    cardBg: 'bg-gradient-to-b from-[#163D28] via-[#1E5B3A] to-[#0F2E1D]',
    borderColor: 'border-[#17251C]',
    innerBorder: 'border-[#F5DD3B]',
    accentText: 'text-[#F5DD3B]',
    secondaryText: 'text-[#F6F0D8]',
    stampBg: 'bg-[#163D28]',
    stampText: 'text-[#F5DD3B]',
    stampBorder: 'border-[#F5DD3B]',
    photoBg: 'bg-[#0F2E1D]',
    ropeGradient: 'from-[#D4BE1F] via-[#F5DD3B] to-[#D4BE1F]',
    ropeRingBorder: 'border-[#F5DD3B]',
    badgeBg: 'bg-[#F5DD3B]',
    badgeText: 'text-[#17251C]',
  },
  'forest-wave': {
    cardBg: 'bg-gradient-to-b from-[#163D28] via-[#1E5B3A] to-[#0F2E1D]',
    borderColor: 'border-[#17251C]',
    innerBorder: 'border-[#F5DD3B]',
    accentText: 'text-[#F5DD3B]',
    secondaryText: 'text-[#F6F0D8]',
    stampBg: 'bg-[#163D28]',
    stampText: 'text-[#F5DD3B]',
    stampBorder: 'border-[#F5DD3B]',
    photoBg: 'bg-[#0F2E1D]',
    ropeGradient: 'from-[#D4BE1F] via-[#F5DD3B] to-[#D4BE1F]',
    ropeRingBorder: 'border-[#F5DD3B]',
    badgeBg: 'bg-[#F5DD3B]',
    badgeText: 'text-[#17251C]',
  },
};

export function IDCard({
  photo,
  name,
  stack,
  builderClass,
  builderId,
  frameStyle,
  vibe,
  zoom = 1,
  position = { x: 0, y: 0 },
  rotation = 0,
  brightness = 100,
  contrast = 100,
  saturation = 100,
}: IDCardProps) {
  const selectedKey = (vibe || frameStyle || 'forest-wave').toLowerCase().trim();
  const themeKey = selectedKey.includes('sunburst')
    ? 'sunburst'
    : selectedKey.includes('sunset')
    ? 'sunset-pink'
    : selectedKey.includes('night')
    ? 'night'
    : selectedKey.includes('sea')
    ? 'sea'
    : VIBE_THEMES[selectedKey]
    ? selectedKey
    : 'forest-wave';

  const currentTheme = VIBE_THEMES[themeKey];

  // Interactive 3D tilt effect state
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setRotateX(-y / 18);
    setRotateY(x / 18);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <div className="relative flex flex-col items-center select-none perspective-1000">
      {/* Hanging Lanyard Ropes & Metal Clips */}
      <div className="flex justify-between w-[68%] -mb-3.5 z-30 pointer-events-none">
        {/* Left Rope & Clip */}
        <div className="flex flex-col items-center">
          <div
            className={`w-2 h-14 bg-gradient-to-r ${currentTheme.ropeGradient} shadow-md rounded-t-sm`}
          />
          <div
            className={`w-4 h-4 rounded-full border-2 ${currentTheme.ropeRingBorder} bg-[#17251C] shadow-sm`}
          />
        </div>
        {/* Right Rope & Clip */}
        <div className="flex flex-col items-center">
          <div
            className={`w-2 h-14 bg-gradient-to-r ${currentTheme.ropeGradient} shadow-md rounded-t-sm`}
          />
          <div
            className={`w-4 h-4 rounded-full border-2 ${currentTheme.ropeRingBorder} bg-[#17251C] shadow-sm`}
          />
        </div>
      </div>

      {/* Interactive 3D Tilting Badge Container */}
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        animate={{ rotateX, rotateY }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        style={{ transformStyle: 'preserve-3d' }}
        className={`relative overflow-hidden ${currentTheme.cardBg} border-4 ${currentTheme.borderColor} rounded-md p-4.5 w-full max-w-[350px] shadow-[10px_10px_0px_rgba(15,23,42,0.4)] border-t-[6px] transition-shadow duration-300 hover:shadow-[14px_14px_0px_rgba(15,23,42,0.5)]`}
      >
        {/* Lanyard Hole Punch Slot */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-10 h-2 rounded-full bg-[#0F172A] border border-white/20 z-20 shadow-inner" />

        {/* Sunburst Rays Overlay (for Sunburst theme) */}
        {currentTheme.showSunburstRays && (
          <div className="absolute inset-0 pointer-events-none opacity-25 overflow-hidden z-0">
            <svg viewBox="0 0 400 400" className="w-full h-full animate-spin-slow">
              <g fill="#FFD700">
                {[...Array(16)].map((_, i) => (
                  <path
                    key={i}
                    d="M200,200 L400,180 L400,220 Z"
                    transform={`rotate(${i * 22.5} 200 200)`}
                  />
                ))}
              </g>
            </svg>
          </div>
        )}

        {/* Background Dot/Stipple Texture */}
        <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#FFF_1px,transparent_1px)] [background-size:14px_14px] z-0" />

        {/* Top Header: HH GOA 2026 & Foil Pass Badge */}
        <div className="flex items-start justify-between relative z-10 mb-3 pt-1">
          {/* Logo */}
          <div className="flex flex-col leading-none">
            <span
              className={`font-display text-2.5xl font-black ${currentTheme.accentText} tracking-tighter drop-shadow-sm`}
            >
              HH GOA 2026
            </span>
            <span
              className={`font-mono text-[9.5px] font-extrabold ${currentTheme.secondaryText} tracking-wider mt-0.5`}
            >
              HACKER HOUSE GOA
            </span>
          </div>

          {/* Official Pass Hologram Badge */}
          <div className="flex flex-col items-end">
            <div
              className={`px-2 py-0.5 ${currentTheme.badgeBg} ${currentTheme.badgeText} font-mono text-[8px] font-black uppercase tracking-widest rounded border border-white/40 shadow-sm rotate-[3deg]`}
            >
              OFFICIAL BUILDER PASS
            </div>
            <span className="font-mono text-[7px] text-white/50 uppercase tracking-wider mt-1">
              GOA · INDIA · OCT 28-31
            </span>
          </div>
        </div>

        {/* Photo Viewport Box */}
        <div
          className={`relative aspect-square w-full ${currentTheme.photoBg} border-2 ${currentTheme.borderColor} overflow-hidden rounded shadow-inner mb-3 group`}
        >
          {/* Photo Inner Border Frame */}
          <div className="absolute inset-0 border border-white/10 pointer-events-none z-10" />

          {photo ? (
            <img
              src={photo}
              alt={name || 'Builder photo'}
              className="w-full h-full object-cover transition-transform duration-200"
              style={{
                transform: `scale(${zoom}) translate(${position.x / zoom}px, ${
                  position.y / zoom
                }px) rotate(${rotation}deg)`,
                filter: `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%)`,
              }}
              draggable={false}
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center text-white/40 p-4 text-center">
              <div
                className={`font-display text-5xl font-black mb-1 ${currentTheme.accentText} opacity-30`}
              >
                {name
                  ? name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')
                  : 'HH'}
              </div>
              <span className="font-mono text-[9px] uppercase tracking-widest opacity-60">
                PHOTO PREVIEW
              </span>
            </div>
          )}
        </div>

        {/* Details & Gold Stamp Area */}
        <div className="relative z-10 flex items-end justify-between mt-2.5">
          {/* Left Builder Text Info */}
          <div className="flex-1 pr-2">
            <h3
              className={`font-display text-xl sm:text-2xl font-extrabold ${currentTheme.accentText} leading-tight truncate uppercase drop-shadow-md tracking-tight`}
            >
              {name || 'PRIYANSHU KHARE'}
            </h3>
            <p
              className={`font-mono text-[10.5px] ${currentTheme.secondaryText} font-semibold tracking-wider truncate uppercase mt-0.5`}
            >
              {stack || 'AI / FULLSTACK DEVELOPER'}
            </p>
            <div className="inline-block mt-1">
              <span
                className={`font-mono text-[10px] ${currentTheme.accentText} font-black tracking-widest uppercase px-1.5 py-0.5 rounded bg-black/30 border ${currentTheme.stampBorder}`}
              >
                BUILDER ⚡ {builderClass || 'THE SHIPPER'}
              </span>
            </div>
          </div>

          {/* Right Gold/Theme Stamp Seal */}
          <div className="flex-shrink-0">
            <div
              className={`w-14 h-14 rounded-full border-2 ${currentTheme.stampBorder} ${currentTheme.stampBg} flex items-center justify-center text-center p-1 shadow-md rotate-[6deg]`}
            >
              <div
                className={`font-mono text-[6px] font-extrabold ${currentTheme.stampText} uppercase leading-tight tracking-tighter`}
              >
                BUILDER OF
                <br />
                <span className="font-serif text-[11px] font-black italic text-white">
                  GOA
                </span>
                <br />
                2026
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Barcode & Builder ID */}
        <div className="mt-3.5 pt-2.5 border-t border-white/20 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span
              className={`font-mono text-xs font-black ${currentTheme.secondaryText} tracking-widest bg-black/40 px-2 py-0.5 rounded border border-white/10`}
            >
              {builderId || 'HH-26-0241'}
            </span>
          </div>

          {/* Simulated Barcode */}
          <div className="flex items-center gap-0.5 h-4 opacity-90">
            {[3, 1, 2, 4, 1, 3, 1, 2, 4, 1, 2, 3, 1, 4, 2].map((w, i) => (
              <div
                key={i}
                className={`h-full ${
                  themeKey === 'sunburst' ? 'bg-[#FFE566]' : 'bg-[#F6F0D8]'
                }`}
                style={{ width: `${w}px` }}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
