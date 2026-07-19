import { motion } from 'framer-motion';
import { MessageCircle, Phone, Mail, MapPin } from 'lucide-react';
import { useRef } from 'react';
import { COMPANY } from '../data/content';

// ─── Motion helpers ───────────────────────────────────────────────────────────
// A single "fade up once" transition — no bouncing, no flashiness.
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] },
});

// ─── Contact detail row ───────────────────────────────────────────────────────
function ContactDetail({ icon: Icon, label, value, href, placeholder }) {
  const inner = (
    <div className="flex items-center gap-4 group cursor-pointer">
      <div className="w-10 h-10 border border-gold/25 flex items-center justify-center flex-shrink-0 group-hover:border-gold group-hover:bg-gold/8 transition-all duration-300">
        <Icon size={15} className="text-gold" />
      </div>
      <div>
        <p className="text-gold text-[9px] tracking-[0.22em] uppercase font-medium mb-0.5">
          {label}
        </p>
        {value ? (
          <p className="text-white/80 text-sm group-hover:text-white transition-colors duration-300">
            {value}
          </p>
        ) : (
          <p className="text-white/45 text-sm italic">{placeholder}</p>
        )}
      </div>
    </div>
  );

  if (href && value) {
    return (
      <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noreferrer">
        {inner}
      </a>
    );
  }
  return <div>{inner}</div>;
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function Contact() {
  const sectionRef = useRef(null);

  const hasPhone = Boolean(COMPANY.phone);
  const hasWhatsApp = Boolean(COMPANY.whatsapp);
  const hasEmail = Boolean(COMPANY.email);
  const hasAddress = Boolean(COMPANY.address);
  const hasCity = Boolean(COMPANY.city);

  const whatsappHref = hasWhatsApp
    ? `https://wa.me/${COMPANY.whatsapp}?text=Hello%20Latushya!%20I%20need%20a%20custom%20wardrobe.`
    : null;

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #0A0A0A 0%, #111008 50%, #0A0A0A 100%)' }}
    >
      {/* ── Noise texture overlay ─────────────────────────────── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E\")",
          opacity: 0.5,
          mixBlendMode: 'overlay',
        }}
      />

      {/* ── Very subtle radial warmth ─────────────────────────── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 55% at 50% 50%, rgba(212,175,55,0.04) 0%, transparent 70%)',
        }}
      />

      {/* ── Top gold rule ──────────────────────────────────── */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            'linear-gradient(to right, transparent 0%, rgba(212,175,55,0.5) 25%, rgba(212,175,55,0.5) 75%, transparent 100%)',
        }}
      />

      {/* ── Content wrapper — generous vertical padding ───────── */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-16 py-40 md:py-52 text-center">

        {/* ── Gold label ────────────────────────────────────────── */}
        <motion.span
          {...fadeUp(0)}
          className="block text-gold text-[9px] tracking-[0.32em] uppercase font-medium mb-10"
        >
          Free In-Home Consultation · No Obligations
        </motion.span>

        {/* ── Headline ──────────────────────────────────────────── */}
        <motion.h2
          {...fadeUp(0.12)}
          className="font-display font-light text-white leading-[1.08] tracking-tight mb-8"
          style={{ fontSize: 'clamp(2.25rem, 6.5vw, 4.5rem)' }}
        >
          Ready to Build Your{' '}
          <span
            className="italic"
            style={{
              background: 'linear-gradient(135deg, #D4AF37 0%, #F0E0A0 55%, #B8962E 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Dream Wardrobe?
          </span>
        </motion.h2>

        {/* ── Supporting paragraph ──────────────────────────────── */}
        <motion.p
          {...fadeUp(0.22)}
          className="text-white/65 leading-relaxed max-w-xl mx-auto mb-16"
          style={{ fontSize: '18px' }}
        >
          We visit your home, understand your space, and craft a wardrobe
          designed around your life — not just your room.
        </motion.p>

        {/* ── Primary + Secondary CTA ───────────────────────────── */}
        <motion.div
          {...fadeUp(0.34)}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8"
        >
          {/* Primary — Book Free Consultation */}
          {hasWhatsApp ? (
            <motion.a
              href={whatsappHref}
              target="_blank"
              rel="noreferrer"
              id="contact-book-consultation"
              className="btn-gold flex items-center gap-3"
              style={{ minWidth: '220px', justifyContent: 'center' }}
            >
              <span>Book Free Consultation</span>
            </motion.a>
          ) : (
            <motion.button
              id="contact-book-consultation"
              className="btn-gold flex items-center gap-3"
              style={{ minWidth: '220px', justifyContent: 'center' }}
              onClick={() =>
                document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
              }
            >
              <span>Book Free Consultation</span>
            </motion.button>
          )}

          {/* Secondary — Call Now */}
          {hasPhone ? (
            <motion.a
              href={`tel:${COMPANY.phone}`}
              id="contact-call-now"
              className="btn-outline flex items-center gap-3"
              style={{ minWidth: '160px', justifyContent: 'center' }}
            >
              <Phone size={14} />
              <span>Call Now</span>
            </motion.a>
          ) : (
            <motion.button
              id="contact-call-now"
              disabled
              className="btn-outline flex items-center gap-3 opacity-35 cursor-not-allowed"
              style={{ minWidth: '160px', justifyContent: 'center' }}
            >
              <Phone size={14} />
              <span>Call Now</span>
            </motion.button>
          )}
        </motion.div>

        {/* ── Trust signal ──────────────────────────────────── */}
        <motion.p
          {...fadeUp(0.40)}
          className="text-white/35 text-[11px] tracking-[0.2em] uppercase mb-16"
        >
          Precision Craftsmanship · Bespoke Design · Lifetime Support
        </motion.p>

        {/* ── Hairline divider ─────────────────────────────── */}
        <motion.div
          {...fadeUp(0.50)}
          aria-hidden="true"
          className="mx-auto mb-14"
          style={{
            width: '1px',
            height: '48px',
            background:
              'linear-gradient(to bottom, rgba(212,175,55,0.5), transparent)',
          }}
        />

        {/* ── Contact details — 2×2 grid on desktop, 1-col on mobile */}
        <motion.div
          {...fadeUp(0.58)}
          className="grid grid-cols-1 sm:grid-cols-2 gap-x-16 gap-y-8 max-w-xl mx-auto text-left"
        >
          {/* WhatsApp */}
          <ContactDetail
            icon={MessageCircle}
            label="WhatsApp"
            value={hasWhatsApp ? 'Chat with us on WhatsApp' : null}
            href={whatsappHref}
            placeholder="Available upon request"
          />

          {/* Phone */}
          <ContactDetail
            icon={Phone}
            label="Phone"
            value={hasPhone ? COMPANY.phone : null}
            href={hasPhone ? `tel:${COMPANY.phone}` : null}
            placeholder="Details shared on enquiry"
          />

          {/* Email */}
          <ContactDetail
            icon={Mail}
            label="Email"
            value={hasEmail ? COMPANY.email : null}
            href={hasEmail ? `mailto:${COMPANY.email}` : null}
            placeholder="Shared upon consultation"
          />

          {/* Location */}
          <ContactDetail
            icon={MapPin}
            label="Location"
            value={hasAddress ? COMPANY.address : hasCity ? COMPANY.city : null}
            placeholder="Serving all of Bangalore"
          />
        </motion.div>

      </div>

      {/* ── Bottom gold rule ──────────────────────────────────── */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{
          background:
            'linear-gradient(to right, transparent 0%, rgba(212,175,55,0.15) 40%, rgba(212,175,55,0.15) 60%, transparent 100%)',
        }}
      />
    </section>
  );
}
