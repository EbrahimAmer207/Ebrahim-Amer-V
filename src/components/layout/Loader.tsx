'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Loader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let current = 0;
    const duration = 1600; // 1.6s
    const stepTime = Math.abs(Math.floor(duration / 100));
    
    const timer = setInterval(() => {
      current += 1;
      if (current >= 100) {
        current = 100;
        clearInterval(timer);
        setTimeout(onComplete, 400); // Small delay after hitting 100
      }
      setProgress(current);
    }, stepTime);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ 
        y: '-100%',
        transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } 
      }}
      className="loader-wrapper"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: '#050505',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '3rem',
        color: '#ffffff',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: '0.85rem', fontWeight: 500, letterSpacing: '0.05em', color: '#a1a1aa' }}>
          EBRAHIM AMER / PORTFOLIO v2
        </span>
        <span style={{ fontSize: '0.85rem', fontWeight: 500, color: '#a1a1aa' }}>
          © 2026
        </span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <h1 
          style={{ 
            fontSize: 'clamp(2rem, 8vw, 6rem)', 
            fontWeight: 800, 
            letterSpacing: '-0.03em', 
            lineHeight: 0.9,
            display: 'flex',
            alignItems: 'baseline',
            gap: '1rem'
          }}
        >
          {progress}%
        </h1>
        <div style={{ width: '100%', height: '2px', background: 'rgba(255,255,255,0.05)', borderRadius: '2px', overflow: 'hidden' }}>
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ ease: 'easeOut' }}
            style={{ height: '100%', background: '#00D4FF' }} 
          />
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <span style={{ fontSize: '0.85rem', color: '#a1a1aa', maxWidth: '300px' }}>
          Engineered for performance, responsiveness, and premium aesthetics.
        </span>
        <span style={{ fontSize: '0.85rem', color: '#00D4FF', fontWeight: 500 }}>
          LOADING ENGINE
        </span>
      </div>
    </motion.div>
  );
}
