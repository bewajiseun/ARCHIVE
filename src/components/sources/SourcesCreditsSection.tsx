import React, { useState } from 'react';
import { ArrowRight, X, ExternalLink } from 'lucide-react';

export interface SourceEntry {
  id: string;
  seq: string;
  title: string;
  description: string;
  details: string[];
}

const SOURCES_DATA: SourceEntry[] = [
  {
    id: 'photo-archives',
    seq: '01',
    title: 'Photography Archives',
    description: 'Photographs documenting Nigeria’s people, places, and changing creative life.',
    details: [
      'Lagos Mid-Century Studio Photographic Collections',
      'Abi Morocco Photos Studio Archive Documentation',
      'Commercial portraiture negative surveys (1960–1985)',
      'Community negative preservation and digitization initiatives',
    ],
  },
  {
    id: 'public-records',
    seq: '02',
    title: 'Public Records & Institutions',
    description: 'Public records, documents, and collections that inform historical context.',
    details: [
      'National Archives of Nigeria (Enugu, Ibadan, and Kaduna branches)',
      'Centre for Contemporary Art (CCA) Lagos Library & Ephemera Collection',
      'Lagos State Ministry of Information historic press archives',
      'Mid-century municipal census records and architectural surveys',
    ],
  },
  {
    id: 'cultural-collections',
    seq: '03',
    title: 'Cultural Collections',
    description: 'Textile, fashion, music, and other cultural references from relevant collections.',
    details: [
      'Traditional Yoruba Aṣọ Ọ̀kè textile sample registries',
      'Abeokuta Adire Eleko pattern documentation & indigo guild histories',
      'West African 78rpm & vinyl recordings (Decca West Africa, Phillips)',
      'Historic highlife and jùjú music ensemble photographs',
    ],
  },
  {
    id: 'private-collections',
    seq: '04',
    title: 'Private Collections',
    description: 'Photographs and materials shared by individuals, families, and communities.',
    details: [
      'Family album contributions and ceremonial portrait loans',
      'Private photography collections from Lagos Island and Ebute Metta',
      'Oral history recordings with master weavers and studio apprentices',
      'Studio client print keepsakes preserved across three generations',
    ],
  },
  {
    id: 'publications-research',
    seq: '05',
    title: 'Publications & Research',
    description: 'Books, articles, and research that provide context for the stories.',
    details: [
      'Scholarly monographs on Nigerian studio photography and modernism',
      'African Arts journal special editions on Yoruba visual culture',
      'Peer-reviewed analyses of mid-century urban self-fashioning',
      'Textile preservation guidelines from the International Council of Museums',
    ],
  },
];

