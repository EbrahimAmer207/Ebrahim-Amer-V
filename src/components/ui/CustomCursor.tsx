'use client';

import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [cursorType, setCursorType] = useState<'default' | 'explore' | 'link'>('default');

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 250, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Enable HTML cursor hiding class
    document.documentElement.classList.add('custom-cursor-enabled');

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeaveWindow = () => {
      setIsVisible(false);
    };

    const handleMouseEnterWindow = () => {
      setIsVisible(true);
    };

    window.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseleave', handleMouseLeaveWindow);
    document.addEventListener('mouseenter', handleMouseEnterWindow);

    return () => {
      document.documentElement.classList.remove('custom-cursor-enabled');
      window.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseleave', handleMouseLeaveWindow);
      document.removeEventListener('mouseenter', handleMouseEnterWindow);
    };
  }, [cursorX, cursorY, isVisible]);

  useEffect(() => {
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const hoverType = target.closest('[data-cursor]')?.getAttribute('data-cursor');
      
      if (hoverType === 'explore') {
        setCursorType('explore');
      } else if (hoverType === 'link' || target.tagName === 'A' || target.tagName === 'BUTTON' || target.closest('a') || target.closest('button')) {
        setCursorType('link');
      } else {
        setCursorType('default');
      }
    };

    window.addEventListener('mouseover', handleMouseOver);
    return () => window.removeEventListener('mouseover', handleMouseOver);
  }, []);

  if (typeof window === 'undefined') return null;

  const getSize = () => {
    if (cursorType === 'explore') return 80;
    if (cursorType === 'link') return 40;
    return 20;
  };

  const size = getSize();

  return (
    <motion.div
      style={{
        position: 'fixed',
        left: 0,
        top: 0,
        width: size,
        height: size,
        borderRadius: '50%',
        backgroundColor: cursorType === 'explore' ? 'var(--accent)' : 'transparent',
        border: cursorType === 'explore' ? 'none' : '1px solid var(--accent)',
        pointerEvents: 'none',
        zIndex: 9999,
        x: cursorXSpring,
        y: cursorYSpring,
        translateX: '-50%',
        translateY: '-50%',
        display: isVisible ? 'flex' : 'none',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#050505',
        fontSize: '0.75rem',
        fontWeight: 'bold',
        letterSpacing: '0.05em',
        mixBlendMode: cursorType === 'link' ? 'difference' : 'normal',
      }}
      animate={{
        scale: isVisible ? 1 : 0,
        backgroundColor: cursorType === 'explore' ? 'rgba(0, 212, 255, 0.9)' : 'rgba(0, 212, 255, 0)',
      }}
      transition={{ type: 'tween', ease: 'backOut', duration: 0.2 }}
    >
      {cursorType === 'explore' && (
        <motion.span
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          style={{ color: '#000000', pointerEvents: 'none' }}
        >
          VIEW
        </motion.span>
      )}
    </motion.div>
  );
}
