'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { getBuilderByPublicId, type BuilderData } from '@/lib/storage';
import { exportIDCard } from '@/lib/canvas-renderer';
import { EVENT, SHARE_TEXT, CHECK_HYPE_URL } from '@/lib/config';

/* ================================================================
   DECORATIVE STRIP
   ================================================================ */

const STRIP_PATTERN = `url("data:image/svg+xml,%3Csvg width='60' height='22' viewBox='0 0 60 22' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='60' height='22' fill='%23C41E62'/%3E%3Crect width='60' height='1' fill='%2317251C'/%3E%3Crect y='21' width='60' height='1' fill='%2317251C'/%3E%3Cpath d='M30 3L38 11L30 19L22 11Z' fill='%231E5B3A' stroke='%23F5DD3B' stroke-width='0.6'/%3E%3Ccircle cx='30' cy='11' r='2.5' fill='%23F5DD3B'/%3E%3Ccircle cx='8' cy='11' r='3.5' fill='%231E5B3A'/%3E%3Ccircle cx='8' cy='11' r='1.5' fill='%23F5DD3B'/%3E%3Ccircle cx='52' cy='11' r='3.5' fill='%231E5B3A'/%3E%3Ccircle cx='52' cy='11' r='1.5' fill='%23F5DD3B'/%3E%3Cellipse cx='19' cy='6' rx='3.5' ry='1.5' fill='%231E5B3A' transform='rotate(25 19 6)'/%3E%3Cellipse cx='41' cy='6' rx='3.5' ry='1.5' fill='%231E5B3A' transform='rotate(-25 41 6)'/%3E%3Cellipse cx='19' cy='16' rx='3.5' ry='1.5' fill='%231E5B3A' transform='rotate(-25 19 16)'/%3E%3Cellipse cx='41' cy='16' rx='3.5' ry='1.5' fill='%231E5B3A' transform='rotate(25 41 16)'/%3E%3Ccircle cx='30' cy='3' r='1' fill='%23F5DD3B' opacity='0.6'/%3E%3Ccircle cx='30' cy='19' r='1' fill='%23F5DD3B' opacity='0.6'/%3E%3C/svg%3E")`;

/* ================================================================
   PAGE 08 — PUBLIC BUILDER PROFILE
   ================================================================ */

