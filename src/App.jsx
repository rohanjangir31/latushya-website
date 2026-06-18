import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import WhyChoose from './components/WhyChoose';
import Projects from './components/Projects';
import RecentProjects from './components/RecentProjects';
import BeforeAfter from './components/BeforeAfter';
import Materials from './components/Materials';
import Process from './components/Process';
import CredibilityBand from './components/Statistics';
import Testimonials from './components/Testimonials';
import Gallery from './components/Gallery';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { COMPANY } from './data/content';

// Preloader
function Preloader() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="fixed inset-0 z-[200] bg-black-deep flex flex-col items-center justify-center"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center"
      >
        <span className="font-display text-4xl tracking-ultra text-white font-light mb-1">
          {COMPANY.name}
        </span>
        <span className="text-gold text-[10px] tracking-widest uppercase">
          Luxury Wardrobe Specialists · Bangalore
        </span>
        <div className="mt-10 w-40 h-px bg-gray-luxury/30 overflow-hidden">
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            transition={{ duration: 1.2, ease: 'easeInOut', repeat: Infinity }}
            className="h-full w-1/2 bg-gradient-to-r from-transparent via-gold to-transparent"
          />
        </div>
      </motion.div>
    </motion.div>
  );
}

// Floating WhatsApp button
function WhatsAppFloat() {
  if (!COMPANY.whatsapp) return null;

  return (
    <motion.a
      href={`https://wa.me/${COMPANY.whatsapp}?text=Hello%20Latushya!%20I%20need%20a%20custom%20wardrobe.`}
      target="_blank"
      rel="noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 3, duration: 0.5, type: 'spring' }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-24 right-6 lg:bottom-8 lg:right-8 z-50 w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow duration-300"
      aria-label="Chat on WhatsApp"
      id="floating-whatsapp"
    >
      <svg viewBox="0 0 24 24" fill="white" width="26" height="26">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
      </svg>
    </motion.a>
  );
}

// Scroll to top button
function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-24 left-6 lg:bottom-8 lg:left-8 z-50 w-10 h-10 border border-gold/40 hover:border-gold hover:bg-gold/10 flex items-center justify-center text-gold transition-all duration-300 group"
          aria-label="Scroll to top"
          id="scroll-to-top"
        >
          <span className="text-sm group-hover:-translate-y-0.5 transition-transform duration-300">↑</span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence>
        {loading && <Preloader />}
      </AnimatePresence>

      {!loading && (
        <>
          <Navbar />
          <main>
            {/* 1. Hero — wardrobe specialist positioning */}
            <Hero />

            {/* 2. About — honest, no fake stats */}
            <About />

            {/* 3. Services — wardrobe-only focus */}
            <Services />

            {/* 4. Credibility band — real trust signals, no fake numbers */}
            <CredibilityBand />

            {/* 5. Why Choose — real value propositions */}
            <WhyChoose />

            {/* 6. Portfolio — wardrobe categories with placeholder support */}
            <Projects />

            {/* 7. Recent Projects — structured for real project data */}
            <RecentProjects />

            {/* 8. Before & After — drag comparison slider */}
            <BeforeAfter />

            {/* 9. Materials & Hardware — Häfele, Hettich, Ebco, Century Ply */}
            <Materials />

            {/* 10. Process — 6-step journey */}
            <Process />

            {/* 11. Testimonials — placeholder until real reviews are collected */}
            <Testimonials />

            {/* 12. Gallery — wardrobe photography */}
            <Gallery />

            {/* 13. FAQ — wardrobe-specific questions */}
            <FAQ />

            {/* 14. Contact — placeholder-aware, no fake contact info */}
            <Contact />
          </main>
          <Footer />

          {/* Floating WhatsApp — only renders when number is set */}
          <WhatsAppFloat />

          {/* Scroll to top */}
          <ScrollToTop />
        </>
      )}
    </>
  );
}
