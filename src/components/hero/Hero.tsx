'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { CHECK_HYPE_URL } from '@/lib/config';

/* ================================================================
   STAT BAR ICONS — line-drawn editorial style matching reference
   ================================================================ */

function IconBuilders() {
  return (
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
      <circle cx="9" cy="7" r="3.5" />
      <circle cx="17" cy="7" r="3.5" />
      <path d="M1.5 23c0-4.5 3.5-7.5 7.5-7.5 1.2 0 2.3.2 3.2.7" />
      <path d="M14 16.2c.9-.5 2-.7 3-.7 4 0 7.5 3 7.5 7.5" />
    </svg>
  );
}

function IconClock() {
  return (
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" className="shrink-0">
      <circle cx="13" cy="13" r="10.5" />
      <path d="M13 6v7l4 3.5" />
      <circle cx="13" cy="13" r="1" fill="currentColor" />
    </svg>
  );
}

function IconPalm() {
  return (
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
      <path d="M13 25V11" />
      <path d="M13 11C7 9.5 3 4 3 4s5 1.5 10 3c5-1.5 10-3 10-3s-4 5.5-10 7Z" />
      <path d="M13 7C7 5.5 4 1 4 1s5 1 9 2.5C17 2 22 1 22 1s-3 4.5-9 6Z" />
    </svg>
  );
}

function IconCalendar() {
  return (
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
      <rect x="3" y="5" width="20" height="18" rx="2" />
      <path d="M3 10h20" />
      <path d="M8 3v4M18 3v4" />
      <rect x="7" y="14" width="2.5" height="2.5" rx="0.4" fill="currentColor" stroke="none" />
      <rect x="11.75" y="14" width="2.5" height="2.5" rx="0.4" fill="currentColor" stroke="none" />
      <rect x="16.5" y="14" width="2.5" height="2.5" rx="0.4" fill="currentColor" stroke="none" />
    </svg>
  );
}

/* ================================================================
   DECORATIVE STRIP — Goan / Portuguese tile pattern
   ================================================================ */

const STRIP_PATTERN = `url("data:image/svg+xml,%3Csvg width='60' height='22' viewBox='0 0 60 22' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='60' height='22' fill='%23C41E62'/%3E%3Crect width='60' height='1' fill='%2317251C'/%3E%3Crect y='21' width='60' height='1' fill='%2317251C'/%3E%3Cpath d='M30 3L38 11L30 19L22 11Z' fill='%231E5B3A' stroke='%23F5DD3B' stroke-width='0.6'/%3E%3Ccircle cx='30' cy='11' r='2.5' fill='%23F5DD3B'/%3E%3Ccircle cx='8' cy='11' r='3.5' fill='%231E5B3A'/%3E%3Ccircle cx='8' cy='11' r='1.5' fill='%23F5DD3B'/%3E%3Ccircle cx='52' cy='11' r='3.5' fill='%231E5B3A'/%3E%3Ccircle cx='52' cy='11' r='1.5' fill='%23F5DD3B'/%3E%3Cellipse cx='19' cy='6' rx='3.5' ry='1.5' fill='%231E5B3A' transform='rotate(25 19 6)'/%3E%3Cellipse cx='41' cy='6' rx='3.5' ry='1.5' fill='%231E5B3A' transform='rotate(-25 41 6)'/%3E%3Cellipse cx='19' cy='16' rx='3.5' ry='1.5' fill='%231E5B3A' transform='rotate(-25 19 16)'/%3E%3Cellipse cx='41' cy='16' rx='3.5' ry='1.5' fill='%231E5B3A' transform='rotate(25 41 16)'/%3E%3Ccircle cx='30' cy='3' r='1' fill='%23F5DD3B' opacity='0.6'/%3E%3Ccircle cx='30' cy='19' r='1' fill='%23F5DD3B' opacity='0.6'/%3E%3C/svg%3E")`;

/* ================================================================
   HERO COMPONENT
   ================================================================ */

