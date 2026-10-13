import React from 'react';
import { Card } from '../ui/Card';
import { Briefcase, GraduationCap, Calendar, ArrowUpRight } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import MobileCarousel from '../ui/MobileCarousel';
import { ExperienceRecord } from '@/lib/supabase/types';
import styles from './Experience.module.css';

export interface ExperienceProps {
  experiences?: ExperienceRecord[];
}

export default function Experience({ experiences }: ExperienceProps = {}) {
  const { ref: headerRef, isVisible: headerIsVisible } = useScrollReveal({ threshold: 0.1 });
  const { ref: leftRef, isVisible: leftIsVisible } = useScrollReveal({ threshold: 0.05 });

  const defaultExperiences = [
    {
      title: 'Egypt Digital Pioneers Initiative (DEPI)',
      role: 'Frontend Development Fellow',
      date: 'Jul 2025 - Dec 2025',
      desc: 'Developed scalable and responsive web applications using React.js within an industry-simulated environment. Collaborated using Git and Agile methodologies to deliver optimized components, integrated APIs, and participated in regular peer code reviews.',
      certUrl: '/Files/Ebrahim Abdelmonem Ebrahim.pdf',
    },
    {
      title: 'NTI Creativa Initiative',
      role: 'Frontend Trainee',
      date: 'Aug 2025 - Oct 2025',
      desc: 'Focused on creating responsive, semantic HTML5, CSS3, and JavaScript layouts. Worked on cross-browser compatibility, DOM manipulation, and modular UI layouts under professional mentoring guidelines.',
      certUrl: '/Files/Ebrahim Abdelmonem Ebrahim Ebrahim.pdf',
    },
  ];

  const defaultEducation = [
    {
      title: 'Mansoura University',
      degree: 'Bachelor of Computer Science',
      date: '2022 - 2026 (Expected)',
      desc: 'Studying core algorithms, data structures, object-oriented programming (OOP), system design, and database systems.',
    },
    {
      title: 'React.js Advanced Diploma',
      institution: 'T-Square Academy',
      date: 'Jul 2024 - Nov 2024',
      desc: 'Advanced training in React concepts: Hook lifecycles, Context APIs, React Router, client-side routing, and global state management using Redux Toolkit.',
    },
    {
      title: 'Laravel Backend Diploma',
      institution: 'T-Square Academy',
      date: 'Nov 2024 - Mar 2025',
      desc: 'Focused on MVC architecture, database migrations, model relationships, routing, authentication, and RESTful API development.',
    },
  ];

  const activeExperiences = experiences && experiences.filter(e => e.type === 'experience').length > 0
    ? experiences.filter(e => e.type === 'experience').map(e => ({
        title: e.title,
        role: e.role_or_degree,
        date: e.date_range,
        desc: e.description,
        certUrl: e.cert_url,
      }))
    : defaultExperiences;

  const activeEducation = experiences && experiences.filter(e => e.type !== 'experience').length > 0
    ? experiences.filter(e => e.type !== 'experience').map(e => ({
        title: e.title,
        degree: e.type === 'education' ? e.role_or_degree : undefined,
        institution: e.institution,
        date: e.date_range,
        desc: e.description,
        certUrl: e.cert_url,
      }))
    : defaultEducation;

  return (
    <section id="experience" className={styles.section}>
      <div className="container">

        {/* Section Header */}
        <div
          ref={headerRef}
          className={`${styles.header} reveal reveal-up ${headerIsVisible ? 'reveal-visible' : ''}`}
        >
          <div className="pulse-badge">
            <span style={{ color: 'var(--accent)', fontFamily: 'var(--font-mono)' }}>05 / MILESTONES &amp; JOURNEY</span>
          </div>
          <h2 className={`${styles.title} text-gradient`}>Timeline of Development.</h2>
          <p className={styles.subtitle}>
            A chronological summary of my training initiatives, academic education, and specialized software engineering diplomas.
          </p>
        </div>

        {/* Timeline Grid – turns into a carousel on mobile */}
        <div ref={leftRef}>
          <MobileCarousel desktopGridClass={styles.grid}>
            
            {/* Left Column: Experience */}
            <div className={styles.column}>
              <div className={`${styles.columnHeader} reveal reveal-left ${leftIsVisible ? 'reveal-visible' : ''}`}>
                <Briefcase size={18} className={styles.columnIcon} />
                <h3>Professional Training</h3>
              </div>
              <div className={styles.timeline}>
                <div className={styles.timelineLine} />
                {activeExperiences.map((exp, idx) => (
                  <div
                    key={exp.title}
                    className={`${styles.timelineNode} reveal reveal-left reveal-delay-${idx + 1} ${leftIsVisible ? 'reveal-visible' : ''}`}
                  >
                    <div className={styles.timelinePoint} />
                    <Card className={styles.timelineCard}>
                      <div className={styles.cardHeader}>
                        <span className={styles.date}>
                          <Calendar size={12} style={{ marginRight: '0.25rem', display: 'inline-block' }} /> {exp.date}
                        </span>
                        <h4 className={styles.nodeTitle}>{exp.title}</h4>
                        <span className={styles.nodeSub}>{exp.role}</span>
                      </div>
                      <p className={styles.nodeDesc}>{exp.desc}</p>
                      {exp.certUrl && (
                        <a href={exp.certUrl} target="_blank" rel="noopener noreferrer" className={styles.certLink}>
                          View Certificate <ArrowUpRight size={14} />
                        </a>
                      )}
                    </Card>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Education */}
            <div className={styles.column}>
              <div className={`${styles.columnHeader} reveal reveal-right ${leftIsVisible ? 'reveal-visible' : ''}`}>
                <GraduationCap size={20} className={styles.columnIcon} />
                <h3>Education &amp; Credentials</h3>
              </div>
              <div className={styles.timeline}>
                <div className={styles.timelineLine} />
                {activeEducation.map((edu, idx) => (
                  <div
                    key={edu.title}
                    className={`${styles.timelineNode} reveal reveal-right reveal-delay-${idx + 1} ${leftIsVisible ? 'reveal-visible' : ''}`}
                  >
                    <div className={styles.timelinePoint} />
                    <Card className={styles.timelineCard}>
                      <div className={styles.cardHeader}>
                        <span className={styles.date}>
                          <Calendar size={12} style={{ marginRight: '0.25rem', display: 'inline-block' }} /> {edu.date}
                        </span>
                        <h4 className={styles.nodeTitle}>{edu.title}</h4>
                        <span className={styles.nodeSub}>{edu.degree || edu.institution}</span>
                      </div>
                      <p className={styles.nodeDesc}>{edu.desc}</p>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
          </MobileCarousel>
        </div>
      </div>
    </section>
  );
}
