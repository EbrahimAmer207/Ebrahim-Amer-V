'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Card } from '../ui/Card';
import { projectsData } from '@/data/projectsData';
import { ArrowUpRight, GitBranch, ExternalLink, Lock, Zap, ShieldCheck } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import MobileCarousel from '../ui/MobileCarousel';
import styles from './ProjectShowcase.module.css';

// Image mapping
const projectImages: Record<string, string> = {
  'luxe-ecommerce': '/Img/luxe-ecommerce.png',
  'supabase-portfolio': '/Img/supabase-portfolio.png',
  'aetheria-estate': '/Img/4.png',
  'apex-ecommerce': '/Img/fake.png',
  'nexus-dashboard': '/Img/Dash.png',
  'nimbus-weather': '/Img/we.png',
};

// Clean display URLs for browser mockup pills
const projectUrls: Record<string, string> = {
  'luxe-ecommerce': 'luxe-fashion.vercel.app',
  'supabase-portfolio': 'ebrahim-amer.vercel.app',
  'aetheria-estate': 'aetheria-estate.app',
  'apex-ecommerce': 'fake-store.vercel.app',
  'nexus-dashboard': 'dashboard.vercel.app',
  'nimbus-weather': 'weather-client.app',
};

// Archive client projects data
const archiveProjects = [
  {
    title: 'Pato Restaurant',
    desc: 'An attractive restaurant landing page emphasizing visual atmospheres, menus, and reservation layout.',
    tech: ['HTML', 'CSS', 'Bootstrap', 'JS'],
    image: '/Img/pato.png',
    demoUrl: 'https://new-pato.vercel.app/',
    codeUrl: 'https://github.com/EbrahimAmer207/New-pato',
  },
  {
    title: 'Doctor Medical Client',
    desc: 'Healthcare consultation frontend built to present services, medical histories, and bookings cleanly.',
    tech: ['HTML', 'CSS', 'Bootstrap'],
    image: '/Img/2.png',
    demoUrl: 'https://doctor-drab.vercel.app/',
    codeUrl: 'https://github.com/EbrahimAmer207/Doctor',
  },
  {
    title: '57357 Hospital Redesign',
    desc: 'A healthcare portal designed to communicate public statistics and charity donations with clean trust cues.',
    tech: ['HTML', 'CSS'],
    image: '/Img/1.png',
    demoUrl: 'https://57357.vercel.app/',
    codeUrl: 'https://github.com/EbrahimAmer207/57357',
  },
  {
    title: 'Portfolio Redesign v1.5',
    desc: 'A previous portfolio iteration optimizing text contrast, spacing alignments, and grid item margins.',
    tech: ['HTML', 'CSS', 'JavaScript'],
    image: '/Img/new-port.png',
    demoUrl: 'https://portfolio-flame-three-93.vercel.app/',
    codeUrl: 'https://github.com/EbrahimAmer207/portfolio',
  },
];

