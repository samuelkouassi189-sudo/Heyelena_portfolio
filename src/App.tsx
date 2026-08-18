import React, { useEffect, useState } from 'react';
import Lenis from 'lenis';
import { Preloader } from './components/Preloader';
import { CustomCursor } from './components/CustomCursor';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Projects } from './components/Projects';
import { Services } from './components/Services';
import { VisualGallery } from './components/VisualGallery';
import { Socials } from './components/Socials';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

export const App: React.FC = () => {
  const [loading, setLoading] = useState(true);

  // Initialize Lenis Smooth Scroll with proper RAF management & window attachment
  useEffect(() => {
    if (loading) return;

    const lenis = new Lenis({
      duration: 0.9,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.1,
      touchMultiplier: 1.5,
    });

    (window as any).lenis = lenis;

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      delete (window as any).lenis;
    };
  }, [loading]);

  return (
    <>
      {/* Preloader overlay */}
      {loading && <Preloader onComplete={() => setLoading(false)} />}

      {/* Main Website Structure */}
      <div className={`min-h-screen bg-[#FAFAFD] text-[#0F172A] ${loading ? 'opacity-0' : 'opacity-100 transition-opacity duration-700'}`}>
        <CustomCursor />
        <Navbar />
        <main>
          <Hero />
          <About />
          <Projects />
          <Services />
          <VisualGallery />
          <Socials />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default App;
