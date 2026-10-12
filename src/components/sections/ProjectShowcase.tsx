'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '../ui/Card';
import { projectsData } from '@/data/projectsData';
import { 
  ArrowUpRight, 
  ExternalLink, 
  Lock, 
  Zap, 
  ChevronDown, 
  ChevronUp, 
  Layers, 
  GitBranch
} from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import MobileCarousel from '../ui/MobileCarousel';
import styles from './ProjectShowcase.module.css';

// Project image mapping for all case studies
const projectImages: Record<string, string> = {
  // Top 3 Real Company Platforms
  'growfet': '/Img/image copy.png',
  'rashet-etr': '/Img/image.png',
  'growfet-tech': '/Img/image copy 2.png',
  // Additional Engineering Builds
  'luxe-ecommerce': '/Img/luxe-ecommerce.png',
  'aetheria-estate': '/Img/4.png',
  'apex-ecommerce': '/Img/fake.png',
  'nexus-dashboard': '/Img/Dash.png',
  'nimbus-weather': '/Img/we.png',
};

// Clean display URLs for browser mockup pills
const projectUrls: Record<string, string> = {
  'growfet': 'growfet.com',
  'rashet-etr': 'rashet-etr.growfet.com',
  'growfet-tech': 'tech.growfet.com',
  'luxe-ecommerce': 'luxe-store.vercel.app',
  'aetheria-estate': 'aetheria-estate.vercel.app',
  'apex-ecommerce': 'fake-store.vercel.app',
  'nexus-dashboard': 'dashboard.vercel.app',
  'nimbus-weather': 'weather.vercel.app',
};

// Client prototypes archive
const archiveProjects = [
  {
    title: 'Pato Restaurant',
    desc: 'An attractive restaurant landing page emphasizing visual atmosphere, curated menus, and reservation layout.',
    tech: ['HTML5', 'CSS3', 'Bootstrap 5', 'JavaScript'],
    image: '/Img/pato.png',
    demoUrl: 'https://new-pato.vercel.app/',
    codeUrl: 'https://github.com/EbrahimAmer207/New-pato',
  },
  {
    title: 'Doctor Medical Client',
    desc: 'Healthcare consultation frontend built to present medical services, practitioner histories, and bookings cleanly.',
    tech: ['HTML5', 'CSS3', 'Bootstrap 5'],
    image: '/Img/2.png',
    demoUrl: 'https://doctor-drab.vercel.app/',
    codeUrl: 'https://github.com/EbrahimAmer207/Doctor',
  },
  {
    title: '57357 Hospital Redesign',
    desc: 'A healthcare portal designed to communicate public hospital statistics and charity donations with clean trust cues.',
    tech: ['HTML5', 'CSS3'],
    image: '/Img/1.png',
    demoUrl: 'https://57357.vercel.app/',
    codeUrl: 'https://github.com/EbrahimAmer207/57357',
  },
];

