import { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';

const host = 'https://antalyacilingirci.com';

// Slug mappings for all locales
const servicesSlugs: Record<string, Record<string, string>> = {
    tr: { 'oto': 'oto-cilingir', 'kasa': 'kasa-acma', 'konut': 'konut-cilingir', 'ticari': 'ticari-cilingir' },
    en: { 'oto': 'auto-locksmith', 'kasa': 'safe-opening', 'konut': 'residential-locksmith', 'ticari': 'commercial-locksmith' },
    de: { 'oto': 'auto-schlusseldienst', 'kasa': 'tresoroffnung', 'konut': 'wohnungs-schlusseldienst', 'ticari': 'gewerbe-schlusseldienst' },
    ru: { 'oto': 'avto-slesar', 'kasa': 'vskrytiye-seyfa', 'konut': 'kvartirnyy-slesar', 'ticari': 'kommercheskiy-slesar' }
};

const regionsSlugs: Record<string, Record<string, string>> = {
    tr: {
        'muratpasa': 'muratpasa-cilingir', 'lara': 'lara-cilingir',
        'kundu': 'kundu-cilingir'
    },
    en: {
        'muratpasa': 'muratpasa-locksmith', 'lara': 'lara-locksmith',
        'kundu': 'kundu-locksmith'
    },
    de: {
        'muratpasa': 'muratpasa-schlusseldienst', 'lara': 'lara-schlusseldienst',
        'kundu': 'kundu-schlusseldienst'
    },
    ru: {
        'muratpasa': 'slesar-muratpasha', 'lara': 'slesar-lara',
        'kundu': 'slesar-kundu'
    }
};

function getSlug(type: 'services' | 'regions', key: string, locale: string) {
    const dictionary = type === 'services' ? servicesSlugs : regionsSlugs;
    return dictionary[locale]?.[key] || dictionary['tr'][key];
}

export default function sitemap(): MetadataRoute.Sitemap {
    const entries: MetadataRoute.Sitemap = [];

    // 1. Home Pages — all locales
    routing.locales.forEach(locale => {
        const isDefault = locale === routing.defaultLocale;
        entries.push({
            url: isDefault ? `${host}` : `${host}/${locale}`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 1
        });
    });

    // 2. Service Pages — all locales × all services
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

    // 3. Region Pages — all locales × all regions
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
