'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollReveal } from '@/hooks/useScrollReveal';
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
  Workflow,
  Sparkles,
  ShieldCheck,
  Zap
} from 'lucide-react';
import { SkillRecord, AIToolRecord } from '@/lib/supabase/types';
import MobileCarousel from '../ui/MobileCarousel';
import styles from './InteractiveSkills.module.css';

type SkillCategory = 'all' | 'languages' | 'frontend' | 'backend' | 'tools';

interface SkillItem {
  name: string;
  category: Exclude<SkillCategory, 'all'>;
  level: 'Expert' | 'Advanced' | 'Intermediate';
}

interface AIToolItem {
  name: string;
  tag: string;
  summary: string;
  details: string;
  icon: React.ReactNode;
}

const levelClasses: Record<string, string> = {
  expert: styles.expert || '',
  advanced: styles.advanced || '',
  intermediate: styles.intermediate || '',
};

const getSkillIcon = (name: string) => {
  const n = name.toLowerCase();
  if (n.includes('javascript')) return <Code2 size={15} style={{ color: '#d4a800' }} />;
  if (n.includes('typescript')) return <FileJson size={15} style={{ color: '#3178c6' }} />;
  if (n.includes('react.js') || n.includes('react 19') || n.includes('react native')) return <Atom size={15} style={{ color: '#0fb5d0' }} />;
  if (n.includes('redux')) return <Atom size={15} style={{ color: '#764abc' }} />;
  if (n.includes('next.js')) return <Layers size={15} style={{ color: 'var(--text-primary)' }} />;
  if (n.includes('html5') || n.includes('css3')) return <Globe size={15} style={{ color: '#e34f26' }} />;
  if (n.includes('tailwind')) return <Wind size={15} style={{ color: '#0ea5e9' }} />;
  if (n.includes('bootstrap')) return <Layout size={15} style={{ color: '#7952b3' }} />;
  if (n.includes('jquery')) return <Code2 size={15} style={{ color: '#0769ad' }} />;
  if (n.includes('laravel')) return <Layers size={15} style={{ color: '#ff2d20' }} />;
  if (n.includes('php')) return <Code2 size={15} style={{ color: '#6272a4' }} />;
  if (n.includes('sqlite') || n.includes('mysql') || n.includes('sql')) return <Database size={15} style={{ color: '#00758f' }} />;
  if (n.includes('restful')) return <Globe size={15} style={{ color: '#10b981' }} />;
  if (n.includes('mvc') || n.includes('oop')) return <Workflow size={15} style={{ color: '#7c3aed' }} />;
  if (n.includes('git')) return <GitBranch size={15} style={{ color: '#f05032' }} />;
  if (n.includes('antigravity') || n.includes('chatgpt')) return <Terminal size={15} style={{ color: 'var(--accent)' }} />;
  if (n.includes('tanstack')) return <Layers size={15} style={{ color: '#ff4154' }} />;
  if (n.includes('vite')) return <Zap size={15} style={{ color: '#bd34fe' }} />;
  if (n.includes('data structures') || n.includes('algorithms')) return <Binary size={15} style={{ color: '#e11d48' }} />;
  if (n.includes('performance')) return <Gauge size={15} style={{ color: '#059669' }} />;
  if (n.includes('problem solving')) return <Cpu size={15} style={{ color: '#d97706' }} />;
  if (n.includes('python')) return <Terminal size={15} style={{ color: '#3776ab' }} />;
  if (n.includes('c++')) return <Code2 size={15} style={{ color: '#00599c' }} />;
  if (n.includes('c#')) return <Code2 size={15} style={{ color: '#239120' }} />;
  
  return <Code2 size={15} />;
};

const getAIIcon = (iconName: string) => {
  const n = (iconName || '').toLowerCase();
  if (n.includes('terminal')) return <Terminal size={18} />;
  if (n.includes('sparkles') || n.includes('chat')) return <Sparkles size={18} />;
  if (n.includes('workflow')) return <Workflow size={18} />;
  if (n.includes('binary') || n.includes('prompt')) return <Binary size={18} />;
  if (n.includes('shield') || n.includes('debug')) return <ShieldCheck size={18} />;
  return <Sparkles size={18} />;
};

