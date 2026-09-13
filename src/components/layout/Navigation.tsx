'use client';

import React, { useState, useEffect } from 'react';
import { useApp } from '@/context/AppContext';
import { Sun, Moon, Command, Sparkles } from 'lucide-react';
import MobileNavigation from './MobileNavigation';
import styles from './Navigation.module.css';

export default function Navigation() {
  const { toggleTheme, theme, toggleCommandPalette } = useApp();
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Track active section on scroll using exact page section order
      const sections = ['home', 'projects', 'expertise', 'about', 'experience', 'contact'];
      const scrollPos = window.scrollY + 250;

      for (let i = sections.length - 1; i >= 0; i--) {
        const sectionId = sections[i];
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          if (scrollPos >= top) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'projects', label: 'Projects' },
    { id: 'expertise', label: 'Expertise' },
    { id: 'about', label: 'About' },
    { id: 'experience', label: 'Experience' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <>
      <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
        <div className={styles.container}>
          <div className={styles.logo} onClick={() => scrollTo('home')}>
            <Sparkles size={16} className={styles.logoIcon} />
            <span className={styles.logoText}>EBRAHIM AMER</span>
          </div>

          <ul className={styles.menu}>
            {navItems.map((item) => (
              <li
                key={item.id}
                className={`${styles.menuItem} ${activeSection === item.id ? styles.active : ''}`}
                onClick={() => scrollTo(item.id)}
              >
                {item.label}
                {activeSection === item.id && (
                  <span className={styles.indicator} />
                )}
              </li>
            ))}
          </ul>

          <div className={styles.actions}>
            <button 
              className={styles.cmdBtn} 
              onClick={toggleCommandPalette}
              title="Open Command Palette (Ctrl+K)"
            >
              <Command size={14} />
              <span>K</span>
            </button>

            <button 
              className={styles.themeToggle} 
              onClick={toggleTheme}
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {/* Custom Mobile Menu Trigger */}
            <button 
              className={styles.mobileTriggerBtn} 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              title={mobileMenuOpen ? "Close Navigation Menu" : "Open Navigation Menu"}
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              <span className={styles.triggerLabel}>{mobileMenuOpen ? 'CLOSE' : 'MENU'}</span>
              <span className={styles.triggerIconWrap}>
                <span className={`${styles.triggerBar} ${mobileMenuOpen ? styles.barTopOpen : ''}`} />
                <span className={`${styles.triggerBar} ${mobileMenuOpen ? styles.barBottomOpen : ''}`} />
              </span>
            </button>
          </div>
        </div>
      </nav>

      {/* Redesigned Fullscreen Editorial Mobile Navigation Overlay */}
      <MobileNavigation
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        activeSection={activeSection}
        onSelectSection={scrollTo}
        navItems={navItems}
      />
    </>
  );
}

