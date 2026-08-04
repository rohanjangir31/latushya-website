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
import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  render() {
    if (this.state.hasError) {
      return <div style={{color:'red', padding:'50px', zIndex:9999, position:'relative'}}>
        <h1>Something went wrong.</h1>
        <pre>{this.state.error.toString()}</pre>
        <pre>{this.state.error.stack}</pre>
      </div>;
    }
    return this.props.children;
  }
}

// Scroll to top or specific hash on route change
function ScrollToTopRoute() {
  const location = useLocation();
  const { pathname, hash } = location;
  
  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '');
      let attempts = 0;
      
      const checkAndScroll = setInterval(() => {
        const element = document.getElementById(id);
        if (element) {
          const y = element.getBoundingClientRect().top + window.scrollY;
          window.scrollTo({ top: y, behavior: 'smooth' });
          clearInterval(checkAndScroll);
        }
        
        attempts++;
        if (attempts > 30) {
          clearInterval(checkAndScroll);
        }
      }, 100);

      return () => clearInterval(checkAndScroll);
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  // Global click listener for when a user clicks a link to the EXACT same hash they are already on
  useEffect(() => {
    const handleSamePageHashClick = (e) => {
      const a = e.target.closest('a');
      if (!a || !a.href) return;
      
      try {
        const url = new URL(a.href);
        // If the link points to the exact same path we are currently on
        if (url.pathname === location.pathname && url.hash === location.hash) {
          e.preventDefault(); // Prevent default browser jump
          
          if (url.hash) {
            const id = url.hash.replace('#', '');
            const element = document.getElementById(id);
            if (element) {
              const y = element.getBoundingClientRect().top + window.scrollY;
              window.scrollTo({ top: y, behavior: 'smooth' });
            }
          } else {
            // No hash, so they clicked a link to the current page (e.g. Quick Links). Scroll to top.
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }
      } catch (err) {
        // Ignore invalid URLs
      }
    };

    document.addEventListener('click', handleSamePageHashClick);
    return () => document.removeEventListener('click', handleSamePageHashClick);
  }, [location]);
  
  return null;
}

