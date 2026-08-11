'use client';

import { motion } from 'framer-motion';
import { MESSAGING } from '@/lib/config';

export function AboutSection() {
  return (
    <section className="relative bg-[#F6F0D8] text-[#17251C] py-20 md:py-28 overflow-hidden paper-texture border-t-2 border-[#17251C]">
      <div className="relative z-10 section-padding max-container">
        {/* Header Block */}
        <div className="max-w-3xl mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="mb-3"
          >
            <span className="font-mono text-xs text-[#E62E78] font-bold tracking-[0.14em] uppercase">
              ✦ THE MANIFESTO
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="font-display text-[#17251C] font-black text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[0.9] tracking-tight uppercase"
          >
            LESS NOISE.
            <br />
            <span className="text-[#1E5B3A]">MORE BUILDING.</span>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mt-6 space-y-3 font-mono text-xs md:text-sm text-[#17251C]/80 leading-relaxed"
          >
            <p className="font-semibold text-[#17251C]">
              {MESSAGING.about.description}
            </p>
            <p className="whitespace-pre-line text-[#17251C]/70">
              {MESSAGING.about.description2}
            </p>
          </motion.div>
        </div>

        {/* 3 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {MESSAGING.pillars.map((pillar, i) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 + 0.2 }}
              className="bg-[#FAF7ED] border-2 border-[#17251C] p-6 shadow-[4px_4px_0px_#17251C] relative flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4 border-b border-[#17251C]/15 pb-3">
                  <span className="font-mono text-xs font-bold text-[#E62E78]">
                    0{i + 1}
                  </span>
                  <span className="font-mono text-[10px] text-[#17251C]/40 uppercase tracking-widest">
                    PILLAR
                  </span>
                </div>
                <h3 className="font-display text-3xl font-black text-[#17251C] tracking-tight mb-2">
                  {pillar.title}
                </h3>
                <p className="font-mono text-xs text-[#17251C]/75 leading-relaxed">
                  {pillar.description}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-dashed border-[#17251C]/15 flex items-center justify-between text-[10px] font-mono text-[#17251C]/50 uppercase tracking-wider">
                <span>HH GOA 2026</span>
                <span>✦</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
