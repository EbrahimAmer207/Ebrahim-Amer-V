'use client';

import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Mail, Phone, GitBranch, Copy, Check, Send, Sparkles } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import styles from './Contact.module.css';

const LinkedinIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export default function Contact() {
  const header = useScrollReveal({ threshold: 0.1 });
  const left   = useScrollReveal({ threshold: 0.08 });
  const right  = useScrollReveal({ threshold: 0.08 });

  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const email = 'himaamer937@gmail.com';
  const phone = '+201096271378';

  const copyToClipboard = (text: string, type: 'email' | 'phone') => {
    navigator.clipboard.writeText(text);
    if (type === 'email') { setCopiedEmail(true); setTimeout(() => setCopiedEmail(false), 2000); }
    else { setCopiedPhone(true); setTimeout(() => setCopiedPhone(false), 2000); }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;
    setIsSending(true);

    try {
      const response = await fetch(`https://formsubmit.co/ajax/${email}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          Name: formState.name,
          Email: formState.email,
          Message: formState.message,
          _subject: `New Portfolio Message from ${formState.name}`
        })
      });

      if (response.ok) {
        setIsSent(true);
        setFormState({ name: '', email: '', message: '' });
        setTimeout(() => setIsSent(false), 6000);
      } else {
        alert('Failed to send the message. Please contact directly via mail.');
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred while sending. Please contact directly via mail.');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section id="contact" className={styles.section}>
      <div className="container">

        {/* Header */}
        <div
          ref={header.ref}
          className={`${styles.header} reveal reveal-up ${header.isVisible ? 'reveal-visible' : ''}`}
        >
          <div className="pulse-badge">
            <span style={{ color: 'var(--accent)' }}>GET IN TOUCH</span>
          </div>
          <h2 className={`${styles.title} text-gradient`}>Let&rsquo;s Construct Something Great.</h2>
          <p className={styles.subtitle}>
            Reach out if you are looking for a frontend developer to fill junior/internship roles,
            or discuss freelance collaborations.
          </p>
        </div>

        {/* Grid */}
        <div className={styles.grid}>

          {/* Left: Direct Links */}
          <div
            ref={left.ref}
            className={`${styles.contactDetails} reveal reveal-left ${left.isVisible ? 'reveal-visible' : ''}`}
          >
            <h3 className={styles.columnTitle}>Direct Access</h3>
            <p className={styles.columnDesc}>
              Use the buttons below to copy direct communication anchors to your clipboard, or browse code repositories.
            </p>

            <div className={styles.cardsWrap}>
              <Card className={`${styles.contactCard} reveal reveal-up reveal-delay-1 ${left.isVisible ? 'reveal-visible' : ''}`}>
                <div className={styles.cardLeft}>
                  <Mail size={18} className={styles.cardIcon} />
                  <div className={styles.cardInfo}>
                    <span className={styles.cardLabel}>EMAIL</span>
                    <span className={styles.cardVal}>{email}</span>
                  </div>
                </div>
                <button className={styles.copyBtn} onClick={() => copyToClipboard(email, 'email')} title="Copy Email">
                  {copiedEmail ? <Check size={14} className={styles.checkIcon} /> : <Copy size={14} />}
                </button>
              </Card>

              <Card className={`${styles.contactCard} reveal reveal-up reveal-delay-2 ${left.isVisible ? 'reveal-visible' : ''}`}>
                <div className={styles.cardLeft}>
                  <Phone size={18} className={styles.cardIcon} />
                  <div className={styles.cardInfo}>
                    <span className={styles.cardLabel}>PHONE</span>
                    <span className={styles.cardVal}>+20 109 627 1378</span>
                  </div>
                </div>
                <button className={styles.copyBtn} onClick={() => copyToClipboard(phone, 'phone')} title="Copy Phone Number">
                  {copiedPhone ? <Check size={14} className={styles.checkIcon} /> : <Copy size={14} />}
                </button>
              </Card>
            </div>

            <div className={`${styles.socials} reveal reveal-up reveal-delay-3 ${left.isVisible ? 'reveal-visible' : ''}`}>
              <a href="https://github.com/EbrahimAmer207" target="_blank" rel="noopener noreferrer" className={styles.socialBadge}>
                <GitBranch size={16} /> <span>GitHub</span>
              </a>
              <a href="https://www.linkedin.com/in/ebrahim-amer0/" target="_blank" rel="noopener noreferrer" className={styles.socialBadge}>
                <LinkedinIcon /> <span>LinkedIn</span>
              </a>
            </div>
          </div>

          {/* Right: Form */}
          <div
            ref={right.ref}
            className={`reveal reveal-right ${right.isVisible ? 'reveal-visible' : ''}`}
          >
            <Card className={styles.formCard}>
              <form onSubmit={handleSubmit} className={styles.form}>
                <h3 className={styles.formTitle}>Send a Message</h3>

                <div className={styles.inputGroup}>
                  <label htmlFor="name" className={styles.inputLabel}>YOUR NAME</label>
                  <input type="text" id="name" name="name" required placeholder="e.g. John Doe"
                    value={formState.name} onChange={handleInputChange} className={styles.input} disabled={isSending || isSent} />
                </div>

                <div className={styles.inputGroup}>
                  <label htmlFor="email" className={styles.inputLabel}>EMAIL ADDRESS</label>
                  <input type="email" id="email" name="email" required placeholder="e.g. johndoe@company.com"
                    value={formState.email} onChange={handleInputChange} className={styles.input} disabled={isSending || isSent} />
                </div>

                <div className={styles.inputGroup}>
                  <label htmlFor="message" className={styles.inputLabel}>YOUR MESSAGE</label>
                  <textarea id="message" name="message" required rows={5}
                    placeholder="Share a role opportunity, internship scope, or freelance details..."
                    value={formState.message} onChange={handleInputChange} className={styles.textarea} disabled={isSending || isSent} />
                </div>

                <Button type="submit" variant="accent" magnetic={false}
                  disabled={isSending || isSent || !formState.name || !formState.email || !formState.message}
                  className={styles.submitBtn}>
                  {isSending ? <>Sending Inquiries...</> : isSent ? (
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#10b981' }}>
                      Sent Successfully <Sparkles size={14} />
                    </span>
                  ) : (
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      Send Message <Send size={14} />
                    </span>
                  )}
                </Button>
              </form>
            </Card>
          </div>

        </div>
      </div>
    </section>
  );
}