export default function ProjectShowcase() {
  const [showMore, setShowMore] = useState(false);
  const { ref: headerRef, isVisible: headerIsVisible } = useScrollReveal({ threshold: 0.1 });
  const { ref: featuredRef, isVisible: featuredIsVisible } = useScrollReveal({ threshold: 0.05 });

  // Separate primary 3 company platforms from other engineering builds
  const primaryCompanySlugs = ['growfet', 'rashet-etr', 'growfet-tech'];
  const primaryProjects = projectsData.filter((p) => primaryCompanySlugs.includes(p.slug));
  const additionalProjects = projectsData.filter((p) => !primaryCompanySlugs.includes(p.slug));

  return (
    <section id="projects" className={styles.section}>
      <div className="container">
        
        {/* Section Header */}
        <div
          ref={headerRef}
          className={`${styles.header} reveal reveal-up ${headerIsVisible ? 'reveal-visible' : ''}`}
        >
          <div className="pulse-badge">
            <span style={{ color: 'var(--accent)', fontFamily: 'var(--font-mono)' }}>01 / PRODUCTION BUILDS</span>
          </div>
          <h2 className={`${styles.title} text-gradient`}>
            Production Company Platforms.
          </h2>
          <p className={styles.subtitle}>
            Three commercial web applications deployed in active production, engineered with modular React 19 architecture, bilingual Arabic/English localization, SQLite WebAssembly, and custom CSS design tokens.
          </p>
        </div>

        {/* Featured 3-Platform Grid */}
        <div ref={featuredRef}>
          <MobileCarousel desktopGridClass={styles.featuredGrid}>
            {primaryProjects.map((project, index) => {
              const imagePath = projectImages[project.slug] || '/Img/image copy.png';
              const displayUrl = projectUrls[project.slug] || 'live.growfet.com';
              
              return (
                <div
                  key={project.slug}
                  className={`${styles.projectWrapper} reveal reveal-scale reveal-delay-${(index % 3) + 1} ${featuredIsVisible ? 'reveal-visible' : ''}`}
                  data-cursor="explore"
                >
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

                    {/* Image Preview Frame with calibrated 2.19:1 aspect ratio */}
                    <Link href={`/projects/${project.slug}`} className={styles.imgLink} aria-label={`View ${project.title} case study`}>
                      <div className={styles.imgFrame}>
                        <Image
                          src={imagePath}
                          alt={project.title}
                          fill
                          sizes="(max-width: 1024px) 100vw, 33vw"
                          className={styles.img}
                        />
                        <div className={styles.hoverMask}>
                          <span className={styles.maskText}>Read Case Study</span>
                          <ArrowUpRight size={18} />
                        </div>
                      </div>
                    </Link>

                    {/* Info Body */}
                    <div className={styles.info}>
                      <div className={styles.metaRow}>
                        <span className={styles.category}>
                          <span className={styles.categoryDot} />
                          {project.category}
                        </span>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                          {project.brandNameArabic && (
                            <span className={styles.brandBadge}>{project.brandNameArabic}</span>
                          )}
                          {project.metrics && project.metrics.length > 0 && (
                            <span className={styles.metricBadge}>
                              <Zap size={11} style={{ color: 'var(--accent)' }} />
                              {project.metrics[0].value}
                            </span>
                          )}
                        </div>
                      </div>

                      <Link href={`/projects/${project.slug}`} style={{ textDecoration: 'none' }}>
                        <h3 className={styles.projectTitle}>{project.title}</h3>
                      </Link>
                      <p className={styles.desc}>{project.description}</p>

                      <div className={styles.techList}>
                        {project.tech.slice(0, 5).map((t) => (
                          <span key={t} className={styles.techTag}>
                            {t}
                          </span>
                        ))}
                      </div>

                      {/* Card Action Footer */}
                      <div className={styles.cardFooter}>
                        <Link href={`/projects/${project.slug}`} className={styles.ctaLink}>
                          <span>Case Study</span>
                          <ArrowUpRight size={16} className={styles.ctaArrow} />
                        </Link>

                        <a
                          href={project.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.liveLink}
                          aria-label={`Open live site for ${project.title}`}
                        >
                          <ExternalLink size={13} />
                          <span>Live Site</span>
                        </a>
                      </div>
                    </div>

                  </Card>
                </div>
              );
            })}
          </MobileCarousel>
        </div>

        {/* View More / Toggle Button */}
        <div className={styles.viewMoreContainer}>
          <button
            type="button"
            onClick={() => setShowMore(!showMore)}
            className={`${styles.viewMoreBtn} ${showMore ? styles.viewMoreActive : ''}`}
            aria-expanded={showMore}
            aria-label={showMore ? "عرض أقل - Hide additional projects" : "عرض المزيد - View additional projects"}
          >
            <span className={styles.viewMoreIcon}>
              {showMore ? <ChevronUp size={18} /> : <Layers size={18} />}
            </span>
            <span className={styles.viewMoreText}>
              {showMore 
                ? 'عرض أقل — Show Less' 
                : `عرض المزيد من المشاريع — View More Projects (${additionalProjects.length + archiveProjects.length}+)`}
            </span>
            <span className={styles.viewMoreChevron}>
              {showMore ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </span>
          </button>
          <p className={styles.viewMoreHint}>
            {showMore 
              ? 'اضغط هنا للعودة لعرض منصات الشركات الأساسية فقط'
              : 'اضغط لاستعراض المشاريع الهندسية الإضافية، تطبيقات الويب، ونماذج الأعمال السابقة'}
          </p>
        </div>

        {/* Expandable Additional Projects Section */}
        <AnimatePresence>
          {showMore && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: 25 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              exit={{ opacity: 0, height: 0, y: 25 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className={styles.expandedSection}
            >
              
              {/* Subheading: Additional Engineering Builds */}
              <div className={styles.additionalHeader}>
                <div className="pulse-badge">
                  <span style={{ color: 'var(--accent)', fontFamily: 'var(--font-mono)' }}>02 / ENGINEERING CASE STUDIES</span>
                </div>
                <h3 className={styles.additionalTitle}>Selected Engineering Builds & Applications</h3>
                <p className={styles.additionalSubtitle}>
                  Full-stack Next.js systems, real-time client prototypes, high-performance dashboards, and state management architectures.
                </p>
              </div>

              {/* Grid of the 5 Additional Case-Study Projects */}
              <div className={styles.additionalGrid}>
                {additionalProjects.map((project) => {
                  const imagePath = projectImages[project.slug] || '/Img/port.png';
                  const displayUrl = projectUrls[project.slug] || `${project.slug}.vercel.app`;

                  return (
                    <div key={project.slug} className={styles.projectWrapper} data-cursor="explore">
                      <Card className={styles.projectCard} style={{ height: '100%' }}>
                        
                        {/* Chrome Header */}
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

                        {/* Image Preview Frame */}
                        <Link href={`/projects/${project.slug}`} className={styles.imgLink} aria-label={`View ${project.title} case study`}>
                          <div className={styles.imgFrame}>
                            <Image
                              src={imagePath}
                              alt={project.title}
                              fill
                              sizes="(max-width: 1024px) 100vw, (max-width: 1280px) 50vw, 33vw"
                              className={styles.img}
                            />
                            <div className={styles.hoverMask}>
                              <span className={styles.maskText}>Read Case Study</span>
                              <ArrowUpRight size={18} />
                            </div>
                          </div>
                        </Link>

                        {/* Card Info */}
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

                          <Link href={`/projects/${project.slug}`} style={{ textDecoration: 'none' }}>
                            <h4 className={styles.projectTitle}>{project.title}</h4>
                          </Link>
                          <p className={styles.desc}>{project.description}</p>

                          <div className={styles.techList}>
                            {project.tech.slice(0, 5).map((t) => (
                              <span key={t} className={styles.techTag}>
                                {t}
                              </span>
                            ))}
                          </div>

                          <div className={styles.cardFooter}>
                            <Link href={`/projects/${project.slug}`} className={styles.ctaLink}>
                              <span>Case Study</span>
                              <ArrowUpRight size={16} className={styles.ctaArrow} />
                            </Link>

                            <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
                              {project.demoUrl && (
                                <a
                                  href={project.demoUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className={styles.liveLink}
                                  aria-label={`Open demo for ${project.title}`}
                                >
                                  <ExternalLink size={13} />
                                  <span>Demo</span>
                                </a>
                              )}
                              {project.codeUrl && (
                                <a
                                  href={project.codeUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className={styles.liveLink}
                                  aria-label={`Open source code for ${project.title}`}
                                >
                                  <GitBranch size={13} />
                                  <span>Code</span>
                                </a>
                              )}
                            </div>
                          </div>
                        </div>

                      </Card>
                    </div>
                  );
                })}
              </div>

              {/* Archive / Client Prototypes Grid */}
              <div className={styles.archiveWrapper}>
                <div className={styles.additionalHeader} style={{ marginTop: 0 }}>
                  <div className="pulse-badge">
                    <span style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>03 / CLIENT PROTOTYPES</span>
                  </div>
                  <h3 className={styles.additionalTitle}>Client Prototypes & Landing Pages</h3>
                  <p className={styles.additionalSubtitle}>
                    Fast, responsive client interfaces, landing page designs, and healthcare portals built with clean semantic code.
                  </p>
                </div>

                <div className={styles.archiveGrid}>
                  {archiveProjects.map((proj, index) => (
                    <Card key={index} className={styles.archiveCard} style={{ height: '100%' }}>
                      <div className={styles.archImgFrame}>
                        <Image
                          src={proj.image}
                          alt={proj.title}
                          fill
                          sizes="(max-width: 1024px) 100vw, 33vw"
                          className={styles.archImg}
                        />
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
                            <ExternalLink size={13} /> Live Demo
                          </a>
                          <a href={proj.codeUrl} target="_blank" rel="noopener noreferrer" className={styles.archLink}>
                            <GitBranch size={13} /> Source Code
                          </a>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>

            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
