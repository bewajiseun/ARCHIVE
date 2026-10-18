import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export interface StoryCardItem {
  id: string;
  seq: string;
  title: string;
  description: string;
  image: string;
  alt: string;
}

const STORY_CARDS: StoryCardItem[] = [
  {
    id: 'the-cloth',
    seq: '01',
    title: 'The Cloth',
    description:
      'A closer look at Aṣọ Ọ̀kè — its texture, patterns, colours and the meaning woven into every thread.',
    image: '/assets/asooke-cloth.jpg',
    alt: 'Detailed macro close-up of traditional hand-woven Aṣọ Ọ̀kè cloth with indigo and terracotta stripes',
  },
  {
    id: 'hands-that-weave',
    seq: '02',
    title: 'The Hands That Weave',
    description:
      'The skilled artisans, traditional techniques and the care behind every strip of cloth.',
    image: '/assets/fashion-weaving.jpg',
    alt: 'Master artisan hands operating the traditional wooden narrow-strip loom',
  },
  {
    id: 'worn-across-generations',
    seq: '03',
    title: 'Worn Across Generations',
    description:
      'Explore how Aṣọ Ọ̀kè appears in ceremonies, communities and everyday life.',
    image: '/assets/asooke-worn.jpg',
    alt: 'Nigerian woman wearing a magnificent sculpted Aṣọ Ọ̀kè gele headwrap and ceremonial shawl',
  },
  {
    id: 'living-today',
    seq: '04',
    title: 'Living Today',
    description:
      'Discover how contemporary creatives continue to interpret and work with Aṣọ Ọ̀kè.',
    image: '/assets/asooke-living.jpg',
    alt: 'Contemporary Nigerian fashion model in a tailored modern jacket crafted from woven Aṣọ Ọ̀kè',
  },
];

