'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { getBuilders, type BuilderData } from '@/lib/storage';
import { EVENT } from '@/lib/config';

export default function BuildersPage() {
  const [builders, setBuilders] = useState<BuilderData[]>([]);

  useEffect(() => {
    setBuilders(getBuilders().reverse()); // newest first
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-goa-green-deep grain-overlay pt-28 pb-16">
        <div className="section-padding max-container">
          <span className="text-label text-sun-yellow tracking-widest">
            THE BUILDERS
          </span>
          <h1 className="font-display text-cream text-4xl md:text-6xl font-black mt-4 leading-[0.9]">
            The House is Only
            <br />
            as Good as the
            <br />
            People Inside It.
          </h1>
        </div>
      </section>

      {/* Builders grid */}
      <section className="bg-cream paper-texture py-12 md:py-20">
        <div className="section-padding max-container">
          {builders.length > 0 ? (
            <>
              <p className="text-label text-xs text-dark-ink/40 mb-8">
                {builders.length} BUILDER{builders.length !== 1 ? 'S' : ''} IN THE HOUSE
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {builders.map((builder, i) => (
                  <motion.div
                    key={builder.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.04 }}
                  >
                    <Link
                      href={`/id/${builder.publicId}`}
                      className="block no-underline group"
                    >
                      <div
                        className="bg-goa-green text-cream transition-all group-hover:-translate-y-1"
                        style={{
                          border: '2px solid #17251C',
                          boxShadow: '4px 4px 0px rgba(23, 37, 28, 0.15)',
                        }}
                      >
                        <div className="flex items-center justify-between px-3 py-1.5 border-b border-cream/10">
                          <span className="text-label text-cream/40" style={{ fontSize: '0.55rem' }}>
                            BUILDER PASS
                          </span>
                          <span className="text-label text-sun-yellow" style={{ fontSize: '0.55rem' }}>
                            {builder.publicId}
                          </span>
                        </div>
                        <div className="p-4">
                          <div className="w-12 h-12 rounded-full bg-cream/10 border border-cream/20 mb-3 flex items-center justify-center overflow-hidden">
                            {builder.photoDataUrl ? (
                              <img src={builder.photoDataUrl} alt="" className="w-full h-full object-cover" />
                            ) : (
                              <span className="text-cream/30 font-display text-sm">
                                {builder.name.split(' ').map(n => n[0]).join('')}
                              </span>
                            )}
                          </div>
                          <h3 className="font-display text-lg font-bold text-cream">{builder.name}</h3>
                          <p className="text-label text-xs text-cream/50 mt-0.5">{builder.stack}</p>
                          <div className="mt-2">
                            <span className="sign-board sign-board-yellow px-2 py-0.5" style={{ fontSize: '0.55rem', border: '1.5px solid #17251C' }}>
                              {builder.builderClass.label}
                            </span>
                          </div>
                          {builder.location && (
                            <p className="text-label text-cream/30 mt-2" style={{ fontSize: '0.5rem' }}>
                              📍 {builder.location}
                            </p>
                          )}
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-20">
              <h2 className="font-display text-dark-ink text-2xl font-bold mb-2">
                The House is Empty.
              </h2>
              <p className="font-mono text-dark-ink/50 text-sm mb-8">
                Be the first builder to create your ID.
              </p>
              <Link href="/create" className="btn-primary">
                Create Your ID →
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
