'use client';

import React, { useState, useEffect } from 'react';
import { User, Save, Check, AlertCircle } from 'lucide-react';
import { AboutContentRecord } from '@/lib/supabase/types';
import styles from '../dashboard.module.css';

export default function AboutManagementPage() {
  const [about, setAbout] = useState<AboutContentRecord | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Form State
  const [tag, setTag] = useState('');
  const [title, setTitle] = useState('');
  const [para1, setPara1] = useState('');
  const [para2, setPara2] = useState('');
  const [focus1Label, setFocus1Label] = useState('');
  const [focus1Text, setFocus1Text] = useState('');
  const [focus2Label, setFocus2Label] = useState('');
  const [focus2Text, setFocus2Text] = useState('');

  const fetchAbout = async () => {
    try {
      const res = await fetch('/api/admin/about');
      const json = await res.json();
      if (json.data) {
        setAbout(json.data);
        setTag(json.data.tag || '04 / STORY & APPROACH');
        setTitle(json.data.title || '');
        setPara1(json.data.paragraph_1 || '');
        setPara2(json.data.paragraph_2 || '');

        const blocks = json.data.focus_blocks || [];
        setFocus1Label(blocks[0]?.label || '01 / CLEAN CODE');
        setFocus1Text(blocks[0]?.text || '');
        setFocus2Label(blocks[1]?.label || '02 / PERFORMANCE FIRST');
        setFocus2Text(blocks[1]?.text || '');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAbout();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setStatusMsg(null);

    const payload = {
      tag,
      title,
      paragraph_1: para1,
      paragraph_2: para2,
      focus_blocks: [
        { label: focus1Label, text: focus1Text },
        { label: focus2Label, text: focus2Text },
      ],
    };

    try {
      const res = await fetch('/api/admin/about', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.message || 'Failed to save');

      setStatusMsg({ type: 'success', text: 'About section updated and cache revalidated!' });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Error saving about content';
      setStatusMsg({ type: 'error', text: msg });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div style={{ padding: '3rem', textAlign: 'center', color: '#94a3b8' }}>Loading About content...</div>;
  }

  return (
    <div style={{ maxWidth: '900px' }}>
      <div style={{ marginBottom: '1.75rem' }}>
        <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#ffffff' }}>About Me &amp; Philosophy</h2>
        <p style={{ fontSize: '0.82rem', color: '#94a3b8' }}>
          Update biography narrative, architectural principles, and core focus blocks
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
            <h3 className={styles.cardTitle}>Story Headline &amp; Tag</h3>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Section Eyebrow Tag</label>
            <input
              type="text"
              value={tag}
              onChange={(e) => setTag(e.target.value)}
              className={styles.input}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Main Story Heading</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={styles.input}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Primary Biography Paragraph</label>
            <textarea
              value={para1}
              onChange={(e) => setPara1(e.target.value)}
              className={styles.textarea}
              rows={4}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Engineering Philosophy Paragraph</label>
            <textarea
              value={para2}
              onChange={(e) => setPara2(e.target.value)}
              className={styles.textarea}
              rows={4}
            />
          </div>
        </div>

        <div className={styles.card} style={{ marginBottom: '1.5rem' }}>
          <div className={styles.cardHeader}>
            <h3 className={styles.cardTitle}>Focus Pillars</h3>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <div className={styles.formGroup}>
              <label className={styles.label}>Focus 1 Label</label>
              <input
                type="text"
                value={focus1Label}
                onChange={(e) => setFocus1Label(e.target.value)}
                className={styles.input}
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Focus 1 Description</label>
              <input
                type="text"
                value={focus1Text}
                onChange={(e) => setFocus1Text(e.target.value)}
                className={styles.input}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className={styles.formGroup}>
              <label className={styles.label}>Focus 2 Label</label>
              <input
                type="text"
                value={focus2Label}
                onChange={(e) => setFocus2Label(e.target.value)}
                className={styles.input}
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Focus 2 Description</label>
              <input
                type="text"
                value={focus2Text}
                onChange={(e) => setFocus2Text(e.target.value)}
                className={styles.input}
              />
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
          <button type="submit" disabled={saving} className={`${styles.btn} ${styles.btnPrimary}`}>
            <Save size={16} />
            <span>{saving ? 'Saving Changes...' : 'Save & Update About Section'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
