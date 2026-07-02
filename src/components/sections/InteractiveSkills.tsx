'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { useApp } from '@/context/AppContext';
import { 
  Code2, 
  FileJson, 
  Database, 
  Terminal, 
  Atom, 
  Layers, 
  Globe, 
  Wind, 
  Layout, 
  GitBranch, 
  Binary, 
  Gauge, 
  Cpu, 
  Workflow 
} from 'lucide-react';
import styles from './InteractiveSkills.module.css';

type SkillCategory = 'all' | 'languages' | 'frontend' | 'backend' | 'tools';

interface SkillItem {
  name: string;
  category: Exclude<SkillCategory, 'all'>;
  level: 'Expert' | 'Advanced' | 'Intermediate';
}

const getSkillIcon = (name: string, isLight: boolean) => {
  const n = name.toLowerCase();
  if (n.includes('javascript')) return <Code2 size={15} style={{ color: '#d4a800' }} />;
  if (n.includes('typescript')) return <FileJson size={15} style={{ color: '#3178c6' }} />;
  if (n.includes('react.js') || n.includes('react native')) return <Atom size={15} style={{ color: '#0fb5d0' }} />;
  if (n.includes('redux')) return <Atom size={15} style={{ color: '#764abc' }} />;
  // Next.js: white on dark, black on light
  if (n.includes('next.js')) return <Layers size={15} style={{ color: isLight ? '#111111' : '#ffffff' }} />;
  if (n.includes('html5') || n.includes('css3')) return <Globe size={15} style={{ color: '#e34f26' }} />;
  if (n.includes('tailwind')) return <Wind size={15} style={{ color: '#0ea5e9' }} />;
  if (n.includes('bootstrap')) return <Layout size={15} style={{ color: '#7952b3' }} />;
  if (n.includes('jquery')) return <Code2 size={15} style={{ color: '#0769ad' }} />;
  if (n.includes('laravel')) return <Layers size={15} style={{ color: '#ff2d20' }} />;
  if (n.includes('php')) return <Code2 size={15} style={{ color: '#6272a4' }} />;
  if (n.includes('mysql') || n.includes('sql')) return <Database size={15} style={{ color: '#00758f' }} />;
  if (n.includes('restful')) return <Globe size={15} style={{ color: '#10b981' }} />;
  if (n.includes('mvc') || n.includes('oop')) return <Workflow size={15} style={{ color: '#7c3aed' }} />;
  if (n.includes('git')) return <GitBranch size={15} style={{ color: '#f05032' }} />;
  if (n.includes('claude') || n.includes('antigravity') || n.includes('cursor')) return <Terminal size={15} style={{ color: 'var(--accent)' }} />;
  if (n.includes('data structures') || n.includes('algorithms')) return <Binary size={15} style={{ color: '#e11d48' }} />;
  if (n.includes('performance')) return <Gauge size={15} style={{ color: '#059669' }} />;
  if (n.includes('problem solving')) return <Cpu size={15} style={{ color: '#d97706' }} />;
  if (n.includes('python')) return <Terminal size={15} style={{ color: '#3776ab' }} />;
  if (n.includes('c++')) return <Code2 size={15} style={{ color: '#00599c' }} />;
  if (n.includes('c#')) return <Code2 size={15} style={{ color: '#239120' }} />;
  
  return <Code2 size={15} />;
};

