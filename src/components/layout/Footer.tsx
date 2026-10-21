import React, { useState } from 'react';
import { ArchiveLogo } from './ArchiveLogo';
import { X } from 'lucide-react';

export const Footer: React.FC = () => {
  const [modalType, setModalType] = useState<'privacy' | 'contact' | 'credits' | null>(null);

  const handleNavScroll = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      el.focus();
    }
  };

  const currentYear = new Date().getFullYear() || 2026;

  return (
    <footer
      id="archive-footer"
      aria-label="ARCHIVE Museum Footer"
      className="relative w-full bg-[#321F18] text-[#FAF8F4] overflow-hidden select-none"
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 pt-16 md:pt-24 pb-12 md:pb-16">
        {/* =========================================================================
            MAIN FOOTER CONTENT — STRICTLY ONE HORIZONTAL ROW ON DESKTOP
            ========================================================================= */}
        <div className="pb-12 sm:pb-16 md:pb-20 grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 lg:gap-12 items-start">
          {/* A. Left Group: ARCHIVE Brand Block (approx 42-45% width) */}
          <div className="md:col-span-6 lg:col-span-5 flex flex-col items-start">
            {/* Top label with short terracotta line — Retained deliberate terracotta brand accent */}
            <div className="flex items-center space-x-3 mb-5">
              <span className="w-8 h-[2px] bg-[#A4401F]" aria-hidden="true" />
              <span className="font-mono text-[11px] tracking-[0.24em] uppercase text-[#A4401F] font-medium">
                PEOPLE. PLACES. IDEAS. LEGACIES.
              </span>
            </div>

            {/* Official ARCHIVE Brand Logo */}
            <div className="my-1">
              <ArchiveLogo variant="light" size="xl" align="left" />
            </div>

            {/* Restrained Tagline */}
            <p className="font-display text-lg sm:text-xl md:text-[22px] text-[#FAF8F4] mt-4 leading-snug max-w-sm">
              A growing home for Nigeria's creative history.
            </p>
          </div>

          {/* Vertical Divider between Brand and Navigation (Desktop) */}
          <div className="hidden lg:block lg:col-span-1 h-44 border-r border-[#E3DED5]/20" aria-hidden="true" />

          {/* B. Middle Group: EXPLORE Navigation */}
          <div className="md:col-span-3 lg:col-span-2 flex flex-col items-start">
            <div className="flex items-center space-x-2 text-[11px] font-mono tracking-[0.22em] uppercase text-[#FAF8F4] font-semibold mb-6">
              <span>EXPLORE</span>
              <span className="w-5 h-[1px] bg-[#FAF8F4]/40" aria-hidden="true" />
            </div>

            <nav aria-label="Footer Explore Navigation" className="flex flex-col space-y-3.5">
              <a
                href="#explore-rooms"
                onClick={(e) => handleNavScroll('explore-rooms', e)}
                className="text-sm font-sans text-[#FAF8F4] hover:text-[#D5D0C1] transition-colors duration-200"
              >
                Photography
              </a>
              <a
                href="#rooms"
                onClick={(e) => handleNavScroll('rooms', e)}
                className="text-sm font-sans text-[#FAF8F4] hover:text-[#D5D0C1] transition-colors duration-200"
              >
                Music
              </a>
              <a
                href="#rooms"
                onClick={(e) => handleNavScroll('rooms', e)}
                className="text-sm font-sans text-[#FAF8F4] hover:text-[#D5D0C1] transition-colors duration-200"
              >
                Fashion
              </a>
              <a
                href="#explore-rooms"
                onClick={(e) => handleNavScroll('explore-rooms', e)}
                className="text-sm font-sans text-[#FAF8F4] hover:text-[#D5D0C1] transition-colors duration-200"
              >
                Design
              </a>
            </nav>
          </div>

          {/* C. Right Group: ABOUT Navigation */}
          <div className="md:col-span-3 lg:col-span-2 flex flex-col items-start">
            <div className="flex items-center space-x-2 text-[11px] font-mono tracking-[0.22em] uppercase text-[#FAF8F4] font-semibold mb-6">
              <span>ABOUT</span>
              <span className="w-5 h-[1px] bg-[#FAF8F4]/40" aria-hidden="true" />
            </div>

            <nav aria-label="Footer About Navigation" className="flex flex-col space-y-3.5">
              <a
                href="#hero"
                onClick={(e) => handleNavScroll('hero', e)}
                className="text-sm font-sans text-[#FAF8F4] hover:text-[#D5D0C1] transition-colors duration-200"
              >
                Our Story
              </a>
              <a
                href="#sources"
                onClick={(e) => handleNavScroll('sources', e)}
                className="text-sm font-sans text-[#FAF8F4] hover:text-[#D5D0C1] transition-colors duration-200"
              >
                Sources & Credits
              </a>
              <button
                type="button"
                onClick={() => setModalType('contact')}
                className="text-sm font-sans text-[#FAF8F4] hover:text-[#D5D0C1] transition-colors duration-200 text-left cursor-pointer"
              >
                Contact
              </button>
            </nav>
          </div>

          {/* D. Far Right: Subtle Epilogue Typography (From reference) */}
          <div className="hidden lg:flex lg:col-span-2 pl-6 border-l border-[#E3DED5]/20 flex-col justify-center h-44">
            <p className="font-display italic text-2xl text-[#FAF8F4] leading-[1.25]">
              Stories that
              <span className="block not-italic text-lg text-[#D5D0C1] my-1">keep creating</span>
              <span className="text-[#FAF8F4]">tomorrow.</span>
            </p>
          </div>
        </div>

        {/* =========================================================================
            3. BOTTOM BAR: Copyright, Privacy & Credits
            ========================================================================= */}
        <div className="pt-8 border-t border-[#E3DED5]/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-sans text-[#D5D0C1]">
          <div>
            <span>© {currentYear} ARCHIVE. All rights reserved.</span>
          </div>

          <div className="flex items-center space-x-4">
            <button
              type="button"
              onClick={() => setModalType('privacy')}
              className="hover:text-[#FAF8F4] transition-colors cursor-pointer"
            >
              Privacy
            </button>
            <span className="text-[#E3DED5]/30" aria-hidden="true">|</span>
            <button
              type="button"
              onClick={() => setModalType('credits')}
              className="hover:text-[#FAF8F4] transition-colors cursor-pointer"
            >
              Credits
            </button>
          </div>
        </div>
      </div>

      {/* Accessible Modals for Privacy & Contact */}
      {modalType && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={modalType === 'privacy' ? 'Privacy Policy' : modalType === 'contact' ? 'Contact ARCHIVE' : 'Credits'}
          className="fixed inset-0 z-50 bg-[#171715]/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6"
        >
          <div
            className="w-full max-w-lg bg-[#FAF8F4] text-[#171715] border border-[#171715] p-6 sm:p-8 shadow-2xl animate-in zoom-in-95 duration-200"
            style={{ borderRadius: '0px' }}
          >
            <div className="flex items-center justify-between pb-4 border-b border-[#E3DED5]">
              <span className="font-mono text-xs uppercase tracking-wider text-[#A4401F] font-semibold">
                ARCHIVE · {modalType.toUpperCase()}
              </span>
              <button
                type="button"
                onClick={() => setModalType(null)}
                aria-label="Close dialog"
                className="w-9 h-9 border border-[#171715] flex items-center justify-center hover:bg-[#171715] hover:text-[#FAF8F4] transition-colors cursor-pointer"
                style={{ borderRadius: '0px' }}
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="mt-5 space-y-4 text-sm font-sans text-[#6B6B6B] leading-relaxed">
              {modalType === 'privacy' && (
                <>
                  <h3 className="font-display text-3xl text-[#171715]">Data Privacy & Trust</h3>
                  <p>
                    ARCHIVE is a non-commercial digital museum experience. We do not deploy visitor
                    tracking, third-party analytics pixels, advertising cookies, or personal telemetry.
                  </p>
                  <p>
                    All interactions take place locally within your browser session. Your privacy is
                    respected by design.
                  </p>
                </>
              )}

              {modalType === 'contact' && (
                <>
                  <h3 className="font-display text-3xl text-[#171715]">Contact the Curators</h3>
                  <p>
                    For inquiries regarding archival loans, photography attribution, research collaborations,
                    or rights clearance, please contact:
                  </p>
                  <div className="p-4 bg-[#FAF8F4] border border-[#E3DED5] text-xs font-mono text-[#171715]">
                    Email: curate@archive-nigeria.org<br />
                    Location: Lagos, Nigeria
                  </div>
                </>
              )}

              {modalType === 'credits' && (
                <>
                  <h3 className="font-display text-3xl text-[#171715]">Credits & Provenance</h3>
                  <p>
                    ARCHIVE is developed in tribute to Nigerian creative masters across Photography,
                    Music, Fashion, and Design. See Section 06 for our full repository bibliography.
                  </p>
                </>
              )}
            </div>

            <div className="mt-6 pt-4 border-t border-[#E3DED5] flex justify-end">
              <button
                type="button"
                onClick={() => setModalType(null)}
                className="bg-[#171715] text-[#FAF8F4] hover:bg-[#A4401F] text-xs font-mono uppercase px-5 py-2.5 transition-colors cursor-pointer"
                style={{ borderRadius: '0px' }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};
