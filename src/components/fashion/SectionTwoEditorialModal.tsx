import React, { useEffect, useRef } from 'react';
import { X, ChevronLeft, ChevronRight, ArrowLeft } from 'lucide-react';

export interface SectionTwoArticleData {
  id: string;
  cardSeq: string;
  cardTitle: string;
  readTime: string;

  // Lead Section
  leadHeadline: string;
  leadParagraph: string;
  leadImage: {
    url: string;
    alt: string;
    caption: string;
    credit: string;
  };

  // Section 1: Text Left, Large Dominant Image Right
  sectionOne: {
    subheading: string;
    paragraphs: string[];
    pullQuote?: string;
    image: {
      url: string;
      alt: string;
      caption: string;
      credit: string;
    };
  };

  // Section 2: Image Left + Text Bottom Left | Two Columns Text Right + Wide Image Bottom Right
  sectionTwo: {
    leftImage: {
      url: string;
      alt: string;
      caption: string;
      credit: string;
    };
    leftSubheading: string;
    leftParagraph: string;

    rightSubheading: string;
    rightDualColumns: {
      colA: string[];
      colB: string[];
    };
    rightWideImage: {
      url: string;
      alt: string;
      caption: string;
      credit: string;
    };
  };

  // Section 3: Synthesis & Key Themes
  sectionThree: {
    subheading: string;
    synthesisText: string;
    curatorialPillars: { label: string; desc: string }[];
  };

  colophon: {
    curatorialNote: string;
  };
}

