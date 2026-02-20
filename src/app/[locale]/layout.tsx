import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import Script from 'next/script';
import '../globals.css';

export function generateStaticParams() {
    return routing.locales.map((locale) => ({ locale }));
}

export const metadata = {
    title: "Antalya Çilingirci | 7/24 Acil Kapı Açma ve Kilit Değişimi",
    description: "Antalya genelinde profesyonel çilingir hizmeti. 7/24 oto çilingir, kasa açma, konut ve ticari kilit sistemleri. Hemen arayın: 0 546 855 86 80",
};

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

    setRequestLocale(locale);
    const messages = await getMessages();

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": "Antalya Çilingirci",
        "image": "https://antalyacilingirci.com/logo.png",
        "@id": "https://antalyacilingirci.com",
        "url": "https://antalyacilingirci.com",
        "telephone": "+905468558680",
        "priceRange": "$$",
        "address": {
            "@type": "PostalAddress",
            "addressLocality": "Antalya",
            "addressRegion": "Antalya",
            "addressCountry": "TR"
        },
        "openingHoursSpecification": {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
            "opens": "00:00",
            "closes": "23:59"
        }
    };

    return (
        <html lang={locale}>
            <head>
                {/* Google Tag Manager - REPLACE GTM-XXXXXXX WITH ACTUAL ID */}
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

                {/* JSON-LD Schema */}
                <Script id="json-ld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

                <NextIntlClientProvider messages={messages}>
                    {children}
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
