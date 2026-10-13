'use client';

import React, { useState, useEffect } from 'react';
import { Settings, Save, Check, AlertCircle, Database, Shield, Globe } from 'lucide-react';
import { SiteSettingsRecord } from '@/lib/supabase/types';
import styles from '../dashboard.module.css';

export default function SettingsManagementPage() {
  const [settings, setSettings] = useState<SiteSettingsRecord | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Form State
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');
  const [linkedinUrl, setLinkedinUrl] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  const [siteTitle, setSiteTitle] = useState('');
  const [metaDescription, setMetaDescription] = useState('');

  const fetchSettings = async () => {
    try {
      const res = await fetch('/api/admin/settings');
      const json = await res.json();
      if (json.data) {
        setSettings(json.data);
        setEmail(json.data.email || '');
        setPhone(json.data.phone || '');
        setLocation(json.data.location || '');
        setLinkedinUrl(json.data.linkedin_url || '');
        setGithubUrl(json.data.github_url || '');
        setSiteTitle(json.data.site_title || '');
        setMetaDescription(json.data.meta_description || '');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setStatusMsg(null);

    const payload = {
      email,
      phone,
      location,
      linkedin_url: linkedinUrl,
      github_url: githubUrl,
      site_title: siteTitle,
      meta_description: metaDescription,
    };

    try {
      const res = await fetch('/api/admin/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.message || 'Failed to save');

      setStatusMsg({ type: 'success', text: 'Site settings and SEO metadata saved successfully!' });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Error saving settings';
      setStatusMsg({ type: 'error', text: msg });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div style={{ padding: '3rem', textAlign: 'center', color: '#94a3b8' }}>Loading site settings...</div>;
  }

  return (
    <div style={{ maxWidth: '900px' }}>
      <div style={{ marginBottom: '1.75rem' }}>
        <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#ffffff' }}>Global Settings &amp; SEO Metadata</h2>
        <p style={{ fontSize: '0.82rem', color: '#94a3b8' }}>
          Manage global contact information, social links, search engine optimization tags, and Supabase integration
        </p>
      </div>

      {statusMsg && (
        <div
          style={{
            padding: '0.85rem 1.25rem',
            borderRadius: '8px',
            marginBottom: '1.5rem',
            fontSize: '0.82rem',
            background: statusMsg.type === 'success' ? 'rgba(16, 185, 129, 0.12)' : 'rgba(239, 68, 68, 0.12)',
            border: statusMsg.type === 'success' ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid rgba(239, 68, 68, 0.3)',
            color: statusMsg.type === 'success' ? '#34d399' : '#fca5a5',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}
        >
          {statusMsg.type === 'success' ? <Check size={16} /> : <AlertCircle size={16} />}
          <span>{statusMsg.text}</span>
        </div>
      )}

      <form onSubmit={handleSave}>
        {/* Contact Information */}
        <div className={styles.card} style={{ marginBottom: '1.5rem' }}>
          <div className={styles.cardHeader}>
            <h3 className={styles.cardTitle}>Contact Details</h3>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
            <div className={styles.formGroup}>
              <label className={styles.label}>Primary Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={styles.input}
                placeholder="himaamer937@gmail.com"
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Phone Number</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className={styles.input}
                placeholder="+201096271378"
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Location / Country</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className={styles.input}
                placeholder="Mansoura, Egypt"
              />
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className={styles.card} style={{ marginBottom: '1.5rem' }}>
          <div className={styles.cardHeader}>
            <h3 className={styles.cardTitle}>Social Profiles</h3>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className={styles.formGroup}>
              <label className={styles.label}>LinkedIn Profile URL</label>
              <input
                type="url"
                value={linkedinUrl}
                onChange={(e) => setLinkedinUrl(e.target.value)}
                className={styles.input}
                placeholder="https://www.linkedin.com/in/..."
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>GitHub Profile URL</label>
              <input
                type="url"
                value={githubUrl}
                onChange={(e) => setGithubUrl(e.target.value)}
                className={styles.input}
                placeholder="https://github.com/..."
              />
            </div>
          </div>
        </div>

        {/* SEO & Metadata */}
        <div className={styles.card} style={{ marginBottom: '1.5rem' }}>
          <div className={styles.cardHeader}>
            <h3 className={styles.cardTitle}>Global SEO &amp; Meta Tags</h3>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Default Page Title (Browser Tab)</label>
            <input
              type="text"
              value={siteTitle}
              onChange={(e) => setSiteTitle(e.target.value)}
              className={styles.input}
              placeholder="Ebrahim Amer | Premium Front-End Engineer & React Developer"
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Meta Description (Search Engines &amp; Social Sharing)</label>
            <textarea
              value={metaDescription}
              onChange={(e) => setMetaDescription(e.target.value)}
              className={styles.textarea}
              rows={3}
              placeholder="Sophisticated, performance-first front-end portfolio..."
            />
          </div>
        </div>

        {/* Supabase Connection Details & Guide */}
        <div className={styles.card} style={{ marginBottom: '1.5rem', background: '#090910' }}>
          <div className={styles.cardHeader}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              <Database size={18} style={{ color: '#00D4FF' }} />
              <h3 className={styles.cardTitle}>Supabase Cloud Database Integration Guide</h3>
            </div>
          </div>

          <p style={{ fontSize: '0.82rem', color: '#94a3b8', lineHeight: 1.6, marginBottom: '1rem' }}>
            To activate persistent cloud PostgreSQL storage, Auth, and Storage:
          </p>

          <ol style={{ fontSize: '0.82rem', color: '#cbd5e1', paddingLeft: '1.25rem', lineHeight: 1.8 }}>
            <li>Create or open your Supabase project at <a href="https://supabase.com/dashboard" target="_blank" rel="noopener noreferrer" style={{ color: '#00D4FF' }}>supabase.com</a>.</li>
            <li>In Supabase <strong>SQL Editor</strong>, run the migration file provided in <code>supabase/migrations/20261012_init_portfolio_cms.sql</code>.</li>
            <li>Run the seed script in <code>supabase/seed.sql</code> to populate the verified initial records.</li>
            <li>Copy your <strong>Project URL</strong> and <strong>anon key</strong> from Supabase Project Settings &rarr; API.</li>
            <li>Paste them into your local <code>.env.local</code> or Vercel Environment Variables:</li>
          </ol>

          <pre
            style={{
              padding: '1rem',
              background: '#040407',
              borderRadius: '8px',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              fontSize: '0.75rem',
              color: '#00D4FF',
              fontFamily: 'var(--font-mono, monospace)',
              marginTop: '1rem',
              overflowX: 'auto',
            }}
          >
{`NEXT_PUBLIC_SUPABASE_URL=https://argaewhbcqwsqdaaynmw.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-supabase-publishable-key
# Optional server-only secret:
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
REVALIDATION_SECRET=ebrahim-portfolio-cms-revalidate-secret-2026`}
          </pre>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
          <button type="submit" disabled={saving} className={`${styles.btn} ${styles.btnPrimary}`}>
            <Save size={16} />
            <span>{saving ? 'Saving...' : 'Save Settings'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
