'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Sparkles, Lock, Mail, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react';
import { createClient, isSupabaseConfigured } from '@/lib/supabase/client';
import styles from '../dashboard.module.css';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const configured = isSupabaseConfigured();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    // Read directly from form elements to support browser autofill
    const form = e.currentTarget;
    const emailInput = form.elements.namedItem('email') as HTMLInputElement | null;
    const passwordInput = form.elements.namedItem('password') as HTMLInputElement | null;
    const targetEmail = (emailInput?.value || email || '').trim();
    const targetPassword = passwordInput?.value || password || '';

    if (!configured) {
      // Allow instant access to dashboard preview
      router.push('/dashboard');
      return;
    }

    if (!targetEmail || !targetPassword) {
      setErrorMsg('Please enter both your admin email and password.');
      setLoading(false);
      return;
    }

    try {
      const supabase = createClient();
      const { data, error } = await supabase.auth.signInWithPassword({
        email: targetEmail,
        password: targetPassword,
      });

      if (error) {
        if (error.message.toLowerCase().includes('invalid login credentials')) {
          setErrorMsg('Invalid login credentials. Please verify your password. If you forgot your password, it can be updated in the Supabase Dashboard under Authentication -> Users.');
        } else {
          setErrorMsg(error.message);
        }
      } else if (data.user) {
        const adminEmail = 'himaamer937@gmail.com';
        const userEmail = (data.user.email || '').toLowerCase();
        const isAdmin =
          data.user.app_metadata?.role === 'admin' ||
          data.user.user_metadata?.role === 'admin' ||
          (Boolean(userEmail) && userEmail === adminEmail);

        if (!isAdmin) {
          setErrorMsg('Access denied: This account is authenticated but lacks administrator privileges.');
          await supabase.auth.signOut();
        } else {
          router.push('/dashboard');
        }
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Login failed';
      setErrorMsg(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main
      style={{
        position: 'relative',
        zIndex: 10,
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem',
        background: 'transparent',
      }}
    >
      <div
        className={styles.card}
        style={{
          maxWidth: '440px',
          width: '100%',
          padding: '2.5rem',
          background: 'rgba(11, 11, 18, 0.92)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          borderRadius: '16px',
          boxShadow: '0 24px 64px -12px rgba(0, 0, 0, 0.75), 0 0 35px -5px rgba(0, 212, 255, 0.12)',
          position: 'relative',
          zIndex: 11,
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div
            style={{
              width: '52px',
              height: '52px',
              borderRadius: '14px',
              background: 'rgba(0, 212, 255, 0.12)',
              border: '1px solid rgba(0, 212, 255, 0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.25rem',
              color: '#00D4FF',
              boxShadow: '0 0 20px rgba(0, 212, 255, 0.25)',
            }}
          >
            <ShieldCheck size={26} />
          </div>
          <h1 style={{ fontSize: '1.45rem', fontWeight: 800, color: '#ffffff', marginBottom: '0.4rem', letterSpacing: '-0.02em' }}>
            Portfolio CMS Login
          </h1>
          <p style={{ fontSize: '0.84rem', color: '#94a3b8' }}>
            Secure administration console for Ebrahim Amer
          </p>
        </div>

        {!configured && (
          <div
            style={{
              padding: '0.75rem 1rem',
              background: 'rgba(245, 158, 11, 0.1)',
              border: '1px solid rgba(245, 158, 11, 0.25)',
              borderRadius: '8px',
              color: '#fcd34d',
              fontSize: '0.78rem',
              marginBottom: '1.5rem',
              lineHeight: 1.5,
            }}
          >
            <strong>Note:</strong> Supabase environment variables are currently in preview mode. Click <strong>Enter Dashboard</strong> below to inspect all modules. To activate cloud persistence, supply <code>NEXT_PUBLIC_SUPABASE_URL</code> in <code>.env.local</code>.
          </div>
        )}

        {errorMsg && (
          <div
            style={{
              padding: '0.75rem 1rem',
              background: 'rgba(239, 68, 68, 0.12)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              borderRadius: '8px',
              color: '#fca5a5',
              fontSize: '0.78rem',
              marginBottom: '1.25rem',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '0.6rem',
              lineHeight: 1.45,
            }}
          >
            <AlertCircle size={16} style={{ marginTop: '2px', flexShrink: 0 }} />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Admin Email</label>
            <div style={{ position: 'relative' }}>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="username email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="himaamer937@gmail.com"
                className={styles.input}
                style={{ paddingLeft: '2.5rem' }}
                required={configured}
              />
              <Mail
                size={16}
                style={{
                  position: 'absolute',
                  left: '0.85rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#64748b',
                }}
              />
            </div>
          </div>

          <div className={styles.formGroup} style={{ marginBottom: '1.75rem' }}>
            <label className={styles.label}>Password</label>
            <div style={{ position: 'relative' }}>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className={styles.input}
                style={{ paddingLeft: '2.5rem' }}
                required={configured}
              />
              <Lock
                size={16}
                style={{
                  position: 'absolute',
                  left: '0.85rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#64748b',
                }}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`${styles.btn} ${styles.btnPrimary}`}
            style={{ width: '100%', padding: '0.8rem', fontSize: '0.9rem', fontWeight: 700 }}
          >
            {loading ? 'Authenticating...' : configured ? 'Sign In to Dashboard' : 'Enter Dashboard (Preview)'}
            <ArrowRight size={16} />
          </button>
        </form>

        <div
          style={{
            marginTop: '1.25rem',
            padding: '0.6rem 0.85rem',
            background: 'rgba(255, 255, 255, 0.03)',
            borderRadius: '8px',
            border: '1px solid rgba(255, 255, 255, 0.06)',
            fontSize: '0.74rem',
            color: '#64748b',
            textAlign: 'center',
          }}
        >
          Registered Administrator: <span style={{ color: '#00D4FF', fontWeight: 600 }}>himaamer937@gmail.com</span>
        </div>

        <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
          <Link
            href="/"
            style={{
              fontSize: '0.78rem',
              color: '#64748b',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem',
            }}
          >
            <span>&larr; Return to Public Portfolio</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
