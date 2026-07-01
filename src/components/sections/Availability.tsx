'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Code, GraduationCap, Briefcase, ArrowRight, CheckCircle } from 'lucide-react';
import styles from './Availability.module.css';

export default function Availability() {
  const header = useScrollReveal({ threshold: 0.1 });
  const cards = useScrollReveal({ threshold: 0.1 });

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const opportunities = [
    {
      icon: <Briefcase size={22} className={styles.iconBlue} />,
      role: 'Junior Frontend Roles',
      desc: 'Full-time engineering positions specializing in React, Next.js, and pixel-perfect design system architecture.',
      spec: 'Full-time / Remote & Hybrid',
      status: 'Open for offers',
      accentClass: styles.blueGlow
    },
    {
      icon: <GraduationCap size={22} className={styles.iconGreen} />,
      role: 'Internships & Traineeships',
      desc: 'Structured software engineering and frontend developer programs to contribute to corporate systems and agile sprints.',
      spec: 'Front-End / Fullstack React',
      status: 'Ready to join',
      accentClass: styles.greenGlow
    },
    {
      icon: <Code size={22} className={styles.iconAmber} />,
      role: 'Contract & Freelance Work',
      desc: 'Custom web application builds, SEO-friendly landing page optimization, dynamic administration dashboards, and database integrations.',
      spec: 'Project-based / Freelance',
      status: 'Available now',
      accentClass: styles.amberGlow
    }
  ];

  return (
    <section id="availability" className={styles.section}>
      <div className="container">
        
        {/* Section Header */}
        <div
          ref={header.ref}
          className={`${styles.header} reveal reveal-up ${header.isVisible ? 'reveal-visible' : ''}`}
        >
          <div className="pulse-badge">
            <div className="pulse-dot" style={{ backgroundColor: '#10b981', boxShadow: '0 0 8px #10b981' }} />
            <span style={{ color: 'var(--accent)', marginLeft: '0.4rem' }}>STATUS: ACTIVE</span>
          </div>
          <h2 className={`${styles.title} text-gradient`}>
            Available For.
          </h2>
          <p className={styles.subtitle}>
            I am currently open to junior software engineering contracts, structured internships, and freelance projects matching my technical capabilities.
          </p>
        </div>

        {/* Opportunities Grid */}
        <div
          ref={cards.ref}
          className={`${styles.grid} reveal reveal-up ${cards.isVisible ? 'reveal-visible' : ''}`}
        >
          {opportunities.map((opt, idx) => (
            <Card key={idx} className={`${styles.card} ${opt.accentClass}`}>
              <div className={styles.cardHeader}>
                <div className={styles.iconContainer}>{opt.icon}</div>
                <div className={styles.statusBadge}>
                  <CheckCircle size={12} style={{ marginRight: '0.35rem', flexShrink: 0 }} />
                  {opt.status}
                </div>
              </div>
              
              <h3 className={styles.cardTitle}>{opt.role}</h3>
              <p className={styles.cardDesc}>{opt.desc}</p>
              
              <div className={styles.cardFooter}>
                <span className={styles.specLabel}>Preferences</span>
                <span className={styles.specValue}>{opt.spec}</span>
              </div>
            </Card>
          ))}
        </div>

        {/* Call to Action Banner */}
        <div className={styles.ctaBanner}>
          <p>Have an open role or client project that aligns with my expertise?</p>
          <Button variant="primary" onClick={scrollToContact} magnetic={true}>
            Let's Discuss Opportunities
            <ArrowRight size={16} style={{ marginLeft: '0.5rem', display: 'inline-block', verticalAlign: 'middle' }} />
          </Button>
        </div>

      </div>
    </section>
  );
}