export default function PublicIDPage() {
  const params = useParams();
  const publicId = params.publicId as string;

  // Builder data loaded from storage
  const [builder, setBuilder] = useState<BuilderData | null>(null);
  const [notFound, setNotFound] = useState(false);

  // Fallback state
  const [name, setName] = useState('PRIYANSHU KHARE');
  const [stack, setStack] = useState('AI/ML // PYTHON // NEXT.JS');
  const [builderClass, setBuilderClass] = useState('NEURAL NOMAD');
  const [photoUrl, setPhotoUrl] = useState('/builder-solo.png');
  const [builderId, setBuilderId] = useState('HH-26-0241');
  const [vibe, setVibe] = useState('forest-wave');
  const [frame, setFrame] = useState('portrait');

  // Interaction state
  const [copiedLink, setCopiedLink] = useState(false);
  const [downloadingFormat, setDownloadingFormat] = useState<string | null>(null);

  useEffect(() => {
    // Try structured storage first
    const data = getBuilderByPublicId(publicId?.toUpperCase());
    if (data) {
      setBuilder(data);
      setName(data.name);
      setStack(data.stack);
      setBuilderClass(data.builderClass?.label || 'NEURAL NOMAD');
      setBuilderId(data.publicId);
      if (data.frameStyle) setVibe(data.frameStyle);
      if (data.frameFormat) setFrame(data.frameFormat);
      if (data.photoDataUrl) setPhotoUrl(data.photoDataUrl);
    } else if (typeof window !== 'undefined') {
      // Fallback: read from localStorage directly
      const savedName = localStorage.getItem('hh_builder_name');
      if (savedName) setName(savedName);

      const savedStack = localStorage.getItem('hh_builder_stack');
      if (savedStack) setStack(savedStack);

      const savedClass = localStorage.getItem('hh_builder_class');
      if (savedClass) setBuilderClass(savedClass);

      const savedPhoto = localStorage.getItem('hh_builder_photo');
      if (savedPhoto) setPhotoUrl(savedPhoto);

      const savedId = localStorage.getItem('hh_builder_id');
      if (savedId) setBuilderId(savedId);

      const savedPalette = localStorage.getItem('hh_builder_palette');
      if (savedPalette) setVibe(savedPalette);

      const savedFormat = localStorage.getItem('hh_builder_format');
      if (savedFormat) setFrame(savedFormat);

      if (!savedName && !data) {
        setNotFound(true);
      }
    }
  }, [publicId]);

  // Download Handler (Export PNG or JPG directly from validated canvas blob)
  const handleDownload = async (format: 'png' | 'jpg' = 'png') => {
    setDownloadingFormat(format);
    try {
      await exportIDCard(
        {
          photo: builder?.photoDataUrl || photoUrl,
          name,
          stack,
          builderClass,
          builderId,
          vibe,
          frame,
        },
        format
      );
    } catch (err) {
      console.error('[Download Public Profile Error]:', err);
    } finally {
      setDownloadingFormat(null);
    }
  };

  // Share to X
  const handleShareToX = () => {
    const text = SHARE_TEXT(builderClass, builderId);
    window.open(
      `https://x.com/intent/tweet?text=${encodeURIComponent(text)}`,
      '_blank',
      'noopener,noreferrer'
    );
  };

  // Copy Public Link
  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  // Card Background Style based on Vibe
  const cardBgClass = vibe.includes('sunburst')
    ? 'bg-[#C77D0A]'
    : vibe.includes('sunset')
    ? 'bg-[#BE123C]'
    : 'bg-[#163D28]';

  // ── NOT FOUND STATE ──
  if (notFound) {
    return (
      <div className="min-h-screen bg-[#1E5B3A] text-[#F6F0D8] grain-overlay flex items-center justify-center">
        <div className="text-center section-padding max-w-xl">
          <div className="font-display text-5xl font-black text-[#F5DD3B] mb-4">404</div>
          <h1 className="font-display text-3xl font-black text-[#F6F0D8] mb-4">
            BUILDER NOT FOUND
          </h1>
          <p className="font-mono text-xs text-[#F6F0D8]/60 mb-8">
            This builder ID doesn&apos;t exist yet.
            <br />
            Maybe it&apos;s your turn to create one.
          </p>
          <Link
            href="/create"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#F5DD3B] text-[#17251C] font-mono text-xs font-bold uppercase tracking-wider border-2 border-[#17251C] shadow-[4px_4px_0px_#17251C] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[6px_6px_0px_#17251C] transition-all no-underline"
          >
            BUILD YOUR OWN →
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1E5B3A] text-[#F6F0D8] grain-overlay">
      {/* ─── Main Container ─── */}
      <section className="relative pt-6 md:pt-8 pb-16 overflow-hidden">
        <div className="max-container section-padding relative z-10">

          {/* Aged Paper Poster Container */}
          <div className="relative bg-[#FAF7ED] text-[#17251C] border-2 border-[#17251C] shadow-[8px_8px_0px_rgba(23,37,28,0.3)] p-6 md:p-10 lg:p-12 rounded-sm overflow-hidden">

            {/* ─── 2-Column Layout: Credential Card (L) + Profile Info (R) ─── */}
            <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-8 lg:gap-12 items-start">

              {/* ── LEFT COLUMN: DOMINANT BUILDER ID CREDENTIAL ── */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="relative flex flex-col items-center"
              >
                {/* Hanging Lanyard Strings */}
                <div className="w-full flex justify-center mb-[-8px] relative z-20">
                  <div className="flex gap-6">
                    <div className="w-1 h-14 bg-gradient-to-b from-[#17251C] via-[#F5DD3B]/70 to-[#17251C] rounded-full shadow-sm" />
                    <div className="w-1 h-14 bg-gradient-to-b from-[#17251C] via-[#F5DD3B]/70 to-[#17251C] rounded-full shadow-sm" />
                  </div>
                </div>

                {/* The Credential Card */}
                <div className={`w-full ${cardBgClass} text-[#F6F0D8] border-2 border-[#17251C] rounded-xl p-6 md:p-8 shadow-[8px_8px_0px_#17251C] relative overflow-hidden transition-colors duration-300`}>

                  {/* Top Punch Hole */}
                  <div className="w-10 h-3 rounded-full bg-[#FAF7ED] border border-[#17251C] mx-auto mb-4" />

                  {/* Header Row */}
                  <div className="flex items-center justify-between border-b border-[#F6F0D8]/15 pb-3 mb-5">
                    <div className="flex flex-col leading-none">
                      <span className="font-display text-lg font-black text-[#F5DD3B]">HH</span>
                      <span className="font-display text-lg font-black text-[#F5DD3B]">GOA</span>
                      <span className="font-mono text-[8px] font-bold text-[#F6F0D8]/50 mt-0.5">2026</span>
                    </div>

                    {/* Gold Circular Stamp */}
                    <div className="w-14 h-14 rounded-full border-2 border-dashed border-[#F5DD3B] bg-[#163D28]/95 text-center flex items-center justify-center p-1 rotate-[-10deg]">
                      <div className="font-mono text-[6px] font-extrabold text-[#F5DD3B] uppercase leading-tight">
                        BUILDER<br />
                        <span className="font-serif text-[10px] font-black italic text-[#F6F0D8]">GOA</span><br />
                        2026
                      </div>
                    </div>
                  </div>

                  {/* Portrait Photo */}
                  <div className="relative aspect-square max-w-[280px] mx-auto rounded-lg border-2 border-[#F6F0D8]/30 overflow-hidden bg-[#0F2E1D] mb-5">
                    <Image
                      src={photoUrl}
                      alt={`${name} Builder ID`}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Name & Info */}
                  <div className="text-center space-y-2 mb-4">
                    <h2 className="font-display font-black text-2xl md:text-3xl text-[#F5DD3B] uppercase tracking-tight leading-none">
                      {name}
                    </h2>
                    <div className="font-mono text-xs font-bold text-[#F6F0D8] uppercase tracking-wider flex items-center justify-center gap-1.5">
                      <span className="text-[#F6F0D8]/50">BUILDER</span>
                      <span>•</span>
                      <span className="text-[#F5DD3B]">⚡ {builderClass}</span>
                    </div>
                    <p className="font-mono text-xs text-[#F6F0D8]/70 uppercase">{stack}</p>
                  </div>

                  {/* Card Footer */}
                  <div className="border-t border-[#F6F0D8]/15 pt-3 flex items-center justify-between font-mono text-[10px] text-[#F6F0D8]/50 uppercase tracking-widest">
                    <span>HH GOA 2026 · BUILDER</span>
                    <span className="font-bold text-[#F5DD3B]">{builderId}</span>
                  </div>

                  {/* Barcode */}
                  <div className="flex justify-center gap-0.5 h-5 mt-3">
                    <div className="w-0.5 h-full bg-[#F6F0D8]/50" />
                    <div className="w-1 h-full bg-[#F6F0D8]/50" />
                    <div className="w-0.5 h-full bg-[#F6F0D8]/50" />
                    <div className="w-1.5 h-full bg-[#F6F0D8]/50" />
                    <div className="w-0.5 h-full bg-[#F6F0D8]/50" />
                    <div className="w-1 h-full bg-[#F6F0D8]/50" />
                    <div className="w-2 h-full bg-[#F6F0D8]/50" />
                  </div>
                </div>
              </motion.div>

              {/* ── RIGHT COLUMN: PROFILE INFO + ACTIONS ── */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.15 }}
                className="flex flex-col justify-between h-full"
              >
                {/* Profile Label & Headline */}
                <div>
                  <h1 className="font-display font-black leading-[0.88] tracking-[-0.03em] uppercase mb-4 text-3xl sm:text-4xl lg:text-5xl text-[#17251C]">
                    <span className="text-[#E62E78] inline-block -rotate-12 mr-1">*</span>
                    YOUR BUILDER ID IS <span className="text-[#D4BE1F] underline decoration-[#E62E78] decoration-4 underline-offset-4">LIVE.</span>
                  </h1>

                  <div className="w-10 h-0.5 bg-[#E62E78] mb-4" />

                  {/* Builder Details Block */}
                  <div className="space-y-2 mb-6">
                    <h2 className="font-display font-black text-3xl md:text-4xl text-[#17251C] uppercase tracking-tight leading-none">
                      {name}
                    </h2>
                    <div className="font-mono text-sm font-bold text-[#1E5B3A] uppercase tracking-wider flex items-center gap-1.5">
                      ⚡ {builderClass}
                    </div>
                    <p className="font-mono text-xs text-[#17251C]/70 uppercase">
                      {stack}
                    </p>
                    <p className="font-mono text-xs text-[#17251C]/50 uppercase mt-1">
                      HH GOA 2026 · BUILDER
                    </p>
                  </div>

                  {/* "Built for Goa" Dossier Info Card */}
                  <div className="bg-[#FAF7ED] border-2 border-[#17251C] p-5 rounded-sm shadow-[4px_4px_0px_rgba(23,37,28,0.15)] mb-6">
                    <div className="grid grid-cols-1 sm:grid-cols-[1fr_1fr] gap-5">
                      {/* Left: Statement */}
                      <div>
                        <h3 className="font-display font-black text-lg text-[#17251C] uppercase mb-1">
                          BUILT FOR GOA.
                        </h3>
                        <p className="font-mono text-[10px] text-[#17251C]/60 leading-relaxed">
                          Building something interesting?
                          <br />
                          Bring it to the House.
                        </p>
                      </div>

                      {/* Right: Metadata Table */}
                      <div className="space-y-2.5">
                        <div className="flex items-center justify-between border-b border-[#17251C]/10 pb-1.5 font-mono text-[10px]">
                          <span className="flex items-center gap-1.5 text-[#17251C]/60 font-bold uppercase tracking-wider">
                            <span>🎫</span> BUILDER ID
                          </span>
                          <span className="font-bold text-[#17251C]">{builderId}</span>
                        </div>
                        <div className="flex items-center justify-between border-b border-[#17251C]/10 pb-1.5 font-mono text-[10px]">
                          <span className="flex items-center gap-1.5 text-[#17251C]/60 font-bold uppercase tracking-wider">
                            <span>⭐</span> CLASS
                          </span>
                          <span className="font-bold text-[#17251C]">{builderClass}</span>
                        </div>
                        <div className="flex items-center justify-between font-mono text-[10px]">
                          <span className="flex items-center gap-1.5 text-[#17251C]/60 font-bold uppercase tracking-wider">
                            <span>&lt;/&gt;</span> STACK
                          </span>
                          <span className="font-bold text-[#17251C] text-right max-w-[160px] truncate">{stack}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* ── Action Buttons ── */}
                <div>
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    {/* Download PNG */}
                    <button
                      onClick={() => handleDownload('png')}
                      disabled={downloadingFormat === 'png'}
                      className="px-5 py-3 bg-[#F5DD3B] text-[#17251C] font-mono text-xs font-extrabold uppercase tracking-wider border-2 border-[#17251C] shadow-[3px_3px_0px_#17251C] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[5px_5px_0px_#17251C] transition-all flex items-center gap-2 cursor-pointer"
                    >
                      <span>📥</span> {downloadingFormat === 'png' ? 'EXPORTING PNG...' : 'DOWNLOAD PNG'}
                    </button>

                    {/* Download JPG */}
                    <button
                      onClick={() => handleDownload('jpg')}
                      disabled={downloadingFormat === 'jpg'}
                      className="px-5 py-3 bg-[#F5DD3B] text-[#17251C] font-mono text-xs font-extrabold uppercase tracking-wider border-2 border-[#17251C] shadow-[3px_3px_0px_#17251C] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[5px_5px_0px_#17251C] transition-all flex items-center gap-2 cursor-pointer"
                    >
                      <span>🖼️</span> {downloadingFormat === 'jpg' ? 'EXPORTING JPG...' : 'DOWNLOAD JPG'}
                    </button>

                    {/* Share Your ID */}
                    <button
                      onClick={handleShareToX}
                      className="px-5 py-3 bg-[#163D28] text-[#F6F0D8] font-mono text-xs font-bold uppercase tracking-wider border-2 border-[#17251C] shadow-[3px_3px_0px_#17251C] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[5px_5px_0px_#17251C] transition-all flex items-center gap-2 cursor-pointer"
                    >
                      <span>📤</span> SHARE YOUR ID →
                    </button>

                    {/* Build Your Own */}
                    <Link
                      href="/create"
                      className="px-5 py-3 bg-transparent text-[#17251C] font-mono text-xs font-bold uppercase tracking-wider border-2 border-[#17251C]/40 hover:border-[#17251C] transition-all flex items-center gap-2 no-underline"
                    >
                      BUILD YOUR OWN →
                    </Link>
                  </div>

                  {/* Public Link */}
                  <div className="flex items-center gap-2 font-mono text-[10px] text-[#17251C]/50 uppercase tracking-wider">
                    <span>🔗</span>
                    <span className="font-bold">PUBLIC LINK</span>
                    <span className="text-[#17251C]/30">|</span>
                    <button
                      onClick={handleCopyLink}
                      className="text-[#E62E78] font-bold hover:underline cursor-pointer"
                    >
                      {copiedLink ? 'COPIED! ✓' : `hhgoa.com/builder/${builderId.toLowerCase()}`}
                    </button>
                  </div>
                </div>
              </motion.div>

            </div>

            {/* ─── Community / Emotional Reinforcement Section ─── */}
            <div className="mt-10 pt-6 border-t border-[#17251C]/15 text-center">
              <p className="font-display font-black text-xl md:text-2xl text-[#17251C] uppercase tracking-tight mb-2">
                YOU&apos;RE NOT JUST VISITING THE HOUSE.
              </p>
              <p className="font-display font-black text-xl md:text-2xl text-[#D4BE1F] uppercase tracking-tight">
                YOU&apos;RE PART OF IT.
              </p>
            </div>

            {/* ─── CTA Section: GOT YOUR BUILDER ID YET? ─── */}
            <div className="mt-8 bg-[#163D28] text-[#F6F0D8] border-2 border-[#17251C] rounded p-6 md:p-8 text-center shadow-[4px_4px_0px_#17251C]">
              <h3 className="font-display font-black text-2xl md:text-3xl text-[#F5DD3B] uppercase tracking-tight mb-2">
                GOT YOUR BUILDER ID YET?
              </h3>
              <p className="font-mono text-xs text-[#F6F0D8]/70 mb-5">
                Create your own Hacker House Goa 2026 identity.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <Link
                  href="/create"
                  className="px-8 py-3.5 bg-[#F5DD3B] text-[#17251C] font-mono text-xs font-bold uppercase tracking-wider border-2 border-[#17251C] shadow-[4px_4px_0px_#17251C] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[6px_6px_0px_#17251C] transition-all no-underline"
                >
                  BUILD YOUR OWN →
                </Link>
                <a
                  href={CHECK_HYPE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3.5 bg-transparent text-[#F6F0D8] font-mono text-xs font-bold uppercase tracking-wider border-2 border-[#F6F0D8]/40 hover:border-[#F5DD3B] hover:text-[#F5DD3B] transition-all no-underline"
                >
                  CHECK THE HYPE →
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ─── Decorative Ribbon Strip ─── */}
      <div
        className="w-full h-[22px] bg-repeat-x"
        style={{
          backgroundImage: STRIP_PATTERN,
          backgroundSize: '60px 22px',
        }}
        aria-hidden="true"
      />
    </div>
  );
}
