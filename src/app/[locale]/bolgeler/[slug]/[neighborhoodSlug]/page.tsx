import { getTranslations, getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingContact from '@/components/FloatingContact';

const REGION_KEYS = ['muratpasa-cilingir', 'lara-cilingir', 'kundu-cilingir'];
const BASE_URL = 'https://antalyacilingirci.com';

function localizedPath(locale: string, path: string) {
    return locale === 'tr' ? path : `/${locale}${path}`;
}

async function findRegionAndNeighborhood(locale: string, regionSlug: string, neighborhoodSlug: string) {
    const messages = await getMessages({ locale }) as any;
    const regionsData = messages?.RegionsData;
    if (!regionsData) return null;

    for (const regionKey of REGION_KEYS) {
        const region = regionsData[regionKey];
        if (region?.slug === regionSlug) {
            const neighborhood = region.neighborhoodPages?.[neighborhoodSlug];
            if (neighborhood) {
                return { regionKey, region, neighborhoodSlug, neighborhood };
            }
        }
    }
    return null;
}

export async function generateMetadata({ params }: any) {
    const { locale, slug, neighborhoodSlug } = await params;
    const data = await findRegionAndNeighborhood(locale, slug, neighborhoodSlug);
    if (!data) return {};

    return {
        title: data.neighborhood.seoTitle,
        description: data.neighborhood.seoDesc,
        alternates: { canonical: `${BASE_URL}${localizedPath(locale, `/bolgeler/${slug}/${neighborhoodSlug}`)}` }
    };
}

export default async function NeighborhoodPage({ params }: any) {
    const { locale, slug, neighborhoodSlug } = await params;
    const data = await findRegionAndNeighborhood(locale, slug, neighborhoodSlug);
    if (!data) notFound();

    const { region, neighborhood } = data;
    const tPage = await getTranslations({ locale, namespace: 'RegionPage' });

    return (
        <>
            <Header />
            <main className="page-content" style={{ paddingTop: '100px', minHeight: '60vh', paddingBottom: '60px' }}>
                {/* Hero Section */}
                <section style={{ background: 'linear-gradient(135deg, #0f172a 0%, #004e89 100%)', padding: '4rem 0', color: 'white', marginBottom: '3rem' }}>
                    <div className="container" style={{ maxWidth: '900px', margin: '0 auto', padding: '0 20px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem', opacity: 0.8 }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                            <span>{region.title}, Antalya</span>
                        </div>
                        <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, lineHeight: 1.2, marginBottom: '1rem', color: 'white' }}>{neighborhood.title}</h1>
                        <p style={{ fontSize: '1.15rem', opacity: 0.85, lineHeight: 1.7, maxWidth: '700px' }}>{neighborhood.seoDesc}</p>
                    </div>
                </section>

                <div className="container" style={{ maxWidth: '900px', margin: '0 auto', padding: '0 20px' }}>
                    <div style={{ marginBottom: '3rem' }}>
                        <h2 style={{ fontSize: '1.75rem', marginBottom: '1.5rem', color: 'var(--text-main)' }}>
                            7/24 {neighborhood.title} Hizmeti
                        </h2>
                        <p style={{ fontSize: '1.1rem', lineHeight: 1.9, color: 'var(--text-main)' }}>
                            {neighborhood.content}
                        </p>
                    </div>

                    {/* Additional Content Block */}
                    <div className="glass-panel" style={{ padding: '2rem', marginBottom: '3rem' }}>
                        <h3 style={{ color: 'var(--text-main)' }}>Neden {neighborhood.title} İçin Bizi Seçmelisiniz?</h3>
                        <p style={{ color: 'var(--text-muted)' }}>
                            Antalya Çilingirci olarak {neighborhood.title} mahallesindeki tüm kilit ve güvenlik sorunlarınıza profesyonel çözümler sunuyoruz.
                            Gecenin bir yarısı kapıda mı kaldınız? Yoksa aracınızın anahtarını mı kaybettiniz?
                            Deneyimli ustalarımızla sadece 10-15 dakika içinde kapınızdayız.
                        </p>
                    </div>

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
                        <h3 style={{ marginBottom: '1rem', fontSize: '1.5rem', color: 'white' }}>
                            {neighborhood.title} bölgesinde acil çilingir mi lazım?
                        </h3>
                        <p style={{ marginBottom: '1.5rem', opacity: 0.85, color: 'white' }}>Hemen arayın, dakikalar içinde yanınızda olalım.</p>
                        <a href="tel:+905471985007" className="btn btn-primary btn-lg" style={{
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
