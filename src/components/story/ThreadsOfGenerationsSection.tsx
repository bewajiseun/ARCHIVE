import React, { useState, useRef, useEffect } from 'react';

export interface CarryForwardStory {
  id: string;
  disciplineSeq: string;
  disciplineName: string;
  title: string;
  shortDescription: string;
  expandedSubtitle: string;
  expandedNarrative: string[];
  imageUrl: string;
  alt: string;
  illustrationCredit: string;
  curatorialPillars: { label: string; desc: string }[];
}

const CARRY_FORWARD_STORIES: CarryForwardStory[] = [
  {
    id: 'fashion',
    disciplineSeq: '01',
    disciplineName: 'FASHION',
    title: 'Style in Motion',
    shortDescription:
      'How Nigerian fashion carries cultural memory into new expressions. Discover how earlier influences are reinterpreted through dress, adornment, silhouettes, and contemporary personal style.',
    expandedSubtitle: 'Older influences. New expressions. A continuing story.',
    expandedNarrative: [
      'Nigerian fashion has long carried stories of identity, status, creativity, and belonging. From ceremonial dress and traditional textiles to contemporary tailoring and streetwear, each generation finds new ways to interpret what came before.',
      'Today, designers, stylists, and creative communities draw from historical styles, materials, and cultural references, translating them into new expressions.',
      'This story explores how earlier influences continue to shape what Nigerians wear, how they express themselves, and how fashion becomes a living record of cultural change.',
    ],
    imageUrl:
      'https://res.cloudinary.com/jlggrwhm/image/upload/v1792534261/Nigerian_Heritage_in_Traditional_Attire.png',
    alt: 'Nigerian women wearing traditional attire, gele headwraps, and coral bead jewellery in a documentary-style portrait.',
    illustrationCredit:
      'Illustrative Study · Period-inspired illustration of Nigerian traditional attire, gele headwraps, and coral bead adornment.',
    curatorialPillars: [
      { label: 'Sartorial Memory', desc: 'Textile lineages translating ancestral drape into contemporary silhouettes.' },
      { label: 'Adornment & Status', desc: 'Coral beads and layered jewellery as signifiers of dignity and cultural pride.' },
      { label: 'Living Wardrobe', desc: 'Everyday street style continuously conversing with ceremonial heritage.' },
    ],
  },
  {
    id: 'music',
    disciplineSeq: '02',
    disciplineName: 'MUSIC',
    title: 'Sounds Reimagined',
    shortDescription:
      'Explore how musical traditions, rhythms, and earlier sounds influence the music Nigerian artists create today.',
    expandedSubtitle: 'Harmonies of heritage. Modern polyrhythms. The enduring pulse.',
    expandedNarrative: [
      'Nigerian musical expression thrives on a continuous dialogue between ancestral acoustic traditions, polyrhythmic drumming, and modern brass, guitar, and electronic experimentation. From mid-century highlife dance bands and palmwine acoustic circles to fújì, jùjú, and today’s global Afrobeats soundscapes, each era builds directly upon earlier acoustic innovations.',
      'Contemporary producers, instrumentalists, and vocalists regularly sample traditional percussion, employ indigenous call-and-response phrasing, and weave talking drum motifs into modern studio arrangements.',
      'This story traces how sonic lineage travels across time—showing that the rhythms animating contemporary international stages are deeply rooted in generational creative inheritance.',
    ],
    imageUrl:
      'https://res.cloudinary.com/jlggrwhm/image/upload/v1792534262/Vintage_Nigerian_Highlife_Jazz_Ensemble.png',
    alt: 'A Nigerian highlife-inspired ensemble performing with a trumpet and other musical instruments in a vintage documentary-style scene.',
    illustrationCredit:
      'Illustrative Study · Period-inspired illustration of a vintage Nigerian highlife jazz ensemble with trumpet, horns, and rhythm section.',
    curatorialPillars: [
      { label: 'Acoustic Foundations', desc: 'Traditional percussive timing and polyrhythms anchoring modern arrangements.' },
      { label: 'Brass & Highlife Era', desc: 'Mid-century ballroom orchestrations that shaped modern West African popular music.' },
      { label: 'Global Convergence', desc: 'Contemporary Afrobeats carrying historical cadence to international ears.' },
    ],
  },
  {
    id: 'photography',
    disciplineSeq: '03',
    disciplineName: 'PHOTOGRAPHY',
    title: 'Seeing Nigeria Differently',
    shortDescription:
      'Discover how photographs document changing identities, places, and everyday life, shaping how generations understand Nigerian experiences.',
    expandedSubtitle: 'Framing memory. Archiving light. The visual witness.',
    expandedNarrative: [
      'Photographs are more than static documents; they are active instruments of personal and civic dignity. From mid-century neighbourhood portrait studios where sitters posed with bespoke backdrops and refined personal styling, to street reportage capturing rapid urban growth, photography has continually reshaped how Nigerians perceive themselves.',
      'Contemporary visual artists and documentarians return to these visual archives to study light, posture, camera angles, and street compositions, finding new ways to document the modern city.',
      'This story explores how the photographic lens preserves fleeting cultural moments, creating a continuous visual memory that connects generations of Nigerian experience.',
    ],
    imageUrl:
      'https://res.cloudinary.com/jlggrwhm/image/upload/v1792534346/Lagos_Street_Life_Mid-Century.png',
    alt: 'A period-inspired Lagos street scene with a photographer, pedestrians, vintage vehicles, and a photo studio.',
    illustrationCredit:
      'Illustrative Study · Period-inspired illustration of mid-century Lagos street life, studio photographers, pedestrians, and vintage vehicles.',
    curatorialPillars: [
      { label: 'Studio Staging', desc: 'Formal portrait spaces creating aspirational records of autonomy and elegance.' },
      { label: 'Street Witness', desc: 'Spontaneous street life documenting municipal change and urban vitality.' },
      { label: 'Generational Album', desc: 'Family photographs as intimate primary archives of community history.' },
    ],
  },
  {
    id: 'design',
    disciplineSeq: '04',
    disciplineName: 'DESIGN',
    title: 'Design, Reinterpreted',
    shortDescription:
      'Explore how lettering, posters, symbols, and earlier visual languages inspire new forms of Nigerian visual communication.',
    expandedSubtitle: 'Symbols of communication. Graphic memory. Living typography.',
    expandedNarrative: [
      'Visual communication in Nigeria spans centuries of graphic ingenuity—from ancient ideographic and symbolic systems like nsibidi and adire stenciling to mid-century hand-painted cinema posters, record sleeves, and municipal sign-writing.',
      'Today, graphic artists, typographers, and spatial designers look back at this rich typographic and motif-driven heritage, adapting bold hand-rendered lettering and vernacular geometries into contemporary branding, digital interfaces, and spatial design.',
      'This story examines how graphic memory persists across formats, proving that yesterday’s visual idioms continue to provide a foundation for contemporary African visual language.',
    ],
    imageUrl:
      'https://res.cloudinary.com/jlggrwhm/image/upload/v1792534260/Nigerian_Poster_and_Print_Ephemera.png',
    alt: 'A collage of vintage-inspired Nigerian posters, bold typography, printed ephemera, and traditional visual motifs.',
    illustrationCredit:
      'Illustrative Study · Period-inspired illustration of Nigerian printed posters, bold display typography, and graphic ephemera.',
    curatorialPillars: [
      { label: 'Vernacular Lettering', desc: 'Hand-painted cinema and market typography reinterpreted in digital font design.' },
      { label: 'Symbolic Systems', desc: 'Historical motifs and ideographic geometries repurposed for modern identities.' },
      { label: 'Print Ephemera', desc: 'Record jackets, handbills, and exhibition posters as graphic design benchmarks.' },
    ],
  },
];