const defaultAiToolsList: AIToolItem[] = [
  {
    name: 'Google Antigravity',
    tag: 'Workflow & Coding',
    summary: 'AI-assisted coding and development workflows.',
    details: 'Leveraging agentic development workflows, project-wide reasoning, and terminal verification while keeping software architecture and system boundaries human-driven.',
    icon: <Terminal size={18} />,
  },
  {
    name: 'ChatGPT',
    tag: 'Problem-Solving & Analysis',
    summary: 'Technical problem-solving, code explanations, debugging assistance, and development planning.',
    details: 'Evaluating architectural trade-offs, accelerating complex API explorations, and structuring implementation approaches before committing production code.',
    icon: <Sparkles size={18} />,
  },
  {
    name: 'AI-Assisted Development',
    tag: 'Implementation Workflow',
    summary: 'Supporting implementation, refactoring, and development workflows with AI tools.',
    details: 'Accelerating component scaffolding, modular refactoring routines, and repetitive boilerplate generation without compromising code clarity or structure.',
    icon: <Workflow size={18} />,
  },
  {
    name: 'Prompt Engineering',
    tag: 'Context & Precision',
    summary: 'Writing structured prompts for relevant and actionable development outputs.',
    details: 'Formulating clear technical constraints, supplying localized codebase context, and guiding AI outputs toward deterministic, type-safe implementations.',
    icon: <Binary size={18} />,
  },
  {
    name: 'AI-Powered Debugging',
    tag: 'Root-Cause Analysis',
    summary: 'Investigating errors, evaluating potential fixes, and understanding root causes.',
    details: 'Diagnosing tricky stack traces, analyzing edge cases in asynchronous state, and evaluating remediation approaches before committing fixes.',
    icon: <ShieldCheck size={18} />,
  },
];

const defaultSkills: SkillItem[] = [
  // Languages
  { name: 'JavaScript ES6+', category: 'languages', level: 'Expert' },
  { name: 'TypeScript', category: 'languages', level: 'Advanced' },
  { name: 'SQL', category: 'languages', level: 'Advanced' },
  { name: 'Python', category: 'languages', level: 'Intermediate' },
  { name: 'C++', category: 'languages', level: 'Intermediate' },
  { name: 'C#', category: 'languages', level: 'Intermediate' },

  // Frontend
  { name: 'React.js (v19)', category: 'frontend', level: 'Expert' },
  { name: 'Next.js (App Router)', category: 'frontend', level: 'Expert' },
  { name: 'HTML5 & CSS3', category: 'frontend', level: 'Expert' },
  { name: 'TanStack Query', category: 'frontend', level: 'Advanced' },
  { name: 'Redux Toolkit', category: 'frontend', level: 'Advanced' },
  { name: 'Context API', category: 'frontend', level: 'Expert' },
  { name: 'Tailwind CSS', category: 'frontend', level: 'Expert' },
  { name: 'Bootstrap 5', category: 'frontend', level: 'Expert' },
  { name: 'Vite', category: 'frontend', level: 'Expert' },

  // Backend & Persistence
  { name: 'SQLite WASM', category: 'backend', level: 'Advanced' },
  { name: 'RESTful APIs', category: 'backend', level: 'Expert' },
  { name: 'MySQL', category: 'backend', level: 'Advanced' },
  { name: 'Laravel', category: 'backend', level: 'Advanced' },
  { name: 'PHP', category: 'backend', level: 'Advanced' },
  { name: 'MVC Architecture', category: 'backend', level: 'Advanced' },
  { name: 'OOP Concepts', category: 'backend', level: 'Advanced' },

  // Tools & Engineering Practices
  { name: 'Git & GitHub', category: 'tools', level: 'Expert' },
  { name: 'Google Antigravity', category: 'tools', level: 'Expert' },
  { name: 'ChatGPT', category: 'tools', level: 'Expert' },
  { name: 'Performance Audit', category: 'tools', level: 'Advanced' },
  { name: 'Problem Solving', category: 'tools', level: 'Expert' },
  { name: 'Data Structures', category: 'tools', level: 'Advanced' },
  { name: 'Algorithms', category: 'tools', level: 'Advanced' },
];

interface InteractiveSkillsProps {
  skills?: SkillRecord[];
  aiTools?: AIToolRecord[];
}

