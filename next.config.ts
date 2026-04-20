import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  output: 'standalone',
  async redirects() {
    return [
      // Legacy WordPress URLs
      { source: '/hello-world', destination: '/', permanent: true },
      { source: '/hello-world/', destination: '/', permanent: true },
      { source: '/author/:slug*', destination: '/', permanent: true },
      { source: '/category/:slug*', destination: '/', permanent: true },

      // Legacy translated region slugs
      { source: '/en/bolgeler/muratpasa-cilingir', destination: '/en/bolgeler/muratpasa-locksmith', permanent: true },
      { source: '/de/bolgeler/muratpasa-cilingir', destination: '/de/bolgeler/muratpasa-schlusseldienst', permanent: true },
      { source: '/ru/bolgeler/muratpasa-cilingir', destination: '/ru/bolgeler/slesar-muratpasha', permanent: true },

      { source: '/en/bolgeler/muratpasa-cilingir/:slug', destination: '/en/bolgeler/muratpasa-locksmith/:slug', permanent: true },
      { source: '/de/bolgeler/muratpasa-cilingir/:slug', destination: '/de/bolgeler/muratpasa-schlusseldienst/:slug', permanent: true },
      { source: '/ru/bolgeler/muratpasa-cilingir/:slug', destination: '/ru/bolgeler/slesar-muratpasha/:slug', permanent: true },

      { source: '/bolgeler/slesar-lara/:slug', destination: '/bolgeler/lara-cilingir/:slug', permanent: true },
      { source: '/en/bolgeler/slesar-lara/:slug', destination: '/en/bolgeler/lara-locksmith/:slug', permanent: true },
      { source: '/de/bolgeler/slesar-lara/:slug', destination: '/de/bolgeler/lara-schlusseldienst/:slug', permanent: true },

      { source: '/bolgeler/slesar-kundu/:slug', destination: '/bolgeler/kundu-cilingir/:slug', permanent: true },
      { source: '/en/bolgeler/slesar-kundu/:slug', destination: '/en/bolgeler/kundu-locksmith/:slug', permanent: true },
      { source: '/de/bolgeler/slesar-kundu/:slug', destination: '/de/bolgeler/kundu-schlusseldienst/:slug', permanent: true },

      { source: '/bolgeler/slesar-aksu', destination: '/bolgeler/kundu-cilingir', permanent: true },
      { source: '/en/bolgeler/slesar-aksu', destination: '/en/bolgeler/kundu-locksmith', permanent: true },
      { source: '/de/bolgeler/slesar-aksu', destination: '/de/bolgeler/kundu-schlusseldienst', permanent: true },

      { source: '/bolgeler/slesar-kepez', destination: '/bolgeler/muratpasa-cilingir', permanent: true },
      { source: '/en/bolgeler/slesar-kepez', destination: '/en/bolgeler/muratpasa-locksmith', permanent: true },
      { source: '/de/bolgeler/slesar-kepez', destination: '/de/bolgeler/muratpasa-schlusseldienst', permanent: true },

      { source: '/en/bolgeler/kepez-cilingir', destination: '/en/bolgeler/muratpasa-locksmith', permanent: true },
      { source: '/de/bolgeler/kepez-cilingir', destination: '/de/bolgeler/muratpasa-schlusseldienst', permanent: true },
      { source: '/ru/bolgeler/kepez-cilingir', destination: '/ru/bolgeler/slesar-muratpasha', permanent: true },

      // Legacy translated service slugs
      { source: '/hizmetler/tresoroffnung', destination: '/de/hizmetler/tresoroffnung', permanent: true },
      { source: '/ru/hizmetler/tresoroffnung', destination: '/ru/hizmetler/vskrytie-sejfov', permanent: true },
      { source: '/de/hizmetler/wohnungs-schlusseldienst', destination: '/de/hizmetler/wohn-schlusseldienst', permanent: true },
      { source: '/ru/hizmetler/kommercheskiy-slesar', destination: '/ru/hizmetler/kommercheskij-slesar', permanent: true }
    ];
  }
};

export default withNextIntl(nextConfig);
