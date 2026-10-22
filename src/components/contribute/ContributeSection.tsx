import React, { useState } from 'react';
import { BookOpen, Users, Sprout, ArrowRight, X } from 'lucide-react';
import { ScrollReveal } from '../motion/ScrollReveal';

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
      className="relative w-full bg-[#FAF8F4] text-[#171715] py-16 md:py-24 overflow-hidden select-none"
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          {/* =========================================================================
              LEFT COLUMN: Editorial Heading, Copy, CTAs & Value Propositions
              ========================================================================= */}
          <div className="lg:col-span-6 flex flex-col items-start pt-2">
            {/* Section Label in terracotta without numbers or lines */}
            <ScrollReveal delayMs={40}>
              <div className="text-[11px] font-mono tracking-[0.24em] uppercase text-[#A4401F] font-semibold mb-4">
                <span>CONTRIBUTE</span>
              </div>
            </ScrollReveal>

            {/* Display Headline */}
            <ScrollReveal delayMs={80}>
              <h2 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-[68px] text-[#171715] leading-[0.94] tracking-tight">
                <span className="block">Some stories</span>
                <span className="block">deserve</span>
                <span className="block italic text-[#A4401F] font-normal my-1">
                  to live forever.
                </span>
              </h2>
            </ScrollReveal>

            {/* Supporting Copy */}
            <ScrollReveal delayMs={140}>
              <p className="font-sans text-[15px] sm:text-[16px] md:text-[16.5px] leading-[1.62] text-[#6B6B6B] mt-6 md:mt-8 max-w-[440px]">
                Nigeria’s creative history lives in its people, places, objects, and everyday practices. By preserving the stories behind them, we help keep that history visible, accessible, and open to future generations.
              </p>
            </ScrollReveal>

            {/* Two Horizontally Aligned CTA Buttons */}
            <ScrollReveal delayMs={190}>
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
                  <span>Support the Archive</span>
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
                  <span>Learn more</span>
                  <span className="ml-2.5 text-base leading-none" aria-hidden="true">→</span>
                </a>
              </div>
            </ScrollReveal>

            {/* Three Value Propositions Separated by Thin Vertical Dividers */}
            <ScrollReveal delayMs={240} className="w-full">
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
            </ScrollReveal>
          </div>

          {/* =========================================================================
              RIGHT COLUMN: Layered Archival Collage
              ========================================================================= */}
          <div className="lg:col-span-6 relative flex items-center justify-center min-h-[520px] md:min-h-[580px] p-4 sm:p-8">
            {/* Terracotta Decorative Stamp / Tape Accent at Top-Right */}
            <div
              className="absolute top-0 right-16 z-30 w-8 h-10 bg-[#A4401F]/80 border border-[#7F3018]/60 -rotate-3 shadow-xs pointer-events-none"
              aria-hidden="true"
            />

            {/* 1. Dominant Center Photograph: Nigerian Photographer with Camera on Tripod */}
            <ScrollReveal delayMs={120} className="relative z-20">
              <div className="w-[240px] sm:w-[280px] md:w-[310px] h-[340px] sm:h-[390px] md:h-[420px] bg-[#171715] border border-[#E3DED5] shadow-[0_16px_36px_rgba(23,23,21,0.22)] overflow-hidden group">
                <img
                  src="/assets/contribute-photographer.jpg"
                  alt="Nigerian archival photographer operating medium format camera on tripod at Lagos harbour waterfront"
                  className="w-full h-full object-cover object-center filter grayscale contrast-[1.08] transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#171715]/40 via-transparent to-transparent pointer-events-none" />
              </div>
            </ScrollReveal>

            {/* 2. Supporting Photograph 1: Vintage Broad Street Lagos with Classic Cars */}
            <ScrollReveal delayMs={190} className="absolute top-2 sm:top-4 right-2 sm:right-6 z-25">
              <div className="w-[160px] sm:w-[190px] md:w-[210px] h-[210px] sm:h-[240px] md:h-[260px] bg-[#171715] border border-[#E3DED5] shadow-[0_12px_28px_rgba(23,23,21,0.2)] overflow-hidden group">
                <img
                  src="/assets/contribute-street.jpg"
                  alt="Archival street photography of Broad Street Lagos with colonial architecture and classic cars"
                  className="w-full h-full object-cover object-center filter grayscale contrast-[1.06] transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                />
              </div>
            </ScrollReveal>

            {/* 3. Supporting Photograph 2: Artisan Hands Tracing Stencil Pattern */}
            <ScrollReveal delayMs={260} className="absolute bottom-4 sm:bottom-6 right-0 sm:right-4 z-25">
              <div className="w-[180px] sm:w-[210px] md:w-[230px] h-[130px] sm:h-[150px] md:h-[165px] bg-[#171715] border border-[#E3DED5] shadow-[0_12px_28px_rgba(23,23,21,0.2)] overflow-hidden group">
                <img
                  src="/assets/contribute-artisan.jpg"
                  alt="Macro close-up of artisan hands tracing traditional Adire pattern on cloth with stylus tool"
                  className="w-full h-full object-cover object-center filter grayscale contrast-[1.06] transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                />
              </div>
            </ScrollReveal>
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
