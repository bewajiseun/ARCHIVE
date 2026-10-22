import React, { useEffect, useRef, useState } from 'react';

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delayMs?: number;
  threshold?: number;
  distancePx?: number;
  direction?: 'up' | 'none';
}

/**
 * Editorial ScrollReveal Utility Component
 *
 * Lightweight IntersectionObserver-based reveal supporting:
 * - Subtle fade-and-rise (opacity + translateY)
 * - Single-trigger entrance (never causes flicker or layout shift)
 * - Reduced-motion safety (renders immediately at full opacity if preferred)
 * - Zero external animation libraries for optimal render performance
 */
export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  className = '',
  delayMs = 0,
  threshold = 0.12,
  distancePx = 18,
  direction = 'up',
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // If user prefers reduced motion, show immediately without delay or transform
    if (typeof window !== 'undefined') {
      const prefersReduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReduce) {
        setIsVisible(true);
        return;
      }
    }

    const currentEl = domRef.current;
    if (!currentEl) return;

    // Check if IntersectionObserver is supported
    if (!('IntersectionObserver' in window)) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    observer.observe(currentEl);

    return () => {
      observer.disconnect();
    };
  }, [threshold]);

  const transformStyle =
    direction === 'up'
      ? isVisible
        ? 'translate3d(0, 0, 0)'
        : `translate3d(0, ${distancePx}px, 0)`
      : 'none';

  return (
    <div
      ref={domRef}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: transformStyle,
        transitionProperty: 'opacity, transform',
        transitionDuration: '520ms',
        transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
        transitionDelay: `${delayMs}ms`,
        willChange: isVisible ? 'auto' : 'opacity, transform',
      }}
    >
      {children}
    </div>
  );
};
