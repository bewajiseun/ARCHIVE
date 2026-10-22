import React, { useState, useEffect } from 'react';
import { ArchiveLogo } from './ArchiveLogo';
import { X } from 'lucide-react';

interface HeaderProps {
  onNavigateSection?: (sectionId: string) => void;
  className?: string;
}

export const Header: React.FC<HeaderProps> = ({ onNavigateSection, className = 'bg-[#FAF8F4]' }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Close menu on ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMenuOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleNavClick = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    setIsMenuOpen(false);
    if (onNavigateSection) {
      onNavigateSection(id);
    } else {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const NAV_LINKS = [
    { seq: '01', id: 'rooms', label: 'ROOMS', href: '#rooms' },
    { seq: '02', id: 'explore-rooms', label: 'EXHIBIT', href: '#explore-rooms' },
    { seq: '03', id: 'stories', label: 'STORIES', href: '#stories' },
    { seq: '04', id: 'contribute', label: 'CONTRIBUTE', href: '#contribute' },
    { seq: '05', id: 'sources', label: 'SOURCES', href: '#sources' },
  ];

  return (
    <>
      {/* Accessible Skip Link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 z-50 bg-[#171715] text-[#FAF8F4] px-4 py-2 text-xs uppercase tracking-widest outline-none ring-2 ring-[#A4401F]"
      >
        Skip to main content
      </a>

      <header className={`relative z-30 w-full ${className}`}>
        <div className="w-full max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 pt-6 md:pt-8 pb-4">
          <div className="grid grid-cols-3 items-center">
            {/* Left Navigation (Desktop) */}
            <nav aria-label="Primary desktop navigation" className="hidden md:flex items-center space-x-8 lg:space-x-12">
              <a
                href="#rooms"
                onClick={(e) => handleNavClick('rooms', e)}
                className="text-[12px] lg:text-[13px] font-medium tracking-[0.18em] uppercase text-[#171715] hover:text-[#A4401F] transition-colors duration-200 py-2"
              >
                ROOMS
              </a>
              <a
                href="#explore-rooms"
                onClick={(e) => handleNavClick('explore-rooms', e)}
                className="text-[12px] lg:text-[13px] font-medium tracking-[0.18em] uppercase text-[#171715] hover:text-[#A4401F] transition-colors duration-200 py-2"
              >
                EXHIBIT
              </a>
              <a
                href="#stories"
                onClick={(e) => handleNavClick('stories', e)}
                className="text-[12px] lg:text-[13px] font-medium tracking-[0.18em] uppercase text-[#171715] hover:text-[#A4401F] transition-colors duration-200 py-2"
              >
                STORIES
              </a>
            </nav>

            {/* Left symmetry spacer on mobile */}
            <div className="md:hidden flex items-center" aria-hidden="true">
              <span className="text-[10px] font-mono tracking-[0.2em] text-[#6B6B6B] uppercase font-medium">
                EST. 2026
              </span>
            </div>

            {/* Center Logo - Centered precisely across the viewport grid */}
            <div className="flex justify-center items-center">
              <a
                href="#"
                aria-label="ARCHIVE Homepage"
                className="inline-block p-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A4401F]"
              >
                <ArchiveLogo size="md" />
              </a>
            </div>

            {/* Right Menu Button - Circular outline with 3 lines, min 44x44px target */}
            <div className="flex justify-end items-center">
              <button
                type="button"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label={isMenuOpen ? "Close museum navigation menu" : "Open museum navigation menu"}
                aria-expanded={isMenuOpen}
                className="relative w-11 h-11 md:w-12 md:h-12 rounded-full border border-[#171715] flex flex-col items-center justify-center space-y-[4px] hover:bg-[#171715] hover:text-[#FAF8F4] group transition-all duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A4401F]"
              >
                <span className="w-5 h-[1.5px] bg-[#171715] group-hover:bg-[#FAF8F4] transition-colors"></span>
                <span className="w-5 h-[1.5px] bg-[#171715] group-hover:bg-[#FAF8F4] transition-colors"></span>
                <span className="w-5 h-[1.5px] bg-[#171715] group-hover:bg-[#FAF8F4] transition-colors"></span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Redesigned Mobile & Tablet Navigation Dropdown */}
      {isMenuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Museum navigation"
          className="fixed inset-0 z-50 bg-[#171715]/60 backdrop-blur-xs flex flex-col justify-start transition-opacity animate-in fade-in duration-200"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsMenuOpen(false);
          }}
        >
          <div className="w-full bg-[#FAF8F4] border-b border-[#E3DED5] shadow-2xl animate-in slide-in-from-top duration-300">
            {/* Top Bar with Logo & Close Button aligned with header grid */}
            <div className="w-full max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 pt-6 md:pt-8 pb-4 flex items-center justify-between border-b border-[#E3DED5]">
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setIsMenuOpen(false);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                aria-label="ARCHIVE Homepage"
                className="inline-block"
              >
                <ArchiveLogo size="md" />
              </a>

              <button
                type="button"
                onClick={() => setIsMenuOpen(false)}
                aria-label="Close navigation menu"
                className="w-11 h-11 md:w-12 md:h-12 rounded-full border border-[#171715] flex items-center justify-center text-[#171715] hover:bg-[#171715] hover:text-[#FAF8F4] transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A4401F]"
              >
                <X className="w-5 h-5 stroke-[1.75]" />
              </button>
            </div>

            {/* Clean Editorial Menu Links */}
            <div className="w-full max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 py-6 sm:py-8">
              <nav aria-label="Mobile museum navigation" className="flex flex-col divide-y divide-[#E3DED5]">
                {NAV_LINKS.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={(e) => handleNavClick(item.id, e)}
                    className="group py-4 sm:py-5 flex items-center justify-between text-[#171715] hover:text-[#A4401F] transition-colors cursor-pointer"
                  >
                    <div className="flex items-baseline space-x-4">
                      <span className="font-mono text-xs font-semibold text-[#A4401F]">
                        {item.seq}
                      </span>
                      <span className="font-serif text-2xl sm:text-3xl tracking-tight group-hover:translate-x-1 transition-transform">
                        {item.label}
                      </span>
                    </div>
                    <span
                      aria-hidden="true"
                      className="text-base text-[#6B6B6B] group-hover:text-[#A4401F] transition-transform duration-200 group-hover:translate-x-1 font-mono"
                    >
                      →
                    </span>
                  </a>
                ))}
              </nav>

              {/* Bottom Clean Action & Minimal Tagline */}
              <div className="mt-8 pt-4 border-t border-[#E3DED5]/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <a
                  href="#rooms"
                  onClick={(e) => handleNavClick('rooms', e)}
                  className="inline-flex items-center justify-center bg-[#A4401F] hover:bg-[#853216] text-[#FAF8F4] font-sans text-xs font-medium tracking-[0.14em] uppercase px-6 h-12 transition-colors cursor-pointer shadow-xs w-full sm:w-auto"
                  style={{ borderRadius: '0px' }}
                >
                  <span>ENTER ARCHIVE</span>
                  <span className="ml-2.5 text-base leading-none" aria-hidden="true">→</span>
                </a>

                <span className="font-mono text-[10.5px] sm:text-[11px] tracking-[0.22em] text-[#6B6B6B] uppercase font-medium">
                  PEOPLE. PLACES. IDEAS. LEGACIES.
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
