import React, { useState } from 'react';
import { BookOpen, Users, Sprout, ArrowRight, X } from 'lucide-react';

export const ContributeSection: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLearnMore = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById('provenance');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      el.focus();
    }
  };

  return (
    <section
      id="contribute"
      aria-label="Contribute to ARCHIVE"
      className="relative w-full bg-[#FAF8F4] text-[#171715] py-20 md:py-28 overflow-hidden select-none"
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          {/* =========================================================================
              LEFT COLUMN: Editorial Heading, Copy, CTAs & Value Propositions
              ========================================================================= */}
          <div className="lg:col-span-6 flex flex-col items-start pt-2">
            {/* Section Label */}
            <div className="flex items-center space-x-2.5 text-[11px] font-mono tracking-[0.24em] uppercase text-[#A4401F] font-semibold mb-4">
              <span className="w-6 h-[1.5px] bg-[#A4401F] inline-block" aria-hidden="true" />
              <span>05 — CONTRIBUTE</span>
            </div>

            {/* Display Headline */}
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-[68px] text-[#171715] leading-[0.94] tracking-tight">
              <span className="block">Some stories</span>
              <span className="block">deserve</span>
              <span className="block italic text-[#A4401F] font-normal my-1">
                to live forever.
              </span>
            </h2>

            {/* Supporting Copy */}
            <p className="font-sans text-[15px] sm:text-[16px] md:text-[16.5px] leading-[1.62] text-[#6B6B6B] mt-6 md:mt-8 max-w-[440px]">
              Nigeria’s creative history lives in people, places, ideas and everyday moments.
              By supporting this work, you help ensure these stories are documented, preserved,
              and accessible for generations to come.
            </p>

            {/* Two Horizontally Aligned CTA Buttons */}
            <div className="mt-8 md:mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
              {/* Primary CTA */}
              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center justify-center bg-[#A4401F] hover:bg-[#7F3018] text-[#FAF8F4] font-sans text-[13px] md:text-[13.5px] font-medium tracking-[0.06em] uppercase px-5 py-3 transition-colors duration-200 cursor-pointer shadow-xs focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A4401F]"
                style={{
                  height: '52px',
                  borderRadius: '0px',
                }}
              >
                <span>SUPPORT THE ARCHIVE</span>
                <span className="ml-2.5 text-base leading-none" aria-hidden="true">→</span>
              </button>

              {/* Secondary CTA */}
              <a
                href="#provenance"
                onClick={handleLearnMore}
                className="inline-flex items-center justify-center bg-[#FAF8F4] hover:bg-[#171715] hover:text-[#FAF8F4] text-[#171715] border border-[#171715] font-sans text-[13px] md:text-[13.5px] font-medium tracking-[0.06em] uppercase px-5 py-3 transition-colors duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#171715]"
                style={{
                  height: '52px',
                  borderRadius: '0px',
                }}
              >
                <span>LEARN MORE</span>
                <span className="ml-2.5 text-base leading-none" aria-hidden="true">→</span>
              </a>
            </div>

            {/* Three Value Propositions Separated by Thin Vertical Dividers */}
            <div className="mt-14 md:mt-18 pt-8 border-t border-[#E3DED5] grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-4 w-full">
              {/* 01 — Preserve */}
              <div className="flex flex-col items-start sm:pr-4 sm:border-r border-[#E3DED5]">
                <div className="flex items-center space-x-2 text-[#A4401F] mb-2.5">
                  <BookOpen className="w-4 h-4 stroke-[1.75]" />
                  <span className="font-mono text-xs font-semibold tracking-wider text-[#171715]">
                    Preserve
                  </span>
                </div>
                <p className="font-sans text-xs text-[#6B6B6B] leading-relaxed">
                  Help keep Nigeria's creative history alive and accessible.
                </p>
              </div>

              {/* 02 — Support */}
              <div className="flex flex-col items-start sm:px-4 sm:border-r border-[#E3DED5]">
                <div className="flex items-center space-x-2 text-[#A4401F] mb-2.5">
                  <Users className="w-4 h-4 stroke-[1.75]" />
                  <span className="font-mono text-xs font-semibold tracking-wider text-[#171715]">
                    Support
                  </span>
                </div>
                <p className="font-sans text-xs text-[#6B6B6B] leading-relaxed">
                  Enable research, documentation, and public access.
                </p>
              </div>

              {/* 03 — Build the Future */}
              <div className="flex flex-col items-start sm:pl-4">
                <div className="flex items-center space-x-2 text-[#A4401F] mb-2.5">
                  <Sprout className="w-4 h-4 stroke-[1.75]" />
                  <span className="font-mono text-xs font-semibold tracking-wider text-[#171715]">
                    Build the Future
                  </span>
                </div>
                <p className="font-sans text-xs text-[#6B6B6B] leading-relaxed">
                  Ensure these stories inspire and inform generations to come.
                </p>
              </div>
            </div>

            {/* Scroll Cue (Lower-left) */}
            <div className="mt-12 flex items-center space-x-3 text-[10.5px] font-mono tracking-[0.2em] uppercase text-[#6B6B6B]">
              <div className="flex flex-col items-center">
                <span className="w-2 h-2 rounded-full border border-[#171715] inline-block" />
                <span className="w-[1px] h-6 bg-[#171715] inline-block" />
              </div>
              <span>SCROLL TO CONTINUE</span>
            </div>
          </div>

          {/* =========================================================================
              RIGHT COLUMN: Layered Archival Collage
              ========================================================================= */}
          <div className="lg:col-span-6 relative flex items-center justify-center min-h-[520px] md:min-h-[580px] p-4 sm:p-8">
            {/* Background Parchment Layers */}
            <div
              className="absolute top-4 right-12 w-[320px] sm:w-[380px] h-[440px] sm:h-[480px] bg-[#E3DED5]/40 border border-[#E3DED5] -rotate-1 shadow-xs pointer-events-none"
              aria-hidden="true"
            />
            <div
              className="absolute top-10 left-8 w-[280px] sm:w-[340px] h-[380px] sm:h-[420px] bg-[#D5D0C1]/30 border border-[#D5D0C1]/80 rotate-2 pointer-events-none"
              aria-hidden="true"
            />

            {/* Terracotta Decorative Stamp / Tape Accent at Top-Right */}
            <div
              className="absolute top-0 right-16 z-30 w-8 h-10 bg-[#A4401F]/80 border border-[#7F3018]/60 -rotate-3 shadow-xs pointer-events-none"
              aria-hidden="true"
            />

            {/* Terracotta Adire Swatch Accent at Lower-Left */}
            <div
              className="absolute bottom-12 left-4 sm:left-6 z-25 w-14 sm:w-16 h-20 sm:h-24 bg-[#A4401F]/15 border border-[#A4401F]/40 p-1 pointer-events-none overflow-hidden"
              aria-hidden="true"
            >
              <div className="w-full h-full bg-[#A4401F] opacity-90 flex flex-col justify-around p-1 text-[7px] text-[#FAF8F4] font-mono select-none">
                <span>ADIRE</span>
                <span>YORUBA</span>
                <span>TEXTILE</span>
              </div>
            </div>

            {/* 1. Dominant Center Photograph: Nigerian Photographer with Camera on Tripod */}
            <div className="relative z-20 w-[240px] sm:w-[280px] md:w-[310px] h-[340px] sm:h-[390px] md:h-[420px] bg-[#171715] border border-[#E3DED5] shadow-[0_16px_36px_rgba(23,23,21,0.22)] overflow-hidden group">
              <img
                src="/assets/contribute-photographer.jpg"
                alt="Nigerian archival photographer operating medium format camera on tripod at Lagos harbour waterfront"
                className="w-full h-full object-cover object-center filter grayscale contrast-[1.08] transition-transform duration-700 ease-out group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#171715]/40 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* 2. Supporting Photograph 1: Vintage Broad Street Lagos with Classic Cars */}
            <div className="absolute top-2 sm:top-4 right-2 sm:right-6 z-25 w-[160px] sm:w-[190px] md:w-[210px] h-[210px] sm:h-[240px] md:h-[260px] bg-[#171715] border border-[#E3DED5] shadow-[0_12px_28px_rgba(23,23,21,0.2)] overflow-hidden group">
              <img
                src="/assets/contribute-street.jpg"
                alt="Archival street photography of Broad Street Lagos with colonial architecture and classic cars"
                className="w-full h-full object-cover object-center filter grayscale contrast-[1.06] transition-transform duration-700 ease-out group-hover:scale-105"
                loading="lazy"
              />
            </div>

            {/* 3. Supporting Photograph 2: Artisan Hands Tracing Stencil Pattern */}
            <div className="absolute bottom-4 sm:bottom-6 right-0 sm:right-4 z-25 w-[180px] sm:w-[210px] md:w-[230px] h-[130px] sm:h-[150px] md:h-[165px] bg-[#171715] border border-[#E3DED5] shadow-[0_12px_28px_rgba(23,23,21,0.2)] overflow-hidden group">
              <img
                src="/assets/contribute-artisan.jpg"
                alt="Macro close-up of artisan hands tracing traditional Adire pattern on cloth with stylus tool"
                className="w-full h-full object-cover object-center filter grayscale contrast-[1.06] transition-transform duration-700 ease-out group-hover:scale-105"
                loading="lazy"
              />
            </div>

            {/* 4. Circular Archival Seal (Upper-Left of Dominant Image) */}
            <div
              className="absolute top-6 sm:top-10 left-6 sm:left-10 z-30 w-20 sm:w-22 h-20 sm:h-22 rounded-full border border-[#171715] bg-[#FAF8F4] flex flex-col items-center justify-center p-1 shadow-md select-none pointer-events-none"
              aria-hidden="true"
            >
              {/* Outer circular dotted ring */}
              <div className="absolute inset-1 rounded-full border border-dashed border-[#6B6B6B]/60" />
              {/* Seal text */}
              <span className="font-mono text-[7px] tracking-[0.16em] uppercase text-[#171715] text-center font-bold">
                PEOPLE · PLACES
              </span>
              {/* Terracotta center node */}
              <span className="w-2 h-2 rounded-full bg-[#A4401F] my-0.5 inline-block" />
              <span className="font-mono text-[6.5px] tracking-[0.2em] uppercase text-[#6B6B6B]">
                ARCHIVE · 1974
              </span>
            </div>

            {/* 5. Handwritten Cursive Script Notes along the Right Margin */}
            <div
              className="absolute right-[-10px] sm:right-[-20px] top-[28%] z-30 flex flex-col space-y-1 select-none pointer-events-none text-[#6B6B6B] opacity-80"
              aria-hidden="true"
            >
              <span className="font-script text-lg sm:text-xl transform -rotate-6">People</span>
              <span className="font-script text-lg sm:text-xl transform -rotate-3">Places</span>
              <span className="font-script text-lg sm:text-xl transform -rotate-6">Ideas</span>
              <span className="font-script text-lg sm:text-xl transform -rotate-3">Culture</span>
              <span className="font-script text-lg sm:text-xl transform -rotate-6 text-[#A4401F]">Nigeria</span>
            </div>
          </div>
        </div>

        {/* Section Indicator at Bottom-Right */}
        <div className="mt-14 pt-6 border-t border-[#E3DED5] flex items-center justify-end space-x-3 text-[11px] font-mono tracking-widest text-[#6B6B6B]">
          <span className="font-semibold text-[#171715]">05 / 07</span>
          <div className="flex items-center space-x-1.5" aria-hidden="true">
            <span className="w-4 h-[2px] bg-[#D5D0C1]" />
            <span className="w-4 h-[2px] bg-[#D5D0C1]" />
            <span className="w-4 h-[2px] bg-[#D5D0C1]" />
            <span className="w-4 h-[2px] bg-[#D5D0C1]" />
            <span className="w-6 h-[2.5px] bg-[#A4401F]" />
            <span className="w-4 h-[2px] bg-[#D5D0C1]" />
            <span className="w-4 h-[2px] bg-[#D5D0C1]" />
          </div>
        </div>
      </div>

      {/* Accessible Support Modal: Explaining institutional preservation without inventing fake payment rails */}
      {isModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Support the ARCHIVE"
          className="fixed inset-0 z-50 bg-[#171715]/50 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6"
        >
          <div
            className="w-full max-w-lg bg-[#FAF8F4] border border-[#171715] p-6 sm:p-8 shadow-2xl animate-in zoom-in-95 duration-200"
            style={{ borderRadius: '0px' }}
          >
            <div className="flex items-center justify-between pb-4 border-b border-[#E3DED5]">
              <div className="flex items-center space-x-2 text-xs font-mono uppercase text-[#A4401F] font-semibold">
                <span>ARCHIVE PRESERVATION</span>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                aria-label="Close dialog"
                className="w-9 h-9 border border-[#171715] flex items-center justify-center hover:bg-[#171715] hover:text-[#FAF8F4] transition-colors cursor-pointer"
                style={{ borderRadius: '0px' }}
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="mt-5 space-y-4">
              <h3 className="font-display text-3xl text-[#171715] leading-tight">
                Partner with ARCHIVE
              </h3>
              <p className="font-sans text-sm text-[#6B6B6B] leading-relaxed">
                ARCHIVE is an independent digital museum initiative dedicated to researching,
                digitising, and contextualising Nigerian creative history across photography,
                music, fashion, and design.
              </p>
              <div className="p-4 bg-[#FAF8F4] border border-[#E3DED5] text-xs font-sans text-[#171715] space-y-2">
                <p className="font-mono font-semibold uppercase text-[#A4401F]">
                  Ways to Participate:
                </p>
                <ul className="list-disc pl-4 space-y-1 text-[#6B6B6B]">
                  <li>Archival loans and negative collection digitisation partnerships</li>
                  <li>Academic and curatorial research collaborations</li>
                  <li>Rights clearance assistance and institutional exhibition hosting</li>
                </ul>
              </div>
              <p className="text-xs font-mono text-[#6B6B6B]">
                Inquiries: curate@archive-nigeria.org · Lagos, Nigeria
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-[#E3DED5] flex justify-end">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="bg-[#171715] text-[#FAF8F4] hover:bg-[#A4401F] text-xs font-mono uppercase px-5 py-2.5 transition-colors cursor-pointer"
                style={{ borderRadius: '0px' }}
              >
                Close Window
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