// Preloader — Editorial 2D Logo & Staggered Architectural Panels Reveal
function Preloader() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = 100;
    const duration = 1600; // 1.6s smooth count up
    const startTime = performance.now();

    const updateProgress = (currentTime) => {
      const elapsed = currentTime - startTime;
      const t = Math.min(1, elapsed / duration);
      // Ease out cubic for realistic decelerating progress
      const easeOut = 1 - Math.pow(1 - t, 3);
      const current = Math.floor(start + (end - start) * easeOut);
      
      setProgress(current);

      if (t < 1) {
        requestAnimationFrame(updateProgress);
      }
    };

    const animationFrame = requestAnimationFrame(updateProgress);
    return () => cancelAnimationFrame(animationFrame);
  }, []);

  return (
    <motion.div className="fixed inset-0 z-[200] pointer-events-auto select-none overflow-hidden">
      {/* 5 Staggered Architectural Panels (Wardrobe Sliding Partition Concept) */}
      <div className="absolute inset-0 grid grid-cols-5 pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ y: '0%' }}
            exit={{ y: '-101%' }}
            transition={{
              duration: 0.95,
              ease: [0.76, 0, 0.24, 1],
              delay: 0.15 + i * 0.08,
            }}
            className="w-full h-full bg-[#03070E] border-r border-pink/10 last:border-r-0 relative overflow-hidden"
          >
            {/* Subtle vertical architectural lighting on right edge */}
            <div className="absolute inset-y-0 right-0 w-[1px] bg-gradient-to-b from-transparent via-pink/30 to-transparent opacity-60" />
            {/* Trailing pink trim along the bottom edge as panels rise */}
            <div className="absolute bottom-0 inset-x-0 h-[2px] bg-gradient-to-r from-pink/20 via-pink to-pink/20 shadow-[0_0_15px_rgba(201, 75, 115,0.6)]" />
          </motion.div>
        ))}
      </div>

      {/* Center Brand Container */}
      <div className="absolute inset-0 z-[210] flex flex-col items-center justify-center pointer-events-none px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, filter: 'blur(12px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          exit={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
          transition={{
            duration: 1.0,
            ease: [0.16, 1, 0.3, 1],
            exit: { duration: 0.4, ease: [0.76, 0, 0.24, 1] },
          }}
          className="flex flex-col items-center relative"
        >
          {/* Ambient luxury pink glow */}
          <div className="absolute -inset-8 bg-pink/15 rounded-full blur-3xl pointer-events-none animate-pulse-pink opacity-80" />

          {/* Crisp 2D Logo */}
          <img
            src="/logo-2d.png"
            alt="Latushya Premium Interior Studio"
            className="w-52 md:w-64 h-auto object-contain relative z-10 drop-shadow-[0_15px_35px_rgba(201, 75, 115,0.2)] mb-6"
          />

          {/* Elegant expanding pink dividing line */}
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: '180px', opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="h-[1px] bg-gradient-to-r from-transparent via-pink/70 to-transparent relative overflow-hidden mb-5"
          >
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: '100%' }}
              transition={{ duration: 1.5, ease: 'easeInOut', repeat: Infinity }}
              className="absolute inset-y-0 w-1/2 bg-gradient-to-r from-transparent via-white to-transparent opacity-80"
            />
          </motion.div>

          <motion.span
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="text-pink/90 font-display text-xs md:text-sm tracking-ultra uppercase text-center font-light"
          >
            Premium Interior Studio
          </motion.span>
        </motion.div>
      </div>

      {/* Bottom Architectural Coordinates & Live Loading Counter */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{
          duration: 0.8,
          delay: 0.4,
          exit: { duration: 0.35, ease: [0.76, 0, 0.24, 1] },
        }}
        className="absolute bottom-6 md:bottom-10 left-6 md:left-12 right-6 md:right-12 z-[210] flex items-end justify-between pointer-events-none"
      >
        {/* Left: Location & Studio Specialty */}
        <div className="flex flex-col gap-1 text-[10px] md:text-xs text-gray-400 font-sans tracking-[0.25em] uppercase">
          <span className="text-pink font-medium">Bangalore, India</span>
          <span className="text-white/60">Bespoke Wardrobes & Turnkey Interiors</span>
        </div>

        {/* Right: Real-time Loading Percentage */}
        <div className="flex items-baseline gap-1">
          <span className="font-display text-4xl md:text-5xl text-pink font-light tracking-tight leading-none">
            {progress.toString().padStart(2, '0')}
          </span>
          <span className="text-pink/70 text-xs md:text-sm font-sans tracking-widest">%</span>
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
      href={`https://wa.me/${COMPANY.whatsapp}?text=Hello%20Latushya!%20I%20need%20a%20consultation.`}
      target="_blank"
      rel="noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 3, duration: 0.5, type: 'spring' }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="hidden lg:flex fixed bottom-8 right-8 z-50 w-14 h-14 bg-[#25D366] rounded-full items-center justify-center shadow-lg hover:shadow-xl transition-shadow duration-300"
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
          className="fixed bottom-24 left-6 lg:bottom-8 lg:left-8 z-50 w-10 h-10 border border-pink/40 hover:border-pink hover:bg-pink/10 flex items-center justify-center text-pink transition-all duration-300 group"
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

  // Initialize Lenis smooth scroll with luxurious but snappy settings
  useEffect(() => {
    const lenis = new Lenis({
      duration: 0.8, // Snappier, more responsive scroll
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      smoothTouch: false,
      touchMultiplier: 2.5, // slightly more responsive on trackpads
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
    // 1600ms count-up + 400ms hold at 100% for a satisfying reveal
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <ErrorBoundary>
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
    </ErrorBoundary>
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