export const SECTION_TWO_ARTICLES: Record<string, SectionTwoArticleData> = {
  'card-01': {
    id: 'card-01',
    cardSeq: '01',
    cardTitle: 'Dress, identity and heritage',
    readTime: '5 MIN READ',
    leadHeadline: 'How Clothing, Adornment, and Personal Style Express Culture, Status, and Dignity Across Generations.',
    leadParagraph:
      'Clothing in Nigerian cultural history is never merely utilitarian. Across generations, ceremonial attire, hand-loomed textiles, and personal styling have served as an active visual ledger of family dignity, civic pride, and artistic innovation.',
    leadImage: {
      url: '/assets/Regal_Yoruba_Portrait.png',
      alt: 'Regal Yoruba portrait in traditional dress and layered coral bead adornment in a weathered courtyard',
      caption: 'Regal Yoruba ceremonial attire, layered coral bead neckwear, and beaded wrist cuffs.',
      credit: 'Historical Portrait Archive',
    },
    sectionOne: {
      subheading: 'The Language of Adornment & Personal Dignity',
      paragraphs: [
        'Across Nigeria’s cultural landscapes, what a person wears communicates immediately: their community roots, marital or titular status, and personal artistry. The heavy presence of natural coral beads (Ìyùn), polished brass, and hand-woven wraps creates a tactile language understood by all.',
        'Mid-century portrait studios in Lagos, Ibadan, and Enugu provided spaces where everyday citizens staged their personal elegance. Sitters chose bespoke garments and balanced headwear to assert their presence with pride and autonomy.',
      ],
      pullQuote: '“Before the fabric is worn, it carries the hands of the spinner, the dyer, and the weaver into the modern street.”',
      image: {
        url: 'https://res.cloudinary.com/jlggrwhm/image/upload/v1792534261/Nigerian_Heritage_in_Traditional_Attire.png',
        alt: 'Nigerian women in traditional attire with gele headwraps and coral bead jewelry',
        caption: 'Architectural folds of the Gele headwrap harmonized with tailored buba and iro silhouettes.',
        credit: 'Traditional Dress & Adornment Collection',
      },
    },
    sectionTwo: {
      leftImage: {
        url: '/assets/fashion-fila.jpg',
        alt: 'Hand-embroidered Fila cap illustrating geometric crown symmetry',
        caption: 'Hand-embroidered Fila cap illustrating geometric crown symmetry.',
        credit: 'Yoruba Headwear Study',
      },
      leftSubheading: 'The Geometry of Headwear & Crown Balance',
      leftParagraph:
        'Headwear in Nigerian tradition is never accidental. The crisp architectural fold of an embroidered fila or the balanced crown of a pleated gele signals maturity, lineage, and personal disposition.',
      rightSubheading: 'Ceremonial Regalia Meets Contemporary Urban Silhouettes',
      rightDualColumns: {
        colA: [
          'Ceremonial occasions require coordinated fabrics—Aṣọ-Ẹbí—uniting hundreds of relatives into a cohesive visual celebration. The shared pattern confirms communal solidarity and mutual belonging across extended families.',
        ],
        colB: [
          'Today’s Nigerian fashion practitioners reinterpret these ancestral codes on Lagos runways, pairing heritage coral beads with unstructured blazers and reimagined streetwear cuts that carry history forward.',
        ],
      },
      rightWideImage: {
        url: '/assets/asooke-worn.jpg',
        alt: 'Contemporarily worn ceremonial ensemble celebrating generational sartorial continuity',
        caption: 'Contemporarily worn ceremonial ensemble celebrating generational sartorial continuity.',
        credit: 'Contemporary Sartorial Practice',
      },
    },
    sectionThree: {
      subheading: 'Living Sartorial Heritage',
      synthesisText:
        'Nigerian dress demonstrates that heritage is not an artifact preserved under museum glass, but an active wardrobe continuously reinvented with each passing era.',
      curatorialPillars: [
        { label: 'Sartorial Memory', desc: 'Textile lineages translating ancestral drape into contemporary silhouettes.' },
        { label: 'Adornment & Status', desc: 'Coral beads and layered jewellery as signifiers of dignity and cultural pride.' },
        { label: 'Living Wardrobe', desc: 'Everyday street style continuously conversing with ceremonial heritage.' },
      ],
    },
    colophon: {
      curatorialNote: 'Curated by ARCHIVE · Fashion & Material Culture',
    },
  },

  'card-02': {
    id: 'card-02',
    cardSeq: '02',
    cardTitle: 'Textiles and craftsmanship',
    readTime: '6 MIN READ',
    leadHeadline: 'The Making of Aṣọ Òkè: The People, Craft, and Cultural Meaning Woven into Every Thread.',
    leadParagraph:
      'Aṣọ Òkè—literally "top cloth" or prestige fabric—is a centuries-old handwoven textile produced by Yoruba master weavers in southwestern Nigeria. Worn for weddings, coronations, and significant life milestones, it represents an unbroken tradition of artisanal mastery.',
    leadImage: {
      url: '/assets/thread_by_thread.jpg',
      alt: 'Detailed view of woven Aṣọ Òkè textile threads and craftsmanship',
      caption: 'Warp threads held under tension on a narrow-strip horizontal loom.',
      credit: 'Weaving Guild Documentation',
    },
    sectionOne: {
      subheading: 'From Raw Fiber to Trowel: The Four Sacred Stages',
      paragraphs: [
        'The creation of Aṣọ Òkè involves four distinct artisanal disciplines: ginning (orùn) to separate seeds from raw cotton, carding and hand-spinning (òwú) using weighted spindle whorls, vat-dyeing in natural indigo pits, and meticulous warping (títa).',
        'Master weavers calculate warp counts without written blueprints. By varying tension and alternating coloured threads, they embed ancestral symbols and lineage proverbs into the very structure of the cloth.',
      ],
      pullQuote: '“The loom does not make the cloth; the rhythmic memory of the weaver’s hands guides the wooden shuttle.”',
      image: {
        url: '/assets/fashion-weaving.jpg',
        alt: 'Master artisan operating the narrow-strip horizontal loom in Iseyin weaving quarters',
        caption: 'Master artisan operating the narrow-strip horizontal loom in Iseyin weaving quarters.',
        credit: 'Southwestern Nigerian Weaving Enclaves',
      },
    },
    sectionTwo: {
      leftImage: {
        url: '/assets/asooke-cloth.jpg',
        alt: 'Traditional Etù (indigo-dyed) and Sányán (wild silk) weave structures',
        caption: 'Traditional Etù (indigo-dyed) and Sányán (wild silk) weave structures.',
        credit: 'Classical Weaves Collection',
      },
      leftSubheading: 'The Triad of Heritage Weaves: Sányán, Aláárì, and Etù',
      leftParagraph:
        'Historically, three cloths held supreme cultural rank: Sányán (woven from wild anaphe silkworm cocoons), Aláárì (crimson silk woven with cotton), and Etù (deep indigo dyed cotton speckled with white warp stripes).',
      rightSubheading: 'Modern Adaptations on the Traditional Horizontal Loom',
      rightDualColumns: {
        colA: [
          'Modern weavers in Iseyin, Ede, and Okene incorporate metallic lurex threads, perforated openwork (abata), and custom monograms to meet contemporary wedding fashion demands.',
        ],
        colB: [
          'Despite these modern additions, the core mechanical logic of the narrow-strip loom remains intact, preserving the signature texture, weight, and acoustic rhythm celebrated for centuries.',
        ],
      },
      rightWideImage: {
        url: '/assets/asooke-living.jpg',
        alt: 'Freshly woven narrow-strip cloth ready to be joined into ceremonial agbada and iro',
        caption: 'Freshly woven narrow-strip cloth ready to be joined into ceremonial garments.',
        credit: 'Preserved Artisan Textiles',
      },
    },
    sectionThree: {
      subheading: 'Material Legacy & Craft Traditions',
      synthesisText:
        'Aṣọ Òkè illustrates how sustainable, slow-fashion textile production can survive and thrive across centuries without losing cultural reverence or technical rigor.',
      curatorialPillars: [
        { label: 'Material Wisdom', desc: 'Sourcing wild silk, raw cotton, and natural indigo for enduring structural integrity.' },
        { label: 'Guild Mastery', desc: 'Rigorous calculation of warp counts and tension maintained across family workshops.' },
        { label: 'Living Ceremony', desc: 'The indispensable role of handwoven textiles in marking life milestones.' },
      ],
    },
    colophon: {
      curatorialNote: 'Curated by ARCHIVE · Traditional Textile & Loom Guild',
    },
  },

  'card-03': {
    id: 'card-03',
    cardSeq: '03',
    cardTitle: 'Skills across generations',
    readTime: '5 MIN READ',
    leadHeadline: 'The Tools, Techniques, and Creative Practices that Keep Traditional Nigerian Knowledge Alive Today.',
    leadParagraph:
      'Creative mastery in Nigeria has historically been transmitted through family compounds, oral apprenticeships, and hands-on observation. Guild traditions ensure that centuries-old craft technologies continue to inform contemporary design practice.',
    leadImage: {
      url: '/assets/the_making.jpg',
      alt: 'Generational artisan demonstrating pedal tension and reed alignment on a traditional loom',
      caption: 'Generational artisan demonstrating pedal tension and reed alignment on a traditional loom.',
      credit: 'Traditional Skills Documentation',
    },
    sectionOne: {
      subheading: 'Oral Memory & Haptic Training',
      paragraphs: [
        'In traditional Nigerian craft quarters, education begins early through sensory immersion. Young apprentices learn not from textbooks, but by testing dye temperatures, sorting yarn grades, and memorizing rhythmic pedal sequences.',
        'This haptic memory is deeply collaborative. Elders supervise while journeymen guide younger students, establishing a continuous chain of technical and moral responsibility.',
      ],
      pullQuote: '“Knowledge in our guild is not written in books; it is held in the wrist, the ears, and the fingers.”',
      image: {
        url: '/assets/contribute-artisan.jpg',
        alt: 'Master craftsman shaping raw materials using hand tools passed through three generations',
        caption: 'Master craftsman shaping raw materials using hand tools passed through three generations.',
        credit: 'Haptic Memory Archive',
      },
    },
    sectionTwo: {
      leftImage: {
        url: '/assets/fashion-agbada.jpg',
        alt: 'Intricate needlework and chain stitching executed by senior guild embroiderers',
        caption: 'Intricate needlework and chain stitching executed by senior guild embroiderers.',
        credit: 'Embroidery Workshop Study',
      },
      leftSubheading: 'Heirloom Tools as Instruments of Memory',
      leftParagraph:
        'Craft implements are treasured family heirlooms. Hand-carved wooden shuttles, forged iron blades, and stone burnishers are polished by decades of use, molded perfectly to the artisan’s grip.',
      rightSubheading: 'Connecting Master Guilds with Contemporary Design Studios',
      rightDualColumns: {
        colA: [
          'Forward-thinking Nigerian designers are building direct collaborations with master weaving and dyeing communities, creating fair-wage residencies that preserve classical techniques.',
        ],
        colB: [
          'Digital documentation initiatives now record guild masters in high definition, translating oral trade knowledge into open archives for future generations of makers.',
        ],
      },
      rightWideImage: {
        url: '/assets/asooke-worn.jpg',
        alt: 'Collaborative workshop output uniting veteran loom masters with contemporary fashion apprentices',
        caption: 'Collaborative workshop output uniting veteran loom masters with contemporary apprentices.',
        credit: 'Intergenerational Studio Archive',
      },
    },
    sectionThree: {
      subheading: 'Knowledge Custodianship',
      synthesisText:
        'Traditional creative practices survive not through passive preservation, but through active, respectful intergenerational mentorship and ongoing artistic application.',
      curatorialPillars: [
        { label: 'Haptic Apprenticeship', desc: 'Physical and sensory learning methods preserving subtle technical precision.' },
        { label: 'Heirloom Tooling', desc: 'Hand-crafted implements tuned to artisanal materials across decades of use.' },
        { label: 'Adaptive Transmission', desc: 'Reinterpreting ancestral production techniques for modern sustainable creative economies.' },
      ],
    },
    colophon: {
      curatorialNote: 'Curated by ARCHIVE · Apprenticeship & Material Knowledge',
    },
  },
};

