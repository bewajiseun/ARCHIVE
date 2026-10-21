import React, { useEffect, useRef } from 'react';

interface SkillsAcrossGenerationsModalProps {
  isOpen: boolean;
  onClose: () => void;
  triggerElementRef?: React.RefObject<HTMLElement | null>;
}

export const SkillsAcrossGenerationsModal: React.FC<SkillsAcrossGenerationsModalProps> = ({
  isOpen,
  onClose,
  triggerElementRef,
}) => {
  const modalScrollRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Focus trap, body scroll lock, and escape key handler
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

  const handleScrollToTop = () => {
    modalScrollRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="skills-modal-title"
      aria-describedby="skills-modal-intro"
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
              THE LIVING PRACTICE
            </span>
            <span className="text-[#D5D0C1] font-mono text-xs hidden sm:inline">|</span>
            <span className="font-mono text-xs text-[#6B6B6B] tracking-wider hidden sm:inline">
              EXHIBITION MONOGRAPH · ROOM 02 · CARD 03
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
            EDITORIAL MONOGRAPH BODY (Sharp Edges, 4 Chapters, 4 Documentary Images)
            ===================================================================== */}
        <div className="p-6 sm:p-10 md:p-12 lg:p-16 flex flex-col space-y-16 sm:space-y-20 max-w-[960px] mx-auto w-full">
          
          {/* -------------------------------------------------------------------
              PROLOGUE / INTRODUCTION SECTION
              Central idea: A craft survives when its knowledge is practised, shared, and adapted.
              ------------------------------------------------------------------- */}
          <section className="flex flex-col">
            <div className="inline-flex items-center space-x-2.5 mb-3.5">
              <span className="w-2.5 h-2.5 bg-[#A4401F] rounded-none" />
              <p className="font-mono text-xs font-semibold tracking-[0.24em] uppercase text-[#A4401F]">
                THE LIVING PRACTICE
              </p>
            </div>

            <h1
              id="skills-modal-title"
              className="font-display text-4xl sm:text-5xl lg:text-[56px] text-[#171715] font-normal leading-[1.03] tracking-tight uppercase"
            >
              Skills Across Generations
            </h1>

            <h2 className="font-serif italic text-2xl sm:text-[30px] text-[#A4401F] mt-2 mb-6 font-normal">
              A craft survives when its knowledge is practised.
            </h2>

            {/* Introductory Statement */}
            <div
              id="skills-modal-intro"
              className="border-l-3 border-[#A4401F] pl-5 py-2.5 mb-8 bg-[#A4401F]/5 rounded-none max-w-3xl"
            >
              <p className="font-sans text-[17px] sm:text-[18px] leading-[1.65] text-[#171715] font-medium">
                Traditional creative knowledge lives in more than finished objects. It also lives in the hands that make them, the tools they use, the techniques they practise, and the people who learn from them.
              </p>
            </div>

            <p className="font-sans text-[15px] sm:text-[16px] leading-[1.75] text-[#4A4A48] max-w-3xl">
              Across Nigeria, creative practices continue through observation, repetition, teaching, and experimentation. Explore how skills are carried forward while allowing room for new interpretations.
            </p>

            {/* Four-Chapter Index Strip */}
            <div className="mt-8 pt-6 border-t border-[#E3DED5] grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { num: '01', label: 'Learning Through Practice' },
                { num: '02', label: 'Tools That Hold Knowledge' },
                { num: '03', label: 'Techniques Passed Forward' },
                { num: '04', label: 'Keeping the Practice Alive' },
              ].map((item) => (
                <div key={item.num} className="p-3 bg-[#EFECE6]/50 border border-[#E3DED5] rounded-none">
                  <span className="font-mono text-xs font-semibold text-[#A4401F] block">{item.num}</span>
                  <span className="font-sans text-xs text-[#171715] font-medium mt-0.5 block leading-snug">{item.label}</span>
                </div>
              ))}
            </div>
          </section>

          {/* -------------------------------------------------------------------
              CHAPTER 01 — LEARNING THROUGH PRACTICE
              Image 1: Experienced artisan guiding a learner
              ------------------------------------------------------------------- */}
          <section className="border-t border-[#E3DED5] pt-12 sm:pt-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
              {/* Left Column: Chapter Narrative & Observation Prompt */}
              <div className="lg:col-span-7 flex flex-col">
                <span className="font-mono text-xs font-semibold text-[#A4401F] tracking-widest uppercase block mb-2">
                  CHAPTER 01
                </span>
                <h3 className="font-display text-3xl sm:text-4xl text-[#171715] font-normal tracking-tight mb-5">
                  Learning Through Practice
                </h3>

                <div className="space-y-4 font-sans text-[15px] sm:text-[16px] leading-[1.75] text-[#4A4A48] mb-8">
                  <p>
                    Many traditional skills are learned through close observation and hands-on practice. A learner watches how an experienced maker handles materials, repeats the process, receives guidance, and gradually develops the judgement needed to work independently.
                  </p>
                  <p>
                    This kind of learning passes on more than instructions. It develops an understanding of timing, pressure, texture, materials, and the small adjustments that experience teaches.
                  </p>
                </div>

                {/* Observation Prompt — Visually distinguished, non-interactive callout */}
                <div className="p-6 bg-[#EFECE6]/60 border-l-3 border-[#A4401F] border-t border-r border-b border-[#E3DED5] rounded-none">
                  <span className="font-mono text-[11px] font-semibold text-[#A4401F] tracking-[0.2em] uppercase block mb-1.5">
                    OBSERVATION PROMPT
                  </span>
                  <p className="font-display text-xl text-[#171715] font-normal leading-snug">
                    What can a learner understand by watching the maker&apos;s hands that written instructions might not fully explain?
                  </p>
                </div>
              </div>

              {/* Right Column: IMAGE 1 — Learning Through Practice */}
              <div className="lg:col-span-5">
                <figure className="relative bg-[#EFECE6] border border-[#E3DED5] rounded-none overflow-hidden shadow-xs">
                  <div className="w-full aspect-[4/5] overflow-hidden bg-[#E2DED5]">
                    <img
                      src="https://res.cloudinary.com/jlggrwhm/image/upload/v1792528181/Df2Syl3AM1wltBdCTQiJIeranY7SYURaVf7WOx98AWPSw_F_MTn1B7biaDqjC0CBcOnKuwVU1tgK8jSczU-rqwejUxWg-5McddMPKz925SN_l8qMZTx6oLIoSxcOTmlICIAJ4yyb2h2YKw-FG-vp1Kn1nrVkyWxLtZ8ScM_zlUsK9FRe_d5ZOHnxbB4BjMkt.jpg"
                      alt="An artisan guiding a learner through a traditional craft technique."
                      loading="lazy"
                      className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-[1.02]"
                    />
                  </div>
                  <figcaption className="p-4 bg-[#FAF8F4] border-t border-[#E3DED5] rounded-none">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-mono text-[10px] font-semibold text-[#A4401F] tracking-widest uppercase">
                        PLATE 01 · PRACTICE
                      </span>
                      <span className="font-mono text-[10px] text-[#6B6B6B]">MENTORSHIP STUDY</span>
                    </div>
                    <p className="font-sans text-xs text-[#6B6B6B] leading-relaxed">
                      An artisan guiding a learner through a traditional craft technique. Tactile transmission of finger placement, thread tension, and bodily coordination.
                    </p>
                  </figcaption>
                </figure>
              </div>
            </div>
          </section>

          {/* -------------------------------------------------------------------
              CHAPTER 02 — TOOLS THAT HOLD KNOWLEDGE
              Image 2: Traditional craft tools, loom parts, shuttles, threads
              ------------------------------------------------------------------- */}
          <section className="border-t border-[#E3DED5] pt-12 sm:pt-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
              {/* Left Column: IMAGE 2 — Tools That Hold Knowledge */}
              <div className="lg:col-span-5 order-2 lg:order-1">
                <figure className="relative bg-[#EFECE6] border border-[#E3DED5] rounded-none overflow-hidden shadow-xs">
                  <div className="w-full aspect-[4/5] overflow-hidden bg-[#E2DED5]">
                    <img
                      src="https://res.cloudinary.com/jlggrwhm/image/upload/v1792528181/3PSM4EeqguH-qZlTWhZAc7ODt4NP279pLkPOF7Nhy3Wqgi2_LvNjMeVaGF4N4x2guaqdp2KgBsrq5ZQd1kdpZLdfm79k8GA-e2aBUdpSkxhNJppBhfpruu9CLnKme6A5BM3_YrjaLfVdVzZV_EeQ03_XbrTuQl0xffVQamsQSVw.jpg"
                      alt="Traditional craft tools and materials used in textile making."
                      loading="lazy"
                      className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-[1.02]"
                    />
                  </div>
                  <figcaption className="p-4 bg-[#FAF8F4] border-t border-[#E3DED5] rounded-none">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-mono text-[10px] font-semibold text-[#A4401F] tracking-widest uppercase">
                        PLATE 02 · IMPLEMENTS
                      </span>
                      <span className="font-mono text-[10px] text-[#6B6B6B]">MATERIAL ARCHIVE</span>
                    </div>
                    <p className="font-sans text-xs text-[#6B6B6B] leading-relaxed">
                      Traditional craft tools and materials used in textile making. Carved wooden shuttles, tension frames, and spooled yarns designed specifically for narrow-strip weaving.
                    </p>
                  </figcaption>
                </figure>
              </div>

              {/* Right Column: Chapter Narrative & Observation Prompt */}
              <div className="lg:col-span-7 order-1 lg:order-2 flex flex-col">
                <span className="font-mono text-xs font-semibold text-[#A4401F] tracking-widest uppercase block mb-2">
                  CHAPTER 02
                </span>
                <h3 className="font-display text-3xl sm:text-4xl text-[#171715] font-normal tracking-tight mb-5">
                  Tools That Hold Knowledge
                </h3>

                <div className="space-y-4 font-sans text-[15px] sm:text-[16px] leading-[1.75] text-[#4A4A48] mb-8">
                  <p>
                    Tools shape the way a craft is practised. A loom holds threads in position; a shuttle carries yarn through the weave; dyeing and pattern-making tools help artisans create particular effects.
                  </p>
                  <p>
                    Understanding a tool means looking beyond its appearance to discover what it enables the maker to do. Its form, handling, and relationship with other tools are all part of the process.
                  </p>
                </div>

                {/* Observation Prompt — Visually distinguished, non-interactive callout */}
                <div className="p-6 bg-[#EFECE6]/60 border-l-3 border-[#A4401F] border-t border-r border-b border-[#E3DED5] rounded-none">
                  <span className="font-mono text-[11px] font-semibold text-[#A4401F] tracking-[0.2em] uppercase block mb-1.5">
                    OBSERVATION PROMPT
                  </span>
                  <p className="font-display text-xl text-[#171715] font-normal leading-snug">
                    Look at the tools. What action does each one make possible?
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* -------------------------------------------------------------------
              CHAPTER 03 — TECHNIQUES PASSED FORWARD
              Image 3: Artisan actively practising a traditional textile technique
              ------------------------------------------------------------------- */}
          <section className="border-t border-[#E3DED5] pt-12 sm:pt-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
              {/* Left Column: Chapter Narrative & Observation Prompt */}
              <div className="lg:col-span-7 flex flex-col">
                <span className="font-mono text-xs font-semibold text-[#A4401F] tracking-widest uppercase block mb-2">
                  CHAPTER 03
                </span>
                <h3 className="font-display text-3xl sm:text-4xl text-[#171715] font-normal tracking-tight mb-5">
                  Techniques Passed Forward
                </h3>

                <div className="space-y-4 font-sans text-[15px] sm:text-[16px] leading-[1.75] text-[#4A4A48] mb-8">
                  <p>
                    Traditional techniques are built through practice. Weaving, resist-dyeing, and other textile processes involve a sequence of decisions that influence the final result.
                  </p>
                  <p>
                    The artisan must understand how materials respond, how steps relate to one another, and how to recognise when a process is working as intended. These skills develop through experience and can be refined as knowledge passes between makers.
                  </p>
                </div>

                {/* Observation Prompt — Visually distinguished, non-interactive callout */}
                <div className="p-6 bg-[#EFECE6]/60 border-l-3 border-[#A4401F] border-t border-r border-b border-[#E3DED5] rounded-none">
                  <span className="font-mono text-[11px] font-semibold text-[#A4401F] tracking-[0.2em] uppercase block mb-1.5">
                    OBSERVATION PROMPT
                  </span>
                  <p className="font-display text-xl text-[#171715] font-normal leading-snug">
                    Follow the process. Which steps must happen in sequence, and what might change if one step is done differently?
                  </p>
                </div>
              </div>

              {/* Right Column: IMAGE 3 — Techniques Passed Forward */}
              <div className="lg:col-span-5">
                <figure className="relative bg-[#EFECE6] border border-[#E3DED5] rounded-none overflow-hidden shadow-xs">
                  <div className="w-full aspect-[4/5] overflow-hidden bg-[#E2DED5]">
                    <img
                      src="https://res.cloudinary.com/jlggrwhm/image/upload/v1792528181/jlpdrCdi-dH4rFe9HykEqEUZhoE7ZiXIc4G7gpOEVY-Ih8bvCDY-imPmTk5RDqr1EsD9COIIzFXTObcasH08DT1BN9V1ppIklDbfHDR8wKWZmmo3VdNuCgvFiQJAGtiD0lCGKeg1ojbB69j09oRuuQu9u6eNPnGw_lJiFHIBEw7PeD_NkLgj8n4wdbIVJIwk.jpg"
                      alt="An artisan practising a traditional textile-making technique."
                      loading="lazy"
                      className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-[1.02]"
                    />
                  </div>
                  <figcaption className="p-4 bg-[#FAF8F4] border-t border-[#E3DED5] rounded-none">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-mono text-[10px] font-semibold text-[#A4401F] tracking-widest uppercase">
                        PLATE 03 · TECHNIQUE
                      </span>
                      <span className="font-mono text-[10px] text-[#6B6B6B]">WORKBENCH STUDY</span>
                    </div>
                    <p className="font-sans text-xs text-[#6B6B6B] leading-relaxed">
                      An artisan practising a traditional textile-making technique. Constant observation of the interlacing fibres maintains uniform edge density and structural integrity.
                    </p>
                  </figcaption>
                </figure>
              </div>
            </div>
          </section>

          {/* -------------------------------------------------------------------
              CHAPTER 04 — KEEPING THE PRACTICE ALIVE
              Image 4: Traditional textile knowledge in contemporary creative practice
              ------------------------------------------------------------------- */}
          <section className="border-t border-[#E3DED5] pt-12 sm:pt-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
              {/* Left Column: IMAGE 4 — Keeping the Practice Alive */}
              <div className="lg:col-span-5 order-2 lg:order-1">
                <figure className="relative bg-[#EFECE6] border border-[#E3DED5] rounded-none overflow-hidden shadow-xs">
                  <div className="w-full aspect-[4/5] overflow-hidden bg-[#E2DED5]">
                    <img
                      src="https://res.cloudinary.com/jlggrwhm/image/upload/v1792528181/HiXtAgFts1E4LegMNkkNDSwzpg-i1A0HwXH0paCfpYLq2YFCzUWOsr9Y7SpHCHfKfxdx2WNYXNitMhWtZwyYrB2guEfURRSM1FEVHDMQmYeAnujhBIfeeE_fbnGSB723xWhLF-OeDyr5XVg7buSFP3e_LWIIZ0FYu0at-SZ_PdQ.jpg"
                      alt="Traditional textile craftsmanship continuing in a contemporary creative practice."
                      loading="lazy"
                      className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-[1.02]"
                    />
                  </div>
                  <figcaption className="p-4 bg-[#FAF8F4] border-t border-[#E3DED5] rounded-none">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-mono text-[10px] font-semibold text-[#A4401F] tracking-widest uppercase">
                        PLATE 04 · CONTEMPORARY PRACTICE
                      </span>
                      <span className="font-mono text-[10px] text-[#6B6B6B]">LIVING STUDIO</span>
                    </div>
                    <p className="font-sans text-xs text-[#6B6B6B] leading-relaxed">
                      Traditional textile craftsmanship continuing in a contemporary creative practice. Integrating ancestral loom wisdom into modern collaborative workshops and educational spheres.
                    </p>
                  </figcaption>
                </figure>
              </div>

              {/* Right Column: Chapter Narrative & Observation Prompt */}
              <div className="lg:col-span-7 order-1 lg:order-2 flex flex-col">
                <span className="font-mono text-xs font-semibold text-[#A4401F] tracking-widest uppercase block mb-2">
                  CHAPTER 04
                </span>
                <h3 className="font-display text-3xl sm:text-4xl text-[#171715] font-normal tracking-tight mb-5">
                  Keeping the Practice Alive
                </h3>

                <div className="space-y-4 font-sans text-[15px] sm:text-[16px] leading-[1.75] text-[#4A4A48] mb-8">
                  <p>
                    Traditional knowledge continues when people have opportunities to practise, teach, document, and reinterpret it.
                  </p>
                  <p>
                    Workshops, apprenticeships, community teaching, archives, and contemporary creative collaborations can all help skills reach new audiences. New materials and applications may change the outcome without necessarily erasing the knowledge behind the technique.
                  </p>
                  <p className="font-medium text-[#171715]">
                    The important question is not whether a tradition remains unchanged, but how its knowledge continues to be understood, used, and passed forward.
                  </p>
                </div>

                {/* Observation Prompt — Visually distinguished, non-interactive callout */}
                <div className="p-6 bg-[#EFECE6]/60 border-l-3 border-[#A4401F] border-t border-r border-b border-[#E3DED5] rounded-none">
                  <span className="font-mono text-[11px] font-semibold text-[#A4401F] tracking-[0.2em] uppercase block mb-1.5">
                    OBSERVATION PROMPT
                  </span>
                  <p className="font-display text-xl text-[#171715] font-normal leading-snug">
                    How does this contemporary application build on an older technique? What has changed, and what knowledge remains?
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* -------------------------------------------------------------------
              CLOSING SECTION — A LIVING TRADITION
              Exact text matching user specification
              ------------------------------------------------------------------- */}
          <section className="border-t-2 border-[#171715] pt-12 sm:pt-16 bg-[#FAF8F4] rounded-none">
            <div className="max-w-3xl">
              <span className="font-mono text-xs font-semibold tracking-[0.24em] uppercase text-[#A4401F] block mb-3">
                CONCLUSION
              </span>
              <h3 className="font-display text-3xl sm:text-4xl lg:text-[42px] text-[#171715] font-normal leading-[1.1] mb-6 tracking-tight">
                A Living Tradition
              </h3>

              <div className="space-y-4 font-sans text-[16px] sm:text-[17px] leading-[1.75] text-[#4A4A48] mb-8">
                <p className="font-medium text-[#171715]">
                  A living tradition is not simply preserved. It is learned, practised, shared, and given room to evolve.
                </p>
                <p>
                  Every tool carries a purpose. Every technique requires knowledge. Every new maker has the opportunity to carry that knowledge forward.
                </p>
              </div>

              <div className="pt-6 border-t border-[#E3DED5]">
                <div className="flex items-center space-x-3 mb-3">
                  <span className="w-6 h-[1.5px] bg-[#A4401F]" />
                  <h4 className="font-mono text-xs tracking-[0.24em] uppercase text-[#A4401F] font-semibold">
                    ARCHIVE — Nigerian Creative History
                  </h4>
                </div>
                <p className="font-serif italic text-2xl sm:text-[26px] text-[#171715] font-normal leading-relaxed">
                  Explore the practice. Discover the knowledge. Look closer at the story.
                </p>
              </div>
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
