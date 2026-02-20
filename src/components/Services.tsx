'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';

export default function Services() {
  const t = useTranslations('Services');
  const tData = useTranslations('ServicesData');
  const tNav = useTranslations('Nav');

  const services = [
    {
      id: 'oto',
      slugKey: 'oto-cilingir',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 16H9m10 0h3v-3.15a1 1 0 0 0-.84-.99L16 11l-2.7-3.6a2 2 0 0 0-1.6-.8H5a2 2 0 0 0-2 2v7.55a1 1 0 0 0 1 1h2m14 0a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm-10 0a2 2 0 1 1-4 0 2 2 0 0 1 4 0z"></path></svg>
      )
    },
    {
      id: 'konut',
      slugKey: 'konut-cilingir',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
      )
    },
    {
      id: 'ticari',
      slugKey: 'ticari-cilingir',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect><path d="M9 22v-4h6v4"></path><path d="M8 6h.01"></path><path d="M16 6h.01"></path><path d="M12 6h.01"></path><path d="M12 10h.01"></path><path d="M12 14h.01"></path><path d="M16 10h.01"></path><path d="M16 14h.01"></path><path d="M8 10h.01"></path><path d="M8 14h.01"></path></svg>
      )
    }
  ];

  return (
    <section id="services" className="section bg-light">
      <div className="container">
        <div className="text-center section-header">
          <h2>{t('title')}</h2>
          <div className="separator"></div>
        </div>

        <div className="services-grid">
          {services.map((service, idx) => (
            <div key={service.id} className="service-card glass-panel" style={{ animationDelay: `${idx * 150}ms` }}>
              <div className="service-icon">
                {service.icon}
              </div>
              <h3>{t(`${service.id}.title` as any)}</h3>
              <ul className="service-list">
                {[0, 1, 2].map((i) => (
                  <li key={i}>
                    <svg className="check-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    <div>
                      <strong>{t(`${service.id}.items.${i}.q` as any)}</strong>
                      <p>{t(`${service.id}.items.${i}.a` as any)}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <div style={{ marginTop: '2rem', textAlign: 'center' }}>
                <Link href={`/hizmetler/${tData(`${service.slugKey}.slug` as any)}`} className="btn btn-secondary" style={{ display: 'inline-block', width: '100%' }}>
                  {tNav('details')}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .bg-light {
          background-color: var(--bg-white);
          position: relative;
        }
        .section-header {
          margin-bottom: 4rem;
        }
        .separator {
          width: 80px;
          height: 4px;
          background: var(--primary);
          margin: 1rem auto;
          border-radius: 2px;
        }
        .services-grid {
          display: grid;
          grid-template-columns: repeat(1, 1fr);
          gap: 2rem;
        }
        @media (min-width: 768px) {
          .services-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }
        .service-card {
          padding: 2.5rem 2rem;
          transition: transform var(--transition-normal), box-shadow var(--transition-normal);
        }
        .service-card:hover {
          transform: translateY(-10px);
          box-shadow: var(--shadow-xl);
        }
        .service-icon {
          width: 70px;
          height: 70px;
          background: rgba(255, 107, 53, 0.1);
          color: var(--primary);
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.5rem;
          transform: rotate(-5deg);
          transition: transform var(--transition-normal);
        }
        .service-card:hover .service-icon {
          transform: rotate(0deg) scale(1.1);
          background: var(--primary);
          color: white;
        }
        .service-list {
          margin-top: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }
        .service-list li {
          display: flex;
          gap: 0.75rem;
          align-items: flex-start;
        }
        .check-icon {
          color: var(--primary);
          flex-shrink: 0;
          margin-top: 0.25rem;
        }
        .service-list strong {
          display: block;
          color: var(--text-main);
          font-size: 1rem;
          margin-bottom: 0.25rem;
        }
        .service-list p {
          font-size: 0.9rem;
          margin: 0;
          color: var(--text-muted);
        }
      `}</style>
    </section>
  );
}
