'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { STATS } from '@/lib/config';
import { PalmTree, Sun, Scooter, Boat } from '@/components/shared/GoaIllustrations';

const signs = [
  { value: STATS.registrations, label: 'Registrations', color: 'yellow' as const, rotation: -2 },
  { value: STATS.hackers, label: 'Hackers', color: 'pink' as const, rotation: 1.5 },
  { value: STATS.projects, label: 'Projects', color: 'yellow' as const, rotation: -1 },
  { value: STATS.bounties, label: 'Bounties', color: 'pink' as const, rotation: 2 },
];

export function StatsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section
      ref={ref}
      className="relative bg-goa-green py-20 md:py-28 overflow-hidden grain-overlay"
    >
      {/* Background illustrations */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute bottom-0 left-[5%] opacity-10">
          <PalmTree height={220} color="#F6F0D8" />
        </div>
        <div className="absolute bottom-0 right-[8%] opacity-8 scale-x-[-1]">
          <PalmTree height={180} color="#F6F0D8" />
        </div>
        <div className="absolute top-[5%] right-[15%] opacity-20">
          <Sun size={100} />
        </div>
        <div className="absolute bottom-[10%] left-[25%] opacity-8 hidden md:block">
          <Scooter size={90} />
        </div>
        <div className="absolute bottom-[15%] right-[30%] opacity-8 hidden lg:block">
          <Boat size={70} />
        </div>
      </div>

      <div className="relative z-10 section-padding max-container">
        {/* Signboard post */}
        <div className="flex flex-col items-center">
          {/* Main pole */}
          <div className="w-3 bg-dark-ink/30 rounded-full" style={{ height: '40px' }} />

          {/* Signs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-5xl">
            {signs.map((sign, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30, rotate: sign.rotation * 2 }}
                animate={
                  isInView
                    ? { opacity: 1, y: 0, rotate: sign.rotation }
                    : {}
                }
                transition={{
                  delay: i * 0.12,
                  duration: 0.5,
                  ease: [0.4, 0, 0.2, 1],
                }}
              >
                {/* Rope/nail */}
                <div className="flex justify-center mb-1">
                  <div className="w-1.5 h-4 bg-dark-ink/20 rounded-full" />
                </div>
                {/* Sign board */}
                <div
                  className={`sign-board ${
                    sign.color === 'yellow'
                      ? 'sign-board-yellow'
                      : 'sign-board-pink'
                  } text-center p-6`}
                  style={{ transform: `rotate(${sign.rotation}deg)` }}
                >
                  <div className="font-display text-4xl md:text-5xl font-black mb-1">
                    {sign.value}
                  </div>
                  <div className="text-label text-xs tracking-widest opacity-80">
                    {sign.label}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
