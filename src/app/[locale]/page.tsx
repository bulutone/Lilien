import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import About from '@/components/About';
import Regions from '@/components/Regions';
import WhyUs from '@/components/WhyUs';
import Testimonials from '@/components/Testimonials';
import Footer from '@/components/Footer';
import FloatingContact from '@/components/FloatingContact';

export default function HomePage({ params }: { params: { locale: string } }) {
    // To enable static rendering
    setRequestLocale(params.locale);
    const t = useTranslations();

    return (
        <>
            <Header />
            <main>
                <Hero />
                <Services />
                <Regions />
                <About />
                <WhyUs />
                <Testimonials />
            </main>
            <Footer />
            <FloatingContact />
        </>
    );
}
