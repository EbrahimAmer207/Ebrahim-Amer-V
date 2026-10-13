'use client';

import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import Loader from '@/components/layout/Loader';
import Navigation from '@/components/layout/Navigation';
import Hero from '@/components/sections/Hero';
import ProjectShowcase from '@/components/sections/ProjectShowcase';
import Expertise from '@/components/sections/Expertise';
import Process from '@/components/sections/Process';
import About from '@/components/sections/About';
import Experience from '@/components/sections/Experience';
import InteractiveSkills from '@/components/sections/InteractiveSkills';
import Availability from '@/components/sections/Availability';
import Contact from '@/components/sections/Contact';
import Footer from '@/components/layout/Footer';
import CustomCursor from '@/components/ui/CustomCursor';
import CommandPalette from '@/components/ui/CommandPalette';
import { 
  ProjectRecord, 
  HeroContentRecord, 
  AboutContentRecord, 
  SkillRecord, 
  AIToolRecord, 
  ExperienceRecord, 
  SiteSettingsRecord 
} from '@/lib/supabase/types';

interface PortfolioClientProps {
  initialData: {
    projects: ProjectRecord[];
    hero: HeroContentRecord;
    about: AboutContentRecord;
    skills: SkillRecord[];
    aiTools: AIToolRecord[];
    experiences: ExperienceRecord[];
    settings: SiteSettingsRecord;
  };
}

export default function PortfolioClient({ initialData }: PortfolioClientProps) {
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
            <Hero content={initialData.hero} />
            <ProjectShowcase projects={initialData.projects} />
            <Expertise />
            <Process />
            <About content={initialData.about} />
            <Experience experiences={initialData.experiences} />
            <InteractiveSkills skills={initialData.skills} aiTools={initialData.aiTools} />
            <Availability />
            <Contact settings={initialData.settings} />
          </main>

          {/* Footer block */}
          <Footer settings={initialData.settings} />
        </>
      )}
    </>
  );
}
