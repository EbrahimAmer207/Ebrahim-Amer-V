'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  LayoutDashboard, 
  FolderKanban, 
  Sparkles, 
  User, 
  Wrench, 
  Briefcase, 
  Image as ImageIcon, 
  Settings, 
  ExternalLink, 
  LogOut, 
  Menu,
  X
} from 'lucide-react';
import { createClient, isSupabaseConfigured } from '@/lib/supabase/client';
import styles from './dashboard.module.css';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  // If on login page, render clean page without dashboard shell
  const isLoginPage = pathname === '/dashboard/login';

  useEffect(() => {
    if (isSupabaseConfigured()) {
      const supabase = createClient();
      supabase.auth.getUser().then(({ data }) => {
        if (data.user?.email) {
          setUserEmail(data.user.email);
        }
      });
    }
  }, []);

  const handleLogout = async () => {
    if (isSupabaseConfigured()) {
      const supabase = createClient();
      await supabase.auth.signOut();
    }
    router.push('/dashboard/login');
  };

  if (isLoginPage) {
    return <>{children}</>;
  }

  const navLinks = [
    { href: '/dashboard', label: 'Overview', icon: LayoutDashboard },
    { href: '/dashboard/projects', label: 'Projects', icon: FolderKanban },
    { href: '/dashboard/hero', label: 'Hero & Intro', icon: Sparkles },
    { href: '/dashboard/about', label: 'About Me', icon: User },
    { href: '/dashboard/skills', label: 'Skills & AI', icon: Wrench },
    { href: '/dashboard/experience', label: 'Experience & Edu', icon: Briefcase },
    { href: '/dashboard/media', label: 'Media Library', icon: ImageIcon },
    { href: '/dashboard/settings', label: 'Settings & SEO', icon: Settings },
  ];

  return (
    <div className={styles.wrapper}>
      {/* Sidebar */}
      <aside className={`${styles.sidebar} ${mobileOpen ? styles.sidebarMobileOpen : ''}`}>
        <div className={styles.brand}>
          <div className={styles.brandLogo}>
            <Sparkles size={18} style={{ color: '#00D4FF' }} />
            <span>PORTFOLIO CMS</span>
          </div>
          <span className={styles.brandBadge}>PRO</span>
        </div>

        <nav className={styles.nav}>
          <span className={styles.navGroup}>Content Management</span>
          {navLinks.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`${styles.navItem} ${isActive ? styles.navActive : ''}`}
                onClick={() => setMobileOpen(false)}
              >
                <Icon size={16} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className={styles.sidebarFooter}>
          <Link href="/" target="_blank" className={styles.publicLink}>
            <ExternalLink size={14} />
            <span>View Live Site</span>
          </Link>
          <button onClick={handleLogout} className={styles.logoutBtn}>
            <LogOut size={14} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Container */}
      <div className={styles.main}>
        <header className={styles.topBar}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={styles.btnSecondary}
              style={{ display: 'none', padding: '0.4rem', border: 'none' }}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <h1 className={styles.pageHeading}>Admin Dashboard</h1>
          </div>

          <div className={styles.topActions}>
            {userEmail && (
              <span style={{ fontSize: '0.78rem', color: '#94a3b8' }}>
                {userEmail}
              </span>
            )}
            <Link href="/" target="_blank" className={`${styles.btn} ${styles.btnSecondary}`}>
              <ExternalLink size={14} />
              <span>Live Site</span>
            </Link>
          </div>
        </header>

        <main className={styles.content}>
          {children}
        </main>
      </div>
    </div>
  );
}
