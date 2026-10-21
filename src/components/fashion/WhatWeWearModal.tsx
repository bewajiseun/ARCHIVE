import React, { useEffect, useRef, useState } from 'react';

interface WhatWeWearModalProps {
  isOpen: boolean;
  onClose: () => void;
  triggerElementRef?: React.RefObject<HTMLElement | null>;
}

export const WhatWeWearModal: React.FC<WhatWeWearModalProps> = ({
  isOpen,
  onClose,
  triggerElementRef,
}) => {
  const modalScrollRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const [imgSrc, setImgSrc] = useState(
    'https://res.cloudinary.com/jlggrwhm/image/upload/v1792517173/Regal_Yoruba_Portrait_in_a_Weathered_Courtyard.png'
  );
  const [relatedToast, setRelatedToast] = useState<string | null>(null);

  // Focus trap and escape key handler
  useEffect(() => {
    if (!isOpen) return;

    // Lock body scroll
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Focus close button on mount
    const timer = setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 50);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
      clearTimeout(timer);
      if (triggerElementRef?.current) {
        triggerElementRef.current.focus();
      }
    };
  }, [isOpen, onClose, triggerElementRef]);

  // Handle toast timeout
  useEffect(() => {
    if (relatedToast) {
      const timer = setTimeout(() => setRelatedToast(null), 3500);
      return () => clearTimeout(timer);
    }
  }, [relatedToast]);

  const handleScrollToTop = () => {
    modalScrollRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-story-title"
      aria-describedby="modal-story-subtitle"
      className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4 md:p-6 lg:p-8 bg-[#171715]/85 backdrop-blur-md transition-opacity duration-300 animate-fade-in"
      onClick={onClose}
    >
      {/* Modal Container — 100% Sharp Edges (rounded-none) */}
      <div
        ref={modalScrollRef}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full h-full sm:h-auto sm:max-h-[92vh] max-w-5xl bg-[#FAF8F4] sm:border sm:border-[#E3DED5] rounded-none shadow-2xl flex flex-col overflow-y-auto overflow-x-hidden focus:outline-none selection:bg-[#A4401F] selection:text-white"
        tabIndex={-1}
      >
        {/* =====================================================================
            TOP BAR / NAVIGATION HEADER (Sticky inside modal, Sharp Edges)
            ===================================================================== */}
        <header className="sticky top-0 z-30 flex items-center justify-between px-6 sm:px-8 py-4 sm:py-5 bg-[#FAF8F4]/95 backdrop-blur-md border-b border-[#E3DED5]">
          <div className="flex items-center space-x-3">
            <span className="font-mono text-[11px] sm:text-xs font-semibold text-[#A4401F] tracking-[0.2em] uppercase">
              FASHION &amp; CULTURE
            </span>
            <span className="text-[#D5D0C1] font-mono text-xs hidden sm:inline">|</span>
            <span className="font-mono text-xs text-[#6B6B6B] tracking-wider hidden sm:inline">
              EXHIBITION MONOGRAPH · ROOM 02
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <span className="font-mono text-[11px] text-[#6B6B6B] hidden sm:inline-block mr-2 px-2.5 py-1 rounded-none border border-[#E3DED5] bg-[#FAF8F4]">
              ESC to close
            </span>
            <button
              ref={closeButtonRef}
              type="button"
              onClick={onClose}
              aria-label="Close editorial modal"
              className="p-2 sm:p-2.5 text-[#171715] hover:text-[#FAF8F4] bg-[#FAF8F4] hover:bg-[#171715] border border-[#E3DED5] hover:border-[#171715] rounded-none transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A4401F]"
            >
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        </header>

        {/* =====================================================================
            MODAL EDITORIAL CONTENT BODY (Sharp Edges, 3 Curated Archival Photographs)
            ===================================================================== */}
        <div className="p-6 sm:p-10 md:p-12 lg:p-16 flex flex-col space-y-16 sm:space-y-20 max-w-[960px] mx-auto w-full">
          
          {/* SECTION 1: HERO EDITORIAL PRESENTATION (Split Layout)
              IMAGE 1 OF 3: Archival Yoruba Portrait */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            {/* Left / Editorial Text Column */}
            <div className="lg:col-span-7 flex flex-col">
              <div className="inline-flex items-center space-x-2.5 mb-3.5">
                <span className="w-2.5 h-2.5 rounded-none bg-[#A4401F]" />
                <p className="font-mono text-xs font-semibold tracking-[0.24em] uppercase text-[#A4401F]">
                  FASHION &amp; CULTURE
                </p>
              </div>

              <h1
                id="modal-story-title"
                className="font-display text-4xl sm:text-5xl lg:text-[54px] text-[#171715] font-normal leading-[1.04] tracking-tight"
              >
                What We Wear, What We Carry
              </h1>

              <h2
                id="modal-story-subtitle"
                className="font-serif italic text-2xl sm:text-[26px] text-[#A4401F] mt-2 mb-6 font-normal"
              >
                Dress, Identity and Heritage
              </h2>

              {/* Editorial Intro with Distinct Styling — Sharp Edges */}
              <p className="font-sans text-[17px] sm:text-[18px] leading-[1.65] text-[#171715] font-medium border-l-3 border-[#A4401F] pl-4 py-1.5 mb-6 bg-[#A4401F]/5 rounded-none">
                See how clothing, adornment and personal style express culture, status and creativity across generations.
              </p>

              {/* Main Narrative Prose */}
              <div className="space-y-4 font-sans text-[15px] sm:text-[16px] leading-[1.75] text-[#4A4A48]">
                <p>
                  Clothing is more than what we put on. It can tell stories about where we come from, what we value, and how we choose to express ourselves.
                </p>
                <p>
                  Across generations, Nigerian dress has carried meaning beyond appearance. The textures of handwoven Aso Oke, the colours and patterns of Ankara, carefully tied gele, beads and embroidery can all contribute to how people express culture, creativity, belonging and personal identity.
                </p>
                <p className="font-medium text-[#171715]">
                  But the story of a garment begins long before someone wears it.
                </p>
              </div>

              {/* Pull Quote Callout Box — Sharp Edges */}
              <blockquote className="my-8 p-6 sm:p-7 bg-[#EFECE6]/60 border-l-3 border-[#A4401F] border-t border-r border-b border-[#E3DED5] rounded-none">
                <p className="font-serif italic text-xl sm:text-2xl text-[#171715] leading-[1.4]">
                  “Before the fabric is worn, it carries the hands of the farmer, the spinner, the dyer, and the weaver.”
                </p>
                <cite className="font-mono text-[11px] sm:text-xs text-[#A4401F] tracking-widest uppercase block mt-3 not-italic">
                  — Archival note on Yoruba textile lineage
                </cite>
              </blockquote>

              <div className="font-sans text-[15px] sm:text-[16px] leading-[1.75] text-[#4A4A48] space-y-4">
                <h3 className="font-display text-2xl sm:text-3xl text-[#171715] pt-2">
                  Before the fabric is worn
                </h3>
                <p>
                  Aso Oke, also known as Aso Ofi, is a traditional handwoven cloth created by the Yoruba people of southwestern Nigeria. For centuries, it has been worn during weddings, coronations, festivals and significant life milestones.
                </p>
                <p>
                  It is made through a laborious, time-honoured process that transforms raw cotton into striking woven patterns. The creation of Aso Oke typically involves four main stages:
                </p>
              </div>
            </div>

            {/* Right / Visual Column: IMAGE 1 OF 3 — Archival Portrait */}
            <div className="lg:col-span-5 flex flex-col lg:sticky lg:top-24">
              <figure className="relative bg-[#EFECE6] border border-[#E3DED5] rounded-none overflow-hidden shadow-xs">
                <div className="w-full aspect-[4/5] overflow-hidden bg-[#E2DED5]">
                  <img
                    src={imgSrc}
                    alt="Regal Yoruba portrait in traditional dress and adornment in a weathered courtyard"
                    onError={() => setImgSrc('/assets/Regal_Yoruba_Portrait.png')}
                    className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-[1.02]"
                  />
                </div>
                <figcaption className="p-4 bg-[#FAF8F4] border-t border-[#E3DED5] rounded-none">
                  <span className="font-mono text-[10px] font-semibold text-[#A4401F] tracking-widest block uppercase mb-1">
                    PLATE 01 · ARCHIVE PHOTOGRAPHY
                  </span>
                  <p className="font-sans text-xs text-[#6B6B6B] leading-relaxed">
                    A portrait of traditional elegance. Regal Yoruba dress photographed in a weathered courtyard, showing rich indigo tones, layered accessories, and sculptural headwear.
                  </p>
                </figcaption>
              </figure>

              {/* Curatorial Annotation — Sharp Edges */}
              <div className="mt-4 p-4 rounded-none border border-[#E3DED5] bg-[#FAF8F4] flex items-start space-x-3">
                <div className="w-2 h-2 bg-[#A4401F] rounded-none mt-1.5 flex-shrink-0" />
                <p className="font-mono text-[11px] text-[#6B6B6B] leading-normal">
                  <strong className="text-[#171715] font-semibold">Provenance:</strong> Handwoven narrow-strip textile tradition originating across Iseyin, Oyo, and Osun workshops.
                </p>
              </div>
            </div>
          </section>

          {/* SECTION 2: THE MAKING OF ASO OKE (Structured 4-Step Process Section) */}
          <section aria-labelledby="section-making-title" className="border-t border-[#E3DED5] pt-12 sm:pt-16">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-10 gap-4">
              <div>
                <p className="font-mono text-xs font-semibold tracking-[0.24em] uppercase text-[#A4401F] mb-2">
                  THE CRAFT PROCESS
                </p>
                <h3 id="section-making-title" className="font-display text-3xl sm:text-4xl text-[#171715] font-normal tracking-tight">
                  The Making of Aso Oke
                </h3>
              </div>
              <p className="font-sans text-sm text-[#6B6B6B] max-w-md">
                From raw organic seed to finished heirloom regalia, every stage represents generations of inherited scientific and artistic intelligence.
              </p>
            </div>

            {/* 4-Step Process Grid — Sharp Edges */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {/* Step 1 */}
              <article className="bg-[#FAF8F4] border border-[#E3DED5] rounded-none p-6 flex flex-col justify-between hover:border-[#A4401F]/40 transition-all hover:shadow-xs group">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-sm font-semibold text-[#A4401F] tracking-widest bg-[#A4401F]/10 px-2 py-0.5 rounded-none">
                      01
                    </span>
                    <span className="font-mono text-[10px] text-[#6B6B6B] uppercase tracking-wider">
                      Agriculture
                    </span>
                  </div>
                  <h4 className="font-display text-xl text-[#171715] group-hover:text-[#A4401F] transition-colors mb-2">
                    Cotton planting and harvesting
                  </h4>
                  <p className="font-sans text-xs font-medium text-[#A4401F] mb-3">
                    Harvesting &amp; Ginning
                  </p>
                  <p className="font-sans text-[13.5px] leading-[1.65] text-[#6B6B6B]">
                    Locally grown cotton is harvested, separated from seeds and debris, and prepared for processing.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-[#E3DED5]/60 text-[11px] font-mono text-[#6B6B6B]">
                  Hand-bowed seed separation
                </div>
              </article>

              {/* Step 2 */}
              <article className="bg-[#FAF8F4] border border-[#E3DED5] rounded-none p-6 flex flex-col justify-between hover:border-[#A4401F]/40 transition-all hover:shadow-xs group">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-sm font-semibold text-[#A4401F] tracking-widest bg-[#A4401F]/10 px-2 py-0.5 rounded-none">
                      02
                    </span>
                    <span className="font-mono text-[10px] text-[#6B6B6B] uppercase tracking-wider">
                      Preparation
                    </span>
                  </div>
                  <h4 className="font-display text-xl text-[#171715] group-hover:text-[#A4401F] transition-colors mb-2">
                    Spinning into thread (Oran)
                  </h4>
                  <p className="font-sans text-xs font-medium text-[#A4401F] mb-3">
                    Hand-Spinning (Oran)
                  </p>
                  <p className="font-sans text-[13.5px] leading-[1.65] text-[#6B6B6B]">
                    Raw cotton fibres are hand-spun using a spindle to create fine, durable thread.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-[#E3DED5]/60 text-[11px] font-mono text-[#6B6B6B]">
                  Drop spindle precision
                </div>
              </article>

              {/* Step 3 */}
              <article className="bg-[#FAF8F4] border border-[#E3DED5] rounded-none p-6 flex flex-col justify-between hover:border-[#A4401F]/40 transition-all hover:shadow-xs group">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-sm font-semibold text-[#A4401F] tracking-widest bg-[#A4401F]/10 px-2 py-0.5 rounded-none">
                      03
                    </span>
                    <span className="font-mono text-[10px] text-[#6B6B6B] uppercase tracking-wider">
                      Alchemy
                    </span>
                  </div>
                  <h4 className="font-display text-xl text-[#171715] group-hover:text-[#A4401F] transition-colors mb-2">
                    Dyeing and preparing yarn
                  </h4>
                  <p className="font-sans text-xs font-medium text-[#A4401F] mb-3">
                    Natural Dyeing
                  </p>
                  <p className="font-sans text-[13.5px] leading-[1.65] text-[#6B6B6B]">
                    Yarn is dyed using natural dyes derived from plants, bark, roots and indigo, creating deep, lasting colours.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-[#E3DED5]/60 text-[11px] font-mono text-[#6B6B6B]">
                  Indigo pit fermentation
                </div>
              </article>

              {/* Step 4 */}
              <article className="bg-[#FAF8F4] border border-[#E3DED5] rounded-none p-6 flex flex-col justify-between hover:border-[#A4401F]/40 transition-all hover:shadow-xs group">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-sm font-semibold text-[#A4401F] tracking-widest bg-[#A4401F]/10 px-2 py-0.5 rounded-none">
                      04
                    </span>
                    <span className="font-mono text-[10px] text-[#6B6B6B] uppercase tracking-wider">
                      Weaving
                    </span>
                  </div>
                  <h4 className="font-display text-xl text-[#171715] group-hover:text-[#A4401F] transition-colors mb-2">
                    Weaving on the loom (Aso Ofi)
                  </h4>
                  <p className="font-sans text-xs font-medium text-[#A4401F] mb-3">
                    Narrow-Loom Weaving (Aso Ofi)
                  </p>
                  <p className="font-sans text-[13.5px] leading-[1.65] text-[#6B6B6B]">
                    Weavers use horizontal narrow-band looms to interlace threads into long strips of patterned cloth, which are later stitched together to create garments.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-[#E3DED5]/60 text-[11px] font-mono text-[#6B6B6B]">
                  Continuous narrow strips
                </div>
              </article>
            </div>

            {/* IMAGE 2 OF 3: Archival Detail of Woven Threads (Plate 02) — Scannable visual reading break */}
            <div className="bg-[#EFECE6]/50 border border-[#E3DED5] rounded-none p-6 sm:p-8 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              <div className="md:col-span-5 aspect-[16/10] sm:aspect-[4/3] overflow-hidden border border-[#E3DED5] bg-[#E2DED5] rounded-none">
                <img
                  src="https://res.cloudinary.com/jlggrwhm/image/upload/v1792517172/thread_by_thread.jpg"
                  alt="Macro photograph of handwoven Aso Oke textile threads and selvedge edges"
                  loading="lazy"
                  className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-[1.03]"
                />
              </div>
              <div className="md:col-span-7 flex flex-col justify-center">
                <div className="flex items-center space-x-2 text-xs font-mono text-[#A4401F] mb-2 uppercase tracking-widest font-semibold">
                  <span className="w-2 h-2 bg-[#A4401F] rounded-none" />
                  <span>PLATE 02 · THREAD BY THREAD</span>
                </div>
                <h4 className="font-display text-2xl text-[#171715] font-normal mb-2">
                  The Tension of the Loom
                </h4>
                <p className="font-sans text-sm text-[#4A4A48] leading-relaxed">
                  Notice how the individual warp threads interlock with the crossing weft. In traditional Yoruba weaving workshops, a stone drag weight keeps dozens of metres of yarn taut across the open courtyard, allowing the weaver to maintain exact thread tension through subtle foot pedal modulations.
                </p>
              </div>
            </div>
          </section>

          {/* SECTION 3: THE THREE CLASSIC TYPES OF ASO OKE (Refined Comparison Grid) */}
          <section aria-labelledby="section-varieties-title" className="border-t border-[#E3DED5] pt-12 sm:pt-16">
            <div className="max-w-2xl mb-8 sm:mb-10">
              <p className="font-mono text-xs font-semibold tracking-[0.24em] uppercase text-[#A4401F] mb-2">
                TEXTILE TAXONOMY
              </p>
              <h3 id="section-varieties-title" className="font-display text-3xl sm:text-4xl text-[#171715] font-normal tracking-tight">
                The Three Classic Types of Aso Oke
              </h3>
              <p className="font-sans text-[15px] sm:text-[16px] leading-[1.65] text-[#6B6B6B] mt-3">
                Over time, several distinctive varieties of Aso Oke have become central to Yoruba ceremonial dress:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-12">
              {/* Variety 1: SANYAN */}
              <div className="bg-[#FAF8F4] border border-[#E3DED5] rounded-none overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow">
                <div className="h-3.5 bg-gradient-to-r from-[#D7C4AA] via-[#E6D7C3] to-[#C9B396] rounded-none" />
                <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="font-mono text-[11px] font-semibold text-[#A4401F] tracking-widest uppercase block mb-1">
                      WILD SILK &amp; COTTON / EARTH TONES
                    </span>
                    <h4 className="font-display text-2xl sm:text-[26px] text-[#171715] font-normal mb-3">
                      Sanyan
                    </h4>
                    <p className="font-sans text-[14px] leading-[1.65] text-[#4A4A48] mb-4">
                      Woven from wild silk filaments and local cotton, traditionally light brown or beige in tone. Revered as one of the most prestigious fabrics.
                    </p>
                  </div>
                  <div className="pt-4 border-t border-[#E3DED5] flex items-center justify-between text-xs font-mono text-[#6B6B6B]">
                    <span>Occasion</span>
                    <span className="text-[#171715] font-medium">Coronations &amp; Weddings</span>
                  </div>
                </div>
              </div>

              {/* Variety 2: ALAARI */}
              <div className="bg-[#FAF8F4] border border-[#E3DED5] rounded-none overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow">
                <div className="h-3.5 bg-gradient-to-r from-[#8B1E3F] via-[#A8264E] to-[#67122C] rounded-none" />
                <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="font-mono text-[11px] font-semibold text-[#A4401F] tracking-widest uppercase block mb-1">
                      CRIMSON &amp; MAGENTA / CEREMONIAL PRESTIGE
                    </span>
                    <h4 className="font-display text-2xl sm:text-[26px] text-[#171715] font-normal mb-3">
                      Alaari
                    </h4>
                    <p className="font-sans text-[14px] leading-[1.65] text-[#4A4A48] mb-4">
                      Distinguished by its rich crimson, magenta or deep red colour, historically dyed with natural camwood or imported silk threads.
                    </p>
                  </div>
                  <div className="pt-4 border-t border-[#E3DED5] flex items-center justify-between text-xs font-mono text-[#6B6B6B]">
                    <span>Occasion</span>
                    <span className="text-[#171715] font-medium">Festivals &amp; Celebrations</span>
                  </div>
                </div>
              </div>

              {/* Variety 3: ETU */}
              <div className="bg-[#FAF8F4] border border-[#E3DED5] rounded-none overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow">
                <div className="h-3.5 bg-gradient-to-r from-[#1A2849] via-[#2A3E6D] to-[#0E1A33] rounded-none" />
                <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="font-mono text-[11px] font-semibold text-[#A4401F] tracking-widest uppercase block mb-1">
                      DEEP INDIGO &amp; WHITE PINSTRIPES / WISDOM &amp; ELDERS
                    </span>
                    <h4 className="font-display text-2xl sm:text-[26px] text-[#171715] font-normal mb-3">
                      Etu
                    </h4>
                    <p className="font-sans text-[14px] leading-[1.65] text-[#4A4A48] mb-4">
                      Characterised by deep indigo blues with fine white or light blue stripes, often associated with elder statesmen, chiefs and significant ceremonies.
                    </p>
                  </div>
                  <div className="pt-4 border-t border-[#E3DED5] flex items-center justify-between text-xs font-mono text-[#6B6B6B]">
                    <span>Occasion</span>
                    <span className="text-[#171715] font-medium">Council of Elders &amp; Rites</span>
                  </div>
                </div>
              </div>
            </div>

            {/* IMAGE 3 OF 3: Master Artisan at the Loom (Plate 03) — Scannable visual reading break */}
            <div className="bg-[#FAF8F4] border border-[#E3DED5] rounded-none p-6 sm:p-8 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              <div className="md:col-span-5 aspect-[16/10] sm:aspect-[4/3] overflow-hidden border border-[#E3DED5] bg-[#E2DED5] rounded-none order-2 md:order-1">
                <img
                  src="https://res.cloudinary.com/jlggrwhm/image/upload/v1792517172/the_making.jpg"
                  alt="Master Yoruba artisan weaving narrow strips of Aso Oke on a wooden horizontal loom"
                  loading="lazy"
                  className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-[1.03]"
                />
              </div>
              <div className="md:col-span-7 flex flex-col justify-center order-1 md:order-2">
                <div className="flex items-center space-x-2 text-xs font-mono text-[#A4401F] mb-2 uppercase tracking-widest font-semibold">
                  <span className="w-2 h-2 bg-[#A4401F] rounded-none" />
                  <span>PLATE 03 · THE MAKING</span>
                </div>
                <h4 className="font-display text-2xl text-[#171715] font-normal mb-2">
                  Knowledge Passed Across Generations
                </h4>
                <p className="font-sans text-sm text-[#4A4A48] leading-relaxed">
                  Weaving Aṣọ Òkè is an embodied rhythm. Feet work the pedal strings beneath the bench while hands throw the wooden boat shuttle across the open warp shed. In towns like Iseyin and Oyo, this knowledge is preserved through family lineages and apprentice guilds.
                </p>
              </div>
            </div>
          </section>

          {/* SECTION 4: WHY IT MATTERS TODAY (Contemporary Resonance, Sharp Edges) */}
          <section className="border-t border-[#E3DED5] pt-12 sm:pt-16 bg-[#EFECE6]/40 -mx-6 sm:-mx-10 md:-mx-12 lg:-mx-16 px-6 sm:px-10 md:px-12 lg:px-16 py-12 rounded-none">
            <div className="max-w-3xl">
              <p className="font-mono text-xs font-semibold tracking-[0.24em] uppercase text-[#A4401F] mb-3">
                CONTEMPORARY RESONANCE
              </p>
              <h3 className="font-display text-3xl sm:text-4xl text-[#171715] font-normal tracking-tight mb-6">
                Why it matters today
              </h3>
              <div className="space-y-4 font-sans text-[15px] sm:text-[16px] leading-[1.75] text-[#4A4A48]">
                <p>
                  Today, contemporary Nigerian designers are revisiting Aso Oke and other indigenous textiles, incorporating traditional weaving techniques into modern tailoring, accessories and streetwear.
                </p>
                <p>
                  By reimagining these historic fabrics, contemporary creators ensure that ancestral craft remains a living, evolving part of modern Nigerian fashion.
                </p>
                <p className="text-[#171715] font-serif italic text-lg sm:text-xl pt-2">
                  From artisanal looms in Iseyin to international fashion runways, Aso Oke continues to bridge centuries of generational craft with contemporary global culture.
                </p>
              </div>
            </div>
          </section>

          {/* SECTION 5: RELATED IN THE ARCHIVE (Sharp Edges) */}
          <section aria-labelledby="section-related-title" className="border-t border-[#E3DED5] pt-12 sm:pt-16">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-3">
              <div>
                <p className="font-mono text-xs font-semibold tracking-[0.24em] uppercase text-[#A4401F] mb-2">
                  CURATED TRAILS
                </p>
                <h3 id="section-related-title" className="font-display text-3xl text-[#171715] font-normal tracking-tight">
                  Related in the ARCHIVE:
                </h3>
              </div>
              <p className="font-sans text-xs text-[#6B6B6B]">
                Discover more stories of fashion and personal expression in Nigeria’s creative history.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Link 1 */}
              <button
                type="button"
                onClick={() => setRelatedToast('Archival monograph "The Loom and the Lineage" added to your reading queue.')}
                className="group text-left p-6 rounded-none border border-[#E3DED5] hover:border-[#A4401F] bg-[#FAF8F4] hover:bg-[#FAF8F4] transition-all cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <span className="font-mono text-[10px] text-[#A4401F] uppercase tracking-wider block mb-2">
                    CRAFT &amp; TRADITION
                  </span>
                  <h4 className="font-display text-xl text-[#171715] group-hover:text-[#A4401F] transition-colors leading-snug">
                    The Loom and the Lineage: Master Weavers of Iseyin
                  </h4>
                  <p className="font-sans text-xs text-[#6B6B6B] mt-2.5 leading-relaxed">
                    Generational textile guilds preserving the horizontal pedal loom in Oyo State.
                  </p>
                </div>
                <div className="mt-6 flex items-center justify-between text-xs font-mono text-[#A4401F]">
                  <span className="group-hover:underline">Explore trail</span>
                  <span className="w-6 h-6 rounded-none border border-[#A4401F]/30 flex items-center justify-center group-hover:bg-[#A4401F] group-hover:text-white transition-colors">
                    →
                  </span>
                </div>
              </button>

              {/* Link 2 */}
              <button
                type="button"
                onClick={() => setRelatedToast('Archival monograph "Indigo: The Deep Blue" added to your reading queue.')}
                className="group text-left p-6 rounded-none border border-[#E3DED5] hover:border-[#A4401F] bg-[#FAF8F4] hover:bg-[#FAF8F4] transition-all cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <span className="font-mono text-[10px] text-[#A4401F] uppercase tracking-wider block mb-2">
                    MATERIAL HISTORY
                  </span>
                  <h4 className="font-display text-xl text-[#171715] group-hover:text-[#A4401F] transition-colors leading-snug">
                    Indigo: The Deep Blue of West African Heritage
                  </h4>
                  <p className="font-sans text-xs text-[#6B6B6B] mt-2.5 leading-relaxed">
                    The ancient chemistry of Kofar Mata dye pits and sacred indigo extraction.
                  </p>
                </div>
                <div className="mt-6 flex items-center justify-between text-xs font-mono text-[#A4401F]">
                  <span className="group-hover:underline">Explore trail</span>
                  <span className="w-6 h-6 rounded-none border border-[#A4401F]/30 flex items-center justify-center group-hover:bg-[#A4401F] group-hover:text-white transition-colors">
                    →
                  </span>
                </div>
              </button>

              {/* Link 3 */}
              <button
                type="button"
                onClick={() => setRelatedToast('Archival monograph "From Studio to Street" added to your reading queue.')}
                className="group text-left p-6 rounded-none border border-[#E3DED5] hover:border-[#A4401F] bg-[#FAF8F4] hover:bg-[#FAF8F4] transition-all cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <span className="font-mono text-[10px] text-[#A4401F] uppercase tracking-wider block mb-2">
                    PHOTOGRAPHY &amp; MEMORY
                  </span>
                  <h4 className="font-display text-xl text-[#171715] group-hover:text-[#A4401F] transition-colors leading-snug">
                    From Studio to Street: Nigerian Portraiture in the 1970s
                  </h4>
                  <p className="font-sans text-xs text-[#6B6B6B] mt-2.5 leading-relaxed">
                    How post-independence photographic studios recorded fashion, joy and personal dignity.
                  </p>
                </div>
                <div className="mt-6 flex items-center justify-between text-xs font-mono text-[#A4401F]">
                  <span className="group-hover:underline">Explore trail</span>
                  <span className="w-6 h-6 rounded-none border border-[#A4401F]/30 flex items-center justify-center group-hover:bg-[#A4401F] group-hover:text-white transition-colors">
                    →
                  </span>
                </div>
              </button>
            </div>
          </section>

          {/* Toast notification for related links — Sharp Edges */}
          {relatedToast && (
            <div
              role="status"
              className="fixed bottom-6 right-6 z-50 bg-[#171715] text-[#FAF8F4] px-5 py-3 rounded-none shadow-xl font-mono text-xs border border-[#A4401F]/40 animate-fade-in flex items-center space-x-3"
            >
              <span className="w-2 h-2 rounded-none bg-[#A4401F]" />
              <span>{relatedToast}</span>
            </div>
          )}

          {/* =====================================================================
              MODAL FOOTER ACTIONS & CURATORIAL CITATION (Sharp Edges)
              ===================================================================== */}
          <footer className="border-t border-[#E3DED5] pt-10 pb-6 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center space-x-4">
              <button
                type="button"
                onClick={handleScrollToTop}
                className="font-mono text-xs uppercase tracking-wider text-[#6B6B6B] hover:text-[#A4401F] transition-colors cursor-pointer flex items-center space-x-1.5 focus:outline-none focus-visible:ring-1 focus-visible:ring-[#A4401F]"
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 15l-6-6-6 6" />
                </svg>
                <span>Back to top</span>
              </button>
              <span className="text-[#D5D0C1] font-mono text-xs">·</span>
              <a
                href="https://wovenmarketafrica.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs text-[#6B6B6B] hover:text-[#A4401F] transition-colors underline decoration-[#D5D0C1] underline-offset-2"
              >
                Research Source: Woven Market Africa
              </a>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 rounded-none bg-[#171715] text-[#FAF8F4] hover:bg-[#A4401F] font-mono text-xs font-medium tracking-wider uppercase transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A4401F]"
            >
              Close Monograph
            </button>
          </footer>
        </div>
      </div>
    </div>
  );
};
