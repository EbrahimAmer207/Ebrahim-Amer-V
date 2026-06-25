'use client';

import React, { use } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { projectsData } from '@/data/projectsData';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ArrowLeft, ExternalLink, GitBranch, CheckCircle2, AlertTriangle, ShieldCheck, Trophy, Sparkles } from 'lucide-react';
import styles from './CaseStudy.module.css';

// Project image mapping
const projectImages: Record<string, string> = {
  'luxe-ecommerce': '/Img/luxe-ecommerce.png',
  'supabase-portfolio': '/Img/supabase-portfolio.png',
  'aetheria-estate': '/Img/4.png',
  'apex-ecommerce': '/Img/fake.png',
  'nexus-dashboard': '/Img/Dash.png',
  'nimbus-weather': '/Img/we.png',
};

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function CaseStudyPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const project = projectsData.find((p) => p.slug === resolvedParams.slug);

  if (!project) {
    notFound();
  }

  const imagePath = projectImages[project.slug] || '/Img/port.png';

  return (
    <div className={styles.page}>
      
      {/* Top Floating bar */}
      <header className={styles.header}>
        <div className={styles.navContainer}>
          <Link href="/#projects">
            <Button variant="secondary" magnetic={true} className={styles.backBtn}>
              <ArrowLeft size={16} style={{ marginRight: '0.5rem' }} /> Back to Work
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
                <span style={{ color: 'var(--accent)' }}>CASE STUDY</span>
              </div>
              <h1 className={`${styles.title} text-gradient`}>{project.title}</h1>
              <p className={styles.lead}>{project.longDescription}</p>

              <div className={styles.actionButtons}>
                <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                  <Button variant="accent" magnetic={true}>
                    Launch Live Client <ExternalLink size={14} style={{ marginLeft: '0.5rem', display: 'inline-block' }} />
                  </Button>
                </a>
                <a href={project.codeUrl} target="_blank" rel="noopener noreferrer">
                  <Button variant="secondary" magnetic={true}>
                    Inspect Repository <GitBranch size={14} style={{ marginLeft: '0.5rem', display: 'inline-block' }} />
                  </Button>
                </a>
              </div>
            </div>

            <div className={styles.heroImgFrame}>
              <img src={imagePath} alt={project.title} className={styles.heroImg} />
            </div>
          </div>

          {/* Performance Audit Metrics Grid */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>
              <ShieldCheck size={20} className={styles.sectionIcon} /> Engineering Metrics
            </h2>
            <div className={styles.metricsGrid}>
              {project.metrics.map((metric, index) => (
                <Card key={index} className={styles.metricCard}>
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
                  <h3>The Challenge</h3>
                </div>
                <p>{project.story.problem}</p>
              </Card>

              {/* Technical Solution */}
              <Card className={styles.narrativeCard}>
                <div className={styles.narrativeHeader}>
                  <Sparkles size={18} style={{ color: 'var(--accent)' }} />
                  <h3>The Solution</h3>
                </div>
                <p>{project.story.solution}</p>
              </Card>

              {/* Measurable Result */}
              <Card className={styles.narrativeCard}>
                <div className={styles.narrativeHeader}>
                  <Trophy size={18} style={{ color: '#eab308' }} />
                  <h3>The Outcome</h3>
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
                  <li key={idx} className={styles.blockItem}>
                    <span className={styles.bulletIdx}>0{idx + 1}</span>
                    <p>{challenge}</p>
                  </li>
                ))}
              </ul>
            </div>

            {/* Architecture Outcomes */}
            <div className={styles.detailsBlock}>
              <h3 className={styles.blockTitle}>Key Implementations</h3>
              <ul className={styles.blockList}>
                {project.outcomes.map((outcome, idx) => (
                  <li key={idx} className={styles.blockItem}>
                    <CheckCircle2 size={16} className={styles.checkIcon} />
                    <p>{outcome}</p>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* Technology stack utilized */}
          <section className={styles.section} style={{ borderBottom: 'none' }}>
            <h3 className={styles.blockTitle}>Stack Specifications</h3>
            <div className={styles.techList}>
              {project.tech.map((t) => (
                <span key={t} className={styles.techTag}>
                  {t}
                </span>
              ))}
            </div>
          </section>

        </div>
      </main>

      {/* Footer credits */}
      <footer className={styles.footer}>
        <div className="container">
          <div className={styles.footerInner}>
            <span>Ebrahim Amer Case Study</span>
            <Link href="/#projects" className={styles.footerLink}>
              View other projects
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
