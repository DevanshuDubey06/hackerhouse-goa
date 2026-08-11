'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { getBuilders, type BuilderData } from '@/lib/storage';
import { EVENT, STATS } from '@/lib/config';

/* ================================================================
   DECORATIVE STRIP PATTERN
   ================================================================ */

const STRIP_PATTERN = `url("data:image/svg+xml,%3Csvg width='60' height='22' viewBox='0 0 60 22' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='60' height='22' fill='%23C41E62'/%3E%3Crect width='60' height='1' fill='%2317251C'/%3E%3Crect y='21' width='60' height='1' fill='%2317251C'/%3E%3Cpath d='M30 3L38 11L30 19L22 11Z' fill='%231E5B3A' stroke='%23F5DD3B' stroke-width='0.6'/%3E%3Ccircle cx='30' cy='11' r='2.5' fill='%23F5DD3B'/%3E%3Ccircle cx='8' cy='11' r='3.5' fill='%231E5B3A'/%3E%3Ccircle cx='8' cy='11' r='1.5' fill='%23F5DD3B'/%3E%3Ccircle cx='52' cy='11' r='3.5' fill='%231E5B3A'/%3E%3Ccircle cx='52' cy='11' r='1.5' fill='%23F5DD3B'/%3E%3Cellipse cx='19' cy='6' rx='3.5' ry='1.5' fill='%231E5B3A' transform='rotate(25 19 6)'/%3E%3Cellipse cx='41' cy='6' rx='3.5' ry='1.5' fill='%231E5B3A' transform='rotate(-25 41 6)'/%3E%3Cellipse cx='19' cy='16' rx='3.5' ry='1.5' fill='%231E5B3A' transform='rotate(-25 19 16)'/%3E%3Cellipse cx='41' cy='16' rx='3.5' ry='1.5' fill='%231E5B3A' transform='rotate(25 41 16)'/%3E%3Ccircle cx='30' cy='3' r='1' fill='%23F5DD3B' opacity='0.6'/%3E%3Ccircle cx='30' cy='19' r='1' fill='%23F5DD3B' opacity='0.6'/%3E%3C/svg%3E")`;

/* ================================================================
   SAMPLE COMMUNITY RADAR BUILDERS
   Matches the 5 reference cards in the prompt screenshot
   ================================================================ */

interface SampleRadarCard {
  id: string;
  publicId: string;
  name: string;
  builderClass: string;
  icon: string;
  location: string;
  photoUrl: string;
  frameStyle: string;
  stack: string;
}

const SAMPLE_BUILDERS: SampleRadarCard[] = [
  {
    id: '1',
    publicId: 'HH-26-0187',
    name: '@builder01',
    builderClass: 'NEURAL NOMAD',
    icon: '⚡',
    location: 'GOA, INDIA',
    photoUrl: '/builder-solo.png',
    frameStyle: 'monsoon',
    stack: 'AI/ML // PYTHON // NEXT.JS',
  },
  {
    id: '2',
    publicId: 'HH-26-0198',
    name: '@builder02',
    builderClass: 'STACK SURFER',
    icon: '🌊',
    location: 'BANGALORE, INDIA',
    photoUrl: '/builder-squad.png',
    frameStyle: 'sunburst',
    stack: 'RUST // SOLANA // REACT',
  },
  {
    id: '3',
    publicId: 'HH-26-0203',
    name: '@builder03',
    builderClass: 'API ALCHEMIST',
    icon: '🧪',
    location: 'DELHI, INDIA',
    photoUrl: '/builder-solo.png',
    frameStyle: 'night',
    stack: 'NODE // GRAPHQL // DOCKER',
  },
  {
    id: '4',
    publicId: 'HH-26-0211',
    name: '@builder04',
    builderClass: 'PIXEL PIRATE',
    icon: '☠️',
    location: 'PUNE, INDIA',
    photoUrl: '/builder-squad.png',
    frameStyle: 'sea',
    stack: 'THREE.JS // GLSL // TAILWIND',
  },
  {
    id: '5',
    publicId: 'HH-26-0220',
    name: '@builder05',
    builderClass: 'DATA DRIFTER',
    icon: '🌊',
    location: 'HYDERABAD, INDIA',
    photoUrl: '/builder-solo.png',
    frameStyle: 'monsoon',
    stack: 'PYTORCH // FASTAPI // GO',
  },
];

/* ================================================================
   PAGE 09 — CHECK THE HYPE / THE RADAR
   ================================================================ */

