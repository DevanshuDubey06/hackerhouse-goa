'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export function IdPreviewSection() {
  return (
    <section className="relative bg-[#0F2E1D] text-[#F6F0D8] py-20 md:py-28 overflow-hidden grain-overlay border-t-2 border-[#17251C]">
      <div className="relative z-10 section-padding max-container">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="mb-2"
          >
            <span className="font-mono text-xs text-[#F5DD3B] font-semibold tracking-[0.14em] uppercase">
              ✦ BUILDER IDENTIFICATION SYSTEM
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="font-display text-4xl sm:text-5xl md:text-6xl font-black uppercase text-[#F5DD3B] leading-[0.95] tracking-tight mb-4"
          >
            BUILD YOUR IDENTITY.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.16 }}
            className="font-mono text-xs md:text-sm text-[#F6F0D8]/70"
          >
            Create your official Hacker House Goa Builder ID.
          </motion.p>
        </div>

        {/* Previews Grid: BUILDER ID, PROFILE, LANDSCAPE, BADGE */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1: BUILDER ID */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="bg-[#1E5B3A] border-2 border-[#17251C] p-5 shadow-[4px_4px_0px_#17251C] flex flex-col justify-between"
          >
            <div>
              <div className="flex justify-between items-center mb-3 text-[10px] font-mono text-[#F5DD3B] tracking-wider uppercase border-b border-[#F6F0D8]/15 pb-2">
                <span>FORMAT 01</span>
                <span>BUILDER ID</span>
              </div>

              {/* ID Card Visual */}
              <div className="bg-[#163D28] border border-[#F6F0D8]/20 p-4 rounded-sm relative overflow-hidden mb-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded bg-[#F5DD3B] text-[#17251C] flex items-center justify-center font-display font-black text-xl">
                    ⚡
                  </div>
                  <div>
                    <div className="font-display font-extrabold text-sm text-[#F6F0D8]">DEV DUBEY</div>
                    <div className="font-mono text-[9px] text-[#F5DD3B]">THE SHIPPER</div>
                  </div>
                </div>
                <div className="font-mono text-[9px] text-[#F6F0D8]/60 space-y-1 border-t border-[#F6F0D8]/10 pt-2">
                  <div>STACK: AI / FULLSTACK</div>
                  <div>ID: HH-26-0241</div>
                </div>
              </div>
            </div>

            <div className="font-mono text-[10px] text-[#F6F0D8]/50 uppercase tracking-widest text-center">
              STANDARD PASS
            </div>
          </motion.div>

          {/* Card 2: PROFILE */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="bg-[#1E5B3A] border-2 border-[#17251C] p-5 shadow-[4px_4px_0px_#17251C] flex flex-col justify-between"
          >
            <div>
              <div className="flex justify-between items-center mb-3 text-[10px] font-mono text-[#F5DD3B] tracking-wider uppercase border-b border-[#F6F0D8]/15 pb-2">
                <span>FORMAT 02</span>
                <span>PROFILE</span>
              </div>

              {/* Profile Card Visual */}
              <div className="bg-[#163D28] border border-[#F6F0D8]/20 p-4 rounded-sm text-center relative overflow-hidden mb-4">
                <div className="w-14 h-14 mx-auto rounded-full bg-[#E62E78] text-white flex items-center justify-center font-display font-black text-2xl mb-2">
                  ✶
                </div>
                <div className="font-display font-extrabold text-sm text-[#F6F0D8]">RIYA SHARMA</div>
                <div className="font-mono text-[9px] text-[#E62E78] font-bold">THE DESIGNER</div>
                <div className="font-mono text-[9px] text-[#F6F0D8]/50 mt-1">MUMBAI, INDIA</div>
              </div>
            </div>

            <div className="font-mono text-[10px] text-[#F6F0D8]/50 uppercase tracking-widest text-center">
              SQUAD AVATAR
            </div>
          </motion.div>

          {/* Card 3: LANDSCAPE */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="bg-[#1E5B3A] border-2 border-[#17251C] p-5 shadow-[4px_4px_0px_#17251C] flex flex-col justify-between"
          >
            <div>
              <div className="flex justify-between items-center mb-3 text-[10px] font-mono text-[#F5DD3B] tracking-wider uppercase border-b border-[#F6F0D8]/15 pb-2">
                <span>FORMAT 03</span>
                <span>LANDSCAPE</span>
              </div>

              {/* Landscape Card Visual */}
              <div className="bg-[#163D28] border border-[#F6F0D8]/20 p-3 rounded-sm relative overflow-hidden mb-4">
                <div className="flex justify-between items-center border-b border-[#F6F0D8]/10 pb-1.5 mb-2">
                  <span className="font-display text-[10px] font-black text-[#F5DD3B]">HH GOA 2026</span>
                  <span className="font-mono text-[8px] text-[#F6F0D8]/50">OCT 28-31</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded bg-[#17251C] text-[#F5DD3B] flex items-center justify-center font-mono text-xs">
                    🏛
                  </div>
                  <div>
                    <div className="font-display font-bold text-[11px] text-[#F6F0D8]">KUNAL VERMA</div>
                    <div className="font-mono text-[8px] text-[#F5DD3B]">THE ARCHITECT</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="font-mono text-[10px] text-[#F6F0D8]/50 uppercase tracking-widest text-center">
              SOCIAL BANNER
            </div>
          </motion.div>

          {/* Card 4: BADGE */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="bg-[#1E5B3A] border-2 border-[#17251C] p-5 shadow-[4px_4px_0px_#17251C] flex flex-col justify-between"
          >
            <div>
              <div className="flex justify-between items-center mb-3 text-[10px] font-mono text-[#F5DD3B] tracking-wider uppercase border-b border-[#F6F0D8]/15 pb-2">
                <span>FORMAT 04</span>
                <span>BADGE</span>
              </div>

              {/* Badge Card Visual */}
              <div className="bg-[#F5DD3B] text-[#17251C] border-2 border-[#17251C] p-4 rounded-sm text-center relative overflow-hidden mb-4 shadow-[2px_2px_0px_#17251C]">
                <div className="font-mono text-[9px] font-bold tracking-widest text-[#17251C]/60 mb-1">
                  OFFICIAL BUILDER
                </div>
                <div className="font-display font-black text-lg leading-tight mb-1">
                  ANANYA ROY
                </div>
                <div className="inline-block bg-[#17251C] text-[#F5DD3B] px-2 py-0.5 font-mono text-[8px] font-bold">
                  THE DEGEN
                </div>
              </div>
            </div>

            <div className="font-mono text-[10px] text-[#F6F0D8]/50 uppercase tracking-widest text-center">
              PRINT BADGE
            </div>
          </motion.div>
        </div>

        {/* CTA to start generator */}
        <div className="mt-12 text-center">
          <Link
            href="/create"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#F5DD3B] text-[#17251C] font-mono text-xs md:text-sm font-bold uppercase tracking-wider border-2 border-[#17251C] shadow-[4px_4px_0px_#17251C] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[6px_6px_0px_#17251C] active:translate-x-[1px] active:translate-y-[1px] transition-all no-underline"
          >
            CREATE YOUR BUILDER ID NOW →
          </Link>
        </div>
      </div>
    </section>
  );
}
