'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { EVENT } from '@/lib/config';

/* ================================================================
   PALETTES DATA
   ================================================================ */

const normalizePaletteId = (value: string | null) => {
  const key = (value || 'forest-wave').toLowerCase().trim();
  return key.includes('sunburest') ? 'sunburst' : key;
};

const PALETTES = [
  {
    id: 'forest-wave',
    name: 'FOREST WAVE',
    description: 'Deep Goa × Hacker House',
    image: '/forest-wave.png',
    bgColor: '#1E5B3A',
    accentColor: '#F5DD3B',
  },
  {
    id: 'sunburst',
    name: 'SUNBURST',
    description: 'Warm golden sunset. High-contrast builder energy.',
    image: '/builder-solo.png',
    bgColor: '#3B1306',
    accentColor: '#FFD700',
  },
  {
    id: 'sunset-pink',
    name: 'SUNSET PINK',
    description: 'A little chaos. A lot of Goa.',
    image: '/builder-solo.png',
    bgColor: '#E62E78',
    accentColor: '#F5DD3B',
  },
];

/* ================================================================
   DECORATIVE STRIP
   ================================================================ */

const STRIP_PATTERN = `url("data:image/svg+xml,%3Csvg width='60' height='22' viewBox='0 0 60 22' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='60' height='22' fill='%23C41E62'/%3E%3Crect width='60' height='1' fill='%2317251C'/%3E%3Crect y='21' width='60' height='1' fill='%2317251C'/%3E%3Cpath d='M30 3L38 11L30 19L22 11Z' fill='%231E5B3A' stroke='%23F5DD3B' stroke-width='0.6'/%3E%3Ccircle cx='30' cy='11' r='2.5' fill='%23F5DD3B'/%3E%3Ccircle cx='8' cy='11' r='3.5' fill='%231E5B3A'/%3E%3Ccircle cx='8' cy='11' r='1.5' fill='%23F5DD3B'/%3E%3Ccircle cx='52' cy='11' r='3.5' fill='%231E5B3A'/%3E%3Ccircle cx='52' cy='11' r='1.5' fill='%23F5DD3B'/%3E%3Cellipse cx='19' cy='6' rx='3.5' ry='1.5' fill='%231E5B3A' transform='rotate(25 19 6)'/%3E%3Cellipse cx='41' cy='6' rx='3.5' ry='1.5' fill='%231E5B3A' transform='rotate(-25 41 6)'/%3E%3Cellipse cx='19' cy='16' rx='3.5' ry='1.5' fill='%231E5B3A' transform='rotate(-25 19 16)'/%3E%3Cellipse cx='41' cy='16' rx='3.5' ry='1.5' fill='%231E5B3A' transform='rotate(25 41 16)'/%3E%3Ccircle cx='30' cy='3' r='1' fill='%23F5DD3B' opacity='0.6'/%3E%3Ccircle cx='30' cy='19' r='1' fill='%23F5DD3B' opacity='0.6'/%3E%3C/svg%3E")`;

/* ================================================================
   PAGE 05 — STEP 03: PERSONALIZE
   ================================================================ */

