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
        if (servicesData[key]?.slug === slug) {
            return key;
        }
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

    const t = await getTranslations({ locale, namespace: 'ServicesData' });
    const tPage = await getTranslations({ locale, namespace: 'ServicePage' });

    const title = t(`${serviceKey}.title` as any);
    const content = t(`${serviceKey}.content` as any);

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
                                "@type": "Service",
                                "serviceType": title,
                                "provider": {
                                    "@type": "LocalBusiness",
                                    "name": "Antalya Çilingirci",
                                    "telephone": "+905468558680"
                                },
                                "areaServed": {
                                    "@type": "City",
                                    "name": "Antalya"
                                },
                                "description": content
                            })
                        }}
                    />

                    <div style={{ marginBottom: '40px' }}>
                        <h1 style={{ fontSize: '2.5rem', marginBottom: '20px', color: '#111', fontWeight: 800, lineHeight: 1.2 }}>{title}</h1>
                        <div style={{ width: '60px', height: '4px', background: 'var(--primary)', borderRadius: '2px', marginBottom: '24px' }}></div>
                        <p style={{ fontSize: '1.15rem', lineHeight: '1.8', color: '#444' }}>
                            {content}
                        </p>
                    </div>

                    <div style={{ padding: '40px', background: 'white', borderRadius: '16px', textAlign: 'center', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', border: '1px solid rgba(0,0,0,0.05)' }}>
                        <h3 style={{ marginBottom: '15px', fontSize: '1.5rem', color: '#111' }}>{tPage('ctaTitle')}</h3>
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
