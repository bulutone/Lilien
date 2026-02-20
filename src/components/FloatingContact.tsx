'use client';

export default function FloatingContact() {
  const trackClick = (type: 'whatsapp' | 'call') => {
    if (typeof window !== 'undefined' && (window as any).dataLayer) {
      (window as any).dataLayer.push({
        event: 'contact_click',
        contact_method: type,
        location: 'floating_widget'
      });
    }
  };

  return (
    <>
      <div className="floating-contact">
        <a href="https://wa.me/905468558680"
          className="float-btn float-wa"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="WhatsApp"
          onClick={() => trackClick('whatsapp')}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
        </a>
        <a href="tel:+905468558680"
          className="float-btn float-call"
          aria-label="Hemen Ara"
          onClick={() => trackClick('call')}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
        </a>
      </div>
      <style jsx>{`
        .floating-contact {
          position: fixed;
          bottom: 2rem;
          right: 2rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          z-index: 99;
        }
        .float-btn {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          box-shadow: 0 10px 25px rgba(0,0,0,0.15);
          transition: all var(--transition-normal);
        }
        .float-wa {
          background-color: #25D366;
        }
        .float-wa:hover {
          background-color: #128C7E;
          transform: translateY(-5px);
          box-shadow: 0 15px 30px rgba(37, 211, 102, 0.4);
        }
        .float-call {
          background-color: var(--primary);
        }
        .float-call:hover {
          background-color: var(--primary-hover);
          transform: translateY(-5px);
          box-shadow: 0 15px 30px rgba(255, 107, 53, 0.4);
        }
        
        @media (max-width: 768px) {
          .floating-contact {
            bottom: 1rem;
            right: 1rem;
            flex-direction: row;
          }
          .float-btn {
            width: 50px;
            height: 50px;
          }
          .float-btn svg {
            width: 24px;
            height: 24px;
          }
        }
      `}</style>
    </>
  );
}
