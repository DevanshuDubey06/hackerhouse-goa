'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { EVENT } from '@/lib/config';

/* ================================================================
   BUILDER CLASSES LIST
   ================================================================ */

const BUILDER_CLASSES_LIST = [
  { id: 'neural-nomad', label: 'NEURAL NOMAD', icon: '⚡' },
  { id: 'stack-surfer', label: 'STACK SURFER', icon: '🏄' },
  { id: 'api-alchemist', label: 'API ALCHEMIST', icon: '🧪' },
  { id: 'pixel-pirate', label: 'PIXEL PIRATE', icon: '🏴‍☠️' },
  { id: 'code-cartographer', label: 'CODE CARTOGRAPHER', icon: '🗺️' },
  { id: 'data-drifter', label: 'DATA DRIFTER', icon: '🌌' },
  { id: 'bug-hunter', label: 'BUG HUNTER', icon: '👾' },
  { id: 'system-shaman', label: 'SYSTEM SHAMAN', icon: '🔮' },
  { id: 'cloud-runner', label: 'CLOUD RUNNER', icon: '☁️' },
  { id: 'terminal-wizard', label: 'TERMINAL WIZARD', icon: '🧙' },
];

/* ================================================================
   DECORATIVE STRIP
   ================================================================ */

const STRIP_PATTERN = `url("data:image/svg+xml,%3Csvg width='60' height='22' viewBox='0 0 60 22' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='60' height='22' fill='%23C41E62'/%3E%3Crect width='60' height='1' fill='%2317251C'/%3E%3Crect y='21' width='60' height='1' fill='%2317251C'/%3E%3Cpath d='M30 3L38 11L30 19L22 11Z' fill='%231E5B3A' stroke='%23F5DD3B' stroke-width='0.6'/%3E%3Ccircle cx='30' cy='11' r='2.5' fill='%23F5DD3B'/%3E%3Ccircle cx='8' cy='11' r='3.5' fill='%231E5B3A'/%3E%3Ccircle cx='8' cy='11' r='1.5' fill='%23F5DD3B'/%3E%3Ccircle cx='52' cy='11' r='3.5' fill='%231E5B3A'/%3E%3Ccircle cx='52' cy='11' r='1.5' fill='%23F5DD3B'/%3E%3Cellipse cx='19' cy='6' rx='3.5' ry='1.5' fill='%231E5B3A' transform='rotate(25 19 6)'/%3E%3Cellipse cx='41' cy='6' rx='3.5' ry='1.5' fill='%231E5B3A' transform='rotate(-25 41 6)'/%3E%3Cellipse cx='19' cy='16' rx='3.5' ry='1.5' fill='%231E5B3A' transform='rotate(-25 19 16)'/%3E%3Cellipse cx='41' cy='16' rx='3.5' ry='1.5' fill='%231E5B3A' transform='rotate(25 41 16)'/%3E%3Ccircle cx='30' cy='3' r='1' fill='%23F5DD3B' opacity='0.6'/%3E%3Ccircle cx='30' cy='19' r='1' fill='%23F5DD3B' opacity='0.6'/%3E%3C/svg%3E")`;

/* ================================================================
   PAGE 04 — STEP 02: DETAILS
   ================================================================ */

