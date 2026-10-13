'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Sparkles, Save, Check, AlertCircle, RefreshCw } from 'lucide-react';
import { HeroContentRecord } from '@/lib/supabase/types';
import styles from '../dashboard.module.css';

export default function HeroManagementPage() {
  const [hero, setHero] = useState<HeroContentRecord | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Form State
  const [badgeText, setBadgeText] = useState('');
  const [titleLine1, setTitleLine1] = useState('');
  const [titleLine2, setTitleLine2] = useState('');
  const [titleLine3, setTitleLine3] = useState('');
  const [description, setDescription] = useState('');
  const [primaryLabel, setPrimaryLabel] = useState('');
  const [primaryLink, setPrimaryLink] = useState('');
  const [secondaryLabel, setSecondaryLabel] = useState('');
  const [secondaryLink, setSecondaryLink] = useState('');
  const [cvUrl, setCvUrl] = useState('');
  const [profileImg, setProfileImg] = useState('');

  const fetchHero = async () => {
    try {
      const res = await fetch('/api/admin/hero');
      const json = await res.json();
      if (json.data) {
        setHero(json.data);
        setBadgeText(json.data.badge_text || '');
        setTitleLine1(json.data.title_line_1 || '');
        setTitleLine2(json.data.title_line_2 || '');
        setTitleLine3(json.data.title_line_3 || '');
        setDescription(json.data.description || '');
        setPrimaryLabel(json.data.primary_cta_label || '');
        setPrimaryLink(json.data.primary_cta_link || '');
        setSecondaryLabel(json.data.secondary_cta_label || '');
        setSecondaryLink(json.data.secondary_cta_link || '');
        setCvUrl(json.data.cv_download_url || '');
        setProfileImg(json.data.profile_image_url || '');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHero();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setStatusMsg(null);

    const payload = {
      badge_text: badgeText,
      title_line_1: titleLine1,
      title_line_2: titleLine2,
      title_line_3: titleLine3,
      description,
      primary_cta_label: primaryLabel,
      primary_cta_link: primaryLink,
      secondary_cta_label: secondaryLabel,
      secondary_cta_link: secondaryLink,
      cv_download_url: cvUrl,
      profile_image_url: profileImg,
      proof_metrics: hero?.proof_metrics || [
        { value: '9+', label: 'Projects Built' },
        { value: '4+', label: 'Certifications' },
        { value: '2026', label: 'CS Graduation' },
      ],
    };

    try {
      const res = await fetch('/api/admin/hero', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.message || 'Failed to save');

      setStatusMsg({ type: 'success', text: 'Hero content updated and cached page revalidated!' });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Error saving hero';
      setStatusMsg({ type: 'error', text: msg });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div style={{ padding: '3rem', textAlign: 'center', color: '#94a3b8' }}>Loading Hero content...</div>;
  }

  return (
    <div style={{ maxWidth: '900px' }}>
      <div style={{ marginBottom: '1.75rem' }}>
        <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#ffffff' }}>Hero &amp; Introduction Settings</h2>
        <p style={{ fontSize: '0.82rem', color: '#94a3b8' }}>
          Update hero headlines, supporting narrative, CTAs, and profile photo without altering layout tokens
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
        <div className={styles.card} style={{ marginBottom: '1.5rem' }}>
          <div className={styles.cardHeader}>
            <h3 className={styles.cardTitle}>Headlines &amp; Value Proposition</h3>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Pill Badge Text</label>
            <input
              type="text"
              value={badgeText}
              onChange={(e) => setBadgeText(e.target.value)}
              className={styles.input}
              placeholder="e.g. Available for junior roles & internships"
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
            <div className={styles.formGroup}>
              <label className={styles.label}>Title Line 1 (White)</label>
              <input
                type="text"
                value={titleLine1}
                onChange={(e) => setTitleLine1(e.target.value)}
                className={styles.input}
                placeholder="Building Digital"
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Title Line 2 (White)</label>
              <input
                type="text"
                value={titleLine2}
                onChange={(e) => setTitleLine2(e.target.value)}
                className={styles.input}
                placeholder="Experiences That"
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Title Line 3 (Cyan Gradient Accent)</label>
              <input
                type="text"
                value={titleLine3}
                onChange={(e) => setTitleLine3(e.target.value)}
                className={styles.input}
                placeholder="Feel Effortless."
              />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Hero Subtitle Narrative</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={styles.textarea}
              rows={4}
              placeholder="Front-End Engineer focused on high-performance React & Next.js applications..."
            />
          </div>
        </div>

        <div className={styles.card} style={{ marginBottom: '1.5rem' }}>
          <div className={styles.cardHeader}>
            <h3 className={styles.cardTitle}>Call-To-Action (CTA) Buttons &amp; Assets</h3>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className={styles.formGroup}>
              <label className={styles.label}>Primary Button Label</label>
              <input
                type="text"
                value={primaryLabel}
                onChange={(e) => setPrimaryLabel(e.target.value)}
                className={styles.input}
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Primary Button Destination</label>
              <input
                type="text"
                value={primaryLink}
                onChange={(e) => setPrimaryLink(e.target.value)}
                className={styles.input}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className={styles.formGroup}>
              <label className={styles.label}>Secondary Button Label</label>
              <input
                type="text"
                value={secondaryLabel}
                onChange={(e) => setSecondaryLabel(e.target.value)}
                className={styles.input}
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Secondary Button Destination</label>
              <input
                type="text"
                value={secondaryLink}
                onChange={(e) => setSecondaryLink(e.target.value)}
                className={styles.input}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className={styles.formGroup}>
              <label className={styles.label}>CV Download File URL</label>
              <input
                type="text"
                value={cvUrl}
                onChange={(e) => setCvUrl(e.target.value)}
                className={styles.input}
                placeholder="/Files/EBRAHIM_ABDELMONEM_CV.pdf"
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Profile Image URL / Path</label>
              <input
                type="text"
                value={profileImg}
                onChange={(e) => setProfileImg(e.target.value)}
                className={styles.input}
                placeholder="/Img/profile.jpg"
              />
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
          <button type="submit" disabled={saving} className={`${styles.btn} ${styles.btnPrimary}`}>
            <Save size={16} />
            <span>{saving ? 'Saving Changes...' : 'Save & Update Hero'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
