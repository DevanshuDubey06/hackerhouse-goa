'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { EVENT, NAV_LINKS, OFFICIAL_APPLY_URL } from '@/lib/config';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  return (
    <>
      {/* ─── Top Eyebrow Bar ─── */}
      <div className="w-full bg-[#0F2E1D] border-b border-[#F6F0D8]/8">
        <div className="flex items-center justify-center py-2">
          <span className="font-mono text-[9px] md:text-[11px] text-[#F6F0D8]/50 tracking-[0.2em] uppercase font-medium">
            <span className="text-[#F5DD3B]/40 mr-1.5">✦</span>
            HH GOA {EVENT.year} · {EVENT.datesShort} · {EVENT.location}
            <span className="text-[#F5DD3B]/40 ml-1.5">✦</span>
          </span>
        </div>
      </div>

      {/* ─── Main Navigation ─── */}
      <nav
        className={`sticky top-0 z-50 border-b-2 border-[#17251C] transition-all duration-300 ${
          scrolled
            ? 'bg-[#163D28]/98 backdrop-blur-sm'
            : 'bg-[#1E5B3A]'
        }`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="max-container section-padding">
          <div className="flex items-center h-14 md:h-[4.25rem]">

            {/* Logo Box */}
            <Link
              href="/"
              className="flex items-center gap-1.5 border-2 border-[#F6F0D8]/20 px-3 py-1.5 no-underline group hover:border-[#F5DD3B]/40 transition-colors shrink-0"
              aria-label="Hacker House Goa Home"
            >
              <div className="flex flex-col leading-[0.82]">
                <span className="font-display text-[1.15rem] md:text-xl font-black text-[#F5DD3B] tracking-tight">HH</span>
                <span className="font-display text-[1.15rem] md:text-xl font-black text-[#F5DD3B] tracking-tight">GOA</span>
              </div>
              <span className="font-mono text-[9px] md:text-[10px] text-[#F6F0D8]/40 font-bold self-end mb-0.5">{EVENT.year}</span>
            </Link>

            {/* Brand Name — hidden on small screens */}
            <div className="hidden md:flex items-center border-l border-[#F6F0D8]/12 h-9 pl-5 ml-4">
              <span className="font-display text-[0.85rem] lg:text-[0.95rem] font-bold text-[#F6F0D8] tracking-[0.06em] uppercase whitespace-nowrap">
                Hacker House Goa
              </span>
            </div>

            {/* Desktop Nav Links — hidden below lg */}
            <div className="hidden lg:flex items-center ml-auto">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href;
                const isExternal = link.href.startsWith('http');
                if (isExternal) {
                  return (
                    <a
                      key={link.href}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-[11px] tracking-[0.1em] font-semibold uppercase no-underline px-5 h-9 flex items-center border-l border-[#F6F0D8]/12 text-[#F6F0D8]/65 hover:text-[#F6F0D8] transition-colors whitespace-nowrap"
                    >
                      {link.label} ↗
                    </a>
                  );
                }
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`font-mono text-[11px] tracking-[0.1em] font-semibold uppercase no-underline px-5 h-9 flex items-center border-l border-[#F6F0D8]/12 transition-colors whitespace-nowrap ${
                      isActive
                        ? 'text-[#F5DD3B]'
                        : 'text-[#F6F0D8]/65 hover:text-[#F6F0D8]'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>

            {/* Apply CTA + Mobile Menu Toggle */}
            <div className="flex items-center gap-3 ml-auto lg:ml-4">
              <a
                href={OFFICIAL_APPLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-1.5 px-4 py-[7px] bg-[#F5DD3B] text-[#17251C] font-mono text-[11px] font-bold uppercase tracking-[0.08em] border-2 border-[#17251C] shadow-[2px_2px_0px_#17251C] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[3px_3px_0px_#17251C] active:translate-x-[1px] active:translate-y-[1px] transition-all no-underline"
              >
                APPLY <span className="text-[14px] leading-none ml-0.5">↗</span>
              </a>

              <button
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden text-[#F6F0D8] p-2 hover:text-[#F5DD3B] transition-colors"
                aria-label={isOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={isOpen}
              >
                {isOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* ─── Mobile Menu Overlay ─── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-[#0F2E1D] flex flex-col items-center justify-center grain-overlay"
          >
            {/* Watermark */}
            <div className="absolute top-10 right-8 text-[#F5DD3B]/[0.03] font-display text-[8rem] font-black leading-none select-none pointer-events-none" aria-hidden="true">
              HH
            </div>

            <nav className="flex flex-col items-center gap-6" aria-label="Mobile navigation">
              {NAV_LINKS.map((link, i) => {
                const isExternal = link.href.startsWith('http');
                return (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 + 0.08 }}
                  >
                    {isExternal ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-display text-2xl sm:text-3xl uppercase tracking-tight no-underline text-[#F6F0D8] hover:text-[#E62E78] transition-colors"
                      >
                        {link.label} ↗
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className={`font-display text-2xl sm:text-3xl uppercase tracking-tight no-underline transition-colors ${
                          pathname === link.href
                            ? 'text-[#F5DD3B]'
                            : 'text-[#F6F0D8] hover:text-[#E62E78]'
                        }`}
                      >
                        {link.label}
                      </Link>
                    )}
                  </motion.div>
                );
              })}

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-6"
              >
                <a
                  href={OFFICIAL_APPLY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-[#F5DD3B] text-[#17251C] font-mono text-sm font-bold uppercase tracking-wider border-2 border-[#17251C] shadow-[3px_3px_0px_#17251C] inline-block no-underline"
                >
                  APPLY FOR HH GOA ↗
                </a>
              </motion.div>
            </nav>

            <div className="absolute bottom-8 text-center font-mono text-[10px] text-[#F6F0D8]/30 space-y-1 tracking-wider uppercase">
              <p>{EVENT.dates}</p>
              <p>{EVENT.location}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
