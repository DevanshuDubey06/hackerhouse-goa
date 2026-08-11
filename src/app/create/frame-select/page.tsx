'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

/* ================================================================
   FRAME FORMATS LIST
   ================================================================ */

const FRAME_FORMATS = [
  {
    id: 'portrait',
    number: '01',
    title: 'PORTRAIT',
    subtitle: 'YOUR BUILDER ID',
    description: 'Best for profile posts.',
  },
  {
    id: 'landscape',
    number: '02',
    title: 'LANDSCAPE',
    subtitle: 'SHOW YOUR BUILD',
    description: 'Perfect for X / social posts.',
  },
  {
    id: 'circle',
    number: '03',
    title: 'CIRCLE PFP',
    subtitle: 'YOUR NEW AVATAR',
    description: 'Made for profile pictures.',
  },
  {
    id: 'arch',
    number: '04',
    title: 'ARCH BADGE',
    subtitle: 'OFFICIAL BUILDER ENERGY',
    description: 'Official builder credential.',
  },
  {
    id: 'slim',
    number: '05',
    title: 'SLIM BADGE',
    subtitle: 'SMALL FORMAT. BIG FLEX.',
    description: 'Compact builder flex.',
  },
  {
    id: 'ornate',
    number: '06',
    title: 'ORNATE BADGE',
    subtitle: 'FOR THE BUILDER WHO DOES EXTRA.',
    description: 'Maximum builder energy.',
  },
];

/* ================================================================
   DECORATIVE STRIP
   ================================================================ */

const STRIP_PATTERN = `url("data:image/svg+xml,%3Csvg width='60' height='22' viewBox='0 0 60 22' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='60' height='22' fill='%23C41E62'/%3E%3Crect width='60' height='1' fill='%2317251C'/%3E%3Crect y='21' width='60' height='1' fill='%2317251C'/%3E%3Cpath d='M30 3L38 11L30 19L22 11Z' fill='%231E5B3A' stroke='%23F5DD3B' stroke-width='0.6'/%3E%3Ccircle cx='30' cy='11' r='2.5' fill='%23F5DD3B'/%3E%3Ccircle cx='8' cy='11' r='3.5' fill='%231E5B3A'/%3E%3Ccircle cx='8' cy='11' r='1.5' fill='%23F5DD3B'/%3E%3Ccircle cx='52' cy='11' r='3.5' fill='%231E5B3A'/%3E%3Ccircle cx='52' cy='11' r='1.5' fill='%23F5DD3B'/%3E%3Cellipse cx='19' cy='6' rx='3.5' ry='1.5' fill='%231E5B3A' transform='rotate(25 19 6)'/%3E%3Cellipse cx='41' cy='6' rx='3.5' ry='1.5' fill='%231E5B3A' transform='rotate(-25 41 6)'/%3E%3Cellipse cx='19' cy='16' rx='3.5' ry='1.5' fill='%231E5B3A' transform='rotate(-25 19 16)'/%3E%3Cellipse cx='41' cy='16' rx='3.5' ry='1.5' fill='%231E5B3A' transform='rotate(25 41 16)'/%3E%3Ccircle cx='30' cy='3' r='1' fill='%23F5DD3B' opacity='0.6'/%3E%3Ccircle cx='30' cy='19' r='1' fill='%23F5DD3B' opacity='0.6'/%3E%3C/svg%3E")`;

/* ================================================================
   PAGE 06 — STEP 04: FRAME SELECTION
   ================================================================ */

