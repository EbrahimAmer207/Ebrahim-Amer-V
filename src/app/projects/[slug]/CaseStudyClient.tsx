'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Project } from '@/data/projectsData';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { 
  ArrowLeft, 
  ExternalLink, 
  GitBranch, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldCheck, 
  Trophy, 
  Sparkles, 
  Lock,
  Layers
} from 'lucide-react';
import styles from './CaseStudy.module.css';

// Project image mapping
const projectImages: Record<string, string> = {
  'growfet': '/Img/image copy.png',
  'rashet-etr': '/Img/image.png',
  'growfet-tech': '/Img/image copy 2.png',
  'luxe-ecommerce': '/Img/luxe-ecommerce.png',
  'aetheria-estate': '/Img/4.png',
  'apex-ecommerce': '/Img/fake.png',
  'nexus-dashboard': '/Img/Dash.png',
  'nimbus-weather': '/Img/we.png',
  'supabase-portfolio': '/Img/port.png',
};

interface CaseStudyClientProps {
  project: Project;
}

export default function CaseStudyClient({ project }: CaseStudyClientProps) {
  const imagePath = projectImages[project.slug] || project.screenshots?.[0]?.src || '/Img/port.png';

  return (
    <div className={styles.page}>
      
      {/* Top Floating bar */}
      <header className={styles.header}>
        <div className={styles.navContainer}>
          <Link href="/#projects">
            <Button variant="secondary" magnetic={true} className={styles.backBtn}>
              <ArrowLeft size={16} style={{ marginRight: '0.5rem' }} /> Back to Selected Work
            </Button>
          </Link>
          <div className={styles.headerMeta}>
            <span className={styles.headerSlug}>{project.slug}</span>
            <span className={styles.headerDot}>•</span>
            <span className={styles.headerCat}>{project.category}</span>
          </div>
        </div>
      </header>

      <main className={styles.main}>
        <div className="container">
          
          {/* Hero Banner Grid */}
          <div className={styles.heroGrid}>
            <div className={styles.heroContent}>
              <div className="pulse-badge">
                <span style={{ color: 'var(--accent)', fontFamily: 'var(--font-mono)' }}>COMMERCIAL CASE STUDY</span>
              </div>
              <h1 className={`${styles.title} text-gradient`}>
                {project.title}
                {project.brandNameArabic && (
                  <span className={styles.brandBadge}>{project.brandNameArabic}</span>
                )}
              </h1>
              <p className={styles.lead}>{project.longDescription}</p>

              <div className={styles.actionButtons}>
                <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                  <Button variant="accent" magnetic={true}>
                    Launch Live Platform <ExternalLink size={14} style={{ marginLeft: '0.5rem', display: 'inline-block' }} />
                  </Button>
                </a>

                {project.codeUrl ? (
                  <a href={project.codeUrl} target="_blank" rel="noopener noreferrer">
                    <Button variant="secondary" magnetic={true}>
                      Inspect Repository <GitBranch size={14} style={{ marginLeft: '0.5rem', display: 'inline-block' }} />
                    </Button>
                  </a>
                ) : (
                  <div className={styles.privateCodeBtn}>
                    <Lock size={14} style={{ color: 'var(--accent)' }} />
                    <span>Commercial Proprietary Codebase</span>
                  </div>
                )}
              </div>
            </div>

            <div className={styles.heroImgFrame}>
              <Image
                src={imagePath}
                alt={project.title}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className={styles.heroImg}
                priority
              />
            </div>
          </div>

          {/* Performance & Architecture Metrics Grid */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>
              <ShieldCheck size={20} className={styles.sectionIcon} /> Technical &amp; Architecture Specifications
            </h2>
            <div className={styles.metricsGrid}>
              {project.metrics.map((metric) => (
                <Card key={metric.label} className={styles.metricCard}>
                  <span className={styles.metricVal}>{metric.value}</span>
                  <span className={styles.metricLabel}>{metric.label}</span>
                </Card>
              ))}
            </div>
          </section>

          {/* The Narrative Story */}
          <section className={styles.section}>
            <div className={styles.narrativeGrid}>
              
              {/* Problem Statement */}
              <Card className={styles.narrativeCard}>
                <div className={styles.narrativeHeader}>
                  <AlertTriangle size={18} style={{ color: '#ef4444' }} />
                  <h3>Project Context &amp; Challenge</h3>
                </div>
                <p>{project.story.problem}</p>
              </Card>

              {/* Technical Solution */}
              <Card className={styles.narrativeCard}>
                <div className={styles.narrativeHeader}>
                  <Sparkles size={18} style={{ color: 'var(--accent)' }} />
                  <h3>Architectural Solution</h3>
                </div>
                <p>{project.story.solution}</p>
              </Card>

              {/* Measurable Result */}
              <Card className={styles.narrativeCard}>
                <div className={styles.narrativeHeader}>
                  <Trophy size={18} style={{ color: '#eab308' }} />
                  <h3>Production Outcome</h3>
                </div>
                <p>{project.story.result}</p>
              </Card>

            </div>
          </section>

          {/* Detailed Challenges & Technical Outcomes */}
          <div className={styles.detailsGrid}>
            
            {/* Development Obstacles */}
            <div className={styles.detailsBlock}>
              <h3 className={styles.blockTitle}>Obstacles Overcome</h3>
              <ul className={styles.blockList}>
                {project.challenges.map((challenge, idx) => (
                  <li key={challenge.slice(0, 30)} className={styles.blockItem}>
                    <span className={styles.bulletIdx}>0{idx + 1}</span>
                    <p>{challenge}</p>
                  </li>
                ))}
              </ul>
            </div>

            {/* My Specific Technical Contributions */}
            <div className={styles.detailsBlock}>
              <h3 className={styles.blockTitle}>My Specific Technical Contributions</h3>
              <ul className={styles.blockList}>
                {project.outcomes.map((outcome) => (
                  <li key={outcome.slice(0, 30)} className={styles.blockItem}>
                    <CheckCircle2 size={16} className={styles.checkIcon} />
                    <p>{outcome}</p>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* Visual Showcase: Genuine Project Screenshots */}
          {project.screenshots && project.screenshots.length > 0 && (
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>
                <Layers size={20} className={styles.sectionIcon} /> Verified Platform Interfaces &amp; Gallery
              </h2>
              <div className={styles.galleryGrid}>
                {project.screenshots.map((shot) => (
                  <Card key={shot.src} className={styles.galleryCard}>
                    <div className={styles.galleryImgFrame}>
                      <Image
                        src={shot.src}
                        alt={`${project.title} - ${shot.caption}`}
                        fill
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        className={styles.galleryImg}
                      />
                    </div>
                    <div className={styles.galleryCaption}>
                      {shot.caption}
                    </div>
                  </Card>
                ))}
              </div>
            </section>
          )}

          {/* Technology stack utilized */}
          <section className={styles.section} style={{ borderBottom: 'none' }}>
            <h3 className={styles.blockTitle}>Technology Stack Utilized</h3>
            <div className={styles.techList}>
              {project.tech.map((t) => (
                <span key={t} className={styles.techTag}>
                  {t}
                </span>
              ))}
            </div>
          </section>

          {/* Bottom Launch Call To Action */}
          <div className={styles.launchBanner}>
            <div className={styles.launchInfo}>
              <h3 className={styles.launchTitle}>Experience {project.title} Live</h3>
              <p className={styles.launchDesc}>
                This platform is deployed in active production. Visit the live site to explore the user experience, bilingual routing, and interactive interfaces firsthand.
              </p>
            </div>
            <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
              <Button variant="accent" magnetic={true}>
                Visit Live Site <ExternalLink size={14} style={{ marginLeft: '0.5rem', display: 'inline-block' }} />
              </Button>
            </a>
          </div>

        </div>
      </main>

      {/* Footer credits */}
      <footer className={styles.footer}>
        <div className="container">
          <div className={styles.footerInner}>
            <span>Ebrahim Amer Case Study — {project.title}</span>
            <Link href="/#projects" className={styles.footerLink}>
              ← View other projects
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
