'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Card } from '../ui/Card';
import { projectsData } from '@/data/projectsData';
import { ArrowUpRight, GitBranch, ExternalLink } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import MobileCarousel from '../ui/MobileCarousel';
import styles from './ProjectShowcase.module.css';

// We map the images from the copied asset folder
const projectImages: Record<string, string> = {
  'luxe-ecommerce': '/Img/luxe-ecommerce.png',
  'supabase-portfolio': '/Img/supabase-portfolio.png',
  'aetheria-estate': '/Img/4.png',
  'apex-ecommerce': '/Img/fake.png',
  'nexus-dashboard': '/Img/Dash.png',
  'nimbus-weather': '/Img/we.png',
};

// Define all other archive projects from the old portfolio data
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
  const header   = useScrollReveal({ threshold: 0.1 });
  const featured = useScrollReveal({ threshold: 0.05 });
  const archive  = useScrollReveal({ threshold: 0.05 });

  return (
    <section id="projects" className={styles.section}>
      <div className="container">
        
        {/* Section Header */}
        <div
          ref={header.ref}
          className={`${styles.header} reveal reveal-up ${header.isVisible ? 'reveal-visible' : ''}`}
        >
          <div className="pulse-badge">
            <span style={{ color: 'var(--accent)' }}>CASE STUDIES</span>
          </div>
          <h2 className={`${styles.title} text-gradient`}>
            Selected Engineering Builds.
          </h2>
          <p className={styles.subtitle}>
            A showcase of web applications focusing on problem solving, performance audits, state management, and modern user experiences.
          </p>

          {/* Filter Tabs */}
          <div className={styles.tabs}>
            <button className={`${styles.tab} ${filter === 'all' ? styles.activeTab : ''}`} onClick={() => setFilter('all')}>All Builds</button>
            <button className={`${styles.tab} ${filter === 'featured' ? styles.activeTab : ''}`} onClick={() => setFilter('featured')}>Featured Case Studies</button>
            <button className={`${styles.tab} ${filter === 'archive' ? styles.activeTab : ''}`} onClick={() => setFilter('archive')}>Client Projects</button>
          </div>
        </div>

        {/* Featured Case Studies Grid */}
        {(filter === 'all' || filter === 'featured') && (
          <div ref={featured.ref}>
            <MobileCarousel desktopGridClass={styles.featuredGrid}>
              {projectsData.map((project) => {
                const imagePath = projectImages[project.slug] || '/Img/port.png';
                
                return (
                  <div
                    key={project.slug}
                    className={`${styles.projectWrapper} reveal reveal-scale reveal-delay-${(projectsData.indexOf(project) % 3) + 1} ${featured.isVisible ? 'reveal-visible' : ''}`}
                    data-cursor="explore"
                  >
                    <Link href={`/projects/${project.slug}`} className={styles.linkWrapper}>
                      <Card className={styles.projectCard} style={{ height: '100%' }}>
                        
                        {/* Image Preview frame */}
                        <div className={styles.imgFrame}>
                          <img src={imagePath} alt={project.title} className={styles.img} />
                          <div className={styles.hoverMask}>
                            <span className={styles.maskText}>Read Case Study</span>
                            <ArrowUpRight size={20} />
                          </div>
                        </div>

                        {/* Info and stats footer */}
                        <div className={styles.info}>
                          <div className={styles.metaRow}>
                            <span className={styles.category}>{project.category}</span>
                            <div className={styles.metrics}>
                              {project.metrics.slice(0, 2).map((m, idx) => (
                                <span key={idx} className={styles.metric}>
                                  {m.label}: <strong>{m.value}</strong>
                                </span>
                              ))}
                            </div>
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
                        </div>

                      </Card>
                    </Link>
                  </div>
                );
              })}
            </MobileCarousel>
          </div>
        )}

        {/* Archive / Secondary Grid */}
        {(filter === 'all' || filter === 'archive') && (
          <div ref={archive.ref} className={styles.archiveWrapper}>
            {(filter === 'archive') && <h3 className={styles.archiveHeader}>Client Prototypes</h3>}
            <MobileCarousel desktopGridClass={styles.archiveGrid}>
              {archiveProjects.map((proj, index) => (
                <Card key={index} className={`${styles.archiveCard} reveal reveal-up reveal-delay-${(index % 4) + 1} ${archive.isVisible ? 'reveal-visible' : ''}`} style={{ height: '100%' }}>
                  <div className={styles.archImgFrame}>
                    <img src={proj.image} alt={proj.title} className={styles.archImg} />
                  </div>
                  <div className={styles.archInfo}>
                    <h4 className={styles.archTitle}>{proj.title}</h4>
                    <p className={styles.archDesc}>{proj.desc}</p>
                    <div className={styles.archTech}>
                      {proj.tech.map((t) => (
                        <span key={t} className={styles.archTag}>{t}</span>
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