export default function InteractiveSkills({ skills: dbSkills, aiTools: dbAiTools }: InteractiveSkillsProps = {}) {
  const [activeTab, setActiveTab] = useState<SkillCategory>('all');
  const { ref: headerRef, isVisible: headerIsVisible } = useScrollReveal({ threshold: 0.1 });
  const { ref: aiRef, isVisible: aiIsVisible } = useScrollReveal({ threshold: 0.05 });

  const activeSkills: SkillItem[] = (dbSkills && dbSkills.length > 0)
    ? dbSkills.map(s => ({
        name: s.name,
        category: (s.category === 'ai' ? 'tools' : s.category) as Exclude<SkillCategory, 'all'>,
        level: s.level,
      }))
    : defaultSkills;

  const activeAiTools: AIToolItem[] = (dbAiTools && dbAiTools.length > 0)
    ? dbAiTools.map(t => ({
        name: t.name,
        tag: t.tag,
        summary: t.summary,
        details: t.details,
        icon: getAIIcon(t.icon_name),
      }))
    : defaultAiToolsList;

  const filteredSkills = activeTab === 'all'
    ? activeSkills
    : activeSkills.filter(s => s.category === activeTab);

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
    while (baseList.length < 10) {
      baseList = [...baseList, ...items];
    }
    return [...baseList, ...baseList];
  };

  const marquee1 = prepareMarqueeItems(row1Skills);
  const marquee2 = prepareMarqueeItems(row2Skills);

  return (
    <section id="skills" className={styles.section}>
      <div className="container">
        
        {/* Section Header */}
        <div
          ref={headerRef}
          className={`${styles.header} reveal reveal-up ${headerIsVisible ? 'reveal-visible' : ''}`}
        >
          <div className="pulse-badge">
            <span style={{ color: 'var(--accent)', fontFamily: 'var(--font-mono)' }}>06 / TECH STACK &amp; CAPABILITIES</span>
          </div>
          <h2 className={`${styles.title} text-gradient`}>
            Interactive Skill Map.
          </h2>
          <p className={styles.subtitle}>
            Explore core programming languages, frontend framework specializations, state architectures, and engineering tools centered on React, Next.js, and TypeScript.
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
                {marquee1.map((skill, index) => {
                  const levelClass = levelClasses[skill.level.toLowerCase()] || '';
                  return (
                    <div
                      key={`${skill.name}-r1-${index}`}
                      className={`${styles.skillPill} ${levelClass}`}
                    >
                      <span className={styles.iconWrapper}>{getSkillIcon(skill.name)}</span>
                      <span className={styles.name}>{skill.name}</span>
                      <span className={styles.dot} />
                    </div>
                  );
                })}
              </div>
            )}

            {marquee2.length > 0 && (
              <div className={`${styles.marqueeRow} ${styles.rowRight}`}>
                {marquee2.map((skill, index) => {
                  const levelClass = levelClasses[skill.level.toLowerCase()] || '';
                  return (
                    <div
                      key={`${skill.name}-r2-${index}`}
                      className={`${styles.skillPill} ${levelClass}`}
                    >
                      <span className={styles.iconWrapper}>{getSkillIcon(skill.name)}</span>
                      <span className={styles.name}>{skill.name}</span>
                      <span className={styles.dot} />
                    </div>
                  );
                })}
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* ───────────────────────────────────────────────────────────
            AI Tools & AI-Assisted Development Subsection
            ─────────────────────────────────────────────────────────── */}
        <div
          ref={aiRef}
          className={`${styles.aiSection} reveal reveal-up ${aiIsVisible ? 'reveal-visible' : ''}`}
        >
          <div className={styles.aiHeader}>
            <div className="pulse-badge">
              <span style={{ color: 'var(--accent)', fontFamily: 'var(--font-mono)' }}>06.1 / AUGMENTED WORKFLOW</span>
            </div>
            <h3 className={`${styles.aiTitle} text-gradient`}>
              AI Tools &amp; AI-Assisted Development
            </h3>
            <p className={styles.aiDesc}>
              Using AI-powered tools to support development workflows, investigate technical issues, explore implementation approaches, and improve productivity while maintaining control over architecture, code quality, and final implementation decisions.
            </p>
            <div className={styles.aiNotice}>
              <span className={styles.aiNoticeStrong}>Engineering Principle:</span>
              <span>AI serves as an accelerator — architectural structure, code hygiene, and deployment verification remain fully developer-guided.</span>
            </div>
          </div>

          <MobileCarousel desktopGridClass={styles.aiGrid} autoplay={false}>
            {activeAiTools.map((tool, idx) => (
              <div
                key={tool.name}
                className={`${styles.aiCard} reveal reveal-up reveal-delay-${(idx % 3) + 1} ${aiIsVisible ? 'reveal-visible' : ''}`}
                style={{ height: '100%' }}
              >
                <div className={styles.aiCardHeader}>
                  <div className={styles.aiCardIcon}>
                    {tool.icon}
                  </div>
                  <span className={styles.aiCardTag}>{tool.tag}</span>
                </div>
                <h4 className={styles.aiCardName}>{tool.name}</h4>
                <p className={styles.aiCardSummary}>{tool.summary}</p>
                <p className={styles.aiCardDetails}>{tool.details}</p>
              </div>
            ))}
          </MobileCarousel>
        </div>

      </div>
    </section>
  );
}
