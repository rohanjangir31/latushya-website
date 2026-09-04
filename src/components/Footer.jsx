import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { MapPin, Phone, Mail, Heart, Home, LayoutGrid, Columns, Image as ImageIcon, MessageCircle } from 'lucide-react';
import { COMPANY } from '../data/content';

// Inline SVG social icons
const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <circle cx="12" cy="12" r="4"/>
    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
  </svg>
);
const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);
const YoutubeIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/>
    <polygon fill="#050B14" points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/>
  </svg>
);

const socialLinks = [
  { Icon: InstagramIcon, href: COMPANY.instagram, label: 'Instagram' },
  { Icon: YoutubeIcon, href: COMPANY.youtube, label: 'YouTube' },
];

const footerLinks = {
  'Our Services': [
    { label: 'Turnkey Interiors', href: '/services#turnkey-interiors' },
    { label: 'Modular Kitchens', href: '/services#modular-kitchens' },
    { label: 'Living Room Design', href: '/services#living-room-design' },
    { label: 'FTC Wardrobes', href: '/services#ftc-wardrobes' },
    { label: 'Decor Sourcing', href: '/services#decor-sourcing' },
  ],
  'Wardrobes': [
    { label: 'Wardrobes Hub', href: '/wardrobes' },
    { label: 'Sliding Wardrobes', href: '/collections/sliding-wardrobes' },
    { label: 'Hinged Wardrobes', href: '/collections/hinged-wardrobes' },
    { label: 'Materials We Use', href: '/materials' },
  ],
  'Quick Links': [
    { label: 'Home',              href: '/' },
    { label: 'About Us',          href: '/about' },
    { label: 'Portfolio',         href: '/portfolio' },
    { label: 'Contact',           href: '/contact' },
  ],
};

