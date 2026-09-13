'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface MobileCarouselProps {
  children: React.ReactNode;
  desktopGridClass?: string;
  autoplay?: boolean;
  autoplayInterval?: number; // duration in milliseconds
}

export default function MobileCarousel({
  children,
  desktopGridClass = '',
  autoplay = true,
  autoplayInterval = 3000,
}: MobileCarouselProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [index, setIndex] = useState(0);

  const childrenArray = React.Children.toArray(children);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const validIndex = index >= childrenArray.length ? 0 : index;

  // Autoplay handler
  useEffect(() => {
    if (!isMobile || !autoplay || childrenArray.length <= 1) return;

    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % childrenArray.length);
    }, autoplayInterval);

    return () => clearInterval(timer);
  }, [isMobile, autoplay, childrenArray.length, autoplayInterval]);

  if (!isMobile) {
    return (
      <div className={desktopGridClass}>
        {children}
      </div>
    );
  }

  if (childrenArray.length === 0) {
    return null;
  }

  const handlePrev = () => {
    if (childrenArray.length <= 1) return;
    setIndex((prev) => (prev > 0 ? prev - 1 : childrenArray.length - 1));
  };

  const handleNext = () => {
    if (childrenArray.length <= 1) return;
    setIndex((prev) => (prev + 1) % childrenArray.length);
  };

  return (
    <div style={{ position: 'relative', width: '100%', overflow: 'hidden', paddingBottom: '0.5rem' }}>
      
      {/* Track */}
      <motion.div
        drag={childrenArray.length > 1 ? 'x' : false}
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.15}
        onDragEnd={(_e, info) => {
          const swipeThreshold = 40;
          if (info.offset.x < -swipeThreshold) {
            handleNext();
          } else if (info.offset.x > swipeThreshold) {
            handlePrev();
          }
        }}
        animate={{ x: `-${validIndex * 100}%` }}
        transition={{ type: 'spring', damping: 25, stiffness: 220 }}
        style={{
          display: 'flex',
          width: '100%',
          cursor: childrenArray.length > 1 ? 'grab' : 'default',
          touchAction: 'pan-y',
        }}
        whileTap={childrenArray.length > 1 ? { cursor: 'grabbing' } : undefined}
      >
        {childrenArray.map((child, idx) => (
          <div
            key={idx}
            style={{
              width: '100%',
              flexShrink: 0,
              padding: '0 0.5rem',
              boxSizing: 'border-box',
            }}
          >
            {child}
          </div>
        ))}
      </motion.div>

      {/* Control Bar (Arrows + Dots) */}
      {childrenArray.length > 1 && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '1.25rem',
            marginTop: '1.25rem',
          }}
        >
          {/* Left Arrow */}
          <button
            onClick={handlePrev}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              backgroundColor: 'var(--bg-hover)',
              border: '1px solid var(--border-color)',
              color: 'var(--text-primary)',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
            title="Previous slide"
            aria-label="Previous slide"
          >
            <ChevronLeft size={16} />
          </button>

          {/* Pagination Dots */}
          <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
            {childrenArray.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setIndex(idx)}
                style={{
                  width: idx === validIndex ? '16px' : '5px',
                  height: '5px',
                  borderRadius: '100px',
                  backgroundColor: idx === validIndex ? 'var(--accent)' : 'var(--border-color)',
                  border: 'none',
                  padding: 0,
                  cursor: 'pointer',
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
                title={`Go to slide ${idx + 1}`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          {/* Right Arrow */}
          <button
            onClick={handleNext}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              backgroundColor: 'var(--bg-hover)',
              border: '1px solid var(--border-color)',
              color: 'var(--text-primary)',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
            title="Next slide"
            aria-label="Next slide"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      )}

    </div>
  );
}
