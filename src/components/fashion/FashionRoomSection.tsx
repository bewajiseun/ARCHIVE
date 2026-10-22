import React, { useState, useEffect, useRef } from 'react';
import { ScrollReveal } from '../motion/ScrollReveal';
import { SectionTwoEditorialModal } from './SectionTwoEditorialModal';

export interface CloserCardData {
  id: string;
  seq: string;
  title: string;
  description: string;
  imageUrl: string;
  imageFallback: string;
  alt: string;
}

const CLOSER_CARDS: CloserCardData[] = [
  {
    id: 'card-01',
    seq: '01',
    title: 'Dress, identity and heritage',
    description:
      'See how clothing, adornment and personal style express culture, status and creativity across generations.',
    imageUrl:
      'https://res.cloudinary.com/jlggrwhm/image/upload/v1792517173/Regal_Yoruba_Portrait_in_a_Weathered_Courtyard.png',
    imageFallback: '/assets/Regal_Yoruba_Portrait.png',
    alt: 'Regal Yoruba portrait in traditional dress and adornment in a weathered courtyard',
  },
  {
    id: 'card-02',
    seq: '02',
    title: 'Textiles and craftsmanship',
    description:
      'Explore how Aṣọ Òkè is made, the people behind it, and the cultural meaning woven into every thread.',
    imageUrl:
      'https://res.cloudinary.com/jlggrwhm/image/upload/v1792517172/thread_by_thread.jpg',
    imageFallback: '/assets/thread_by_thread.jpg',
    alt: 'Detailed view of woven Aṣọ Òkè textile threads and craftsmanship',
  },
  {
    id: 'card-03',
    seq: '03',
    title: 'Skills across generations',
    description:
      'Explore the tools, techniques and creative practices that keep traditional knowledge alive today.',
    imageUrl:
      'https://res.cloudinary.com/jlggrwhm/image/upload/v1792517172/the_making.jpg',
    imageFallback: '/assets/the_making.jpg',
    alt: 'Traditional loom weaving artisan preserving creative textile skills across generations',
  },
];

interface CardItemProps {
  card: CloserCardData;
  onExpand: (card: CloserCardData, triggerEl?: HTMLElement) => void;
}

const CloserCardItem: React.FC<CardItemProps> = ({ card, onExpand }) => {
  const [imgSrc, setImgSrc] = useState(card.imageUrl);
  const cardButtonRef = useRef<HTMLButtonElement>(null);

  const handleTrigger = () => {
    onExpand(card, cardButtonRef.current ?? undefined);
  };

  return (
    <article
      className="group relative w-full bg-[#FAF8F4] border border-[#E3DED5] rounded-none overflow-hidden shadow-xs hover:border-[#A4401F]/50 hover:shadow-md transition-all duration-300 flex flex-col"
    >
      {/* Upper Area: Prominent Archival Photograph — Sharp Edges */}
      <div className="relative w-full h-[280px] sm:h-[320px] lg:h-[350px] overflow-hidden bg-[#EFECE6] flex-shrink-0 cursor-pointer rounded-none">
        <img
          src={imgSrc}
          alt={card.alt}
          loading="lazy"
          onError={() => setImgSrc(card.imageFallback)}
          className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        />
        {/* Subtle hover overlay cue */}
        <div
          onClick={handleTrigger}
          className="absolute inset-0 bg-transparent group-hover:bg-[#171715]/10 transition-colors duration-300"
          aria-hidden="true"
        />
      </div>

      {/* Lower Area: Clean Editorial Text Panel — Sharp Edges */}
      <div className="p-6 sm:p-7 flex flex-col justify-between flex-1 min-h-[190px] bg-[#FAF8F4] rounded-none">
        <div>
          {/* Small Terracotta Number */}
          <span className="font-mono text-xs font-semibold text-[#A4401F] tracking-widest block mb-2">
            {card.seq}
          </span>

          {/* Title & Small Expand Icon */}
          <div className="flex items-start justify-between gap-3 mb-2.5">
            <h3 className="font-display text-2xl sm:text-[26px] lg:text-[28px] text-[#171715] font-normal leading-[1.12] tracking-tight">
              {card.title}
            </h3>

            {/* Expand Icon matching reference — Sharp Edges */}
            <button
              ref={cardButtonRef}
              type="button"
              onClick={handleTrigger}
              aria-label={`Open ${card.title}`}
              className="p-2 text-[#6B6B6B] hover:text-[#FAF8F4] hover:bg-[#171715] border border-[#E3DED5] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A4401F] transition-colors cursor-pointer mt-0.5 flex-shrink-0 rounded-none"
              title="Open story"
            >
              <svg
                className="w-3.5 h-3.5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
              </svg>
            </button>
          </div>

          {/* Concise Supporting Description */}
          <p className="font-sans text-[14px] sm:text-[14.5px] leading-[1.6] text-[#6B6B6B]">
            {card.description}
          </p>
        </div>

        {/* Editorial Action Link */}
        <div className="pt-4 mt-4 flex items-center justify-between border-t border-[#E3DED5]/60">
          <button
            type="button"
            onClick={handleTrigger}
            className="inline-flex items-center text-xs font-mono font-medium text-[#A4401F] hover:text-[#7F3018] transition-colors cursor-pointer group-hover:underline"
          >
            <span>Read story</span>
            <span className="ml-1.5 transition-transform duration-200 group-hover:translate-x-1">→</span>
          </button>
        </div>
      </div>
    </article>
  );
};

