'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { EVENT, OFFICIAL_APPLY_URL } from '@/lib/config';
import { getBuilders, type BuilderData } from '@/lib/storage';

/* ================================================================
   DECORATIVE STRIP PATTERN
   ================================================================ */

const STRIP_PATTERN = `url("data:image/svg+xml,%3Csvg width='60' height='22' viewBox='0 0 60 22' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='60' height='22' fill='%23C41E62'/%3E%3Crect width='60' height='1' fill='%2317251C'/%3E%3Crect y='21' width='60' height='1' fill='%2317251C'/%3E%3Cpath d='M30 3L38 11L30 19L22 11Z' fill='%231E5B3A' stroke='%23F5DD3B' stroke-width='0.6'/%3E%3Ccircle cx='30' cy='11' r='2.5' fill='%23F5DD3B'/%3E%3Ccircle cx='8' cy='11' r='3.5' fill='%231E5B3A'/%3E%3Ccircle cx='8' cy='11' r='1.5' fill='%23F5DD3B'/%3E%3Ccircle cx='52' cy='11' r='3.5' fill='%231E5B3A'/%3E%3Ccircle cx='52' cy='11' r='1.5' fill='%23F5DD3B'/%3E%3Cellipse cx='19' cy='6' rx='3.5' ry='1.5' fill='%231E5B3A' transform='rotate(25 19 6)'/%3E%3Cellipse cx='41' cy='6' rx='3.5' ry='1.5' fill='%231E5B3A' transform='rotate(-25 41 6)'/%3E%3Cellipse cx='19' cy='16' rx='3.5' ry='1.5' fill='%231E5B3A' transform='rotate(-25 19 16)'/%3E%3Cellipse cx='41' cy='16' rx='3.5' ry='1.5' fill='%231E5B3A' transform='rotate(25 41 16)'/%3E%3Ccircle cx='30' cy='3' r='1' fill='%23F5DD3B' opacity='0.6'/%3E%3Ccircle cx='30' cy='19' r='1' fill='%23F5DD3B' opacity='0.6'/%3E%3C/svg%3E")`;

/* ================================================================
   PAGE 10 — APPLY / FINAL CONVERSION PAGE
   ================================================================ */

