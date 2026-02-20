import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import Script from 'next/script';
import { Inter } from 'next/font/google';
import '../globals.css';

const inter = Inter({
    subsets: ['latin', 'cyrillic', 'latin-ext'],
    display: 'swap',
    variable: '--font-inter'
});


const BASE_URL = 'https://antalyacilingirci.com';

export function generateStaticParams() {
    return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: any) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'Metadata' });

    const isDefault = locale === 'tr';
    const url = isDefault ? BASE_URL : `${BASE_URL}/${locale}`;

    const languages: Record<string, string> = {};
    routing.locales.forEach(l => {
        languages[l] = l === 'tr' ? BASE_URL : `${BASE_URL}/${l}`;
    });
    languages['x-default'] = BASE_URL;

    return {
        title: t('title'),
        description: t('description'),
        metadataBase: new URL(BASE_URL),
        alternates: {
            canonical: url,
            languages
        },
        openGraph: {
            title: t('title'),
            description: t('description'),
            url,
            siteName: 'Antalya Çilingirci',
            locale: locale === 'tr' ? 'tr_TR' : locale === 'en' ? 'en_US' : locale === 'de' ? 'de_DE' : 'ru_RU',
            type: 'website',
            images: [{
                url: `${BASE_URL}/logo.png`,
                width: 1024,
                height: 432,
                alt: 'Antalya Çilingirci Logo'
            }]
        },
        twitter: {
            card: 'summary_large_image',
            title: t('title'),
            description: t('description'),
            images: [`${BASE_URL}/logo.png`]
        },
        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
                'max-video-preview': -1,
                'max-image-preview': 'large' as const,
                'max-snippet': -1,
            },
        },
        verification: {},
        other: {
            'geo.region': 'TR-07',
            'geo.placename': 'Antalya',
        }
    };
}

export default async function LocaleLayout({
    children,
    params
}: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;

    if (!routing.locales.includes(locale as any)) {
        notFound();
    }

    const messages = await getMessages();
    const t = await getTranslations({ locale, namespace: 'FAQ' });

    // Build FAQ items from translations
    const faqItems: { q: string; a: string }[] = [];
    for (let i = 0; i < 6; i++) {
        try {
            faqItems.push({
                q: t(`items.${i}.q` as any),
                a: t(`items.${i}.a` as any)
            });
        } catch { break; }
    }

    const localBusinessSchema = {
        "@context": "https://schema.org",
        "@type": "Locksmith",
        "@id": `${BASE_URL}/#locksmith`,
        "name": "Antalya Çilingirci",
        "image": `${BASE_URL}/logo.png`,
        "url": BASE_URL,
        "telephone": "+905468558680",
        "priceRange": "$$",
        "description": locale === 'tr'
            ? "Antalya genelinde 7/24 acil çilingir hizmeti. Oto çilingir, kasa açma, kapı açma ve kilit değişimi."
            : "24/7 emergency locksmith service across Antalya. Auto locksmith, safe opening, door opening and lock replacement.",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "Antalya Merkez",
            "addressLocality": "Antalya",
            "addressRegion": "Antalya",
            "postalCode": "07000",
            "addressCountry": "TR"
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": 36.8969,
            "longitude": 30.7133
        },
        "areaServed": [
            { "@type": "City", "name": "Antalya" },
            { "@type": "AdministrativeArea", "name": "Muratpaşa" },
            { "@type": "AdministrativeArea", "name": "Kepez" },
            { "@type": "AdministrativeArea", "name": "Konyaaltı" },
            { "@type": "AdministrativeArea", "name": "Döşemealtı" },
            { "@type": "AdministrativeArea", "name": "Aksu" },
            { "@type": "AdministrativeArea", "name": "Lara" },
            { "@type": "AdministrativeArea", "name": "Kundu" },
            { "@type": "AdministrativeArea", "name": "Kemer" }
        ],
        "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": locale === 'tr' ? "Çilingir Hizmetleri" : "Locksmith Services",
            "itemListElement": [
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": locale === 'tr' ? "Oto Çilingir" : "Auto Locksmith"
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": locale === 'tr' ? "Konut Çilingir" : "Residential Locksmith"
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": locale === 'tr' ? "Ticari Çilingir" : "Commercial Locksmith"
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": locale === 'tr' ? "Kasa Açma" : "Safe Opening"
                    }
                }
            ]
        },
        "openingHoursSpecification": {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
            "opens": "00:00",
            "closes": "23:59"
        },
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.8",
            "ratingCount": "2500",
            "bestRating": "5",
            "worstRating": "1"
        },
        "sameAs": []
    };

    const faqSchema = faqItems.length > 0 ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqItems.map(item => ({
            "@type": "Question",
            "name": item.q,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": item.a
            }
        }))
    } : null;

    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": "Ana Sayfa",
                "item": BASE_URL
            }
        ]
    };

    const organizationSchema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Antalya Çilingirci",
        "url": BASE_URL,
        "logo": `${BASE_URL}/logo.png`,
        "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+905468558680",
            "contactType": "customer service",
            "availableLanguage": ["Turkish", "English", "German", "Russian"],
            "areaServed": "TR"
        }
    };

    return (
        <html lang={locale} className={inter.className}>
            <head>
                {/* Google Tag Manager */}
                <Script id="google-tag-manager" strategy="afterInteractive">
                    {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-NDH3RT36');
          `}
                </Script>
            </head>
            <body>
                {/* Google Tag Manager (noscript) */}
                <noscript>
                    <iframe
                        src="https://www.googletagmanager.com/ns.html?id=GTM-NDH3RT36"
                        height="0" width="0" style={{ display: 'none', visibility: 'hidden' }}>
                    </iframe>
                </noscript>

                {/* LocalBusiness + Locksmith Schema */}
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />

                {/* FAQ Schema */}
                {faqSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />}

                {/* Breadcrumb Schema */}
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

                {/* Organization Schema */}
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />

                <NextIntlClientProvider messages={messages}>
                    {children}
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
