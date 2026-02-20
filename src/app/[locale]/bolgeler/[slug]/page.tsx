import { getTranslations, getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingContact from '@/components/FloatingContact';

// All region keys in RegionsData
const REGION_KEYS = [
    'muratpasa-cilingir', 'kepez-cilingir', 'konyaalti-cilingir',
    'dosemealti-cilingir', 'aksu-cilingir', 'lara-cilingir',
    'kundu-cilingir', 'kemer-cilingir'
];

// Find the RegionsData key that matches the given slug
async function findRegionKey(locale: string, slug: string): Promise<string | null> {
    const messages = await getMessages({ locale }) as any;
    const regionsData = messages?.RegionsData;
    if (!regionsData) return null;

    for (const key of REGION_KEYS) {
        if (regionsData[key]?.slug === slug) {
            return key;
        }
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

    const t = await getTranslations({ locale, namespace: 'RegionsData' });
    const tPage = await getTranslations({ locale, namespace: 'RegionPage' });

    const title = t(`${regionKey}.title` as any);
    const desc = t(`${regionKey}.seoDesc` as any);
    const regionName = title.split(' ')[0];

    return (
        <>
            <Header />
            <main className="page-content" style={{ paddingTop: '120px', minHeight: '60vh', paddingBottom: '60px', backgroundColor: '#fcfcfc' }}>
                <div className="container" style={{ maxWidth: '800px', margin: '0 auto', padding: '0 20px' }}>

                    <script
                        type="application/ld+json"
                        dangerouslySetInnerHTML={{
                            __html: JSON.stringify({
                                "@context": "https://schema.org",
                                "@type": "LocalBusiness",
                                "name": title,
                                "description": desc,
                                "areaServed": {
                                    "@type": "AdministrativeArea",
                                    "name": regionName
                                },
                                "telephone": "+905468558680"
                            })
                        }}
                    />

                    <div style={{ marginBottom: '40px' }}>
                        <h1 style={{ fontSize: '2.5rem', marginBottom: '20px', color: '#111', fontWeight: 800, lineHeight: 1.2 }}>{title}</h1>
                        <div style={{ width: '60px', height: '4px', background: 'var(--primary)', borderRadius: '2px', marginBottom: '24px' }}></div>
                        <p style={{ fontSize: '1.15rem', lineHeight: '1.8', color: '#444', marginBottom: '20px' }}>
                            {desc}
                        </p>
                        <p style={{ fontSize: '1.15rem', lineHeight: '1.8', color: '#444' }}>
                            {tPage('bodyText', { region: regionName })}
                        </p>
                    </div>

                    <div style={{ padding: '40px', background: 'white', borderRadius: '16px', textAlign: 'center', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', border: '1px solid rgba(0,0,0,0.05)' }}>
                        <h3 style={{ marginBottom: '15px', fontSize: '1.5rem', color: '#111' }}>{tPage('ctaTitle', { region: regionName })}</h3>
                        <p style={{ marginBottom: '24px', color: '#666' }}>{tPage('ctaDesc')}</p>
                        <a href="tel:+905468558680" className="btn btn-primary btn-lg" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '1.1rem', padding: '14px 28px' }}>
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
