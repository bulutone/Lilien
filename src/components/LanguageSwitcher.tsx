'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/routing';
import { ChangeEvent, useTransition } from 'react';

export default function LanguageSwitcher() {
    const [isPending, startTransition] = useTransition();
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();

    function onSelectChange(event: ChangeEvent<HTMLSelectElement>) {
        const nextLocale = event.target.value;
        startTransition(() => {
            router.replace(pathname, { locale: nextLocale });
        });
    }

    return (
        <div className="lang-switcher">
            <select
                defaultValue={locale}
                disabled={isPending}
                onChange={onSelectChange}
                className="lang-select"
            >
                <option value="tr">🇹🇷 TR</option>
                <option value="en">🇬🇧 EN</option>
                <option value="ru">🇷🇺 RU</option>
                <option value="de">🇩🇪 DE</option>
            </select>
            <style jsx>{`
        .lang-switcher {
          position: relative;
        }
        .lang-select {
          appearance: none;
          background: transparent;
          border: 1px solid var(--glass-border);
          border-radius: 8px;
          padding: 0.4rem 2rem 0.4rem 0.8rem;
          font-family: var(--font-sans);
          font-size: 0.9rem;
          font-weight: 500;
          color: var(--text-main);
          cursor: pointer;
          outline: none;
          transition: border-color var(--transition-fast);
        }
        .lang-select:focus {
          border-color: var(--primary);
        }
        .lang-switcher::after {
          content: '▼';
          font-size: 0.6rem;
          position: absolute;
          right: 0.8rem;
          top: 50%;
          transform: translateY(-50%);
          pointer-events: none;
          color: var(--text-muted);
        }
      `}</style>
        </div>
    );
}
