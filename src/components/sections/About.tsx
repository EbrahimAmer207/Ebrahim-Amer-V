'use client';

import React from 'react';
import LighthouseMeter from '../ui/LighthouseMeter';
import GithubActivity from '../ui/GithubActivity';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { AboutContentRecord } from '@/lib/supabase/types';
import MobileCarousel from '../ui/MobileCarousel';
import styles from './About.module.css';

export interface AboutProps {
  content?: AboutContentRecord;
}

export default function About({ content }: AboutProps = {}) {
  const { ref: leftRef, isVisible: leftIsVisible } = useScrollReveal({ threshold: 0.1 });
  const { ref: rightRef, isVisible: rightIsVisible } = useScrollReveal({ threshold: 0.1 });

  const focusBlocks = content?.focus_blocks && content.focus_blocks.length > 0
    ? content.focus_blocks
    : [
        { label: '01 / CLEAN CODE', text: 'Structuring atomic React file structures with explicit prop types and isolated concerns.' },
        { label: '02 / PERFORMANCE FIRST', text: 'Optimizing page delivery to maintain perfect scores on Google Core Web Vitals.' },
      ];

  return (
    <section id="about" className={styles.section}>
      <div className="container">
        <div className={styles.grid}>

          {/* Left Column: Personal Story */}
          <div
            ref={leftRef}
            className={`${styles.storyWrap} reveal reveal-left ${leftIsVisible ? 'reveal-visible' : ''}`}
          >
            <div className="pulse-badge">
              <span style={{ color: 'var(--accent)', fontFamily: 'var(--font-mono)' }}>
                {content?.tag || '04 / STORY & APPROACH'}
              </span>
            </div>
            <h2 className={`${styles.title} text-gradient`}>
              {content?.title || 'Turning Ideas Into High-Performance Code.'}
            </h2>

            <p className={styles.paragraph}>
              {content?.paragraph_1 || (
                <>Hi, I&rsquo;m Ebrahim Abdelmonem Amer, a Computer Science student at Mansoura University (graduating in 2026) specializing in modern front-end architectures. I build responsive, highly interactive web applications that focus on asset size reductions, client-side speed optimizations, and clean, modular execution.</>
              )}
            </p>

            <p className={styles.paragraph}>
              {content?.paragraph_2 || (
                <>My development philosophy centers around writing readable, maintainable TypeScript and React components, minimizing layout shifts, and ensuring maximum responsiveness across viewports. Whether creating complete e-commerce single-page interfaces or modular administrative panels, I focus on delivering seamless UX that elevates the brand.</>
              )}
            </p>

            <div className={styles.focusBlocks}>
              {focusBlocks.map((block, idx) => (
                <div key={block.label} className={`${styles.focusItem} reveal reveal-up reveal-delay-${idx + 1} ${leftIsVisible ? 'reveal-visible' : ''}`}>
                  <span className={styles.focusLabel}>{block.label}</span>
                  <p className={styles.focusText}>{block.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Widgets (Carousel on Mobile) */}
          <div
            ref={rightRef}
            className={`reveal reveal-right ${rightIsVisible ? 'reveal-visible' : ''}`}
          >
            <MobileCarousel desktopGridClass={styles.widgetsWrap} autoplay={false}>
              <LighthouseMeter />
              <GithubActivity />
            </MobileCarousel>
          </div>

        </div>
      </div>
    </section>
  );
}
