'use client';

import { useTranslations } from 'next-intl';

export default function WhyUs() {
    const t = useTranslations('WhyUs');

    const icons = [
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>,
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>,
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>,
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
    ];

    return (
        <section id="why-us" className="section">
            <div className="container">
                <div className="text-center section-header">
                    <div className="badge animate-fade-in-up">✅</div>
                    <h2>{t('title')}</h2>
                    <div className="separator"></div>
                </div>

                <div className="features-grid">
                    {[0, 1, 2, 3].map((i) => (
                        <div key={i} className="feature-card animate-fade-in-up" style={{ animationDelay: `${i * 150}ms` }}>
                            <div className="feature-icon">
                                {icons[i]}
                            </div>
                            <h3>{t(`items.${i}.title` as any)}</h3>
                            <p>{t(`items.${i}.desc` as any)}</p>
                        </div>
                    ))}
                </div>
            </div>

            <style jsx>{`
        .section-header {
          margin-bottom: 4rem;
        }
        .badge {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 48px;
          height: 48px;
          background: rgba(255, 107, 53, 0.1);
          border-radius: 50%;
          font-size: 1.5rem;
          margin-bottom: 1rem;
        }
        .separator {
          width: 80px;
          height: 4px;
          background: var(--primary);
          margin: 1rem auto;
          border-radius: 2px;
        }
        .features-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2rem;
        }
        @media (min-width: 576px) {
          .features-grid {
            grid-template-columns: 1fr 1fr;
          }
        }
        @media (min-width: 992px) {
          .features-grid {
            grid-template-columns: repeat(4, 1fr);
          }
        }
        
        .feature-card {
          padding: 2rem;
          background: var(--bg-white);
          border-radius: 1.5rem;
          box-shadow: var(--shadow-md);
          border: 1px solid var(--glass-border);
          transition: all var(--transition-normal);
          text-align: center;
        }
        .feature-card:hover {
          transform: translateY(-5px);
          box-shadow: var(--shadow-xl);
          border-color: rgba(255, 107, 53, 0.2);
        }
        
        .feature-icon {
          width: 64px;
          height: 64px;
          margin: 0 auto 1.5rem;
          background: linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%);
          color: white;
          border-radius: 1rem;
          display: flex;
          align-items: center;
          justify-content: center;
          transform: rotate(-10deg);
          transition: transform var(--transition-normal);
        }
        .feature-card:hover .feature-icon {
          transform: rotate(0deg) scale(1.1);
        }
        
        .feature-card h3 {
          font-size: 1.25rem;
          margin-bottom: 1rem;
        }
        
        .feature-card p {
          font-size: 0.95rem;
          margin-bottom: 0;
        }
      `}</style>
        </section>
    );
}
