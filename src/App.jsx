import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Lenis from 'lenis';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Cursor from './components/Cursor';
import { CursorProvider } from './context/CursorContext';
import { COMPANY } from './data/content';
import GrainOverlay from './components/GrainOverlay';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Portfolio from './pages/Portfolio';
import Materials from './pages/Materials';
import Process from './pages/Process';
import Contact from './pages/Contact';

// Scroll to top on route change
function ScrollToTopRoute() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

// Preloader — 3D Logo & Shutter Reveal
function Preloader() {
  return (
    <motion.div
      className="fixed inset-0 z-[200] flex flex-col pointer-events-none"
    >
      {/* Top Shutter */}
      <motion.div
        initial={{ y: '0%' }}
        exit={{ y: '-100%' }}
        transition={{ duration: 1.0, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
        className="h-1/2 w-full bg-black-deep border-b border-gold/10"
      />
      {/* Bottom Shutter */}
      <motion.div
        initial={{ y: '0%' }}
        exit={{ y: '100%' }}
        transition={{ duration: 1.0, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
        className="h-1/2 w-full bg-black-deep border-t border-gold/10"
      />

      {/* Content Container (absolutely centered over the shutters) */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotateY: 90 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
          transition={{ 
            opacity: { duration: 0.8 },
            scale: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
            rotateY: { duration: 1.2, ease: [0.16, 1, 0.3, 1] },
            exit: { duration: 0.4 }
          }}
          className="flex flex-col items-center"
        >
          {/* Floating 3D Logo */}
          <motion.img 
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            src="/logo-3d.png" 
            alt="Latushya 3D Logo" 
            className="w-56 h-auto mb-8 drop-shadow-2xl" 
          />
          <span className="text-gold/80 text-[10px] tracking-[0.3em] uppercase">
            Premium Interior Studio
          </span>
          <div className="mt-8 w-48 h-px bg-gray-luxury/30 overflow-hidden relative">
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: '100%' }}
              transition={{ duration: 1.2, ease: 'easeInOut', repeat: Infinity }}
              className="absolute inset-y-0 w-1/2 bg-gradient-to-r from-transparent via-gold/80 to-transparent"
            />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

// Floating WhatsApp button
function WhatsAppFloat() {
  if (!COMPANY.whatsapp) return null;

  return (
    <motion.a
      href={`https://wa.me/${COMPANY.whatsapp}?text=Hello%20Latushya!%20I%20need%20a%20consultation.`}
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

function AppContent() {
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  // Initialize Lenis smooth scroll with luxurious settings
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.6, // Slower, heavier scroll
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      smoothTouch: false,
      touchMultiplier: 2,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <GrainOverlay />
      <ScrollToTopRoute />
      <Cursor />
      
      <AnimatePresence mode="wait">
        {loading && <Preloader key="preloader" />}
      </AnimatePresence>

      {!loading && (
        <>
          <Navbar />
          <main>
            <AnimatePresence mode="wait">
              <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/services" element={<Services />} />
                <Route path="/portfolio" element={<Portfolio />} />
                <Route path="/materials" element={<Materials />} />
                <Route path="/process" element={<Process />} />
                <Route path="/contact" element={<Contact />} />
              </Routes>
            </AnimatePresence>
          </main>
          <Footer />
          <WhatsAppFloat />
          <ScrollToTop />
        </>
      )}
    </>
  );
}

export default function App() {
  return (
    <CursorProvider>
      <Router>
        <AppContent />
      </Router>
    </CursorProvider>
  );
}
