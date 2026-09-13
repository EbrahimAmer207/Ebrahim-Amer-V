'use client';

import React, { useState, useRef, useCallback } from 'react';
import Image from 'next/image';
import { Lock, Monitor, Smartphone, Sparkles } from 'lucide-react';
import styles from './BrowserFrame.module.css';

export interface BrowserFrameProps {
  src: string;
  alt: string;
  url?: string;
  priority?: boolean;
  sizes?: string;
  aspectRatio?: string;
  scrollable?: boolean;
  topRightBadge?: string;
  bottomLeftBadge?: string;
  className?: string;
}

export const BrowserFrame: React.FC<BrowserFrameProps> = ({
  src,
  alt,
  url = 'https://localhost:3000',
  priority = false,
  sizes = '(max-width: 1024px) 100vw, 50vw',
  aspectRatio = '16/10',
  scrollable = false,
  topRightBadge,
  bottomLeftBadge,
  className = '',
}) => {
  const frameRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [deviceMode, setDeviceMode] = useState<'desktop' | 'mobile'>('desktop');

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    // Disable micro-tilt on touch devices or mobile screen sizes
    if (window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 1024) {
      return;
    }

    if (!frameRef.current) return;
    const rect = frameRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const normX = (mouseX / width) * 2 - 1;
    const normY = (mouseY / height) * 2 - 1;

    // Strict cap at 3 degrees max rotation
    const maxTiltDeg = 3;
    const rotateY = normX * maxTiltDeg;
    const rotateX = -normY * maxTiltDeg;

    setTilt({ x: rotateX, y: rotateY });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTilt({ x: 0, y: 0 });
  }, []);

  const cleanUrl = url.replace(/^https?:\/\//, '').replace(/\/$/, '');

  return (
    <div className={styles.browserWrapper}>
      {/* Ambient background glow */}
      <div className={styles.ambientGlow} />

      <div
        ref={frameRef}
        className={`${styles.browserFrame} ${className}`}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `perspective(1200px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        }}
      >
        {/* Floating Feature Badges */}
        {topRightBadge && (
          <div className={`${styles.floatingBadge} ${styles.badgeTopRight}`}>
            <Sparkles size={12} style={{ color: 'var(--accent)' }} />
            <span>{topRightBadge}</span>
          </div>
        )}
        {bottomLeftBadge && (
          <div className={`${styles.floatingBadge} ${styles.badgeBottomLeft}`}>
            <span style={{ color: '#10b981' }}>●</span>
            <span>{bottomLeftBadge}</span>
          </div>
        )}

        {/* Chrome Header Bar */}
        <div className={styles.chromeHeader}>
          <div className={styles.dots}>
            <span className={`${styles.dot} ${styles.dotRed}`} />
            <span className={`${styles.dot} ${styles.dotYellow}`} />
            <span className={`${styles.dot} ${styles.dotGreen}`} />
          </div>

          <div className={styles.addressBar}>
            <Lock size={11} className={styles.lockIcon} />
            <span className={styles.urlText}>{cleanUrl}</span>
          </div>

          {/* Desktop vs Mobile Device View Switcher */}
          <div className={styles.deviceControls}>
            <button
              type="button"
              className={`${styles.deviceBtn} ${deviceMode === 'desktop' ? styles.deviceBtnActive : ''}`}
              onClick={() => setDeviceMode('desktop')}
              title="Desktop View"
            >
              <Monitor size={13} />
            </button>
            <button
              type="button"
              className={`${styles.deviceBtn} ${deviceMode === 'mobile' ? styles.deviceBtnActive : ''}`}
              onClick={() => setDeviceMode('mobile')}
              title="Mobile View"
            >
              <Smartphone size={13} />
            </button>
          </div>
        </div>

        {/* Viewport Frame Container */}
        <div
          className={`${styles.viewport} ${deviceMode === 'mobile' ? styles.viewportMobile : ''} ${scrollable ? styles.viewportScrollable : ''}`}
          style={{ aspectRatio: deviceMode === 'mobile' ? '9/16' : aspectRatio }}
        >
          <Image
            src={src}
            alt={alt}
            fill
            sizes={sizes}
            priority={priority}
            className={styles.img}
          />
        </div>
      </div>
    </div>
  );
};

export default BrowserFrame;