export default function DetailsStepPage() {
  const router = useRouter();

  // Mode state (solo vs squad)
  const [mode, setMode] = useState<'solo' | 'squad'>('solo');

  // Input states
  const [name, setName] = useState('PRIYANSHU KHARE');
  const [stack, setStack] = useState('AI/ML // PYTHON // NEXT.JS');
  const [teamName, setTeamName] = useState('ALPHA SQUAD');

  // Builder class index
  const [classIndex, setClassIndex] = useState(0); // Default: NEURAL NOMAD
  const [isRolling, setIsRolling] = useState(false);

  // Load saved draft or mode on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedMode = localStorage.getItem('hh_builder_mode') as 'solo' | 'squad';
      if (savedMode) setMode(savedMode);

      const savedName = localStorage.getItem('hh_builder_name');
      if (savedName) setName(savedName);

      const savedStack = localStorage.getItem('hh_builder_stack');
      if (savedStack) setStack(savedStack);

      const savedTeam = localStorage.getItem('hh_builder_team');
      if (savedTeam) setTeamName(savedTeam);

      const savedClassIdx = localStorage.getItem('hh_builder_class_idx');
      if (savedClassIdx) setClassIndex(parseInt(savedClassIdx, 10));
    }
  }, []);

  // Handle Reroll class
  const handleRerollClass = () => {
    setIsRolling(true);
    setTimeout(() => {
      const nextIdx = (classIndex + 1) % BUILDER_CLASSES_LIST.length;
      setClassIndex(nextIdx);
      setIsRolling(false);
      if (typeof window !== 'undefined') {
        localStorage.setItem('hh_builder_class_idx', nextIdx.toString());
      }
    }, 180);
  };

  // Current class
  const currentClass = BUILDER_CLASSES_LIST[classIndex];

  // Save details and proceed to Step 03: Frame
  const handleProceedNext = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('hh_builder_name', name);
      localStorage.setItem('hh_builder_stack', stack);
      localStorage.setItem('hh_builder_team', teamName);
      localStorage.setItem('hh_builder_class', currentClass.label);
      localStorage.setItem('hh_builder_class_icon', currentClass.icon);
    }
    router.push('/create/frame');
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

                {/* Step 02: DETAILS (ACTIVE) */}
                <div className="flex items-center gap-1.5 text-[#17251C]">
                  <span className="w-6 h-6 rounded-full bg-[#F5DD3B] border border-[#17251C] flex items-center justify-center text-[10px] font-black">
                    02
                  </span>
                  <span className="border-b-2 border-[#F5DD3B] pb-0.5">DETAILS</span>
                </div>

                <span className="text-[#17251C]/30 font-light">→</span>

                {/* Step 03: FRAME */}
                <div className="flex items-center gap-1.5 text-[#17251C]/40">
                  <span className="w-6 h-6 rounded-full border border-[#17251C]/30 flex items-center justify-center text-[10px]">
                    03
                  </span>
                  <span>FRAME</span>
                </div>

                <span className="text-[#17251C]/30 hidden sm:inline">→</span>

                {/* Step 04: GENERATE */}
                <div className="hidden sm:flex items-center gap-1.5 text-[#17251C]/40">
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

            {/* ─── 3-Column Layout Matching Reference Image ─── */}
            <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr_1fr] gap-8 lg:gap-10 items-start mb-10">

              {/* ── COLUMN 1: BUILDER INFORMATION ── */}
              <div>
                {/* Title */}
                <h1 className="font-display font-black leading-[0.88] tracking-[-0.03em] uppercase mb-4 text-3xl sm:text-4xl lg:text-5xl text-[#17251C]">
                  <span className="text-[#E62E78] inline-block -rotate-12 mr-1">*</span>
                  WHO ARE YOU,
                  <br />
                  <span className="text-[#D4BE1F]">BUILDER?</span>
                </h1>

                <p className="font-mono text-xs text-[#17251C]/75 leading-relaxed mb-6">
                  Your code says what you build.
                  <br />
                  Your Builder ID says who you are.
                </p>

                {/* Form Fields */}
                <div className="space-y-5">
                  {/* SQUAD TEAM NAME (If Squad mode selected) */}
                  {mode === 'squad' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                    >
                      <label className="block font-mono text-[10.5px] font-extrabold uppercase tracking-wider text-[#17251C] mb-1.5">
                        TEAM NAME
                      </label>
                      <input
                        type="text"
                        value={teamName}
                        onChange={(e) => setTeamName(e.target.value.toUpperCase())}
                        placeholder="ALPHA SQUAD"
                        className="w-full bg-[#FAF7ED] text-[#17251C] border-2 border-[#17251C] rounded px-3.5 py-2.5 font-mono text-xs font-semibold focus:outline-none focus:border-[#E62E78] shadow-[2px_2px_0px_#17251C]"
                      />
                    </motion.div>
                  )}

                  {/* YOUR NAME */}
                  <div>
                    <label className="block font-mono text-[10.5px] font-extrabold uppercase tracking-wider text-[#17251C] mb-1.5">
                      YOUR NAME
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value.toUpperCase())}
                      placeholder="PRIYANSHU KHARE"
                      className="w-full bg-[#FAF7ED] text-[#17251C] border-2 border-[#17251C] rounded px-3.5 py-2.5 font-mono text-xs font-semibold focus:outline-none focus:border-[#E62E78] shadow-[2px_2px_0px_#17251C]"
                    />
                  </div>

                  {/* YOUR STACK / ROLE */}
                  <div>
                    <label className="block font-mono text-[10.5px] font-extrabold uppercase tracking-wider text-[#17251C] mb-1.5">
                      YOUR STACK / ROLE
                    </label>
                    <input
                      type="text"
                      value={stack}
                      onChange={(e) => setStack(e.target.value.toUpperCase())}
                      placeholder="AI/ML // PYTHON // NEXT.JS"
                      className="w-full bg-[#FAF7ED] text-[#17251C] border-2 border-[#17251C] rounded px-3.5 py-2.5 font-mono text-xs font-semibold focus:outline-none focus:border-[#E62E78] shadow-[2px_2px_0px_#17251C]"
                    />
                    <p className="font-mono text-[10px] text-[#17251C]/50 mt-1.5">
                      Tell us what you build with.
                    </p>
                  </div>
                </div>
              </div>

              {/* ── COLUMN 2: BUILDER CLASS ── */}
              <div className="lg:border-l lg:border-r border-[#17251C]/15 lg:px-6">
                <div className="mb-3">
                  <h3 className="font-mono text-[11px] font-extrabold uppercase tracking-wider text-[#17251C]">
                    CHOOSE YOUR BUILDER CLASS
                  </h3>
                  <p className="font-mono text-[10px] text-[#17251C]/65 mt-1 leading-relaxed">
                    Every builder gets a class.
                    <br />
                    Don&apos;t like yours? Reroll it.
                  </p>
                </div>

                {/* Class Card Badge */}
                <div className="bg-[#163D28] text-[#F6F0D8] border-2 border-[#17251C] rounded-md p-6 text-center my-5 shadow-[4px_4px_0px_#17251C] relative overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentClass.id}
                      initial={{ opacity: 0, scale: 0.9, y: 5 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9, y: -5 }}
                      transition={{ duration: 0.15 }}
                    >
                      <div className="text-4xl mb-3">{currentClass.icon}</div>
                      <h4 className="font-display font-black text-xl text-[#F5DD3B] uppercase tracking-tight mb-2">
                        {currentClass.label}
                      </h4>
                      <div className="w-12 h-0.5 bg-[#E62E78] mx-auto mb-3" />
                      <div className="font-mono text-[9px] text-[#F6F0D8]/50 uppercase tracking-widest">
                        CLASS 0{classIndex + 1} OF 10
                      </div>
                    </motion.div>
                  </AnimatePresence>

                  {/* Background Palm Silhouette overlay */}
                  <div className="absolute inset-0 pointer-events-none opacity-10 flex items-end justify-center">
                    <svg viewBox="0 0 100 40" className="w-full h-10" fill="currentColor">
                      <path d="M10 40 L20 20 L30 40 M50 40 L60 15 L70 40 M80 40 L85 25 L90 40" />
                    </svg>
                  </div>
                </div>

                {/* Reroll Button */}
                <button
                  onClick={handleRerollClass}
                  disabled={isRolling}
                  className="w-full py-2.5 bg-[#FAF7ED] text-[#17251C] font-mono text-xs font-bold uppercase tracking-wider border-2 border-[#17251C] shadow-[2px_2px_0px_#17251C] hover:bg-[#F5DD3B] transition-all flex items-center justify-center gap-2"
                >
                  REROLL CLASS <span className={`text-sm ${isRolling ? 'animate-spin' : ''}`}>↻</span>
                </button>
              </div>

              {/* ── COLUMN 3: LIVE LANYARD PASS PREVIEW ── */}
              <div className="relative flex flex-col items-center">
                {/* Lanyard String Artwork Hanging from Top */}
                <div className="w-full flex justify-center mb-[-8px] relative z-20">
                  <div className="flex gap-4">
                    <div className="w-1 h-12 bg-gradient-to-b from-[#17251C] via-[#F5DD3B]/60 to-[#17251C] rounded-full shadow-sm" />
                    <div className="w-1 h-12 bg-gradient-to-b from-[#17251C] via-[#F5DD3B]/60 to-[#17251C] rounded-full shadow-sm" />
                  </div>
                </div>

                {/* Lanyard Pass Card */}
                <div className="w-full max-w-[320px] bg-[#163D28] text-[#F6F0D8] border-2 border-[#17251C] rounded-lg p-5 shadow-[6px_6px_0px_#17251C] relative overflow-hidden">

                  {/* Lanyard Hole Punch */}
                  <div className="w-8 h-3 rounded-full bg-[#FAF7ED] border border-[#17251C] mx-auto mb-3" />

                  {/* Header */}
                  <div className="flex items-center justify-between border-b border-[#F6F0D8]/15 pb-2 mb-3">
                    <span className="font-display text-xs font-black text-[#F5DD3B]">
                      HH GOA 2026
                    </span>
                    <span className="font-mono text-[8px] font-bold text-[#F6F0D8]/50 uppercase tracking-widest">
                      PREVIEW
                    </span>
                  </div>

                  {/* Photo with Circular Stamp */}
                  <div className="relative aspect-[4/3] rounded border border-[#F6F0D8]/20 overflow-hidden mb-4 bg-[#0F2E1D]">
                    <Image
                      src={mode === 'squad' ? '/builder-squad.png' : '/builder-solo.png'}
                      alt="Builder preview photo"
                      fill
                      className="object-cover"
                    />

                    {/* Gold Circular Stamp in Bottom Right */}
                    <div className="absolute bottom-2 right-2 w-11 h-11 rounded-full border border-dashed border-[#F5DD3B] bg-[#163D28]/85 text-center flex items-center justify-center p-0.5 rotate-[-8deg]">
                      <div className="font-mono text-[5.5px] font-extrabold text-[#F5DD3B] uppercase leading-tight">
                        BUILDER<br />
                        <span className="font-serif text-[8px] italic text-[#F6F0D8]">GOA</span><br />
                        2026
                      </div>
                    </div>
                  </div>

                  {/* Live Details */}
                  <div className="space-y-1.5 mb-4">
                    <h3 className="font-display font-black text-lg text-[#F5DD3B] uppercase tracking-tight leading-none truncate">
                      {name || 'YOUR NAME'}
                    </h3>
                    <p className="font-mono text-[9.5px] text-[#F6F0D8]/70 truncate uppercase">
                      {stack || 'YOUR STACK / ROLE'}
                    </p>
                    <div className="inline-flex items-center gap-1 font-mono text-[9px] font-bold text-[#F5DD3B] bg-[#0F2E1D] px-2 py-0.5 rounded border border-[#F5DD3B]/30">
                      <span>{currentClass.icon}</span>
                      <span>{currentClass.label}</span>
                    </div>
                  </div>

                  {/* Serial ID & Barcode */}
                  <div className="flex items-center justify-between border-t border-[#F6F0D8]/15 pt-2.5 font-mono text-[9px] text-[#F6F0D8]/50">
                    <div>HH-26-0000</div>
                    {/* Simulated Barcode */}
                    <div className="flex gap-0.5 items-center h-4">
                      <div className="w-0.5 h-full bg-[#F6F0D8]/60" />
                      <div className="w-1 h-full bg-[#F6F0D8]/60" />
                      <div className="w-0.5 h-full bg-[#F6F0D8]/60" />
                      <div className="w-1.5 h-full bg-[#F6F0D8]/60" />
                      <div className="w-0.5 h-full bg-[#F6F0D8]/60" />
                      <div className="w-1 h-full bg-[#F6F0D8]/60" />
                    </div>
                  </div>

                </div>
              </div>

            </div>

            {/* ─── Bottom Navigation Button ─── */}
            <div className="mt-8 pt-6 border-t border-[#17251C]/15 flex items-center justify-between flex-wrap gap-4">
              <button
                onClick={() => router.push('/create')}
                className="font-mono text-xs font-bold uppercase text-[#17251C]/60 hover:text-[#17251C] transition-colors flex items-center gap-1"
              >
                ← BACK TO CHOOSE
              </button>

              <button
                onClick={handleProceedNext}
                disabled={!name.trim()}
                className="px-8 py-3.5 bg-[#F5DD3B] text-[#17251C] font-mono text-xs font-bold uppercase tracking-wider border-2 border-[#17251C] shadow-[4px_4px_0px_#17251C] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[6px_6px_0px_#17251C] active:translate-x-[1px] active:translate-y-[1px] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
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
