import React, { useRef, useState, useEffect } from 'react';
import { Header } from '../layout/Header';
import { ScrollReveal } from '../motion/ScrollReveal';

interface HeroSectionProps {
  onCtaClick?: () => void;
  onNavigateSection?: (sectionId: string) => void;
}

// Exact Cloudinary animation asset requested:
// Embed: https://player.cloudinary.com/embed/?cloud_name=jlggrwhm&public_id=Archival_collage_animation_prompt_20261020223102
const ANIMATION_VIDEO_URL =
  'https://res.cloudinary.com/jlggrwhm/video/upload/v1792531945/Archival_collage_animation_prompt_20261020223102.mp4';
const ANIMATION_WEBM_URL =
  'https://res.cloudinary.com/jlggrwhm/video/upload/v1792531945/Archival_collage_animation_prompt_20261020223102.webm';
const STATIC_POSTER_URL =
  'https://res.cloudinary.com/jlggrwhm/video/upload/v1792531945/Archival_collage_animation_prompt_20261020223102.jpg';

// Approved static fallback artwork (Reference 2)
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

  // Ensure muted inline autoplay without audio interruption
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


  return (
    <section
      id="hero"
      aria-label="ARCHIVE Hero Exhibition"
      className="relative w-full min-h-screen min-h-[700px] lg:min-h-[800px] xl:min-h-[860px] flex flex-col justify-between bg-[#FAF8F4] text-[#171715] overflow-hidden"
    >
      {/* =========================================================================
          LAYER 0: FULL-HERO ANIMATED ARCHIVAL COLLAGE BACKGROUND
          - Position: absolute, inset: 0 (occupies background layer of hero container)
          - Spans 100% full width and height with object-cover, completely filling the screen
          - Eliminates any open or empty space on left and right
          - Video contains generous empty cream space on the left and the collage on the right
          - Pointer-events-none ensures video never intercepts clicks or keyboard focus
          ========================================================================= */}
      <div
        className="absolute inset-0 w-full h-full pointer-events-none select-none z-0 overflow-hidden"
        aria-hidden="true"
      >
        {!prefersReducedMotion && !videoError ? (
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster={STATIC_POSTER_URL}
            onLoadedData={() => setVideoLoaded(true)}
            onError={() => setVideoError(true)}
            aria-label="Animated archival collage map documenting Nigeria's creative history across Photography, Music, Fashion, and Design"
            className="w-full h-full object-cover object-right sm:object-[75%_center] lg:object-[70%_center] xl:object-[68%_center] transition-opacity duration-700 ease-out"
          >
            <source src={ANIMATION_VIDEO_URL} type="video/mp4" />
            <source src={ANIMATION_WEBM_URL} type="video/webm" />
            {/* Fallback image inside video element */}
            <img
              src={STATIC_POSTER_URL}
              alt="Archival collage map of Nigeria documenting creative history across Photography, Music, Fashion, and Design"
              className="w-full h-full object-cover object-right sm:object-[75%_center] lg:object-[70%_center] xl:object-[68%_center]"
            />
          </video>
        ) : (
          <img
            src={STATIC_POSTER_URL}
            alt="Archival collage map of Nigeria documenting creative history across Photography, Music, Fashion, and Design"
            className="w-full h-full object-cover object-right sm:object-[75%_center] lg:object-[70%_center] xl:object-[68%_center]"
            loading="eager"
          />
        )}
        {/* Subtle mobile contrast wash so text remains perfectly legible on small viewports */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#FAF8F4]/85 via-[#FAF8F4]/35 to-transparent sm:hidden pointer-events-none" />
      </div>

      {/* =========================================================================
          LAYER 1: HEADER & NAVIGATION (Seamless continuous #FAF8F4 surface)
          ========================================================================= */}
      <Header onNavigateSection={onNavigateSection} className="bg-transparent relative z-20" />

      {/* =========================================================================
          LAYER 2: CONTENT LAYER
          Positioned directly over the intentional empty cream space on the left.
          Sits above the animation layer in appropriate stacking order (relative z-10).
          Spans standard container width aligned with all other sections.
          ========================================================================= */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 pt-4 sm:pt-6 md:pt-8 lg:pt-10 pb-8 md:pb-12 flex-1 flex items-center">
        <div className="w-full max-w-[460px] sm:max-w-[500px] lg:max-w-[530px] xl:max-w-[560px] flex flex-col items-start">
          
          {/* Display Headline: "The past is dressed to go out." */}
          <ScrollReveal delayMs={60}>
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
          </ScrollReveal>

          {/* Supporting Copy (Inter, 16px, line height 1.55, max-w-[380px]) */}
          <ScrollReveal delayMs={140}>
            <p className="font-sans text-[15.5px] sm:text-[16px] md:text-[16.5px] leading-[1.55] text-[#6B6B6B] mt-6 md:mt-8 mb-8 md:mb-10 max-w-[380px]">
              Explore real stories, people and objects from Nigeria’s creative history through photography, music, fashion and design.
            </p>
          </ScrollReveal>

          {/* Primary Action Button: ENTER ARCHIVE → (Natural width, tight icon spacing) */}
          <ScrollReveal delayMs={220}>
            <div className="flex items-center">
              <a
                href="#rooms"
                onClick={handleCta}
                className="inline-flex items-center gap-3 bg-[#A4401F] hover:bg-[#853216] active:bg-[#6E2812] text-[#FAF8F4] font-sans text-[13px] md:text-[13.5px] font-medium tracking-[0.14em] uppercase px-7 sm:px-8 h-[50px] md:h-[52px] transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#A4401F] shadow-xs cursor-pointer group rounded-none"
              >
                <span>ENTER ARCHIVE</span>
                <span
                  className="text-base leading-none transition-transform duration-200 group-hover:translate-x-1"
                  aria-hidden="true"
                >
                  →
                </span>
              </a>
            </div>
          </ScrollReveal>

        </div>
      </div>

      {/* =========================================================================
          LAYER 3: BOTTOM SCROLL CUE (Left)
          ========================================================================= */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 pb-6 md:pb-8 flex items-end">
        {/* Bottom Left: Scroll Cue */}
        <ScrollReveal delayMs={300}>
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
        </ScrollReveal>
      </div>
    </section>
  );
};
