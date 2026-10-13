'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  ExternalLink, 
  Eye, 
  EyeOff, 
  Check, 
  X, 
  AlertTriangle,
  FolderKanban,
  Sparkles,
  Layers,
  ArrowUpRight
} from 'lucide-react';
import { ProjectRecord } from '@/lib/supabase/types';
import styles from '../dashboard.module.css';

export default function ProjectsManagementPage() {
  const [projects, setProjects] = useState<ProjectRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'published' | 'draft'>('all');
  
  // Modal State
  const [editingProject, setEditingProject] = useState<Partial<ProjectRecord> | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteCandidate, setDeleteCandidate] = useState<ProjectRecord | null>(null);
  const [saving, setSaving] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Form fields
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [category, setCategory] = useState('');
  const [demoUrl, setDemoUrl] = useState('');
  const [codeUrl, setCodeUrl] = useState('');
  const [isPrivateCode, setIsPrivateCode] = useState(false);
  const [description, setDescription] = useState('');
  const [longDescription, setLongDescription] = useState('');
  const [techString, setTechString] = useState('');
  const [imageSrc, setImageSrc] = useState('');
  const [displayOrder, setDisplayOrder] = useState(1);
  const [featured, setFeatured] = useState(false);
  const [isPublished, setIsPublished] = useState(true);

  const fetchProjects = async () => {
    try {
      const res = await fetch('/api/admin/projects');
      const data = await res.json();
      if (data.data) {
        setProjects(data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const openCreateModal = () => {
    setEditingProject(null);
    setTitle('');
    setSlug('');
    setCategory('Engineering Build');
    setDemoUrl('');
    setCodeUrl('');
    setIsPrivateCode(false);
    setDescription('');
    setLongDescription('');
    setTechString('React 19, TypeScript, Vite');
    setImageSrc('/Img/profile.jpg');
    setDisplayOrder(projects.length + 1);
    setFeatured(false);
    setIsPublished(true);
    setStatusMsg(null);
    setIsModalOpen(true);
  };

  const openEditModal = (p: ProjectRecord) => {
    setEditingProject(p);
    setTitle(p.title);
    setSlug(p.slug);
    setCategory(p.category);
    setDemoUrl(p.demo_url || '');
    setCodeUrl(p.code_url || '');
    setIsPrivateCode(Boolean(p.is_private_code));
    setDescription(p.description);
    setLongDescription(p.long_description || p.description);
    setTechString(Array.isArray(p.tech) ? p.tech.join(', ') : '');
    setImageSrc(p.screenshots && p.screenshots[0]?.src ? p.screenshots[0].src : '/Img/profile.jpg');
    setDisplayOrder(p.display_order || 1);
    setFeatured(Boolean(p.featured));
    setIsPublished(Boolean(p.is_published));
    setStatusMsg(null);
    setIsModalOpen(true);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setTitle(val);
    if (!editingProject) {
      // Auto-generate slug from title
      const autoSlug = val
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
      setSlug(autoSlug);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !slug || !description) {
      setStatusMsg({ type: 'error', text: 'Please fill in all required fields (Title, Slug, Short Description).' });
      return;
    }

    setSaving(true);
    setStatusMsg(null);

    const techArray = techString
      .split(',')
      .map(t => t.trim())
      .filter(Boolean);

    const payload: Partial<ProjectRecord> = {
      id: editingProject?.id,
      title,
      slug,
      category,
      demo_url: demoUrl,
      code_url: codeUrl,
      is_private_code: isPrivateCode,
      description,
      long_description: longDescription || description,
      tech: techArray,
      screenshots: [{ src: imageSrc || '/Img/profile.jpg', caption: `${title} preview.` }],
      display_order: Number(displayOrder),
      featured,
      is_published: isPublished,
    };

    try {
      const res = await fetch('/api/admin/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const json = await res.json();
      if (!res.ok) {
        throw new Error(json.message || 'Failed to save project');
      }

      setStatusMsg({ type: 'success', text: 'Project successfully saved and cache revalidated!' });
      setTimeout(() => {
        setIsModalOpen(false);
        fetchProjects();
      }, 900);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Error saving project';
      setStatusMsg({ type: 'error', text: msg });
    } finally {
      setSaving(false);
    }
  };

  const togglePublish = async (p: ProjectRecord) => {
    try {
      const newStatus = !p.is_published;
      await fetch(`/api/admin/projects/${p.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ is_published: newStatus }),
      });
      setProjects(prev => prev.map(item => item.id === p.id ? { ...item, is_published: newStatus } : item));
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async () => {
    if (!deleteCandidate) return;
    try {
      await fetch(`/api/admin/projects/${deleteCandidate.id}`, {
        method: 'DELETE',
      });
      setProjects(prev => prev.filter(item => item.id !== deleteCandidate.id));
      setDeleteCandidate(null);
    } catch (err) {
      console.error(err);
    }
  };

  const filteredProjects = projects.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          p.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          p.slug.toLowerCase().includes(searchTerm.toLowerCase());
    if (filterStatus === 'published') return matchesSearch && p.is_published;
    if (filterStatus === 'draft') return matchesSearch && !p.is_published;
    return matchesSearch;
  });

  return (
    <div>
      {/* Top Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.75rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#ffffff' }}>Projects Directory</h2>
          <p style={{ fontSize: '0.82rem', color: '#94a3b8' }}>
            Manage commercial platforms, open-source case studies, and showcase visibility
          </p>
        </div>
        <button onClick={openCreateModal} className={`${styles.btn} ${styles.btnPrimary}`}>
          <Plus size={16} />
          <span>New Project</span>
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div
        className={styles.card}
        style={{
          padding: '1rem 1.25rem',
          marginBottom: '1.5rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
        }}
      >
        <div style={{ position: 'relative', minWidth: '280px', flex: 1 }}>
          <Search size={16} style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }} />
          <input
            type="text"
            placeholder="Search projects by title, category, or slug..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.input}
            style={{ paddingLeft: '2.5rem', paddingRight: '1rem' }}
          />
        </div>

        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button
            onClick={() => setFilterStatus('all')}
            className={`${styles.btn} ${filterStatus === 'all' ? styles.btnPrimary : styles.btnSecondary}`}
            style={{ fontSize: '0.78rem', padding: '0.45rem 0.85rem' }}
          >
            All ({projects.length})
          </button>
          <button
            onClick={() => setFilterStatus('published')}
            className={`${styles.btn} ${filterStatus === 'published' ? styles.btnPrimary : styles.btnSecondary}`}
            style={{ fontSize: '0.78rem', padding: '0.45rem 0.85rem' }}
          >
            Published ({projects.filter(p => p.is_published).length})
          </button>
          <button
            onClick={() => setFilterStatus('draft')}
            className={`${styles.btn} ${filterStatus === 'draft' ? styles.btnPrimary : styles.btnSecondary}`}
            style={{ fontSize: '0.78rem', padding: '0.45rem 0.85rem' }}
          >
            Drafts ({projects.filter(p => !p.is_published).length})
          </button>
        </div>
      </div>

      {/* Projects Table */}
      <div className={styles.card} style={{ padding: 0, overflow: 'hidden' }}>
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th style={{ width: '60px' }}>Order</th>
                <th>Project Details</th>
                <th>Category</th>
                <th>Status</th>
                <th>Links</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={6} style={{ textAlign: 'center', padding: '3rem', color: '#94a3b8' }}>
                    Loading projects from database...
                  </td>
                </tr>
              ) : filteredProjects.length === 0 ? (
                <tr>
                  <td colSpan={6} style={{ textAlign: 'center', padding: '3rem', color: '#94a3b8' }}>
                    No projects found matching your filter criteria.
                  </td>
                </tr>
              ) : (
                filteredProjects.map((p) => (
                  <tr key={p.id}>
                    <td>
                      <span style={{ fontFamily: 'var(--font-mono)', color: '#94a3b8', fontSize: '0.8rem' }}>
                        #{p.display_order || 1}
                      </span>
                    </td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                        <div
                          style={{
                            width: '44px',
                            height: '32px',
                            borderRadius: '6px',
                            overflow: 'hidden',
                            background: '#1a1a24',
                            position: 'relative',
                            flexShrink: 0,
                          }}
                        >
                          <Image
                            src={p.screenshots && p.screenshots[0]?.src ? p.screenshots[0].src : '/Img/profile.jpg'}
                            alt={p.title}
                            fill
                            style={{ objectFit: 'cover' }}
                          />
                        </div>
                        <div>
                          <strong style={{ color: '#ffffff', fontSize: '0.88rem', display: 'block' }}>
                            {p.title}
                          </strong>
                          <span style={{ fontSize: '0.72rem', color: '#64748b', fontFamily: 'var(--font-mono)' }}>
                            /{p.slug}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span style={{ fontSize: '0.8rem', color: '#cbd5e1' }}>{p.category}</span>
                    </td>
                    <td>
                      <button
                        onClick={() => togglePublish(p)}
                        className={`${styles.badge} ${p.is_published ? styles.badgeSuccess : styles.badgeWarning}`}
                        style={{ cursor: 'pointer', border: 'none' }}
                        title="Click to toggle publish status"
                      >
                        {p.is_published ? <Eye size={12} /> : <EyeOff size={12} />}
                        <span>{p.is_published ? 'Published' : 'Draft'}</span>
                      </button>
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        {p.demo_url && (
                          <a href={p.demo_url} target="_blank" rel="noopener noreferrer" style={{ color: '#00D4FF' }} title="Live Demo">
                            <ArrowUpRight size={16} />
                          </a>
                        )}
                        <Link href={`/projects/${p.slug}`} target="_blank" style={{ color: '#94a3b8' }} title="View Public Case Study">
                          <Eye size={16} />
                        </Link>
                      </div>
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <div style={{ display: 'inline-flex', gap: '0.5rem' }}>
                        <button
                          onClick={() => openEditModal(p)}
                          className={`${styles.btn} ${styles.btnSecondary}`}
                          style={{ padding: '0.4rem 0.65rem' }}
                          title="Edit Project"
                        >
                          <Edit size={14} />
                        </button>
                        <button
                          onClick={() => setDeleteCandidate(p)}
                          className={`${styles.btn} ${styles.btnDanger}`}
                          style={{ padding: '0.4rem 0.65rem' }}
                          title="Delete Project"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create / Edit Modal */}
      {isModalOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.75)',
            backdropFilter: 'blur(8px)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem',
          }}
        >
          <div
            className={styles.card}
            style={{
              maxWidth: '720px',
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto',
              background: '#0b0b14',
              padding: '2rem',
            }}
          >
            <div className={styles.cardHeader}>
              <h3 className={styles.cardTitle}>
                {editingProject ? `Edit: ${editingProject.title}` : 'Create New Project'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                style={{ background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer' }}
              >
                <X size={20} />
              </button>
            </div>

            {statusMsg && (
              <div
                style={{
                  padding: '0.75rem 1rem',
                  borderRadius: '8px',
                  marginBottom: '1.25rem',
                  fontSize: '0.8rem',
                  background: statusMsg.type === 'success' ? 'rgba(16, 185, 129, 0.12)' : 'rgba(239, 68, 68, 0.12)',
                  border: statusMsg.type === 'success' ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid rgba(239, 68, 68, 0.3)',
                  color: statusMsg.type === 'success' ? '#34d399' : '#fca5a5',
                }}
              >
                {statusMsg.text}
              </div>
            )}

            <form onSubmit={handleSave}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Project Title *</label>
                  <input
                    type="text"
                    value={title}
                    onChange={handleTitleChange}
                    placeholder="e.g. Acme Cloud Dashboard"
                    className={styles.input}
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Slug * (URL Route)</label>
                  <input
                    type="text"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-'))}
                    placeholder="e.g. acme-dashboard"
                    className={styles.input}
                    required
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Category</label>
                  <input
                    type="text"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    placeholder="e.g. E-Commerce & Retail"
                    className={styles.input}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Display Order</label>
                  <input
                    type="number"
                    value={displayOrder}
                    onChange={(e) => setDisplayOrder(Number(e.target.value))}
                    className={styles.input}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Live Demo URL</label>
                  <input
                    type="url"
                    value={demoUrl}
                    onChange={(e) => setDemoUrl(e.target.value)}
                    placeholder="https://..."
                    className={styles.input}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>GitHub Repository URL</label>
                  <input
                    type="url"
                    value={codeUrl}
                    onChange={(e) => setCodeUrl(e.target.value)}
                    placeholder="https://github.com/..."
                    className={styles.input}
                  />
                </div>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Short Description *</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Summary shown on project showcase card..."
                  className={styles.textarea}
                  rows={3}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Detailed Case Study Description</label>
                <textarea
                  value={longDescription}
                  onChange={(e) => setLongDescription(e.target.value)}
                  placeholder="Full architectural narrative shown on /projects/[slug]..."
                  className={styles.textarea}
                  rows={4}
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Technologies & Tools (Comma separated)</label>
                <input
                  type="text"
                  value={techString}
                  onChange={(e) => setTechString(e.target.value)}
                  placeholder="React 19, Next.js, TypeScript, TanStack Query"
                  className={styles.input}
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Thumbnail Image URL or Path</label>
                <input
                  type="text"
                  value={imageSrc}
                  onChange={(e) => setImageSrc(e.target.value)}
                  placeholder="/Img/image copy.png or Supabase storage URL"
                  className={styles.input}
                />
              </div>

              <div style={{ display: 'flex', gap: '2rem', margin: '1.25rem 0' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.85rem' }}>
                  <input
                    type="checkbox"
                    checked={isPublished}
                    onChange={(e) => setIsPublished(e.target.checked)}
                  />
                  <span>Published to live website</span>
                </label>

                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.85rem' }}>
                  <input
                    type="checkbox"
                    checked={featured}
                    onChange={(e) => setFeatured(e.target.checked)}
                  />
                  <span>Feature in Top 3 Showcase</span>
                </label>

                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.85rem' }}>
                  <input
                    type="checkbox"
                    checked={isPrivateCode}
                    onChange={(e) => setIsPrivateCode(e.target.checked)}
                  />
                  <span>Private Commercial Code</span>
                </label>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.75rem' }}>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className={`${styles.btn} ${styles.btnSecondary}`}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className={`${styles.btn} ${styles.btnPrimary}`}
                >
                  {saving ? 'Saving...' : 'Save & Publish Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteCandidate && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.75)',
            backdropFilter: 'blur(8px)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem',
          }}
        >
          <div
            className={styles.card}
            style={{
              maxWidth: '440px',
              width: '100%',
              background: '#0d0d16',
              padding: '2rem',
              textAlign: 'center',
            }}
          >
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                background: 'rgba(239, 68, 68, 0.1)',
                color: '#f87171',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1rem',
              }}
            >
              <AlertTriangle size={24} />
            </div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#ffffff', marginBottom: '0.5rem' }}>
              Confirm Project Deletion
            </h3>
            <p style={{ fontSize: '0.82rem', color: '#94a3b8', marginBottom: '1.5rem' }}>
              Are you sure you want to permanently delete <strong>&ldquo;{deleteCandidate.title}&rdquo;</strong>? This operation cannot be undone.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem' }}>
              <button
                onClick={() => setDeleteCandidate(null)}
                className={`${styles.btn} ${styles.btnSecondary}`}
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className={`${styles.btn} ${styles.btnDanger}`}
              >
                Yes, Delete Project
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