export default function FrameSelectPage() {
  const router = useRouter();

  // Selected format state
  const [selectedFormat, setSelectedFormat] = useState<string>('portrait');

  // User identity data from previous steps
  const [name, setName] = useState('PRIYANSHU KHARE');
  const [stack, setStack] = useState('AI/ML // PYTHON // NEXT.JS');
  const [builderClass, setBuilderClass] = useState('NEURAL NOMAD');
  const [photoUrl, setPhotoUrl] = useState('/builder-solo.png');

  // Validation / missing fields state
  const [validationError, setValidationError] = useState<string | null>(null);

  // Load identity data on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedFormat = localStorage.getItem('hh_builder_format');
      if (savedFormat) setSelectedFormat(savedFormat);

      const savedName = localStorage.getItem('hh_builder_name');
      if (savedName) setName(savedName);

      const savedStack = localStorage.getItem('hh_builder_stack');
      if (savedStack) setStack(savedStack);

      const savedClass = localStorage.getItem('hh_builder_class');
      if (savedClass) setBuilderClass(savedClass);

      const savedPhoto = localStorage.getItem('hh_builder_photo');
      if (savedPhoto) setPhotoUrl(savedPhoto);
    }
  }, []);

  // Pre-generation check & navigation to Step 05: Generate
  const handleProceedGenerate = () => {
    if (!name.trim()) {
      setValidationError('Please enter your name in Step 02 Details before generating.');
      return;
    }

    if (typeof window !== 'undefined') {
      localStorage.setItem('hh_builder_format', selectedFormat);
    }

    router.push('/create/generate');
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

                {/* Step 04: FRAME (ACTIVE) */}
                <div className="flex items-center gap-1.5 text-[#17251C]">
                  <span className="w-6 h-6 rounded-full bg-[#F5DD3B] border border-[#17251C] flex items-center justify-center text-[10px] font-black">
                    04
                  </span>
                  <span className="border-b-2 border-[#F5DD3B] pb-0.5">FRAME</span>
                </div>

                <span className="text-[#17251C]/30 hidden sm:inline">→</span>

                {/* Step 05: GENERATE */}
                <div className="hidden sm:flex items-center gap-1.5 text-[#17251C]/40">
                  <span className="w-6 h-6 rounded-full border border-[#17251C]/30 flex items-center justify-center text-[10px]">
                    05
                  </span>
                  <span>GENERATE</span>
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

            {/* ─── Title & Subtitle ─── */}
            <div className="relative mb-8">
              <h1 className="font-display font-black leading-[0.88] tracking-[-0.03em] uppercase mb-2 text-4xl sm:text-5xl md:text-6xl text-[#17251C]">
                <span className="text-[#E62E78] inline-block -rotate-12 mr-1">*</span>
                PICK YOUR <span className="text-[#D4BE1F]">FORMAT.</span>
              </h1>
              <p className="font-mono text-xs md:text-sm text-[#17251C]/75 leading-relaxed">
                One identity.
                <br />
                Six ways to ship it.
              </p>
            </div>

            {/* Validation Error Alert */}
            {validationError && (
              <div className="mb-6 p-3 bg-[#E62E78]/10 border-2 border-[#E62E78] text-[#E62E78] font-mono text-xs rounded font-bold">
                ⚠️ {validationError}
              </div>
            )}

            {/* ─── 6 FORMAT CARDS GALLERY ─── */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 items-stretch mb-10">

              {FRAME_FORMATS.map((fmt) => {
                const isSelected = selectedFormat === fmt.id;
                return (
                  <motion.div
                    key={fmt.id}
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.15 }}
                    onClick={() => {
                      setSelectedFormat(fmt.id);
                      setValidationError(null);
                    }}
                    className={`bg-[#163D28] text-[#F6F0D8] border-2 border-[#17251C] rounded-lg p-4 flex flex-col justify-between cursor-pointer transition-all duration-200 ${
                      isSelected
                        ? 'ring-4 ring-[#F5DD3B] shadow-[6px_6px_0px_#17251C]'
                        : 'shadow-[4px_4px_0px_#17251C] hover:shadow-[6px_6px_0px_#17251C]'
                    }`}
                  >
                    <div>
                      {/* Top Badge Number */}
                      <div className="flex items-center justify-center mb-2">
                        <span className="w-5 h-5 rounded-full border border-[#F5DD3B]/60 text-[#F5DD3B] font-mono text-[9px] font-extrabold flex items-center justify-center">
                          {fmt.number}
                        </span>
                      </div>

                      {/* Header */}
                      <h3 className="font-display font-black text-center text-sm text-[#F5DD3B] uppercase tracking-tight leading-tight">
                        {fmt.title}
                      </h3>
                      <div className="font-mono text-[8px] text-center font-bold text-[#F6F0D8]/60 uppercase tracking-widest mb-3">
                        {fmt.subtitle}
                      </div>

                      {/* Visual Preview Container */}
                      <div className="bg-[#0F2E1D] border border-[#F6F0D8]/20 rounded p-2 text-center mb-3 relative overflow-hidden flex flex-col items-center justify-center min-h-[140px]">

                        {/* Format 01: Portrait */}
                        {fmt.id === 'portrait' && (
                          <div className="w-full">
                            <div className="w-10 h-10 mx-auto rounded overflow-hidden border border-[#F5DD3B]/40 relative mb-1.5">
                              <Image src={photoUrl} alt="Preview" fill className="object-cover" />
                            </div>
                            <div className="font-display font-black text-[9px] text-[#F5DD3B] truncate">{name}</div>
                            <div className="font-mono text-[7px] text-[#F6F0D8]/60 truncate">{stack}</div>
                            <div className="font-mono text-[7px] text-[#F5DD3B] font-bold mt-1">⚡ {builderClass}</div>
                            <div className="font-mono text-[6px] text-[#F6F0D8]/40 mt-1">HH-26-0000</div>
                          </div>
                        )}

                        {/* Format 02: Landscape */}
                        {fmt.id === 'landscape' && (
                          <div className="w-full flex items-center gap-1.5 p-1">
                            <div className="w-10 h-10 rounded overflow-hidden border border-[#F5DD3B]/40 relative shrink-0">
                              <Image src={photoUrl} alt="Preview" fill className="object-cover" />
                            </div>
                            <div className="text-left overflow-hidden">
                              <div className="font-display font-black text-[8px] text-[#F5DD3B] truncate">{name}</div>
                              <div className="font-mono text-[6.5px] text-[#F6F0D8]/60 truncate">{stack}</div>
                              <div className="font-mono text-[6.5px] text-[#F5DD3B]">⚡ {builderClass}</div>
                            </div>
                          </div>
                        )}

                        {/* Format 03: Circle PFP */}
                        {fmt.id === 'circle' && (
                          <div className="relative">
                            <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[#F5DD3B] relative mx-auto">
                              <Image src={photoUrl} alt="Preview" fill className="object-cover" />
                            </div>
                            <div className="w-6 h-6 rounded-full border border-dashed border-[#F5DD3B] bg-[#163D28] text-[4.5px] font-mono text-[#F5DD3B] flex items-center justify-center text-center absolute -bottom-1 -right-1 rotate-[-8deg]">
                              GOA<br />2026
                            </div>
                          </div>
                        )}

                        {/* Format 04: Arch Badge */}
                        {fmt.id === 'arch' && (
                          <div className="w-full">
                            <div className="border border-[#F5DD3B]/60 rounded-t-full p-1 border-b-0 text-[6px] font-mono text-[#F5DD3B] font-bold">
                              HACKER HOUSE GOA
                            </div>
                            <div className="w-10 h-10 mx-auto rounded overflow-hidden border border-[#F6F0D8]/30 relative my-1">
                              <Image src={photoUrl} alt="Preview" fill className="object-cover" />
                            </div>
                            <div className="font-display font-black text-[8px] text-[#F5DD3B] truncate">{name}</div>
                            <div className="font-mono text-[6px] text-[#F6F0D8]/50">HH-26-0000</div>
                          </div>
                        )}

                        {/* Format 05: Slim Badge */}
                        {fmt.id === 'slim' && (
                          <div className="w-full flex flex-col items-center">
                            <div className="w-8 h-10 rounded overflow-hidden border border-[#F5DD3B]/40 relative mb-1">
                              <Image src={photoUrl} alt="Preview" fill className="object-cover" />
                            </div>
                            <div className="font-display font-black text-[7.5px] text-[#F5DD3B] truncate w-full">{name}</div>
                            <div className="font-mono text-[6px] text-[#F6F0D8]/60 truncate w-full">⚡ {builderClass}</div>
                            <div className="font-mono text-[5.5px] text-[#F6F0D8]/40 mt-0.5">HH-26-0000</div>
                          </div>
                        )}

                        {/* Format 06: Ornate Badge */}
                        {fmt.id === 'ornate' && (
                          <div className="w-full border border-dashed border-[#F5DD3B]/50 p-1 rounded">
                            <div className="font-serif text-[6px] italic text-[#E62E78] font-bold">GOA 2026</div>
                            <div className="w-9 h-9 mx-auto rounded-full overflow-hidden border border-[#F5DD3B] relative my-1">
                              <Image src={photoUrl} alt="Preview" fill className="object-cover" />
                            </div>
                            <div className="font-display font-black text-[8px] text-[#F5DD3B] truncate">{name}</div>
                          </div>
                        )}

                      </div>
                    </div>

                    {/* Description & Selection state indicator */}
                    <div className="mt-2 pt-2 border-t border-[#F6F0D8]/10 text-center">
                      <p className="font-mono text-[8.5px] text-[#F6F0D8]/60 leading-tight mb-2">
                        {fmt.description}
                      </p>

                      <div className={`py-1 rounded font-mono text-[9px] font-bold uppercase transition-colors ${
                        isSelected
                          ? 'bg-[#F5DD3B] text-[#17251C]'
                          : 'bg-[#0F2E1D] text-[#F6F0D8]/40'
                      }`}>
                        {isSelected ? 'SELECTED ✓' : 'SELECT'}
                      </div>
                    </div>
                  </motion.div>
                );
              })}

            </div>

            {/* ─── Bottom Navigation Button ─── */}
            <div className="mt-8 pt-6 border-t border-[#17251C]/15 flex items-center justify-between flex-wrap gap-4">
              <button
                onClick={() => router.push('/create/frame')}
                className="font-mono text-xs font-bold uppercase text-[#17251C]/60 hover:text-[#17251C] transition-colors flex items-center gap-1"
              >
                ← BACK TO PERSONALIZE
              </button>

              <button
                onClick={handleProceedGenerate}
                className="px-8 py-3.5 bg-[#F5DD3B] text-[#17251C] font-mono text-xs md:text-sm font-bold uppercase tracking-wider border-2 border-[#17251C] shadow-[4px_4px_0px_#17251C] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[6px_6px_0px_#17251C] active:translate-x-[1px] active:translate-y-[1px] transition-all"
              >
                GENERATE MY ID →
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
