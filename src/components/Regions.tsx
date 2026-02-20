'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';

export default function Regions() {
  const t = useTranslations('Regions');
  const tData = useTranslations('RegionsData');
  const tNav = useTranslations('Nav');

  const areaKeys = [
    'muratpasa-cilingir',
    'kepez-cilingir',
    'konyaalti-cilingir',
    'dosemealti-cilingir',
    'aksu-cilingir',
    'lara-cilingir',
    'kundu-cilingir',
    'kemer-cilingir'
  ];

  return (
    <section id="regions" className="section regions-section">
      <div className="container">
        {/* Section header */}
        <div className="text-center section-header animate-fade-in-up">
          <div className="header-badge">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
          </div>
          <h2>{t('title')}</h2>
          <div className="separator"></div>
          <p className="subtitle">{t('subtitle')}</p>
        </div>

        {/* Region cards grid */}
        <div className="regions-grid">
          {areaKeys.map((key, i) => (
            <Link
              href={`/bolgeler/${tData(`${key}.slug` as any)}`}
              key={key}
              className="region-card animate-fade-in-up"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className="card-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
              </div>
              <div className="card-content">
                <h3>{tData(`${key}.title` as any)}</h3>
                <p className="card-desc">{tData(`${key}.shortDesc` as any)}</p>
                <div className="card-meta">
                  <span className="response-time">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                    {tData(`${key}.responseTime` as any)}
                  </span>
                  <span className="card-arrow">
                    {tNav('details')} →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom CTA strip */}
        <div className="cta-strip animate-fade-in-up">
          <div className="cta-content">
            <div className="cta-icon-pulse">
              <span className="pulse-ring"></span>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
            </div>
            <p>{t('ctaText')}</p>
          </div>
          <a href="tel:+905468558680" className="btn btn-primary">{t('ctaBtn')}</a>
        </div>
      </div>

      <style jsx>{`
        .regions-section {
          background: var(--bg-light);
        }
        .section-header {
          margin-bottom: 4rem;
        }
        .header-badge {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 48px;
          height: 48px;
          background: rgba(255, 107, 53, 0.1);
          border-radius: 50%;
          color: var(--primary);
          margin-bottom: 1rem;
        }
        .separator {
          width: 80px;
          height: 4px;
          background: var(--primary);
          margin: 1rem auto;
          border-radius: 2px;
        }
        .subtitle {
          font-size: 1.125rem;
          color: var(--text-muted);
          max-width: 500px;
          margin: 0 auto;
        }

        /* Region Cards Grid */
        .regions-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.25rem;
        }
        @media (min-width: 576px) {
          .regions-grid {
            grid-template-columns: 1fr 1fr;
          }
        }
        @media (min-width: 992px) {
          .regions-grid {
            grid-template-columns: repeat(4, 1fr);
          }
        }

        /* Individual card */
        .region-card {
          background: var(--bg-white);
          border: 1px solid var(--glass-border);
          border-radius: 1.25rem;
          padding: 1.5rem;
          text-decoration: none;
          color: inherit;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          position: relative;
          overflow: hidden;
        }
        .region-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(90deg, var(--primary), var(--accent));
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.3s ease;
        }
        .region-card:hover::before {
          transform: scaleX(1);
        }
        .region-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 40px -12px rgba(0, 78, 137, 0.15);
          border-color: rgba(255, 107, 53, 0.2);
        }

        .card-icon {
          width: 44px;
          height: 44px;
          background: linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%);
          color: white;
          border-radius: 0.75rem;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.3s ease;
        }
        .region-card:hover .card-icon {
          transform: scale(1.1) rotate(-5deg);
        }

        .card-content h3 {
          font-size: 1.1rem;
          margin: 0;
          color: var(--text-main);
        }
        .card-desc {
          font-size: 0.875rem;
          color: var(--text-muted);
          line-height: 1.5;
          margin: 0;
        }
        .card-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: auto;
          padding-top: 0.75rem;
          border-top: 1px solid var(--glass-border);
        }
        .response-time {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--primary);
        }
        .card-arrow {
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--text-muted);
          transition: color 0.2s;
        }
        .region-card:hover .card-arrow {
          color: var(--primary);
        }

        /* CTA Strip */
        .cta-strip {
          margin-top: 3rem;
          background: linear-gradient(135deg, rgba(15, 23, 42, 0.97), rgba(0, 78, 137, 0.97));
          border-radius: 1.25rem;
          padding: 2rem 2.5rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 2rem;
          flex-wrap: wrap;
          box-shadow: 0 10px 30px -10px rgba(0, 78, 137, 0.3);
        }
        .cta-content {
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        .cta-content p {
          color: rgba(255, 255, 255, 0.9);
          font-size: 1.05rem;
          font-weight: 500;
          margin: 0;
        }
        .cta-icon-pulse {
          position: relative;
          width: 44px;
          height: 44px;
          min-width: 44px;
          background: var(--primary);
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .pulse-ring {
          position: absolute;
          inset: -4px;
          border-radius: 50%;
          border: 2px solid var(--primary);
          animation: cta-pulse 2s infinite;
        }
        @keyframes cta-pulse {
          0% { transform: scale(1); opacity: 0.6; }
          100% { transform: scale(1.5); opacity: 0; }
        }
      `}</style>
    </section>
  );
}
