'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import Image from 'next/image';

export default function Footer() {
  const t = useTranslations('Contact');

  return (
    <footer id="contact" className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link href="/" className="logo" style={{ display: 'inline-block', background: 'white', padding: '10px 15px', borderRadius: '8px', marginBottom: '10px' }}>
              <Image src="/logo.png" alt="Antalya Çilingirci Logo" width={200} height={84} style={{ width: 'auto', height: '60px' }} />
            </Link>
            <p className="brand-desc">
              {t('localBusiness')}
            </p>
            <div className="always-open-badge">
              <span className="pulsing-dot"></span>
              {t('alwaysOpen')}
            </div>
          </div>

          <div className="footer-contact">
            <h3>{t('title')}</h3>
            <ul className="contact-list">
              <li>
                <div className="contact-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                </div>
                <div>
                  <span className="contact-label">{t('callNow')}</span>
                  <a href="tel:+905468558680" className="contact-value">{t('phone')}</a>
                </div>
              </li>
              <li>
                <div className="contact-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                </div>
                <div>
                  <span className="contact-label">{t('email')}</span>
                  <a href={`mailto:${t('emailAddress')}`} className="contact-value">{t('emailAddress')}</a>
                </div>
              </li>
            </ul>
          </div>

          <div className="footer-nav">
            <h3>Hızlı Linkler</h3>
            <ul>
              <li><a href="#services">Hizmetlerimiz</a></li>
              <li><a href="#about">Hakkımızda</a></li>
              <li><a href="#why-us">Neden Biz?</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Antalya Çilingirci. Tüm hakları saklıdır.</p>
        </div>
      </div>

      <style jsx>{`
        .footer {
          background-color: var(--bg-dark);
          color: white;
          padding: 5rem 0 2rem;
          border-top: 5px solid var(--primary);
        }
        .footer-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 3rem;
          margin-bottom: 4rem;
        }
        @media (min-width: 768px) {
          .footer-grid {
            grid-template-columns: 2fr 1.5fr 1fr;
          }
        }
        
        .logo-text {
          font-family: var(--font-heading);
          font-weight: 800;
          font-size: 1.75rem;
          color: white;
        }
        .brand-desc {
          margin-top: 1.5rem;
          color: var(--text-muted);
          max-width: 300px;
        }
        .always-open-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          margin-top: 1rem;
          padding: 0.5rem 1rem;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 9999px;
          font-size: 0.875rem;
          font-weight: 500;
        }
        .pulsing-dot {
          width: 8px;
          height: 8px;
          background: #10B981;
          border-radius: 50%;
          box-shadow: 0 0 10px rgba(16, 185, 129, 0.5);
          animation: pulse-green 2s infinite;
        }
        
        .footer h3 {
          color: white;
          font-size: 1.25rem;
          margin-bottom: 1.5rem;
        }
        
        .contact-list {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        .contact-list li {
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        .contact-icon {
          width: 48px;
          height: 48px;
          background: rgba(255, 107, 53, 0.1);
          color: var(--primary);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .contact-label {
          display: block;
          color: var(--text-muted);
          font-size: 0.875rem;
          margin-bottom: 0.25rem;
        }
        .contact-value {
          color: white;
          font-weight: 600;
          font-size: 1.125rem;
        }
        .contact-value:hover {
          color: var(--primary);
        }
        
        .footer-nav ul {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .footer-nav a {
          color: var(--text-muted);
          transition: all var(--transition-fast);
        }
        .footer-nav a:hover {
          color: var(--primary);
          padding-left: 0.5rem;
        }
        
        .footer-bottom {
          padding-top: 2rem;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          text-align: center;
          color: var(--text-muted);
          font-size: 0.875rem;
        }
        
        @keyframes pulse-green {
          0% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.4); }
          70% { box-shadow: 0 0 0 6px rgba(16, 185, 129, 0); }
          100% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); }
        }
      `}</style>
    </footer>
  );
}
