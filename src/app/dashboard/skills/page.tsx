'use client';

import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Wrench, 
  Sparkles, 
  Edit, 
  Trash2, 
  Eye, 
  EyeOff, 
  X, 
  Save, 
  Check, 
  AlertCircle,
  Terminal,
  Cpu
} from 'lucide-react';
import { SkillRecord, AIToolRecord } from '@/lib/supabase/types';
import styles from '../dashboard.module.css';

export default function SkillsManagementPage() {
  const [activeTab, setActiveTab] = useState<'skills' | 'ai'>('skills');
  const [skills, setSkills] = useState<SkillRecord[]>([]);
  const [aiTools, setAiTools] = useState<AIToolRecord[]>([]);
  const [loading, setLoading] = useState(true);

  // Skill Modal
  const [isSkillModalOpen, setIsSkillModalOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState<SkillRecord | null>(null);
  const [skillName, setSkillName] = useState('');
  const [skillCategory, setSkillCategory] = useState<'languages' | 'frontend' | 'backend' | 'tools' | 'ai'>('frontend');
  const [skillLevel, setSkillLevel] = useState<'Expert' | 'Advanced' | 'Intermediate'>('Expert');
  const [skillOrder, setSkillOrder] = useState(1);
  const [skillVisible, setSkillVisible] = useState(true);

  // AI Tool Modal
  const [isAIModalOpen, setIsAIModalOpen] = useState(false);
  const [editingAI, setEditingAI] = useState<AIToolRecord | null>(null);
  const [aiName, setAiName] = useState('');
  const [aiTag, setAiTag] = useState('');
  const [aiSummary, setAiSummary] = useState('');
  const [aiDetails, setAiDetails] = useState('');
  const [aiOrder, setAiOrder] = useState(1);
  const [aiVisible, setAiVisible] = useState(true);

  const [saving, setSaving] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const fetchData = async () => {
    try {
      const [skillsRes, aiRes] = await Promise.all([
        fetch('/api/admin/skills'),
        fetch('/api/admin/ai-tools'),
      ]);
      const skillsJson = await skillsRes.json();
      const aiJson = await aiRes.json();
      if (skillsJson.data) setSkills(skillsJson.data);
      if (aiJson.data) setAiTools(aiJson.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // ── Skill Operations ──
  const openSkillModal = (item?: SkillRecord) => {
    if (item) {
      setEditingSkill(item);
      setSkillName(item.name);
      setSkillCategory(item.category);
      setSkillLevel(item.level);
      setSkillOrder(item.display_order || 1);
      setSkillVisible(item.is_visible);
    } else {
      setEditingSkill(null);
      setSkillName('');
      setSkillCategory('frontend');
      setSkillLevel('Expert');
      setSkillOrder(skills.length + 1);
      setSkillVisible(true);
    }
    setStatusMsg(null);
    setIsSkillModalOpen(true);
  };

  const handleSaveSkill = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setStatusMsg(null);

    const payload = {
      id: editingSkill?.id,
      name: skillName,
      category: skillCategory,
      level: skillLevel,
      display_order: Number(skillOrder),
      is_visible: skillVisible,
    };

    try {
      const res = await fetch('/api/admin/skills', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.message);

      setIsSkillModalOpen(false);
      fetchData();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Error saving skill';
      setStatusMsg({ type: 'error', text: msg });
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteSkill = async (id: string) => {
    if (!confirm('Are you sure you want to delete this skill?')) return;
    try {
      await fetch('/api/admin/skills', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      setSkills(prev => prev.filter(s => s.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  // ── AI Tool Operations ──
  const openAIModal = (item?: AIToolRecord) => {
    if (item) {
      setEditingAI(item);
      setAiName(item.name);
      setAiTag(item.tag);
      setAiSummary(item.summary);
      setAiDetails(item.details);
      setAiOrder(item.display_order || 1);
      setAiVisible(item.is_visible);
    } else {
      setEditingAI(null);
      setAiName('');
      setAiTag('Workflow & Coding');
      setAiSummary('');
      setAiDetails('');
      setAiOrder(aiTools.length + 1);
      setAiVisible(true);
    }
    setStatusMsg(null);
    setIsAIModalOpen(true);
  };

  const handleSaveAI = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setStatusMsg(null);

    const payload = {
      id: editingAI?.id,
      name: aiName,
      tag: aiTag,
      summary: aiSummary,
      details: aiDetails,
      icon_name: 'Terminal',
      display_order: Number(aiOrder),
      is_visible: aiVisible,
    };

    try {
      const res = await fetch('/api/admin/ai-tools', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.message);

      setIsAIModalOpen(false);
      fetchData();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Error saving AI tool';
      setStatusMsg({ type: 'error', text: msg });
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteAI = async (id: string) => {
    if (!confirm('Are you sure you want to delete this AI tool?')) return;
    try {
      await fetch('/api/admin/ai-tools', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      setAiTools(prev => prev.filter(a => a.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.75rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#ffffff' }}>Technical Stack &amp; AI Capabilities</h2>
          <p style={{ fontSize: '0.82rem', color: '#94a3b8' }}>
            Manage core technologies, language competencies, and agentic AI tools displayed in interactive marquees
          </p>
        </div>
        <button
          onClick={() => activeTab === 'skills' ? openSkillModal() : openAIModal()}
          className={`${styles.btn} ${styles.btnPrimary}`}
        >
          <Plus size={16} />
          <span>{activeTab === 'skills' ? 'Add New Skill' : 'Add AI Tool'}</span>
        </button>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.5rem' }}>
        <button
          onClick={() => setActiveTab('skills')}
          className={`${styles.btn} ${activeTab === 'skills' ? styles.btnPrimary : styles.btnSecondary}`}
        >
          <Wrench size={16} />
          <span>Technical Skills ({skills.length})</span>
        </button>
        <button
          onClick={() => setActiveTab('ai')}
          className={`${styles.btn} ${activeTab === 'ai' ? styles.btnPrimary : styles.btnSecondary}`}
        >
          <Sparkles size={16} />
          <span>AI Tools &amp; Workflows ({aiTools.length})</span>
        </button>
      </div>

      {/* Skills Table */}
      {activeTab === 'skills' && (
        <div className={styles.card} style={{ padding: 0, overflow: 'hidden' }}>
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th style={{ width: '60px' }}>Order</th>
                  <th>Skill Name</th>
                  <th>Category</th>
                  <th>Proficiency Level</th>
                  <th>Visibility</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {skills.map((s) => (
                  <tr key={s.id}>
                    <td>
                      <span style={{ fontFamily: 'var(--font-mono)', color: '#94a3b8', fontSize: '0.8rem' }}>
                        #{s.display_order}
                      </span>
                    </td>
                    <td>
                      <strong style={{ color: '#ffffff', fontSize: '0.88rem' }}>{s.name}</strong>
                    </td>
                    <td>
                      <span className={`${styles.badge} ${styles.badgeWarning}`}>
                        {s.category.toUpperCase()}
                      </span>
                    </td>
                    <td>
                      <span style={{ color: '#00D4FF', fontSize: '0.8rem', fontWeight: 600 }}>
                        {s.level}
                      </span>
                    </td>
                    <td>
                      <span className={`${styles.badge} ${s.is_visible ? styles.badgeSuccess : styles.badgeWarning}`}>
                        {s.is_visible ? 'Visible' : 'Hidden'}
                      </span>
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <div style={{ display: 'inline-flex', gap: '0.5rem' }}>
                        <button onClick={() => openSkillModal(s)} className={`${styles.btn} ${styles.btnSecondary}`} style={{ padding: '0.4rem 0.65rem' }}>
                          <Edit size={14} />
                        </button>
                        <button onClick={() => handleDeleteSkill(s.id)} className={`${styles.btn} ${styles.btnDanger}`} style={{ padding: '0.4rem 0.65rem' }}>
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* AI Tools Table */}
      {activeTab === 'ai' && (
        <div className={styles.card} style={{ padding: 0, overflow: 'hidden' }}>
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th style={{ width: '60px' }}>Order</th>
                  <th>Tool / Practice</th>
                  <th>Focus Tag</th>
                  <th>Summary</th>
                  <th>Visibility</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {aiTools.map((a) => (
                  <tr key={a.id}>
                    <td>
                      <span style={{ fontFamily: 'var(--font-mono)', color: '#94a3b8', fontSize: '0.8rem' }}>
                        #{a.display_order}
                      </span>
                    </td>
                    <td>
                      <strong style={{ color: '#ffffff', fontSize: '0.88rem' }}>{a.name}</strong>
                    </td>
                    <td>
                      <span className={`${styles.badge} ${styles.badgeWarning}`}>{a.tag}</span>
                    </td>
                    <td>
                      <span style={{ color: '#94a3b8', fontSize: '0.8rem' }}>{a.summary}</span>
                    </td>
                    <td>
                      <span className={`${styles.badge} ${a.is_visible ? styles.badgeSuccess : styles.badgeWarning}`}>
                        {a.is_visible ? 'Visible' : 'Hidden'}
                      </span>
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <div style={{ display: 'inline-flex', gap: '0.5rem' }}>
                        <button onClick={() => openAIModal(a)} className={`${styles.btn} ${styles.btnSecondary}`} style={{ padding: '0.4rem 0.65rem' }}>
                          <Edit size={14} />
                        </button>
                        <button onClick={() => handleDeleteAI(a.id)} className={`${styles.btn} ${styles.btnDanger}`} style={{ padding: '0.4rem 0.65rem' }}>
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Skill Modal */}
      {isSkillModalOpen && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(8px)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem' }}>
          <div className={styles.card} style={{ maxWidth: '480px', width: '100%', background: '#0b0b14', padding: '2rem' }}>
            <div className={styles.cardHeader}>
              <h3 className={styles.cardTitle}>{editingSkill ? 'Edit Skill' : 'Add New Skill'}</h3>
              <button onClick={() => setIsSkillModalOpen(false)} style={{ background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer' }}><X size={20} /></button>
            </div>
            <form onSubmit={handleSaveSkill}>
              <div className={styles.formGroup}>
                <label className={styles.label}>Skill Name *</label>
                <input type="text" value={skillName} onChange={(e) => setSkillName(e.target.value)} className={styles.input} placeholder="e.g. Next.js, Redux, Docker" required />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Category</label>
                  <select value={skillCategory} onChange={(e) => setSkillCategory(e.target.value as any)} className={styles.select}>
                    <option value="frontend">Frontend UI</option>
                    <option value="languages">Languages</option>
                    <option value="backend">Backend & DB</option>
                    <option value="tools">Tools & Engineering</option>
                  </select>
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Level</label>
                  <select value={skillLevel} onChange={(e) => setSkillLevel(e.target.value as any)} className={styles.select}>
                    <option value="Expert">Expert</option>
                    <option value="Advanced">Advanced</option>
                    <option value="Intermediate">Intermediate</option>
                  </select>
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Display Order</label>
                  <input type="number" value={skillOrder} onChange={(e) => setSkillOrder(Number(e.target.value))} className={styles.input} />
                </div>
                <div className={styles.formGroup} style={{ display: 'flex', alignItems: 'center', paddingTop: '1.5rem' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.85rem' }}>
                    <input type="checkbox" checked={skillVisible} onChange={(e) => setSkillVisible(e.target.checked)} />
                    <span>Visible in Marquee</span>
                  </label>
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.5rem' }}>
                <button type="button" onClick={() => setIsSkillModalOpen(false)} className={`${styles.btn} ${styles.btnSecondary}`}>Cancel</button>
                <button type="submit" disabled={saving} className={`${styles.btn} ${styles.btnPrimary}`}>{saving ? 'Saving...' : 'Save Skill'}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* AI Tool Modal */}
      {isAIModalOpen && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(8px)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem' }}>
          <div className={styles.card} style={{ maxWidth: '520px', width: '100%', background: '#0b0b14', padding: '2rem' }}>
            <div className={styles.cardHeader}>
              <h3 className={styles.cardTitle}>{editingAI ? 'Edit AI Tool' : 'Add AI Tool'}</h3>
              <button onClick={() => setIsAIModalOpen(false)} style={{ background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer' }}><X size={20} /></button>
            </div>
            <form onSubmit={handleSaveAI}>
              <div className={styles.formGroup}>
                <label className={styles.label}>Tool Name *</label>
                <input type="text" value={aiName} onChange={(e) => setAiName(e.target.value)} className={styles.input} placeholder="e.g. Cursor, Claude, Antigravity" required />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Focus Tag</label>
                <input type="text" value={aiTag} onChange={(e) => setAiTag(e.target.value)} className={styles.input} placeholder="e.g. Prompt Engineering, Code Analysis" required />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Short Summary *</label>
                <input type="text" value={aiSummary} onChange={(e) => setAiSummary(e.target.value)} className={styles.input} placeholder="One sentence summary..." required />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Detailed Description</label>
                <textarea value={aiDetails} onChange={(e) => setAiDetails(e.target.value)} className={styles.textarea} rows={3} placeholder="Detailed explanation of how this is leveraged..." />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Display Order</label>
                  <input type="number" value={aiOrder} onChange={(e) => setAiOrder(Number(e.target.value))} className={styles.input} />
                </div>
                <div className={styles.formGroup} style={{ display: 'flex', alignItems: 'center', paddingTop: '1.5rem' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.85rem' }}>
                    <input type="checkbox" checked={aiVisible} onChange={(e) => setAiVisible(e.target.checked)} />
                    <span>Visible in Showcase</span>
                  </label>
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.5rem' }}>
                <button type="button" onClick={() => setIsAIModalOpen(false)} className={`${styles.btn} ${styles.btnSecondary}`}>Cancel</button>
                <button type="submit" disabled={saving} className={`${styles.btn} ${styles.btnPrimary}`}>{saving ? 'Saving...' : 'Save AI Tool'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