const CARD_ORDER = ['card-01', 'card-02', 'card-03'];

interface SectionTwoEditorialModalProps {
  cardId: string | null;
  isOpen: boolean;
  onClose: () => void;
  onSelectCard: (cardId: string) => void;
  triggerElementRef?: React.RefObject<HTMLElement | null>;
}

export const SectionTwoEditorialModal: React.FC<SectionTwoEditorialModalProps> = ({
  cardId,
  isOpen,
  onClose,
  onSelectCard,
  triggerElementRef,
}) => {
  const modalContainerRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const article = cardId ? SECTION_TWO_ARTICLES[cardId] : null;

  // Trap focus, lock scroll, and handle Escape key
  useEffect(() => {
    if (!isOpen || !article) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Focus close button on mount
    const timer = setTimeout(() => {
      closeButtonRef.current?.focus();
      if (modalContainerRef.current) {
        modalContainerRef.current.scrollTop = 0;
      }
    }, 50);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
      clearTimeout(timer);
      if (triggerElementRef?.current) {
        triggerElementRef.current.focus();
      }
    };
  }, [isOpen, article, onClose, triggerElementRef]);

  if (!isOpen || !article) return null;

  const currentIndex = CARD_ORDER.indexOf(article.id);
  const handlePrev = () => {
    const prevIndex = (currentIndex - 1 + CARD_ORDER.length) % CARD_ORDER.length;
    onSelectCard(CARD_ORDER[prevIndex]);
  };
  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % CARD_ORDER.length;
    onSelectCard(CARD_ORDER[nextIndex]);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="section2-editorial-article-title"
      className="fixed inset-0 z-50 flex items-start justify-center bg-[#171715]/85 backdrop-blur-sm overflow-y-auto p-2 sm:p-4 md:p-6 lg:p-8 animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      {/* Editorial Article Sheet */}
      <div
        ref={modalContainerRef}
        className="relative w-full max-w-[1100px] bg-[#FAF8F4] text-[#171715] shadow-2xl border border-[#E3DED5] my-2 sm:my-4 transition-all duration-300 rounded-none overflow-hidden"
      >
        {/* =========================================================================
            STICKY TOP CONTROL BAR
            Simplified: clean category indicator, Previous/Next buttons, and Close action.
            ========================================================================= */}
        <div className="sticky top-0 z-40 bg-[#FAF8F4]/95 backdrop-blur-md border-b border-[#171715]/15 px-4 sm:px-6 md:px-8 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 bg-[#A4401F] rounded-full" aria-hidden="true" />
            <span className="font-mono text-xs font-semibold tracking-[0.2em] uppercase text-[#A4401F]">
              LOOK CLOSER
            </span>
          </div>

          {/* Navigation Controls: Just Previous and Next + Close */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            <div className="flex items-center space-x-1 sm:space-x-1.5 mr-1">
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous article"
                className="inline-flex items-center space-x-1 px-2.5 sm:px-3 py-1.5 border border-[#171715]/20 hover:border-[#A4401F] hover:text-[#A4401F] bg-transparent text-[#171715] font-mono text-[11px] uppercase tracking-wider transition-colors cursor-pointer rounded-none focus:outline-none focus-visible:ring-1 focus-visible:ring-[#A4401F]"
              >
                <ChevronLeft className="w-3.5 h-3.5" aria-hidden="true" />
                <span className="hidden xs:inline">PREVIOUS</span>
              </button>
              <button
                type="button"
                onClick={handleNext}
                aria-label="Next article"
                className="inline-flex items-center space-x-1 px-2.5 sm:px-3 py-1.5 border border-[#171715]/20 hover:border-[#A4401F] hover:text-[#A4401F] bg-transparent text-[#171715] font-mono text-[11px] uppercase tracking-wider transition-colors cursor-pointer rounded-none focus:outline-none focus-visible:ring-1 focus-visible:ring-[#A4401F]"
              >
                <span className="hidden xs:inline">NEXT</span>
                <ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />
              </button>
            </div>

            <button
              ref={closeButtonRef}
              type="button"
              onClick={onClose}
              aria-label="Close article"
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-[#171715] hover:bg-[#A4401F] text-[#FAF8F4] font-mono text-xs uppercase tracking-wider transition-colors duration-200 cursor-pointer rounded-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A4401F]"
            >
              <X className="w-3.5 h-3.5" aria-hidden="true" />
              <span>CLOSE</span>
            </button>
          </div>
        </div>

        {/* =========================================================================
            EDITORIAL ARTICLE BODY
            Refined masthead, generous spacing, clean storytelling layout.
            ========================================================================= */}
        <article className="p-4 sm:p-8 md:p-12 lg:p-14">
          
          {/* MASTHEAD: Refined, balanced font size, uncluttered */}
          <header className="pb-4 text-center">
            <h1
              id="section2-editorial-article-title"
              className="font-serif text-2xl sm:text-3xl md:text-4xl text-[#A4401F] uppercase font-normal tracking-tight leading-tight select-text"
            >
              The Archive Dispatch
            </h1>
            <p className="mt-1.5 font-mono text-[11px] sm:text-xs tracking-[0.2em] uppercase text-[#6B6B6B]">
              Documenting Nigerian Creative History · Fashion &amp; Material Culture
            </p>
          </header>

          {/* CLEAN METADATA ROW: Topic & Read Time without noisy box borders */}
          <div className="py-2.5 my-3 border-t border-b border-[#171715]/15 flex items-center justify-between text-xs font-mono tracking-wider uppercase text-[#6B6B6B]">
            <span className="text-[#171715] font-medium">{article.cardTitle}</span>
            <span>{article.readTime}</span>
          </div>

          {/* 1. INTRODUCTORY SECTION: Headline Left + Supporting Image Right */}
          <section className="pt-6 sm:pt-8 pb-8 sm:pb-10 border-b border-[#E3DED5]">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
              {/* Left Column: Bold Headline + Lead Paragraph */}
              <div className="lg:col-span-8 flex flex-col justify-center">
                <h2 className="font-serif text-2xl sm:text-3xl md:text-[34px] leading-[1.12] text-[#171715] font-normal tracking-tight mb-4 select-text">
                  {article.leadHeadline}
                </h2>
                <p className="font-sans text-[15.5px] sm:text-[16.5px] leading-[1.65] text-[#2C2C28] font-normal max-w-[680px]">
                  {article.leadParagraph}
                </p>
              </div>

              {/* Right Column: Supporting Image */}
              <div className="lg:col-span-4 flex flex-col items-center">
                <div className="w-full bg-[#EFECE6] border border-[#171715]/15 overflow-hidden">
                  <img
                    src={article.leadImage.url}
                    alt={article.leadImage.alt}
                    className="w-full h-[180px] sm:h-[220px] object-cover object-center"
                  />
                  <div className="p-3 bg-[#FAF8F4] border-t border-[#171715]/10">
                    <p className="font-sans text-[11px] leading-tight text-[#6B6B6B]">
                      {article.leadImage.caption}
                    </p>
                    <span className="font-mono text-[9.5px] text-[#A4401F] tracking-wider uppercase block mt-1">
                      {article.leadImage.credit}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 2. MAIN EDITORIAL SECTION 1: Text Left Column, Large Image Right Column */}
          <section className="py-8 sm:py-12 border-b border-[#E3DED5]">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
              {/* Left Column: Subheading + Narrative Text + Pull Quote */}
              <div className="lg:col-span-6 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-2xl sm:text-[28px] text-[#171715] font-normal leading-tight tracking-tight mb-4 select-text">
                    {article.sectionOne.subheading}
                  </h3>
                  
                  <div className="space-y-4 font-sans text-[15px] sm:text-[15.5px] leading-[1.72] text-[#2C2C28]">
                    {article.sectionOne.paragraphs.map((p, idx) => (
                      <p key={idx} className="first-of-type:font-medium">
                        {p}
                      </p>
                    ))}
                  </div>

                  {article.sectionOne.pullQuote && (
                    <blockquote className="my-6 p-4 border-l-3 border-[#A4401F] bg-[#F2EEE7]/60 italic font-serif text-lg sm:text-xl text-[#A4401F] leading-snug">
                      {article.sectionOne.pullQuote}
                    </blockquote>
                  )}
                </div>
              </div>

              {/* Right Column: Large Image */}
              <div className="lg:col-span-6 flex flex-col">
                <div className="w-full bg-[#EFECE6] border border-[#171715]/15 overflow-hidden">
                  <img
                    src={article.sectionOne.image.url}
                    alt={article.sectionOne.image.alt}
                    className="w-full h-[280px] sm:h-[360px] md:h-[400px] object-cover object-center"
                  />
                  <div className="p-4 bg-[#FAF8F4] border-t border-[#171715]/10">
                    <p className="font-sans text-xs leading-relaxed text-[#171715]">
                      {article.sectionOne.image.caption}
                    </p>
                    <span className="font-mono text-[10px] text-[#A4401F] tracking-wider uppercase block mt-1 font-medium">
                      {article.sectionOne.image.credit}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 3. MAIN EDITORIAL SECTION 2: Reversed arrangement
              - Left Column: Image on top, Subheading + Text on bottom
              - Right Column: Subheading on top, Two columns of text, Wide image on bottom */}
          <section className="py-8 sm:py-12 border-b border-[#E3DED5]">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
              {/* Left Column: Image Top, Subheading + Paragraph Bottom */}
              <div className="lg:col-span-6 flex flex-col">
                <div className="w-full bg-[#EFECE6] border border-[#171715]/15 overflow-hidden mb-6">
                  <img
                    src={article.sectionTwo.leftImage.url}
                    alt={article.sectionTwo.leftImage.alt}
                    className="w-full h-[240px] sm:h-[280px] object-cover object-center"
                  />
                  <div className="p-3 bg-[#FAF8F4] border-t border-[#171715]/10">
                    <p className="font-sans text-[11.5px] leading-relaxed text-[#6B6B6B]">
                      {article.sectionTwo.leftImage.caption}
                    </p>
                    <span className="font-mono text-[9.5px] text-[#A4401F] tracking-wider uppercase block mt-0.5">
                      {article.sectionTwo.leftImage.credit}
                    </span>
                  </div>
                </div>

                <h4 className="font-serif text-2xl sm:text-[26px] text-[#171715] font-normal leading-tight tracking-tight mb-3">
                  {article.sectionTwo.leftSubheading}
                </h4>
                <p className="font-sans text-[15px] sm:text-[15.5px] leading-[1.72] text-[#2C2C28]">
                  {article.sectionTwo.leftParagraph}
                </p>
              </div>

              {/* Right Column: Subheading + Two Parallel Text Columns + Wide Image Bottom */}
              <div className="lg:col-span-6 lg:border-l lg:border-[#E3DED5] lg:pl-10 flex flex-col">
                <h4 className="font-serif text-2xl sm:text-[26px] text-[#171715] font-normal leading-tight tracking-tight mb-4">
                  {article.sectionTwo.rightSubheading}
                </h4>

                {/* Two Sub-Columns for Text */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 font-sans text-[14px] sm:text-[14.5px] leading-[1.68] text-[#2C2C28] mb-6">
                  <div className="space-y-3">
                    {article.sectionTwo.rightDualColumns.colA.map((p, idx) => (
                      <p key={idx}>{p}</p>
                    ))}
                  </div>
                  <div className="space-y-3">
                    {article.sectionTwo.rightDualColumns.colB.map((p, idx) => (
                      <p key={idx}>{p}</p>
                    ))}
                  </div>
                </div>

                {/* Wide Image across Right Column */}
                <div className="w-full bg-[#EFECE6] border border-[#171715]/15 overflow-hidden">
                  <img
                    src={article.sectionTwo.rightWideImage.url}
                    alt={article.sectionTwo.rightWideImage.alt}
                    className="w-full h-[180px] sm:h-[220px] object-cover object-center"
                  />
                  <div className="p-3 bg-[#FAF8F4] border-t border-[#171715]/10">
                    <p className="font-sans text-[11px] leading-tight text-[#6B6B6B]">
                      {article.sectionTwo.rightWideImage.caption}
                    </p>
                    <span className="font-mono text-[9.5px] text-[#A4401F] tracking-wider uppercase block mt-0.5">
                      {article.sectionTwo.rightWideImage.credit}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 4. CLOSING THEMES & PILLARS */}
          <section className="py-8 sm:py-10 border-b border-[#E3DED5]">
            <div className="max-w-3xl">
              <h4 className="font-serif text-2xl sm:text-3xl text-[#171715] font-normal mb-3">
                {article.sectionThree.subheading}
              </h4>
              <p className="font-sans text-[15px] sm:text-[16px] leading-[1.72] text-[#2C2C28] mb-6">
                {article.sectionThree.synthesisText}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              {article.sectionThree.curatorialPillars.map((pillar, i) => (
                <div key={i} className="p-4 bg-[#F2EEE7]/80 border border-[#E3DED5]">
                  <span className="font-mono text-[11.5px] text-[#A4401F] font-semibold tracking-wider uppercase block mb-1.5">
                    {pillar.label}
                  </span>
                  <p className="font-sans text-[12.5px] leading-relaxed text-[#171715]/85">
                    {pillar.desc}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* 5. FOOTER ACTIONS: Clean Curatorial Note + Prev / Next / Close Navigation */}
          <footer className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono tracking-wider uppercase text-[#6B6B6B]">
            <div className="flex flex-col items-center sm:items-start">
              <span className="text-[#171715]">{article.colophon.curatorialNote}</span>
            </div>

            <div className="flex items-center space-x-2 sm:space-x-3">
              <button
                type="button"
                onClick={handlePrev}
                className="inline-flex items-center space-x-1.5 px-3 py-2 border border-[#171715]/20 hover:border-[#A4401F] hover:text-[#A4401F] bg-transparent text-[#171715] font-mono text-xs uppercase tracking-wider transition-colors cursor-pointer rounded-none"
              >
                <ChevronLeft className="w-3.5 h-3.5" aria-hidden="true" />
                <span>PREVIOUS</span>
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="inline-flex items-center space-x-1.5 px-3 py-2 border border-[#171715]/20 hover:border-[#A4401F] hover:text-[#A4401F] bg-transparent text-[#171715] font-mono text-xs uppercase tracking-wider transition-colors cursor-pointer rounded-none"
              >
                <span>NEXT</span>
                <ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={onClose}
                className="inline-flex items-center space-x-1.5 px-3.5 py-2 bg-[#171715] hover:bg-[#A4401F] text-[#FAF8F4] font-mono text-xs uppercase tracking-wider transition-colors cursor-pointer rounded-none"
              >
                <X className="w-3.5 h-3.5" aria-hidden="true" />
                <span>CLOSE</span>
              </button>
            </div>
          </footer>

        </article>
      </div>
    </div>
  );
};