export default function ApplyPage() {
  const [userBuilder, setUserBuilder] = useState<BuilderData | null>(null);
  const [localId, setLocalId] = useState<string | null>(null);
  const [localName, setLocalName] = useState<string | null>(null);
  const [localClass, setLocalClass] = useState<string | null>(null);

  useEffect(() => {
    // Check if user has created a builder ID in current session
    if (typeof window !== 'undefined') {
      const builders = getBuilders();
      if (builders.length > 0) {
        setUserBuilder(builders[builders.length - 1]);
      } else {
        const id = localStorage.getItem('hh_builder_id');
        const name = localStorage.getItem('hh_builder_name');
        const builderClass = localStorage.getItem('hh_builder_class');
        if (id && name) {
          setLocalId(id);
          setLocalName(name);
          setLocalClass(builderClass || 'NEURAL NOMAD');
        }
      }
    }
  }, []);

  const hasBuilderId = !!(userBuilder || localId);
  const displayId = userBuilder?.publicId || localId || '';
  const displayName = userBuilder?.name || localName || '';
  const displayClass = userBuilder?.builderClass?.label || localClass || '';

  return (
    <div className="min-h-screen bg-[#1E5B3A] text-[#F6F0D8] grain-overlay">
      {/* ─── Main Container ─── */}
      <section className="relative pt-6 md:pt-8 pb-16 overflow-hidden">
        <div className="max-container section-padding relative z-10">

          {/* Aged Paper Poster Container matching Reference Image */}
          <div className="relative bg-[#FAF7ED] text-[#17251C] border-2 border-[#17251C] shadow-[8px_8px_0px_rgba(23,37,28,0.3)] p-6 md:p-10 lg:p-12 rounded-sm overflow-hidden">

            {/* ─── 2-Column Main Conversion Layout ─── */}
            <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-8 lg:gap-12 items-center">

              {/* ── LEFT COLUMN: HEADLINE, SPECS & CTAS ── */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                {/* Main Headline */}
                <h1 className="font-display font-black leading-[0.88] tracking-[-0.03em] uppercase text-4xl sm:text-5xl lg:text-6xl text-[#17251C] mb-4">
                  <span className="text-[#E62E78] inline-block -rotate-12 mr-1">*</span>
                  GOT YOUR<br />
                  BUILDER ID.<br />
                  <span className="text-[#D4BE1F] underline decoration-[#E62E78] decoration-4 underline-offset-4">NOW COME BUILD.</span>
                </h1>

                {/* Supporting Text */}
                <div className="font-mono text-xs sm:text-sm text-[#17251C]/70 space-y-1 mb-6">
                  <p>Your identity is ready.</p>
                  <p>Your laptop is charged.</p>
                  <p className="font-bold text-[#1E5B3A]">Goa is waiting.</p>
                </div>

                {/* ── Compact Event Specs Card with Postmark Stamp ── */}
                <div className="relative bg-[#FAF7ED] border-2 border-[#17251C] rounded-sm p-4 sm:p-5 shadow-[4px_4px_0px_rgba(23,37,28,0.15)] mb-8 max-w-md">
                  <div className="space-y-3 font-mono text-xs font-bold text-[#17251C] uppercase">
                    <div className="flex items-center gap-2.5">
                      <span className="text-base">🌴</span>
                      <span>HACKER HOUSE GOA 2026</span>
                    </div>
                    <div className="w-full h-px bg-[#17251C]/15" />
                    <div className="flex items-center gap-2.5">
                      <span className="text-base">📅</span>
                      <span>28—31 OCTOBER 2026</span>
                    </div>
                    <div className="w-full h-px bg-[#17251C]/15" />
                    <div className="flex items-center gap-2.5">
                      <span className="text-base">📍</span>
                      <span>GOA, INDIA</span>
                    </div>
                  </div>

                  {/* Circular Pink Postmark Stamp */}
                  <div className="absolute top-1/2 -translate-y-1/2 right-3 z-10 w-16 h-16 rounded-full border-2 border-dashed border-[#E62E78] bg-[#FAF7ED]/95 text-center flex items-center justify-center p-1 rotate-[-12deg] shadow-sm">
                    <div className="font-mono text-[7px] font-extrabold text-[#E62E78] uppercase leading-tight">
                      WELCOME<br />
                      <span className="font-serif text-[11px] font-black italic text-[#17251C]">TO GOA</span>
                    </div>
                  </div>
                </div>

                {/* ── Primary & Secondary CTAs ── */}
                <div className="flex flex-wrap items-center gap-4 mb-6">
                  {/* Primary Conversion CTA */}
                  <a
                    href={OFFICIAL_APPLY_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-8 py-4 bg-[#F5DD3B] text-[#17251C] font-mono text-xs sm:text-sm font-black uppercase tracking-wider border-2 border-[#17251C] shadow-[4px_4px_0px_#17251C] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[6px_6px_0px_#17251C] transition-all flex items-center gap-2 no-underline"
                  >
                    APPLY TO HACKER HOUSE GOA ↗
                  </a>

                  {/* Secondary Action */}
                  <Link
                    href="/create"
                    className="px-6 py-4 bg-transparent text-[#17251C] font-mono text-xs font-bold uppercase tracking-wider border-2 border-[#17251C]/40 hover:border-[#17251C] hover:bg-[#17251C]/5 transition-all no-underline"
                  >
                    BUILD ANOTHER ID →
                  </Link>
                </div>

                {/* Contextual Builder ID Callback if user generated an ID */}
                {hasBuilderId && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3.5 bg-[#163D28] text-[#F6F0D8] border-2 border-[#17251C] rounded flex items-center justify-between gap-4 max-w-md shadow-sm"
                  >
                    <div className="font-mono text-[11px]">
                      <span className="text-[#F5DD3B] font-bold">YOUR ID:</span> {displayId} · {displayName.toUpperCase()} ({displayClass})
                    </div>
                    <Link
                      href={`/id/${displayId}`}
                      className="font-mono text-[10px] font-bold text-[#F5DD3B] hover:underline uppercase shrink-0"
                    >
                      VIEW MY ID →
                    </Link>
                  </motion.div>
                )}
              </motion.div>

              {/* ── RIGHT COLUMN: FULL GOAN BEACH HOUSE ARTWORK ── */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.15 }}
                className="relative aspect-[4/3] lg:aspect-[1/1] w-full rounded-lg border-2 border-[#17251C] overflow-hidden shadow-[6px_6px_0px_rgba(23,37,28,0.25)] bg-[#163D28]"
              >
                <Image
                  src="/forest-wave.png"
                  alt="Hacker House Goa House by the ocean visual"
                  fill
                  className="object-cover"
                />

                {/* Gold Circular Stamp on Top Right */}
                <div className="absolute top-4 right-4 z-10 w-20 h-20 rounded-full border-2 border-dashed border-[#F5DD3B] bg-[#163D28]/90 text-center flex items-center justify-center p-1 rotate-[10deg] shadow-md">
                  <div className="font-mono text-[8px] font-extrabold text-[#F5DD3B] uppercase leading-tight">
                    BUILDER<br />
                    <span className="font-serif text-[13px] font-black italic text-[#F6F0D8]">GOA</span><br />
                    2026
                  </div>
                </div>

                {/* Bottom Overlay Label on Artwork */}
                <div className="absolute bottom-4 left-4 z-10 font-mono text-[10px] font-bold text-[#F6F0D8] bg-[#17251C]/90 px-3 py-1.5 border border-[#F6F0D8]/20 backdrop-blur-sm uppercase tracking-widest">
                  HH GOA 2026 · ONE HOUSE BY THE OCEAN
                </div>
              </motion.div>

            </div>

            {/* ─── Final Editorial Campaign Moment ─── */}
            <div className="mt-12 pt-8 border-t border-[#17251C]/15 text-center">
              <p className="font-display font-black text-2xl md:text-3xl text-[#17251C] uppercase tracking-tight mb-1">
                BUILD. SHIP. BELONG.
              </p>
              <p className="font-mono text-xs text-[#17251C]/60 mb-4">
                A few days in Goa. A room full of builders. Something worth shipping.
              </p>
              <div className="font-display font-black text-3xl md:text-4xl text-[#D4BE1F] uppercase tracking-tight">
                SEE YOU IN GOA.
              </div>
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
