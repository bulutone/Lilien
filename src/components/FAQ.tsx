'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';

export default function FAQ() {
    const t = useTranslations('FAQ');
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const items = Array.from({ length: 6 }, (_, i) => i);

    return (
        <section id="faq" className="section">
            <div className="container">
                <div className="text-center section-header">
                    <h2>{t('title')}</h2>
                    <div className="separator"></div>
                </div>

                <div className="faq-list">
                    {items.map((i) => (
                        <div key={i} className={`faq-item ${openIndex === i ? 'open' : ''}`}>
                            <button
                                className="faq-question"
                                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                                aria-expanded={openIndex === i}
                            >
                                <span>{t(`items.${i}.q` as any)}</span>
                                <svg className="faq-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points={openIndex === i ? "18 15 12 9 6 15" : "6 9 12 15 18 9"}></polyline>
                                </svg>
                            </button>
                            <div className="faq-answer" style={{ maxHeight: openIndex === i ? '500px' : '0' }}>
                                <p>{t(`items.${i}.a` as any)}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <style jsx>{`
        .section-header {
          margin-bottom: 3rem;
        }
        .separator {
          width: 80px;
          height: 4px;
          background: var(--primary);
          margin: 1rem auto;
          border-radius: 2px;
        }
        .faq-list {
          max-width: 800px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .faq-item {
          background: var(--bg-white);
          border-radius: 1rem;
          border: 1px solid var(--glass-border);
          overflow: hidden;
          transition: all 0.3s ease;
        }
        .faq-item.open {
          border-color: rgba(255, 107, 53, 0.3);
          box-shadow: 0 4px 20px rgba(255, 107, 53, 0.08);
        }
        .faq-question {
          width: 100%;
          padding: 1.25rem 1.5rem;
          background: none;
          border: none;
          cursor: pointer;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 1rem;
          font-size: 1.05rem;
          font-weight: 600;
          color: var(--text-main);
          text-align: left;
          font-family: var(--font-sans);
          transition: color 0.2s;
        }
        .faq-question:hover {
          color: var(--primary);
        }
        .faq-icon {
          flex-shrink: 0;
          color: var(--primary);
          transition: transform 0.3s ease;
        }
        .faq-answer {
          overflow: hidden;
          transition: max-height 0.4s ease;
        }
        .faq-answer p {
          padding: 0 1.5rem 1.25rem;
          color: var(--text-muted);
          line-height: 1.7;
          margin: 0;
        }
      `}</style>
        </section>
    );
}
