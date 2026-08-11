'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { EVENT, OFFICIAL_APPLY_URL, SHARE_TEXT } from '@/lib/config';
import { renderIDCard, exportIDCard, getCurrentBuilderOptions } from '@/lib/canvas-renderer';

/* ================================================================
   DECORATIVE STRIP
   ================================================================ */

const STRIP_PATTERN = `url("data:image/svg+xml,%3Csvg width='60' height='22' viewBox='0 0 60 22' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='60' height='22' fill='%23C41E62'/%3E%3Crect width='60' height='1' fill='%2317251C'/%3E%3Crect y='21' width='60' height='1' fill='%2317251C'/%3E%3Cpath d='M30 3L38 11L30 19L22 11Z' fill='%231E5B3A' stroke='%23F5DD3B' stroke-width='0.6'/%3E%3Ccircle cx='30' cy='11' r='2.5' fill='%23F5DD3B'/%3E%3Ccircle cx='8' cy='11' r='3.5' fill='%231E5B3A'/%3E%3Ccircle cx='8' cy='11' r='1.5' fill='%23F5DD3B'/%3E%3Ccircle cx='52' cy='11' r='3.5' fill='%231E5B3A'/%3E%3Ccircle cx='52' cy='11' r='1.5' fill='%23F5DD3B'/%3E%3Cellipse cx='19' cy='6' rx='3.5' ry='1.5' fill='%231E5B3A' transform='rotate(25 19 6)'/%3E%3Cellipse cx='41' cy='6' rx='3.5' ry='1.5' fill='%231E5B3A' transform='rotate(-25 41 6)'/%3E%3Cellipse cx='19' cy='16' rx='3.5' ry='1.5' fill='%231E5B3A' transform='rotate(-25 19 16)'/%3E%3Cellipse cx='41' cy='16' rx='3.5' ry='1.5' fill='%231E5B3A' transform='rotate(25 41 16)'/%3E%3Ccircle cx='30' cy='3' r='1' fill='%23F5DD3B' opacity='0.6'/%3E%3Ccircle cx='30' cy='19' r='1' fill='%23F5DD3B' opacity='0.6'/%3E%3C/svg%3E")`;

/* ================================================================
   PAGE 07 — STEP 05: GENERATE + REVEAL
   ================================================================ */

