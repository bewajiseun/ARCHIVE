import React, { useState } from 'react';
import { Camera, Eye, BookOpen, ChevronDown, ChevronUp, RotateCcw, ArrowRight } from 'lucide-react';

export const StorySection: React.FC = () => {
  // Context panels state: multiple panels can be opened simultaneously
  const [openPanels, setOpenPanels] = useState<Record<string, boolean>>({
    frame: false,
    camera: false,
    beyond: false,
  });

  const togglePanel = (panelKey: string) => {
    setOpenPanels((prev) => ({
      ...prev,
      [panelKey]: !prev[panelKey],
    }));
  };

  const handleReturnToPhotograph = () => {
    // Close all panels
    setOpenPanels({ frame: false, camera: false, beyond: false });
    // Scroll to the image section
    const el = document.getElementById('look-closer-heading');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      el.focus();
    }
  };

  return (
    <section
      id="look-closer"
      tabIndex={-1}
      aria-label="Featured Exhibition: Learning to See"
      className="relative z-20 w-full bg-[#FAF8F4] border-t border-[#E3DED5] pt-16 md:pt-24 pb-20 px-6 md:px-12 lg:px-16"
    >
      <div className="max-w-[1440px] mx-auto">
        {/* Exhibition Header */}
        <div className="max-w-3xl mb-12 md:mb-16">
          <div className="inline-flex items-center space-x-2 text-[11px] font-mono tracking-[0.2em] uppercase text-[#A4401F] font-semibold mb-3">
            <span>Room 01</span>
            <span>·</span>
            <span>Featured Photographic Encounter</span>
          </div>
          <h2
            id="look-closer-heading"
            tabIndex={-1}
            className="font-display text-4xl sm:text-5xl md:text-6xl text-[#171715] leading-[1.05] tracking-tight focus:outline-none"
          >
            Learning to See
          </h2>
          <p className="font-sans text-base sm:text-lg text-[#6B6B6B] mt-4 leading-relaxed">
            Funmilayo Abe and the photographic record of Lagos. One photograph opens
            a story about studio craft, community memory, and the preservation of Nigerian visual history.
          </p>
        </div>

        {/* Grid: Artefact Display & Context Interactions */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* =========================================================================
              LEFT: The Artefact Frame (Enforcing PRD v3.0 Pending Placeholder Gate)
              ========================================================================= */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="relative w-full aspect-[4/3] sm:aspect-[16/11] bg-[#F2EDE0] border border-[#E3DED5] flex flex-col items-center justify-center p-8 sm:p-12 text-center overflow-hidden">
              {/* Subtle archival watermark border */}
              <div className="absolute inset-3 border border-dashed border-[#D5D0C1] pointer-events-none" />

              <div className="relative z-10 max-w-lg">
                <Camera className="w-10 h-10 text-[#A4401F] mx-auto mb-4 stroke-[1.5]" />
                <span className="inline-block text-[10px] font-mono tracking-[0.25em] uppercase text-[#6B6B6B] mb-2 font-medium">
                  ARCHIVAL GATE ENFORCED
                </span>

                {/* EXACT REQUIRED PLACEHOLDER STRING FROM PRD v3.0 */}
                <p className="font-mono text-xs sm:text-sm text-[#171715] font-medium leading-relaxed bg-[#FAF8F4] p-4 border border-[#E3DED5]">
                  FEATURED PHOTOGRAPH PLACEHOLDER: image, caption, credit and reproduction permission pending.
                </p>

                <p className="font-sans text-xs text-[#6B6B6B] mt-4 leading-normal">
                  In accordance with ARCHIVE editorial standards, authentic historical artefacts are
                  published only after written reproduction permission and authoritative provenance
                  are confirmed.
                </p>
              </div>
            </div>

            {/* Artefact Metadata Bar */}
            <div className="mt-4 p-4 bg-[#FAF8F4] border border-[#E3DED5] grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div>
                <span className="block font-mono text-[10px] uppercase tracking-wider text-[#6B6B6B]">
                  Attribution
                </span>
                <span className="font-medium text-[#171715]">
                  Abi Morocco Photos (Studio)
                </span>
              </div>
              <div>
                <span className="block font-mono text-[10px] uppercase tracking-wider text-[#6B6B6B]">
                  Date & Setting
                </span>
                <span className="font-medium text-[#171715]">
                  Circa 1970s · Lagos, Nigeria
                </span>
              </div>
              <div>
                <span className="block font-mono text-[10px] uppercase tracking-wider text-[#6B6B6B]">
                  Rights Status
                </span>
                <span className="font-medium text-[#A4401F]">
                  Pending Verification
                </span>
              </div>
            </div>
          </div>

          {/* =========================================================================
              RIGHT: The Three Labelled Context Controls
              ========================================================================= */}
          <div className="lg:col-span-5 flex flex-col space-y-4">
            <div className="border-b border-[#E3DED5] pb-3 mb-2">
              <h3 className="font-mono text-xs tracking-widest uppercase text-[#6B6B6B] font-semibold">
                Contextual Investigation
              </h3>
            </div>

            {/* Panel 1: Inside the Frame */}
            <div className="border border-[#E3DED5] bg-[#FAF8F4]">
              <button
                type="button"
                onClick={() => togglePanel('frame')}
                aria-expanded={openPanels.frame}
                className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-[#F2EDE0] transition-colors cursor-pointer"
              >
                <div className="flex items-center space-x-3">
                  <Eye className="w-4 h-4 text-[#A4401F]" />
                  <span className="font-sans text-sm font-semibold tracking-wide text-[#171715]">
                    Inside the Frame
                  </span>
                </div>
                {openPanels.frame ? <ChevronUp className="w-4 h-4 text-[#6B6B6B]" /> : <ChevronDown className="w-4 h-4 text-[#6B6B6B]" />}
              </button>
              {openPanels.frame && (
                <div className="px-5 pb-5 pt-2 text-xs sm:text-sm text-[#171715] leading-relaxed border-t border-[#E3DED5] bg-[#FDFBF7]">
                  <p className="italic text-[#6B6B6B] mb-2 font-mono text-[11px]">
                    State: Pending Cleared Artefact
                  </p>
                  <p>
                    Image-specific observations are pending because the featured photograph, caption, credit,
                    and reproduction permission are pending. When published, this panel details exact visual
                    evidence: textiles, studio backdrops, lighting choices, and physical artefacts captured in the negative.
                  </p>
                </div>
              )}
            </div>

            {/* Panel 2: Behind the Camera */}
            <div className="border border-[#E3DED5] bg-[#FAF8F4]">
              <button
                type="button"
                onClick={() => togglePanel('camera')}
                aria-expanded={openPanels.camera}
                className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-[#F2EDE0] transition-colors cursor-pointer"
              >
                <div className="flex items-center space-x-3">
                  <Camera className="w-4 h-4 text-[#A4401F]" />
                  <span className="font-sans text-sm font-semibold tracking-wide text-[#171715]">
                    Behind the Camera
                  </span>
                </div>
                {openPanels.camera ? <ChevronUp className="w-4 h-4 text-[#6B6B6B]" /> : <ChevronDown className="w-4 h-4 text-[#6B6B6B]" />}
              </button>
              {openPanels.camera && (
                <div className="px-5 pb-5 pt-2 text-xs sm:text-sm text-[#171715] leading-relaxed border-t border-[#E3DED5] bg-[#FDFBF7]">
                  <p className="mb-2">
                    Commercial portrait studios across Lagos operated as community memory banks. Photographers
                    like Funmilayo Abe developed technical mastery over medium format negatives, retouching,
                    and deliberate staging, creating enduring records of urban social life.
                  </p>
                  <p className="text-[11px] font-mono text-[#6B6B6B]">
                    Source: Nigerian Archival Photography Studies · Verified studio record
                  </p>
                </div>
              )}
            </div>

            {/* Panel 3: Beyond the Image */}
            <div className="border border-[#E3DED5] bg-[#FAF8F4]">
              <button
                type="button"
                onClick={() => togglePanel('beyond')}
                aria-expanded={openPanels.beyond}
                className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-[#F2EDE0] transition-colors cursor-pointer"
              >
                <div className="flex items-center space-x-3">
                  <BookOpen className="w-4 h-4 text-[#A4401F]" />
                  <span className="font-sans text-sm font-semibold tracking-wide text-[#171715]">
                    Beyond the Image
                  </span>
                </div>
                {openPanels.beyond ? <ChevronUp className="w-4 h-4 text-[#6B6B6B]" /> : <ChevronDown className="w-4 h-4 text-[#6B6B6B]" />}
              </button>
              {openPanels.beyond && (
                <div className="px-5 pb-5 pt-2 text-xs sm:text-sm text-[#171715] leading-relaxed border-t border-[#E3DED5] bg-[#FDFBF7]">
                  <p className="mb-2">
                    Studio portraiture was integral to major life milestones: graduations, weddings, club
                    anniversaries, and modern self-fashioning. Clients commissioned portraits to document their
                    aspirations, social connections, and community standing in mid-century Lagos.
                  </p>
                  <p className="text-[11px] font-mono text-[#6B6B6B]">
                    Source: Centre for Contemporary Art Lagos & Historical Archives
                  </p>
                </div>
              )}
            </div>

            {/* Return to Photograph Action & Introspective Reflection */}
            <div className="pt-4">
              <button
                type="button"
                onClick={handleReturnToPhotograph}
                className="w-full inline-flex items-center justify-center space-x-2 py-3 px-4 border border-[#171715] text-[#171715] hover:bg-[#171715] hover:text-[#FAF8F4] text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Return to Photograph</span>
              </button>

              <div className="mt-4 p-4 bg-[#F2EDE0] border border-[#E3DED5]">
                <h4 className="font-mono text-[10px] tracking-wider uppercase text-[#A4401F] font-semibold mb-1">
                  Visitor Reflection
                </h4>
                <p className="font-display italic text-base sm:text-lg text-[#171715] leading-snug">
                  “This photograph is pending verification and permission. What would help you understand
                  an image like this more deeply?”
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================================
            THE FOUR DISCIPLINES ROADMAP PREVIEW
            ========================================================================= */}
        <div id="rooms" className="mt-24 pt-16 border-t border-[#E3DED5]">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10">
            <div>
              <span className="text-[11px] font-mono tracking-[0.2em] uppercase text-[#A4401F] font-semibold block mb-2">
                Museum Structure
              </span>
              <h3 className="font-display text-3xl sm:text-4xl text-[#171715]">
                The Four Creative Disciplines
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-[#6B6B6B] max-w-md mt-2 sm:mt-0 font-sans">
              Each discipline forms an independent wing of ARCHIVE, pairing key historical artefacts with
              restrained, evidence-led storytelling.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* 1. Photography */}
            <div className="border border-[#171715] p-6 bg-[#FAF8F4] flex flex-col justify-between h-[220px]">
              <div>
                <span className="text-[11px] font-mono text-[#A4401F] tracking-widest uppercase font-semibold">
                  Wing 01 · Active
                </span>
                <h4 className="font-display text-2xl text-[#171715] mt-2">
                  Photography
                </h4>
                <p className="text-xs text-[#6B6B6B] mt-2 leading-relaxed">
                  Lagos studio portraiture, darkroom craftsmanship, and community negative archives.
                </p>
              </div>
              <div className="inline-flex items-center text-xs font-mono uppercase tracking-wider text-[#A4401F] font-semibold">
                <span>Currently Viewing</span>
                <span className="ml-1">✓</span>
              </div>
            </div>

            {/* 2. Music */}
            <div className="border border-[#E3DED5] p-6 bg-[#FAF8F4] flex flex-col justify-between h-[220px]">
              <div>
                <span className="text-[11px] font-mono text-[#6B6B6B] tracking-widest uppercase">
                  Wing 02 · Future Area
                </span>
                <h4 className="font-display text-2xl text-[#171715] mt-2">
                  Music
                </h4>
                <p className="text-xs text-[#6B6B6B] mt-2 leading-relaxed">
                  Highlife band arrangements, Fela’s Afrobeat manifestos, 78rpm pressings, and vinyl ephemera.
                </p>
              </div>
              <span className="text-[11px] font-mono uppercase text-[#6B6B6B]">
                Opening Phase 3
              </span>
            </div>

            {/* 3. Fashion */}
            <div className="border border-[#E3DED5] p-6 bg-[#FAF8F4] flex flex-col justify-between h-[220px]">
              <div>
                <span className="text-[11px] font-mono text-[#6B6B6B] tracking-widest uppercase">
                  Wing 03 · Future Area
                </span>
                <h4 className="font-display text-2xl text-[#171715] mt-2">
                  Fashion
                </h4>
                <p className="text-xs text-[#6B6B6B] mt-2 leading-relaxed">
                  Abeokuta indigo adire dyeing, Yoruba aso-oke weaving, and modern ceremonial silhouette tailoring.
                </p>
              </div>
              <span className="text-[11px] font-mono uppercase text-[#6B6B6B]">
                Opening Phase 3
              </span>
            </div>

            {/* 4. Design */}
            <div className="border border-[#E3DED5] p-6 bg-[#FAF8F4] flex flex-col justify-between h-[220px]">
              <div>
                <span className="text-[11px] font-mono text-[#6B6B6B] tracking-widest uppercase">
                  Wing 04 · Future Area
                </span>
                <h4 className="font-display text-2xl text-[#171715] mt-2">
                  Design
                </h4>
                <p className="text-xs text-[#6B6B6B] mt-2 leading-relaxed">
                  Modernist architectural forms, postal typography, poster print culture, and bronze casting.
                </p>
              </div>
              <span className="text-[11px] font-mono uppercase text-[#6B6B6B]">
                Opening Phase 3
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
