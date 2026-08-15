import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
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
    { label: 'Bespoke Wardrobes', href: '/services#bespoke-wardrobes' },
    { label: 'Space Planning', href: '/services#space-planning' },
  ],
  'Quick Links': [
    { label: 'Home',              href: '/' },
    { label: 'About Us',          href: '/about' },
    { label: 'Our Services',      href: '/services' },
    { label: 'Portfolio',         href: '/portfolio' },
    { label: 'Materials We Use',  href: '/materials' },
    { label: 'Our Process',       href: '/process' },
    { label: 'Contact',           href: '/contact' },
  ],
};

export default function Footer() {
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
                Book an in-home consultation — no obligations, ever.
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Brand column */}
            <div className="lg:col-span-1">
              <div className="mb-6">
                <span className="font-display text-2xl tracking-ultra text-white font-light">
                  {COMPANY.name}
                </span>
                <div className="text-pink text-[9px] tracking-widest uppercase mt-0.5">
                  Premium Interior Design Studio · Bangalore
                </div>
              </div>

              <p className="text-gray-light text-sm leading-relaxed mb-6">
                Bangalore's premium interior design and execution studio. We create custom living spaces — turnkey interiors, modular kitchens, and bespoke furniture — tailored precisely to your lifestyle.
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

            {/* Services column */}
            <div>
              <h4 className="text-white text-xs tracking-widest uppercase font-semibold mb-6 pb-3 border-b border-pink/20">
                Our Services
              </h4>
              <ul className="space-y-3">
                {footerLinks['Our Services'].map((item) => (
                  <li key={item.label}>
                    <Link to={item.href} className="text-gray-light text-sm hover:text-blue transition-colors duration-300 flex items-center gap-2 group">
                      <span className="w-3 h-[2px] bg-gradient-to-r from-pink to-blue opacity-80 group-hover:w-5 group-hover:bg-blue transition-all duration-300" />
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-white text-xs tracking-widest uppercase font-semibold mb-6 pb-3 border-b border-pink/20">
                Quick Links
              </h4>
              <ul className="space-y-3">
                {footerLinks['Quick Links'].map((item) => (
                  <li key={item.label}>
                    <Link
                      to={item.href}
                      className="text-gray-light text-sm hover:text-blue transition-colors duration-300 flex items-center gap-2 group"
                    >
                      <span className="w-3 h-[2px] bg-gradient-to-r from-pink to-blue opacity-80 group-hover:w-5 group-hover:bg-blue transition-all duration-300" />
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact column */}
            <div>
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
                    <a href={`mailto:${COMPANY.email}`} className="text-gray-light hover:text-blue transition-colors text-sm">
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
              © {new Date().getFullYear()} {COMPANY.name} — Premium Wardrobes, {COMPANY.city}
            </p>
            <p className="text-gray-light/20 text-xs flex items-center gap-1.5">
              Crafted with <Heart size={9} className="text-pink fill-pink" /> for beautiful living spaces
            </p>
          </div>
        </div>
      </footer>

      {/* Mobile sticky CTA bar — always visible on mobile, iOS safe area aware */}
      <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden pb-safe">
        <div className="grid grid-cols-2 border-t border-pink/20">
          {COMPANY.whatsapp ? (
            <a
              href={`https://wa.me/${COMPANY.whatsapp}?text=Hello%20Latushya!%20I%20need%20a%20custom%20wardrobe.`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 bg-[#25D366] text-white text-xs font-semibold tracking-widest uppercase py-4"
              id="mobile-sticky-whatsapp"
            >
              <svg viewBox="0 0 24 24" fill="white" width="16" height="16">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              WhatsApp
            </a>
          ) : (
            <button
              onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="flex items-center justify-center gap-2 bg-pink text-black-deep text-xs font-semibold tracking-widest uppercase py-4"
              id="mobile-sticky-consult"
            >
              Consultation
            </button>
          )}

          {COMPANY.phone ? (
            <a
              href={`tel:${COMPANY.phone}`}
              className="flex items-center justify-center gap-2 bg-black-charcoal text-pink text-xs font-semibold tracking-widest uppercase py-4 border-l border-pink/20"
              id="mobile-sticky-call"
            >
              <Phone size={14} />
              Call Now
            </a>
          ) : (
            <button
              onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="flex items-center justify-center gap-2 bg-black-charcoal text-pink text-xs font-semibold tracking-widest uppercase py-4 border-l border-pink/20"
              id="mobile-sticky-enquire"
            >
              Send Enquiry
            </button>
          )}
        </div>
      </div>
    </>
  );
}
