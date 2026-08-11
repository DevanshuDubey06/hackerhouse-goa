'use client';

import { motion } from 'framer-motion';
import { EXPERIENCE_DAYS } from '@/lib/config';

// Icons/Illustrations for each card matching Panel 2
const cardIllustrations: Record<string, React.ReactNode> = {
  '01': (
    <svg viewBox="0 0 80 50" className="w-16 h-10 opacity-70" fill="none" stroke="currentColor" strokeWidth="2">
      {/* Airplane */}
      <path d="M10 25 L40 10 L70 25 L45 27 L50 45 L40 40 L35 45 L37 27 Z" />
    </svg>
  ),
  '02': (
    <svg viewBox="0 0 80 50" className="w-16 h-10 opacity-70" fill="none" stroke="currentColor" strokeWidth="2">
      {/* Laptop */}
      <rect x="20" y="10" width="40" height="26" rx="2" />
      <path d="M10 40 L70 40" strokeWidth="3" />
      <path d="M28 20 L35 24 L28 28" />
    </svg>
  ),
  '03': (
    <svg viewBox="0 0 80 50" className="w-16 h-10 opacity-70" fill="none" stroke="currentColor" strokeWidth="2">
      {/* Umbrella & Chairs */}
      <path d="M20 38 L40 10 L60 38" />
      <line x1="40" y1="10" x2="40" y2="45" strokeWidth="2.5" />
      <path d="M15 45 L65 45" />
    </svg>
  ),
  '04': (
    <svg viewBox="0 0 80 50" className="w-16 h-10 opacity-70" fill="none" stroke="currentColor" strokeWidth="2">
      {/* Surfboards & Waves */}
      <path d="M30 40 C35 15, 45 15, 50 40" />
      <path d="M40 40 C45 20, 55 20, 60 40" />
      <path d="M10 42 C30 38, 50 46, 70 42" strokeWidth="1.5" />
    </svg>
  ),
  '05': (
    <svg viewBox="0 0 80 50" className="w-16 h-10 opacity-70" fill="none" stroke="currentColor" strokeWidth="2">
      {/* Two people sitting */}
      <circle cx="28" cy="20" r="6" />
      <path d="M18 42 C18 32, 38 32, 38 42" />
      <circle cx="52" cy="20" r="6" />
      <path d="M42 42 C42 32, 62 32, 62 42" />
    </svg>
  ),
  '06': (
    <svg viewBox="0 0 80 50" className="w-16 h-10 opacity-70" fill="none" stroke="currentColor" strokeWidth="2">
      {/* Night Sky & Moon */}
      <path d="M50 15 C45 15, 40 20, 40 28 C40 36, 48 40, 55 38 C48 42, 38 38, 38 28 C38 18, 48 12, 55 12 Z" fill="currentColor" opacity="0.3" />
      <circle cx="25" cy="18" r="1.5" fill="currentColor" />
      <circle cx="65" cy="22" r="1.5" fill="currentColor" />
    </svg>
  ),
};

export function ExperienceSection() {
  return (
    <section className="relative bg-[#F6F0D8] text-[#17251C] pb-24 overflow-hidden paper-texture">
      <div className="relative z-10 section-padding max-container">
        {/* Title */}
        <div className="mb-8">
          <h3 className="font-mono text-sm md:text-base font-bold uppercase tracking-wider text-[#17251C]">
            THE EXPERIENCE
          </h3>
        </div>

        {/* 6 Tall Vertical Cards Grid (Matching Panel 2) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {EXPERIENCE_DAYS.map((day, i) => {
            const isFirst = i === 0;
            return (
              <motion.div
                key={day.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className={`flex flex-col justify-between p-5 min-h-[340px] border-2 border-[#17251C] shadow-[4px_4px_0px_#17251C] ${
                  isFirst
                    ? 'bg-[#F6F0D8] text-[#17251C]'
                    : 'bg-[#1E5B3A] text-[#F6F0D8]'
                }`}
              >
                {/* Header: Number & Title */}
                <div>
                  <div className="font-mono text-2xl font-black mb-1 opacity-90">
                    {day.number}
                  </div>
                  <div className="font-mono text-sm md:text-base font-extrabold uppercase tracking-wider mb-4 border-b border-current/20 pb-2">
                    {day.title}
                  </div>
                  <div className="font-mono text-[11px] leading-relaxed uppercase opacity-85 whitespace-pre-line font-medium">
                    {day.description}
                  </div>
                </div>

                {/* Bottom Illustration */}
                <div className="mt-8 flex justify-center items-end">
                  {cardIllustrations[day.number]}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
