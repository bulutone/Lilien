'use client';

import { useTranslations } from 'next-intl';

export default function GoogleReviews() {
    const t = useTranslations('GoogleReviews');

    const reviews = [0, 1, 2, 3, 4].map(i => ({
        name: t(`items.${i}.name` as any),
        text: t(`items.${i}.text` as any),
        rating: 5,
        time: t(`items.${i}.time` as any),
    }));

    return (
        <section className="section google-reviews-section">
            <div className="container">
                <div className="text-center section-header animate-fade-in-up">
                    <div className="gr-header">
                        <div className="google-logo">
                            <svg viewBox="0 0 24 24" width="28" height="28">
                                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
                                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                            </svg>
                        </div>
                        <div>
                            <h2>{t('title')}</h2>
                            <div className="gr-stars">
                                {[1, 2, 3, 4, 5].map(s => (
                                    <svg key={s} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="#FBBC05" stroke="#FBBC05" strokeWidth="1"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                                ))}
                                <span className="gr-rating">{t('rating')}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="reviews-grid">
                    {reviews.map((review, i) => (
                        <div key={i} className="review-card animate-fade-in-up" style={{ animationDelay: `${i * 100}ms` }}>
                            <div className="review-header">
                                <div className="review-avatar">{review.name.charAt(0)}</div>
                                <div>
                                    <div className="review-name">{review.name}</div>
                                    <div className="review-time">{review.time}</div>
                                </div>
                            </div>
                            <div className="review-stars">
                                {[1, 2, 3, 4, 5].map(s => (
                                    <svg key={s} xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill={s <= review.rating ? '#FBBC05' : '#ddd'} stroke={s <= review.rating ? '#FBBC05' : '#ddd'} strokeWidth="1"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                                ))}
                            </div>
                            <p className="review-text">{review.text}</p>
                        </div>
                    ))}
                </div>
            </div>

            <style jsx>{`
        .google-reviews-section { background: #f8fafc; }
        .section-header { margin-bottom: 3rem; }
        .gr-header { display: flex; align-items: center; gap: 1rem; justify-content: center; }
        .google-logo {
          width: 48px; height: 48px;
          background: white; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
        .gr-header h2 { margin: 0; text-align: left; }
        .gr-stars { display: flex; align-items: center; gap: 0.25rem; }
        .gr-rating { font-weight: 700; font-size: 1rem; color: #333; margin-left: 0.5rem; }
        .reviews-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 1.25rem;
        }
        .review-card {
          background: white;
          border-radius: 1rem;
          padding: 1.5rem;
          border: 1px solid #e2e8f0;
          box-shadow: 0 2px 8px rgba(0,0,0,0.04);
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .review-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 24px rgba(0,0,0,0.08);
        }
        .review-header { display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.75rem; }
        .review-avatar {
          width: 40px; height: 40px;
          background: linear-gradient(135deg, #4285F4, #34A853);
          color: white; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-weight: 700; font-size: 1rem;
        }
        .review-name { font-weight: 700; color: #111; font-size: 0.95rem; }
        .review-time { font-size: 0.8rem; color: #999; }
        .review-stars { margin-bottom: 0.75rem; display: flex; gap: 0.1rem; }
        .review-text { font-size: 0.9rem; color: #555; line-height: 1.6; margin: 0; }
        @media (max-width: 768px) {
          .gr-header { flex-direction: column; }
          .gr-header h2 { text-align: center; }
          .gr-stars { justify-content: center; }
        }
      `}</style>
        </section>
    );
}
