'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import styles from './LighthouseMeter.module.css';

interface MetricProps {
  label: string;
  score: number;
  colorClass: string;
  delay: number;
  isInView: boolean;
}

function CircularMetric({ label, score, colorClass, delay, isInView }: MetricProps) {
  const [val, setVal] = useState(0);
  const radius = 32;
  const strokeWidth = 6;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (val / 100) * circumference;

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const duration = 1200; // 1.2s
    const step = Math.floor(duration / score);
    
    const delayTimer = setTimeout(() => {
      const timer = setInterval(() => {
        start += 1;
        if (start >= score) {
          start = score;
          clearInterval(timer);
        }
        setVal(start);
      }, step);
      return () => clearInterval(timer);
    }, delay * 1000);

    return () => clearTimeout(delayTimer);
  }, [isInView, score, delay]);

  return (
    <div className={styles.metricItem}>
      <div className={styles.svgWrap}>
        <svg width="80" height="80" viewBox="0 0 80 80">
          <circle
            cx="40"
            cy="40"
            r={radius}
            stroke="rgba(255,255,255,0.04)"
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          <circle
            className={`metric-circle ${colorClass}`}
            cx="40"
            cy="40"
            r={radius}
            stroke="var(--accent)"
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            transform="rotate(-90 40 40)"
          />
        </svg>
        <span className={styles.scoreText}>{val}</span>
      </div>
      <span className={styles.metricLabel}>{label}</span>
    </div>
  );
}

export default function LighthouseMeter() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  const metrics = [
    { label: 'Performance', score: 100, colorClass: styles.performance, delay: 0.1 },
    { label: 'Accessibility', score: 100, colorClass: styles.accessibility, delay: 0.3 },
    { label: 'Best Practices', score: 100, colorClass: styles.bestPractices, delay: 0.5 },
    { label: 'SEO', score: 100, colorClass: styles.seo, delay: 0.7 },
  ];

  return (
    <div ref={containerRef} className={styles.container}>
      <div className={styles.header}>
        <div className={styles.badge}>
          <div className={styles.dot} /> LIGHTHOUSE AUDIT
        </div>
        <p className={styles.meta}>Production-build audit report for desktop devices.</p>
      </div>

      <div className={styles.grid}>
        {metrics.map((m) => (
          <CircularMetric
            key={m.label}
            label={m.label}
            score={m.score}
            colorClass={m.colorClass}
            delay={m.delay}
            isInView={isInView}
          />
        ))}
      </div>
    </div>
  );
}
