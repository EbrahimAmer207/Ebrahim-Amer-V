'use client';

import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Briefcase, 
  GraduationCap, 
  Award, 
  Edit, 
  Trash2, 
  ExternalLink, 
  X, 
  Save, 
  Check, 
  AlertCircle 
} from 'lucide-react';
import { ExperienceRecord } from '@/lib/supabase/types';
import styles from '../dashboard.module.css';

export default function ExperienceManagementPage() {
  const [items, setItems] = useState<ExperienceRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState<'all' | 'experience' | 'education' | 'certification'>('all');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<ExperienceRecord | null>(null);
  const [type, setType] = useState<'experience' | 'education' | 'certification'>('experience');
  const [title, setTitle] = useState('');
  const [roleOrDegree, setRoleOrDegree] = useState('');
  const [institution, setInstitution] = useState('');
  const [dateRange, setDateRange] = useState('');
  const [description, setDescription] = useState('');
  const [certUrl, setCertUrl] = useState('');
  const [displayOrder, setDisplayOrder] = useState(1);
  const [isVisible, setIsVisible] = useState(true);

  const [saving, setSaving] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const fetchItems = async () => {
    try {
      const res = await fetch('/api/admin/experiences');
      const json = await res.json();
      if (json.data) setItems(json.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const openModal = (item?: ExperienceRecord) => {
    if (item) {
      setEditingItem(item);
      setType(item.type);
      setTitle(item.title);
      setRoleOrDegree(item.role_or_degree || '');
      setInstitution(item.institution || '');
      setDateRange(item.date_range);
      setDescription(item.description);
      setCertUrl(item.cert_url || '');
      setDisplayOrder(item.display_order || 1);
      setIsVisible(item.is_visible);
    } else {
      setEditingItem(null);
      setType('experience');
      setTitle('');
      setRoleOrDegree('');
      setInstitution('');
      setDateRange('');
      setDescription('');
      setCertUrl('');
      setDisplayOrder(items.length + 1);
      setIsVisible(true);
    }
    setStatusMsg(null);
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setStatusMsg(null);

    const payload = {
      id: editingItem?.id,
      type,
      title,
      role_or_degree: roleOrDegree,
      institution,
      date_range: dateRange,
      description,
      cert_url: certUrl,
      display_order: Number(displayOrder),
      is_visible: isVisible,
    };

    try {
      const res = await fetch('/api/admin/experiences', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.message);

      setIsModalOpen(false);
      fetchItems();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Error saving record';
      setStatusMsg({ type: 'error', text: msg });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this record?')) return;
    try {
      await fetch('/api/admin/experiences', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      setItems(prev => prev.filter(i => i.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const filteredItems = items.filter(i => {
    if (filterType === 'all') return true;
    return i.type === filterType;
  });

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.75rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#ffffff' }}>Experience &amp; Education Milestones</h2>
          <p style={{ fontSize: '0.82rem', color: '#94a3b8' }}>
            Manage professional fellowships, academic programs, and verified software diplomas
          </p>
        </div>
        <button onClick={() => openModal()} className={`${styles.btn} ${styles.btnPrimary}`}>
          <Plus size={16} />
          <span>Add New Milestone</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        <button onClick={() => setFilterType('all')} className={`${styles.btn} ${filterType === 'all' ? styles.btnPrimary : styles.btnSecondary}`} style={{ fontSize: '0.78rem', padding: '0.45rem 0.85rem' }}>
          All ({items.length})
        </button>
        <button onClick={() => setFilterType('experience')} className={`${styles.btn} ${filterType === 'experience' ? styles.btnPrimary : styles.btnSecondary}`} style={{ fontSize: '0.78rem', padding: '0.45rem 0.85rem' }}>
          Professional Experience ({items.filter(i => i.type === 'experience').length})
        </button>
        <button onClick={() => setFilterType('education')} className={`${styles.btn} ${filterType === 'education' ? styles.btnPrimary : styles.btnSecondary}`} style={{ fontSize: '0.78rem', padding: '0.45rem 0.85rem' }}>
          Academic Education ({items.filter(i => i.type === 'education').length})
        </button>
        <button onClick={() => setFilterType('certification')} className={`${styles.btn} ${filterType === 'certification' ? styles.btnPrimary : styles.btnSecondary}`} style={{ fontSize: '0.78rem', padding: '0.45rem 0.85rem' }}>
          Certifications &amp; Diplomas ({items.filter(i => i.type === 'certification').length})
        </button>
      </div>

      {/* Table */}
      <div className={styles.card} style={{ padding: 0, overflow: 'hidden' }}>
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th style={{ width: '60px' }}>Order</th>
                <th>Program / Organization</th>
                <th>Role / Degree</th>
                <th>Dates</th>
                <th>Type</th>
                <th>Certificate</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.map((item) => (
                <tr key={item.id}>
                  <td>
                    <span style={{ fontFamily: 'var(--font-mono)', color: '#94a3b8', fontSize: '0.8rem' }}>
                      #{item.display_order}
                    </span>
                  </td>
                  <td>
                    <strong style={{ color: '#ffffff', fontSize: '0.88rem' }}>{item.title}</strong>
                    {item.institution && <div style={{ fontSize: '0.72rem', color: '#64748b' }}>{item.institution}</div>}
                  </td>
                  <td>
                    <span style={{ color: '#cbd5e1', fontSize: '0.82rem' }}>{item.role_or_degree}</span>
                  </td>
                  <td>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: '#94a3b8' }}>
                      {item.date_range}
                    </span>
                  </td>
                  <td>
                    <span className={`${styles.badge} ${styles.badgeWarning}`}>
                      {item.type.toUpperCase()}
                    </span>
                  </td>
                  <td>
                    {item.cert_url ? (
                      <a href={item.cert_url} target="_blank" rel="noopener noreferrer" style={{ color: '#00D4FF', display: 'inline-flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.75rem' }}>
                        <span>PDF</span>
                        <ExternalLink size={12} />
                      </a>
                    ) : (
                      <span style={{ color: '#64748b', fontSize: '0.75rem' }}>None</span>
                    )}
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <div style={{ display: 'inline-flex', gap: '0.5rem' }}>
                      <button onClick={() => openModal(item)} className={`${styles.btn} ${styles.btnSecondary}`} style={{ padding: '0.4rem 0.65rem' }}>
                        <Edit size={14} />
                      </button>
                      <button onClick={() => handleDelete(item.id)} className={`${styles.btn} ${styles.btnDanger}`} style={{ padding: '0.4rem 0.65rem' }}>
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

      {/* Modal */}
      {isModalOpen && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(8px)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem' }}>
          <div className={styles.card} style={{ maxWidth: '620px', width: '100%', maxHeight: '90vh', overflowY: 'auto', background: '#0b0b14', padding: '2rem' }}>
            <div className={styles.cardHeader}>
              <h3 className={styles.cardTitle}>{editingItem ? 'Edit Milestone' : 'Add New Milestone'}</h3>
              <button onClick={() => setIsModalOpen(false)} style={{ background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer' }}><X size={20} /></button>
            </div>
            <form onSubmit={handleSave}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Category Type *</label>
                  <select value={type} onChange={(e) => setType(e.target.value as any)} className={styles.select}>
                    <option value="experience">Professional Experience</option>
                    <option value="education">Academic Education</option>
                    <option value="certification">Certification / Diploma</option>
                  </select>
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Title / Initiative *</label>
                  <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className={styles.input} placeholder="e.g. DEPI, Mansoura University" required />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Role / Degree Title</label>
                  <input type="text" value={roleOrDegree} onChange={(e) => setRoleOrDegree(e.target.value)} className={styles.input} placeholder="e.g. Frontend Development Fellow" />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Institution / Entity</label>
                  <input type="text" value={institution} onChange={(e) => setInstitution(e.target.value)} className={styles.input} placeholder="e.g. T-Square Academy, MCIT" />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Date Range *</label>
                  <input type="text" value={dateRange} onChange={(e) => setDateRange(e.target.value)} className={styles.input} placeholder="e.g. Jul 2025 - Dec 2025" required />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Certificate URL / PDF Link</label>
                  <input type="text" value={certUrl} onChange={(e) => setCertUrl(e.target.value)} className={styles.input} placeholder="/Files/Ebrahim Abdelmonem Ebrahim.pdf" />
                </div>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Description Narrative</label>
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} className={styles.textarea} rows={3} placeholder="Key accomplishments, technologies utilized, core responsibilities..." />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Display Order</label>
                  <input type="number" value={displayOrder} onChange={(e) => setDisplayOrder(Number(e.target.value))} className={styles.input} />
                </div>
                <div className={styles.formGroup} style={{ display: 'flex', alignItems: 'center', paddingTop: '1.5rem' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.85rem' }}>
                    <input type="checkbox" checked={isVisible} onChange={(e) => setIsVisible(e.target.checked)} />
                    <span>Visible in Timeline</span>
                  </label>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.5rem' }}>
                <button type="button" onClick={() => setIsModalOpen(false)} className={`${styles.btn} ${styles.btnSecondary}`}>Cancel</button>
                <button type="submit" disabled={saving} className={`${styles.btn} ${styles.btnPrimary}`}>{saving ? 'Saving...' : 'Save Milestone'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
