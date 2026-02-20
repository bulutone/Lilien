'use client';

import { useTranslations } from 'next-intl';

export default function Hero() {
  const t = useTranslations('Hero');

  const trackClick = (type: 'whatsapp' | 'call') => {
    if (typeof window !== 'undefined' && (window as any).dataLayer) {
      (window as any).dataLayer.push({
        event: 'contact_click',
        contact_method: type,
        location: 'hero_section'
      });
    }
  };

  return (
    <section className="hero">
      <div className="hero-bg">
        <div className="glow glow-1"></div>
        <div className="glow glow-2"></div>
      </div>

      <div className="container">
        <div className="hero-content text-center animate-fade-in-up">
          <div className="badge delay-100">
            <span className="dot"></span>
            7/24 Kesintisiz Hizmet
          </div>
          <h1 className="hero-title delay-200">
            {t('titlePrefix')} <span className="text-primary">Çilingir</span> Hizmeti<br />
            Acil Kapı Açma
          </h1>
          <p className="hero-desc delay-300">
            Antalya'nın her yerine 15 dakikada ulaşıyor, kapıda kalma derdinize
            hızlı, güvenli ve profesyonel çözümler üretiyoruz.
          </p>

          <div className="hero-actions delay-300">
            <a href="tel:+905468558680" className="btn btn-primary btn-lg" onClick={() => trackClick('call')}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
              {t('cta')}
            </a>
            <a href="https://wa.me/905468558680" target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-lg" onClick={() => trackClick('whatsapp')}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
              WhatsApp'tan Yaz
            </a>
          </div>
        </div>
      </div>

      {/* We use global jsx styles or regular css since Next.js supports component CSS but styled-jsx is great here */}
      <style jsx>{`
        .hero {
          position: relative;
          padding: 12rem 0 8rem;
          min-height: 90vh;
          display: flex;
          align-items: center;
          overflow: hidden;
        }
        .hero-bg {
          position: absolute;
          inset: 0;
          z-index: -1;
          overflow: hidden;
          background: radial-gradient(circle at center, var(--primary-light) 0%, var(--bg-light) 100%);
        }
        .glow {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          opacity: 0.5;
        }
        .glow-1 {
          width: 600px;
          height: 600px;
          background: rgba(255, 107, 53, 0.15);
          top: -100px;
          right: -100px;
        }
        .glow-2 {
          width: 500px;
          height: 500px;
          background: rgba(0, 78, 137, 0.1);
          bottom: -100px;
          left: -100px;
        }
        .hero-content {
          max-width: 800px;
          margin: 0 auto;
        }
        .badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          background: rgba(255, 107, 53, 0.1);
          color: var(--primary);
          border-radius: 9999px;
          font-weight: 600;
          font-size: 0.875rem;
          margin-bottom: 2rem;
        }
        .dot {
          width: 8px;
          height: 8px;
          background: var(--primary);
          border-radius: 50%;
          animation: pulse 2s infinite;
        }
        .hero-title {
          font-size: clamp(2.5rem, 5vw, 4.5rem);
          margin-bottom: 1.5rem;
        }
        .hero-desc {
          font-size: 1.125rem;
          margin-bottom: 3rem;
          color: var(--text-muted);
          max-width: 600px;
          margin-inline: auto;
        }
        .hero-actions {
          display: flex;
          gap: 1rem;
          justify-content: center;
          flex-wrap: wrap;
        }
        .btn-lg {
          padding: 1rem 2rem;
          font-size: 1.125rem;
        }
        @keyframes pulse {
          0% { box-shadow: 0 0 0 0 rgba(255, 107, 53, 0.4); }
          70% { box-shadow: 0 0 0 6px rgba(255, 107, 53, 0); }
          100% { box-shadow: 0 0 0 0 rgba(255, 107, 53, 0); }
        }
      `}</style>
    </section>
  );
}
