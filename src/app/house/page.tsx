'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { EVENT, OFFICIAL_APPLY_URL } from '@/lib/config';

/* ================================================================
   ICONS FOR EXPERIENCE BLOCKS & STAMPS
   ================================================================ */

function IconBuildCard() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#F5DD3B]">
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="17" x2="12" y2="21" />
      <path d="M7 8l4 4-4 4" />
      <line x1="13" y1="16" x2="17" y2="16" />
    </svg>
  );
}

function IconMeetCard() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#F5DD3B]">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function IconShipCard() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#F5DD3B]">
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.71 1.1-1.63 1.1-2.5 0-1.88-1.5-3.38-3.38-3.38-.87 0-1.79.39-2.5 1.1z" />
      <path d="M12 15l-3-3 8.5-8.5a2.12 2.12 0 0 1 3 3L12 15z" />
      <path d="M11.5 6.5l3 3" />
    </svg>
  );
}

function IconGoaCard() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#F5DD3B]">
      <path d="M12 25V11" />
      <path d="M12 11C7 9.5 3 4 3 4s5 1.5 10 3c5-1.5 10-3 10-3s-4 5.5-10 7Z" />
      <path d="M12 7C7 5.5 4 1 4 1s5 1 9 2.5C16 2 21 1 21 1s-3 4.5-9 6Z" />
    </svg>
  );
}

function IconWifi() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-[#17251C]">
      <path d="M5 12.55a11 11 0 0 1 14 0" />
      <path d="M1.42 9a16 16 0 0 1 21.16 0" />
      <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
      <line x1="12" y1="20" x2="12.01" y2="20" strokeWidth="2.5" />
    </svg>
  );
}

function IconWaves() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-[#17251C]">
      <path d="M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
      <path d="M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
      <path d="M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
    </svg>
  );
}

