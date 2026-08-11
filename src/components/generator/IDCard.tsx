'use client';

import React from 'react';

interface IDCardProps {
  photo: string | null;
  name: string;
  stack: string;
  builderClass: string;
  builderId: string;
  frameStyle?: string;
  zoom?: number;
  position?: { x: number; y: number };
  rotation?: number;
  brightness?: number;
  contrast?: number;
  saturation?: number;
}

export function IDCard({
  photo,
  name,
  stack,
  builderClass,
  builderId,
  zoom = 1,
  position = { x: 0, y: 0 },
  rotation = 0,
  brightness = 100,
  contrast = 100,
  saturation = 100,
}: IDCardProps) {
  return (
    <div className="relative flex flex-col items-center">
      {/* Hanging Lanyard Ropes & Metal Hooks (Matching Panel 3 & 4 of specification screenshot) */}
      <div className="flex justify-between w-[65%] -mb-3 z-20 pointer-events-none">
        {/* Left Rope & Hook */}
        <div className="flex flex-col items-center">
          <div className="w-1.5 h-12 bg-gradient-to-r from-[#D4BE1F] via-[#F5DD3B] to-[#D4BE1F] shadow-sm rounded-t-sm" />
          <div className="w-4 h-4 rounded-full border-2 border-[#F5DD3B] bg-[#17251C]" />
        </div>
        {/* Right Rope & Hook */}
        <div className="flex flex-col items-center">
          <div className="w-1.5 h-12 bg-gradient-to-r from-[#D4BE1F] via-[#F5DD3B] to-[#D4BE1F] shadow-sm rounded-t-sm" />
          <div className="w-4 h-4 rounded-full border-2 border-[#F5DD3B] bg-[#17251C]" />
        </div>
      </div>

      {/* The Hanging ID Card Badge */}
      <div
        className="relative overflow-hidden select-none bg-[#163D28] border-4 border-[#17251C] rounded-sm p-4 w-full max-w-[340px] shadow-[8px_8px_0px_rgba(23,37,28,0.3)]"
        style={{
          aspectRatio: '3/4.2',
        }}
      >
        {/* Background Tropical Leaf Pattern Overlay */}
        <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#F5DD3B_1px,transparent_1px)] [background-size:16px_16px]" />

        {/* Top Header: HH GOA 2026 & Botanical Leaves */}
        <div className="flex items-start justify-between relative z-10 mb-3">
          <div className="flex flex-col leading-none">
            <span className="font-display text-2xl font-black text-[#F5DD3B] tracking-tighter">
              HH
            </span>
            <span className="font-display text-xs font-black text-[#F6F0D8] tracking-widest">
              GOA
            </span>
            <span className="font-mono text-[10px] font-bold text-[#F5DD3B] tracking-wider mt-0.5">
              2026
            </span>
          </div>

          {/* Botanical Tropical Floral Stamp Artwork Top Right */}
          <div className="w-14 h-14 opacity-80 text-[#F5DD3B]">
            <svg viewBox="0 0 50 50" fill="currentColor">
              <path d="M25 5 C20 15, 10 20, 5 25 C15 30, 20 40, 25 45 C30 40, 40 30, 45 25 C40 20, 30 15, 25 5 Z" opacity="0.6" />
              <circle cx="25" cy="25" r="4" fill="#F6F0D8" />
              <circle cx="18" cy="18" r="2" />
              <circle cx="32" cy="18" r="2" />
              <circle cx="32" cy="32" r="2" />
              <circle cx="18" cy="32" r="2" />
            </svg>
          </div>
        </div>

        {/* Photo Box */}
        <div className="relative aspect-square w-full bg-[#0F2E1D] border-2 border-[#17251C] overflow-hidden rounded-xs shadow-inner mb-3">
          {photo ? (
            <img
              src={photo}
              alt={name || 'Builder photo'}
              className="w-full h-full object-cover"
              style={{
                transform: `scale(${zoom}) translate(${position.x / zoom}px, ${position.y / zoom}px) rotate(${rotation}deg)`,
                filter: `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%)`,
              }}
              draggable={false}
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center text-[#F6F0D8]/40 p-4 text-center">
              <div className="font-display text-4xl font-black mb-1 text-[#F5DD3B]/30">
                {name ? name.split(' ').map(n => n[0]).join('') : 'HH'}
              </div>
              <span className="font-mono text-[9px] uppercase tracking-widest text-[#F6F0D8]/50">
                Photo Preview
              </span>
            </div>
          )}
        </div>

        {/* Details & Gold Stamp Area */}
        <div className="relative z-10 flex items-end justify-between mt-2">
          {/* Left Text */}
          <div className="flex-1 pr-2">
            <h3 className="font-display text-lg sm:text-xl font-extrabold text-[#F5DD3B] leading-tight truncate uppercase">
              {name || 'DEVANSHU DUBEY'}
            </h3>
            <p className="font-mono text-[10px] text-[#F6F0D8] font-medium tracking-wider truncate uppercase mt-0.5">
              {stack || 'AI / FULLSTACK DEVELOPER'}
            </p>
            <p className="font-mono text-[11px] text-[#F5DD3B] font-bold tracking-widest uppercase mt-1">
              {builderClass || 'THE SHIPPER'}
            </p>
          </div>

          {/* Right Gold Circular Stamp */}
          <div className="flex-shrink-0">
            <div className="w-14 h-14 rounded-full border-2 border-[#F5DD3B] flex items-center justify-center text-center p-1 bg-[#163D28] shadow-sm rotate-[6deg]">
              <div className="font-mono text-[6px] font-extrabold text-[#F5DD3B] uppercase leading-tight tracking-tighter">
                BUILDER OF<br />
                <span className="font-serif text-[10px] font-black italic text-[#F6F0D8]">GOA</span><br />
                2026
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Barcode & ID */}
        <div className="mt-3 pt-2 border-t border-[#F5DD3B]/30 flex items-center justify-between">
          <span className="font-mono text-xs font-extrabold text-[#F6F0D8] tracking-widest">
            {builderId || 'HH-26-0241'}
          </span>

          {/* Simulated Barcode */}
          <div className="flex items-center gap-0.5 h-4 opacity-80">
            {[2, 1, 3, 1, 2, 4, 1, 2, 1, 3, 2, 1, 4, 1, 2].map((w, i) => (
              <div
                key={i}
                className="h-full bg-[#F6F0D8]"
                style={{ width: `${w}px` }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