export const SourcesCreditsSection: React.FC = () => {
  const [activeModalSource, setActiveModalSource] = useState<SourceEntry | null>(null);
  const [isFullCreditsOpen, setIsFullCreditsOpen] = useState(false);

  return (
    <section
      id="sources"
      aria-label="Sources and Credits"
      className="relative w-full bg-[#FAF8F4] text-[#171715] py-16 md:py-24 overflow-hidden select-none"
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16">
        {/* =========================================================================
            TWO-COLUMN EDITORIAL COMPOSITION (Strictly NO central images or collages)
            ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* =======================================================================
              LEFT COLUMN (approx 42% width): Label, Large Headline, Copy, CTA, Cue
              ======================================================================= */}
          <div className="lg:col-span-5 flex flex-col items-start justify-between h-full pt-1">
            <div>
              {/* Section Label: 06 — SOURCES & CREDITS */}
              <div className="flex items-center space-x-2.5 text-[11px] font-mono tracking-[0.22em] uppercase text-[#171715] font-medium mb-6 md:mb-8">
                <span className="text-[#A4401F] font-bold">06</span>
                <span className="w-6 h-[1px] bg-[#E3DED5]" aria-hidden="true" />
                <span className="text-[#171715]">SOURCES & CREDITS</span>
                <span className="w-10 sm:w-16 h-[1px] bg-[#E3DED5] hidden sm:inline-block" aria-hidden="true" />
              </div>

              {/* Large Editorial Headline */}
              <h2 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-[76px] xl:text-[84px] text-[#171715] leading-[0.92] tracking-tight">
                <span className="block">Every story</span>
                <span className="block">
                  has <span className="italic text-[#A4401F] font-normal">a source.</span>
                </span>
              </h2>

              {/* Supporting Copy */}
              <p className="font-sans text-[15.5px] sm:text-[16.5px] md:text-[17.5px] leading-[1.62] text-[#171715]/90 mt-8 md:mt-10 max-w-[460px]">
                ARCHIVE brings together photographs, objects, records, and research from people, institutions, and collections. We credit the sources behind each story and distinguish documented history from interpretation.
              </p>

              {/* Single Primary CTA */}
              <div className="mt-8 md:mt-10">
                <button
                  type="button"
                  onClick={() => setIsFullCreditsOpen(true)}
                  className="inline-flex items-center justify-center bg-[#A4401F] hover:bg-[#7F3018] text-[#FAF8F4] font-sans text-[13px] md:text-[13.5px] font-medium tracking-[0.06em] uppercase px-6 py-3 transition-colors duration-200 cursor-pointer shadow-xs focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A4401F]"
                  style={{
                    height: '52px',
                    borderRadius: '0px',
                  }}
                >
                  <span>View full credits</span>
                  <span className="ml-3 text-base leading-none" aria-hidden="true">→</span>
                </button>
              </div>
            </div>
          </div>

          {/* =======================================================================
              RIGHT COLUMN (approx 52% width): Five Structured Source Entries
              ======================================================================= */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            {/* The Five-Row Source Register */}
            <div className="border-t border-[#E3DED5] divide-y divide-[#E3DED5]">
              {SOURCES_DATA.map((source) => (
                <article
                  key={source.id}
                  onClick={() => setActiveModalSource(source)}
                  className="group py-6 sm:py-7 md:py-8 flex items-center justify-between cursor-pointer transition-colors duration-200 hover:bg-[#E3DED5]/30 px-2 sm:px-4"
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setActiveModalSource(source);
                    }
                  }}
                  aria-label={`${source.seq} — ${source.title}: ${source.description}`}
                >
                  <div className="flex items-start space-x-4 sm:space-x-6 pr-4 flex-1">
                    {/* Sequence Number with connecting hairline */}
                    <div className="flex items-center space-x-2 pt-1 flex-shrink-0">
                      <span className="font-mono text-xs sm:text-sm font-semibold text-[#A4401F]">
                        {source.seq}
                      </span>
                      <span className="w-5 sm:w-7 h-[1px] bg-[#E3DED5] group-hover:bg-[#A4401F] transition-colors" aria-hidden="true" />
                    </div>

                    {/* Source Title & Description */}
                    <div className="flex-1">
                      <h3 className="font-display text-2xl sm:text-3xl md:text-[32px] text-[#171715] leading-tight tracking-tight group-hover:text-[#A4401F] transition-colors">
                        {source.title}
                      </h3>
                      <p className="font-sans text-xs sm:text-[13.5px] md:text-[14px] text-[#6B6B6B] mt-1.5 leading-relaxed max-w-lg">
                        {source.description}
                      </p>
                    </div>
                  </div>

                  {/* Outlined Circular Arrow Control at Far Right */}
                  <div
                    aria-hidden="true"
                    className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-[#171715] flex items-center justify-center flex-shrink-0 text-[#171715] group-hover:border-[#A4401F] group-hover:text-[#A4401F] group-hover:bg-[#A4401F]/5 transition-all duration-200"
                  >
                    <ArrowRight className="w-4 h-4 stroke-[1.75] transition-transform duration-200 group-hover:translate-x-0.5" />
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          ACCESSIBLE MODAL: Single Source Category Details
          ========================================================================= */}
      {activeModalSource && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={activeModalSource.title}
          className="fixed inset-0 z-50 bg-[#171715]/50 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6"
        >
          <div
            className="w-full max-w-lg bg-[#FAF8F4] border border-[#171715] p-6 sm:p-8 shadow-2xl animate-in zoom-in-95 duration-200"
            style={{ borderRadius: '0px' }}
          >
            <div className="flex items-center justify-between pb-4 border-b border-[#E3DED5]">
              <div className="flex items-center space-x-2 text-xs font-mono uppercase text-[#A4401F] font-semibold">
                <span>{activeModalSource.seq} — SOURCE CITATION</span>
              </div>
              <button
                type="button"
                onClick={() => setActiveModalSource(null)}
                aria-label="Close dialog"
                className="w-9 h-9 border border-[#171715] flex items-center justify-center hover:bg-[#171715] hover:text-[#FAF8F4] transition-colors cursor-pointer"
                style={{ borderRadius: '0px' }}
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="mt-5 space-y-4">
              <h3 className="font-display text-3xl text-[#171715] leading-tight">
                {activeModalSource.title}
              </h3>
              <p className="font-sans text-sm text-[#6B6B6B] leading-relaxed">
                {activeModalSource.description}
              </p>

              <div className="p-4 bg-[#FAF8F4] border border-[#E3DED5] text-xs font-sans text-[#171715] space-y-2">
                <p className="font-mono font-semibold uppercase text-[#A4401F]">
                  Consulted Collections & Repositories:
                </p>
                <ul className="list-disc pl-4 space-y-1.5 text-[#171715]/80">
                  {activeModalSource.details.map((detail, i) => (
                    <li key={i}>{detail}</li>
                  ))}
                </ul>
              </div>

              <p className="text-xs font-mono text-[#6B6B6B]">
                ARCHIVE Sourcing Policy: All items are cited with attribution and reproduction rights status.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-[#E3DED5] flex justify-end">
              <button
                type="button"
                onClick={() => setActiveModalSource(null)}
                className="bg-[#171715] text-[#FAF8F4] hover:bg-[#A4401F] text-xs font-mono uppercase px-5 py-2.5 transition-colors cursor-pointer"
                style={{ borderRadius: '0px' }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          ACCESSIBLE MODAL: Full Institutional Credits & Methodology
          ========================================================================= */}
      {isFullCreditsOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Full Institutional Credits"
          className="fixed inset-0 z-50 bg-[#171715]/50 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6"
        >
          <div
            className="w-full max-w-2xl bg-[#FAF8F4] border border-[#171715] p-6 sm:p-8 max-h-[85vh] overflow-y-auto shadow-2xl animate-in zoom-in-95 duration-200"
            style={{ borderRadius: '0px' }}
          >
            <div className="flex items-center justify-between pb-4 border-b border-[#E3DED5]">
              <div className="flex items-center space-x-2 text-xs font-mono uppercase text-[#A4401F] font-semibold">
                <span>FULL INSTITUTIONAL CREDITS</span>
              </div>
              <button
                type="button"
                onClick={() => setIsFullCreditsOpen(false)}
                aria-label="Close dialog"
                className="w-9 h-9 border border-[#171715] flex items-center justify-center hover:bg-[#171715] hover:text-[#FAF8F4] transition-colors cursor-pointer"
                style={{ borderRadius: '0px' }}
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="mt-6 space-y-6">
              <div>
                <h3 className="font-display text-3xl sm:text-4xl text-[#171715] leading-tight">
                  Archival Ethics & Acknowledgements
                </h3>
                <p className="font-sans text-sm text-[#6B6B6B] mt-2 leading-relaxed">
                  ARCHIVE adheres to strict cultural stewardship principles. Every creative work,
                  photograph, sound recording, and oral testimony featured in this museum is
                  researched with direct provenance mappings.
                </p>
              </div>

              <div className="space-y-4">
                {SOURCES_DATA.map((item) => (
                  <div key={item.id} className="p-4 bg-[#FAF8F4] border border-[#E3DED5]">
                    <div className="flex items-center space-x-2 font-mono text-xs text-[#A4401F] font-bold uppercase mb-1">
                      <span>{item.seq}</span>
                      <span>—</span>
                      <span>{item.title}</span>
                    </div>
                    <ul className="list-disc pl-4 text-xs font-sans text-[#171715]/80 space-y-1">
                      {item.details.map((d, i) => (
                        <li key={i}>{d}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <div className="p-4 border border-[#E3DED5] text-xs font-mono text-[#6B6B6B]">
                <p className="font-bold text-[#171715] uppercase mb-1">Reproduction Inquiries</p>
                <p>To submit archival materials, request corrections, or inquire about loan permissions, contact: provenance@archive-nigeria.org</p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#E3DED5] flex justify-end">
              <button
                type="button"
                onClick={() => setIsFullCreditsOpen(false)}
                className="bg-[#171715] text-[#FAF8F4] hover:bg-[#A4401F] text-xs font-mono uppercase px-6 py-2.5 transition-colors cursor-pointer"
                style={{ borderRadius: '0px' }}
              >
                Close Credits
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
