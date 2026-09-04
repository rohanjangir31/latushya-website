import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { COMPANY } from '../data/content';
import Magnetic from './Magnetic';

const navLinks = [
  { label: 'Home',      href: '/' },
  { label: 'About',     href: '/about' },
  { 
    label: 'Services',  
    href: '/services',
    subLinks: [
      { label: 'Turnkey Interiors', href: '/services#turnkey-interiors' },
      { label: 'Modular Kitchens', href: '/services#modular-kitchens' },
      { label: 'Living Room Design', href: '/services#living-room-design' },
      { label: 'FTC Wardrobes', href: '/services#ftc-wardrobes' },
      { label: 'Decor Sourcing', href: '/services#decor-sourcing' },
    ]
  },
  { label: 'Portfolio', href: '/portfolio' },
  { 
    label: 'Wardrobes', 
    href: '/wardrobes',
    subLinks: [
      { label: 'Wardrobes Hub', href: '/wardrobes' },
      { label: 'Sliding Wardrobes', href: '/collections/sliding-wardrobes' },
      { label: 'Hinged Wardrobes', href: '/collections/hinged-wardrobes' },
    ]
  },
  { label: 'Materials', href: '/materials' },
  { label: 'Contact',   href: '/contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 flex items-center ${
          scrolled || menuOpen
            ? 'h-[50px] bg-black-deep/90 backdrop-blur-md border-b border-pink/10'
            : 'h-[80px] bg-transparent'
        }`}
      >
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12 flex w-full items-center justify-between">
          {/* Logo */}
          <Magnetic strength={0.3}>
            <Link
              to="/"
              onClick={() => { setMenuOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="flex flex-col items-start group relative z-10"
            >
              <motion.div whileHover={{ scale: 1.02 }} className="flex items-center gap-3">
                <img 
                  src="/logo-2d.png" 
                  alt="Latushya Logo" 
                  className={`w-auto object-contain transition-all duration-500 ${scrolled ? 'h-11 lg:h-12' : 'h-14 lg:h-[4rem]'}`}
                />
              </motion.div>
            </Link>
          </Magnetic>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-5 xl:gap-8">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.href || 
                               (link.href === '/wardrobes' && location.pathname.startsWith('/collections/'));
              if (link.subLinks) {
                return (
                  <div key={link.href} className="relative group">
                    <Link
                      to={link.href}
                      onClick={handleNavClick}
                      className={`link-underline-pink hover:text-white text-[12px] xl:text-[13px] tracking-widest uppercase transition-colors duration-250 pb-0.5 flex items-center gap-1.5 ${isActive ? 'is-active text-white' : 'text-gray-subtle'}`}
                    >
                      {link.label}
                      <svg width="8" height="5" viewBox="0 0 8 5" fill="none" className="opacity-50 group-hover:opacity-100 transition-transform duration-300 group-hover:-scale-y-100">
                        <path d="M1 1L4 4L7 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </Link>

                    {/* Dropdown Drawer */}
                    <div className="absolute top-[100%] left-1/2 -translate-x-1/2 pt-6 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300 z-50">
                      <div className="bg-[#050505]/95 backdrop-blur-xl border border-white/10 rounded-xl p-2 min-w-[220px] shadow-[0_20px_40px_rgba(0,0,0,0.8)] flex flex-col gap-0.5 relative overflow-hidden">
                        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-pink/40 to-transparent" />
                        
                        {link.subLinks.map((sub) => (
                          <Link
                            key={sub.href}
                            to={sub.href}
                            onClick={handleNavClick}
                            className="text-gray-light/60 hover:text-white hover:bg-white/5 text-[10px] tracking-widest uppercase px-4 py-3 rounded-lg transition-all duration-200"
                          >
                            {sub.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={handleNavClick}
                  className={`link-underline-pink hover:text-white text-[12px] xl:text-[13px] tracking-widest uppercase transition-colors duration-250 pb-0.5
                    ${isActive ? 'is-active text-white' : 'text-gray-subtle'}`}
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
                  className="relative overflow-hidden rounded-full inline-flex items-center justify-center text-white font-semibold bg-gradient-to-r from-pink to-pink-light shadow-[0_4px_15px_rgba(223,76,115,0.25)] px-6 py-2.5 tracking-widest text-[0.6rem] uppercase transition-[transform,filter] duration-300 hover:-translate-y-0.5 hover:brightness-110"
                  id="nav-cta"
                >
                  <span className="relative z-10">Book Consultation</span>
                </a>
              ) : (
                <Link
                  to="/contact"
                  className="relative overflow-hidden rounded-full inline-flex items-center justify-center text-white font-semibold bg-gradient-to-r from-pink to-pink-light shadow-[0_4px_15px_rgba(223,76,115,0.25)] px-6 py-2.5 tracking-widest text-[0.6rem] uppercase transition-[transform,filter] duration-300 hover:-translate-y-0.5 hover:brightness-110"
                  id="nav-cta"
                >
                  <span className="relative z-10">Book Consultation</span>
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
              className="w-6 h-px bg-white block origin-center transition-colors group-hover:bg-blue"
            />
            <motion.span
              animate={menuOpen ? { opacity: 0, x: -10 } : { opacity: 1, x: 0 }}
              className="w-6 h-px bg-white block"
            />
            <motion.span
              animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
              className="w-6 h-px bg-white block origin-center transition-colors group-hover:bg-blue"
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
            className="fixed inset-0 z-40 bg-black-deep flex flex-col pt-[78px] border-b border-pink/20"
          >
            <div className="flex-1 flex flex-col justify-center items-center gap-8 px-8">
              {navLinks.map((link, i) => {
                const isActive = location.pathname === link.href || 
                                 (link.href === '/wardrobes' && location.pathname.startsWith('/collections/'));
                
                return (
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
                        className={`font-display text-5xl font-light tracking-wide transition-colors duration-300 ${isActive ? 'text-pink italic' : 'text-white hover:text-blue'}`}
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  </div>
                );
              })}
              
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
                      className="btn-pink"
                    >
                      <span>Book Consultation</span>
                    </a>
                  ) : (
                    <Link
                      to="/contact"
                      onClick={handleNavClick}
                      className="btn-pink block"
                    >
                      <span>Book Consultation</span>
                    </Link>
                  )}
                </motion.div>
              </div>
            </div>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="p-8 text-center text-pink/60 text-[10px] tracking-widest uppercase"
            >
              Premium Interior Studio · {COMPANY.phone}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
