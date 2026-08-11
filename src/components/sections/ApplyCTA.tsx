'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { EVENT, OFFICIAL_APPLY_URL } from '@/lib/config';
import { PalmTree } from '@/components/shared/GoaIllustrations';

export function ApplyCTA() {
  return (
    <section className="relative bg-[#E62E78] text-white py-20 md:py-28 overflow-hidden grain-overlay">
      {/* Background Palms */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute bottom-0 left-[3%] opacity-15">
          <PalmTree height={260} color="#FFFFFF" />
        </div>
        <div className="absolute bottom-0 right-[5%] opacity-15 scale-x-[-1]">
          <PalmTree height={240} color="#FFFFFF" />
        </div>
      </div>

      <div className="relative z-10 section-padding max-container text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="font-display text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight text-white leading-[0.9] mb-4">
            READY TO ENTER<br />
            THE HOUSE?
          </h2>

          <p className="font-mono text-sm md:text-base font-bold text-white/90 tracking-widest mt-6">
            {EVENT.dates}
          </p>
          <p className="font-mono text-xs md:text-sm font-semibold text-white/70 tracking-wider">
            {EVENT.location}
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href={OFFICIAL_APPLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#F5DD3B] text-[#17251C] font-mono text-xs md:text-sm font-bold uppercase tracking-wider border-2 border-[#17251C] shadow-[4px_4px_0px_#17251C] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[6px_6px_0px_#17251C] active:translate-x-[1px] active:translate-y-[1px] transition-all no-underline"
            >
              APPLY FOR HH GOA →
            </a>

            <Link
              href="/create"
              className="inline-flex items-center gap-2 px-8 py-4 bg-transparent text-white font-mono text-xs md:text-sm font-bold uppercase tracking-wider border-2 border-white shadow-[3px_3px_0px_rgba(0,0,0,0.2)] hover:bg-white hover:text-[#17251C] transition-all no-underline"
            >
              CREATE YOUR ID FIRST
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
