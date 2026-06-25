'use client';

import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import styles from './Button.module.css';

// Magnetic wrapper component
export function Magnetic({ children, strength = 0.3 }: { children: React.ReactElement, strength?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const distanceX = clientX - centerX;
    const distanceY = clientY - centerY;

    x.set(distanceX * strength);
    y.set(distanceY * strength);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY, display: 'inline-block' }}
    >
      {children}
    </motion.div>
  );
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent' | 'minimal';
  children: React.ReactNode;
  magnetic?: boolean;
}

export function Button({ variant = 'primary', children, magnetic = true, className = '', ...props }: ButtonProps) {
  const buttonEl = (
    <button className={`${styles.button} ${styles[variant]} ${className}`} {...props}>
      <span className={styles.label}>{children}</span>
      <span className={styles.overlay} />
    </button>
  );

  if (magnetic) {
    return <Magnetic>{buttonEl}</Magnetic>;
  }

  return buttonEl;
}