export default function Footer() {
  const location = useLocation();
  
  const scrollTo = (href) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleConsult = () => {
    if (COMPANY.whatsapp) {
      window.open(`https://wa.me/${COMPANY.whatsapp}?text=Hello%20Latushya!%20I%20need%20an%20interior%20consultation.`, '_blank');
    } else {
      document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <footer className="bg-black-charcoal border-t border-pink/10 relative">
        {/* Top CTA band (Ultra Minimalist & Compact) */}
        <div className="border-b border-gray-luxury/30 py-5">
          <div className="max-w-7xl mx-auto px-6 lg:px-16 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-display text-xl md:text-2xl text-white font-light tracking-wider">
                Your perfect space awaits.
              </h3>
              <p className="text-gray-light text-xs mt-1.5 font-light">
                Book an in-home consultation with no obligations, ever.
              </p>
            </div>
            <button
              onClick={handleConsult}
              className="flex-shrink-0 bg-transparent border border-pink text-pink font-medium px-8 py-3.5 rounded-full text-xs tracking-widest uppercase hover:bg-pink hover:text-white transition-all duration-500"
              id="footer-cta"
            >
              Book Consultation
            </button>
          </div>
        </div>

        {/* Main footer */}
        <div className="max-w-7xl mx-auto px-6 lg:px-16 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-12 lg:gap-8">
            {/* Brand column */}
            <div className="lg:col-span-2 md:col-span-3">
              <div className="mb-6">
                <span className="font-display text-2xl tracking-ultra text-white font-light">
                  {COMPANY.name}
                </span>
                <div className="text-pink text-[9px] tracking-widest uppercase mt-0.5">
                  Premium Interior Design Studio · Bangalore
                </div>
              </div>

              <p className="text-gray-light text-sm leading-relaxed mb-6">
                Bangalore's premium interior design and execution studio. We create custom living spaces including turnkey interiors, modular kitchens, and custom furniture tailored precisely to your lifestyle.
              </p>

              {/* SEO keywords as natural text */}
              <p className="text-gray-light/30 text-xs leading-relaxed mb-6">
                Turnkey Interiors · Modular Kitchens · Living Room Design · Custom Furniture · Bangalore
              </p>

              {/* Social links */}
              <div className="flex gap-3">
                {socialLinks.map(({ Icon, href, label }) => href ? (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={label}
                    className="w-11 h-11 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/80 hover:text-white hover:bg-pink hover:border-pink hover:shadow-[0_0_20px_rgba(223,76,115,0.4)] transition-all duration-300 group hover:-translate-y-1"
                  >
                    <div className="transition-transform duration-300 group-hover:scale-110 flex items-center justify-center">
                      <Icon />
                    </div>
                  </a>
                ) : null)}
              </div>
            </div>

            {/* Link Groups */}
            {['Our Services', 'Wardrobes', 'Quick Links'].map((group) => (
              <div key={group} className="lg:col-span-1 md:col-span-1">
                <h4 className="text-white text-xs tracking-widest uppercase font-semibold mb-6 pb-3 border-b border-pink/20">
                  {group}
                </h4>
                <ul className="space-y-3">
                  {footerLinks[group].map((item) => (
                    <li key={item.label}>
                      <Link to={item.href} className="text-gray-light text-sm hover:text-blue transition-colors duration-300 flex items-center gap-2 group">
                        <span className="w-3 h-[2px] bg-gradient-to-r from-pink to-blue opacity-80 group-hover:w-5 group-hover:bg-blue transition-all duration-300" />
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Contact column */}
            <div className="lg:col-span-1 md:col-span-2">
              <h4 className="text-white text-xs tracking-widest uppercase font-semibold mb-6 pb-3 border-b border-pink/20">
                Contact
              </h4>
              <ul className="space-y-5">
                <li className="flex items-start gap-3">
                  <MapPin size={14} className="text-pink flex-shrink-0 mt-0.5" />
                  {COMPANY.address ? (
                    <span className="text-gray-light text-sm leading-relaxed">{COMPANY.address}</span>
                  ) : (
                    <span className="text-gray-light/40 text-sm italic">{COMPANY.city}<br/>Full address coming soon</span>
                  )}
                </li>
                <li className="flex items-center gap-3">
                  <Phone size={14} className="text-pink flex-shrink-0" />
                  {COMPANY.phone ? (
                    <a href={`tel:${COMPANY.phone}`} className="text-gray-light hover:text-blue transition-colors text-sm">
                      {COMPANY.phone}
                    </a>
                  ) : (
                    <span className="text-gray-light/40 text-sm italic">Phone coming soon</span>
                  )}
                </li>
                <li className="flex items-center gap-3">
                  <Mail size={14} className="text-pink flex-shrink-0" />
                  {COMPANY.email ? (
                    <a href={`https://mail.google.com/mail/?view=cm&fs=1&to=${COMPANY.email}`} target="_blank" rel="noreferrer" className="text-gray-light hover:text-blue transition-colors text-sm">
                      {COMPANY.email}
                    </a>
                  ) : (
                    <span className="text-gray-light/40 text-sm italic">Email coming soon</span>
                  )}
                </li>
                <li className="pt-2">
                  <button
                    onClick={handleConsult}
                    className="inline-flex items-center gap-2 text-xs tracking-widest uppercase text-pink border border-pink/40 hover:bg-pink hover:text-black-deep px-6 py-3 rounded-full transition-all duration-300"
                  >
                    Consultation
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-luxury/20">
          <div className="max-w-7xl mx-auto px-6 lg:px-16 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-light/40 text-xs tracking-wide">
              © {new Date().getFullYear()} {COMPANY.name}. Premium Wardrobes, {COMPANY.city}
            </p>
            <p className="text-gray-light/20 text-xs flex items-center gap-1.5">
              Crafted with <Heart size={9} className="text-pink fill-pink" /> for beautiful living spaces
            </p>
          </div>
        </div>
      </footer>
      {/* Mobile Bottom Navigation Bar — Replaces Hamburger for core navigation */}
      <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-[#03070E]/95 backdrop-blur-xl border-t border-white/5 pb-safe">
        <div className="flex items-center justify-between px-2 h-[68px]">
          {/* Tab 1 */}
          <Link to="/" className={`flex flex-col items-center justify-center w-full h-full gap-1.5 transition-colors duration-300 ${location.pathname === '/' ? 'text-pink' : 'text-gray-light/50 hover:text-white/90'}`}>
            <Home size={20} strokeWidth={location.pathname === '/' ? 2.5 : 1.5} className={location.pathname === '/' ? 'drop-shadow-[0_0_8px_rgba(223,76,115,0.4)]' : ''} />
            <span className={`text-[9px] uppercase tracking-wider ${location.pathname === '/' ? 'font-semibold' : 'font-medium'}`}>Home</span>
          </Link>
          
          {/* Tab 2 */}
          <Link to="/services" className={`flex flex-col items-center justify-center w-full h-full gap-1.5 transition-colors duration-300 ${location.pathname === '/services' ? 'text-pink' : 'text-gray-light/50 hover:text-white/90'}`}>
            <LayoutGrid size={20} strokeWidth={location.pathname === '/services' ? 2.5 : 1.5} className={location.pathname === '/services' ? 'drop-shadow-[0_0_8px_rgba(223,76,115,0.4)]' : ''} />
            <span className={`text-[9px] uppercase tracking-wider ${location.pathname === '/services' ? 'font-semibold' : 'font-medium'}`}>Services</span>
          </Link>
          
          {/* Tab 3: Center Elevated Button (AI Chat) */}
          <div className="relative w-full h-full flex justify-center items-start">
            <button
              onClick={() => document.dispatchEvent(new CustomEvent('open-ai-chatbot'))}
              className="absolute -top-5 w-12 h-12 rounded-full bg-gradient-to-br from-[#DF4C73] to-[#b33554] shadow-[0_4px_20px_rgba(223,76,115,0.4)] flex items-center justify-center text-white transition-transform active:scale-95 border-[3px] border-[#03070E]"
            >
              <span style={{ fontSize: '20px', lineHeight: 1 }}>✦</span>
            </button>
            <span className="absolute bottom-2 text-[9px] uppercase tracking-wider font-semibold text-pink drop-shadow-[0_0_8px_rgba(223,76,115,0.4)]">
              AI Chat
            </span>
          </div>

          {/* Tab 4 */}
          <Link to="/wardrobes" className={`flex flex-col items-center justify-center w-full h-full gap-1.5 transition-colors duration-300 ${location.pathname === '/wardrobes' ? 'text-pink' : 'text-gray-light/50 hover:text-white/90'}`}>
            <Columns size={20} strokeWidth={location.pathname === '/wardrobes' ? 2.5 : 1.5} className={location.pathname === '/wardrobes' ? 'drop-shadow-[0_0_8px_rgba(223,76,115,0.4)]' : ''} />
            <span className={`text-[9px] uppercase tracking-wider ${location.pathname === '/wardrobes' ? 'font-semibold' : 'font-medium'}`}>Wardrobes</span>
          </Link>

          {/* Tab 5 */}
          <Link to="/portfolio" className={`flex flex-col items-center justify-center w-full h-full gap-1.5 transition-colors duration-300 ${location.pathname === '/portfolio' ? 'text-pink' : 'text-gray-light/50 hover:text-white/90'}`}>
            <ImageIcon size={20} strokeWidth={location.pathname === '/portfolio' ? 2.5 : 1.5} className={location.pathname === '/portfolio' ? 'drop-shadow-[0_0_8px_rgba(223,76,115,0.4)]' : ''} />
            <span className={`text-[9px] uppercase tracking-wider ${location.pathname === '/portfolio' ? 'font-semibold' : 'font-medium'}`}>Portfolio</span>
          </Link>
        </div>
      </div>
    </>
  );
}
