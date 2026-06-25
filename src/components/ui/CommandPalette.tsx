'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '@/context/AppContext';
import { Search, Compass, Terminal, FileText, Mail, GitBranch, Sun, Moon, ArrowRight } from 'lucide-react';
import styles from './CommandPalette.module.css';

// Inline LinkedIn icon
const LinkedinIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

interface CommandItem {
  id: string;
  title: string;
  category: 'Navigation' | 'Actions' | 'Socials';
  icon: React.ReactNode;
  action: () => void;
}

export default function CommandPalette() {
  const { isCommandPaletteOpen, setIsCommandPaletteOpen, toggleTheme, theme } = useApp();
  const [search, setSearch] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Reset indices on open
  useEffect(() => {
    if (isCommandPaletteOpen) {
      setSearch('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isCommandPaletteOpen]);

  const scrollToSection = (id: string) => {
    setIsCommandPaletteOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const openLink = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
    setIsCommandPaletteOpen(false);
  };

  const commands: CommandItem[] = [
    {
      id: 'nav-home',
      title: 'Jump to Home',
      category: 'Navigation',
      icon: <Compass size={18} />,
      action: () => scrollToSection('home'),
    },
    {
      id: 'nav-about',
      title: 'Jump to About Me',
      category: 'Navigation',
      icon: <Compass size={18} />,
      action: () => scrollToSection('about'),
    },
    {
      id: 'nav-expertise',
      title: 'Jump to Expertise',
      category: 'Navigation',
      icon: <Compass size={18} />,
      action: () => scrollToSection('expertise'),
    },
    {
      id: 'nav-projects',
      title: 'Jump to Featured Projects',
      category: 'Navigation',
      icon: <Compass size={18} />,
      action: () => scrollToSection('projects'),
    },
    {
      id: 'nav-experience',
      title: 'Jump to Experience & Education',
      category: 'Navigation',
      icon: <Compass size={18} />,
      action: () => scrollToSection('experience'),
    },
    {
      id: 'nav-skills',
      title: 'Jump to Tech Stack Map',
      category: 'Navigation',
      icon: <Compass size={18} />,
      action: () => scrollToSection('skills'),
    },
    {
      id: 'nav-contact',
      title: 'Jump to Contact Section',
      category: 'Navigation',
      icon: <Compass size={18} />,
      action: () => scrollToSection('contact'),
    },
    {
      id: 'action-theme',
      title: `Toggle Theme (Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode)`,
      category: 'Actions',
      icon: theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />,
      action: () => {
        toggleTheme();
        setIsCommandPaletteOpen(false);
      },
    },
    {
      id: 'action-cv',
      title: 'Download Curriculum Vitae (CV)',
      category: 'Actions',
      icon: <FileText size={18} />,
      action: () => openLink('/Files/Ebrahim_Abdelmonem_Frontend_Developer_CV(1).pdf'),
    },
    {
      id: 'action-email',
      title: 'Send Email (Direct Contact)',
      category: 'Actions',
      icon: <Mail size={18} />,
      action: () => {
        window.location.href = 'mailto:himaamer937@gmail.com';
        setIsCommandPaletteOpen(false);
      },
    },
    {
      id: 'social-github',
      title: 'View GitHub Repositories',
      category: 'Socials',
      icon: <GitBranch size={18} />,
      action: () => openLink('https://github.com/EbrahimAmer207'),
    },
    {
      id: 'social-linkedin',
      title: 'Connect on LinkedIn',
      category: 'Socials',
      icon: <LinkedinIcon />,
      action: () => openLink('https://www.linkedin.com/in/ebrahim-amer0/'),
    },
  ];

  // Filtering
  const filteredCommands = commands.filter((cmd) =>
    cmd.title.toLowerCase().includes(search.toLowerCase()) ||
    cmd.category.toLowerCase().includes(search.toLowerCase())
  );

  // Keyboard navigation inside list
  useEffect(() => {
    if (!isCommandPaletteOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % filteredCommands.length);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filteredCommands.length) % filteredCommands.length);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredCommands[selectedIndex]) {
          filteredCommands[selectedIndex].action();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCommandPaletteOpen, selectedIndex, filteredCommands]);

  // Keep active element in view
  useEffect(() => {
    const activeEl = listRef.current?.querySelector(`.${styles.selected}`);
    if (activeEl) {
      activeEl.scrollIntoView({ block: 'nearest' });
    }
  }, [selectedIndex]);

  return (
    <AnimatePresence>
      {isCommandPaletteOpen && (
        <div className={styles.overlay}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={styles.backdrop}
            onClick={() => setIsCommandPaletteOpen(false)}
          />

          <motion.div
            initial={{ opacity: 0, y: -40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -40, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className={styles.palette}
          >
            <div className={styles.searchWrap}>
              <Search className={styles.searchIcon} size={20} />
              <input
                ref={inputRef}
                type="text"
                placeholder="Type a command or search..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setSelectedIndex(0);
                }}
                className={styles.input}
              />
              <span className={styles.esc}>ESC</span>
            </div>

            <div ref={listRef} className={styles.list}>
              {filteredCommands.length > 0 ? (
                // Group by category
                ['Navigation', 'Actions', 'Socials'].map((cat) => {
                  const items = filteredCommands.filter((c) => c.category === cat);
                  if (items.length === 0) return null;

                  return (
                    <div key={cat} className={styles.group}>
                      <div className={styles.groupTitle}>{cat}</div>
                      {items.map((cmd) => {
                        const globalIndex = filteredCommands.indexOf(cmd);
                        const isSelected = globalIndex === selectedIndex;

                        return (
                          <div
                            key={cmd.id}
                            className={`${styles.item} ${isSelected ? styles.selected : ''}`}
                            onClick={cmd.action}
                            onMouseEnter={() => setSelectedIndex(globalIndex)}
                          >
                            <div className={styles.itemLeft}>
                              <span className={styles.itemIcon}>{cmd.icon}</span>
                              <span className={styles.itemTitle}>{cmd.title}</span>
                            </div>
                            {isSelected && (
                              <motion.span layoutId="arrow" className={styles.itemArrow}>
                                <ArrowRight size={14} />
                              </motion.span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  );
                })
              ) : (
                <div className={styles.noResults}>
                  <Terminal size={24} style={{ marginBottom: '0.5rem', opacity: 0.5 }} />
                  <p>No results found for &ldquo;{search}&rdquo;</p>
                </div>
              )}
            </div>

            <div className={styles.footer}>
              <span>Use <kbd>↑</kbd> <kbd>↓</kbd> to navigate</span>
              <span><kbd>Enter</kbd> to select</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
