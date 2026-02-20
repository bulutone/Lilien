import { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';

const host = 'https://antalyacilingirci.com';

const servicesSlugs: Record<string, Record<string, string>> = {
    tr: {
        'oto': 'oto-cilingir',
        'kasa': 'kasa-acma',
        'konut': 'konut-cilingir',
        'ticari': 'ticari-cilingir'
    },
    en: {
        'oto': 'auto-locksmith',
        'kasa': 'safe-opening',
        'konut': 'residential-locksmith',
        'ticari': 'commercial-locksmith'
    }
};

const regionsSlugs: Record<string, Record<string, string>> = {
    tr: {
        'muratpasa': 'muratpasa-cilingir',
        'kepez': 'kepez-cilingir',
        'konyaalti': 'konyaalti-cilingir',
        'dosemealti': 'dosemealti-cilingir',
        'aksu': 'aksu-cilingir',
        'lara': 'lara-cilingir',
        'kundu': 'kundu-cilingir',
        'kemer': 'kemer-cilingir'
    },
    en: {
        'muratpasa': 'muratpasa-locksmith',
        'kepez': 'kepez-locksmith',
        'konyaalti': 'konyaalti-locksmith',
        'dosemealti': 'dosemealti-locksmith',
        'aksu': 'aksu-locksmith',
        'lara': 'lara-locksmith',
        'kundu': 'kundu-locksmith',
        'kemer': 'kemer-locksmith'
    }
};

function getSlug(type: 'services' | 'regions', key: string, locale: string) {
    const dictionary = type === 'services' ? servicesSlugs : regionsSlugs;
    return dictionary[locale]?.[key] || dictionary['tr'][key];
}

export default function sitemap(): MetadataRoute.Sitemap {
    const entries: MetadataRoute.Sitemap = [];

    // 1. Home Pages
    routing.locales.forEach(locale => {
        const isDefault = locale === routing.defaultLocale;
        entries.push({
            url: isDefault ? `${host}` : `${host}/${locale}`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 1
        });
    });

    // 2. Service Pages
    routing.locales.forEach(locale => {
        const prefix = locale === routing.defaultLocale ? '' : `/${locale}`;
        Object.keys(servicesSlugs.tr).forEach(key => {
            const slug = getSlug('services', key, locale);
            entries.push({
                url: `${host}${prefix}/hizmetler/${slug}`,
                lastModified: new Date(),
                changeFrequency: 'monthly',
                priority: 0.8
            });
        });
    });

    // 3. Region Pages
    routing.locales.forEach(locale => {
        const prefix = locale === routing.defaultLocale ? '' : `/${locale}`;
        Object.keys(regionsSlugs.tr).forEach(key => {
            const slug = getSlug('regions', key, locale);
            entries.push({
                url: `${host}${prefix}/bolgeler/${slug}`,
                lastModified: new Date(),
                changeFrequency: 'monthly',
                priority: 0.8
            });
        });
    });

    return entries;
}