export default function InteractiveSkills() {
  const [activeTab, setActiveTab] = useState<SkillCategory>('all');
  const header = useScrollReveal({ threshold: 0.1 });
  const { theme } = useApp();
  const isLight = theme === 'light';

  const skills: SkillItem[] = [
    // Languages
    { name: 'JavaScript ES6+', category: 'languages', level: 'Expert' },
    { name: 'TypeScript', category: 'languages', level: 'Advanced' },
    { name: 'SQL', category: 'languages', level: 'Advanced' },
    { name: 'Python', category: 'languages', level: 'Intermediate' },
    { name: 'C++', category: 'languages', level: 'Intermediate' },
    { name: 'C#', category: 'languages', level: 'Intermediate' },

    // Frontend
    { name: 'React.js', category: 'frontend', level: 'Expert' },
    { name: 'Next.js', category: 'frontend', level: 'Expert' },
    { name: 'HTML5 & CSS3', category: 'frontend', level: 'Expert' },
    { name: 'Redux Toolkit', category: 'frontend', level: 'Advanced' },
    { name: 'Context API', category: 'frontend', level: 'Expert' },
    { name: 'Tailwind CSS', category: 'frontend', level: 'Expert' },
    { name: 'Bootstrap', category: 'frontend', level: 'Expert' },
    { name: 'React Native', category: 'frontend', level: 'Intermediate' },
    { name: 'jQuery', category: 'frontend', level: 'Advanced' },

    // Backend
    { name: 'Laravel', category: 'backend', level: 'Advanced' },
    { name: 'PHP', category: 'backend', level: 'Advanced' },
    { name: 'MySQL', category: 'backend', level: 'Advanced' },
    { name: 'RESTful APIs', category: 'backend', level: 'Expert' },
    { name: 'MVC Architecture', category: 'backend', level: 'Advanced' },
    { name: 'OOP Concepts', category: 'backend', level: 'Advanced' },

    // Tools & Practices
    { name: 'Git & GitHub', category: 'tools', level: 'Expert' },
    { name: 'Claude Code', category: 'tools', level: 'Expert' },
    { name: 'Antigravity AI', category: 'tools', level: 'Expert' },
    { name: 'Cursor IDE', category: 'tools', level: 'Expert' },
    { name: 'Data Structures', category: 'tools', level: 'Advanced' },
    { name: 'Algorithms', category: 'tools', level: 'Advanced' },
    { name: 'Performance Audit', category: 'tools', level: 'Advanced' },
    { name: 'Problem Solving', category: 'tools', level: 'Expert' },
  ];

  const filteredSkills = activeTab === 'all'
    ? skills
    : skills.filter(s => s.category === activeTab);

  const tabs: { id: SkillCategory; label: string }[] = [
    { id: 'all', label: 'All Skills' },
    { id: 'languages', label: 'Languages' },
    { id: 'frontend', label: 'Frontend UI' },
    { id: 'backend', label: 'Backend & DB' },
    { id: 'tools', label: 'Tools & Practices' },
  ];

  // Split filtered skills into two rows for the dual-row marquee
  const row1Skills = filteredSkills.filter((_, idx) => idx % 2 === 0);
  const row2Skills = filteredSkills.filter((_, idx) => idx % 2 !== 0);

  const prepareMarqueeItems = (items: SkillItem[]) => {
    if (items.length === 0) return [];
    let baseList = [...items];
    // Keep appending to make sure the track spans wider than the screen width
    while (baseList.length < 10) {
      baseList = [...baseList, ...items];
    }
    // Duplicate for seamless 50% transition looping
    return [...baseList, ...baseList];
  };

  const marquee1 = prepareMarqueeItems(row1Skills);
  const marquee2 = prepareMarqueeItems(row2Skills);

  return (
    <section id="skills" className={styles.section}>
      <div className="container">
        
        {/* Section Header */}
        <div
          ref={header.ref}
          className={`${styles.header} reveal reveal-up ${header.isVisible ? 'reveal-visible' : ''}`}
        >
          <div className="pulse-badge">
            <span style={{ color: 'var(--accent)' }}>CAPABILITIES</span>
          </div>
          <h2 className={`${styles.title} text-gradient`}>
            Interactive Skill Map.
          </h2>
          <p className={styles.subtitle}>
            Filter the interactive grid to explore individual languages, libraries, paradigms, and professional development tools.
          </p>

          {/* Tab togglers */}
          <div className={styles.tabs}>
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`${styles.tab} ${activeTab === tab.id ? styles.activeTab : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Dual-Row Marquee */}
        <AnimatePresence mode="wait">
          <motion.div 
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className={styles.marqueeContainer}
          >
            {marquee1.length > 0 && (
              <div className={`${styles.marqueeRow} ${styles.rowLeft}`}>
                {marquee1.map((skill, index) => (
                  <div
                    key={`${skill.name}-r1-${index}`}
                    className={`${styles.skillPill} ${styles[skill.level.toLowerCase()]}`}
                  >
                    <span className={styles.iconWrapper}>{getSkillIcon(skill.name, isLight)}</span>
                    <span className={styles.name}>{skill.name}</span>
                    <span className={styles.dot} />
                  </div>
                ))}
              </div>
            )}

            {marquee2.length > 0 && (
              <div className={`${styles.marqueeRow} ${styles.rowRight}`}>
                {marquee2.map((skill, index) => (
                  <div
                    key={`${skill.name}-r2-${index}`}
                    className={`${styles.skillPill} ${styles[skill.level.toLowerCase()]}`}
                  >
                    <span className={styles.iconWrapper}>{getSkillIcon(skill.name, isLight)}</span>
                    <span className={styles.name}>{skill.name}</span>
                    <span className={styles.dot} />
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
}
