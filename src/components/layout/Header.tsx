import React, { useState, useEffect } from 'react';
import { ArchiveLogo } from './ArchiveLogo';
import { X } from 'lucide-react';

interface HeaderProps {
  onNavigateSection?: (sectionId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onNavigateSection }) => {
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

  return (
    <>
      {/* Accessible Skip Link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 z-50 bg-[#171715] text-[#FAF8F4] px-4 py-2 text-xs uppercase tracking-widest outline-none ring-2 ring-[#A4401F]"
      >
        Skip to main content
      </a>

      <header className="relative z-30 w-full bg-[#DACAB0]">
        <div className="pt-6 md:pt-8 pb-4 px-6 md:px-12 lg:px-16 max-w-[1440px] mx-auto">
          <div className="grid grid-cols-3 items-center">
            {/* Left Navigation (Desktop) */}
            <nav aria-label="Primary desktop navigation" className="hidden md:flex items-center space-x-8 lg:space-x-12">
              <a
                href="#rooms"
                onClick={(e) => handleNavClick('rooms', e)}
                className="text-[12px] lg:text-[13px] font-medium tracking-[0.18em] uppercase text-[#171715] hover:text-[#A4401F] transition-colors duration-200 py-2"
              >
                Rooms
              </a>
              <a
                href="#stories"
                onClick={(e) => handleNavClick('stories', e)}
                className="text-[12px] lg:text-[13px] font-medium tracking-[0.18em] uppercase text-[#171715] hover:text-[#A4401F] transition-colors duration-200 py-2"
              >
                Stories
              </a>
              <a
                href="#explore-rooms"
                onClick={(e) => handleNavClick('explore-rooms', e)}
                className="text-[12px] lg:text-[13px] font-medium tracking-[0.18em] uppercase text-[#171715] hover:text-[#A4401F] transition-colors duration-200 py-2"
              >
                Disciplines
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
                <ArchiveLogo />
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

      {/* Accessible Navigation Drawer / Menu Overlay */}
      {isMenuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Museum navigation"
          className="fixed inset-0 z-50 bg-[#171715]/40 backdrop-blur-xs flex justify-end transition-opacity"
        >
          <div className="w-full max-w-sm sm:max-w-md bg-[#FAF8F4] h-full shadow-2xl p-8 flex flex-col justify-between border-l border-[#E3DED5] animate-in slide-in-from-right duration-300">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-[#E3DED5]">
                <ArchiveLogo className="scale-90 origin-left" />
                <button
                  type="button"
                  onClick={() => setIsMenuOpen(false)}
                  aria-label="Close menu"
                  className="w-11 h-11 rounded-full border border-[#171715] flex items-center justify-center hover:bg-[#171715] hover:text-[#FAF8F4] transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="mt-8 space-y-6">
                <div>
                  <h4 className="text-[11px] font-mono tracking-[0.2em] uppercase text-[#6B6B6B] mb-4">
                    Exhibition Navigation
                  </h4>
                  <ul className="space-y-4">
                    <li>
                      <a
                        href="#hero"
                        onClick={(e) => handleNavClick('hero', e)}
                        className="text-2xl font-serif text-[#171715] hover:text-[#A4401F] transition-colors block"
                      >
                        Introduction
                      </a>
                    </li>
                    <li>
                      <a
                        href="#rooms"
                        onClick={(e) => handleNavClick('rooms', e)}
                        className="text-2xl font-serif text-[#171715] hover:text-[#A4401F] transition-colors block"
                      >
                        Fashion Room
                      </a>
                    </li>
                    <li>
                      <a
                        href="#stories"
                        onClick={(e) => handleNavClick('stories', e)}
                        className="text-2xl font-serif text-[#171715] hover:text-[#A4401F] transition-colors block"
                      >
                        Threads of Generations
                      </a>
                    </li>
                    <li>
                      <a
                        href="#explore-rooms"
                        onClick={(e) => handleNavClick('explore-rooms', e)}
                        className="text-2xl font-serif text-[#171715] hover:text-[#A4401F] transition-colors block"
                      >
                        The Four Disciplines
                      </a>
                    </li>
                    <li>
                      <a
                        href="#contribute"
                        onClick={(e) => handleNavClick('contribute', e)}
                        className="text-2xl font-serif text-[#171715] hover:text-[#A4401F] transition-colors block"
                      >
                        Contribute
                      </a>
                    </li>
                    <li>
                      <a
                        href="#sources"
                        onClick={(e) => handleNavClick('sources', e)}
                        className="text-2xl font-serif text-[#171715] hover:text-[#A4401F] transition-colors block"
                      >
                        Sources & Credits
                      </a>
                    </li>
                  </ul>
                </div>

                <div className="pt-6 border-t border-[#E3DED5]">
                  <h4 className="text-[11px] font-mono tracking-[0.2em] uppercase text-[#6B6B6B] mb-3">
                    Museum Disciplines
                  </h4>
                  <div className="grid grid-cols-2 gap-2 text-xs font-medium uppercase tracking-wider text-[#171715]">
                    <span className="p-2 bg-[#FAF8F4] border border-[#E3DED5]">1. Photography</span>
                    <span className="p-2 bg-[#FAF8F4] border border-[#E3DED5]">2. Music</span>
                    <span className="p-2 bg-[#FAF8F4] border border-[#E3DED5]">3. Fashion</span>
                    <span className="p-2 bg-[#FAF8F4] border border-[#E3DED5]">4. Design</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-[#E3DED5] text-xs text-[#6B6B6B]">
              <p className="font-mono text-[11px] mb-1">ARCHIVE · DIGITAL MUSEUM</p>
              <p>Documenting Nigerian creative history through evidence-led editorial encounters.</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
