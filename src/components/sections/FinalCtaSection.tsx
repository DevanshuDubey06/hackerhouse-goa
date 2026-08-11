'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { EVENT } from '@/lib/config';

export function FinalCtaSection() {
  return (
    <section className="relative bg-[#E62E78] text-white py-24 md:py-32 overflow-hidden grain-overlay border-t-2 border-[#17251C]">
      {/* Background Palm Leaves overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-10" aria-hidden="true">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
          <path d="M0 100 C30 60, 70 60, 100 100 Z" fill="#FFFFFF" />
        </svg>
      </div>

      <div className="relative z-10 section-padding max-container text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <div className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-[#F5DD3B] mb-4">
            ✦ HACKER HOUSE GOA {EVENT.year}
          </div>

          <h2 className="font-display text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight text-white leading-[0.9] mb-6">
            READY TO BUILD YOUR IDENTITY?
          </h2>

          <p className="font-mono text-xs md:text-sm text-white/80 max-w-lg mx-auto mb-8 leading-relaxed">
            {EVENT.datesShort} · {EVENT.location}
            <br />
            Four days of non-stop building, shipping, and belonging.
          </p>

          <div className="flex justify-center">
            <Link
              href="/create"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#F5DD3B] text-[#17251C] font-mono text-xs md:text-sm font-bold uppercase tracking-wider border-2 border-[#17251C] shadow-[4px_4px_0px_#17251C] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[6px_6px_0px_#17251C] active:translate-x-[1px] active:translate-y-[1px] transition-all no-underline"
            >
              BUILD MY BUILDER ID →
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
