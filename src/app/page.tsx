import Preloader from '@/components/home/Preloader';
import Hero from '@/components/home/Hero';
import StatsStrip from '@/components/home/StatsStrip';
import Manifesto from '@/components/home/Manifesto';
import ServicesGrid from '@/components/home/ServicesGrid';
import BigWords from '@/components/home/BigWords';
import Process from '@/components/home/Process';
import Decrypt from '@/components/home/Decrypt';
import Arsenal from '@/components/home/Arsenal';
import Promises from '@/components/home/Promises';

export default function Home() {
    return (
        <main className="home">
            <Preloader />
            <Hero />
            <StatsStrip />
            <Manifesto />
            <ServicesGrid />
            <BigWords />
            <Process />
            <Decrypt />
            <Arsenal />
            <Promises />
        </main>
    );
}
