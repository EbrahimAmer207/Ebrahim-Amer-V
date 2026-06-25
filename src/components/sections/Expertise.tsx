import React from 'react';
import { Card } from '../ui/Card';
import { Cpu, Globe, Layout, Network, Shield, Zap } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import MobileCarousel from '../ui/MobileCarousel';
import styles from './Expertise.module.css';

export default function Expertise() {
  const header = useScrollReveal({ threshold: 0.1 });
  const grid   = useScrollReveal({ threshold: 0.05, rootMargin: '0px 0px -40px 0px' });

  const coreStack = [
    { title: 'React Architecture',     icon: <Cpu size={24} />,     desc: 'Expertise in building scalable SPAs with optimized component structures, custom hook state patterns, and clean context flows.' },
    { title: 'Next.js & SSR',          icon: <Zap size={24} />,     desc: 'Developing high-performance, SEO-friendly static and server-rendered builds utilizing file-based routing and optimized asset fetching.' },
    { title: 'Modern JavaScript / TS', icon: <Globe size={24} />,   desc: 'Writing clean, asynchronous, type-safe client logic utilizing ES6+ APIs, modular setups, and clean object-oriented concepts.' },
    { title: 'API Orchestration',      icon: <Network size={24} />, desc: 'Structuring efficient data pipelines using Axios, fetch, error fallbacks, cached states, and local storage state persistence.' },
    { title: 'Performance Optimization',icon: <Shield size={24} />, desc: 'Achieving sub-second load times via image lazy loading, code-splitting, layout shift mitigation (CLS), and Lighthouse auditing.' },
    { title: 'Responsive Design',      icon: <Layout size={24} />,  desc: 'Translating design mockups into pixel-perfect, highly responsive interfaces utilizing advanced CSS Flexbox, Grid, and adaptive layouts.' },
  ];

  return (
    <section id="expertise" className={styles.section}>
      <div className="container">
        <div className={styles.layout}>

          {/* Header */}
          <div
            ref={header.ref}
            className={`${styles.header} reveal reveal-up ${header.isVisible ? 'reveal-visible' : ''}`}
          >
            <div className="pulse-badge">
              <span style={{ color: 'var(--accent)' }}>DOMAINS</span>
            </div>
            <h2 className={`${styles.title} text-gradient`}>
              Technical Expertise &amp; Core Stack.
            </h2>
            <p className={styles.subtitle}>
              A curated set of technologies and methodologies I rely on to engineer fast,
              production-grade user interfaces that look premium.
            </p>
          </div>

          {/* Grid – each card staggered, turns into a carousel on mobile */}
          <div ref={grid.ref}>
            <MobileCarousel desktopGridClass={styles.grid}>
              {coreStack.map((item, i) => (
                <Card
                  key={i}
                  className={`${styles.card} reveal reveal-up reveal-delay-${i + 1} ${grid.isVisible ? 'reveal-visible' : ''}`}
                  style={{ height: '100%', minHeight: '260px' }}
                >
                  <div className={styles.iconWrap}>{item.icon}</div>
                  <h3 className={styles.cardTitle}>{item.title}</h3>
                  <p className={styles.cardDesc}>{item.desc}</p>
                </Card>
              ))}
            </MobileCarousel>
          </div>

        </div>
      </div>
    </section>
  );
}
