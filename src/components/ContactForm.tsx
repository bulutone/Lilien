'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';

export default function ContactForm() {
    const t = useTranslations('ContactForm');
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        const form = e.currentTarget;
        const data = new FormData(form);
        const name = data.get('name') as string;
        const phone = data.get('phone') as string;
        const message = data.get('message') as string;

        // GTM tracking
        if (typeof window !== 'undefined' && (window as any).dataLayer) {
            (window as any).dataLayer.push({
                event: 'contact_form_submit',
                contact_name: name,
                contact_method: 'form'
            });
        }

        // Send via WhatsApp as a fallback
        const whatsappText = encodeURIComponent(
            `Merhaba, ben ${name}.\nTelefon: ${phone}\n${message}`
        );
        window.open(`https://wa.me/905468558680?text=${whatsappText}`, '_blank');

        setLoading(false);
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 5000);
        form.reset();
    };

    return (
        <section id="contact-form" className="section">
            <div className="container">
                <div className="cf-wrapper">
                    {/* Left side — info */}
                    <div className="cf-info">
                        <div className="cf-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                        </div>
                        <h2>{t('title')}</h2>
                        <p>{t('subtitle')}</p>
                        <div className="cf-badges">
                            <div className="cf-badge">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                                <span>7/24</span>
                            </div>
                            <div className="cf-badge">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                                <span>~15 min</span>
                            </div>
                        </div>
                    </div>

                    {/* Right side — form */}
                    <div className="cf-form-wrapper">
                        {submitted ? (
                            <div className="cf-success">
                                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#25D366" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                                <p>{t('success')}</p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label htmlFor="cf-name">{t('name')}</label>
                                    <input type="text" id="cf-name" name="name" required placeholder={t('namePlaceholder')} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="cf-phone">{t('phone')}</label>
                                    <input type="tel" id="cf-phone" name="phone" required placeholder={t('phonePlaceholder')} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="cf-message">{t('message')}</label>
                                    <textarea id="cf-message" name="message" rows={3} placeholder={t('messagePlaceholder')}></textarea>
                                </div>
                                <button type="submit" className="btn btn-primary btn-lg" disabled={loading} style={{ width: '100%' }}>
                                    {loading ? '...' : t('submit')}
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>

            <style jsx>{`
        .cf-wrapper {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 3rem;
          background: white;
          border-radius: 1.5rem;
          padding: 3rem;
          box-shadow: 0 10px 40px rgba(0,0,0,0.06);
          border: 1px solid rgba(0,0,0,0.05);
        }
        .cf-info {
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .cf-icon {
          width: 56px; height: 56px;
          background: linear-gradient(135deg, #ff6b35, #ff8c42);
          color: white; border-radius: 1rem;
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 1.5rem;
        }
        .cf-info h2 { margin-bottom: 0.75rem; color: #111; }
        .cf-info p { color: #666; line-height: 1.7; margin-bottom: 1.5rem; }
        .cf-badges { display: flex; gap: 0.75rem; }
        .cf-badge {
          display: flex; align-items: center; gap: 0.5rem;
          background: #f1f5f9; padding: 0.5rem 1rem;
          border-radius: 999px; font-weight: 600; font-size: 0.9rem;
          color: #334155;
        }
        .cf-badge svg { color: var(--primary); }
        .cf-form-wrapper {}
        .form-group { margin-bottom: 1rem; }
        .form-group label {
          display: block; margin-bottom: 0.4rem;
          font-weight: 600; font-size: 0.9rem; color: #334155;
        }
        .form-group input, .form-group textarea {
          width: 100%; padding: 0.75rem 1rem;
          border: 1px solid #e2e8f0; border-radius: 0.75rem;
          font-size: 1rem; background: #f8fafc;
          transition: border-color 0.2s;
          font-family: inherit;
        }
        .form-group input:focus, .form-group textarea:focus {
          outline: none; border-color: var(--primary);
          box-shadow: 0 0 0 3px rgba(255,107,53,0.1);
        }
        .cf-success {
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          gap: 1rem; min-height: 250px;
          text-align: center;
        }
        .cf-success p { font-weight: 600; color: #25D366; font-size: 1.1rem; }
        @media (max-width: 768px) {
          .cf-wrapper { grid-template-columns: 1fr; padding: 1.5rem; gap: 2rem; }
        }
      `}</style>
        </section>
    );
}
