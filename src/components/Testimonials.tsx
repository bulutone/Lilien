'use client';

import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

export default function Testimonials() {
    const t = useTranslations('Testimonials');
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((current) => (current + 1) % 3);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="section bg-light">
            <div className="container">
                <div className="testimonials-grid">
                    <div className="section-header animate-fade-in-up">
                        <div className="rating">
                            <span className="stars">★★★★★</span>
                            <span className="rating-score">4.8</span>
                        </div>
                        <h2>{t('title')}</h2>
                        <div className="separator"></div>
                        <p className="rating-text">{t('ratingText')}</p>
                    </div>

                    <div className="carousel-container animate-fade-in-up delay-200">
                        <div className="testimonials-wrapper" style={{ transform: `translateX(-${activeIndex * 100}%)` }}>
                            {[0, 1, 2].map((i) => (
                                <div key={i} className="testimonial-card glass-panel">
                                    <p className="quote-text">"{t(`items.${i}.text` as any)}"</p>
                                    <div className="author-info">
                                        <div className="avatar">{t(`items.${i}.author` as any).charAt(0)}</div>
                                        <div>
                                            <h4>{t(`items.${i}.author` as any)}</h4>
                                            <span>{t(`items.${i}.location` as any)}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="carousel-dots">
                            {[0, 1, 2].map((i) => (
                                <button
                                    key={i}
                                    className={`dot ${i === activeIndex ? 'active' : ''}`}
                                    onClick={() => setActiveIndex(i)}
                                    aria-label={`Slide ${i + 1}`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
        .bg-light {
          background-color: var(--bg-light);
        }
        .testimonials-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 4rem;
          align-items: center;
        }
        @media (min-width: 992px) {
          .testimonials-grid {
            grid-template-columns: 1fr 1fr;
          }
        }
        
        .section-header {
          max-width: 500px;
        }
        .rating {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1rem;
        }
        .stars {
          color: #FFB800;
          font-size: 1.5rem;
          letter-spacing: 2px;
        }
        .rating-score {
          font-family: var(--font-heading);
          font-weight: 800;
          font-size: 2rem;
          color: var(--text-main);
        }
        .separator {
          width: 60px;
          height: 4px;
          background: var(--primary);
          margin-bottom: 1.5rem;
          border-radius: 2px;
        }
        .rating-text {
          font-size: 1.125rem;
          color: var(--text-muted);
        }
        
        .carousel-container {
          overflow: hidden;
          padding: 1rem 0;
        }
        .testimonials-wrapper {
          display: flex;
          transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .testimonial-card {
          min-width: 100%;
          padding: 3rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          background: var(--bg-white);
        }
        .quote-text {
          font-size: 1.25rem;
          line-height: 1.8;
          color: var(--text-main);
          font-style: italic;
          margin-bottom: 2rem;
          position: relative;
        }
        .quote-text::before {
          content: '"';
          position: absolute;
          top: -2rem;
          left: -1rem;
          font-size: 6rem;
          color: var(--primary-light);
          font-family: serif;
          z-index: 0;
          line-height: 1;
        }
        .author-info {
          display: flex;
          align-items: center;
          gap: 1rem;
          position: relative;
          z-index: 1;
        }
        .avatar {
          width: 50px;
          height: 50px;
          background: var(--primary);
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 1.25rem;
        }
        .author-info h4 {
          margin: 0 0 0.25rem;
          font-size: 1rem;
        }
        .author-info span {
          color: var(--text-muted);
          font-size: 0.875rem;
        }
        
        .carousel-dots {
          display: flex;
          justify-content: center;
          gap: 0.5rem;
          margin-top: 2rem;
        }
        .dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: var(--text-muted);
          opacity: 0.3;
          border: none;
          cursor: pointer;
          transition: all var(--transition-fast);
        }
        .dot.active {
          opacity: 1;
          background: var(--primary);
          transform: scale(1.3);
        }
      `}</style>
        </section>
    );
}