export const ThreadsOfGenerationsSection: React.FC = () => {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const cardTriggerRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});
  const sectionRef = useRef<HTMLElement>(null);
  const expandedPanelRef = useRef<HTMLDivElement>(null);

  // Restore focus to triggering card button when returning to grid view
  const handleCollapse = (idToFocus?: string) => {
    const targetId = idToFocus || expandedId;
    setExpandedId(null);
    if (targetId && cardTriggerRefs.current[targetId]) {
      setTimeout(() => {
        cardTriggerRefs.current[targetId]?.focus();
      }, 50);
    }
  };

  const handleExpand = (id: string) => {
    setExpandedId(id);
    // Smooth scroll if panel top is scrolled past
    setTimeout(() => {
      if (expandedPanelRef.current) {
        const rect = expandedPanelRef.current.getBoundingClientRect();
        if (rect.top < 80) {
          expandedPanelRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    }, 60);
  };

  const currentExpandedStory = CARRY_FORWARD_STORIES.find((s) => s.id === expandedId);

  return (
    <section
      ref={sectionRef}
      id="stories"
      aria-label="What We Carry Forward"
      className="relative w-full bg-[#321F18] text-[#FAF8F4] py-20 md:py-28 lg:py-32 overflow-hidden select-none transition-colors duration-300"
    >
      {/* Subtle Archival Grain / Watermark */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04] mix-blend-overlay"
        style={{
          backgroundImage:
            'radial-gradient(circle at 50% 50%, #FAF8F4 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16">
        {/* =========================================================================
            SECTION HEADER: Stationary above the card container
            Eyebrow: FEATURED STORY
            Headline: What We Carry Forward
            Supporting copy: Nigerian creativity is always evolving...
            ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end mb-12 md:mb-16">
          {/* Left Column: Eyebrow + Headline */}
          <div className="lg:col-span-7 flex flex-col items-start">
            <div className="flex items-center space-x-2.5 text-[11px] font-mono tracking-[0.24em] uppercase text-[#A4401F] mb-3 font-semibold">
              <span className="w-7 h-[1.5px] bg-[#A4401F] inline-block" aria-hidden="true" />
              <span>FEATURED STORY</span>
            </div>

            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-[68px] text-[#FAF8F4] leading-[0.96] tracking-tight">
              <span>What We Carry </span>
              <span className="italic text-[#A4401F] font-normal">Forward</span>
            </h2>
          </div>

          {/* Right Column: Supporting Copy */}
          <div className="lg:col-span-5 flex flex-col justify-end">
            <p className="font-sans text-[14.5px] sm:text-[15.5px] md:text-[16px] leading-[1.62] text-[#D5D0C1] max-w-[480px]">
              Nigerian creativity is always evolving. Earlier influences find new expression in the clothes we wear, the sounds we create, the images we preserve, and the visual languages we reinterpret.
            </p>
          </div>
        </div>

        {/* =========================================================================
            CONTAINER FOR CARDS OR EXPANDED PANEL
            CRITICAL REQUIREMENT:
            The expanded card replaces the four-card row in the exact same position.
            It must never appear underneath the four cards.
            Either the 4-card grid OR the expanded panel is rendered — never both.
            ========================================================================= */}
        <div className="w-full">
          {!currentExpandedStory ? (
            /* =====================================================================
               DEFAULT STATE: FOUR VERTICAL CARDS IN A SINGLE HORIZONTAL ROW ON DESKTOP
               Order: Fashion, Music, Photography, Design
               ===================================================================== */
            <div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch"
              role="region"
              aria-label="What We Carry Forward Stories Grid"
            >
              {CARRY_FORWARD_STORIES.map((story) => (
                <article
                  key={story.id}
                  className="group relative flex flex-col justify-between bg-[#321F18] border border-[#E3DED5]/20 hover:border-[#A4401F]/80 transition-all duration-300 rounded-none overflow-hidden"
                >
                  {/* Top Image Container */}
                  <div
                    onClick={() => handleExpand(story.id)}
                    className="relative w-full h-[240px] sm:h-[260px] lg:h-[270px] overflow-hidden bg-[#241510] flex-shrink-0 cursor-pointer"
                  >
                    <img
                      src={story.imageUrl}
                      alt={story.alt}
                      loading="lazy"
                      className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                    />
                    {/* Hover overlay cue */}
                    <div
                      className="absolute inset-0 bg-transparent group-hover:bg-[#171715]/20 transition-colors duration-300"
                      aria-hidden="true"
                    />
                    <div className="absolute top-3 left-3 bg-[#171715]/80 backdrop-blur-xs px-2.5 py-1 border border-[#E3DED5]/20">
                      <span className="font-mono text-[10px] tracking-widest text-[#FAF8F4] uppercase">
                        {story.disciplineSeq} · {story.disciplineName}
                      </span>
                    </div>
                  </div>

                  {/* Card Content Body */}
                  <div className="p-6 flex flex-col justify-between flex-1 bg-[#321F18]">
                    <div>
                      {/* Discipline Number & Label */}
                      <div className="flex items-center space-x-2 text-xs font-mono text-[#A4401F] mb-2.5 font-semibold">
                        <span>{story.disciplineSeq} — {story.disciplineName}</span>
                      </div>

                      {/* Story Title */}
                      <h3
                        onClick={() => handleExpand(story.id)}
                        className="font-display text-2xl sm:text-[26px] text-[#FAF8F4] font-normal leading-[1.12] tracking-tight mb-3 cursor-pointer group-hover:text-[#A4401F] transition-colors"
                      >
                        {story.title}
                      </h3>

                      {/* Short Description */}
                      <p className="font-sans text-[13.5px] sm:text-[14px] leading-[1.65] text-[#D5D0C1]/85">
                        {story.shortDescription}
                      </p>
                    </div>

                    {/* Card Action Button: SEE MORE → */}
                    <div className="pt-5 mt-6 border-t border-[#E3DED5]/15 flex items-center justify-between">
                      <button
                        ref={(el) => {
                          cardTriggerRefs.current[story.id] = el;
                        }}
                        type="button"
                        onClick={() => handleExpand(story.id)}
                        aria-expanded={false}
                        aria-label={`See more details for ${story.title} (${story.disciplineName})`}
                        className="inline-flex items-center text-xs font-mono font-medium tracking-wider text-[#A4401F] hover:text-[#FAF8F4] transition-colors cursor-pointer group/btn"
                      >
                        <span className="uppercase">SEE MORE</span>
                        <span className="ml-2 transition-transform duration-200 group-hover/btn:translate-x-1.5" aria-hidden="true">
                          →
                        </span>
                      </button>

                      <span className="font-mono text-[10px] text-[#D5D0C1]/50 uppercase tracking-widest">
                        DISCIPLINE {story.disciplineSeq}
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            /* =====================================================================
               EXPANDED STATE: REPLACES THE FOUR-CARD ROW IN THE EXACT SAME POSITION
               Proportions on desktop: Left text ~48%, Right image ~52%
               Continuous border, sharp corners, zero carousel controls
               ===================================================================== */
            <div
              ref={expandedPanelRef}
              className="w-full bg-[#321F18] border border-[#E3DED5]/25 rounded-none overflow-hidden transition-all duration-300 animate-in fade-in zoom-in-[0.99]"
              role="region"
              aria-label={`Expanded Story: ${currentExpandedStory.title}`}
            >
              {/* Top Discipline Bar & Quick Discipline Switcher */}
              <div className="flex flex-wrap items-center justify-between px-6 sm:px-8 md:px-10 py-4 bg-[#281812] border-b border-[#E3DED5]/20 gap-3">
                <div className="flex items-center space-x-3">
                  <span className="font-mono text-xs font-semibold text-[#A4401F] tracking-[0.2em] uppercase">
                    {currentExpandedStory.disciplineSeq} — {currentExpandedStory.disciplineName}
                  </span>
                  <span className="text-[#E3DED5]/30 font-mono text-xs hidden sm:inline">|</span>
                  <span className="font-mono text-xs text-[#D5D0C1]/70 tracking-wider hidden sm:inline">
                    EXPANDED EDITORIAL DOSSIER
                  </span>
                </div>

                {/* Quick Switcher among all 4 Disciplines */}
                <div className="flex items-center space-x-1 sm:space-x-2">
                  <span className="font-mono text-[10.5px] text-[#D5D0C1]/60 uppercase tracking-wider mr-2 hidden md:inline">
                    Discipline:
                  </span>
                  {CARRY_FORWARD_STORIES.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => handleExpand(item.id)}
                      className={`px-2.5 py-1 font-mono text-[11px] tracking-wider uppercase transition-colors cursor-pointer rounded-none border ${
                        item.id === currentExpandedStory.id
                          ? 'bg-[#A4401F] text-[#FAF8F4] border-[#A4401F] font-semibold'
                          : 'bg-transparent text-[#D5D0C1] border-[#E3DED5]/20 hover:border-[#A4401F]/60 hover:text-[#FAF8F4]'
                      }`}
                    >
                      {item.disciplineSeq}
                    </button>
                  ))}

                  {/* Return to Grid ("SEE LESS") Button in Top Bar */}
                  <button
                    type="button"
                    onClick={() => handleCollapse()}
                    aria-label="Close expanded story and return to four cards"
                    className="ml-3 px-3 py-1 bg-transparent hover:bg-[#FAF8F4]/10 text-[#D5D0C1] hover:text-[#FAF8F4] border border-[#E3DED5]/30 font-mono text-xs uppercase tracking-wider rounded-none transition-colors cursor-pointer"
                  >
                    ✕ CLOSE
                  </button>
                </div>
              </div>

              {/* Main Split Body: Left Text Column (~48%) & Right Image Column (~52%) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
                {/* -----------------------------------------------------------------
                    LEFT COLUMN: Narrative Prose, Subtitle, Context & "SEE LESS"
                    ----------------------------------------------------------------- */}
                <div className="lg:col-span-6 xl:col-span-6 p-6 sm:p-8 md:p-10 lg:p-12 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-[#E3DED5]/20">
                  <div>
                    {/* Discipline Badge */}
                    <div className="flex items-center space-x-2 text-xs font-mono text-[#A4401F] mb-3 font-semibold">
                      <span>DISCIPLINE {currentExpandedStory.disciplineSeq}</span>
                      <span className="w-4 h-[1px] bg-[#A4401F]" />
                      <span>{currentExpandedStory.disciplineName}</span>
                    </div>

                    {/* Large Serif Headline */}
                    <h3 className="font-display text-3xl sm:text-4xl md:text-[44px] lg:text-[48px] text-[#FAF8F4] font-normal leading-[1.05] tracking-tight mb-3">
                      {currentExpandedStory.title}
                    </h3>

                    {/* Editorial Subtitle */}
                    <p className="font-serif italic text-lg sm:text-xl md:text-[22px] text-[#A4401F] leading-snug mb-6 font-normal">
                      {currentExpandedStory.expandedSubtitle}
                    </p>

                    {/* Complete Narrative Text */}
                    <div className="space-y-4 font-sans text-[15px] sm:text-[16px] leading-[1.75] text-[#D5D0C1] mb-8">
                      {currentExpandedStory.expandedNarrative.map((paragraph, idx) => (
                        <p key={idx}>{paragraph}</p>
                      ))}
                    </div>

                    {/* Curatorial Pillars / Key Themes */}
                    <div className="mt-8 pt-6 border-t border-[#E3DED5]/20 space-y-3">
                      <span className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-[#A4401F] block font-semibold">
                        CURATORIAL THEMES
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {currentExpandedStory.curatorialPillars.map((pillar, i) => (
                          <div key={i} className="p-3 bg-[#241510] border border-[#E3DED5]/15 rounded-none">
                            <span className="font-mono text-[11px] text-[#FAF8F4] font-medium block mb-1">
                              {pillar.label}
                            </span>
                            <p className="font-sans text-[11.5px] leading-relaxed text-[#D5D0C1]/80">
                              {pillar.desc}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* "SEE LESS" Action at Bottom of Left Column */}
                  <div className="mt-10 pt-6 border-t border-[#E3DED5]/20 flex flex-wrap items-center justify-between gap-4">
                    <button
                      type="button"
                      onClick={() => handleCollapse()}
                      aria-label="Return to the four-card overview"
                      className="inline-flex items-center justify-center bg-[#A4401F] hover:bg-[#7F3018] text-[#FAF8F4] font-mono text-xs font-medium tracking-[0.12em] uppercase px-6 py-3 transition-colors cursor-pointer rounded-none group"
                    >
                      <span className="mr-2 transition-transform duration-200 group-hover:-translate-x-1" aria-hidden="true">
                        ←
                      </span>
                      <span>SEE LESS</span>
                    </button>

                    <div className="flex items-center space-x-2 text-xs font-mono text-[#D5D0C1]/60">
                      <span>Showing {currentExpandedStory.disciplineSeq} of 04</span>
                    </div>
                  </div>
                </div>

                {/* -----------------------------------------------------------------
                    RIGHT COLUMN: Prominent Image Plate (~52% on Desktop)
                    Fills column without distortion + Period-inspired disclosure
                    ----------------------------------------------------------------- */}
                <div className="lg:col-span-6 xl:col-span-6 flex flex-col justify-between bg-[#241510] min-h-[380px] sm:min-h-[460px] lg:min-h-full">
                  {/* Full-bleed responsive image container */}
                  <div className="relative w-full flex-1 overflow-hidden min-h-[320px] sm:min-h-[420px] lg:min-h-[500px]">
                    <img
                      src={currentExpandedStory.imageUrl}
                      alt={currentExpandedStory.alt}
                      className="w-full h-full object-cover object-center transition-transform duration-700 ease-out hover:scale-[1.02]"
                    />
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-[#241510] via-transparent to-transparent opacity-40 pointer-events-none"
                      aria-hidden="true"
                    />
                  </div>

                  {/* Image Plate Caption & Illustrative Disclosure */}
                  <div className="p-5 sm:p-6 bg-[#241510] border-t border-[#E3DED5]/20">
                    <div className="flex items-center justify-between mb-1 text-[10px] font-mono tracking-widest text-[#A4401F] uppercase font-semibold">
                      <span>FIGURE {currentExpandedStory.disciplineSeq} · {currentExpandedStory.disciplineName}</span>
                      <span>PERIOD-INSPIRED ARCHIVAL STUDY</span>
                    </div>
                    <p className="font-sans text-xs text-[#D5D0C1]/85 leading-relaxed">
                      {currentExpandedStory.illustrationCredit}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

// Also export alias for convenient import under both names
export const WhatWeCarryForwardSection = ThreadsOfGenerationsSection;