function IconUsersGroup() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-[#17251C]">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

/* ================================================================
   DECORATIVE STRIP
   ================================================================ */

const STRIP_PATTERN = `url("data:image/svg+xml,%3Csvg width='60' height='22' viewBox='0 0 60 22' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='60' height='22' fill='%23C41E62'/%3E%3Crect width='60' height='1' fill='%2317251C'/%3E%3Crect y='21' width='60' height='1' fill='%2317251C'/%3E%3Cpath d='M30 3L38 11L30 19L22 11Z' fill='%231E5B3A' stroke='%23F5DD3B' stroke-width='0.6'/%3E%3Ccircle cx='30' cy='11' r='2.5' fill='%23F5DD3B'/%3E%3Ccircle cx='8' cy='11' r='3.5' fill='%231E5B3A'/%3E%3Ccircle cx='8' cy='11' r='1.5' fill='%23F5DD3B'/%3E%3Ccircle cx='52' cy='11' r='3.5' fill='%231E5B3A'/%3E%3Ccircle cx='52' cy='11' r='1.5' fill='%23F5DD3B'/%3E%3Cellipse cx='19' cy='6' rx='3.5' ry='1.5' fill='%231E5B3A' transform='rotate(25 19 6)'/%3E%3Cellipse cx='41' cy='6' rx='3.5' ry='1.5' fill='%231E5B3A' transform='rotate(-25 41 6)'/%3E%3Cellipse cx='19' cy='16' rx='3.5' ry='1.5' fill='%231E5B3A' transform='rotate(-25 19 16)'/%3E%3Cellipse cx='41' cy='16' rx='3.5' ry='1.5' fill='%231E5B3A' transform='rotate(25 41 16)'/%3E%3Ccircle cx='30' cy='3' r='1' fill='%23F5DD3B' opacity='0.6'/%3E%3Ccircle cx='30' cy='19' r='1' fill='%23F5DD3B' opacity='0.6'/%3E%3C/svg%3E")`;

/* ================================================================
   HOUSE PAGE COMPONENT
   ================================================================ */

export default function HousePage() {
  return (
    <div className="min-h-screen bg-[#1E5B3A] text-[#F6F0D8] grain-overlay">
      {/* ─── Hero & Aged Poster Layout ─── */}
      <section className="relative pt-6 md:pt-10 pb-16 overflow-hidden">
        <div className="max-container section-padding relative z-10">

          {/* Aged Poster / Paper Card Container matching Reference Image */}
          <div className="relative bg-[#FAF7ED] text-[#17251C] border-2 border-[#17251C] shadow-[8px_8px_0px_rgba(23,37,28,0.3)] p-6 md:p-10 lg:p-12 rounded-sm overflow-hidden">

            {/* Grid Split: Text Left, House Illustration Right */}
            <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-8 lg:gap-12 items-start mb-10">

              {/* Left Column Text Content */}
              <div>
                {/* Section Eyebrow */}
                <div className="mb-4">
                  <span className="font-mono text-[10px] md:text-xs text-[#17251C]/60 font-semibold tracking-[0.14em] uppercase">
                    THE HOUSE · GOA, INDIA
                  </span>
                </div>

                {/* Headline: LESS * NOISE. MORE BUILDING. */}
                <h1 className="font-display font-black leading-[0.88] tracking-[-0.03em] uppercase mb-6" style={{ fontSize: 'clamp(2.5rem, 6.5vw, 6rem)' }}>
                  <span className="block text-[#17251C]">
                    LESS<span className="text-[#E62E78] inline-block -rotate-12">*</span> NOISE.
                  </span>
                  <span className="block text-[#D4BE1F]">
                    MORE BUILDING.
                  </span>
                </h1>

                {/* Supporting Paragraphs */}
                <div className="space-y-4 font-mono text-xs md:text-[13.5px] text-[#17251C]/80 leading-relaxed max-w-xl">
                  <p className="font-medium">
                    Hacker House Goa brings builders together for a few days of uninterrupted creation, collaboration and chaos — the good kind.
                  </p>
                  <p className="text-[#17251C]/70">
                    Leave the noise behind. Bring your laptop, your weirdest idea and the urge to build something that shouldn&apos;t exist yet.
                  </p>
                </div>
              </div>

              {/* Right Column Visual: Goan Beach House Illustration */}
              <div className="relative flex justify-center lg:justify-end">
                <div className="relative w-full max-w-[480px] lg:max-w-[540px] rounded border-2 border-[#17251C] overflow-hidden bg-[#163D28] shadow-[4px_4px_0px_#17251C]">
                  <Image
                    src="/hero-illustration.png"
                    alt="Goan Portuguese colonial beach house illustration"
                    width={700}
                    height={700}
                    priority
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>
            </div>

            {/* ─── 4 Experience Cards (BUILD, MEET, SHIP, GOA) ─── */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 mb-10">

              {/* 01 BUILD */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="bg-[#163D28] text-[#F6F0D8] border-2 border-[#17251C] p-5 rounded flex flex-col justify-between shadow-[3px_3px_0px_#17251C] min-h-[220px]"
              >
                <div>
                  <div className="mb-3">
                    <IconBuildCard />
                  </div>
                  <h3 className="font-display font-black text-2xl text-[#F5DD3B] uppercase tracking-tight mb-2">
                    BUILD
                  </h3>
                  <p className="font-mono text-xs text-[#F6F0D8]/80 leading-relaxed">
                    Turn ideas into working things.
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-[#F6F0D8]/10 flex items-center justify-between text-[9px] font-mono text-[#F5DD3B]/60 uppercase tracking-widest">
                  <span>01 / STEP</span>
                  <span>TERMINAL</span>
                </div>
              </motion.div>

              {/* 02 MEET */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="bg-[#163D28] text-[#F6F0D8] border-2 border-[#17251C] p-5 rounded flex flex-col justify-between shadow-[3px_3px_0px_#17251C] min-h-[220px]"
              >
                <div>
                  <div className="mb-3">
                    <IconMeetCard />
                  </div>
                  <h3 className="font-display font-black text-2xl text-[#F5DD3B] uppercase tracking-tight mb-2">
                    MEET
                  </h3>
                  <p className="font-mono text-xs text-[#F6F0D8]/80 leading-relaxed">
                    Find people who speak in commits, APIs and 3AM ideas.
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-[#F6F0D8]/10 flex items-center justify-between text-[9px] font-mono text-[#F5DD3B]/60 uppercase tracking-widest">
                  <span>02 / SQUAD</span>
                  <span>COMMUNITY</span>
                </div>
              </motion.div>

              {/* 03 SHIP */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 }}
                className="bg-[#163D28] text-[#F6F0D8] border-2 border-[#17251C] p-5 rounded flex flex-col justify-between shadow-[3px_3px_0px_#17251C] min-h-[220px]"
              >
                <div>
                  <div className="mb-3">
                    <IconShipCard />
                  </div>
                  <h3 className="font-display font-black text-2xl text-[#F5DD3B] uppercase tracking-tight mb-2">
                    SHIP
                  </h3>
                  <p className="font-mono text-xs text-[#F6F0D8]/80 leading-relaxed">
                    Don&apos;t just talk about it. Put it out there.
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-[#F6F0D8]/10 flex items-center justify-between text-[9px] font-mono text-[#F5DD3B]/60 uppercase tracking-widest">
                  <span>03 / LAUNCH</span>
                  <span>DEPLOY</span>
                </div>
              </motion.div>

              {/* 04 GOA */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.4 }}
                className="bg-[#163D28] text-[#F6F0D8] border-2 border-[#17251C] p-5 rounded flex flex-col justify-between shadow-[3px_3px_0px_#17251C] min-h-[220px]"
              >
                <div>
                  <div className="mb-3">
                    <IconGoaCard />
                  </div>
                  <h3 className="font-display font-black text-2xl text-[#F5DD3B] uppercase tracking-tight mb-2">
                    GOA
                  </h3>
                  <p className="font-mono text-xs text-[#F6F0D8]/80 leading-relaxed">
                    Beach outside. Terminal inside.
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-[#F6F0D8]/10 flex items-center justify-between text-[9px] font-mono text-[#F5DD3B]/60 uppercase tracking-widest">
                  <span>04 / VIBE</span>
                  <span>OCEAN</span>
                </div>
              </motion.div>
            </div>

            {/* ─── Event Information Strip at Bottom of Container ─── */}
            <div className="relative bg-[#E8DFC4]/60 border-2 border-[#17251C] p-4 md:p-5 rounded-sm flex flex-col lg:flex-row items-center justify-between gap-6">

              {/* Left Stamp & Dates */}
              <div className="flex items-center gap-4">
                {/* Circular Stamp */}
                <div className="w-14 h-14 rounded-full border-2 border-dashed border-[#E62E78] flex items-center justify-center text-center p-1 rotate-[-10deg] shrink-0 bg-[#FAF7ED]">
                  <div className="font-mono text-[7px] font-bold text-[#E62E78] uppercase leading-tight">
                    WELCOME<br />
                    <span className="font-serif text-[9px] font-black italic text-[#17251C]">GOA</span><br />
                    2026
                  </div>
                </div>

                <div>
                  <div className="font-display font-black text-lg text-[#17251C] uppercase leading-none">
                    GOA, INDIA
                  </div>
                  <div className="font-mono text-xs font-bold text-[#17251C]/70 tracking-wider mt-1">
                    28—31 OCTOBER 2026
                  </div>
                </div>
              </div>

              {/* Specs: 500 Builders, High-Speed Fiber, Ocean Access */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-[#17251C] w-full lg:w-auto">
                <div className="flex items-center gap-3 border-l-2 lg:border-l border-[#17251C]/20 pl-3">
                  <IconUsersGroup />
                  <div>
                    <div className="font-display font-black text-sm text-[#17251C]">500</div>
                    <div className="font-mono text-[10px] font-bold text-[#17251C]/60 uppercase">BUILDERS</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 border-l-2 lg:border-l border-[#17251C]/20 pl-3">
                  <IconWifi />
                  <div>
                    <div className="font-display font-black text-sm text-[#17251C]">HIGH-SPEED</div>
                    <div className="font-mono text-[10px] font-bold text-[#17251C]/60 uppercase">FIBER</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 border-l-2 lg:border-l border-[#17251C]/20 pl-3">
                  <IconWaves />
                  <div>
                    <div className="font-display font-black text-sm text-[#17251C]">OCEAN</div>
                    <div className="font-mono text-[10px] font-bold text-[#17251C]/60 uppercase">ACCESS</div>
                  </div>
                </div>
              </div>

              {/* Right Postage Stamp */}
              <div className="hidden xl:flex w-16 h-16 border-2 border-dashed border-[#E62E78]/50 items-center justify-center text-center p-1 shrink-0 bg-[#FAF7ED] rotate-[6deg]">
                <div className="font-mono text-[7px] font-bold text-[#E62E78] uppercase leading-tight">
                  HACKER<br />HOUSE<br />GOA ✶<br />2026
                </div>
              </div>

            </div>

            {/* Overlapping Yellow Action Button */}
            <div className="flex justify-center -mt-5 relative z-20">
              <Link
                href="/create"
                className="inline-flex items-center gap-2 px-8 py-4 bg-[#F5DD3B] text-[#17251C] font-mono text-xs md:text-sm font-bold uppercase tracking-wider border-2 border-[#17251C] shadow-[4px_4px_0px_#17251C] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[6px_6px_0px_#17251C] active:translate-x-[1px] active:translate-y-[1px] transition-all no-underline"
              >
                I&apos;M READY TO BUILD →
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* ─── Editorial Statement Section ─── */}
      <section className="relative bg-[#0F2E1D] text-[#F6F0D8] py-20 md:py-28 overflow-hidden border-t-2 border-[#17251C]">
        <div className="max-container section-padding text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="font-mono text-xs text-[#F5DD3B] font-semibold tracking-[0.16em] uppercase block mb-4">
              ✦ THE STATEMENT
            </span>

            <h2 className="font-display text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight text-[#F5DD3B] leading-[0.9] mb-6">
              BUILD TOGETHER.
              <br />
              SHIP SOMETHING.
              <br />
              <span className="text-[#F6F0D8]">LEAVE WITH STORIES.</span>
            </h2>

            <p className="font-mono text-xs md:text-sm text-[#F6F0D8]/70 max-w-lg mx-auto leading-relaxed">
              A few days away from the noise.
              <br />
              A few days surrounded by people who build.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ─── Final CTA Section ─── */}
      <section className="relative bg-[#E62E78] text-white py-20 md:py-24 overflow-hidden border-t-2 border-[#17251C]">
        <div className="max-container section-padding text-center max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-white leading-[0.9] mb-6">
              READY TO BUILD?
            </h2>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/create"
                className="inline-flex items-center gap-2 px-8 py-4 bg-[#F5DD3B] text-[#17251C] font-mono text-xs md:text-sm font-bold uppercase tracking-wider border-2 border-[#17251C] shadow-[4px_4px_0px_#17251C] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[6px_6px_0px_#17251C] active:translate-x-[1px] active:translate-y-[1px] transition-all no-underline"
              >
                BUILD MY BUILDER ID →
              </Link>

              <Link
                href="/"
                className="inline-flex items-center gap-2 px-6 py-4 bg-transparent text-white font-mono text-xs md:text-sm font-bold uppercase tracking-wider border-2 border-white hover:bg-white hover:text-[#17251C] transition-all no-underline"
              >
                BACK TO HOME
              </Link>
            </div>
          </motion.div>
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
