'use client';

import React from 'react';
import { GitBranch, Mail, ArrowUp } from 'lucide-react';
import styles from './Footer.module.css';

// Inline LinkedIn SVG since lucide-react v1.x has no brand icons
const LinkedinIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export default function Footer() {
  const scrollUp = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.top}>
          <div className={styles.info}>
            <span className={styles.logo}>EBRAHIM AMER</span>
            <p className={styles.tagline}>
              Front-End Engineer specializing in React, Next.js, and premium design implementations.
            </p>
          </div>

          <div className={styles.linksBlock}>
            <span className={styles.label}>Connect</span>
            <div className={styles.socials}>
              <a href="https://github.com/EbrahimAmer207" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                <GitBranch size={16} /> <span>GitHub</span>
              </a>
              <a href="https://www.linkedin.com/in/ebrahim-amer0/" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                <LinkedinIcon /> <span>LinkedIn</span>
              </a>
              <a href="mailto:himaamer937@gmail.com" className={styles.socialLink}>
                <Mail size={16} /> <span>Email</span>
              </a>
            </div>
          </div>
        </div>

        <div className={styles.bottom}>
          <div className={styles.copy}>
            <span>© 2026 Ebrahim Amer. All rights reserved.</span>
            <span className={styles.divider}>•</span>
            <span>Designed & Engineered from scratch.</span>
          </div>

          <button className={styles.scrollBtn} onClick={scrollUp} title="Back to top">
            <span>Back to top</span>
            <ArrowUp size={14} />
          </button>
        </div>
      </div>
    </footer>
  );
}