export const FashionRoomSection: React.FC = () => {
  const [selectedCard, setSelectedCard] = useState<CloserCardData | null>(null);
  const activeTriggerRef = useRef<HTMLElement | null>(null);

  const handleOpenCard = (card: CloserCardData, triggerEl?: HTMLElement) => {
    if (triggerEl) {
      activeTriggerRef.current = triggerEl;
    }
    setSelectedCard(card);
  };

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedCard(null);
      }
    };
    if (selectedCard) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedCard]);

  return (
    <section
      id="rooms"
      aria-label="Look closer exhibition"
      className="relative w-full bg-[#FAF8F4] text-[#171715] py-20 sm:py-28 lg:py-32 scroll-mt-12 sm:scroll-mt-16 md:scroll-mt-20 overflow-hidden"
    >
      <div className="w-full max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16">
        {/* =========================================================================
            DESKTOP STAGGERED LAYOUT (lg & above)
            Reproduces exact reference arrangement:
            - Text block: upper left
            - Card 01: upper right
            - Card 02: lower left (beneath text block)
            - Card 03: lower right (beneath Card 01)
            ========================================================================= */}
        <div className="hidden lg:grid lg:grid-cols-2 gap-12 xl:gap-16 items-start">
          {/* LEFT COLUMN: Text Block (Upper Left) + Card 02 (Lower Left) */}
          <div className="flex flex-col">
            {/* Introductory Text Block */}
            <ScrollReveal className="max-w-[480px] mb-16 xl:mb-24 pt-2" delayMs={50}>
              <p className="font-mono text-xs font-semibold tracking-[0.24em] uppercase text-[#A4401F] mb-3">
                LOOK CLOSER
              </p>
              <h2 className="font-display text-4xl sm:text-5xl lg:text-[52px] xl:text-[56px] text-[#171715] leading-[1.04] tracking-tight font-normal">
                Discover the details that tell a bigger story.
              </h2>
              <p className="font-sans text-[15px] sm:text-[16px] leading-[1.65] text-[#6B6B6B] mt-6 max-w-[440px]">
                Every object, image and sound holds clues about the people, places and ideas that shaped Nigeria’s creative history.
              </p>
            </ScrollReveal>

            {/* Card 02: Lower Left (beneath text block) */}
            <ScrollReveal className="w-full" delayMs={160}>
              <CloserCardItem
                card={CLOSER_CARDS[1]}
                onExpand={handleOpenCard}
              />
            </ScrollReveal>
          </div>

          {/* RIGHT COLUMN: Card 01 (Upper Right) + Card 03 (Lower Right) */}
          <div className="flex flex-col">
            {/* Card 01: Upper Right */}
            <ScrollReveal className="w-full mb-16 xl:mb-24" delayMs={100}>
              <CloserCardItem
                card={CLOSER_CARDS[0]}
                onExpand={handleOpenCard}
              />
            </ScrollReveal>

            {/* Card 03: Lower Right (beneath Card 01) */}
            <ScrollReveal className="w-full" delayMs={220}>
              <CloserCardItem
                card={CLOSER_CARDS[2]}
                onExpand={handleOpenCard}
              />
            </ScrollReveal>
          </div>
        </div>

        {/* =========================================================================
            MOBILE & TABLET RESPONSIVE LAYOUT (< lg)
            Clean single/double column flow without cramped spacing or horizontal overflow
            ========================================================================= */}
        <div className="block lg:hidden">
          {/* Introductory Text Block */}
          <div className="max-w-[540px] mb-12 sm:mb-14">
            <p className="font-mono text-xs font-semibold tracking-[0.24em] uppercase text-[#A4401F] mb-3">
              LOOK CLOSER
            </p>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-[#171715] leading-[1.06] tracking-tight font-normal">
              Discover the details that tell a bigger story.
            </h2>
            <p className="font-sans text-[14.5px] sm:text-[15.5px] leading-[1.6] text-[#6B6B6B] mt-5">
              Every object, image and sound holds clues about the people, places and ideas that shaped Nigeria’s creative history.
            </p>
          </div>

          {/* Cards 01, 02, 03 in logical sequence */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10">
            <div className="w-full">
              <CloserCardItem
                card={CLOSER_CARDS[0]}
                onExpand={handleOpenCard}
              />
            </div>
            <div className="w-full">
              <CloserCardItem
                card={CLOSER_CARDS[1]}
                onExpand={handleOpenCard}
              />
            </div>
            <div className="w-full md:col-span-2 md:max-w-[540px] md:mx-auto">
              <CloserCardItem
                card={CLOSER_CARDS[2]}
                onExpand={handleOpenCard}
              />
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          NEWSPAPER EDITORIAL ARTICLE MODAL FOR SECTION 2 CARDS
          Reproduces structural logic of reference 1000636475.png:
          - Card 01: Dress, identity and heritage
          - Card 02: Textiles and craftsmanship
          - Card 03: Skills across generations
          ========================================================================= */}
      {selectedCard && (
        <SectionTwoEditorialModal
          cardId={selectedCard.id}
          isOpen={true}
          onClose={() => setSelectedCard(null)}
          onSelectCard={(id) => {
            const nextCard = CLOSER_CARDS.find((c) => c.id === id);
            if (nextCard) setSelectedCard(nextCard);
          }}
          triggerElementRef={activeTriggerRef}
        />
      )}
    </section>
  );
};
