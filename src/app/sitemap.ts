import { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';
import trMessages from '../../messages/tr.json';
import enMessages from '../../messages/en.json';
import deMessages from '../../messages/de.json';
import ruMessages from '../../messages/ru.json';

const host = 'https://antalyacilingirci.com';
const localeMessages: Record<string, any> = {
    tr: trMessages,
    en: enMessages,
    de: deMessages,
    ru: ruMessages
};

function withLocalePrefix(locale: string, path: string) {
    const prefix = locale === routing.defaultLocale ? '' : `/${locale}`;
    return `${host}${prefix}${path}`;
}

export default function sitemap(): MetadataRoute.Sitemap {
    const entries: MetadataRoute.Sitemap = [];
    const now = new Date();
    const seen = new Set<string>();

    const pushUrl = (url: string, changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'], priority: number) => {
        if (seen.has(url)) return;
        seen.add(url);
        entries.push({
            url,
            lastModified: now,
            changeFrequency,
            priority
        });
    };

    // 1. Home pages for all locales
    routing.locales.forEach(locale => {
        pushUrl(withLocalePrefix(locale, ''), 'weekly', 1);
    });

    // 2. Service pages from actual translated slugs
    routing.locales.forEach(locale => {
        const messages = localeMessages[locale];
        const servicesData = messages?.ServicesData ?? {};
        Object.values(servicesData).forEach((service: any) => {
            if (!service?.slug) return;
            pushUrl(withLocalePrefix(locale, `/hizmetler/${service.slug}`), 'monthly', 0.8);
        });
    });

    // 3. Region + neighborhood pages from actual translated data
    routing.locales.forEach(locale => {
        const messages = localeMessages[locale];
        const regionsData = messages?.RegionsData ?? {};

        Object.values(regionsData).forEach((region: any) => {
            if (!region?.slug) return;

            const regionPath = `/bolgeler/${region.slug}`;
            pushUrl(withLocalePrefix(locale, regionPath), 'monthly', 0.8);

            const neighborhoodPages = region?.neighborhoodPages ?? {};
            Object.keys(neighborhoodPages).forEach((neighborhoodSlug) => {
                pushUrl(withLocalePrefix(locale, `${regionPath}/${neighborhoodSlug}`), 'monthly', 0.6);
            });
        });
    });

    return entries;
}
