import { useEffect } from 'react';
import Lenis from 'lenis';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ScrollProgress } from '@/components/ScrollProgress';
import { Hero } from '@/sections/Hero';
import { About } from '@/sections/About';
import { Products } from '@/sections/Products';
import { Dashboard } from '@/sections/Dashboard';
import { Partners } from '@/sections/Partners';
import { Technology } from '@/sections/Technology';
import { Achievements } from '@/sections/Achievements';
import { Vision } from '@/sections/Vision';
import { Corporate } from '@/sections/Corporate';
import { Contact } from '@/sections/Contact';

function useLenis() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
    });

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);
}

function App() {
  useLenis();

  return (
    <>
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Products />
        <Dashboard />
        <Partners />
        <Technology />
        <Achievements />
        <Vision />
        <Corporate />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

export default App;