export function Hero() {
  return (
    <section
      className="relative min-h-[calc(100dvh-5.75rem)] flex flex-col bg-[#163D28] overflow-hidden"
      id="hero"
    >
      {/* ─── Integrated Full-Bleed Goa Illustration Background Composition (IMAGE 2 Style) ─── */}
      <div className="absolute inset-0 z-[0] pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-full lg:w-[68%] xl:w-[65%] h-full">
          <Image
            src="/hero-illustration.png"
            alt="Vintage Goan Portuguese beach house with palm trees, sunset over the ocean, and beach deck chair"
            fill
            priority
            className="object-cover object-right-bottom opacity-95"
            sizes="(max-width: 1024px) 100vw, 68vw"
          />

          {/* Left-to-right fade gradient blending illustration into dark green sky background */}
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(to right, #163D28 0%, rgba(22, 61, 40, 0.85) 20%, rgba(22, 61, 40, 0.3) 50%, transparent 80%)',
            }}
          />

          {/* Top & bottom subtle gradient vignette */}
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(to bottom, rgba(22, 61, 40, 0.4) 0%, transparent 15%, transparent 85%, #163D28 100%)',
            }}
          />
        </div>
      </div>

      {/* Grain texture overlay */}
      <div className="absolute inset-0 pointer-events-none z-[1]" aria-hidden="true"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='grain'%3E%3CfeTurbulence type='turbulence' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23grain)'/%3E%3C/svg%3E")`,
          opacity: 0.035,
          mixBlendMode: 'multiply',
        }}
      />

      {/* Subtle horizontal rules — editorial texture */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02] z-[1]" aria-hidden="true"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 80px, #F6F0D8 80px, #F6F0D8 81px)',
        }}
      />

      {/* ─── Main Content Layer ─── */}
      <div className="flex-1 relative z-[2] flex items-center">
        <div className="max-container section-padding w-full py-10 lg:py-14">
          <div className="max-w-2xl">

            {/* ── Text Content ── */}
            <div className="relative z-10">

              {/* Eyebrow */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="mb-3 md:mb-4"
              >
                <span className="font-mono text-[11px] md:text-xs text-[#F5DD3B] font-semibold tracking-[0.14em] uppercase">
                  <span className="text-[#E62E78] mr-1">✦</span> THIS IS YOUR
                </span>
              </motion.div>

              {/* Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.08 }}
                className="font-display text-[#F5DD3B] font-black uppercase leading-[0.82] tracking-[-0.03em] select-none"
                style={{
                  fontSize: 'clamp(2.8rem, 7.5vw, 7.5rem)',
                }}
              >
                <span className="block">HACKER HOUSE</span>
                <span className="block">IDENTITY.</span>
              </motion.h1>

              {/* Description */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="mt-5 md:mt-7 max-w-[26rem]"
              >
                <p className="font-mono text-[11.5px] md:text-[13px] text-[#F6F0D8]/85 leading-[1.75]">
                  Build your official Hacker House Goa 2026 Builder ID.
                  <br />
                  Pick your builder class. Add your stack. Choose your frame.
                  <br />
                  Make something that feels like you.
                </p>
              </motion.div>

              {/* Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 }}
                className="mt-6 md:mt-7 flex flex-wrap items-center gap-3"
              >
                <Link
                  href="/create"
                  className="inline-flex items-center gap-2 px-5 md:px-6 py-3 bg-[#F5DD3B] text-[#17251C] font-mono text-[11px] md:text-xs font-bold uppercase tracking-[0.08em] border-2 border-[#17251C] shadow-[2px_2px_0px_#17251C] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[3px_3px_0px_#17251C] active:translate-x-[1px] active:translate-y-[1px] transition-all no-underline"
                >
                  BUILD MY BUILDER ID <span className="text-[15px] leading-none">→</span>
                </Link>

                <a
                  href={CHECK_HYPE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 md:px-6 py-3 bg-transparent text-[#F6F0D8]/90 font-mono text-[10.5px] md:text-[11.5px] font-bold uppercase tracking-[0.1em] border border-[#F5DD3B]/40 hover:border-[#F5DD3B] hover:text-[#F5DD3B] transition-all duration-150 no-underline"
                >
                  CHECK THE HYPE <span className="text-[15px] leading-none">↗</span>
                </a>
              </motion.div>


            </div>
          </div>
        </div>
      </div>

      {/* ─── Stats Bar Container ─── */}
      <div className="relative z-[2] w-full max-w-5xl mx-auto px-4 pb-6 pt-4">
        <div className="bg-[#0F2E1D]/85 border-2 border-[#F6F0D8]/20 rounded-xl p-3 md:p-4 backdrop-blur-sm shadow-[4px_4px_0px_rgba(23,37,28,0.3)]">
          <div className="grid grid-cols-2 md:grid-cols-4 text-[#F6F0D8]">

            {/* Stat: Builders */}
            <div className="flex items-center gap-2.5 py-2 md:py-3 pr-4 border-r border-[#F6F0D8]/12 border-b md:border-b-0 border-[#F6F0D8]/12">
              <div className="text-[#F5DD3B]/70">
                <IconBuilders />
              </div>
              <div>
                <div className="flex items-baseline gap-1.5">
                  <span className="font-display text-lg md:text-xl font-black text-[#F6F0D8] leading-none">500</span>
                  <span className="font-mono text-[9px] md:text-[10px] font-bold text-[#F6F0D8]/80 uppercase tracking-[0.12em]">Builders</span>
                </div>
                <p className="font-mono text-[9px] text-[#F6F0D8]/45 mt-0.5 italic">Build together.</p>
              </div>
            </div>

            {/* Stat: Days */}
            <div className="flex items-center gap-2.5 py-2 md:py-3 px-4 md:border-r border-[#F6F0D8]/12 border-b md:border-b-0 border-[#F6F0D8]/12">
              <div className="text-[#F5DD3B]/70">
                <IconClock />
              </div>
              <div>
                <div className="flex items-baseline gap-1.5">
                  <span className="font-display text-lg md:text-xl font-black text-[#F6F0D8] leading-none">4</span>
                  <span className="font-mono text-[9px] md:text-[10px] font-bold text-[#F6F0D8]/80 uppercase tracking-[0.12em]">Days</span>
                </div>
                <p className="font-mono text-[9px] text-[#F6F0D8]/45 mt-0.5 italic">Non-stop building.</p>
              </div>
            </div>

            {/* Stat: Location */}
            <div className="flex items-center gap-2.5 py-2 md:py-3 px-4 md:border-r border-[#F6F0D8]/12">
              <div className="text-[#F5DD3B]/70">
                <IconPalm />
              </div>
              <div>
                <span className="font-display text-sm md:text-base font-black text-[#F6F0D8] leading-none uppercase tracking-tight">Goa, India</span>
                <p className="font-mono text-[9px] text-[#F6F0D8]/45 mt-0.5 italic">Beach × Bytes.</p>
              </div>
            </div>

            {/* Stat: Dates */}
            <div className="flex items-center gap-2.5 py-2 md:py-3 pl-4">
              <div className="text-[#F5DD3B]/70">
                <IconCalendar />
              </div>
              <div>
                <span className="font-display text-sm md:text-base font-black text-[#F6F0D8] leading-none uppercase tracking-tight">28—31 Oct 2026</span>
                <p className="font-mono text-[9px] text-[#F6F0D8]/45 mt-0.5 italic">Save the dates.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ─── Decorative Goan Pattern Strip ─── */}
      <div
        className="h-[22px] bg-repeat-x"
        style={{
          backgroundImage: STRIP_PATTERN,
          backgroundSize: '60px 22px',
          width: '100vw',
          marginLeft: 'calc(-50vw + 50%)',
        }}
        aria-hidden="true"
      />
    </section>
  );
}
