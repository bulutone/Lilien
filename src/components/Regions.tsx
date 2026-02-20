'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';

export default function Regions() {
  const t = useTranslations('Regions');
  const tData = useTranslations('RegionsData');

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
    <section className="section regions-section">
      <div className="container">
        <div className="regions-container glass-panel">
          <div className="text-center section-header">
            <h2>{t('title')}</h2>
            <p className="subtitle">{t('subtitle')}</p>
          </div>

          <div className="regions-grid">
            {areaKeys.map((idx) => (
              <Link href={`/bolgeler/${tData(`${idx}.slug` as any)}`} key={idx} className="region-badge animate-fade-in-up" style={{ animationDelay: '100ms' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                {tData(`${idx}.title` as any).split(' ')[0]}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .regions-section {
          padding: 4rem 0;
        }
        .regions-container {
          padding: 4rem 2rem;
          background: linear-gradient(to right, rgba(15, 23, 42, 0.95), rgba(0, 78, 137, 0.95));
          border-radius: 2rem;
          color: white;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
          position: relative;
          overflow: hidden;
        }
        .regions-container::before {
          content: '';
          position: absolute;
          inset: 0;
          background: url('https://www.transparenttextures.com/patterns/cubes.png');
          opacity: 0.05;
          z-index: 0;
        }
        .section-header, .regions-grid {
          position: relative;
          z-index: 1;
        }
        .section-header {
          margin-bottom: 3rem;
        }
        .section-header h2 {
          color: white;
          margin-bottom: 0.5rem;
        }
        .subtitle {
          color: rgba(255,255,255,0.8);
          font-size: 1.125rem;
        }
        .regions-grid {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 1rem;
        }
        .region-badge {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.5rem;
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(4px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 9999px;
          font-weight: 600;
          font-size: 1.125rem;
          transition: all 0.3s ease;
          cursor: default;
        }
        .region-badge:hover {
          background: var(--primary);
          border-color: var(--primary);
          transform: translateY(-3px);
          box-shadow: 0 10px 15px -3px rgba(255, 107, 53, 0.4);
        }
        .region-badge svg {
          color: var(--accent);
        }
        .region-badge:hover svg {
          color: white;
        }
      `}</style>
    </section>
  );
}
