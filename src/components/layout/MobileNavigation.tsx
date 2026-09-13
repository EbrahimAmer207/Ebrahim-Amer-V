'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { useApp } from '@/context/AppContext';
import { 
  Sparkles, 
  Sun, 
  Moon, 
  Command, 
  X, 
  ArrowUpRight, 
  Check, 
  Copy, 
  GitBranch, 
  Mail,
  ArrowRight
} from 'lucide-react';
import styles from './MobileNavigation.module.css';

interface NavItem {
  id: string;
  label: string;
}

interface MobileNavigationProps {
  isOpen: boolean;
  onClose: () => void;
  activeSection: string;
  onSelectSection: (id: string) => void;
  navItems: NavItem[];
}

const LinkedinIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const overlayVariants: Variants = {
  hidden: {
    opacity: 0,
    y: '-100%',
    transition: {
      duration: 0.35,
      ease: [0.76, 0, 0.24, 1] as [number, number, number, number],
    },
  },
  visible: {
    opacity: 1,
    y: '0%',
    transition: {
      duration: 0.45,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      staggerChildren: 0.05,
      delayChildren: 0.08,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  },
};

export default function MobileNavigation({
  isOpen,
  onClose,
  activeSection,
  onSelectSection,
  navItems,
}: MobileNavigationProps) {
  const { theme, toggleTheme, toggleCommandPalette } = useApp();
  const [copiedEmail, setCopiedEmail] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  const email = 'himaamer937@gmail.com';

  // Prevent background body scroll when drawer is open & handle Escape key
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose();
        }
      };

      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isOpen, onClose]);

  const handleCopyEmail = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(email);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2200);
    } else {
      window.location.href = `mailto:${email}`;
    }
  };

  const handleNavItemClick = (id: string) => {
    onSelectSection(id);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={modalRef}
          className={styles.drawerOverlay}
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={overlayVariants}
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation Menu"
        >
          {/* Subtle Ambient Background Mesh */}
          <div className={styles.ambientGlow} />
          <div className={styles.ambientGlowBottom} />
          <div className="bg-grid" style={{ opacity: 0.15 }} />

          <div className={styles.container}>
            
            {/* Header Bar */}
            <motion.header className={styles.drawerHeader} variants={itemVariants}>
              <div 
                className={styles.logo} 
                onClick={() => handleNavItemClick('home')}
                title="Go to home"
              >
                <Sparkles size={16} className={styles.logoIcon} />
                <span className={styles.logoText}>EBRAHIM AMER</span>
              </div>

              <div className={styles.headerActions}>
                <button
                  className={styles.actionBtn}
                  onClick={toggleCommandPalette}
                  title="Open Command Palette"
                  aria-label="Command Palette"
                >
                  <Command size={13} />
                  <span>K</span>
                </button>

                <button
                  className={styles.actionBtn}
                  onClick={toggleTheme}
                  title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                  aria-label="Toggle Theme"
                >
                  {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
                </button>

                <button
                  className={styles.closeBtn}
                  onClick={onClose}
                  aria-label="Close navigation menu"
                  title="Close Menu"
                >
                  <X size={15} />
                  <span>CLOSE</span>
                </button>
              </div>
            </motion.header>

            {/* Editorial Main Navigation Body */}
            <div className={styles.drawerBody}>
              <motion.ul className={styles.navList} variants={itemVariants}>
                {navItems.map((item, idx) => {
                  const numStr = String(idx + 1).padStart(2, '0');
                  const isActive = activeSection === item.id;

                  return (
                    <motion.li
                      key={item.id}
                      className={`${styles.navItem} ${isActive ? styles.activeItem : ''}`}
                      variants={itemVariants}
                    >
                      <div
                        className={styles.navLink}
                        onClick={() => handleNavItemClick(item.id)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            handleNavItemClick(item.id);
                          }
                        }}
                      >
                        <span className={styles.navNumber}>{numStr}</span>
                        <span className={styles.navLabel}>{item.label}</span>
                        {isActive && (
                          <span className={styles.activeIndicator}>
                            <ArrowUpRight size={16} />
                          </span>
                        )}
                      </div>
                    </motion.li>
                  );
                })}
              </motion.ul>

              {/* Brand & Personal Metadata Section */}
              <motion.div className={styles.metaSection} variants={itemVariants}>
                <div className={styles.availabilityBadge}>
                  <span className={styles.statusDot} />
                  <span>AVAILABLE FOR NEW PROJECTS</span>
                </div>

                <div className={styles.brandDetails}>
                  <span className={styles.brandRole}>Front-End Engineer</span>
                  <span className={styles.brandLocation}>
                    Computer Science @ Mansoura University • Mansoura, Egypt
                  </span>
                </div>
              </motion.div>
            </div>

            {/* Footer Contact & Social Actions */}
            <motion.footer className={styles.drawerFooter} variants={itemVariants}>
              <div className={styles.contactActions}>
                <button
                  className={styles.primaryCta}
                  onClick={() => handleNavItemClick('contact')}
                >
                  <span>Let&apos;s Work Together</span>
                  <ArrowRight size={15} />
                </button>

                <button
                  className={styles.copyEmailBtn}
                  onClick={handleCopyEmail}
                  title="Copy email address to clipboard"
                >
                  {copiedEmail ? <Check size={14} style={{ color: '#10b981' }} /> : <Copy size={14} />}
                  <span>{copiedEmail ? 'Email Copied ✓' : 'Copy Email'}</span>
                </button>
              </div>

              <div className={styles.socialRow}>
                <a
                  href="https://github.com/EbrahimAmer207"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                >
                  <GitBranch size={14} />
                  <span>GitHub</span>
                </a>

                <a
                  href="https://www.linkedin.com/in/ebrahim-amer0/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                >
                  <LinkedinIcon />
                  <span>LinkedIn</span>
                </a>

                <a
                  href={`mailto:${email}`}
                  className={styles.socialLink}
                >
                  <Mail size={14} />
                  <span>Mail</span>
                </a>
              </div>
            </motion.footer>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
