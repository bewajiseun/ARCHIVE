import React, { useState, useEffect } from 'react';
import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';

export interface RoomItem {
  id: string;
  title: string;
  description: string;
  image: string;
  alt: string;
  tone: 'bw' | 'sepia';
}

const ROOMS_DATA: RoomItem[] = [
  {
    id: 'photography',
    title: 'Photography',
    description: 'People, places, and moments that capture Nigeria’s story.',
    image: '/assets/rooms-photography.jpg',
    alt: 'Nigerian street photographer documenting everyday Lagos street life with vintage rangefinder camera',
    tone: 'bw',
  },
  {
    id: 'music',
    title: 'Music',
    description: 'Sounds, movements, and voices that shaped generations.',
    image: '/assets/rooms-music.jpg',
    alt: 'Nigerian highlife musician playing saxophone in vintage Lagos club in warm sepia tone',
    tone: 'sepia',
  },
  {
    id: 'fashion',
    title: 'Fashion',
    description: 'Cloth, craft, and identity — from traditional roots to contemporary expressions.',
    image: '/assets/rooms-fashion.jpg',
    alt: 'Black and white editorial portrait of Nigerian woman in ceremonial gele headwrap and coral beads',
    tone: 'bw',
  },
  {
    id: 'design',
    title: 'Design',
    description: 'Ideas, objects, and spaces that reflect Nigerian creativity and innovation.',
    image: '/assets/rooms-design.jpg',
    alt: 'Warm sepia architectural photograph of modernist Nigerian geometric concrete facade',
    tone: 'sepia',
  },
];