export const ThreadsOfGenerationsSection: React.FC = () => {
  // Continuous fractional position index: 0.0 -> 4.0
  const [position, setPosition] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isTouching, setIsTouching] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // Animation refs
  const positionRef = useRef(0);
  const isHoveredRef = useRef(false);
  const isTouchingRef = useRef(false);
  const isTransitioningRef = useRef(false);
  const targetPositionRef = useRef<number | null>(null);
  const touchStartXRef = useRef(0);
  const touchCurrentXRef = useRef(0);

  // Sync state with refs
  isHoveredRef.current = isHovered;
  isTouchingRef.current = isTouching;
  positionRef.current = position;

  // Reduced motion detection
  useEffect(() => {
    setIsClient(true);
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Continuous animation loop using requestAnimationFrame
  useEffect(() => {
    if (prefersReducedMotion) return;

    let lastTime = performance.now();
    let animationFrameId: number;

    const tick = (now: number) => {
      const dt = (now - lastTime) / 1000;
      lastTime = now;

      // Handle programmatic smooth transitions (e.g. from Prev/Next buttons)
      if (targetPositionRef.current !== null) {
        const diff = targetPositionRef.current - positionRef.current;
        if (Math.abs(diff) < 0.005) {
          positionRef.current = targetPositionRef.current;
          targetPositionRef.current = null;
          isTransitioningRef.current = false;
        } else {
          positionRef.current += diff * Math.min(dt * 8, 0.4);
        }
        setPosition(positionRef.current);
      } else if (!isHoveredRef.current && !isTouchingRef.current) {
        // Continuous right-to-left automatic movement
        // Completes one full card transition approximately every 4.8 seconds
        const speed = 0.22; // units per second
        positionRef.current += speed * dt;
        setPosition(positionRef.current);
      }

      animationFrameId = requestAnimationFrame(tick);
    };

    animationFrameId = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(animationFrameId);
  }, [prefersReducedMotion]);

  // Navigation button handlers
  const handleNext = useCallback(() => {
    const currentBase = positionRef.current;
    targetPositionRef.current = Math.floor(currentBase + 1);
    isTransitioningRef.current = true;
  }, []);

  const handlePrev = useCallback(() => {
    const currentBase = positionRef.current;
    targetPositionRef.current = Math.ceil(currentBase - 1);
    isTransitioningRef.current = true;
  }, []);

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsTouching(true);
    touchStartXRef.current = e.touches[0].clientX;
    touchCurrentXRef.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchCurrentXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const deltaX = touchStartXRef.current - touchCurrentXRef.current;
    if (Math.abs(deltaX) > 40) {
      if (deltaX > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
    setIsTouching(false);
  };

  // Dimensions based on responsive breakpoints
  const isMobile = isClient && typeof window !== 'undefined' && window.innerWidth < 768;
  const isTablet = isClient && typeof window !== 'undefined' && window.innerWidth >= 768 && window.innerWidth < 1024;

  const featuredWidth = isMobile ? 320 : isTablet ? 480 : 640;
  const compactWidth = isMobile ? 150 : isTablet ? 220 : 280;
  const cardGap = isMobile ? 16 : 24;
  const cardHeight = isMobile ? 380 : 450;

  // Calculate current card indexing
  const numCards = STORY_CARDS.length;
  // Normalized cyclic index (0..3.999...)
  const normalizedPos = ((position % numCards) + numCards) % numCards;
  const activeIndex = Math.floor(normalizedPos);
  const transitionFraction = normalizedPos - activeIndex; // 0 to 1

  // Virtual card items to render (we render a 6-card rolling sequence for seamless looping)
  const renderIndices: number[] = [];
  for (let i = -1; i <= 4; i++) {
    renderIndices.push(i);
  }

  return (
    <section
      id="stories"
      aria-label="Threads of Generations: Aṣọ Ọ̀kè Exhibition"
      className="relative w-full bg-[#321F18] text-[#FAF8F4] py-16 md:py-24 overflow-hidden select-none"
    >
      {/* Subtle background tactile grid texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-5 bg-[radial-gradient(#A4401F_1px,transparent_1px)] [background-size:24px_24px]"
        aria-hidden="true"
      />

      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16">
        {/* =========================================================================
            A. TOP INTRODUCTION: Stays 100% stationary above the moving carousel
            ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end mb-12 md:mb-16">
          {/* Left Column: Eyebrow + Heading */}
          <div className="lg:col-span-7 flex flex-col items-start">
            <div className="flex items-center space-x-2.5 text-[11px] font-mono tracking-[0.24em] uppercase text-[#A4401F] mb-3 font-medium">
              <span className="w-7 h-[1.5px] bg-[#A4401F] inline-block" aria-hidden="true" />
              <span>FEATURED STORY</span>
            </div>

            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-[68px] text-[#FAF8F4] leading-[0.96] tracking-tight">
              <span>Threads of </span>
              <span className="italic text-[#A4401F] font-normal">Generations</span>
            </h2>
          </div>

          {/* Right Column: Supporting Text + Link */}
          <div className="lg:col-span-5 flex flex-col justify-end">
            <p className="font-sans text-[14.5px] sm:text-[15.5px] md:text-[16px] leading-[1.6] text-[#D5D0C1] max-w-[460px]">
              Explore the story of Aṣọ Ọ̀kè — a textile tradition that weaves together
              identity, artistry and legacy across generations. From the cloth and the
              craft, to the people who keep it alive, discover how threads carry stories,
              communities and culture.
            </p>

            <div className="mt-4">
              <a
                href="#explore-rooms"
                className="inline-flex items-center font-sans text-xs sm:text-sm font-medium tracking-wide text-[#A4401F] hover:text-[#FAF8F4] transition-colors border-b border-[#A4401F]/50 pb-0.5"
              >
                <span>Explore the rooms</span>
                <span className="ml-1.5" aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>

        {/* =========================================================================
            B. HORIZONTALLY MOVING CAROUSEL WITH DYNAMIC POSITION-BASED RESIZING
            ========================================================================= */}
        <div
          role="region"
          aria-label="Aṣọ Ọ̀kè Story Cards Carousel"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          className="relative w-full cursor-grab active:cursor-grabbing overflow-visible focus:outline-none"
          tabIndex={0}
        >
          {/* Carousel Track Stage */}
          <div
            className="relative w-full"
            style={{
              height: `${cardHeight}px`,
            }}
          >
            {renderIndices.map((offsetIndex) => {
              // Exact story card from dataset
              const rawIndex = activeIndex + offsetIndex;
              const cardDataIndex = ((rawIndex % numCards) + numCards) % numCards;
              const card = STORY_CARDS[cardDataIndex];

              // Continuous position relative to the left featured zone (0 = perfectly featured)
              const distFromFeatured = offsetIndex - transitionFraction;

              // Calculate dynamic position-based width:
              // When distFromFeatured is in [-1, 0], it is contracting from featuredWidth -> compactWidth
              // When distFromFeatured is in [0, 1], it is expanding from compactWidth -> featuredWidth as it approaches 0
              let cardWidth = compactWidth;
              let isFeatured = false;

              if (distFromFeatured >= -1 && distFromFeatured <= 0) {
                // Card leaving feature zone: shrinks from featuredWidth to compactWidth
                const progress = -distFromFeatured; // 0 (featured) to 1 (compact)
                cardWidth = featuredWidth - progress * (featuredWidth - compactWidth);
                if (progress < 0.5) isFeatured = true;
              } else if (distFromFeatured > 0 && distFromFeatured <= 1) {
                // Card approaching feature zone: grows from compactWidth to featuredWidth
                const progress = 1 - distFromFeatured; // 0 (compact) to 1 (featured)
                cardWidth = compactWidth + progress * (featuredWidth - compactWidth);
                if (progress > 0.5) isFeatured = true;
              } else {
                cardWidth = compactWidth;
              }

              // Compute horizontal X position in the continuous track
              // We compute X by integrating widths from offsetIndex = -1 to current
              let xPos = 0;

              if (offsetIndex === -1) {
                // Exiting to left
                const exitWidth = featuredWidth - (1 - transitionFraction) * (featuredWidth - compactWidth);
                xPos = -exitWidth - cardGap + transitionFraction * (exitWidth + cardGap);
              } else if (offsetIndex === 0) {
                // The currently exiting card
                xPos = -transitionFraction * (compactWidth + cardGap);
              } else {
                // Subsequent cards
                const currentCardWidth = featuredWidth - transitionFraction * (featuredWidth - compactWidth);
                let acc = currentCardWidth + cardGap - transitionFraction * (compactWidth + cardGap);

                for (let k = 1; k < offsetIndex; k++) {
                  const kDist = k - transitionFraction;
                  let kw = compactWidth;
                  if (kDist >= 0 && kDist <= 1) {
                    kw = compactWidth + (1 - kDist) * (featuredWidth - compactWidth);
                  }
                  acc += kw + cardGap;
                }
                xPos = acc;
              }

              // Determine visual depth and contrast
              const zIndex = isFeatured ? 30 : Math.max(10 - Math.abs(offsetIndex), 1);
              const isLead = Math.abs(distFromFeatured) < 0.45;

              return (
                <article
                  key={`card-${rawIndex}-${card.id}`}
                  style={{
                    width: `${cardWidth}px`,
                    height: `${cardHeight}px`,
                    transform: `translate3d(${xPos}px, 0, 0)`,
                    zIndex,
                    borderRadius: '0px',
                  }}
                  className={`absolute top-0 left-0 bg-[#321F18] overflow-hidden will-change-transform transition-[border-color,box-shadow] duration-300 ${
                    isLead
                      ? 'border border-[#A4401F]/80 shadow-[0_16px_40px_rgba(0,0,0,0.6)]'
                      : 'border border-[#E3DED5]/20 shadow-[0_8px_20px_rgba(0,0,0,0.3)]'
                  }`}
                >
                  {/* Card Interior: Adapts fluidly between featured (horizontal split) and compact (vertical stack) */}
                  <div className="relative w-full h-full flex flex-col md:flex-row">
                    {/* Editorial Text Area */}
                    <div
                      className={`z-10 flex flex-col justify-between p-6 sm:p-7 bg-[#321F18] border-b md:border-b-0 md:border-r border-[#E3DED5]/20 transition-all duration-300 ${
                        isLead
                          ? 'w-full md:w-[48%] flex-shrink-0'
                          : 'w-full md:w-full absolute bottom-0 inset-x-0 bg-gradient-to-t from-[#321F18] via-[#321F18]/90 to-transparent p-5 sm:p-6'
                      }`}
                    >
                      <div>
                        {/* Number Tag with terracotta accent */}
                        <div className="flex items-center space-x-2 text-xs font-mono text-[#FAF8F4] mb-2 sm:mb-3">
                          <span className="text-[#A4401F] font-semibold text-sm">{card.seq}</span>
                          <span className="w-5 h-[1.5px] bg-[#A4401F]" aria-hidden="true" />
                          <span className="text-[10px] tracking-[0.2em] uppercase text-[#D5D0C1] font-mono">
                            AṢỌ Ọ̀KÈ
                          </span>
                        </div>

                        {/* Story Title */}
                        <h3
                          className={`font-display text-[#FAF8F4] leading-[1.05] tracking-tight ${
                            isLead ? 'text-3xl sm:text-4xl' : 'text-2xl sm:text-2xl line-clamp-2'
                          }`}
                        >
                          {card.title}
                        </h3>

                        {/* Story Description — Readable warm paper text */}
                        <p
                          className={`font-sans text-[#FAF8F4] leading-relaxed mt-3 ${
                            isLead
                              ? 'text-xs sm:text-[13.5px] line-clamp-4'
                              : 'text-xs line-clamp-2 text-[#FAF8F4]/90'
                          }`}
                        >
                          {card.description}
                        </p>
                      </div>

                      {/* Clean bottom space - ZERO arrows inside cards as explicitly commanded */}
                      <div className="mt-4 pt-3 border-t border-[#E3DED5]/20 flex items-center justify-between">
                        <span className="text-[10px] font-mono tracking-wider uppercase text-[#A4401F]">
                          {isLead ? 'ACTIVE FEATURE' : 'STORY PREVIEW'}
                        </span>
                        <span className="text-[9.5px] font-mono tracking-widest text-[#D5D0C1]/80 uppercase">
                          ARCHIVE · 0{cardDataIndex + 1}
                        </span>
                      </div>
                    </div>

                    {/* Image Area */}
                    <div
                      className={`relative overflow-hidden bg-[#171715] flex-1 ${
                        isLead ? 'w-full md:w-[52%] h-full' : 'w-full h-full'
                      }`}
                    >
                      <img
                        src={card.image}
                        alt={card.alt}
                        className="w-full h-full object-cover object-center filter saturate-[1.05] transition-transform duration-700 ease-out hover:scale-105"
                        loading="lazy"
                      />

                      {/* Subtle warm archival vignette */}
                      <div
                        className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[#321F18]/40 via-transparent to-transparent pointer-events-none"
                        aria-hidden="true"
                      />
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        {/* =========================================================================
            C. MANUAL NAVIGATION & PROGRESS ROW (Strictly Below the Carousel)
            ========================================================================= */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-6 pt-4 border-t border-[#E3DED5]/20">
          {/* Previous and Next Buttons (Rectangular, 0px border radius, sharp corners) */}
          <div className="flex items-center space-x-3">
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous story card"
              className="w-11 h-11 border border-[#E3DED5]/30 bg-[#321F18] text-[#FAF8F4] hover:bg-[#A4401F] hover:border-[#A4401F] hover:text-[#FFFFFF] flex items-center justify-center transition-colors duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A4401F]"
              style={{ borderRadius: '0px' }}
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={handleNext}
              aria-label="Next story card"
              className="w-11 h-11 border border-[#E3DED5]/30 bg-[#321F18] text-[#FAF8F4] hover:bg-[#A4401F] hover:border-[#A4401F] hover:text-[#FFFFFF] flex items-center justify-center transition-colors duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A4401F]"
              style={{ borderRadius: '0px' }}
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Thin Horizontal Progress Indicator */}
          <div className="flex-1 max-w-md w-full flex items-center space-x-4">
            <div className="relative w-full h-[2px] bg-[#E3DED5]/20 overflow-hidden">
              <div
                className="absolute top-0 bottom-0 bg-[#A4401F] transition-all duration-300 ease-out"
                style={{
                  left: `${((activeIndex) / numCards) * 100}%`,
                  width: `${(1 / numCards) * 100}%`,
                }}
              />
            </div>

            {/* Current Active Step Display */}
            <span className="font-mono text-xs tracking-wider uppercase text-[#D5D0C1] whitespace-nowrap">
              0{activeIndex + 1} / 0{numCards}
            </span>
          </div>

          {/* Autoplay / Hover Status Indicator */}
          <div className="hidden md:flex items-center space-x-2 text-[10.5px] font-mono tracking-widest text-[#D5D0C1]/80 uppercase">
            <span
              className={`w-2 h-2 rounded-full ${
                isHovered || prefersReducedMotion ? 'bg-[#D5D0C1]' : 'bg-[#A4401F] animate-pulse'
              }`}
            />
            <span>{isHovered ? 'PAUSED ON HOVER' : prefersReducedMotion ? 'MANUAL CONTROL' : 'CONTINUOUS CAROUSEL'}</span>
          </div>
        </div>
      </div>
    </section>
  );
};
