import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import About from '@/components/About';
import Regions from '@/components/Regions';
import WhyUs from '@/components/WhyUs';
import Testimonials from '@/components/Testimonials';
import FAQ from '@/components/FAQ';
import ContactForm from '@/components/ContactForm';
import GoogleReviews from '@/components/GoogleReviews';
import Footer from '@/components/Footer';
import FloatingContact from '@/components/FloatingContact';

export default async function HomePage({ params }: any) {
    const { locale } = await params;

    return (
        <>
            <Header />
            <main>
                <Hero />
                <Services />
                <Regions />
                <About />
                <WhyUs />
                <GoogleReviews />
                <Testimonials />
                <ContactForm />
                <FAQ />
            </main>
            <Footer />
            <FloatingContact />
        </>
    );
}
