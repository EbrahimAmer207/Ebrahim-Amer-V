'use client';

import React from 'react';
import LighthouseMeter from '../ui/LighthouseMeter';
import GithubActivity from '../ui/GithubActivity';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import styles from './About.module.css';

export default function About() {
  const left  = useScrollReveal({ threshold: 0.1 });
  const right = useScrollReveal({ threshold: 0.1 });

  return (
    <section id="about" className={styles.section}>
      <div className="container">
        <div className={styles.grid}>

          {/* Left Column: Personal Story */}
          <div
            ref={left.ref}
            className={`${styles.storyWrap} reveal reveal-left ${left.isVisible ? 'reveal-visible' : ''}`}
          >
            <div className="pulse-badge">
              <span style={{ color: 'var(--accent)' }}>PROFILE</span>
            </div>
            <h2 className={`${styles.title} text-gradient`}>
              Turning Ideas Into High-Performance Code.
            </h2>

            <p className={styles.paragraph}>
              Hi, I&rsquo;m Ebrahim Abdelmonem Amer, a Computer Science student at Mansoura University
              (graduating in 2026) specializing in modern front-end architectures. I build responsive,
              highly interactive web applications that focus on asset size reductions, client-side speed
              optimizations, and clean, modular execution.
            </p>

            <p className={styles.paragraph}>
              My development philosophy centers around writing readable, maintainable TypeScript and React
              components, minimizing layout shifts, and ensuring maximum responsiveness across viewports.
              Whether creating complete e-commerce single-page interfaces or modular administrative panels,
              I focus on delivering seamless UX that elevates the brand.
            </p>

            <div className={styles.focusBlocks}>
              <div className={`${styles.focusItem} reveal reveal-up reveal-delay-1 ${left.isVisible ? 'reveal-visible' : ''}`}>
                <span className={styles.focusLabel}>01 / CLEAN CODE</span>
                <p className={styles.focusText}>Structuring atomic React file structures with explicit prop types and isolated concerns.</p>
              </div>
              <div className={`${styles.focusItem} reveal reveal-up reveal-delay-2 ${left.isVisible ? 'reveal-visible' : ''}`}>
                <span className={styles.focusLabel}>02 / PERFORMANCE FIRST</span>
                <p className={styles.focusText}>Optimizing page delivery to maintain perfect scores on Google Core Web Vitals.</p>
              </div>
            </div>
          </div>

          {/* Right Column: Widgets */}
          <div
            ref={right.ref}
            className={`${styles.widgetsWrap} reveal reveal-right ${right.isVisible ? 'reveal-visible' : ''}`}
          >
            <LighthouseMeter />
            <GithubActivity />
          </div>

        </div>
      </div>
    </section>
  );
}