export default function ProjectShowcase() {
  const [filter, setFilter] = useState<'all' | 'featured' | 'archive'>('all');
  const { ref: headerRef, isVisible: headerIsVisible } = useScrollReveal({ threshold: 0.1 });
  const { ref: featuredRef, isVisible: featuredIsVisible } = useScrollReveal({ threshold: 0.05 });
  const { ref: archiveRef, isVisible: archiveIsVisible } = useScrollReveal({ threshold: 0.05 });

  return (
    <section id="projects" className={styles.section}>
      <div className="container">
        
        {/* Section Header */}
        <div
          ref={headerRef}
          className={`${styles.header} reveal reveal-up ${headerIsVisible ? 'reveal-visible' : ''}`}
        >
          <div className="pulse-badge">
            <span style={{ color: 'var(--accent)', fontFamily: 'var(--font-mono)' }}>01 / SELECTED WORK</span>
          </div>
          <h2 className={`${styles.title} text-gradient`}>
            Selected Engineering Builds.
          </h2>
          <p className={styles.subtitle}>
            A showcase of web applications focusing on problem solving, performance audits, state management, and modern user experiences.
          </p>

          {/* Filter Tabs */}
          <div className={styles.tabs}>
            <button
              className={`${styles.tab} ${filter === 'all' ? styles.activeTab : ''}`}
              onClick={() => setFilter('all')}
            >
              All Builds
            </button>
            <button
              className={`${styles.tab} ${filter === 'featured' ? styles.activeTab : ''}`}
              onClick={() => setFilter('featured')}
            >
              Featured Case Studies
            </button>
            <button
              className={`${styles.tab} ${filter === 'archive' ? styles.activeTab : ''}`}
              onClick={() => setFilter('archive')}
            >
              Client Projects
            </button>
          </div>
        </div>

        {/* Featured Case Studies Grid */}
        {(filter === 'all' || filter === 'featured') && (
          <div ref={featuredRef}>
            <MobileCarousel desktopGridClass={styles.featuredGrid}>
              {projectsData.map((project) => {
                const imagePath = projectImages[project.slug] || '/Img/port.png';
                const displayUrl = projectUrls[project.slug] || 'demo.vercel.app';
                
                return (
                  <div
                    key={project.slug}
                    className={`${styles.projectWrapper} reveal reveal-scale reveal-delay-${(projectsData.indexOf(project) % 3) + 1} ${featuredIsVisible ? 'reveal-visible' : ''}`}
                    data-cursor="explore"
                  >
                    <Link href={`/projects/${project.slug}`} className={styles.linkWrapper}>
                      <Card className={styles.projectCard} style={{ height: '100%' }}>
                        
                        {/* Chrome Header Bar */}
                        <div className={styles.cardChrome}>
                          <div className={styles.chromeDots}>
                            <span className={`${styles.dot} ${styles.dotRed}`} />
                            <span className={`${styles.dot} ${styles.dotYellow}`} />
                            <span className={`${styles.dot} ${styles.dotGreen}`} />
                          </div>
                          <div className={styles.chromeUrl}>
                            <Lock size={10} style={{ color: '#10b981' }} />
                            <span>{displayUrl}</span>
                          </div>
                        </div>

                        {/* Image Preview Frame with clean aspect ratio */}
                        <div className={styles.imgFrame}>
                          <Image
                            src={imagePath}
                            alt={project.title}
                            fill
                            sizes="(max-width: 1024px) 100vw, 50vw"
                            className={styles.img}
                          />
                          <div className={styles.hoverMask}>
                            <span className={styles.maskText}>Read Case Study</span>
                            <ArrowUpRight size={18} />
                          </div>
                        </div>

                        {/* Info Body */}
                        <div className={styles.info}>
                          <div className={styles.metaRow}>
                            <span className={styles.category}>
                              <span className={styles.categoryDot} />
                              {project.category}
                            </span>

                            {project.metrics && project.metrics.length > 0 && (
                              <span className={styles.metricBadge}>
                                <Zap size={11} style={{ color: 'var(--accent)' }} />
                                {project.metrics[0].value}
                              </span>
                            )}
                          </div>

                          <h3 className={styles.projectTitle}>{project.title}</h3>
                          <p className={styles.desc}>{project.description}</p>

                          <div className={styles.techList}>
                            {project.tech.map((t) => (
                              <span key={t} className={styles.techTag}>
                                {t}
                              </span>
                            ))}
                          </div>

                          <div className={styles.cardFooter}>
                            <span className={styles.ctaText}>Explore Case Study</span>
                            <ArrowUpRight size={16} className={styles.ctaArrow} />
                          </div>
                        </div>

                      </Card>
                    </Link>
                  </div>
                );
              })}
            </MobileCarousel>
          </div>
        )}

        {/* Archive / Client Projects Grid */}
        {(filter === 'all' || filter === 'archive') && (
          <div ref={archiveRef} className={styles.archiveWrapper}>
            {filter === 'archive' && <h3 className={styles.archiveHeader}>Client Prototypes</h3>}
            <MobileCarousel desktopGridClass={styles.archiveGrid}>
              {archiveProjects.map((proj, index) => (
                <Card
                  key={index}
                  className={`${styles.archiveCard} reveal reveal-up reveal-delay-${(index % 4) + 1} ${archiveIsVisible ? 'reveal-visible' : ''}`}
                  style={{ height: '100%' }}
                >
                  <div className={styles.archImgFrame}>
                    <Image
                      src={proj.image}
                      alt={proj.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 25vw"
                      className={styles.archImg}
                    />
                  </div>
                  <div className={styles.archInfo}>
                    <h4 className={styles.archTitle}>{proj.title}</h4>
                    <p className={styles.archDesc}>{proj.desc}</p>
                    <div className={styles.archTech}>
                      {proj.tech.map((t) => (
                        <span key={t} className={styles.archTag}>
                          {t}
                        </span>
                      ))}
                    </div>
                    <div className={styles.archLinks}>
                      <a href={proj.demoUrl} target="_blank" rel="noopener noreferrer" className={styles.archLink}>
                        <ExternalLink size={14} /> Live
                      </a>
                      <a href={proj.codeUrl} target="_blank" rel="noopener noreferrer" className={styles.archLink}>
                        <GitBranch size={14} /> Code
                      </a>
                    </div>
                  </div>
                </Card>
              ))}
            </MobileCarousel>
          </div>
        )}

      </div>
    </section>
  );
}
