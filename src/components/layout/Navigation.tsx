'use client';

import React, { useState, useEffect } from 'react';
import { useApp } from '@/context/AppContext';
import { Sun, Moon, Command, Sparkles } from 'lucide-react';
import styles from './Navigation.module.css';

export default function Navigation() {
  const { toggleTheme, theme, toggleCommandPalette } = useApp();
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Track active section on scroll
      const sections = ['home', 'expertise', 'about', 'projects', 'experience', 'contact'];
      const scrollPos = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
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
    { id: 'expertise', label: 'Expertise' },
    { id: 'about', label: 'About' },
    { id: 'projects', label: 'Projects' },
    { id: 'experience', label: 'Experience' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
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
        </div>
      </div>
    </nav>
  );
}
