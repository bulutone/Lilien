'use client';

import { useTranslations } from 'next-intl';

export default function About() {
  const t = useTranslations('About');

  return (
    <section id="about" className="section bg-pattern">
      <div className="container">
        <div className="about-grid">
          <div className="about-image-wrapper">
            <div className="about-image-box animate-fade-in-up">
              {/* Using a placeholder for styling if we don't have the explicit image, but we can make it an aesthetic glass card right now */}
              <div className="image-overlay">
                <div className="years-badge">
                  <span className="years-number">15+</span>
                  <span className="years-text">Yıllık<br />Tecrübe</span>
                </div>
              </div>
            </div>
            <div className="backdrop-blob"></div>
          </div>

          <div className="about-content animate-fade-in-up delay-200">
            <div className="section-subtitle">{t('titlePrefix')}</div>
            <h2>{t('title')}</h2>
            <div className="separator"></div>

            <p className="lead-text">{t('desc1')}</p>
            <p>{t('desc2')}</p>

            <h4 className="offers-title">{t('offersTitle')}</h4>
            <ul className="offers-list">
              {[0, 1, 2, 3].map((i) => (
                <li key={i}>
                  <div className="icon-wrapper">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  </div>
                  {t(`offers.${i}` as any)}
                </li>
              ))}
            </ul>

            <p className="closing-text">{t('closing')}</p>
          </div>
        </div>
      </div>

      <style jsx>{`
        .bg-pattern {
          background-color: var(--bg-light);
          position: relative;
          overflow: hidden;
        }
        .about-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 4rem;
          align-items: center;
        }
        @media (min-width: 992px) {
          .about-grid {
            grid-template-columns: 1fr 1fr;
          }
        }
        
        .about-image-wrapper {
          position: relative;
          height: 100%;
          min-height: 500px;
        }
        
        .backdrop-blob {
          position: absolute;
          width: 90%;
          height: 90%;
          background: linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%);
          border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 0;
          opacity: 0.15;
          animation: blob 8s infinite alternate ease-in-out;
        }
        
        @keyframes blob {
          0% { border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%; }
          100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
        }
        
        .about-image-box {
          position: absolute;
          inset: 10%;
          background: url('https://images.unsplash.com/photo-1558002038-1055907df827?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80') center/cover no-repeat;
          border-radius: 2rem;
          z-index: 1;
          box-shadow: var(--shadow-2xl);
          overflow: hidden;
        }
        
        .image-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0, 78, 137, 0.8), transparent 50%);
          display: flex;
          align-items: flex-end;
          padding: 2rem;
        }
        
        .years-badge {
          background: var(--glass-bg);
          backdrop-filter: var(--glass-blur);
          -webkit-backdrop-filter: var(--glass-blur);
          padding: 1.5rem;
          border-radius: 1rem;
          display: flex;
          align-items: center;
          gap: 1rem;
          color: var(--primary);
          border: 1px solid var(--glass-border);
        }
        .years-number {
          font-size: 3rem;
          font-weight: 800;
          font-family: var(--font-heading);
          line-height: 1;
        }
        .years-text {
          font-weight: 600;
          line-height: 1.2;
          color: var(--text-main);
        }
        
        .section-subtitle {
          color: var(--primary);
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 2px;
          margin-bottom: 0.5rem;
          font-size: 0.875rem;
        }
        .separator {
          width: 60px;
          height: 4px;
          background: var(--primary);
          margin-bottom: 1.5rem;
          border-radius: 2px;
        }
        .lead-text {
          font-size: 1.125rem;
          font-weight: 500;
          color: var(--text-main);
        }
        
        .offers-title {
          margin-top: 2rem;
          margin-bottom: 1rem;
          font-size: 1.25rem;
        }
        .offers-list {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1rem;
          margin-bottom: 2rem;
        }
        @media (min-width: 576px) {
          .offers-list {
            grid-template-columns: 1fr 1fr;
          }
        }
        
        .offers-list li {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-weight: 500;
          color: var(--text-main);
        }
        
        .icon-wrapper {
          width: 28px;
          height: 28px;
          background: rgba(255, 107, 53, 0.1);
          color: var(--primary);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        
        .closing-text {
          padding-top: 1.5rem;
          border-top: 1px solid var(--glass-border);
          font-style: italic;
          color: var(--text-muted);
        }
      `}</style>
    </section>
  );
}
