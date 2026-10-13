'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { 
  FolderKanban, 
  Wrench, 
  Award, 
  Briefcase, 
  Plus, 
  ExternalLink, 
  Sparkles, 
  Database, 
  Clock, 
  ArrowUpRight,
  ShieldCheck,
  CheckCircle2,
  FileText
} from 'lucide-react';
import styles from './dashboard.module.css';

interface DashboardStats {
  totalProjects: number;
  publishedProjects: number;
  draftProjects: number;
  totalSkills: number;
  totalExperiences: number;
  totalCertifications: number;
  totalEducation: number;
  isConfigured: boolean;
  recentUpdates: { item: string; type: string; time: string }[];
}

export default function DashboardOverviewPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/stats')
      .then((res) => res.json())
      .then((data) => {
        if (data.data) {
          setStats(data.data);
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      {/* Configuration Status Notice */}
      {stats && !stats.isConfigured && (
        <div className={styles.banner}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <Database size={18} style={{ color: '#00D4FF' }} />
            <div>
              <strong style={{ color: '#ffffff' }}>Local Fallback Mode Active:</strong> Your portfolio is displaying all 9 verified projects and existing data. To persist new edits directly to your Supabase PostgreSQL cloud database, add your credentials to <code>.env.local</code>.
            </div>
          </div>
          <Link href="/dashboard/settings" className={`${styles.btn} ${styles.btnSecondary}`} style={{ fontSize: '0.75rem', padding: '0.4rem 0.8rem' }}>
            Setup Details
          </Link>
        </div>
      )}

      {/* Welcome Header */}
      <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#ffffff' }}>
            Portfolio Control Center
          </h2>
          <p style={{ fontSize: '0.85rem', color: '#94a3b8', marginTop: '0.25rem' }}>
            Live content management system for Ebrahim Amer
          </p>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <Link href="/dashboard/projects" className={`${styles.btn} ${styles.btnPrimary}`}>
            <Plus size={16} />
            <span>Add New Project</span>
          </Link>
          <Link href="/" target="_blank" className={`${styles.btn} ${styles.btnSecondary}`}>
            <ExternalLink size={16} />
            <span>Preview Portfolio</span>
          </Link>
        </div>
      </div>

      {/* Metrics Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '1.25rem',
          marginBottom: '2rem',
        }}
      >
        <div className={styles.card}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <span className={styles.cardSubtitle}>Projects Showcase</span>
              <div style={{ fontSize: '1.85rem', fontWeight: 800, color: '#ffffff', margin: '0.4rem 0' }}>
                {loading ? '...' : stats?.totalProjects || 9}
              </div>
              <div style={{ display: 'flex', gap: '0.5rem', fontSize: '0.75rem' }}>
                <span style={{ color: '#34d399' }}>{stats?.publishedProjects || 9} Published</span>
                <span style={{ color: '#64748b' }}>·</span>
                <span style={{ color: '#fbbf24' }}>{stats?.draftProjects || 0} Drafts</span>
              </div>
            </div>
            <div
              style={{
                padding: '0.75rem',
                borderRadius: '10px',
                background: 'rgba(0, 212, 255, 0.1)',
                color: '#00D4FF',
              }}
            >
              <FolderKanban size={20} />
            </div>
          </div>
        </div>

        <div className={styles.card}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <span className={styles.cardSubtitle}>Technical Skills</span>
              <div style={{ fontSize: '1.85rem', fontWeight: 800, color: '#ffffff', margin: '0.4rem 0' }}>
                {loading ? '...' : stats?.totalSkills || 28}
              </div>
              <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                Frontend, Backend, Languages & Tools
              </span>
            </div>
            <div
              style={{
                padding: '0.75rem',
                borderRadius: '10px',
                background: 'rgba(139, 92, 246, 0.1)',
                color: '#a78bfa',
              }}
            >
              <Wrench size={20} />
            </div>
          </div>
        </div>

        <div className={styles.card}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <span className={styles.cardSubtitle}>Experience & Milestones</span>
              <div style={{ fontSize: '1.85rem', fontWeight: 800, color: '#ffffff', margin: '0.4rem 0' }}>
                {loading ? '...' : (stats?.totalExperiences || 2) + (stats?.totalCertifications || 2)}
              </div>
              <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                {stats?.totalExperiences || 2} Roles · {stats?.totalCertifications || 2} Diplomas
              </span>
            </div>
            <div
              style={{
                padding: '0.75rem',
                borderRadius: '10px',
                background: 'rgba(16, 185, 129, 0.1)',
                color: '#34d399',
              }}
            >
              <Briefcase size={20} />
            </div>
          </div>
        </div>

        <div className={styles.card}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <span className={styles.cardSubtitle}>System Security</span>
              <div style={{ fontSize: '1.85rem', fontWeight: 800, color: '#34d399', margin: '0.4rem 0' }}>
                Active
              </div>
              <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                Row Level Security & Protected API
              </span>
            </div>
            <div
              style={{
                padding: '0.75rem',
                borderRadius: '10px',
                background: 'rgba(16, 185, 129, 0.1)',
                color: '#34d399',
              }}
            >
              <ShieldCheck size={20} />
            </div>
          </div>
        </div>
      </div>

      {/* Two Column Layout: Quick Actions & Recent Updates */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '1.5rem' }}>
        {/* Quick Management Shortcuts */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <div>
              <h3 className={styles.cardTitle}>Quick Content Actions</h3>
              <p className={styles.cardSubtitle}>Direct shortcuts to update website sections</p>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem' }}>
            <Link
              href="/dashboard/projects"
              className={styles.btnSecondary}
              style={{
                padding: '1rem',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                gap: '0.5rem',
                borderRadius: '10px',
                textDecoration: 'none',
              }}
            >
              <FolderKanban size={20} style={{ color: '#00D4FF' }} />
              <strong style={{ fontSize: '0.85rem', color: '#ffffff' }}>Manage Projects</strong>
              <span style={{ fontSize: '0.72rem', color: '#94a3b8' }}>Add, edit, or reorder showcase items</span>
            </Link>

            <Link
              href="/dashboard/hero"
              className={styles.btnSecondary}
              style={{
                padding: '1rem',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                gap: '0.5rem',
                borderRadius: '10px',
                textDecoration: 'none',
              }}
            >
              <Sparkles size={20} style={{ color: '#a78bfa' }} />
              <strong style={{ fontSize: '0.85rem', color: '#ffffff' }}>Hero & Headings</strong>
              <span style={{ fontSize: '0.72rem', color: '#94a3b8' }}>Update headlines, CTAs, profile photo</span>
            </Link>

            <Link
              href="/dashboard/skills"
              className={styles.btnSecondary}
              style={{
                padding: '1rem',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                gap: '0.5rem',
                borderRadius: '10px',
                textDecoration: 'none',
              }}
            >
              <Wrench size={20} style={{ color: '#34d399' }} />
              <strong style={{ fontSize: '0.85rem', color: '#ffffff' }}>Technical Skills</strong>
              <span style={{ fontSize: '0.72rem', color: '#94a3b8' }}>Add tech stack items & AI tools</span>
            </Link>

            <Link
              href="/dashboard/media"
              className={styles.btnSecondary}
              style={{
                padding: '1rem',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                gap: '0.5rem',
                borderRadius: '10px',
                textDecoration: 'none',
              }}
            >
              <FileText size={20} style={{ color: '#fbbf24' }} />
              <strong style={{ fontSize: '0.85rem', color: '#ffffff' }}>Media Library</strong>
              <span style={{ fontSize: '0.72rem', color: '#94a3b8' }}>Upload project images & certificates</span>
            </Link>
          </div>
        </div>

        {/* Live Content Status */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <div>
              <h3 className={styles.cardTitle}>Verified Commercial Platforms</h3>
              <p className={styles.cardSubtitle}>Production case studies active in portfolio</p>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0.85rem 1rem',
                background: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid rgba(255, 255, 255, 0.05)',
                borderRadius: '8px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <CheckCircle2 size={18} style={{ color: '#34d399' }} />
                <div>
                  <strong style={{ fontSize: '0.85rem', color: '#ffffff' }}>Growfet — EdTech Platform</strong>
                  <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>https://www.growfet.com/</div>
                </div>
              </div>
              <span className={`${styles.badge} ${styles.badgeSuccess}`}>Published</span>
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0.85rem 1rem',
                background: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid rgba(255, 255, 255, 0.05)',
                borderRadius: '8px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <CheckCircle2 size={18} style={{ color: '#34d399' }} />
                <div>
                  <strong style={{ fontSize: '0.85rem', color: '#ffffff' }}>Rashet Etr — Luxury Fragrance</strong>
                  <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>https://rashet-etr.growfet.com/</div>
                </div>
              </div>
              <span className={`${styles.badge} ${styles.badgeSuccess}`}>Published</span>
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0.85rem 1rem',
                background: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid rgba(255, 255, 255, 0.05)',
                borderRadius: '8px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <CheckCircle2 size={18} style={{ color: '#34d399' }} />
                <div>
                  <strong style={{ fontSize: '0.85rem', color: '#ffffff' }}>Growfet Tech — Solutions</strong>
                  <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>https://tech.growfet.com/</div>
                </div>
              </div>
              <span className={`${styles.badge} ${styles.badgeSuccess}`}>Published</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
