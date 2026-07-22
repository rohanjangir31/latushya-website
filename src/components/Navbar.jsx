import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { COMPANY } from '../data/content';
import Magnetic from './Magnetic';
import { useCursor } from '../context/CursorContext';

const navLinks = [
  { label: 'Home',      href: '/' },
  { label: 'About',     href: '/about' },
  { label: 'Services',  href: '/services' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Materials', href: '/materials' },
  { label: 'Process',   href: '/process' },
  { label: 'Contact',   href: '/contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const { setCursorState } = useCursor();

  useEffect(() => {
    // ── Scroll: background blur toggle
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleNavClick = () => {
    setMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 h-[78px] flex items-center ${
          scrolled || menuOpen
            ? 'bg-black-deep/95 backdrop-blur-xl border-b border-gold/10'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex w-full items-center justify-between">
          {/* Logo */}
          <Magnetic strength={0.3}>
            <Link
              to="/"
              onClick={() => { setMenuOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              onMouseEnter={() => setCursorState('hover')}
              onMouseLeave={() => setCursorState('default')}
              className="flex flex-col items-start group"
            >
              <motion.div whileHover={{ scale: 1.02 }} className="flex items-center gap-3">
                <img 
                  src="/logo-2d.png" 
                  alt="Latushya Logo" 
                  className="h-12 w-auto object-contain" 
                />
              </motion.div>
            </Link>
          </Magnetic>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.href;
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={handleNavClick}
                  onMouseEnter={() => setCursorState('hover')}
                  onMouseLeave={() => setCursorState('default')}
                  className={`link-underline-gold text-[13px] tracking-[4px] uppercase transition-colors duration-250 pb-0.5
                    ${isActive ? 'text-gold is-active' : 'text-gray-subtle hover:text-white'}`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <Magnetic strength={0.2}>
              {COMPANY.whatsapp ? (
                <a
                  href={`https://wa.me/${COMPANY.whatsapp}?text=Hello%20Latushya!%20I%20need%20a%20consultation.`}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-gold"
                  id="nav-cta"
                  onMouseEnter={() => setCursorState('hover')}
                  onMouseLeave={() => setCursorState('default')}
                >
                  <span>Free Consultation</span>
                </a>
              ) : (
                <Link
                  to="/contact"
                  className="btn-gold"
                  id="nav-cta"
                  onMouseEnter={() => setCursorState('hover')}
                  onMouseLeave={() => setCursorState('default')}
                >
                  <span>Free Consultation</span>
                </Link>
              )}
            </Magnetic>
          </div>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden flex flex-col gap-1.5 p-2 group"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <motion.span
              animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
              className="w-6 h-px bg-white block origin-center transition-colors group-hover:bg-gold"
            />
            <motion.span
              animate={menuOpen ? { opacity: 0, x: -10 } : { opacity: 1, x: 0 }}
              className="w-6 h-px bg-white block"
            />
            <motion.span
              animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
              className="w-6 h-px bg-white block origin-center transition-colors group-hover:bg-gold"
            />
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: '-100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-100%' }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-40 bg-black-deep flex flex-col pt-[78px] border-b border-gold/20"
          >
            <div className="flex-1 flex flex-col justify-center items-center gap-8 px-8">
              {navLinks.map((link, i) => (
                <div key={link.href} className="overflow-hidden">
                  <motion.div
                    initial={{ y: '100%' }}
                    animate={{ y: '0%' }}
                    exit={{ y: '100%' }}
                    transition={{ duration: 0.7, delay: i * 0.08 + 0.1, ease: [0.76, 0, 0.24, 1] }}
                  >
                    <Link
                      to={link.href}
                      onClick={handleNavClick}
                      className={`font-display text-5xl font-light tracking-wide transition-colors duration-300 ${location.pathname === link.href ? 'text-gold italic' : 'text-white hover:text-gold'}`}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                </div>
              ))}
              
              <div className="overflow-hidden mt-6">
                <motion.div
                  initial={{ y: '100%' }}
                  animate={{ y: '0%' }}
                  exit={{ y: '100%' }}
                  transition={{ duration: 0.7, delay: navLinks.length * 0.08 + 0.1, ease: [0.76, 0, 0.24, 1] }}
                >
                  {COMPANY.whatsapp ? (
                    <a
                      href={`https://wa.me/${COMPANY.whatsapp}?text=Hello%20Latushya!%20I%20need%20a%20consultation.`}
                      target="_blank"
                      rel="noreferrer"
                      className="btn-gold"
                    >
                      <span>Book Free Consultation</span>
                    </a>
                  ) : (
                    <Link
                      to="/contact"
                      onClick={handleNavClick}
                      className="btn-gold block"
                    >
                      <span>Book Free Consultation</span>
                    </Link>
                  )}
                </motion.div>
              </div>
            </div>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="p-8 text-center text-gold/60 text-[10px] tracking-widest uppercase"
            >
              Premium Interior Studio · {COMPANY.phone}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
