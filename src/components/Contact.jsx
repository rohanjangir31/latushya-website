import { motion } from 'framer-motion';
import { useRef, useState } from 'react';
import { COMPANY } from '../data/content';

// ─── Motion helpers ───────────────────────────────────────────────────────────
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 1, delay, ease: [0.16, 1, 0.3, 1] },
});

export default function Contact() {
  const sectionRef = useRef(null);
  
  // Basic form state (no backend connected yet, just UI)
  const [formData, setFormData] = useState({ name: '', phone: '', project: '' });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (COMPANY.whatsapp) {
      const text = `Hello Latushya! My name is ${formData.name}. I'm interested in a consultation for: ${formData.project}`;
      window.open(`https://wa.me/${COMPANY.whatsapp}?text=${encodeURIComponent(text)}`, '_blank');
    }
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-16 lg:py-48 overflow-hidden bg-black-deep"
    >
      {/* ── Background Aesthetics ─────────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none noise-texture" />
      
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-[radial-gradient(circle,_var(--tw-gradient-stops))] from-pink/5 to-transparent pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 lg:px-16 relative z-10 text-center">
        
        {/* ── Header ──────────────────────────────────────────── */}
        <motion.span
          {...fadeUp(0)}
          className="block text-pink text-[10px] tracking-[0.4em] uppercase font-medium mb-8"
        >
          Private Consultation
        </motion.span>

        <motion.h2
          {...fadeUp(0.1)}
          className="font-display font-light text-white leading-[1.1] tracking-tight mb-8"
          style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)' }}
        >
          Request an <span className="italic text-pink">Invitation</span>
        </motion.h2>

        <motion.p
          {...fadeUp(0.2)}
          className="text-white/50 text-base lg:text-xl font-light leading-relaxed max-w-2xl mx-auto mb-12 lg:mb-20"
        >
          We accept a limited number of commissions per month to ensure absolute dedication to every project. Submit your details below, and our design director will contact you.
        </motion.p>

        {/* ── The Form ──────────────────────────────────────────── */}
        <motion.form 
          {...fadeUp(0.3)}
          onSubmit={handleSubmit}
          className="max-w-2xl mx-auto text-left"
        >
          <div className="space-y-12 mb-16">
            
            {/* Name Input */}
            <div className="relative group">
              <input 
                type="text" 
                name="name"
                id="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="block w-full bg-transparent outline-none focus:outline-none border-0 border-b border-white/20 py-4 text-white text-xl focus:ring-0 focus:border-pink transition-colors peer placeholder-transparent"
                placeholder="Name"
              />
              <label 
                htmlFor="name" 
                className="absolute left-0 -top-6 text-white/40 text-xs tracking-widest uppercase transition-all peer-placeholder-shown:text-lg peer-placeholder-shown:text-white/30 peer-placeholder-shown:top-4 peer-focus:-top-6 peer-focus:text-pink peer-focus:text-xs"
              >
                Full Name
              </label>
            </div>

            {/* Phone Input */}
            <div className="relative group">
              <input 
                type="tel" 
                name="phone"
                id="phone"
                required
                value={formData.phone}
                onChange={handleChange}
                className="block w-full bg-transparent outline-none focus:outline-none border-0 border-b border-white/20 py-4 text-white text-xl focus:ring-0 focus:border-pink transition-colors peer placeholder-transparent"
                placeholder="Phone"
              />
              <label 
                htmlFor="phone" 
                className="absolute left-0 -top-6 text-white/40 text-xs tracking-widest uppercase transition-all peer-placeholder-shown:text-lg peer-placeholder-shown:text-white/30 peer-placeholder-shown:top-4 peer-focus:-top-6 peer-focus:text-pink peer-focus:text-xs"
              >
                Phone Number
              </label>
            </div>

            {/* Project Details Input */}
            <div className="relative group">
              <input 
                type="text" 
                name="project"
                id="project"
                required
                value={formData.project}
                onChange={handleChange}
                className="block w-full bg-transparent outline-none focus:outline-none border-0 border-b border-white/20 py-4 text-white text-xl focus:ring-0 focus:border-pink transition-colors peer placeholder-transparent"
                placeholder="Project"
              />
              <label 
                htmlFor="project" 
                className="absolute left-0 -top-6 text-white/40 text-xs tracking-widest uppercase transition-all peer-placeholder-shown:text-lg peer-placeholder-shown:text-white/30 peer-placeholder-shown:top-4 peer-focus:-top-6 peer-focus:text-pink peer-focus:text-xs whitespace-nowrap truncate max-w-full"
              >
                Project Scope (e.g. Wardrobe, Kitchen)
              </label>
            </div>
            
          </div>

          <div className="flex justify-center">
            <button 
              type="submit"
              className="btn-pink px-12 py-5 text-sm tracking-[0.2em]"
            >
              <span>Submit Inquiry</span>
            </button>
          </div>
        </motion.form>

        {/* ── Footer Info ──────────────────────────────────── */}
        <motion.div
          {...fadeUp(0.5)}
          className="mt-32 pt-12 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-8 text-white/80 font-medium text-xs tracking-widest uppercase"
        >
          <p>Strictly By Appointment</p>
          <p>{COMPANY.city}</p>
          <p>Latushya Architecture & Interiors</p>
        </motion.div>

      </div>
    </section>
  );
}