export default function PersonalizeStepPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Photo & Editor State
  const [photoUrl, setPhotoUrl] = useState<string>('/builder-solo.png');
  const [zoom, setZoom] = useState<number>(1);
  const [pan, setPan] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const dragStartRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  // Palette State
  const [selectedPalette, setSelectedPalette] = useState<string>('forest-wave');

  // Load saved state from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedPhoto = localStorage.getItem('hh_builder_photo');
      if (savedPhoto) setPhotoUrl(savedPhoto);

      const savedPalette = normalizePaletteId(localStorage.getItem('hh_builder_palette'));
      if (savedPalette) setSelectedPalette(savedPalette);
    }
  }, []);

  // Handle Photo Upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setPhotoUrl(reader.result);
          setZoom(1);
          setPan({ x: 0, y: 0 });
          if (typeof window !== 'undefined') {
            localStorage.setItem('hh_builder_photo', reader.result);
          }
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Dragging logic
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    dragStartRef.current = { x: e.clientX - pan.x, y: e.clientY - pan.y };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPan({
      x: e.clientX - dragStartRef.current.x,
      y: e.clientY - dragStartRef.current.y,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Reset image pan & zoom
  const handleResetImage = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  // Proceed to Step 04: Frame Selection
  const handleProceedNext = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('hh_builder_palette', normalizePaletteId(selectedPalette));
      localStorage.setItem('hh_builder_zoom', zoom.toString());
      localStorage.setItem('hh_builder_pan', JSON.stringify(pan));
    }
    router.push('/create/frame-select');
  };

  return (
    <div className="min-h-screen bg-[#1E5B3A] text-[#F6F0D8] grain-overlay">
      {/* Hidden File Input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileUpload}
        accept="image/*"
        className="hidden"
      />

      {/* ─── Main Container ─── */}
      <section className="relative pt-6 md:pt-8 pb-16 overflow-hidden">
        <div className="max-container section-padding relative z-10">

          {/* Aged Paper Poster Container matching Reference Image */}
          <div className="relative bg-[#FAF7ED] text-[#17251C] border-2 border-[#17251C] shadow-[8px_8px_0px_rgba(23,37,28,0.3)] p-6 md:p-10 lg:p-12 rounded-sm overflow-hidden">

            {/* ─── Generator Progress Bar (Top of Container) ─── */}
            <div className="flex items-center justify-between border-b-2 border-[#17251C]/15 pb-4 mb-8">
              <div className="flex items-center gap-2 md:gap-4 font-mono text-[10px] md:text-xs font-bold uppercase tracking-wider">
                {/* Step 01: CHOOSE (COMPLETED) */}
                <div
                  onClick={() => router.push('/create')}
                  className="flex items-center gap-1.5 text-[#17251C]/60 cursor-pointer hover:text-[#17251C]"
                >
                  <span className="w-6 h-6 rounded-full border border-[#17251C]/40 flex items-center justify-center text-[10px] font-bold">
                    ✓
                  </span>
                  <span>CHOOSE</span>
                </div>

                <span className="text-[#17251C]/30">→</span>

                {/* Step 02: DETAILS (COMPLETED) */}
                <div
                  onClick={() => router.push('/create/individual')}
                  className="flex items-center gap-1.5 text-[#17251C]/60 cursor-pointer hover:text-[#17251C]"
                >
                  <span className="w-6 h-6 rounded-full border border-[#17251C]/40 flex items-center justify-center text-[10px] font-bold">
                    ✓
                  </span>
                  <span>DETAILS</span>
                </div>

                <span className="text-[#17251C]/30 font-light">→</span>

                {/* Step 03: PERSONALIZE (ACTIVE) */}
                <div className="flex items-center gap-1.5 text-[#17251C]">
                  <span className="w-6 h-6 rounded-full bg-[#F5DD3B] border border-[#17251C] flex items-center justify-center text-[10px] font-black">
                    03
                  </span>
                  <span className="border-b-2 border-[#F5DD3B] pb-0.5">PERSONALIZE</span>
                </div>

                <span className="text-[#17251C]/30 hidden sm:inline">→</span>

                {/* Step 04: FRAME */}
                <div className="hidden sm:flex items-center gap-1.5 text-[#17251C]/40">
                  <span className="w-6 h-6 rounded-full border border-[#17251C]/30 flex items-center justify-center text-[10px]">
                    04
                  </span>
                  <span>FRAME</span>
                </div>

                <span className="text-[#17251C]/30 hidden md:inline">→</span>

                {/* Step 05: GENERATE */}
                <div className="hidden md:flex items-center gap-1.5 text-[#17251C]/40">
                  <span className="w-6 h-6 rounded-full border border-[#17251C]/30 flex items-center justify-center text-[10px]">
                    05
                  </span>
                  <span>GENERATE</span>
                </div>
              </div>

              {/* Red Cancellation Stamp in Top Right */}
              <div className="w-14 h-14 rounded-full border-2 border-dashed border-[#E62E78] flex items-center justify-center text-center p-1 rotate-[-12deg] shrink-0 bg-[#FAF7ED] hidden sm:flex">
                <div className="font-mono text-[7px] font-bold text-[#E62E78] uppercase leading-tight">
                  WELCOME<br />
                  <span className="font-serif text-[9px] font-black italic text-[#17251C]">GOA</span><br />
                  2026
                </div>
              </div>
            </div>

            {/* ─── Title & Subtitle ─── */}
            <div className="relative mb-8">
              <h1 className="font-display font-black leading-[0.88] tracking-[-0.03em] uppercase mb-2 text-4xl sm:text-5xl md:text-6xl text-[#17251C]">
                <span className="text-[#E62E78] inline-block -rotate-12 mr-1">*</span>
                MAKE IT <span className="text-[#D4BE1F]">YOURS.</span>
              </h1>
              <p className="font-mono text-xs md:text-sm text-[#17251C]/75 leading-relaxed">
                Your identity. Your photo. Your vibe.
              </p>
            </div>

            {/* ─── Main Editor Grid: PHOTO EDITOR (Left) vs PICK YOUR VIBE (Right) ─── */}
            <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-8 items-start mb-10">

              {/* ── LEFT CONTAINER: MAIN PHOTO EDITOR ── */}
              <div className="bg-[#163D28] text-[#F6F0D8] border-2 border-[#17251C] rounded-lg p-5 md:p-6 shadow-[6px_6px_0px_#17251C]">
                <div className="grid grid-cols-1 sm:grid-cols-[0.8fr_1.2fr] gap-5 items-stretch">

                  {/* Sub-box 1: Upload Dropzone */}
                  <div className="flex flex-col justify-between">
                    <div>
                      <h3 className="font-mono text-[11px] font-extrabold uppercase tracking-wider text-[#F5DD3B] mb-1">
                        UPLOAD YOUR PORTRAIT
                      </h3>
                      <p className="font-mono text-[9px] text-[#F6F0D8]/50 mb-4">
                        JPG, PNG, WEBP or HEIC
                      </p>
                    </div>

                    <div
                      onClick={() => fileInputRef.current?.click()}
                      className="border-2 border-dashed border-[#F6F0D8]/30 hover:border-[#F5DD3B] rounded-md p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-colors bg-[#0F2E1D]/50 hover:bg-[#0F2E1D] group min-h-[180px]"
                    >
                      <div className="w-10 h-10 rounded-full border border-[#F6F0D8]/20 flex items-center justify-center mb-3 text-[#F5DD3B] group-hover:scale-110 transition-transform">
                        🖼️
                      </div>
                      <span className="font-mono text-[10px] font-bold text-[#F5DD3B] uppercase tracking-wider">
                        CLICK TO UPLOAD
                      </span>
                      <span className="font-mono text-[8px] text-[#F6F0D8]/40 mt-1">
                        OR DRAG & DROP
                      </span>
                    </div>
                  </div>

                  {/* Sub-box 2: Interactive Cropper Viewport & Controls */}
                  <div className="flex flex-col justify-between">

                    {/* Viewport Frame */}
                    <div
                      onMouseDown={handleMouseDown}
                      onMouseMove={handleMouseMove}
                      onMouseUp={handleMouseUp}
                      onMouseLeave={handleMouseUp}
                      className="relative aspect-square rounded border border-[#F6F0D8]/30 overflow-hidden bg-[#0F2E1D] cursor-grab active:cursor-grabbing select-none"
                    >
                      {/* Top Overlay Helpers */}
                      <div className="absolute top-2 left-2 z-20 font-mono text-[8px] text-[#F5DD3B] bg-[#17251C]/80 px-2 py-0.5 rounded border border-[#F5DD3B]/30 flex items-center gap-1">
                        <span>👆</span> DRAG TO PAN
                      </div>
                      <div className="absolute top-2 right-2 z-20 font-mono text-[8px] text-[#F6F0D8]/70 bg-[#17251C]/80 px-2 py-0.5 rounded border border-[#F6F0D8]/20 flex items-center gap-1">
                        <span>🖱️</span> SCROLL TO ZOOM
                      </div>

                      {/* Image Element */}
                      <div
                        className="w-full h-full relative"
                        style={{
                          transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
                          transition: isDragging ? 'none' : 'transform 0.1s ease-out',
                        }}
                      >
                        <Image
                          src={photoUrl}
                          alt="Uploaded portrait"
                          fill
                          className="object-cover pointer-events-none"
                        />
                      </div>
                    </div>

                    {/* Controls Bar */}
                    <div className="mt-4 pt-3 border-t border-[#F6F0D8]/15 flex items-center justify-between gap-3 font-mono text-xs">
                      {/* Zoom Controls */}
                      <div className="flex items-center gap-2 bg-[#0F2E1D] px-3 py-1.5 rounded border border-[#F6F0D8]/20">
                        <button
                          onClick={() => setZoom((z) => Math.max(0.5, z - 0.1))}
                          className="text-[#F5DD3B] font-bold hover:scale-110"
                        >
                          −
                        </button>
                        <span className="text-[10px] text-[#F6F0D8]/70 font-bold w-12 text-center uppercase">
                          ZOOM
                        </span>
                        <button
                          onClick={() => setZoom((z) => Math.min(2.5, z + 0.1))}
                          className="text-[#F5DD3B] font-bold hover:scale-110"
                        >
                          +
                        </button>
                      </div>

                      <span className="text-[#F6F0D8]/20">|</span>

                      {/* Reset Button */}
                      <button
                        onClick={handleResetImage}
                        className="px-3 py-1.5 bg-[#0F2E1D] hover:bg-[#FAF7ED] hover:text-[#17251C] text-[#F6F0D8] text-[10px] font-bold uppercase rounded border border-[#F6F0D8]/20 transition-colors flex items-center gap-1"
                      >
                        <span>RESET</span> <span>↻</span>
                      </button>
                    </div>

                  </div>
                </div>
              </div>

              {/* ── RIGHT CONTAINER: PICK YOUR VIBE (PALETTES) ── */}
              <div className="bg-[#163D28] text-[#F6F0D8] border-2 border-[#17251C] rounded-lg p-5 md:p-6 shadow-[6px_6px_0px_#17251C]">
                <div className="mb-4 border-b border-[#F6F0D8]/15 pb-2">
                  <h3 className="font-mono text-[11px] font-extrabold uppercase tracking-wider text-[#F5DD3B]">
                    PICK YOUR VIBE
                  </h3>
                  <p className="font-mono text-[9.5px] text-[#F6F0D8]/60 mt-0.5">
                    Choose the visual energy of your Builder ID.
                  </p>
                </div>

                {/* 3 Curated Palettes Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {PALETTES.map((palette) => {
                    const isSelected = selectedPalette === palette.id;
                    return (
                      <div
                        key={palette.id}
                        onClick={() => {
                          const nextPalette = normalizePaletteId(palette.id);
                          setSelectedPalette(nextPalette);
                          if (typeof window !== 'undefined') {
                            localStorage.setItem('hh_builder_palette', nextPalette);
                          }
                        }}
                        className={`bg-[#0F2E1D] border-2 rounded-md p-3 cursor-pointer transition-all flex flex-col justify-between ${
                          isSelected
                            ? 'border-[#F5DD3B] ring-2 ring-[#F5DD3B]/50 shadow-[4px_4px_0px_#17251C]'
                            : 'border-[#F6F0D8]/20 hover:border-[#F6F0D8]/50'
                        }`}
                      >
                        <div>
                          {/* Radio Circle & Title */}
                          <div className="flex items-center gap-2 mb-2">
                            <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${isSelected ? 'border-[#F5DD3B] bg-[#F5DD3B]' : 'border-[#F6F0D8]/40'}`}>
                              {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-[#17251C]" />}
                            </div>
                            <span className="font-display font-black text-xs text-[#F6F0D8] uppercase tracking-tight truncate">
                              {palette.name}
                            </span>
                          </div>

                          {/* Image Preview */}
                          <div className="relative aspect-[3/4] rounded border border-[#F6F0D8]/15 overflow-hidden mb-2">
                            <Image
                              src={palette.image}
                              alt={palette.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                        </div>

                        {/* Subtitle */}
                        <p className="font-mono text-[8.5px] text-[#F6F0D8]/60 leading-tight">
                          {palette.description}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>

            {/* ─── Bottom Navigation Button ─── */}
            <div className="mt-8 pt-6 border-t border-[#17251C]/15 flex items-center justify-between flex-wrap gap-4">
              <button
                onClick={() => router.push('/create/individual')}
                className="font-mono text-xs font-bold uppercase text-[#17251C]/60 hover:text-[#17251C] transition-colors flex items-center gap-1"
              >
                ← BACK TO DETAILS
              </button>

              <button
                onClick={handleProceedNext}
                className="px-8 py-3.5 bg-[#F5DD3B] text-[#17251C] font-mono text-xs font-bold uppercase tracking-wider border-2 border-[#17251C] shadow-[4px_4px_0px_#17251C] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[6px_6px_0px_#17251C] active:translate-x-[1px] active:translate-y-[1px] transition-all"
              >
                NEXT: PICK MY FRAME →
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* ─── Decorative Ribbon Strip ─── */}
      <div
        className="w-full h-[22px] bg-repeat-x"
        style={{
          backgroundImage: STRIP_PATTERN,
          backgroundSize: '60px 22px',
        }}
        aria-hidden="true"
      />
    </div>
  );
}
