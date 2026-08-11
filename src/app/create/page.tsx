'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { EVENT } from '@/lib/config';

/* ================================================================
   ICONS FOR METADATA
   ================================================================ */

function IconUser() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function IconIdBadge() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <circle cx="12" cy="10" r="3" />
      <path d="M7 17c0-2 2.2-3 5-3s5 1 5 3" />
    </svg>
  );
}

function IconDownload() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}

function IconUsers() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function IconLayers() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 17 12 22 22 17" />
      <polyline points="2 12 12 17 22 12" />
    </svg>
  );
}

/* ================================================================
   DECORATIVE STRIP
   ================================================================ */

const STRIP_PATTERN = `url("data:image/svg+xml,%3Csvg width='60' height='22' viewBox='0 0 60 22' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='60' height='22' fill='%23C41E62'/%3E%3Crect width='60' height='1' fill='%2317251C'/%3E%3Crect y='21' width='60' height='1' fill='%2317251C'/%3E%3Cpath d='M30 3L38 11L30 19L22 11Z' fill='%231E5B3A' stroke='%23F5DD3B' stroke-width='0.6'/%3E%3Ccircle cx='30' cy='11' r='2.5' fill='%23F5DD3B'/%3E%3Ccircle cx='8' cy='11' r='3.5' fill='%231E5B3A'/%3E%3Ccircle cx='8' cy='11' r='1.5' fill='%23F5DD3B'/%3E%3Ccircle cx='52' cy='11' r='3.5' fill='%231E5B3A'/%3E%3Ccircle cx='52' cy='11' r='1.5' fill='%23F5DD3B'/%3E%3Cellipse cx='19' cy='6' rx='3.5' ry='1.5' fill='%231E5B3A' transform='rotate(25 19 6)'/%3E%3Cellipse cx='41' cy='6' rx='3.5' ry='1.5' fill='%231E5B3A' transform='rotate(-25 41 6)'/%3E%3Cellipse cx='19' cy='16' rx='3.5' ry='1.5' fill='%231E5B3A' transform='rotate(-25 19 16)'/%3E%3Cellipse cx='41' cy='16' rx='3.5' ry='1.5' fill='%231E5B3A' transform='rotate(25 41 16)'/%3E%3Ccircle cx='30' cy='3' r='1' fill='%23F5DD3B' opacity='0.6'/%3E%3Ccircle cx='30' cy='19' r='1' fill='%23F5DD3B' opacity='0.6'/%3E%3C/svg%3E")`;

/* ================================================================
   PAGE 03 — STEP 01: CHOOSE
   ================================================================ */

