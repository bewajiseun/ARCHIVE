import React, { useState, useEffect, useRef } from 'react';

interface HeroSectionProps {
  onCtaClick?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onCtaClick }) => {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Detect user preference for reduced motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Control video playback based on reduced motion
  useEffect(() => {
    if (videoRef.current) {
      if (prefersReducedMotion) {
        videoRef.current.pause();
      } else if (videoLoaded) {
        videoRef.current.play().catch(() => {
          // Autoplay policy or low-power fallback
        });
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
        // Set programmatic focus for accessibility
        target.focus({ preventScroll: true });
      }
    }
  };

  return (
    <section
      id="hero"
      aria-label="ARCHIVE Hero Exhibition"
      className="relative w-full min-h-[calc(100vh-90px)] md:min-h-[720px] lg:min-h-[780px] flex items-center overflow-x-hidden bg-[#FAF8F4]"
    >
      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 py-8 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Editorial Typography & Action */}
          <div className="lg:col-span-6 xl:col-span-5 flex flex-col items-start pt-2 md:pt-4">
            {/* Top decorative hairline rule */}
            <div
              className="w-9 h-[1.5px] bg-[#171715] mb-6 md:mb-8"
              aria-hidden="true"
            />

            {/* Three-line Editorial Display Headline */}
            <h1
              className="font-display font-normal text-[#171715] leading-[0.92] tracking-[-0.03em] select-text text-[46px] sm:text-[56px] md:text-[66px] lg:text-[74px] xl:text-[76px] max-w-[620px]"
              style={{ fontSize: 'clamp(44px, 5.2vw, 76px)' }}
            >
              <span className="block">The past is</span>
              <span className="block italic text-[#A4401F] my-1 sm:my-1.5">
                dressed
              </span>
              <span className="block">to go out.</span>
            </h1>

            {/* Concise Editorial Supporting Copy */}
            <p className="font-sans text-[15px] sm:text-[16px] md:text-[16.5px] leading-[1.55] text-[#6B6B6B] mt-6 md:mt-8 mb-8 md:mb-10 max-w-[370px]">
              Explore real stories, people and objects from Nigeria’s creative
              history through photography, music, fashion and design.
            </p>

            {/* Primary Action Button */}
            <div className="flex items-center">
              <a
                href="#rooms"
                onClick={handleCta}
                className="inline-flex items-center justify-center bg-[#A4401F] hover:bg-[#7F3018] text-[#FFFFFF] font-sans text-[13.5px] md:text-[14px] font-medium tracking-[0.05em] uppercase px-[20px] transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#A4401F] shadow-xs cursor-pointer"
                style={{
                  height: '52px',
                  borderRadius: '0px',
                }}
              >
                <span>ENTER ARCHIVE</span>
                <span className="ml-2.5 text-base leading-none transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true">
                  →
                </span>
              </a>
            </div>

            {/* Museum Room Indicators / Subtle Metadata Subtitle */}
            <div className="mt-10 sm:mt-12 flex items-center space-x-3 text-[11px] font-mono tracking-widest text-[#6B6B6B] uppercase">
              <span className="inline-block w-2 h-2 rounded-full bg-[#A4401F]" />
              <span>EXHIBITION 01 · LAGOS CHRONICLES</span>
            </div>
          </div>

          {/* Right Column / Mobile: The animated Nigeria map collage — stays UNDER the text on mobile, and side-by-side on desktop */}
          <div className="w-full lg:col-span-6 xl:col-span-7 mt-8 sm:mt-10 lg:mt-0 flex items-center justify-center lg:justify-end">
            <div className="relative w-full max-w-[500px] sm:max-w-[560px] lg:max-w-none aspect-[16/10] sm:aspect-[16/9] lg:aspect-auto lg:h-[540px] xl:h-[600px] flex items-center justify-center lg:justify-end overflow-hidden select-none">
              {/* Static Fallback (Active when video is loading, errored, or reduced motion is active) */}
              <img
                src="/assets/hero-fallback.jpg"
                alt="Nigeria map shaped collage of Nigerian creative history"
                className={`w-full h-full object-contain lg:object-right transition-opacity duration-700 ease-in-out ${
                  videoLoaded && !prefersReducedMotion ? 'opacity-0' : 'opacity-100'
                }`}
              />

              {/* Animated Video Element: Loop of four creative disciplines inside Nigeria map */}
              {!prefersReducedMotion && !videoError && (
                <video
                  ref={videoRef}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="auto"
                  onLoadedData={() => setVideoLoaded(true)}
                  onError={() => setVideoError(true)}
                  className={`absolute inset-0 w-full h-full object-contain lg:object-right transition-opacity duration-700 ease-in-out ${
                    videoLoaded ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  <source src="/assets/hero-animation.mp4" type="video/mp4" />
                  <source
                    src="https://res.cloudinary.com/jlggrwhm/video/upload/v1792354447/Animating_Nigerian_creative_hist__20261018210826.mp4"
                    type="video/mp4"
                  />
                </video>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
