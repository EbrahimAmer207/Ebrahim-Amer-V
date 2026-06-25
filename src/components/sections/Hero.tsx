'use client';

import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Button } from '../ui/Button';
import { useMousePosition } from '@/hooks/useMousePosition';
import { ArrowRight, Sparkles, Download } from 'lucide-react';
import styles from './Hero.module.css';

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouse = useMousePosition();

  // Track mouse for radial glow
  useEffect(() => {
    if (!containerRef.current) return;
    const { left, top } = containerRef.current.getBoundingClientRect();
    containerRef.current.style.setProperty('--mouse-x', `${mouse.x - left}px`);
    containerRef.current.style.setProperty('--mouse-y', `${mouse.y - top}px`);
  }, [mouse]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  // Stagger container
  const stagger = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
  };

  // Each line rises up
  const line = {
    hidden: { y: 48, opacity: 0 },
    show:   { y: 0,  opacity: 1, transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] as [number,number,number,number] } },
  };

  const proofItems = [
    { value: '9+',  label: 'Projects Built' },
    { value: '4+',  label: 'Certifications' },
    { value: '2026',label: 'CS Graduation' },
  ];

  return (
    <section ref={containerRef} id="home" className={styles.hero}>
      {/* Grid background + mouse glow */}
      <div className="bg-grid" />
      <div className={styles.radialGlow} />

      {/* Floating decorative blobs */}
      <div className={styles.blob1} />
      <div className={styles.blob2} />

      <div className={`container ${styles.inner}`}>

        {/* ── LEFT: Text Content ── */}
        <div className={styles.left}>

          {/* Availability badge */}
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className={`pulse-badge ${styles.badge}`}
          >
            <div className="pulse-dot" />
            <span>Available for junior roles &amp; internships</span>
          </motion.div>

          {/* Title lines */}
          <motion.h1
            variants={stagger}
            initial="hidden"
            animate="show"
            className={styles.title}
          >
            <motion.span variants={line} className={`${styles.titleLine} text-gradient`}>
              Building Digital
            </motion.span>
            <motion.span variants={line} className={`${styles.titleLine} text-gradient`}>
              Experiences That
            </motion.span>
            <motion.span variants={line} className={`${styles.titleLine} ${styles.accent}`}>
              Feel Effortless.
            </motion.span>
          </motion.h1>

          {/* Subline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] as [number,number,number,number] }}
            className={styles.description}
          >
            Front-End Engineer focused on high-performance React & Next.js applications,
            pixel-perfect design systems, and interactive storytelling that converts visitors into clients.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.85, ease: [0.16, 1, 0.3, 1] as [number,number,number,number] }}
            className={styles.actions}
          >
            <Button variant="primary" onClick={() => scrollTo('projects')}>
              Explore Work
              <ArrowRight size={16} style={{ marginLeft: '0.4rem', display: 'inline-block', verticalAlign: 'middle' }} />
            </Button>
            <Button variant="secondary" onClick={() => scrollTo('contact')}>
              Let&rsquo;s Connect
              <Sparkles size={14} style={{ marginLeft: '0.4rem', display: 'inline-block', verticalAlign: 'middle', color: 'var(--accent)' }} />
            </Button>
            <a href="/Files/Ebrahim_Amer_CV.pdf" download="Ebrahim_Amer_CV.pdf" style={{ textDecoration: 'none' }}>
              <Button variant="secondary">
                Download CV
                <Download size={14} style={{ marginLeft: '0.4rem', display: 'inline-block', verticalAlign: 'middle' }} />
              </Button>
            </a>
          </motion.div>

          {/* Proof stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.1 }}
            className={styles.proofs}
          >
            {proofItems.map((item, i) => (
              <div key={i} className={styles.proofCard}>
                <span className={styles.proofVal}>{item.value}</span>
                <span className={styles.proofLabel}>{item.label}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ── RIGHT: Profile Photo ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 30 }}
          animate={{ opacity: 1, scale: 1,    y: 0  }}
          transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] as [number,number,number,number] }}
          className={styles.photoWrap}
        >
          {/* Glowing ring behind photo */}
          <div className={styles.photoRing} />

          {/* Main photo frame */}
          <div className={styles.photoFrame}>
            <Image
              src="/Img/profile.png"
              alt="Ebrahim Amer – Front-End Engineer"
              fill
              priority
              sizes="(max-width: 768px) 280px, 380px"
              className={styles.photo}
              style={{ objectFit: 'cover', objectPosition: 'top center' }}
            />
            {/* Bottom gradient fade */}
            <div className={styles.photoFade} />
          </div>

          {/* Floating badge: Available */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0  }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className={styles.floatBadge}
          >
            <div className={styles.floatDot} />
            <span>Open to Work</span>
          </motion.div>

          {/* Floating tech chip */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0  }}
            transition={{ duration: 0.6, delay: 1.4 }}
            className={styles.techChip}
          >
            <span className={styles.techChipLabel}>React · Next.js · TypeScript</span>
          </motion.div>

          {/* Decorative corner lines */}
          <div className={`${styles.corner} ${styles.cornerTL}`} />
          <div className={`${styles.corner} ${styles.cornerBR}`} />
        </motion.div>

      </div>
    </section>
  );
}
