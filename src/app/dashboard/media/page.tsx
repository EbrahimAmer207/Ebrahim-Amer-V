'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { 
  Upload, 
  Trash2, 
  Copy, 
  Check, 
  FileText, 
  Image as ImageIcon, 
  AlertCircle,
  ExternalLink
} from 'lucide-react';
import { MediaAssetRecord } from '@/lib/supabase/types';
import styles from '../dashboard.module.css';

export default function MediaLibraryPage() {
  const [assets, setAssets] = useState<MediaAssetRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [statusMsg, setStatusMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchAssets = async () => {
    try {
      const res = await fetch('/api/admin/media');
      const json = await res.json();
      if (json.data) setAssets(json.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAssets();
  }, []);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setStatusMsg(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/admin/media', {
        method: 'POST',
        body: formData,
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.message || 'Upload failed');

      setStatusMsg({ type: 'success', text: `File "${file.name}" uploaded successfully!` });
      fetchAssets();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Error uploading file';
      setStatusMsg({ type: 'error', text: msg });
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const copyUrl = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDelete = async (asset: MediaAssetRecord) => {
    if (!confirm(`Are you sure you want to delete "${asset.filename}"?`)) return;

    try {
      await fetch('/api/admin/media', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: asset.id, storage_path: asset.storage_path }),
      });
      setAssets(prev => prev.filter(a => a.id !== asset.id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.75rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#ffffff' }}>Media &amp; Asset Library</h2>
          <p style={{ fontSize: '0.82rem', color: '#94a3b8' }}>
            Upload, preview, copy URLs, and manage project screenshots and document assets
          </p>
        </div>

        <div>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            style={{ display: 'none' }}
            accept="image/png,image/jpeg,image/webp,image/svg+xml,application/pdf"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className={`${styles.btn} ${styles.btnPrimary}`}
          >
            <Upload size={16} />
            <span>{uploading ? 'Uploading Asset...' : 'Upload New Asset'}</span>
          </button>
        </div>
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
          }}
        >
          {statusMsg.text}
        </div>
      )}

      {/* Grid of Media Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          gap: '1.25rem',
        }}
      >
        {assets.map((asset) => {
          const isPdf = asset.filename.endsWith('.pdf');
          return (
            <div
              key={asset.id}
              className={styles.card}
              style={{
                padding: '0.85rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem',
              }}
            >
              {/* Media Thumbnail */}
              <div
                style={{
                  width: '100%',
                  aspectRatio: '16 / 10',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  background: '#12121a',
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {isPdf ? (
                  <div style={{ textAlign: 'center', color: '#f87171' }}>
                    <FileText size={40} />
                    <span style={{ display: 'block', fontSize: '0.72rem', marginTop: '0.4rem', color: '#94a3b8' }}>PDF Document</span>
                  </div>
                ) : (
                  <Image
                    src={asset.public_url}
                    alt={asset.filename}
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                )}
              </div>

              {/* Media Info */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ overflow: 'hidden' }}>
                  <strong style={{ fontSize: '0.82rem', color: '#ffffff', display: 'block', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                    {asset.filename}
                  </strong>
                  <span style={{ fontSize: '0.7rem', color: '#64748b' }}>
                    {asset.storage_path.startsWith('local/') ? 'Local Repo' : 'Supabase Storage'}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '0.4rem', marginTop: 'auto' }}>
                <button
                  onClick={() => copyUrl(asset.public_url, asset.id)}
                  className={`${styles.btn} ${styles.btnSecondary}`}
                  style={{ flex: 1, padding: '0.4rem', fontSize: '0.75rem' }}
                >
                  {copiedId === asset.id ? <Check size={14} style={{ color: '#34d399' }} /> : <Copy size={14} />}
                  <span>{copiedId === asset.id ? 'Copied' : 'Copy URL'}</span>
                </button>

                <a
                  href={asset.public_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${styles.btn} ${styles.btnSecondary}`}
                  style={{ padding: '0.4rem 0.6rem' }}
                  title="View full asset"
                >
                  <ExternalLink size={14} />
                </a>

                {!asset.storage_path.startsWith('local/') && (
                  <button
                    onClick={() => handleDelete(asset)}
                    className={`${styles.btn} ${styles.btnDanger}`}
                    style={{ padding: '0.4rem 0.6rem' }}
                    title="Delete asset"
                  >
                    <Trash2 size={14} />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
