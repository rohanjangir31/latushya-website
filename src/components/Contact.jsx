import { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Phone, MapPin, Mail, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { COMPANY } from '../data/content';
import { SectionHeader, AnimatedSection, StaggerContainer, fadeUpVariant } from '../utils/animations';
import { apiPost } from '../utils/api';

const WARDROBE_TYPES = [
  'Modular Wardrobe',
  'Sliding Wardrobe',
  'Walk-In Wardrobe',
  'Hinged Wardrobe',
  'Luxury Wardrobe',
  'Custom Storage Solution',
  'Not sure — need guidance',
];

export default function Contact() {
  const EMPTY_FORM = { name: '', phone: '', email: '', wardrobeType: '', message: '' };

  const [form, setForm]         = useState(EMPTY_FORM);
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused]   = useState(null);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState(null);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { data, error: apiError } = await apiPost('/api/v1/enquiries', {
      name:         form.name,
      phone:        form.phone,
      email:        form.email        || undefined,
      wardrobeType: form.wardrobeType || undefined,
      message:      form.message      || undefined,
    });

    setLoading(false);

    if (apiError) {
      setError(apiError);
      return;
    }

    // Success — save to DB confirmed
    setForm(EMPTY_FORM);
    setSubmitted(true);
  };

  const inputClass = (field) =>
    `w-full bg-transparent border-b py-4 text-white placeholder-gray-light/40 text-sm transition-all duration-300 outline-none ${
      focused === field ? 'border-gold' : 'border-gray-luxury/40 hover:border-gray-subtle/60'
    }`;

  const hasPhone    = Boolean(COMPANY.phone);
  const hasWhatsApp = Boolean(COMPANY.whatsapp);
  const hasEmail    = Boolean(COMPANY.email);
  const hasAddress  = Boolean(COMPANY.address);

  return (
    <section id="contact" className="py-32 bg-black-deep relative overflow-hidden">
      <div className="absolute top-0 left-0 w-96 h-96 rounded-full bg-gold/3 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-gold/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-16 relative z-10">
        <SectionHeader
          label="Get In Touch"
          title={<>Book Your Free <span className="italic text-gold">Wardrobe Consultation</span></>}
          subtitle="Tell us about your space. We'll visit, measure, and design a custom wardrobe — completely free, no obligations."
        />

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left — Contact info */}
          <div>
            <AnimatedSection>
              <h3 className="font-display text-2xl text-white mb-8 font-light">
                Let's Design Your <span className="italic text-gold">Dream Wardrobe</span>
              </h3>
            </AnimatedSection>

            <StaggerContainer className="space-y-7 mb-10">
              {/* Phone */}
              <motion.div variants={fadeUpVariant} className="flex items-start gap-5 group">
                <div className="w-11 h-11 border border-gold/30 flex items-center justify-center flex-shrink-0 group-hover:border-gold group-hover:bg-gold/10 transition-all duration-300">
                  <Phone size={17} className="text-gold" />
                </div>
                <div>
                  <div className="text-gold text-[10px] tracking-widest uppercase mb-1">Call Us</div>
                  {hasPhone ? (
                    <a href={`tel:${COMPANY.phone}`} className="text-white hover:text-gold transition-colors text-sm">
                      {COMPANY.phone}
                    </a>
                  ) : (
                    <span className="text-gray-light/40 text-sm italic">Phone number coming soon</span>
                  )}
                </div>
              </motion.div>

              {/* WhatsApp */}
              <motion.div variants={fadeUpVariant} className="flex items-start gap-5 group">
                <div className="w-11 h-11 border border-gold/30 flex items-center justify-center flex-shrink-0 group-hover:border-gold group-hover:bg-gold/10 transition-all duration-300">
                  <MessageCircle size={17} className="text-gold" />
                </div>
                <div>
                  <div className="text-gold text-[10px] tracking-widest uppercase mb-1">WhatsApp</div>
                  {hasWhatsApp ? (
                    <a href={`https://wa.me/${COMPANY.whatsapp}`} target="_blank" rel="noreferrer" className="text-white hover:text-gold transition-colors text-sm">
                      Chat with us on WhatsApp
                    </a>
                  ) : (
                    <span className="text-gray-light/40 text-sm italic">WhatsApp contact coming soon</span>
                  )}
                </div>
              </motion.div>

              {/* Email */}
              <motion.div variants={fadeUpVariant} className="flex items-start gap-5 group">
                <div className="w-11 h-11 border border-gold/30 flex items-center justify-center flex-shrink-0 group-hover:border-gold group-hover:bg-gold/10 transition-all duration-300">
                  <Mail size={17} className="text-gold" />
                </div>
                <div>
                  <div className="text-gold text-[10px] tracking-widest uppercase mb-1">Email</div>
                  {hasEmail ? (
                    <a href={`mailto:${COMPANY.email}`} className="text-white hover:text-gold transition-colors text-sm">
                      {COMPANY.email}
                    </a>
                  ) : (
                    <span className="text-gray-light/40 text-sm italic">Email address coming soon</span>
                  )}
                </div>
              </motion.div>

              {/* Address */}
              <motion.div variants={fadeUpVariant} className="flex items-start gap-5 group">
                <div className="w-11 h-11 border border-gold/30 flex items-center justify-center flex-shrink-0 group-hover:border-gold group-hover:bg-gold/10 transition-all duration-300">
                  <MapPin size={17} className="text-gold" />
                </div>
                <div>
                  <div className="text-gold text-[10px] tracking-widest uppercase mb-1">Location</div>
                  {hasAddress ? (
                    <p className="text-white text-sm leading-relaxed">{COMPANY.address}</p>
                  ) : (
                    <span className="text-gray-light/40 text-sm italic">
                      {COMPANY.city} — full address coming soon
                    </span>
                  )}
                </div>
              </motion.div>
            </StaggerContainer>

            {/* Quick action buttons */}
            <AnimatedSection delay={0.3} className="flex flex-col sm:flex-row gap-4">
              {hasWhatsApp ? (
                <a
                  href={`https://wa.me/${COMPANY.whatsapp}?text=Hello%20Latushya!%20I%20need%20a%20custom%20wardrobe.`}
                  target="_blank"
                  rel="noreferrer"
                  id="contact-whatsapp"
                  className="btn-gold flex items-center gap-3 justify-center"
                >
                  <MessageCircle size={15} />
                  <span>WhatsApp Us</span>
                </a>
              ) : (
                <button
                  disabled
                  className="btn-gold opacity-40 cursor-not-allowed flex items-center gap-3 justify-center"
                  title="WhatsApp number not yet configured"
                >
                  <MessageCircle size={15} />
                  <span>WhatsApp Us</span>
                </button>
              )}

              {hasPhone ? (
                <a href={`tel:${COMPANY.phone}`} id="contact-call" className="btn-outline flex items-center gap-3 justify-center">
                  <Phone size={15} />
                  <span>Call Now</span>
                </a>
              ) : (
                <button
                  disabled
                  className="btn-outline opacity-40 cursor-not-allowed flex items-center gap-3 justify-center"
                  title="Phone number not yet configured"
                >
                  <Phone size={15} />
                  <span>Call Now</span>
                </button>
              )}
            </AnimatedSection>

            {/* Map placeholder / embed */}
            <AnimatedSection delay={0.4} className="mt-10">
              {hasAddress ? (
                <div className="relative h-48 overflow-hidden border border-gray-luxury/20">
                  <iframe
                    src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d497511.23!2d77.4908527!3d12.9539974!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1670c9b44e6d%3A0xf8dfc3e8517e4fe0!2sBengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1718000000000!5m2!1sen!2sin`}
                    width="100%"
                    height="100%"
                    style={{ border: 0, filter: 'grayscale(100%) invert(90%)' }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Latushya — Bangalore"
                  />
                  <div className="absolute inset-0 pointer-events-none border border-gold/10" />
                </div>
              ) : (
                <div className="h-48 border border-dashed border-gold/20 bg-black-card/40 flex flex-col items-center justify-center gap-3">
                  <MapPin size={24} className="text-gold/30" />
                  <span className="text-gray-light/40 text-sm text-center">
                    Serving all of {COMPANY.city}<br/>
                    <span className="text-gold/40 text-xs">Studio address will be updated soon</span>
                  </span>
                </div>
              )}
            </AnimatedSection>
          </div>

          {/* Right — Enquiry form */}
          <AnimatedSection delay={0.2}>
            <div className="relative bg-black-charcoal border border-gray-luxury/20 p-8 md:p-10">
              <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />

              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div>
                    <input
                      name="name" type="text" placeholder="Your Full Name *"
                      required value={form.name} onChange={handleChange}
                      onFocus={() => setFocused('name')} onBlur={() => setFocused(null)}
                      className={inputClass('name')}
                      id="form-name"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    <input
                      name="phone" type="tel" placeholder="Phone Number *"
                      required value={form.phone} onChange={handleChange}
                      onFocus={() => setFocused('phone')} onBlur={() => setFocused(null)}
                      className={inputClass('phone')}
                      id="form-phone"
                    />
                    <input
                      name="email" type="email" placeholder="Email (optional)"
                      value={form.email} onChange={handleChange}
                      onFocus={() => setFocused('email')} onBlur={() => setFocused(null)}
                      className={inputClass('email')}
                      id="form-email"
                    />
                  </div>

                  <div>
                    <select
                      name="wardrobeType" value={form.wardrobeType} onChange={handleChange}
                      onFocus={() => setFocused('wardrobeType')} onBlur={() => setFocused(null)}
                      className={`${inputClass('wardrobeType')} ${form.wardrobeType ? 'text-white' : 'text-gray-light/40'} bg-transparent appearance-none cursor-pointer`}
                      id="form-type"
                    >
                      <option value="" disabled className="bg-black-charcoal">Wardrobe Type Needed</option>
                      {WARDROBE_TYPES.map((t) => (
                        <option key={t} value={t} className="bg-black-charcoal text-white">{t}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <textarea
                      name="message" placeholder="Tell us about your space or requirements..."
                      rows={4} value={form.message} onChange={handleChange}
                      onFocus={() => setFocused('message')} onBlur={() => setFocused(null)}
                      className={`${inputClass('message')} resize-none`}
                      id="form-message"
                    />
                  </div>

                  {/* Inline error message */}
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-start gap-3 p-4 border border-red-500/30 bg-red-500/[0.07]"
                    >
                      <AlertCircle size={15} className="text-red-400 flex-shrink-0 mt-0.5" />
                      <p className="text-red-400 text-xs leading-relaxed">{error}</p>
                    </motion.div>
                  )}

                  <button
                    type="submit"
                    id="form-submit"
                    disabled={loading}
                    className="btn-gold w-full flex items-center justify-center gap-3 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        <svg className="animate-spin" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                        </svg>
                        <span>Sending…</span>
                      </>
                    ) : (
                      <>
                        <span>Send Enquiry</span>
                        <Send size={14} />
                      </>
                    )}
                  </button>

                  <p className="text-gray-light/40 text-xs text-center tracking-wide">
                    Free consultation · No obligations · We respond promptly
                  </p>
                </form>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-16 text-center"
                >
                  <CheckCircle size={56} className="text-gold mb-6" />
                  <h3 className="font-display text-2xl text-white mb-3">Thank You!</h3>
                  <p className="text-gray-light text-sm leading-relaxed max-w-xs">
                    We've received your enquiry. Our wardrobe specialist will be in touch shortly to schedule your free consultation.
                  </p>
                  <div className="mt-6 w-16 h-px bg-gold" />
                </motion.div>
              )}
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