export default function RadarPage() {
  const [userBuilders, setUserBuilders] = useState<BuilderData[]>([]);
  const [totalCount, setTotalCount] = useState(1284);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const saved = getBuilders();
    setUserBuilders(saved);

    // Calculate dynamic count: base 1284 + saved count
    const baseCount = parseInt(STATS.builderIds.replace(/,/g, ''), 10) || 1284;
    setTotalCount(baseCount + saved.length);
  }, []);

  // Combine user created builders first, then sample builders
  const allCards = [
    ...userBuilders.map((b) => ({
      id: b.id,
      publicId: b.publicId,
      name: b.name.startsWith('@') ? b.name : `@${b.name.toLowerCase().replace(/\s+/g, '_')}`,
      builderClass: b.builderClass?.label || 'SHIPPER',
      icon: b.builderClass?.icon || '⚡',
      location: b.location || 'GOA, INDIA',
      photoUrl: b.photoDataUrl || '/builder-solo.png',
      frameStyle: b.frameStyle || 'monsoon',
      stack: b.stack || 'BUILDER',
    })),
    ...SAMPLE_BUILDERS,
  ];

  // Carousel navigation
  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -320, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 320, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#1E5B3A] text-[#F6F0D8] grain-overlay">
      {/* ─── Main Container ─── */}
      <section className="relative pt-6 md:pt-8 pb-16 overflow-hidden">
        <div className="max-container section-padding relative z-10">

          {/* Aged Paper Poster Container matching Reference */}
          <div className="relative bg-[#FAF7ED] text-[#17251C] border-2 border-[#17251C] shadow-[8px_8px_0px_rgba(23,37,28,0.3)] p-6 md:p-10 lg:p-12 rounded-sm overflow-hidden">

            {/* ─── Top Hero Section ─── */}
            <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-8 items-center mb-8">
              
              {/* Left Headline */}
              <div>
                <span className="font-mono text-[10px] font-bold text-[#1E5B3A] uppercase tracking-widest block mb-2">
                  HH GOA 2026 · LIVE RADAR
                </span>

                <h1 className="font-display font-black leading-[0.88] tracking-[-0.03em] uppercase text-4xl sm:text-5xl lg:text-6xl text-[#17251C] mb-3">
                  <span className="text-[#E62E78] inline-block -rotate-12 mr-1">*</span>
                  CHECK THE <span className="text-[#D4BE1F] underline decoration-[#E62E78] decoration-4 underline-offset-4">HYPE.</span>
                </h1>

                <p className="font-mono text-sm text-[#17251C]/70 max-w-md">
                  Goa is already getting louder.
                </p>
                <div className="w-12 h-0.5 bg-[#E62E78] mt-3 mb-6" />

                {/* ── Dynamic Counter & World Map Card ── */}
                <div className="bg-[#163D28] text-[#F6F0D8] border-2 border-[#17251C] rounded-lg p-5 shadow-[4px_4px_0px_#17251C] max-w-lg">
                  <div className="grid grid-cols-1 sm:grid-cols-[1fr_1fr] gap-4 items-center">
                    
                    {/* Counter Column */}
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <span className="text-2xl">👥</span>
                        <span className="font-display font-black text-4xl md:text-5xl text-[#F5DD3B] leading-none">
                          {totalCount.toLocaleString()}
                        </span>
                      </div>
                      <div className="font-mono text-[11px] font-extrabold text-[#F6F0D8] uppercase tracking-wider">
                        BUILDER IDs CREATED
                      </div>
                      <div className="font-mono text-[9px] text-[#E62E78] font-bold uppercase tracking-wider flex items-center gap-1.5 mt-2">
                        <span className="w-2 h-2 rounded-full bg-[#E62E78] animate-pulse" />
                        LIVE FROM THE HOUSE •
                      </div>
                    </div>

                    {/* World Map Vector Graphic */}
                    <div className="relative h-28 bg-[#0F2E1D] border border-[#F6F0D8]/15 rounded flex items-center justify-center p-2 overflow-hidden">
                      <svg viewBox="0 0 1000 500" className="w-full h-full stroke-[#F6F0D8]/20" fill="none" strokeWidth="1.5">
                        {/* World Map Outline SVG */}
                        <path d="M150 150 C200 100, 300 120, 350 200 C320 280, 200 300, 150 250 Z" fill="#F6F0D8" fillOpacity="0.05" />
                        <path d="M450 120 C550 80, 700 100, 800 150 C850 220, 750 300, 600 280 C500 260, 420 200, 450 120 Z" fill="#F6F0D8" fillOpacity="0.05" />
                        <path d="M700 320 C780 300, 880 340, 850 420 C780 440, 680 400, 700 320 Z" fill="#F6F0D8" fillOpacity="0.05" />
                      </svg>

                      {/* Glowing Radar Pins on Map */}
                      <div className="absolute top-[42%] left-[68%] flex items-center gap-1">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#F5DD3B] animate-ping absolute" />
                        <span className="w-2.5 h-2.5 rounded-full bg-[#F5DD3B] relative" />
                      </div>
                      <div className="absolute top-[32%] left-[28%] w-1.5 h-1.5 rounded-full bg-[#F5DD3B]" />
                      <div className="absolute top-[38%] left-[78%] w-1.5 h-1.5 rounded-full bg-[#F5DD3B]" />
                      <div className="absolute top-[48%] left-[45%] w-1.5 h-1.5 rounded-full bg-[#F5DD3B]" />
                    </div>

                  </div>
                </div>
              </div>

              {/* Right Illustration Artwork & Postmark */}
              <div className="relative aspect-[16/10] w-full rounded-lg border-2 border-[#17251C] overflow-hidden shadow-[4px_4px_0px_rgba(23,37,28,0.2)] bg-[#163D28]">
                <Image
                  src="/forest-wave.png"
                  alt="Hacker House Goa House Illustration"
                  fill
                  className="object-cover opacity-90"
                />

                {/* Circular Postmark Stamp */}
                <div className="absolute top-4 right-4 z-10 w-16 h-16 rounded-full border-2 border-dashed border-[#E62E78] bg-[#FAF7ED]/90 text-center flex items-center justify-center p-1 rotate-[-12deg] shadow-sm">
                  <div className="font-mono text-[7px] font-extrabold text-[#E62E78] uppercase leading-tight">
                    WELCOME<br />
                    <span className="font-serif text-[11px] font-black italic text-[#17251C]">TO GOA</span>
                  </div>
                </div>
              </div>

            </div>

            {/* ─── RADAR SHOWCASE CONTAINER (DARK GREEN SECTION) ─── */}
            <div className="bg-[#163D28] text-[#F6F0D8] border-2 border-[#17251C] rounded-lg p-6 md:p-8 shadow-[6px_6px_0px_#17251C]">

              {/* Section Header Row */}
              <div className="flex items-center justify-between border-b border-[#F6F0D8]/15 pb-4 mb-6">
                <div>
                  <h2 className="font-display font-black text-2xl md:text-3xl text-[#E62E78] tracking-tight uppercase flex items-center gap-2">
                    #FRAMEINGOA <span className="text-xl">🌴</span>
                  </h2>
                  <p className="font-mono text-xs text-[#F6F0D8]/60 mt-0.5">
                    Live builder IDs from around the world.
                  </p>
                </div>

                <Link
                  href="/create"
                  className="font-mono text-xs font-bold text-[#F5DD3B] hover:underline uppercase flex items-center gap-1"
                >
                  SEE ALL BUILDERS →
                </Link>
              </div>

              {/* ── Horizontal Gallery / Carousel ── */}
              <div className="relative">
                
                {/* Scroll Buttons */}
                <button
                  onClick={scrollLeft}
                  className="absolute left-[-16px] top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-[#17251C] border-2 border-[#F5DD3B] text-[#F5DD3B] flex items-center justify-center shadow-md hover:bg-[#F5DD3B] hover:text-[#17251C] transition-all"
                  aria-label="Previous cards"
                >
                  <ChevronLeft size={20} />
                </button>

                <button
                  onClick={scrollRight}
                  className="absolute right-[-16px] top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-[#17251C] border-2 border-[#F5DD3B] text-[#F5DD3B] flex items-center justify-center shadow-md hover:bg-[#F5DD3B] hover:text-[#17251C] transition-all"
                  aria-label="Next cards"
                >
                  <ChevronRight size={20} />
                </button>

                {/* Cards Track */}
                <div
                  ref={carouselRef}
                  className="flex gap-5 overflow-x-auto pb-4 pt-2 scrollbar-none snap-x snap-mandatory"
                  style={{ scrollbarWidth: 'none' }}
                >
                  {allCards.map((card, idx) => (
                    <motion.div
                      key={`${card.publicId}-${idx}`}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.08 }}
                      className="snap-start shrink-0 w-[240px] sm:w-[260px]"
                    >
                      <Link
                        href={`/id/${card.publicId}`}
                        className="block bg-[#0F2E1D] text-[#F6F0D8] border-2 border-[#17251C] rounded-lg p-4 shadow-[4px_4px_0px_#17251C] hover:border-[#F5DD3B] hover:translate-y-[-2px] transition-all no-underline group"
                      >
                        {/* Card Header Punch Hole */}
                        <div className="w-8 h-2 rounded-full bg-[#FAF7ED] border border-[#17251C] mx-auto mb-3" />

                        {/* Top Logo Bar */}
                        <div className="flex items-center justify-between text-[9px] font-mono text-[#F6F0D8]/50 uppercase mb-3">
                          <span className="font-bold text-[#F5DD3B]">HH GOA 2026</span>
                          <span>ID ARTIFACT</span>
                        </div>

                        {/* Portrait Container */}
                        <div className="relative aspect-square w-full rounded border-2 border-[#F6F0D8]/20 overflow-hidden bg-[#163D28] mb-3">
                          <Image
                            src={card.photoUrl}
                            alt={card.name}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          
                          {/* Circular Stamp Overlay */}
                          <div className="absolute bottom-1 right-1 w-9 h-9 rounded-full border border-dashed border-[#F5DD3B] bg-[#163D28]/90 flex items-center justify-center rotate-[-12deg]">
                            <span className="font-mono text-[5px] font-extrabold text-[#F5DD3B] text-center leading-none">
                              GOA<br />2026
                            </span>
                          </div>
                        </div>

                        {/* Builder Details */}
                        <div className="space-y-1">
                          <h3 className="font-display font-black text-lg text-[#F5DD3B] truncate group-hover:text-[#F6F0D8] transition-colors">
                            {card.name}
                          </h3>
                          <div className="font-mono text-[10px] font-bold text-[#F6F0D8] flex items-center gap-1">
                            <span>{card.icon}</span>
                            <span className="uppercase">{card.builderClass}</span>
                          </div>
                          <div className="font-mono text-[9px] text-[#F6F0D8]/60 uppercase truncate">
                            {card.location}
                          </div>
                          <div className="font-mono text-[10px] font-bold text-[#F5DD3B] pt-2 border-t border-[#F6F0D8]/10 flex items-center justify-between">
                            <span>{card.publicId}</span>
                            <span className="text-[8px] opacity-50">VIEW →</span>
                          </div>
                        </div>

                        {/* Barcode artwork */}
                        <div className="flex justify-center gap-0.5 h-3 mt-2">
                          <div className="w-0.5 h-full bg-[#F6F0D8]/40" />
                          <div className="w-1 h-full bg-[#F6F0D8]/40" />
                          <div className="w-0.5 h-full bg-[#F6F0D8]/40" />
                          <div className="w-1.5 h-full bg-[#F6F0D8]/40" />
                          <div className="w-0.5 h-full bg-[#F6F0D8]/40" />
                          <div className="w-1 h-full bg-[#F6F0D8]/40" />
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Central Yellow CTA Button */}
              <div className="mt-8 text-center">
                <Link
                  href="/create"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-[#F5DD3B] text-[#17251C] font-mono text-xs font-extrabold uppercase tracking-wider border-2 border-[#17251C] shadow-[4px_4px_0px_#17251C] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[6px_6px_0px_#17251C] transition-all no-underline"
                >
                  🎯 ADD YOURSELF TO THE RADAR →
                </Link>
              </div>

              {/* Bottom Editorial Motto */}
              <div className="mt-8 pt-6 border-t border-[#F6F0D8]/15 text-center">
                <p className="font-display font-black text-lg md:text-xl text-[#F6F0D8] uppercase tracking-tight">
                  <span className="text-[#E62E78] mr-2">*</span>
                  DON&apos;T JUST WATCH THE HYPE.
                  <span className="text-[#F5DD3B] ml-2">BUILD IT.</span>
                  <span className="text-[#E62E78] ml-2">*</span>
                </p>
              </div>

            </div>

            {/* ─── Compact Campaign CTA ─── */}
            <div className="mt-8 bg-[#FAF7ED] text-[#17251C] border-2 border-[#17251C] p-6 text-center">
              <h3 className="font-display font-black text-2xl text-[#17251C] uppercase mb-1">
                PUT YOURSELF ON THE RADAR
              </h3>
              <p className="font-mono text-xs text-[#17251C]/70 mb-4">
                Create your Hacker House Goa 2026 Builder ID and join 1,200+ builders.
              </p>
              <Link
                href="/create"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#163D28] text-[#F6F0D8] font-mono text-xs font-bold uppercase tracking-wider border-2 border-[#17251C] shadow-[3px_3px_0px_#17251C] hover:bg-[#0F2E1D] transition-all no-underline"
              >
                BUILD YOUR BUILDER ID →
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* ─── Bottom Decorative Ribbon Strip ─── */}
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
