import React from 'react';
import { Header } from './components/layout/Header';
import { HeroSection } from './components/hero/HeroSection';
import { FashionRoomSection } from './components/fashion/FashionRoomSection';
import { ThreadsOfGenerationsSection } from './components/story/ThreadsOfGenerationsSection';
import { ExploreRoomsSection } from './components/rooms/ExploreRoomsSection';
import { ContributeSection } from './components/contribute/ContributeSection';
import { SourcesCreditsSection } from './components/sources/SourcesCreditsSection';
import { Footer } from './components/layout/Footer';

export default function App() {
  const handleScrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      const prefersReduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      el.scrollIntoView({ behavior: prefersReduce ? 'auto' : 'smooth' });
      el.focus();
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F4] text-[#171715] flex flex-col font-sans selection:bg-[#A4401F] selection:text-[#FFFFFF]">
      {/* Museum Header with brand identity and responsive navigation */}
      <Header onNavigateSection={handleScrollToSection} />

      {/* Main Landmark with Full 7-Section Museum Exhibition Flow */}
      <main id="main-content" className="flex-1 flex flex-col">
        {/* Section 1: Approved Production-Ready Hero Section */}
        <HeroSection onCtaClick={() => handleScrollToSection('rooms')} />

        {/* Section 2: Fashion Room — Look closer (Forward Scroll-Driven Stacking) */}
        <FashionRoomSection />

        {/* Section 3: Featured Story — Threads of Generations (Continuous Auto-Moving Carousel) */}
        <ThreadsOfGenerationsSection />

        {/* Section 4: Explore the Rooms — Four rooms. Many stories. (Interactive Overlapping Cards) */}
        <ExploreRoomsSection />

        {/* Section 5: Contribute — Some stories deserve to live forever. (Layered Archival Collage) */}
        <ContributeSection />

        {/* Section 6: Sources & Credits — Every story has a source. (Two-Column Editorial Register) */}
        <SourcesCreditsSection />
      </main>

      {/* Section 7: Minimal Editorial Footer (Quiet, Confident Conclusion) */}
      <Footer />
    </div>
  );
}
