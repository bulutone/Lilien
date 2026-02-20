import { getTranslations, getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingContact from '@/components/FloatingContact';

const REGION_KEYS = [
    'muratpasa-cilingir', 'kepez-cilingir', 'konyaalti-cilingir',
    'dosemealti-cilingir', 'aksu-cilingir', 'lara-cilingir',
    'kundu-cilingir', 'kemer-cilingir'
];

async function findRegionKey(locale: string, slug: string): Promise<string | null> {
    const messages = await getMessages({ locale }) as any;
    const regionsData = messages?.RegionsData;
    if (!regionsData) return null;
    for (const key of REGION_KEYS) {
        if (regionsData[key]?.slug === slug) return key;
    }
    return null;
}

export async function generateMetadata({ params }: any) {
    const { locale, slug } = await params;
    const regionKey = await findRegionKey(locale, slug);
    if (!regionKey) return {};

    const t = await getTranslations({ locale, namespace: 'RegionsData' });
    try {
        return {
            title: t(`${regionKey}.seoTitle` as any),
            description: t(`${regionKey}.seoDesc` as any),
            alternates: { canonical: `/${locale}/bolgeler/${slug}` }
        };
    } catch (e) {
        return {};
    }
}

export default async function RegionPage({ params }: any) {
    const { locale, slug } = await params;
    const regionKey = await findRegionKey(locale, slug);
    if (!regionKey) notFound();

    const messages = await getMessages({ locale }) as any;
    const region = messages.RegionsData[regionKey];
    const tPage = await getTranslations({ locale, namespace: 'RegionPage' });

    const title = region.title;
    const regionName = title.split(' ')[0];
    const neighborhoods: string[] = region.neighborhoods || [];
    const services: string[] = region.availableServices || [];

    return (
        <>
            <Header />
            <main className="page-content" style={{ paddingTop: '100px', minHeight: '60vh', paddingBottom: '60px' }}>

                {/* Hero Section */}
                <section style={{ background: 'linear-gradient(135deg, #0f172a 0%, #004e89 100%)', padding: '4rem 0', color: 'white', marginBottom: '3rem' }}>
                    <div className="container" style={{ maxWidth: '900px', margin: '0 auto', padding: '0 20px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem', opacity: 0.8 }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                            <span>{regionName}, Antalya</span>
                        </div>
                        <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, lineHeight: 1.2, marginBottom: '1rem' }}>{title}</h1>
                        <p style={{ fontSize: '1.15rem', opacity: 0.85, lineHeight: 1.7, maxWidth: '700px' }}>{region.seoDesc}</p>
                        <div style={{ display: 'flex', gap: '0.75rem', marginTop: '2rem', flexWrap: 'wrap' }}>
                            <span style={{ background: 'rgba(255,107,53,0.2)', color: '#ff6b35', padding: '0.5rem 1rem', borderRadius: '999px', fontWeight: 600, fontSize: '0.9rem' }}>
                                ⏱ {region.responseTime}
                            </span>
                            <span style={{ background: 'rgba(255,255,255,0.1)', padding: '0.5rem 1rem', borderRadius: '999px', fontWeight: 600, fontSize: '0.9rem' }}>
                                📍 7/24
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
                                "@type": "LocalBusiness",
                                "name": title,
                                "description": region.longDesc || region.seoDesc,
                                "areaServed": { "@type": "AdministrativeArea", "name": regionName },
                                "telephone": "+905468558680",
                                "address": { "@type": "PostalAddress", "addressLocality": regionName, "addressRegion": "Antalya", "addressCountry": "TR" }
                            })
                        }}
                    />

                    {/* Long Description */}
                    <div style={{ marginBottom: '3rem' }}>
                        <p style={{ fontSize: '1.1rem', lineHeight: 1.9, color: '#444' }}>
                            {region.longDesc || tPage('bodyText', { region: regionName })}
                        </p>
                    </div>

                    {/* Neighborhoods Grid */}
                    {neighborhoods.length > 0 && (
                        <div style={{ marginBottom: '3rem' }}>
                            <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: '#111' }}>
                                📍 {tPage('neighborhoodsTitle', { region: regionName })}
                            </h2>
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
                                gap: '0.75rem'
                            }}>
                                {neighborhoods.map((n: string, i: number) => (
                                    <div key={i} style={{
                                        background: '#f8fafc',
                                        border: '1px solid #e2e8f0',
                                        borderRadius: '0.75rem',
                                        padding: '0.75rem 1rem',
                                        fontSize: '0.95rem',
                                        fontWeight: 500,
                                        color: '#334155',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.5rem'
                                    }}>
                                        <span style={{ color: '#ff6b35' }}>●</span>
                                        {n}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Available Services */}
                    {services.length > 0 && (
                        <div style={{ marginBottom: '3rem' }}>
                            <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: '#111' }}>
                                🔧 {tPage('servicesTitle', { region: regionName })}
                            </h2>
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
                                gap: '1rem'
                            }}>
                                {services.map((s: string, i: number) => (
                                    <div key={i} style={{
                                        background: 'white',
                                        border: '1px solid #e2e8f0',
                                        borderRadius: '1rem',
                                        padding: '1.25rem',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.75rem',
                                        boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                                        transition: 'transform 0.2s, box-shadow 0.2s'
                                    }}>
                                        <div style={{
                                            width: '36px', height: '36px', minWidth: '36px',
                                            background: 'linear-gradient(135deg, #ff6b35, #ff8c42)',
                                            borderRadius: '0.5rem',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            color: 'white', fontWeight: 700, fontSize: '0.85rem'
                                        }}>✓</div>
                                        <span style={{ fontWeight: 600, color: '#111', fontSize: '0.95rem' }}>{s}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* CTA Card */}
                    <div style={{
                        padding: '3rem',
                        background: 'linear-gradient(135deg, #0f172a, #004e89)',
                        borderRadius: '1.25rem',
                        textAlign: 'center',
                        color: 'white',
                        boxShadow: '0 10px 30px rgba(0,78,137,0.3)',
                        marginBottom: '2rem'
                    }}>
                        <h3 style={{ marginBottom: '1rem', fontSize: '1.5rem' }}>
                            {tPage('ctaTitle', { region: regionName })}
                        </h3>
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
