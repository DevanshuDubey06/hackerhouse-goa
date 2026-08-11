'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { MESSAGING } from '@/lib/config';
import { GoaHouse } from '@/components/shared/GoaIllustrations';

export function HouseSection() {
  return (
    <section className="relative bg-[#F6F0D8] text-[#17251C] py-20 md:py-28 overflow-hidden paper-texture">
      <div className="relative z-10 section-padding max-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column Text */}
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="font-display text-[#17251C] font-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[0.95] tracking-tight uppercase"
            >
              {MESSAGING.house.headline.map((line, i) => (
                <span key={i} className="block">
                  {line}
                </span>
              ))}
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="mt-8 space-y-2 font-mono text-xs md:text-sm text-[#17251C]/75 leading-relaxed max-w-md"
            >
              {MESSAGING.house.body.map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="mt-8"
            >
              <Link
                href="/house"
                className="font-mono text-xs md:text-sm font-bold uppercase text-[#E62E78] hover:text-[#C41E62] transition-colors inline-flex items-center gap-1 tracking-wider no-underline"
              >
                {MESSAGING.house.cta}
              </Link>
            </motion.div>
          </div>

          {/* Right Column: Scalloped Postcard Photo of Goa House (Matching Panel 2) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative flex justify-center lg:justify-end"
          >
            {/* Scalloped Postcard Container */}
            <div className="relative p-3 bg-white shadow-[6px_6px_0px_rgba(23,37,28,0.15)] border-2 border-[#17251C] max-w-md w-full"
                 style={{
                   // Scalloped edge simulation
                   boxShadow: '8px 8px 0px rgba(23, 37, 28, 0.2)',
                 }}
            >
              {/* Photo Area */}
              <div className="aspect-[4/3] bg-[#1E5B3A] relative overflow-hidden flex items-end justify-center border border-[#17251C]">
                <div className="absolute inset-0 bg-gradient-to-t from-[#1E5B3A] via-[#1E5B3A]/40 to-transparent z-10" />
                <GoaHouse size={260} className="relative z-10 opacity-70 mb-2" />
              </div>

              {/* Red Circular Postmark Stamp in Top Right Corner */}
              <div className="absolute -top-4 -right-4 z-30 pointer-events-none">
                <div className="relative w-20 h-20 rounded-full border-2 border-dashed border-[#E62E78] flex items-center justify-center text-center p-1 bg-[#F6F0D8]/90 rotate-[-12deg]">
                  <div className="font-mono text-[7px] font-bold text-[#E62E78] uppercase leading-tight tracking-tighter">
                    BUILDERS OF<br />
                    <span className="font-serif text-xs font-black italic">GOA</span><br />
                    2026
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
