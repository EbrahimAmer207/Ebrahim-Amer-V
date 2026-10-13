'use client';

import React from 'react';
import MobileCarousel from '../ui/MobileCarousel';
import styles from './Process.module.css';

export default function Process() {
  const steps = [
    {
      num: '01',
      title: 'Discover',
      desc: 'Deep dive into user needs, business goals, project architecture, and technical requirements.',
    },
    {
      num: '02',
      title: 'Design & Tokenize',
      desc: 'Structure clean design tokens, reusable components, and high-fidelity interactive wireframes.',
    },
    {
      num: '03',
      title: 'Engineering & Build',
      desc: 'Develop production-grade React & Next.js web applications with clean TypeScript architecture.',
    },
    {
      num: '04',
      title: 'Refine & Launch',
      desc: 'Rigorous responsive testing, accessibility verification, LCP optimization, and deployment.',
    },
  ];

  return (
    <section id="process" className={styles.section}>
      <div className="container">
        
        {/* Section Header */}
        <div className={styles.header}>
          <span className={styles.sectionTag}>03 / PROCESS</span>
          <h2 className={styles.title}>Engineering Workflow</h2>
          <p className={styles.subtitle}>
            A structured, repeatable approach focused on clarity, performance, and craftsmanship.
          </p>
        </div>

        {/* 4 Steps Carousel on Mobile, Grid on Desktop */}
        <MobileCarousel desktopGridClass={styles.grid} autoplay={false}>
          {steps.map((step) => (
            <div key={step.num} className={styles.stepCard} style={{ height: '100%' }}>
              <div>
                <div className={styles.stepNumber}>
                  <span>STEP {step.num}</span>
                  <span className={styles.stepDot} />
                </div>
                <h3 className={styles.stepTitle}>{step.title}</h3>
              </div>
              <p className={styles.stepDesc}>{step.desc}</p>
            </div>
          ))}
        </MobileCarousel>

      </div>
    </section>
  );
}
