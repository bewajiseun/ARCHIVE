import React, { useState, useEffect, useRef } from 'react';

interface ExhibitCard {
  id: string;
  seq: string;
  title: string;
  subtitle: string;
  image: string;
  alt: string;
  description: string;
  tags: string[];
}

const EXHIBIT_CARDS: ExhibitCard[] = [
  {
    id: 'garment',
    seq: '01',
    title: 'The Garment',
    subtitle: 'THE AGBÁDÁ AND ITS PRESENCE',
    image: '/assets/fashion-agbada.jpg',
    alt: 'Nigerian man wearing a traditional hand-woven striped aso-oke agbádá with coral bead necklace in front of earthen archway',
    description:
      'The agbádá commands physical and symbolic space. Worn for ceremonial milestones, its majestic four-piece architecture—the wide-sleeved awosoke robe, the gbariye vest, the sokoto trousers, and the matching fìlà—celebrates prestige, lineage, and communal dignity.',
    tags: ['Aso-Oke Strip Weave', 'Three-Piece Architecture', 'Ceremonial Majesty'],
  },
  {
    id: 'fila',
    seq: '02',
    title: 'The Fìlà',
    subtitle: 'THE ABẸ́TÍ AJÁ',
    image: '/assets/fashion-fila.jpg',
    alt: 'Macro view of a hand-woven striped aso-oke Abẹtí Ajá Fìlà cap with triangular folded flaps',
    description:
      'No agbádá is complete without the fìlà. The Abẹtí Ajá—literally "dog’s ears"—features dual triangular flaps that can be playfully angled forward, worn upright, or tilted left and right to signal mood, political affiliation, or courtly deference.',
    tags: ['Abẹtí Ajá Style', 'Ear-Flap Geometry', 'Cultural Demeanour'],
  },
  {
    id: 'making',
    seq: '03',
    title: 'The Making',
    subtitle: 'FROM THREAD TO CLOTH',
    image: '/assets/fashion-weaving.jpg',
    alt: 'Master weaver artisan operating the traditional wooden narrow-strip loom',
    description:
      'Strip by strip, thread by thread. On the traditional wooden narrow-strip loom, master weavers manipulate cotton warp and silk weft threads, pressing down the wooden beater to create narrow 4-inch bands (ẹkẹ) that are subsequently joined edge-to-edge into monumental cloth.',
    tags: ['Narrow-Strip Loom', 'Organic Cotton & Silk', 'Artisanal Lineage'],
  },
];

