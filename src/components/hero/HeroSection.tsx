import React, { useRef, useState, useEffect } from 'react';
import { Header } from '../layout/Header';

interface HeroSectionProps {
  onCtaClick?: () => void;
  onNavigateSection?: (sectionId: string) => void;
}

// Visual Assets — Using the updated Cloudinary video public_id "nEW_vIDEO"
const CROPPED_CLOUDINARY_VIDEO =
  'https://res.cloudinary.com/jlggrwhm/video/upload/c_crop,w_800,h_650,x_430,y_80/nEW_vIDEO.mp4';
const LOCAL_ANIMATED_VIDEO = '/assets/nigeria_map_animated.mp4';
const FULL_CLOUDINARY_VIDEO =
  'https://res.cloudinary.com/jlggrwhm/video/upload/nEW_vIDEO.mp4';

// Static High-Definition Fallback Artwork (Approved Reference)
const STATIC_FALLBACK_IMAGE = '/assets/nigeria_map_hero_collage.png';

export const HeroSection: React.FC<HeroSectionProps> = ({
  onCtaClick,
  onNavigateSection,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Detect user prefers-reduced-motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Ensure robust muted inline autoplay without audio interruption
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.defaultMuted = true;
      videoRef.current.muted = true;
      if (prefersReducedMotion) {
        videoRef.current.pause();
      } else {
        const playPromise = videoRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {
            // Autoplay restrictions handled gracefully by displaying static poster
          });
        }
      }
    }
  }, [prefersReducedMotion, videoLoaded]);

  const handleCta = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (onCtaClick) {
      onCtaClick();
    } else {
      const target = document.getElementById('rooms');
      if (target) {
        const prefersReduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        target.scrollIntoView({ behavior: prefersReduce ? 'auto' : 'smooth' });
        target.focus({ preventScroll: true });
      }
    }
  };

  const handleScrollToExplore = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const target = document.getElementById('rooms');
    if (target) {
      const prefersReduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      target.scrollIntoView({ behavior: prefersReduce ? 'auto' : 'smooth' });
      target.focus({ preventScroll: true });
    }
  };

  const handleRoomJump = (roomId: string, e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const targetId = roomId === 'fashion' ? 'rooms' : roomId === 'stories' ? 'stories' : 'explore-rooms';
    const target = document.getElementById(targetId);
    if (target) {
      const prefersReduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      target.scrollIntoView({ behavior: prefersReduce ? 'auto' : 'smooth' });
      target.focus({ preventScroll: true });
    }
  };

  return (
    <section
      id="hero"
      aria-label="ARCHIVE Hero Exhibition"
      className="relative w-full min-h-screen min-h-[720px] lg:min-h-[820px] xl:min-h-[900px] flex flex-col justify-between bg-[#FAF8F4] text-[#171715] overflow-hidden"
    >
      {/* =========================================================================
          LAYER 1: HEADER (Continuous #FAF8F4 background)
          ========================================================================= */}
      <Header onNavigateSection={onNavigateSection} className="bg-transparent" />

      {/* =========================================================================
          LAYER 2: TWO-COLUMN HERO GRID (Matching approved reference layout)
          LEFT: Display headline, editorial summary, sharp rectangular CTA button
          RIGHT: Archival Nigeria Map Collage (strictly on right, zero overlap with text)
          ========================================================================= */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 pt-4 sm:pt-6 md:pt-8 lg:pt-10 pb-8 md:pb-12 flex-1 flex items-center">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 xl:gap-12 items-center">
          
          {/* LEFT COLUMN: Text area sits solely on pure #FAF8F4 cream */}
          <div className="lg:col-span-5 flex flex-col items-start z-10">
            {/* Display Headline: "The past is dressed to go out." */}
            <h1
              className="font-serif font-normal text-[#171715] leading-[0.92] tracking-[-0.03em] select-text text-[48px] sm:text-[60px] md:text-[68px] lg:text-[74px] xl:text-[80px]"
              style={{ fontSize: 'clamp(46px, 5.4vw, 80px)' }}
            >
              <span className="block">The past is</span>
              <span className="block italic text-[#A4401F] my-0.5 sm:my-1">
                dressed
              </span>
              <span className="block">to go out.</span>
            </h1>

            {/* Supporting Copy (Exact text, Inter font, 360–390px max width) */}
            <p className="font-sans text-[15.5px] sm:text-[16px] md:text-[16.5px] leading-[1.55] text-[#6B6B6B] mt-6 md:mt-8 mb-8 md:mb-10 max-w-[380px]">
              Explore real stories, people and objects from Nigeria’s creative history through photography, music, fashion and design.
            </p>

            {/* Primary Action Button: ENTER ARCHIVE → */}
            <div className="flex items-center w-full">
              <a
                href="#rooms"
                onClick={handleCta}
                className="inline-flex items-center justify-between bg-[#A4401F] hover:bg-[#853216] active:bg-[#6E2812] text-[#FAF8F4] font-sans text-[13px] md:text-[13.5px] font-medium tracking-[0.14em] uppercase px-7 sm:px-8 h-[54px] md:h-[56px] w-full max-w-[340px] transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#A4401F] shadow-xs cursor-pointer group rounded-none"
              >
                <span>ENTER ARCHIVE</span>
                <span
                  className="ml-5 text-base leading-none transition-transform duration-200 group-hover:translate-x-1.5"
                  aria-hidden="true"
                >
                  →
                </span>
              </a>
            </div>
          </div>

          {/* RIGHT COLUMN: Nigeria-Shaped Archival Collage
              Strictly placed on the right side.
              Does NOT sit behind or underneath the headline or subtext.
              Integrates the animated archival video with seamless soft edges and static fallback. */}
          <div className="lg:col-span-7 flex items-center justify-center lg:justify-end mt-8 sm:mt-10 lg:mt-0 select-none pointer-events-none">
            <div className="relative w-full max-w-[560px] sm:max-w-[620px] lg:max-w-[740px] xl:max-w-[820px] flex items-center justify-center">
              
              {/* Seamless Soft Edge Blending: Guarantees zero visible rectangular video boundary */}
              <div
                className="relative w-full overflow-hidden"
                style={{
                  WebkitMaskImage: 'radial-gradient(ellipse 90% 90% at 50% 50%, black 80%, transparent 100%)',
                  maskImage: 'radial-gradient(ellipse 90% 90% at 50% 50%, black 80%, transparent 100%)',
                }}
              >
                {!prefersReducedMotion && !videoError ? (
                  <video
                    ref={videoRef}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                    poster={STATIC_FALLBACK_IMAGE}
                    onLoadedData={() => setVideoLoaded(true)}
                    onError={() => setVideoError(true)}
                    aria-label="Animated archival collage map documenting Nigeria's creative history across Photography, Music, Fashion, and Design"
                    className="w-full h-auto object-contain transition-opacity duration-700 ease-out"
                  >
                    <source src={CROPPED_CLOUDINARY_VIDEO} type="video/mp4" />
                    <source src={LOCAL_ANIMATED_VIDEO} type="video/mp4" />
                    <source src={FULL_CLOUDINARY_VIDEO} type="video/mp4" />
                    {/* Fallback to high-res static collage artwork if HTML5 video tag unsupported */}
                    <img
                      src={STATIC_FALLBACK_IMAGE}
                      alt="Archival collage map of Nigeria documenting creative history across Photography, Music, Fashion, and Design"
                      className="w-full h-auto object-contain drop-shadow-xs"
                    />
                  </video>
                ) : (
                  <img
                    src={STATIC_FALLBACK_IMAGE}
                    alt="Archival collage map of Nigeria documenting creative history across Photography, Music, Fashion, and Design"
                    className="w-full h-auto object-contain drop-shadow-xs"
                    loading="eager"
                  />
                )}
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* =========================================================================
          LAYER 3: BOTTOM METADATA ROW: SCROLL CUE (Left) & ROOM INDEX (Right)
          ========================================================================= */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 pb-6 md:pb-8 flex items-end justify-between">
        
        {/* Bottom Left: Scroll Cue (Simple downward arrow, no vertical line) */}
        <div className="flex flex-col items-start">
          <a
            href="#rooms"
            onClick={handleScrollToExplore}
            className="inline-flex flex-col items-start text-[#6B6B6B] hover:text-[#171715] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A4401F] cursor-pointer group select-none"
            aria-label="Scroll to explore exhibition"
          >
            <span className="font-mono text-[10px] sm:text-[10.5px] font-medium tracking-[0.22em] uppercase leading-tight">
              SCROLL
            </span>
            <span className="font-mono text-[10px] sm:text-[10.5px] font-medium tracking-[0.22em] uppercase leading-tight">
              TO EXPLORE
            </span>
            <span
              className="mt-1 text-sm leading-none transition-transform duration-200 group-hover:translate-y-1"
              aria-hidden="true"
            >
              ↓
            </span>
          </a>
        </div>

        {/* Bottom Right: Restrained Exhibition Room Index (As shown in approved reference) */}
        <nav
          aria-label="Exhibition rooms index"
          className="hidden sm:flex flex-col items-end space-y-1 text-right select-none"
        >
          {[
            { id: 'fashion', num: '01', name: 'Fashion' },
            { id: 'music', num: '02', name: 'Music' },
            { id: 'photography', num: '03', name: 'Photography' },
            { id: 'design', num: '04', name: 'Design' },
          ].map((item, idx) => (
            <a
              key={item.id}
              href={item.id === 'fashion' ? '#rooms' : '#explore-rooms'}
              onClick={(e) => handleRoomJump(item.id, e)}
              className="font-mono text-[10.5px] sm:text-[11px] tracking-[0.16em] uppercase transition-colors flex items-center space-x-2 group cursor-pointer py-0.5"
            >
              {idx === 0 ? (
                <>
                  <span
                    className="w-1.5 h-1.5 rounded-none bg-[#A4401F] inline-block"
                    aria-hidden="true"
                  />
                  <span className="text-[#171715] font-semibold">
                    {item.num} {item.name}
                  </span>
                </>
              ) : (
                <span className="text-[#6B6B6B] hover:text-[#171715]">
                  {item.num} {item.name}
                </span>
              )}
            </a>
          ))}
        </nav>

      </div>
    </section>
  );
};
