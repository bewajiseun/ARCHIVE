import React, { useEffect, useRef } from 'react';
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { CarouselImageRecord } from './ExploreRoomsSection';

interface ArchivalSpecimenModalProps {
  isOpen: boolean;
  onClose: () => void;
  specimens: CarouselImageRecord[];
  activeSpecimenId: string | null;
  onSelectSpecimen: (id: string) => void;
  categoryTitle: string;
}

export const ArchivalSpecimenModal: React.FC<ArchivalSpecimenModalProps> = ({
  isOpen,
  onClose,
  specimens,
  activeSpecimenId,
  onSelectSpecimen,
  categoryTitle,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const currentIndex = Math.max(
    0,
    specimens.findIndex((s) => s.id === activeSpecimenId)
  );
  const activeSpecimen = specimens[currentIndex] || specimens[0];

  // Keyboard navigation: Escape to close, Left/Right arrows to navigate
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        const prevIndex = (currentIndex - 1 + specimens.length) % specimens.length;
        onSelectSpecimen(specimens[prevIndex].id);
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        const nextIndex = (currentIndex + 1) % specimens.length;
        onSelectSpecimen(specimens[nextIndex].id);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentIndex, specimens, onSelectSpecimen, onClose]);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      closeButtonRef.current?.focus();
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen]);

  if (!isOpen || !activeSpecimen) return null;

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    const prevIndex = (currentIndex - 1 + specimens.length) % specimens.length;
    onSelectSpecimen(specimens[prevIndex].id);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    const nextIndex = (currentIndex + 1) % specimens.length;
    onSelectSpecimen(specimens[nextIndex].id);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="specimen-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#171715]/90 backdrop-blur-md p-2 sm:p-4 md:p-6 overflow-y-auto animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      {/* Specimen Exhibition Case */}
      <div
        ref={modalRef}
        className="relative w-full max-w-[1240px] bg-[#FAF8F4] text-[#171715] border border-[#E3DED5] shadow-2xl rounded-none flex flex-col my-auto max-h-[96vh] overflow-hidden"
        style={{ borderRadius: '0px' }}
      >
        {/* =========================================================================
            1. TOP CONTROL BAR (Monospace Metadata & Navigation)
            ========================================================================= */}
        <div className="bg-[#FAF8F4] border-b border-[#171715]/15 px-4 sm:px-6 py-3 flex items-center justify-between shrink-0">
          {/* Eyebrow & Index */}
          <div className="flex items-center space-x-2 sm:space-x-3 truncate">
            <span className="w-2 h-2 bg-[#A4401F] rounded-full shrink-0" aria-hidden="true" />
            <span className="font-mono text-[11px] sm:text-xs font-semibold tracking-[0.2em] uppercase text-[#A4401F] truncate">
              {categoryTitle.toUpperCase()}
            </span>
            <span className="hidden sm:inline-block text-[#171715]/30">|</span>
            <span className="font-mono text-[11px] sm:text-xs text-[#6B6B6B] tracking-widest uppercase shrink-0">
              SPECIMEN {String(currentIndex + 1).padStart(2, '0')} / {String(specimens.length).padStart(2, '0')}
            </span>
          </div>

          {/* Controls: Prev, Next, Close */}
          <div className="flex items-center space-x-1.5 sm:space-x-3 shrink-0">
            <div className="flex items-center space-x-1">
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous specimen"
                className="inline-flex items-center space-x-1 px-2 sm:px-3 py-1.5 border border-[#171715]/20 hover:border-[#A4401F] hover:text-[#A4401F] bg-transparent text-[#171715] font-mono text-[11px] uppercase tracking-wider transition-colors cursor-pointer rounded-none focus:outline-none focus-visible:ring-1 focus-visible:ring-[#A4401F]"
              >
                <ChevronLeft className="w-3.5 h-3.5" aria-hidden="true" />
                <span className="hidden md:inline">PREV</span>
              </button>
              <button
                type="button"
                onClick={handleNext}
                aria-label="Next specimen"
                className="inline-flex items-center space-x-1 px-2 sm:px-3 py-1.5 border border-[#171715]/20 hover:border-[#A4401F] hover:text-[#A4401F] bg-transparent text-[#171715] font-mono text-[11px] uppercase tracking-wider transition-colors cursor-pointer rounded-none focus:outline-none focus-visible:ring-1 focus-visible:ring-[#A4401F]"
              >
                <span className="hidden md:inline">NEXT</span>
                <ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />
              </button>
            </div>

            <button
              ref={closeButtonRef}
              type="button"
              onClick={onClose}
              aria-label="Close specimen enlargement"
              className="inline-flex items-center space-x-1.5 px-2.5 sm:px-3 py-1.5 bg-[#171715] text-[#FAF8F4] hover:bg-[#A4401F] font-mono text-[11px] uppercase tracking-wider transition-colors cursor-pointer rounded-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A4401F]"
            >
              <X className="w-3.5 h-3.5" aria-hidden="true" />
              <span className="hidden sm:inline">CLOSE</span>
              <span className="hidden lg:inline text-[9px] text-[#FAF8F4]/70">[ESC]</span>
            </button>
          </div>
        </div>

        {/* =========================================================================
            2. BODY CONTENT: High-Res Specimen Image + Curatorial Dossier Plate
            ========================================================================= */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 flex flex-col lg:flex-row gap-6 lg:gap-8 items-stretch">
          {/* 2.1 Archival Photograph (Unobstructed, Large View) */}
          <div className="relative flex-1 min-h-[300px] sm:min-h-[400px] lg:min-h-[480px] bg-[#171715] border border-[#171715]/20 flex items-center justify-center overflow-hidden">
            <img
              src={activeSpecimen.imageUrl}
              alt={activeSpecimen.alt}
              className="w-full h-full max-h-[58vh] lg:max-h-[64vh] object-contain object-center transition-all duration-300"
            />
            {/* Specimen Index Watermark badge */}
            <div className="absolute bottom-3 left-3 px-2 py-1 bg-[#171715]/80 backdrop-blur-sm border border-[#FAF8F4]/20 font-mono text-[10px] tracking-widest uppercase text-[#D5D0C1]">
              #{activeSpecimen.displayOrder} · HIGH-RES RECORD
            </div>
          </div>

          {/* 2.2 Curatorial Dossier Plate */}
          <div className="w-full lg:w-[380px] xl:w-[420px] flex flex-col justify-between shrink-0 bg-[#FAF8F4] lg:pl-2">
            <div>
              {/* Category & Order tag */}
              <div className="flex items-center justify-between pb-3 border-b border-[#171715]/15">
                <span className="font-mono text-[10.5px] tracking-[0.2em] uppercase text-[#A4401F] font-semibold">
                  ARCHIVAL SPECIMEN {activeSpecimen.displayOrder}
                </span>
                <span className="font-mono text-[10px] text-[#6B6B6B] tracking-wider uppercase">
                  NIGERIAN CREATIVE HISTORY
                </span>
              </div>

              {/* Specimen Title in Instrument Serif */}
              <h3
                id="specimen-modal-title"
                className="font-display text-2xl sm:text-3xl text-[#171715] leading-[1.12] tracking-tight mt-4"
              >
                {activeSpecimen.title}
              </h3>

              {/* Curatorial & Craft Description */}
              <div className="mt-4 pt-4 border-t border-[#171715]/10">
                <h4 className="font-mono text-[10px] tracking-[0.18em] uppercase text-[#6B6B6B] mb-2">
                  CURATORIAL STUDY &amp; CRAFT DETAILS
                </h4>
                <p className="font-sans text-xs sm:text-[13.5px] text-[#321F18] leading-[1.65]">
                  {activeSpecimen.shortDescription}
                </p>
              </div>
            </div>

            {/* Bottom Provenance & Citation Metadata */}
            <div className="mt-6 pt-4 border-t border-[#171715]/15 flex flex-col gap-2 font-mono text-[10px] text-[#6B6B6B]">
              <div className="flex items-center justify-between">
                <span className="tracking-wider uppercase">CITATION / PROVENANCE</span>
                <span className="text-[#171715] font-medium tracking-wide">
                  {activeSpecimen.sourceCredit}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="tracking-wider uppercase">PRESERVATION STATUS</span>
                <span className="text-[#A4401F] font-semibold tracking-wider">
                  VERIFIED ARCHIVE SPECIMEN
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================================
            3. THUMBNAIL EXPLORATION STRIP (Jump to any specimen in category)
            ========================================================================= */}
        <div className="bg-[#E3DED5]/40 border-t border-[#171715]/15 px-4 sm:px-6 py-3 shrink-0">
          <div className="flex items-center justify-between mb-2">
            <span className="font-mono text-[10px] tracking-[0.16em] uppercase text-[#6B6B6B]">
              ALL SPECIMENS IN THIS COLLECTION ({specimens.length})
            </span>
            <span className="font-mono text-[10px] text-[#6B6B6B] hidden sm:inline">
              USE ← → ARROW KEYS TO BROWSE
            </span>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
            {specimens.map((specimen, idx) => {
              const isCurrent = specimen.id === activeSpecimen.id;
              return (
                <button
                  key={specimen.id}
                  type="button"
                  onClick={() => onSelectSpecimen(specimen.id)}
                  aria-label={`View specimen ${idx + 1}: ${specimen.title}`}
                  className={`relative shrink-0 w-12 sm:w-16 h-12 sm:h-16 bg-[#171715] overflow-hidden border transition-all cursor-pointer rounded-none focus:outline-none ${
                    isCurrent
                      ? 'border-[#A4401F] ring-2 ring-[#A4401F] scale-105 z-10'
                      : 'border-[#171715]/20 opacity-70 hover:opacity-100 hover:border-[#171715]'
                  }`}
                  style={{ borderRadius: '0px' }}
                >
                  <img
                    src={specimen.imageUrl}
                    alt={specimen.alt}
                    className="w-full h-full object-cover object-center"
                    loading="lazy"
                  />
                  <span className="absolute bottom-0 right-0 px-1 py-0.5 bg-[#171715]/80 font-mono text-[8px] text-[#FAF8F4] leading-none">
                    {specimen.displayOrder}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
