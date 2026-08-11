import Link from 'next/link';
import { EVENT, OFFICIAL_APPLY_URL, SOCIAL } from '@/lib/config';

export function Footer() {
  return (
    <footer className="bg-[#0F2E1D] text-[#F6F0D8] border-t-2 border-[#17251C] grain-overlay relative overflow-hidden">
      <div className="max-container section-padding py-12 md:py-16">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 pb-12 border-b border-[#F6F0D8]/10">
          {/* Brand & Tagline */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="flex flex-col leading-none">
                <span className="font-display text-2xl font-black text-[#F5DD3B]">
                  HH
                </span>
                <span className="font-display text-2xl font-black text-[#F5DD3B]">
                  GOA
                </span>
              </div>
              <span className="font-mono text-xs font-bold text-[#F6F0D8]/60">
                {EVENT.year}
              </span>
            </div>
            <h3 className="font-display text-xl font-black tracking-tight text-[#F6F0D8] uppercase">
              HACKER HOUSE GOA {EVENT.year}
            </h3>
            <p className="font-mono text-xs text-[#F5DD3B] font-bold uppercase tracking-wider mt-1">
              BUILD · SHIP · BELONG
            </p>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-wrap items-center gap-6 font-mono text-xs font-semibold uppercase tracking-wider" aria-label="Footer navigation">
            <Link
              href="/house"
              className="text-[#F6F0D8]/75 hover:text-[#F5DD3B] transition-colors no-underline"
            >
              THE HOUSE
            </Link>
            <Link
              href="/create"
              className="text-[#F6F0D8]/75 hover:text-[#F5DD3B] transition-colors no-underline"
            >
              BUILD YOUR ID
            </Link>
            <Link
              href="/radar"
              className="text-[#F6F0D8]/75 hover:text-[#F5DD3B] transition-colors no-underline"
            >
              CHECK HYPE
            </Link>
            <a
              href={OFFICIAL_APPLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#F5DD3B] font-bold hover:underline no-underline"
            >
              APPLY ↗
            </a>
            <a
              href={SOCIAL.x}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#F6F0D8]/75 hover:text-[#F5DD3B] transition-colors no-underline"
            >
              X ↗
            </a>
          </nav>
        </div>

        {/* Bottom Metadata & Stamp */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="font-mono text-[10px] text-[#F6F0D8]/40 uppercase tracking-wider">
            © {EVENT.year} HACKER HOUSE GOA. ALL RIGHTS RESERVED. · {EVENT.dates} · {EVENT.location}
          </div>

          {/* Circular Postmark Stamp Artwork */}
          <div className="relative w-16 h-16 rounded-full border-2 border-dashed border-[#F5DD3B]/60 flex items-center justify-center text-center p-1 opacity-75 rotate-[-8deg] shrink-0">
            <div className="font-mono text-[6px] font-extrabold text-[#F5DD3B] uppercase leading-tight tracking-tighter">
              HACKER HOUSE<br />
              <span className="font-serif text-[10px] font-black italic text-[#F6F0D8]">GOA</span><br />
              2026
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
