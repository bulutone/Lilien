import { getTranslations, getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingContact from '@/components/FloatingContact';

const SERVICE_KEYS = ['oto-cilingir', 'kasa-acma', 'konut-cilingir', 'ticari-cilingir'];

async function findServiceKey(locale: string, slug: string): Promise<string | null> {
    const messages = await getMessages({ locale }) as any;
    const servicesData = messages?.ServicesData;
    if (!servicesData) return null;
    for (const key of SERVICE_KEYS) {
        if (servicesData[key]?.slug === slug) return key;
    }
    return null;
}

export async function generateMetadata({ params }: any) {
    const { locale, slug } = await params;
    const serviceKey = await findServiceKey(locale, slug);
    if (!serviceKey) return {};

    const t = await getTranslations({ locale, namespace: 'ServicesData' });
    try {
        return {
            title: t(`${serviceKey}.seoTitle` as any),
            description: t(`${serviceKey}.seoDesc` as any),
            alternates: { canonical: `/${locale}/hizmetler/${slug}` }
        };
    } catch (e) {
        return {};
    }
}

export default async function ServicePage({ params }: any) {
    const { locale, slug } = await params;
    const serviceKey = await findServiceKey(locale, slug);
    if (!serviceKey) notFound();

    const messages = await getMessages({ locale }) as any;
    const service = messages.ServicesData[serviceKey];
    const tPage = await getTranslations({ locale, namespace: 'ServicePage' });

    const title = service.title;
    const content = service.content;
    const steps: { title: string; desc: string }[] = service.steps || [];
    const faq: { q: string; a: string }[] = service.faq || [];

    return (
        <>
            <Header />
            <main className="page-content" style={{ paddingTop: '100px', minHeight: '60vh', paddingBottom: '60px' }}>

                {/* Hero */}
                <section style={{ background: 'linear-gradient(135deg, #0f172a 0%, #004e89 100%)', padding: '4rem 0', color: 'white', marginBottom: '3rem' }}>
                    <div className="container" style={{ maxWidth: '900px', margin: '0 auto', padding: '0 20px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem', opacity: 0.8 }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path></svg>
                            <span>Antalya</span>
                        </div>
                        <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, lineHeight: 1.2, marginBottom: '1rem' }}>{title}</h1>
                        <p style={{ fontSize: '1.15rem', opacity: 0.85, lineHeight: 1.7, maxWidth: '700px' }}>{service.seoDesc}</p>
                        <div style={{ display: 'flex', gap: '0.75rem', marginTop: '2rem', flexWrap: 'wrap' }}>
                            <span style={{ background: 'rgba(255,107,53,0.2)', color: '#ff6b35', padding: '0.5rem 1rem', borderRadius: '999px', fontWeight: 600, fontSize: '0.9rem' }}>
                                7/24
                            </span>
                        </div>
                    </div>
                </section>

                <div className="container" style={{ maxWidth: '900px', margin: '0 auto', padding: '0 20px' }}>

                    {/* JSON-LD */}
                    <script
                        type="application/ld+json"
                        dangerouslySetInnerHTML={{
                            __html: JSON.stringify({
                                "@context": "https://schema.org",
                                "@type": "Service",
                                "serviceType": title,
                                "provider": { "@type": "LocalBusiness", "name": "Antalya Çilingirci", "telephone": "+905468558680" },
                                "areaServed": { "@type": "City", "name": "Antalya" },
                                "description": content
                            })
                        }}
                    />

                    {/* Content */}
                    <div style={{ marginBottom: '3rem' }}>
                        <p style={{ fontSize: '1.1rem', lineHeight: 1.9, color: '#444' }}>{content}</p>
                    </div>

                    {/* Steps Timeline */}
                    {steps.length > 0 && (
                        <div style={{ marginBottom: '3rem' }}>
                            <h2 style={{ fontSize: '1.5rem', marginBottom: '2rem', color: '#111' }}>
                                {tPage('stepsTitle')}
                            </h2>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1.25rem' }}>
                                {steps.map((step, i) => (
                                    <div key={i} style={{
                                        background: '#fff',
                                        border: '1px solid #e2e8f0',
                                        borderRadius: '1rem',
                                        padding: '1.5rem',
                                        position: 'relative',
                                        boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
                                    }}>
                                        <div style={{
                                            width: '36px', height: '36px',
                                            background: 'linear-gradient(135deg, #ff6b35, #ff8c42)',
                                            borderRadius: '50%',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            color: 'white', fontWeight: 800, fontSize: '0.9rem',
                                            marginBottom: '1rem'
                                        }}>{i + 1}</div>
                                        <h3 style={{ fontSize: '1.05rem', marginBottom: '0.5rem', color: '#111' }}>{step.title}</h3>
                                        <p style={{ fontSize: '0.9rem', color: '#666', lineHeight: 1.6, margin: 0 }}>{step.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* FAQ Section */}
                    {faq.length > 0 && (
                        <div style={{ marginBottom: '3rem' }}>
                            <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: '#111' }}>
                                {tPage('faqTitle')}
                            </h2>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                {faq.map((item, i) => (
                                    <div key={i} style={{
                                        background: '#f8fafc',
                                        border: '1px solid #e2e8f0',
                                        borderRadius: '1rem',
                                        padding: '1.25rem 1.5rem'
                                    }}>
                                        <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#111', marginBottom: '0.5rem' }}>
                                            {item.q}
                                        </h3>
                                        <p style={{ fontSize: '0.95rem', color: '#555', lineHeight: 1.7, margin: 0 }}>
                                            {item.a}
                                        </p>
                                    </div>
                                ))}
                            </div>

                            {/* FAQ Schema for SEO */}
                            <script
                                type="application/ld+json"
                                dangerouslySetInnerHTML={{
                                    __html: JSON.stringify({
                                        "@context": "https://schema.org",
                                        "@type": "FAQPage",
                                        "mainEntity": faq.map(item => ({
                                            "@type": "Question",
                                            "name": item.q,
                                            "acceptedAnswer": { "@type": "Answer", "text": item.a }
                                        }))
                                    })
                                }}
                            />
                        </div>
                    )}

                    {/* CTA */}
                    <div style={{
                        padding: '3rem',
                        background: 'linear-gradient(135deg, #0f172a, #004e89)',
                        borderRadius: '1.25rem',
                        textAlign: 'center',
                        color: 'white',
                        boxShadow: '0 10px 30px rgba(0,78,137,0.3)',
                        marginBottom: '2rem'
                    }}>
                        <h3 style={{ marginBottom: '1rem', fontSize: '1.5rem' }}>{tPage('ctaTitle')}</h3>
                        <p style={{ marginBottom: '1.5rem', opacity: 0.85 }}>{tPage('ctaDesc')}</p>
                        <a href="tel:+905468558680" className="btn btn-primary btn-lg" style={{
                            display: 'inline-flex', alignItems: 'center', gap: '8px',
                            fontSize: '1.1rem', padding: '14px 32px', background: '#ff6b35', border: 'none'
                        }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                            {tPage('ctaBtn')}
                        </a>
                    </div>
                </div>
            </main>
            <Footer />
            <FloatingContact />
        </>
    );
}