export const FashionRoomSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Scroll listener to calculate normalized scroll progress within the container
  useEffect(() => {
    if (prefersReducedMotion) return;

    let animationFrameId: number;

    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const containerHeight = containerRef.current.offsetHeight;
      const windowHeight = window.innerHeight;

      // Distance scrolled from top of section
      const scrolled = -rect.top;
      // Total scrollable range while sticky stage is visible
      const maxScroll = containerHeight - windowHeight;

      if (maxScroll <= 0) return;

      const progress = Math.min(Math.max(scrolled / maxScroll, 0), 1);
      setScrollProgress(progress);

      // Determine active card for accessibility & manual indicators
      if (progress < 0.33) {
        setActiveCardIndex(0);
      } else if (progress < 0.68) {
        setActiveCardIndex(1);
      } else {
        setActiveCardIndex(2);
      }
    };

    const onScroll = () => {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = requestAnimationFrame(handleScroll);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, [prefersReducedMotion]);

  // Manual jump to specific card state
  const jumpToCard = (targetIndex: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const containerTop = rect.top + scrollTop;
    const maxScroll = containerRef.current.offsetHeight - window.innerHeight;

    let targetRatio = 0.05;
    if (targetIndex === 1) targetRatio = 0.50;
    if (targetIndex === 2) targetRatio = 0.95;

    window.scrollTo({
      top: containerTop + targetRatio * maxScroll,
      behavior: 'smooth',
    });
    setActiveCardIndex(targetIndex);
  };

  /**
   * Calculate card style according to the FORWARD SCROLL-DRIVEN STACKING:
   *
   * Initial State (progress ~ 0):
   * - Card 1 (The Garment) is at the FRONT (topmost, y: 0, zIndex: 30).
   * - Card 2 (The Fìlà) is positioned BEHIND Card 1 (y: peek below, zIndex: 20).
   * - Card 3 (The Making) is positioned BEHIND Card 2 (y: peek further below, zIndex: 10).
   *
   * As scroll progresses (0 -> 0.5):
   * - Card 2 advances FORWARD, rising above Card 1.
   * - Card 2 becomes the topmost card (zIndex: 40), visually covering Card 1.
   *
   * As scroll progresses further (0.5 -> 1.0):
   * - Card 3 advances FORWARD, rising above Card 2.
   * - Card 3 becomes the topmost card (zIndex: 50), visually covering Card 2 & Card 1.
   *
   * Final State (progress ~ 1.0):
   * - Card 3 is ON TOP (zIndex: 50).
   * - Card 2 is behind Card 3 (zIndex: 40).
   * - Card 1 is at the back of the stack (zIndex: 30).
   */
  const getCardStyle = (cardIndex: number) => {
    if (prefersReducedMotion) {
      // In reduced motion, simply stack sequentially based on activeCardIndex
      return {
        zIndex: cardIndex === activeCardIndex ? 50 : 20 - cardIndex,
        transform: `translateY(${cardIndex * 16}px)`,
        opacity: cardIndex === activeCardIndex ? 1 : 0.75,
      };
    }

    // Responsive peek offsets
    const basePeek = typeof window !== 'undefined' && window.innerWidth < 768 ? 95 : 135;

    if (cardIndex === 0) {
      // Card 1: Starts at y: 0, zIndex: 30.
      // When Card 2 rises over it (progress > 0.2), Card 1 slightly recedes (scale: 0.985, opacity: 0.85).
      const recedeProgress = Math.min(Math.max((scrollProgress - 0.15) / 0.35, 0), 1);
      const scale = 1 - recedeProgress * 0.02;
      const opacity = 1 - recedeProgress * 0.20;

      return {
        zIndex: 30, // Initially in front of Card 2 (20) & Card 3 (10)
        transform: `translateY(0px) scale(${scale})`,
        opacity,
        boxShadow: '0 8px 30px rgba(23,23,21,0.12)',
      };
    }

    if (cardIndex === 1) {
      // Card 2: Starts behind Card 1 (zIndex: 20) with y: basePeek.
      // From progress 0.15 to 0.50, it rises to y: 0 and elevates to zIndex: 40 (ABOVE Card 1).
      // Then from progress 0.55 to 0.90, Card 3 rises above it, so Card 2 slightly recedes.
      const riseProgress = Math.min(Math.max((scrollProgress - 0.12) / 0.38, 0), 1);
      const recedeProgress = Math.min(Math.max((scrollProgress - 0.58) / 0.35, 0), 1);

      const y = (1 - riseProgress) * basePeek;
      // Crucial forward stacking logic: Once rising begins, Card 2 is visually on top of Card 1
      const isTopmost = riseProgress > 0.45;
      const zIndex = isTopmost ? 40 : 20;

      const scale = 1 - recedeProgress * 0.02;
      const opacity = isTopmost ? 1 - recedeProgress * 0.15 : 0.9;

      return {
        zIndex,
        transform: `translateY(${y}px) scale(${scale})`,
        opacity,
        boxShadow: isTopmost
          ? '0 16px 40px rgba(23,23,21,0.18), 0 0 0 1px rgba(164,64,31,0.3)'
          : '0 4px 20px rgba(23,23,21,0.08)',
      };
    }

    if (cardIndex === 2) {
      // Card 3: Starts behind Card 2 & Card 1 (zIndex: 10) with y: basePeek * 2.
      // From progress 0.50 to 0.92, it rises to y: 0 and elevates to zIndex: 50 (ABOVE Card 2 & Card 1).
      const riseProgress = Math.min(Math.max((scrollProgress - 0.48) / 0.44, 0), 1);

      const y = (1 - riseProgress) * (basePeek * 2);
      // Crucial forward stacking logic: At final state, Card 3 is at the very front
      const isTopmost = riseProgress > 0.45;
      const zIndex = isTopmost ? 50 : 10;

      return {
        zIndex,
        transform: `translateY(${y}px) scale(1)`,
        opacity: 1,
        boxShadow: isTopmost
          ? '0 20px 50px rgba(23,23,21,0.22), 0 0 0 1px rgba(164,64,31,0.4)'
          : '0 4px 20px rgba(23,23,21,0.08)',
      };
    }

    return {};
  };

  return (
    <section
      id="rooms"
      ref={containerRef}
      aria-label="Fashion Room: Look closer"
      className="relative w-full bg-[#FAF8F4] text-[#171715] overflow-clip"
      style={{
        // 260vh height on desktop gives generous, smooth, responsive scroll-track for forward stacking
        minHeight: prefersReducedMotion ? 'auto' : '260vh',
      }}
    >
      {/* Subtle background tactile grid / texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-5 bg-[radial-gradient(#A4401F_1px,transparent_1px)] [background-size:24px_24px]"
        aria-hidden="true"
      />

      {/* Sticky Stage Container: Pins in viewport while user scrolls through the 260vh container */}
      <div
        className={`${
          prefersReducedMotion
            ? 'relative py-12'
            : 'sticky top-0 h-screen max-h-[1080px] flex flex-col justify-start pt-5 md:pt-8 pb-4'
        } w-full max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 overflow-hidden`}
      >
        {/* =========================================================================
            A. TOP INTRODUCTION: Sits horizontally ABOVE the stacked cards
            ========================================================================= */}
        <div className="w-full flex-shrink-0 mb-3 sm:mb-4 pt-1">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 lg:gap-8 items-end pb-3 sm:pb-4 border-b border-[#E3DED5]">
            {/* Left side: Tag identifier + Headline */}
            <div className="lg:col-span-7 flex flex-col items-start">
              <div className="flex items-center space-x-2 text-[11px] font-mono tracking-[0.24em] uppercase text-[#A4401F] mb-1.5 font-medium">
                <span className="w-6 h-[1.5px] bg-[#A4401F] inline-block" aria-hidden="true" />
                <span>FEATURED STORY</span>
              </div>

              <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-[#171715] leading-[0.98] tracking-tight">
                <span>Look </span>
                <span className="italic text-[#A4401F] font-normal">closer.</span>
              </h2>
            </div>

            {/* Right side: Supporting narrative text aligned horizontally */}
            <div className="lg:col-span-5 flex flex-col justify-end">
              <p className="font-sans text-[14px] sm:text-[15px] md:text-[15.5px] leading-[1.6] text-[#6B6B6B] max-w-[420px]">
                Every photograph holds more than a moment. Look closer at the people, places, and details that reveal the stories behind the image.
              </p>
            </div>
          </div>

          {/* Forward Stacking Progress Bar & Accessible Indicator */}
          <div className="flex items-center justify-between mt-2.5 text-[11px] font-mono uppercase text-[#6B6B6B]">
            <div className="flex items-center space-x-2">
              <span className="text-[#A4401F] font-semibold">STAGE:</span>
              <span className="text-[#171715]">
                {activeCardIndex === 0 && '01 THE GARMENT (FRONT)'}
                {activeCardIndex === 1 && '02 THE FÌLÀ (ADVANCED FORWARD)'}
                {activeCardIndex === 2 && '03 THE MAKING (TOPMOST LEAD)'}
              </span>
            </div>

            {/* Step navigation pills */}
            <div className="flex items-center space-x-1" role="tablist" aria-label="Exhibit cards">
              {EXHIBIT_CARDS.map((card, idx) => (
                <button
                  key={card.id}
                  type="button"
                  role="tab"
                  aria-selected={activeCardIndex === idx}
                  onClick={() => jumpToCard(idx)}
                  className={`px-2.5 py-1 text-[10px] tracking-wider transition-colors cursor-pointer border ${
                    activeCardIndex === idx
                      ? 'border-[#A4401F] bg-[#A4401F] text-[#FFFFFF] font-semibold'
                      : 'border-[#E3DED5] bg-[#FAF8F4] text-[#6B6B6B] hover:border-[#A4401F] hover:text-[#171715]'
                  }`}
                  style={{ borderRadius: '0px' }}
                >
                  {card.seq}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* =========================================================================
            B. THREE STACKED EXHIBIT CARDS: FORWARD SCROLL-DRIVEN STACKING
            ========================================================================= */}
        <div className="relative w-full mt-2 sm:mt-3 flex-1 min-h-[380px] md:min-h-[440px] max-h-[560px] pb-4">
          <div className="relative w-full h-full">
            {EXHIBIT_CARDS.map((card, idx) => {
              const cardStyle = getCardStyle(idx);

              return (
                <article
                  key={card.id}
                  id={`exhibit-card-${card.id}`}
                  style={cardStyle}
                  className="absolute inset-x-0 top-0 h-[360px] sm:h-[400px] md:h-[440px] lg:h-[470px] bg-[#FAF8F4] border border-[#E3DED5] transition-transform duration-300 ease-out will-change-transform flex flex-col md:flex-row overflow-hidden"
                >
                  {/* Left Column: Editorial Information (~38% width) */}
                  <div className="w-full md:w-[40%] lg:w-[35%] p-6 sm:p-8 flex flex-col justify-between border-b md:border-b-0 md:border-r border-[#E3DED5] bg-[#FAF8F4] z-10 flex-shrink-0">
                    <div>
                      {/* Sequence Identifier */}
                      <div className="flex items-center space-x-2 text-xs font-mono text-[#171715] mb-2 sm:mb-4">
                        <span className="text-[#A4401F] font-semibold text-sm">{card.seq}</span>
                        <span className="w-5 h-[1.5px] bg-[#A4401F]" aria-hidden="true" />
                        <span className="text-[10px] tracking-[0.2em] uppercase text-[#6B6B6B] font-mono">
                          EXHIBIT ARTEFACT
                        </span>
                      </div>

                      {/* Card Title */}
                      <h3 className="font-display text-3xl sm:text-4xl lg:text-[42px] text-[#171715] leading-[1.05] tracking-tight">
                        {card.title}
                      </h3>

                      {/* Card Subtitle */}
                      <p className="font-mono text-[11px] sm:text-[11.5px] tracking-[0.18em] uppercase text-[#6B6B6B] mt-2 pb-3 border-b border-[#E3DED5]">
                        {card.subtitle}
                      </p>

                      {/* Editorial Narrative — Readable dark-ink text on warm paper */}
                      <p className="font-sans text-xs sm:text-[13px] md:text-sm text-[#171715] mt-3 leading-relaxed hidden sm:block">
                        {card.description}
                      </p>
                    </div>

                    {/* Metadata Tags / Micro-spec */}
                    <div className="pt-3 border-t border-[#E3DED5] flex flex-wrap gap-1.5 mt-2">
                      {card.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 text-[9px] font-mono uppercase tracking-wider text-[#171715] bg-[#FAF8F4] border border-[#E3DED5]"
                          style={{ borderRadius: '0px' }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Right Column: Full-Bleed Authentic Photography (~62% width) */}
                  <div className="relative w-full md:w-[60%] lg:w-[65%] h-full bg-[#171715] overflow-hidden flex-1">
                    <img
                      src={card.image}
                      alt={card.alt}
                      className="w-full h-full object-cover object-center filter saturate-[1.05] contrast-[1.05] transition-transform duration-700 ease-out hover:scale-[1.02]"
                      loading={idx === 0 ? 'eager' : 'lazy'}
                    />

                    {/* Subtle warm archival vignette */}
                    <div
                      className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[#FAF8F4]/20 via-transparent to-transparent pointer-events-none"
                      aria-hidden="true"
                    />

                    {/* Image Caption Watermark */}
                    <div className="absolute bottom-3 right-4 z-10 bg-[#171715]/90 backdrop-blur-xs px-2.5 py-1 border border-[#E3DED5]/30 text-[9.5px] font-mono tracking-widest text-[#FAF8F4] uppercase">
                      ARCHIVE NIGERIA · 0{idx + 1}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
