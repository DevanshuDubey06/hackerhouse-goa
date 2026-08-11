'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';

const SAMPLE_BUILDERS = [
  {
    name: 'Devanshu Dubey',
    stack: 'AI / Fullstack',
    builderClass: 'The Shipper',
    id: 'HH-26-0241',
    location: 'Bhopal, India',
    color: 'bg-goa-green',
  },
  {
    name: 'Riya Sharma',
    stack: 'Product Design',
    builderClass: 'The Designer',
    id: 'HH-26-0342',
    location: 'Mumbai, India',
    color: 'bg-dark-ink',
  },
  {
    name: 'Kunal Verma',
    stack: 'Backend / Infra',
    builderClass: 'The Architect',
    id: 'HH-26-0441',
    location: 'Bangalore, India',
    color: 'bg-goa-green-dark',
  },
  {
    name: 'Ananya Roy',
    stack: 'Web3 / DeFi',
    builderClass: 'The Degen',
    id: 'HH-26-0545',
    location: 'Hyderabad, India',
    color: 'bg-dark-ink',
  },
  {
    name: 'Arjun Nair',
    stack: 'ML / Research',
    builderClass: 'The Researcher',
    id: 'HH-26-0241',
    location: 'Delhi, India',
    color: 'bg-goa-green',
  },
  {
    name: 'Priya Iyer',
    stack: 'Frontend / Mobile',
    builderClass: 'The Creator',
    id: 'HH-26-0198',
    location: 'Chennai, India',
    color: 'bg-goa-green-dark',
  },
];

export function BuildersSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section
      ref={ref}
      className="relative bg-cream py-20 md:py-28 overflow-hidden paper-texture"
    >
      <div className="relative z-10 section-padding max-container">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="mb-4"
        >
          <span className="text-label text-hot-pink tracking-widest">
            THE BUILDERS
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1 }}
          className="font-display text-dark-ink text-3xl md:text-4xl lg:text-5xl font-bold mb-4 max-w-2xl"
        >
          The House is Only as Good as the People Inside It.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="font-mono text-sm text-dark-ink/60 mb-12"
        >
          Meet some of the builders who have been part of the house.
        </motion.p>

        {/* Builder cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SAMPLE_BUILDERS.map((builder, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.08 + 0.3 }}
            >
              <div
                className={`${builder.color} text-cream relative overflow-hidden`}
                style={{
                  border: '2px solid #17251C',
                  boxShadow: '4px 4px 0px rgba(23, 37, 28, 0.15)',
                }}
              >
                {/* Top bar - like an ID card */}
                <div className="flex items-center justify-between px-4 py-2 border-b border-cream/10">
                  <span className="text-label text-xs text-cream/50">
                    BUILDER PASS
                  </span>
                  <span className="text-label text-xs text-sun-yellow">
                    {builder.id}
                  </span>
                </div>

                {/* Content */}
                <div className="p-5">
                  {/* Avatar placeholder */}
                  <div className="w-16 h-16 rounded-full bg-cream/10 border-2 border-cream/20 mb-4 flex items-center justify-center">
                    <span className="font-display text-xl text-cream/40">
                      {builder.name
                        .split(' ')
                        .map((n) => n[0])
                        .join('')}
                    </span>
                  </div>

                  <h3 className="font-display text-xl font-bold text-cream mb-1">
                    {builder.name}
                  </h3>

                  <p className="text-label text-xs text-cream/60 mb-3">
                    {builder.stack}
                  </p>

                  {/* Builder class badge */}
                  <div className="inline-block">
                    <span
                      className="sign-board sign-board-yellow px-3 py-1 text-xs"
                      style={{ fontSize: '0.65rem' }}
                    >
                      {builder.builderClass}
                    </span>
                  </div>

                  {/* Location */}
                  <p className="text-label text-xs text-cream/40 mt-3">
                    📍 {builder.location}
                  </p>
                </div>

                {/* Corner decorations */}
                <div className="absolute top-0 right-0 w-8 h-8">
                  <div className="absolute top-2 right-2 w-4 h-4 border-t border-r border-cream/10" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
          className="mt-12 text-center"
        >
          <Link href="/create" className="btn-dark">
            Create Your Builder ID →
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