export default function ChooseStepPage() {
  const router = useRouter();
  const [selectedMode, setSelectedMode] = useState<'solo' | 'squad' | null>(null);

  const handleSelectMode = (mode: 'solo' | 'squad') => {
    setSelectedMode(mode);
    if (typeof window !== 'undefined') {
      localStorage.setItem('hh_builder_mode', mode);
    }
    // Navigate to Step 02 DETAILS
    if (mode === 'solo') {
      router.push('/create/individual');
    } else {
      router.push('/create/team');
    }
  };

  return (
    <div className="min-h-screen bg-[#1E5B3A] text-[#F6F0D8] grain-overlay">
      {/* ─── Main Container ─── */}
      <section className="relative pt-6 md:pt-8 pb-16 overflow-hidden">
        <div className="max-container section-padding relative z-10">

          {/* Aged Paper Poster Container matching Reference Image */}
          <div className="relative bg-[#FAF7ED] text-[#17251C] border-2 border-[#17251C] shadow-[8px_8px_0px_rgba(23,37,28,0.3)] p-6 md:p-10 lg:p-12 rounded-sm overflow-hidden">

            {/* ─── Generator Progress Bar (Top of Container) ─── */}
            <div className="flex items-center justify-between border-b-2 border-[#17251C]/15 pb-4 mb-8">
              <div className="flex items-center gap-2 md:gap-4 font-mono text-[10px] md:text-xs font-bold uppercase tracking-wider">
                {/* Step 01: CHOOSE (ACTIVE) */}
                <div className="flex items-center gap-1.5 text-[#17251C]">
                  <span className="w-6 h-6 rounded-full bg-[#F5DD3B] border border-[#17251C] flex items-center justify-center text-[10px] font-black">
                    01
                  </span>
                  <span className="border-b-2 border-[#F5DD3B] pb-0.5">CHOOSE</span>
                </div>

                <span className="text-[#17251C]/30">→</span>

                {/* Step 02: DETAILS */}
                <div className="flex items-center gap-1.5 text-[#17251C]/40">
                  <span className="w-6 h-6 rounded-full border border-[#17251C]/30 flex items-center justify-center text-[10px]">
                    02
                  </span>
                  <span>DETAILS</span>
                </div>

                <span className="text-[#17251C]/30 hidden sm:inline">→</span>

                {/* Step 03: PERSONALIZE / FRAME */}
                <div className="hidden sm:flex items-center gap-1.5 text-[#17251C]/40">
                  <span className="w-6 h-6 rounded-full border border-[#17251C]/30 flex items-center justify-center text-[10px]">
                    03
                  </span>
                  <span>FRAME</span>
                </div>

                <span className="text-[#17251C]/30 hidden md:inline">→</span>

                {/* Step 04: GENERATE */}
                <div className="hidden md:flex items-center gap-1.5 text-[#17251C]/40">
                  <span className="w-6 h-6 rounded-full border border-[#17251C]/30 flex items-center justify-center text-[10px]">
                    04
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
            <div className="relative mb-10">
              {/* Background Goa Line Drawing Illustration */}
              <div className="absolute right-0 top-0 opacity-15 pointer-events-none hidden lg:block" aria-hidden="true">
                <svg width="240" height="120" viewBox="0 0 240 120" fill="none" stroke="#17251C" strokeWidth="1.5">
                  <circle cx="120" cy="50" r="25" />
                  <path d="M0 100 Q60 80 120 100 T240 100" />
                  <path d="M30 100 L40 60 L50 100" />
                  <path d="M190 100 L200 50 L210 100" />
                </svg>
              </div>

              <div className="relative z-10 max-w-2xl">
                <h1 className="font-display font-black leading-[0.88] tracking-[-0.03em] uppercase mb-3 text-4xl sm:text-5xl md:text-6xl text-[#17251C]">
                  <span className="text-[#E62E78] inline-block -rotate-12 mr-1">*</span>
                  WHAT ARE YOU
                  <br />
                  <span className="text-[#D4BE1F]">BUILDING?</span>
                </h1>

                <p className="font-mono text-xs md:text-sm text-[#17251C]/75 leading-relaxed">
                  Choose your mode.
                  <br />
                  One builder or an entire squad.
                </p>
              </div>
            </div>

            {/* ─── Two Lanyard Card Options (SOLO vs SQUAD) ─── */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">

              {/* ── OPTION 01: BUILD SOLO ── */}
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                onClick={() => handleSelectMode('solo')}
                className={`relative bg-[#163D28] text-[#F6F0D8] border-2 border-[#17251C] rounded-md p-6 flex flex-col justify-between cursor-pointer transition-all duration-200 ${
                  selectedMode === 'solo'
                    ? 'ring-4 ring-[#F5DD3B] shadow-[8px_8px_0px_#17251C]'
                    : 'shadow-[6px_6px_0px_#17251C] hover:shadow-[8px_8px_0px_#17251C]'
                }`}
              >
                {/* Lanyard Punch Hole */}
                <div className="absolute top-3 left-1/2 -translate-x-1/2 w-8 h-3 rounded-full bg-[#FAF7ED] border border-[#17251C]" />

                <div>
                  {/* Top Bar inside Card */}
                  <div className="flex items-center justify-between mb-4 border-b border-[#F6F0D8]/15 pb-3 pt-2">
                    <span className="font-display text-xs font-black tracking-tight text-[#F5DD3B]">
                      HH GOA 2026
                    </span>
                    <span className="font-mono text-[8px] font-bold border border-[#F5DD3B]/40 px-1.5 py-0.5 rounded text-[#F5DD3B]">
                      PASSPORT
                    </span>
                  </div>

                  {/* Photo Container */}
                  <div className="relative aspect-[4/3] rounded border border-[#F6F0D8]/20 overflow-hidden mb-5 bg-[#0F2E1D]">
                    <Image
                      src="/builder-solo.png"
                      alt="Solo builder portrait"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-2 right-2 w-10 h-10 rounded-full border border-dashed border-[#F5DD3B]/60 flex items-center justify-center text-center bg-[#163D28]/80 text-[6px] font-mono text-[#F5DD3B] uppercase leading-tight rotate-[-8deg]">
                      GOA<br />2026
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h2 className="font-display font-black text-2xl md:text-3xl text-[#F5DD3B] uppercase tracking-tight mb-1">
                    BUILD SOLO
                  </h2>
                  <div className="font-mono text-[10px] md:text-xs font-bold text-[#F6F0D8]/60 uppercase tracking-widest mb-3">
                    ONE BUILDER. ONE IDENTITY.
                  </div>
                  <p className="font-mono text-xs text-[#F6F0D8]/80 leading-relaxed mb-6">
                    Create your personal Hacker House Goa Builder ID.
                  </p>
                </div>

                <div>
                  {/* Metadata Row */}
                  <div className="flex items-center gap-3 font-mono text-[10px] text-[#F5DD3B]/70 border-t border-[#F6F0D8]/10 pt-3 mb-5">
                    <span className="flex items-center gap-1">
                      <IconUser /> 1 PHOTO
                    </span>
                    <span>·</span>
                    <span className="flex items-center gap-1">
                      <IconIdBadge /> 1 BUILDER ID
                    </span>
                    <span>·</span>
                    <span className="flex items-center gap-1">
                      <IconDownload /> INSTANT PNG
                    </span>
                  </div>

                  {/* Action Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelectMode('solo');
                    }}
                    className="w-full py-3.5 bg-[#F5DD3B] text-[#17251C] font-mono text-xs font-bold uppercase tracking-wider border-2 border-[#17251C] shadow-[3px_3px_0px_#17251C] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[5px_5px_0px_#17251C] active:translate-x-[1px] active:translate-y-[1px] transition-all"
                  >
                    BUILD MY ID →
                  </button>
                </div>
              </motion.div>

              {/* ── OPTION 02: BUILD YOUR SQUAD ── */}
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                onClick={() => handleSelectMode('squad')}
                className={`relative bg-[#163D28] text-[#F6F0D8] border-2 border-[#17251C] rounded-md p-6 flex flex-col justify-between cursor-pointer transition-all duration-200 ${
                  selectedMode === 'squad'
                    ? 'ring-4 ring-[#F5DD3B] shadow-[8px_8px_0px_#17251C]'
                    : 'shadow-[6px_6px_0px_#17251C] hover:shadow-[8px_8px_0px_#17251C]'
                }`}
              >
                {/* Lanyard Punch Hole */}
                <div className="absolute top-3 left-1/2 -translate-x-1/2 w-8 h-3 rounded-full bg-[#FAF7ED] border border-[#17251C]" />

                <div>
                  {/* Top Bar inside Card */}
                  <div className="flex items-center justify-between mb-4 border-b border-[#F6F0D8]/15 pb-3 pt-2">
                    <span className="font-display text-xs font-black tracking-tight text-[#F5DD3B]">
                      HH GOA 2026
                    </span>
                    <span className="font-mono text-[8px] font-bold border border-[#F5DD3B]/40 px-1.5 py-0.5 rounded text-[#F5DD3B]">
                      SQUAD CARD
                    </span>
                  </div>

                  {/* Photo Container */}
                  <div className="relative aspect-[4/3] rounded border border-[#F6F0D8]/20 overflow-hidden mb-5 bg-[#0F2E1D]">
                    <Image
                      src="/builder-squad.png"
                      alt="Squad team portrait"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-2 right-2 w-10 h-10 rounded-full border border-dashed border-[#F5DD3B]/60 flex items-center justify-center text-center bg-[#163D28]/80 text-[6px] font-mono text-[#F5DD3B] uppercase leading-tight rotate-[6deg]">
                      SQUAD<br />2026
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h2 className="font-display font-black text-2xl md:text-3xl text-[#F5DD3B] uppercase tracking-tight mb-1">
                    BUILD YOUR SQUAD
                  </h2>
                  <div className="font-mono text-[10px] md:text-xs font-bold text-[#F6F0D8]/60 uppercase tracking-widest mb-3">
                    ONE TEAM. EVERY BUILDER.
                  </div>
                  <p className="font-mono text-xs text-[#F6F0D8]/80 leading-relaxed mb-6">
                    Create a shared identity for your entire hackathon crew.
                  </p>
                </div>

                <div>
                  {/* Metadata Row */}
                  <div className="flex items-center gap-3 font-mono text-[10px] text-[#F5DD3B]/70 border-t border-[#F6F0D8]/10 pt-3 mb-5">
                    <span className="flex items-center gap-1">
                      <IconUsers /> TEAM NAME
                    </span>
                    <span>·</span>
                    <span className="flex items-center gap-1">
                      <IconUser /> MULTIPLE MEMBERS
                    </span>
                    <span>·</span>
                    <span className="flex items-center gap-1">
                      <IconLayers /> FULL SET
                    </span>
                  </div>

                  {/* Action Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelectMode('squad');
                    }}
                    className="w-full py-3.5 bg-[#F5DD3B] text-[#17251C] font-mono text-xs font-bold uppercase tracking-wider border-2 border-[#17251C] shadow-[3px_3px_0px_#17251C] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[5px_5px_0px_#17251C] active:translate-x-[1px] active:translate-y-[1px] transition-all"
                  >
                    BUILD MY SQUAD →
                  </button>
                </div>
              </motion.div>

            </div>

            {/* Bottom Back Button */}
            <div className="mt-10 pt-6 border-t border-[#17251C]/15 flex items-center justify-between">
              <button
                onClick={() => router.push('/house')}
                className="font-mono text-xs font-bold uppercase text-[#17251C]/60 hover:text-[#17251C] transition-colors flex items-center gap-1"
              >
                ← BACK TO THE HOUSE
              </button>
              <span className="font-mono text-[10px] text-[#17251C]/40 uppercase tracking-widest">
                STEP 01 OF 05
              </span>
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
