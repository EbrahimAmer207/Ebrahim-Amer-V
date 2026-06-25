'use client';

import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import Loader from '@/components/layout/Loader';
import Navigation from '@/components/layout/Navigation';
import Hero from '@/components/sections/Hero';
import Expertise from '@/components/sections/Expertise';
import About from '@/components/sections/About';
import ProjectShowcase from '@/components/sections/ProjectShowcase';
import Experience from '@/components/sections/Experience';
import InteractiveSkills from '@/components/sections/InteractiveSkills';
import Contact from '@/components/sections/Contact';
import Footer from '@/components/layout/Footer';
import CustomCursor from '@/components/ui/CustomCursor';
import CommandPalette from '@/components/ui/CommandPalette';

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [isDesktop, setIsDesktop] = useState(false);

  // Detect desktop for custom cursor loading
  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      {/* Premium Loader screen */}
      <AnimatePresence mode="wait">
        {loading && <Loader onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && (
        <>
          {/* Custom lagging cursor on desktop */}
          {isDesktop && <CustomCursor />}
          
          {/* ⌘K / Ctrl+K Command Palette */}
          <CommandPalette />

          {/* Navigation floating menu */}
          <Navigation />

          {/* Scrolling Section Stack */}
          <main style={{ position: 'relative', zIndex: 2 }}>
            <Hero />
            <Expertise />
            <About />
            <ProjectShowcase />
            <Experience />
            <InteractiveSkills />
            <Contact />
          </main>

          {/* Footer block */}
          <Footer />
        </>
      )}
    </>
  );
}
