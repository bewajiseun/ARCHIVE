import React, { useEffect, useRef, useState } from 'react';

interface TheMakingOfAsoOkeModalProps {
  isOpen: boolean;
  onClose: () => void;
  triggerElementRef?: React.RefObject<HTMLElement | null>;
  initialSection?: string;
}

export const TheMakingOfAsoOkeModal: React.FC<TheMakingOfAsoOkeModalProps> = ({
  isOpen,
  onClose,
  triggerElementRef,
}) => {
  const modalScrollRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const [activeImageZoom, setActiveImageZoom] = useState<string | null>(null);

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
        if (activeImageZoom) {
          setActiveImageZoom(null);
        } else {
          onClose();
        }
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
  }, [isOpen, onClose, triggerElementRef, activeImageZoom]);

  const handleScrollToTop = () => {
    modalScrollRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="aso-oke-making-title"
      aria-describedby="aso-oke-making-subtitle"
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
            TOP BAR / NAVIGATION HEADER (Sticky, Sharp Edges)
            ===================================================================== */}
        <header className="sticky top-0 z-30 flex items-center justify-between px-6 sm:px-8 py-4 sm:py-5 bg-[#FAF8F4]/95 backdrop-blur-md border-b border-[#E3DED5]">
          <div className="flex items-center space-x-3">
            <span className="font-mono text-[11px] sm:text-xs font-semibold text-[#A4401F] tracking-[0.2em] uppercase">
              TEXTILES &amp; CRAFTSMANSHIP
            </span>
            <span className="text-[#D5D0C1] font-mono text-xs hidden sm:inline">|</span>
            <span className="font-mono text-xs text-[#6B6B6B] tracking-wider hidden sm:inline">
              EXHIBITION MONOGRAPH · ROOM 02
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <span className="font-mono text-[11px] text-[#6B6B6B] hidden sm:inline-block mr-2 px-2.5 py-1 border border-[#E3DED5] bg-[#FAF8F4] rounded-none">
              ESC to close
            </span>
            <button
              ref={closeButtonRef}
              type="button"
              onClick={onClose}
              aria-label="Close monograph"
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
            EDITORIAL MONOGRAPH BODY (Sharp Edges, 3 Curated Archival Photographs)
            ===================================================================== */}
        <div className="p-6 sm:p-10 md:p-12 lg:p-16 flex flex-col space-y-16 sm:space-y-20 max-w-[960px] mx-auto w-full">
          
          {/* -------------------------------------------------------------------
              HEADER & INTRODUCTORY SPLIT SECTION
              Photograph 1 of 3: Detail of Woven Thread Structure
              ------------------------------------------------------------------- */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            {/* Left: Text & Curatorial Prologue */}
            <div className="lg:col-span-7 flex flex-col">
              <div className="inline-flex items-center space-x-2.5 mb-3.5">
                <span className="w-2.5 h-2.5 bg-[#A4401F] rounded-none" />
                <p className="font-mono text-xs font-semibold tracking-[0.24em] uppercase text-[#A4401F]">
                  Textiles &amp; Craftsmanship
                </p>
              </div>

              <h1
                id="aso-oke-making-title"
                className="font-display text-4xl sm:text-5xl lg:text-[56px] text-[#171715] font-normal leading-[1.03] tracking-tight uppercase"
              >
                THE MAKING OF AṢỌ ÒKÈ
              </h1>

              <h2
                id="aso-oke-making-subtitle"
                className="font-serif italic text-2xl sm:text-[28px] text-[#A4401F] mt-2 mb-6 font-normal"
              >
                Look beyond the pattern.
              </h2>

              {/* Introductory Thesis Statement */}
              <div className="border-l-3 border-[#A4401F] pl-5 py-2 mb-8 bg-[#A4401F]/5 rounded-none">
                <p className="font-sans text-[17px] sm:text-[18px] leading-[1.65] text-[#171715] font-medium">
                  A textile is more than the surface we see. It is the result of decisions about materials, structure, colour, and technique.
                </p>
              </div>

              <div className="space-y-4 font-sans text-[15px] sm:text-[16px] leading-[1.75] text-[#4A4A48]">
                <p>
                  Aṣọ Òkè is a prestige cloth woven by Yoruba artisans in southwestern Nigeria. Traditionally made into garments for important occasions, it is recognised for its distinctive woven strips, intricate patterns, and remarkable variety.
                </p>
                <p className="font-medium text-[#171715]">
                  To understand the cloth, we need to look closely at how it is made.
                </p>
              </div>

              {/* Quick Reading Guide / Visual Chapters */}
              <div className="mt-8 pt-6 border-t border-[#E3DED5] grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { num: '01', label: 'The Material' },
                  { num: '02', label: 'The Weave' },
                  { num: '03', label: 'One Cloth' },
                  { num: '04', label: 'Living Tradition' },
                ].map((item) => (
                  <div key={item.num} className="p-3 bg-[#EFECE6]/50 border border-[#E3DED5] rounded-none">
                    <span className="font-mono text-xs font-semibold text-[#A4401F] block">{item.num}</span>
                    <span className="font-sans text-xs text-[#171715] font-medium mt-0.5 block">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: IMAGE 1 OF 3 — Archival Detail of Woven Threads */}
            <div className="lg:col-span-5 flex flex-col lg:sticky lg:top-24">
              <figure className="relative bg-[#EFECE6] border border-[#E3DED5] rounded-none overflow-hidden shadow-xs">
                <div className="w-full aspect-[4/5] overflow-hidden bg-[#E2DED5]">
                  <img
                    src="https://res.cloudinary.com/jlggrwhm/image/upload/v1792517172/thread_by_thread.jpg"
                    alt="Detailed view of woven Aṣọ Òkè textile threads, warp, weft, and structural craftsmanship"
                    loading="lazy"
                    className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-[1.03]"
                  />
                </div>
                <figcaption className="p-4 bg-[#FAF8F4] border-t border-[#E3DED5] rounded-none">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-mono text-[10px] font-semibold text-[#A4401F] tracking-widest uppercase">
                      PLATE 01 · THREAD BY THREAD
                    </span>
                    <span className="font-mono text-[10px] text-[#6B6B6B]">MACRO STUDY</span>
                  </div>
                  <p className="font-sans text-xs text-[#6B6B6B] leading-relaxed">
                    Close-up archival photograph of the interlaced warp and weft fibres. Every stripe, texture, and density shift originates in the hand-tension of the weaver.
                  </p>
                </figcaption>
              </figure>

              {/* Curatorial Specimen Note */}
              <div className="mt-4 p-4 border border-[#E3DED5] bg-[#FAF8F4] rounded-none flex items-start space-x-3">
                <div className="w-2 h-2 bg-[#A4401F] rounded-none mt-1.5 flex-shrink-0" />
                <p className="font-mono text-[11px] text-[#6B6B6B] leading-relaxed">
                  <strong className="text-[#171715] font-medium">Curatorial Note:</strong> The word <em className="italic">Aṣọ Òkè</em> literally translates to &quot;cloth from the highlands&quot; (or top-tier prestige cloth), signifying its revered rank in ceremonies.
                </p>
              </div>
            </div>
          </section>

          {/* -------------------------------------------------------------------
              SECTION 01: THE MATERIAL COMES FIRST
              With Three Historically Recognised Forms (Sányán, Àlàárì, Ẹ̀tù)
              ------------------------------------------------------------------- */}
          <section className="border-t border-[#E3DED5] pt-12 sm:pt-16">
            <div className="max-w-3xl mb-8">
              <span className="font-mono text-sm font-semibold text-[#A4401F] tracking-widest block mb-2">
                01 — The material comes first
              </span>
              <h3 className="font-display text-3xl sm:text-4xl text-[#171715] font-normal tracking-tight mb-4">
                Before a pattern emerges, there are fibres to prepare and threads to select.
              </h3>
              <p className="font-sans text-[15px] sm:text-[16px] leading-[1.75] text-[#4A4A48]">
                Historical Aṣọ Òkè textiles used materials including cotton, silk, and palm fibre. The choice of material influenced the cloth’s texture, appearance, and possibilities for design.
              </p>
            </div>

            {/* Three Historically Recognised Forms Cards — Sharp Edges */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {/* Sányán */}
              <div className="bg-[#FAF8F4] border border-[#E3DED5] rounded-none p-6 flex flex-col justify-between hover:border-[#A4401F]/50 transition-colors">
                <div>
                  <div className="h-2 bg-[#D7C4AA] mb-4 rounded-none" />
                  <span className="font-mono text-[10px] font-semibold text-[#A4401F] tracking-widest uppercase block mb-1">
                    UNDYED SILK · WILD SILKWORM
                  </span>
                  <h4 className="font-display text-2xl text-[#171715] mb-2 font-normal">
                    Sányán
                  </h4>
                  <p className="font-sans text-[13.5px] leading-[1.65] text-[#6B6B6B]">
                    Associated with undyed wild silk cocoons (Anaphe infracta) harvested from forest trees, resulting in a raw, luminous pale beige or honey-tan sheen.
                  </p>
                </div>
                <div className="mt-5 pt-3 border-t border-[#E3DED5] text-[11px] font-mono text-[#171715]">
                  Character: Natural shimmer &amp; crisp hand
                </div>
              </div>

              {/* Àlàárì */}
              <div className="bg-[#FAF8F4] border border-[#E3DED5] rounded-none p-6 flex flex-col justify-between hover:border-[#A4401F]/50 transition-colors">
                <div>
                  <div className="h-2 bg-[#8B1E3F] mb-4 rounded-none" />
                  <span className="font-mono text-[10px] font-semibold text-[#A4401F] tracking-widest uppercase block mb-1">
                    MAGENTA SILK · CAMWOOD DYE
                  </span>
                  <h4 className="font-display text-2xl text-[#171715] mb-2 font-normal">
                    Àlàárì
                  </h4>
                  <p className="font-sans text-[13.5px] leading-[1.65] text-[#6B6B6B]">
                    Associated with striking crimson, deep magenta, and rich scarlet tones. Historically prepared using silk filaments and natural vegetable extracts.
                  </p>
                </div>
                <div className="mt-5 pt-3 border-t border-[#E3DED5] text-[11px] font-mono text-[#171715]">
                  Character: Celebratory warmth &amp; regal vibrancy
                </div>
              </div>

              {/* Ẹ̀tù */}
              <div className="bg-[#FAF8F4] border border-[#E3DED5] rounded-none p-6 flex flex-col justify-between hover:border-[#A4401F]/50 transition-colors">
                <div>
                  <div className="h-2 bg-[#1A2849] mb-4 rounded-none" />
                  <span className="font-mono text-[10px] font-semibold text-[#A4401F] tracking-widest uppercase block mb-1">
                    INDIGO DYED · GUINEA FOWL
                  </span>
                  <h4 className="font-display text-2xl text-[#171715] mb-2 font-normal">
                    Ẹ̀tù
                  </h4>
                  <p className="font-sans text-[13.5px] leading-[1.65] text-[#6B6B6B]">
                    Associated with deep fermented indigo cotton yarns featuring fine white or light-blue pinstripes, named after the dappled plumage of the guinea fowl.
                  </p>
                </div>
                <div className="mt-5 pt-3 border-t border-[#E3DED5] text-[11px] font-mono text-[#171715]">
                  Character: Elder wisdom &amp; ancestral authority
                </div>
              </div>
            </div>

            {/* LOOK CLOSER Prompt 01 — Sharp Callout Box */}
            <div className="p-6 sm:p-7 bg-[#EFECE6]/60 border-l-3 border-[#A4401F] border-t border-r border-b border-[#E3DED5] rounded-none">
              <span className="font-mono text-xs font-semibold text-[#A4401F] tracking-[0.2em] uppercase block mb-2">
                LOOK CLOSER
              </span>
              <p className="font-display text-xl sm:text-2xl text-[#171715] font-normal leading-snug">
                How do the differences in colour, texture, and sheen change the character of each cloth?
              </p>
              <p className="font-sans text-xs text-[#6B6B6B] mt-2">
                Notice how Sányán reflects light softly through its untreated raw wild silk fibres, whereas Ẹ̀tù absorbs light deeply into the saturated indigo-dyed cotton cores.
              </p>
            </div>
          </section>

          {/* -------------------------------------------------------------------
              SECTION 02: UNDERSTANDING THE WEAVE
              Photograph 2 of 3: The Artisan at the Horizontal Narrow Loom
              ------------------------------------------------------------------- */}
          <section className="border-t border-[#E3DED5] pt-12 sm:pt-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
              {/* Left Column: IMAGE 2 OF 3 — The Making at the Loom */}
              <div className="lg:col-span-5 order-2 lg:order-1">
                <figure className="relative bg-[#EFECE6] border border-[#E3DED5] rounded-none overflow-hidden shadow-xs">
                  <div className="w-full aspect-[4/5] overflow-hidden bg-[#E2DED5]">
                    <img
                      src="https://res.cloudinary.com/jlggrwhm/image/upload/v1792517172/the_making.jpg"
                      alt="Traditional Nigerian loom weaving artisan preserving creative textile skills across generations"
                      loading="lazy"
                      className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-[1.03]"
                    />
                  </div>
                  <figcaption className="p-4 bg-[#FAF8F4] border-t border-[#E3DED5] rounded-none">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-mono text-[10px] font-semibold text-[#A4401F] tracking-widest uppercase">
                        PLATE 02 · THE HORIZONTAL LOOM
                      </span>
                      <span className="font-mono text-[10px] text-[#6B6B6B]">WORKSHOP STUDY</span>
                    </div>
                    <p className="font-sans text-xs text-[#6B6B6B] leading-relaxed">
                      Artisan orchestrating foot pedals, heddles, and the wooden shuttle. A drag-stone weight anchors the long warp threads stretching outside the workshop.
                    </p>
                  </figcaption>
                </figure>
              </div>

              {/* Right Column: Narrative Prose & Loom Principles */}
              <div className="lg:col-span-7 order-1 lg:order-2 flex flex-col">
                <span className="font-mono text-sm font-semibold text-[#A4401F] tracking-widest block mb-2">
                  02 — Understanding the weave
                </span>
                <h3 className="font-display text-3xl sm:text-4xl text-[#171715] font-normal tracking-tight mb-4">
                  Every woven cloth has a structure.
                </h3>
                <div className="space-y-4 font-sans text-[15px] sm:text-[16px] leading-[1.75] text-[#4A4A48] mb-6">
                  <p>
                    The warp threads run lengthwise along the loom, while the weft threads pass across them. The way these threads are arranged and interlaced determines the fabric’s structure and creates opportunities for stripes, checks, and other patterns.
                  </p>
                  <p>
                    In traditional Aṣọ Òkè production, weavers create relatively narrow strips on a horizontal loom.
                  </p>
                </div>

                {/* Technical Annotation Breakdown */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="p-4 bg-[#FAF8F4] border border-[#E3DED5] rounded-none">
                    <span className="font-mono text-[11px] font-semibold text-[#A4401F] block uppercase mb-1">
                      Warp (Òwú Ìtànnà)
                    </span>
                    <p className="font-sans text-xs text-[#6B6B6B] leading-normal">
                      Lengthwise stationary threads under continuous tension, determining base stripes and width.
                    </p>
                  </div>
                  <div className="p-4 bg-[#FAF8F4] border border-[#E3DED5] rounded-none">
                    <span className="font-mono text-[11px] font-semibold text-[#A4401F] block uppercase mb-1">
                      Weft (Òwú Àgbàdo)
                    </span>
                    <p className="font-sans text-xs text-[#6B6B6B] leading-normal">
                      Crosswise active threads thrown by shuttle through the shed opened by the foot pedals.
                    </p>
                  </div>
                </div>

                {/* LOOK CLOSER Prompt 02 — Sharp Callout Box */}
                <div className="p-6 bg-[#EFECE6]/60 border-l-3 border-[#A4401F] border-t border-r border-b border-[#E3DED5] rounded-none">
                  <span className="font-mono text-xs font-semibold text-[#A4401F] tracking-[0.2em] uppercase block mb-1.5">
                    LOOK CLOSER
                  </span>
                  <p className="font-display text-xl text-[#171715] font-normal leading-snug">
                    Follow the lengthwise and crosswise threads. Can you see how their arrangement creates the pattern?
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* -------------------------------------------------------------------
              SECTION 03: ONE CLOTH, MANY STRIPS
              Photograph 3 of 3: The Finished Cloth Worn in Splendour
              ------------------------------------------------------------------- */}
          <section className="border-t border-[#E3DED5] pt-12 sm:pt-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
              {/* Left Column: Narrative Prose */}
              <div className="lg:col-span-7 flex flex-col">
                <span className="font-mono text-sm font-semibold text-[#A4401F] tracking-widest block mb-2">
                  03 — One cloth, many strips
                </span>
                <h3 className="font-display text-3xl sm:text-4xl text-[#171715] font-normal tracking-tight mb-4">
                  A finished Aṣọ Òkè textile may be made by sewing several individually woven strips together along their edges.
                </h3>
                <div className="space-y-4 font-sans text-[15px] sm:text-[16px] leading-[1.75] text-[#4A4A48] mb-6">
                  <p>
                    This means the final composition involves more than weaving alone. The arrangement of the strips creates rhythmic repeats, variations, and larger visual structures that can transform the appearance of the entire piece.
                  </p>
                  <p>
                    Because each strip measures approximately four to six inches wide, an Agbádá gown or an Ìró wrapper requires assembling between fifteen and twenty-four distinct strips, matched thread-for-thread at every seam.
                  </p>
                </div>

                {/* LOOK CLOSER Prompt 03 — Sharp Callout Box */}
                <div className="p-6 bg-[#EFECE6]/60 border-l-3 border-[#A4401F] border-t border-r border-b border-[#E3DED5] rounded-none">
                  <span className="font-mono text-xs font-semibold text-[#A4401F] tracking-[0.2em] uppercase block mb-1.5">
                    LOOK CLOSER
                  </span>
                  <p className="font-display text-xl text-[#171715] font-normal leading-snug">
                    Observe how individual strips align or contrast. How does the seam become part of the composition?
                  </p>
                  <p className="font-sans text-xs text-[#6B6B6B] mt-2">
                    Notice how the seam is not hidden, but celebrated: master tailors use openwork stitching (abata) or contrasting thread to turn assembly into an intentional graphic rhythm.
                  </p>
                </div>
              </div>

              {/* Right Column: IMAGE 3 OF 3 — The Assembled Cloth Worn */}
              <div className="lg:col-span-5">
                <figure className="relative bg-[#EFECE6] border border-[#E3DED5] rounded-none overflow-hidden shadow-xs">
                  <div className="w-full aspect-[4/5] overflow-hidden bg-[#E2DED5]">
                    <img
                      src="https://res.cloudinary.com/jlggrwhm/image/upload/v1792517173/Regal_Yoruba_Portrait_in_a_Weathered_Courtyard.png"
                      alt="Regal Yoruba ceremonial dress formed by assembled strips of handwoven cloth"
                      loading="lazy"
                      className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-[1.03]"
                    />
                  </div>
                  <figcaption className="p-4 bg-[#FAF8F4] border-t border-[#E3DED5] rounded-none">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-mono text-[10px] font-semibold text-[#A4401F] tracking-widest uppercase">
                        PLATE 03 · THE ASSEMBLED COMPOSITION
                      </span>
                      <span className="font-mono text-[10px] text-[#6B6B6B]">REGAL ATTIRE</span>
                    </div>
                    <p className="font-sans text-xs text-[#6B6B6B] leading-relaxed">
                      The convergence of multiple strips into a monumental ceremonial silhouette. The rhythmic dialogue between seams, folds, and indigo dyes produces an architectural presence.
                    </p>
                  </figcaption>
                </figure>
              </div>
            </div>
          </section>

          {/* -------------------------------------------------------------------
              SECTION 04: LIVING TRADITION
              ------------------------------------------------------------------- */}
          <section className="border-t border-[#E3DED5] pt-12 sm:pt-16">
            <div className="max-w-3xl">
              <span className="font-mono text-sm font-semibold text-[#A4401F] tracking-widest block mb-2">
                04 — Living tradition
              </span>
              <h3 className="font-display text-3xl sm:text-4xl text-[#171715] font-normal tracking-tight mb-5">
                While rooted in history, Aṣọ Òkè continues to evolve.
              </h3>
              <div className="space-y-4 font-sans text-[15px] sm:text-[16px] leading-[1.75] text-[#4A4A48]">
                <p>
                  Contemporary weavers, designers, and wearers reinterpret traditional techniques, introducing new fibres, vibrant palettes, and inventive styling for modern occasions.
                </p>
                <p>
                  What endures is the relationship between cloth and identity: a way of wearing history that remains resolutely present.
                </p>
              </div>
            </div>

            {/* Contemporary Synthesis Grid — Sharp Edges */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="p-6 bg-[#FAF8F4] border border-[#E3DED5] rounded-none">
                <span className="font-mono text-xs font-semibold text-[#A4401F] uppercase block mb-1">
                  MATERIAL EVOLUTION
                </span>
                <p className="font-sans text-xs text-[#6B6B6B] leading-relaxed mt-2">
                  Metallic lurex threads, silk blends, and perforated eyelet patterns introduce new reflective surfaces into celebratory wear.
                </p>
              </div>
              <div className="p-6 bg-[#FAF8F4] border border-[#E3DED5] rounded-none">
                <span className="font-mono text-xs font-semibold text-[#A4401F] uppercase block mb-1">
                  STRUCTURAL TAILORING
                </span>
                <p className="font-sans text-xs text-[#6B6B6B] leading-relaxed mt-2">
                  Modern fashion houses integrate narrow-loom strips into structured trench coats, bustiers, footwear, and bespoke footwear.
                </p>
              </div>
              <div className="p-6 bg-[#FAF8F4] border border-[#E3DED5] rounded-none">
                <span className="font-mono text-xs font-semibold text-[#A4401F] uppercase block mb-1">
                  INTERGENERATIONAL MEMORY
                </span>
                <p className="font-sans text-xs text-[#6B6B6B] leading-relaxed mt-2">
                  Heirloom pieces are passed down through families, carrying the scent, blessings, and memories of weddings decades prior.
                </p>
              </div>
            </div>
          </section>

          {/* -------------------------------------------------------------------
              ARCHIVE CURATORIAL CONCLUSION
              Exact text matching user specification
              ------------------------------------------------------------------- */}
          <section className="border-t-2 border-[#171715] pt-12 sm:pt-16 bg-[#FAF8F4] rounded-none">
            <div className="max-w-3xl">
              <p className="font-serif italic text-2xl sm:text-3xl text-[#171715] leading-[1.3] mb-6 font-normal">
                Look closer at cloth not merely as fashion, but as knowledge made visible.
              </p>
              <div className="flex items-center space-x-3 mb-4">
                <span className="w-6 h-[1.5px] bg-[#A4401F]" />
                <h4 className="font-mono text-xs tracking-[0.24em] uppercase text-[#A4401F] font-semibold">
                  ARCHIVE — Nigerian Creative History
                </h4>
              </div>
              <p className="font-display text-xl sm:text-2xl text-[#171715] font-normal tracking-tight">
                Explore the material. Discover the process. Look closer at the story.
              </p>
            </div>
          </section>

          {/* =====================================================================
              MODAL FOOTER ACTIONS (Sharp Edges)
              ===================================================================== */}
          <footer className="border-t border-[#E3DED5] pt-10 pb-4 flex flex-col sm:flex-row items-center justify-between gap-6">
            <button
              type="button"
              onClick={handleScrollToTop}
              className="font-mono text-xs uppercase tracking-wider text-[#6B6B6B] hover:text-[#A4401F] transition-colors cursor-pointer flex items-center space-x-2 focus:outline-none focus-visible:ring-1 focus-visible:ring-[#A4401F]"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 15l-6-6-6 6" />
              </svg>
              <span>Back to top of monograph</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="px-7 py-3 rounded-none bg-[#171715] text-[#FAF8F4] hover:bg-[#A4401F] font-mono text-xs font-semibold tracking-wider uppercase transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A4401F]"
            >
              Close Monograph
            </button>
          </footer>
        </div>
      </div>
    </div>
  );
};