export default function GenerateStepPage() {
  const router = useRouter();

  // Builder Identity Data
  const [name, setName] = useState('PRIYANSHU KHARE');
  const [stack, setStack] = useState('AI/ML // PYTHON // NEXT.JS');
  const [builderClass, setBuilderClass] = useState('NEURAL NOMAD');
  const [photoUrl, setPhotoUrl] = useState('/builder-solo.png');
  const [builderId, setBuilderId] = useState('HH-26-0241');
  const [vibe, setVibe] = useState('forest-wave');
  const [frame, setFrame] = useState('portrait');
  const [previewDataUrl, setPreviewDataUrl] = useState<string>('');

  // Animation Sequence States
  const [step1Done, setStep1Done] = useState(false);
  const [step2Done, setStep2Done] = useState(false);
  const [step3Done, setStep3Done] = useState(false);
  const [step4Done, setStep4Done] = useState(false);

  // Interaction feedback
  const [copiedLink, setCopiedLink] = useState(false);
  const [downloadingFormat, setDownloadingFormat] = useState<string | null>(null);

  // Load saved data & run generation sequence on mount
  useEffect(() => {
    // Synchronously grab latest config from storage to ensure zero stale state
    const opts = getCurrentBuilderOptions();
    setName(opts.name);
    setStack(opts.stack);
    setBuilderClass(opts.builderClass);
    if (opts.photo) setPhotoUrl(opts.photo);
    setBuilderId(opts.builderId);
    if (opts.vibe) setVibe(opts.vibe);
    if (opts.frame) setFrame(opts.frame);

    // Render immediately using exact current options object
    renderIDCard(opts).then((url) => {
      setPreviewDataUrl(url);
    });

    // Fast generation sequence
    const t1 = setTimeout(() => setStep1Done(true), 300);
    const t2 = setTimeout(() => setStep2Done(true), 600);
    const t3 = setTimeout(() => setStep3Done(true), 900);
    const t4 = setTimeout(() => setStep4Done(true), 1200);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, []);

  // Update live preview image when state changes
  useEffect(() => {
    const opts = getCurrentBuilderOptions();
    renderIDCard(opts).then((url) => {
      setPreviewDataUrl(url);
    });
  }, [photoUrl, name, stack, builderClass, builderId, vibe, frame]);

  // Download Action (Export PNG or JPG directly with selected Vibe and Frame format)
  const handleDownload = async (format: 'png' | 'jpg') => {
    try {
      setDownloadingFormat(format);
      const opts = getCurrentBuilderOptions();
      await exportIDCard(opts, format);
    } catch (err) {
      console.error('[Download Generate Page Error]:', err);
    } finally {
      setDownloadingFormat(null);
    }
  };

  // Share to X Handler
  const handleShareToX = () => {
    const text = SHARE_TEXT(builderClass, builderId);
    const intentUrl = `https://x.com/intent/tweet?text=${encodeURIComponent(text)}`;
    window.open(intentUrl, '_blank', 'noopener,noreferrer');
  };

  // Copy Public Link Handler
  const handleCopyPublicLink = () => {
    const publicUrl = `${window.location.origin}/id/${builderId}`;
    navigator.clipboard.writeText(publicUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  // Build Another Handler
  const handleBuildAnother = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('hh_builder_id');
      localStorage.removeItem('hh_builder_name');
    }
    router.push('/create');
  };

  return (
    <div className="min-h-screen bg-[#1E5B3A] text-[#F6F0D8] grain-overlay">
      {/* ─── Main Container ─── */}
      <section className="relative pt-6 md:pt-8 pb-16 overflow-hidden">
        <div className="max-container section-padding relative z-10">

          {/* Aged Paper Poster Container matching Reference Image */}
          <div className="relative bg-[#FAF7ED] text-[#17251C] border-2 border-[#17251C] shadow-[8px_8px_0px_rgba(23,37,28,0.3)] p-6 md:p-10 lg:p-12 rounded-sm overflow-hidden">

            {/* ─── Generator Progress Bar (Top of Container) ─── */}
            <div className="flex items-center justify-between border-b-2 border-[#17251C]/15 pb-4 mb-8">
              <div className="flex items-center gap-2 md:gap-4 font-mono text-[10px] md:text-xs font-bold uppercase tracking-wider">
                {/* Step 01: CHOOSE (COMPLETED) */}
                <div
                  onClick={() => router.push('/create')}
                  className="flex items-center gap-1.5 text-[#17251C]/60 cursor-pointer hover:text-[#17251C]"
                >
                  <span className="w-6 h-6 rounded-full border border-[#17251C]/40 flex items-center justify-center text-[10px] font-bold">
                    ✓
                  </span>
                  <span>CHOOSE</span>
                </div>

                <span className="text-[#17251C]/30">→</span>

                {/* Step 02: DETAILS (COMPLETED) */}
                <div
                  onClick={() => router.push('/create/individual')}
                  className="flex items-center gap-1.5 text-[#17251C]/60 cursor-pointer hover:text-[#17251C]"
                >
                  <span className="w-6 h-6 rounded-full border border-[#17251C]/40 flex items-center justify-center text-[10px] font-bold">
                    ✓
                  </span>
                  <span>DETAILS</span>
                </div>

                <span className="text-[#17251C]/30 font-light">→</span>

                {/* Step 03: PERSONALIZE (COMPLETED) */}
                <div
                  onClick={() => router.push('/create/frame')}
                  className="flex items-center gap-1.5 text-[#17251C]/60 cursor-pointer hover:text-[#17251C]"
                >
                  <span className="w-6 h-6 rounded-full border border-[#17251C]/40 flex items-center justify-center text-[10px] font-bold">
                    ✓
                  </span>
                  <span>PERSONALIZE</span>
                </div>

                <span className="text-[#17251C]/30">→</span>

                {/* Step 04: FRAME (COMPLETED) */}
                <div
                  onClick={() => router.push('/create/frame-select')}
                  className="flex items-center gap-1.5 text-[#17251C]/60 cursor-pointer hover:text-[#17251C]"
                >
                  <span className="w-6 h-6 rounded-full border border-[#17251C]/40 flex items-center justify-center text-[10px] font-bold">
                    ✓
                  </span>
                  <span>FRAME</span>
                </div>

                <span className="text-[#17251C]/30">→</span>

                {/* Step 05: GENERATE (ACTIVE) */}
                <div className="flex items-center gap-1.5 text-[#17251C]">
                  <span className="w-6 h-6 rounded-full bg-[#F5DD3B] border border-[#17251C] flex items-center justify-center text-[10px] font-black">
                    05
                  </span>
                  <span className="border-b-2 border-[#F5DD3B] pb-0.5">GENERATE</span>
                </div>
              </div>

              {/* Red Cancellation Stamp in Top Right */}
              <div className="w-14 h-14 rounded-full border-2 border-dashed border-[#E62E78] flex items-center justify-center text-center p-1 rotate-[-12deg] shrink-0 bg-[#FAF7ED] hidden sm:flex">
                <div className="font-mono text-[7px] font-bold text-[#E62E78] uppercase leading-tight">
                  WELCOME<br />
                  <span className="font-serif text-[9px] font-black italic text-[#17251C]">GOA</span><br />
                  2026
                </div>
              </div>
            </div>

            {/* ─── Split Grid Layout matching Reference Image ─── */}
            <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-8 lg:gap-12 items-start mb-8">

              {/* ── LEFT COLUMN: TITLE & PROCESSING SEQUENCE ── */}
              <div>
                {/* Main Welcome Headline */}
                <h1 className="font-display font-black leading-[0.88] tracking-[-0.03em] uppercase mb-4 text-3xl sm:text-4xl lg:text-5xl text-[#17251C]">
                  <span className="text-[#E62E78] inline-block -rotate-12 mr-1">*</span>
                  WELCOME
                  <br />
                  <span className="text-[#D4BE1F]">TO THE HOUSE,</span>
                  <br />
                  {name.split(' ')[0]}!
                </h1>

                <p className="font-mono text-xs text-[#17251C]/75 leading-relaxed mb-6">
                  Your builder identity is ready.
                  <br />
                  Share it. Wear it. Live it.
                </p>

                {/* Processing Sequence List matching Reference Image */}
                <div className="space-y-3 font-mono text-xs border-t border-b border-[#17251C]/15 py-4 mb-6">

                  {/* Item 1 */}
                  <div className={`flex items-center justify-between transition-opacity ${step1Done ? 'opacity-100' : 'opacity-40'}`}>
                    <span className="flex items-center gap-2">
                      <span className="text-[#17251C]/60 font-bold">&gt;_</span>
                      <span className="font-semibold text-[#17251C]">COMPILING YOUR IDENTITY...</span>
                    </span>
                    <span className="w-4 h-4 rounded-full bg-[#17251C] text-[#FAF7ED] text-[9px] flex items-center justify-center font-bold">
                      {step1Done ? '✓' : '•'}
                    </span>
                  </div>

                  {/* Item 2 */}
                  <div className={`flex items-center justify-between transition-opacity ${step2Done ? 'opacity-100' : 'opacity-40'}`}>
                    <span className="flex items-center gap-2">
                      <span>🧠</span>
                      <span className="font-semibold text-[#17251C]">CLASSIFYING BUILDER...</span>
                    </span>
                    <span className="w-4 h-4 rounded-full bg-[#17251C] text-[#FAF7ED] text-[9px] flex items-center justify-center font-bold">
                      {step2Done ? '✓' : '•'}
                    </span>
                  </div>

                  {/* Item 3 */}
                  <div className={`flex items-center justify-between transition-opacity ${step3Done ? 'opacity-100' : 'opacity-40'}`}>
                    <span className="flex items-center gap-2">
                      <span>📦</span>
                      <span className="font-semibold text-[#17251C]">PACKING YOUR GOA ENERGY...</span>
                    </span>
                    <span className="w-4 h-4 rounded-full bg-[#17251C] text-[#FAF7ED] text-[9px] flex items-center justify-center font-bold">
                      {step3Done ? '✓' : '•'}
                    </span>
                  </div>

                  {/* Item 4 */}
                  <div className={`flex items-center justify-between transition-opacity ${step4Done ? 'opacity-100' : 'opacity-40'}`}>
                    <span className="flex items-center gap-2 text-[#E62E78]">
                      <span>🎉</span>
                      <span className="font-bold">YOUR ID IS READY.</span>
                    </span>
                    <span className="w-4 h-4 rounded-full bg-[#E62E78] text-[#FAF7ED] text-[9px] flex items-center justify-center font-bold">
                      {step4Done ? '✓' : '•'}
                    </span>
                  </div>

                </div>
              </div>

              {/* ── RIGHT COLUMN: DOMINANT BUILDER ID CREDENTIAL ARTIFACT ── */}
              <div className="relative flex flex-col items-center">

                {/* Hanging Lanyard Strings */}
                <div className="w-full flex justify-center mb-[-8px] relative z-20">
                  <div className="flex gap-6">
                    <div className="w-1 h-14 bg-gradient-to-b from-[#17251C] via-[#F5DD3B]/70 to-[#17251C] rounded-full shadow-sm" />
                    <div className="w-1 h-14 bg-gradient-to-b from-[#17251C] via-[#F5DD3B]/70 to-[#17251C] rounded-full shadow-sm" />
                  </div>
                </div>

                {/* The Revealed Credential Canvas Image matching chosen Vibe & Frame */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="w-full flex justify-center items-center"
                >
                  {previewDataUrl ? (
                    <img
                      src={previewDataUrl}
                      alt="Generated Builder ID"
                      className="max-w-full h-auto max-h-[620px] object-contain rounded-xl border-2 border-[#17251C] shadow-[8px_8px_0px_#17251C]"
                    />
                  ) : (
                    <div className="w-full h-[450px] bg-[#163D28] rounded-xl border-2 border-[#17251C] flex items-center justify-center font-mono text-xs text-[#F5DD3B]">
                      GENERATING BUILDER ID...
                    </div>
                  )}
                </motion.div>

              </div>

            </div>

            {/* ─── Microcopy under Artifact ─── */}
            <div className="text-center my-6">
              <div className="font-display text-lg md:text-xl font-black uppercase text-[#17251C] tracking-tight">
                <span className="text-[#E62E78] mr-2">*</span>
                THIS ISN&apos;T JUST A FRAME.
                <span className="text-[#E62E78] ml-2">*</span>
              </div>
              <p className="font-mono text-xs text-[#17251C]/60 mt-1">
                It&apos;s your builder identity.
              </p>
            </div>

            {/* ─── Action Buttons Row ─── */}
            <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4 mb-4">

              {/* Download PNG Button */}
              <button
                onClick={() => handleDownload('png')}
                disabled={downloadingFormat === 'png'}
                className="px-6 py-3.5 bg-[#F5DD3B] text-[#17251C] font-mono text-xs md:text-sm font-black uppercase tracking-wider border-2 border-[#17251C] shadow-[4px_4px_0px_#17251C] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[6px_6px_0px_#17251C] active:translate-x-[1px] active:translate-y-[1px] transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>📥</span> {downloadingFormat === 'png' ? 'EXPORTING PNG...' : 'DOWNLOAD PNG'}
              </button>

              {/* Download JPG Button */}
              <button
                onClick={() => handleDownload('jpg')}
                disabled={downloadingFormat === 'jpg'}
                className="px-6 py-3.5 bg-[#F5DD3B] text-[#17251C] font-mono text-xs md:text-sm font-black uppercase tracking-wider border-2 border-[#17251C] shadow-[4px_4px_0px_#17251C] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[6px_6px_0px_#17251C] active:translate-x-[1px] active:translate-y-[1px] transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>🖼️</span> {downloadingFormat === 'jpg' ? 'EXPORTING JPG...' : 'DOWNLOAD JPG'}
              </button>

              {/* Share to X */}
              <button
                onClick={handleShareToX}
                className="px-6 py-3.5 bg-[#163D28] text-[#F6F0D8] font-mono text-xs md:text-sm font-bold uppercase tracking-wider border-2 border-[#17251C] shadow-[4px_4px_0px_#17251C] hover:bg-[#1F5538] transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>𝕏</span> SHARE TO X
              </button>

              {/* Copy Public Link */}
              <button
                onClick={handleCopyPublicLink}
                className="px-6 py-3.5 bg-[#163D28] text-[#F6F0D8] font-mono text-xs md:text-sm font-bold uppercase tracking-wider border-2 border-[#17251C] shadow-[4px_4px_0px_#17251C] hover:bg-[#1F5538] transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>🔗</span> {copiedLink ? 'COPIED LINK! ✓' : 'COPY PUBLIC LINK'}
              </button>

            </div>

            {/* Secondary Action: Build Another */}
            <div className="text-center mt-3">
              <button
                onClick={handleBuildAnother}
                className="font-mono text-xs font-bold uppercase text-[#E62E78] hover:text-[#C41E62] transition-colors inline-flex items-center gap-1 tracking-wider cursor-pointer"
              >
                BUILD ANOTHER →
              </button>
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