export const ExploreRoomsSection: React.FC = () => {
  // Fashion (index 2) is the initially active card
  const [activeIndex, setActiveIndex] = useState(2);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? ROOMS_DATA.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === ROOMS_DATA.length - 1 ? 0 : prev + 1));
  };

  const handleCardClick = (index: number) => {
    setActiveIndex(index);
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setActiveIndex(index);
    }
  };

  return (
    <section
      id="explore-rooms"
      aria-label="Explore the Rooms Exhibition"
      className="relative w-full bg-[#FAF8F4] text-[#171715] py-20 md:py-28 overflow-hidden select-none"
    >
      {/* Archival deckled paper fragments & background texture accents */}
      <div className="absolute inset-0 pointer-events-none opacity-40 select-none overflow-hidden" aria-hidden="true">
        {/* Subtle deckled archival paper slips behind card stage */}
        <div className="absolute top-[48%] left-[8%] w-[84%] h-[240px] bg-[#E3DED5]/40 border border-[#E3DED5]/80 -rotate-1 transform pointer-events-none" />
        <div className="absolute top-[52%] left-[12%] w-[78%] h-[200px] bg-[#D5D0C1]/30 border border-[#D5D0C1]/60 rotate-1 transform pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 flex flex-col items-center">
        {/* =========================================================================
            1. SECTION INTRODUCTION (Center-aligned with generous breathing room)
            ========================================================================= */}
        <div className="text-center max-w-2xl mx-auto flex flex-col items-center">
          {/* Eyebrow flanked by subtle terracotta rules */}
          <div className="flex items-center justify-center space-x-3 text-[11px] font-mono tracking-[0.24em] uppercase text-[#A4401F] font-semibold mb-3">
            <span className="w-8 h-[1px] bg-[#A4401F]" aria-hidden="true" />
            <span>EXPLORE THE ROOMS</span>
            <span className="w-8 h-[1px] bg-[#A4401F]" aria-hidden="true" />
          </div>

          {/* Display Headline */}
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-[#171715] leading-[1.04] tracking-tight">
            <span>Four rooms. </span>
            <span className="italic text-[#A4401F] font-normal">Many stories.</span>
          </h2>

          {/* Supporting Copy */}
          <p className="font-sans text-[15px] sm:text-[16px] md:text-[16.5px] leading-[1.6] text-[#6B6B6B] mt-4 max-w-[560px]">
            Explore Nigeria’s creative history through the people, places, and ideas
            that continue to shape who we are.
          </p>
        </div>

        {/* =========================================================================
            GENEROUS VERTICAL GAP (Target: 64px - 88px on desktop)
            ========================================================================= */}
        <div className="h-14 sm:h-16 md:h-20 lg:h-22 w-full" aria-hidden="true" />

        {/* =========================================================================
            2. FOUR OVERLAPPING RECTANGULAR CARDS (Restrained 82–88% content width)
            ========================================================================= */}
        <div
          role="region"
          aria-label="Interactive room cards"
          className="relative w-full max-w-[1140px] mx-auto min-h-[460px] md:min-h-[500px] flex items-center justify-center"
        >
          {/* Desktop/Tablet Overlapping Composition */}
          <div className="hidden sm:flex items-center justify-center w-full relative">
            {ROOMS_DATA.map((room, idx) => {
              const isActive = activeIndex === idx;
              const isHovered = hoveredIndex === idx;

              // Calculate stacking z-index:
              // Active card always gets the highest (40)
              // Hovered inactive card gets a temporary boost (30)
              // Other cards follow a natural layered order (10 to 20)
              let zIndex = 10 + idx;
              if (isActive) {
                zIndex = 40;
              } else if (isHovered) {
                zIndex = 30;
              }

              // Overlapping negative margin offset:
              // Cards overlap horizontally by approximately -24px to -44px
              const overlapStyle = idx > 0 ? '-ml-8 md:-ml-12 lg:-ml-14' : '';

              // Dynamic elevation & dimensions
              // Active card is visibly taller (~450px) & wider (~310px) with strong shadow
              // Inactive cards are more compact (~380px tall, ~260px wide)
              const cardWidth = isActive ? 'w-[290px] md:w-[320px] lg:w-[335px]' : 'w-[240px] md:w-[260px] lg:w-[275px]';
              const cardHeight = isActive ? 'h-[440px] md:h-[480px] lg:h-[490px]' : 'h-[370px] md:h-[400px] lg:h-[415px]';

              return (
                <article
                  key={room.id}
                  id={`room-card-${room.id}`}
                  role="button"
                  tabIndex={0}
                  aria-pressed={isActive}
                  aria-label={`${room.title} room: ${room.description}`}
                  onClick={() => handleCardClick(idx)}
                  onKeyDown={(e) => handleKeyDown(e, idx)}
                  onMouseEnter={() => setHoveredIndex(idx)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  style={{
                    zIndex,
                    borderRadius: '0px',
                    transition: prefersReducedMotion
                      ? 'none'
                      : 'transform 420ms cubic-bezier(0.25, 1, 0.5, 1), box-shadow 420ms ease, opacity 350ms ease, width 420ms cubic-bezier(0.25, 1, 0.5, 1), height 420ms cubic-bezier(0.25, 1, 0.5, 1)',
                  }}
                  className={`relative ${overlapStyle} ${cardWidth} ${cardHeight} flex-shrink-0 cursor-pointer border border-[#E3DED5] overflow-hidden group select-none bg-[#171715] will-change-transform ${
                    isActive
                      ? 'shadow-[0_24px_50px_rgba(23,23,21,0.38)] -translate-y-3 sm:-translate-y-4'
                      : isHovered
                      ? 'shadow-[0_16px_36px_rgba(23,23,21,0.25)] -translate-y-1.5 opacity-95'
                      : 'shadow-[0_8px_20px_rgba(23,23,21,0.18)] opacity-90'
                  }`}
                >
                  {/* Full-bleed Photography (Coordinated 2 B&W + 2 Sepia images) */}
                  <div className="absolute inset-0 w-full h-full bg-[#171715] overflow-hidden">
                    <img
                      src={room.image}
                      alt={room.alt}
                      className={`w-full h-full object-cover object-center transition-transform duration-700 ease-out ${
                        isHovered || isActive ? 'scale-105' : 'scale-100'
                      }`}
                      style={{
                        filter:
                          room.tone === 'bw'
                            ? 'grayscale(100%) contrast(1.08)'
                            : 'sepia(45%) saturate(1.1) contrast(1.04)',
                      }}
                      loading="lazy"
                    />

                    {/* Gradient overlay to ensure text legibility */}
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-[#171715] via-[#171715]/60 to-transparent pointer-events-none"
                      aria-hidden="true"
                    />

                    {/* Subtle warm paper tint overlay on all cards */}
                    <div
                      className="absolute inset-0 bg-[#A4401F]/5 mix-blend-color-burn pointer-events-none"
                      aria-hidden="true"
                    />
                  </div>

                  {/* Foreground Content: Title, Description, and Lower-Left Arrow Icon */}
                  <div className="relative z-10 w-full h-full p-5 md:p-6 lg:p-7 flex flex-col justify-end">
                    <div>
                      {/* Discipline Title (Instrument Serif) */}
                      <h3
                        className={`font-display text-[#FAF8F4] tracking-tight leading-[1.08] transition-all duration-300 ${
                          isActive ? 'text-3xl md:text-4xl' : 'text-2xl md:text-3xl'
                        }`}
                      >
                        {room.title}
                      </h3>

                      {/* Discipline Description (Inter) */}
                      <p
                        className={`font-sans text-xs md:text-[13px] leading-relaxed text-[#D5D0C1] mt-2 transition-all duration-300 ${
                          isActive ? 'line-clamp-3 opacity-100' : 'line-clamp-2 opacity-85'
                        }`}
                      >
                        {room.description}
                      </p>

                      {/* Lower-left Arrow Icon: Terracotta when Active, Neutral when Inactive */}
                      <div className="mt-4 pt-3 border-t border-[#FAF8F4]/15 flex items-center justify-between">
                        <div
                          aria-hidden="true"
                          className={`w-9 h-9 flex items-center justify-center rounded-full transition-colors duration-300 ${
                            isActive
                              ? 'bg-[#A4401F] text-[#FAF8F4] shadow-md'
                              : 'bg-[#FAF8F4]/15 text-[#FAF8F4] border border-[#FAF8F4]/30 group-hover:bg-[#FAF8F4]/25'
                          }`}
                        >
                          <ArrowUpRight className="w-4 h-4 stroke-[2]" />
                        </div>

                        {isActive && (
                          <span className="text-[10px] font-mono tracking-widest uppercase text-[#FAF8F4]/80">
                            ACTIVE ROOM
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          {/* Mobile Layout: Responsive Single-Active Card Stage with Smooth Carousel Feel */}
          <div className="sm:hidden w-full flex flex-col items-center">
            {ROOMS_DATA.map((room, idx) => {
              if (idx !== activeIndex) return null;

              return (
                <article
                  key={room.id}
                  id={`room-mobile-${room.id}`}
                  style={{ borderRadius: '0px' }}
                  className="w-full max-w-[320px] h-[420px] relative border border-[#E3DED5] overflow-hidden bg-[#171715] shadow-xl animate-in fade-in zoom-in-95 duration-300"
                >
                  <img
                    src={room.image}
                    alt={room.alt}
                    className="w-full h-full object-cover object-center"
                    style={{
                      filter:
                        room.tone === 'bw'
                          ? 'grayscale(100%) contrast(1.08)'
                          : 'sepia(45%) saturate(1.1) contrast(1.04)',
                    }}
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-[#171715] via-[#171715]/60 to-transparent pointer-events-none" />

                  <div className="relative z-10 w-full h-full p-6 flex flex-col justify-end">
                    <h3 className="font-display text-3xl text-[#FAF8F4] tracking-tight">
                      {room.title}
                    </h3>
                    <p className="font-sans text-xs leading-relaxed text-[#D5D0C1] mt-2">
                      {room.description}
                    </p>

                    <div className="mt-4 pt-3 border-t border-[#FAF8F4]/15 flex items-center justify-between">
                      <div className="w-9 h-9 rounded-full bg-[#A4401F] text-[#FAF8F4] flex items-center justify-center">
                        <ArrowUpRight className="w-4 h-4 stroke-[2]" />
                      </div>
                      <span className="text-[10px] font-mono tracking-widest uppercase text-[#FAF8F4]/80">
                        ROOM 0{idx + 1}
                      </span>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        {/* =========================================================================
            3. MINIMAL BOTTOM NAVIGATION (Previous, Indicators, Next)
            ========================================================================= */}
        <div className="mt-12 md:mt-16 flex items-center justify-center space-x-4">
          {/* Previous Button (Rectangular, 0px border radius) */}
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous creative room"
            className="w-11 h-11 border border-[#171715] bg-[#FAF8F4] text-[#171715] hover:bg-[#171715] hover:text-[#FAF8F4] flex items-center justify-center transition-colors duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A4401F]"
            style={{ borderRadius: '0px' }}
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Four Small Pagination Indicators */}
          <div className="flex items-center space-x-2" role="tablist" aria-label="Room selection indicators">
            {ROOMS_DATA.map((room, idx) => (
              <button
                key={`dot-${room.id}`}
                type="button"
                role="tab"
                aria-selected={activeIndex === idx}
                aria-label={`Select ${room.title} room`}
                onClick={() => setActiveIndex(idx)}
                className={`transition-all duration-300 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A4401F] ${
                  activeIndex === idx
                    ? 'w-6 h-2 bg-[#A4401F]'
                    : 'w-2 h-2 bg-[#D5D0C1] hover:bg-[#A4401F]/60'
                }`}
                style={{ borderRadius: '0px' }}
              />
            ))}
          </div>

          {/* Next Button (Rectangular, 0px border radius) */}
          <button
            type="button"
            onClick={handleNext}
            aria-label="Next creative room"
            className="w-11 h-11 border border-[#171715] bg-[#FAF8F4] text-[#171715] hover:bg-[#171715] hover:text-[#FAF8F4] flex items-center justify-center transition-colors duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A4401F]"
            style={{ borderRadius: '0px' }}
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
