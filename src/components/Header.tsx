'use client';

import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/routing';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import LanguageSwitcher from './LanguageSwitcher';

export default function Header() {
  const t = useTranslations('Services');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container header-container">
        <Link href="/" className="logo" style={{ display: 'flex', alignItems: 'center' }}>
          <Image src="/logo.png" alt="Antalya Çilingirci Logo" width={180} height={75} style={{ width: 'auto', height: '60px' }} priority />
        </Link>

        <nav className={`nav-links ${isMobileMenuOpen ? 'open' : ''}`}>
          <a href="#services" onClick={() => setIsMobileMenuOpen(false)}>
            {t('title')}
          </a>
          <a href="#about" onClick={() => setIsMobileMenuOpen(false)}>
            Hakkımızda
          </a>
          <a href="#why-us" onClick={() => setIsMobileMenuOpen(false)}>
            Neden Biz
          </a>
          <a href="#contact" onClick={() => setIsMobileMenuOpen(false)}>
            İletişim
          </a>

          <div className="mobile-only-lang">
            <LanguageSwitcher />
          </div>
        </nav>

        <div className="header-actions">
          <div className="desktop-only-lang">
            <LanguageSwitcher />
          </div>
          <a href="tel:+905468558680" className="btn btn-primary btn-sm header-cta">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
            <span>0 546 855 86 80</span>
          </a>

          <button className="mobile-menu-btn" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              {isMobileMenuOpen ? (
                <><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></>
              ) : (
                <><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></>
              )}
            </svg>
          </button>
        </div>
      </div>

      <style jsx>{`
        .header {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          z-index: 50;
          background: transparent;
          transition: all var(--transition-normal);
          padding: 1.5rem 0;
        }
        .header.scrolled {
          background: var(--glass-bg);
          backdrop-filter: var(--glass-blur);
          -webkit-backdrop-filter: var(--glass-blur);
          box-shadow: var(--shadow-sm);
          padding: 1rem 0;
          border-bottom: 1px solid var(--glass-border);
        }
        .header-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .logo {
          font-family: var(--font-heading);
          font-weight: 800;
          font-size: 1.5rem;
          Letter-spacing: -0.02em;
        }
        .nav-links {
          display: flex;
          gap: 2rem;
          align-items: center;
        }
        .nav-links a {
          font-weight: 500;
          color: var(--text-main);
          font-size: 0.95rem;
        }
        .header-actions {
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        .btn-sm {
          padding: 0.6rem 1.2rem;
          font-size: 0.9rem;
        }
        .mobile-menu-btn {
          display: none;
          background: none;
          border: none;
          color: var(--text-main);
          cursor: pointer;
        }
        .mobile-only-lang {
          display: none;
        }
        
        @media (max-width: 992px) {
          .nav-links {
            position: absolute;
            top: 100%;
            left: 0;
            width: 100%;
            background: var(--bg-white);
            flex-direction: column;
            padding: 2rem;
            box-shadow: var(--shadow-md);
            clip-path: polygon(0 0, 100% 0, 100% 0, 0 0);
            transition: clip-path var(--transition-normal);
          }
          .nav-links.open {
            clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
          }
          .mobile-menu-btn {
            display: block;
          }
          .header-cta span {
            display: none;
          }
          .header-cta {
            padding: 0.6rem;
            border-radius: 50%;
          }
          .desktop-only-lang {
            display: none;
          }
          .mobile-only-lang {
            display: block;
            margin-top: 1rem;
          }
        }
      `}</style>
    </header>
  );
}
