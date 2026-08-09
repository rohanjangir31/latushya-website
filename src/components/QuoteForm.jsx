import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function QuoteForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(`New Quote Request from ${formData.name}`);
    const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\nMobile: ${formData.mobile}\n\nMessage:\n${formData.message}`);
    window.location.href = `mailto:contact@latushya.com?subject=${subject}&body=${body}`;
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', mobile: '', message: '' });
    }, 5000);
  };

  // High-contrast translucent capsule inputs
  const inputClasses = "w-full bg-black/40 border border-white/20 px-4 py-3 text-xs text-white placeholder-white/70 focus:outline-none focus:border-[#DF4C73] focus:bg-black/60 transition-all duration-300 rounded-xl shadow-inner";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.0, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
      className="w-full max-w-[320px] p-7 rounded-[2rem] relative overflow-hidden group"
      style={{
        background: 'rgba(10, 15, 25, 0.1)', // Highly translucent
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        border: '1px solid rgba(255, 255, 255, 0.15)',
        boxShadow: '0 30px 60px -10px rgba(0, 0, 0, 0.7), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
      }}
    >
      {/* Subtle ambient glow behind form to lift it from background */}
      <div className="absolute top-0 right-0 w-[150%] h-[150%] bg-gradient-to-bl from-white/5 to-transparent pointer-events-none rounded-full blur-3xl translate-x-1/3 -translate-y-1/3" />

      <AnimatePresence mode="wait">
        {!isSubmitted ? (
          <motion.div
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            className="relative z-10"
          >
            <h3 className="font-display text-[26px] text-white mb-6 tracking-wide leading-tight drop-shadow-lg">
              Request a <em className="not-italic text-[#DF4C73] font-medium drop-shadow-md">Quote</em>
            </h3>

            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="Your Full Name" className={inputClasses} />
              <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="Email Address" className={inputClasses} />
              <input type="tel" name="mobile" value={formData.mobile} onChange={handleChange} required placeholder="Mobile Number" className={inputClasses} />
              <textarea name="message" value={formData.message} onChange={handleChange} required placeholder="Describe your space & approximate dimensions..." rows="2" className={`${inputClasses} resize-none`}></textarea>

              <div className="mt-2">
                <p className="text-[10px] text-white/90 text-center italic mb-3">
                  *Please include approximate measurements for a more accurate estimate.
                </p>
                <button 
                  type="submit"
                  className="w-full h-[44px] bg-gradient-to-r from-[#DF4C73] to-[#F07595] text-white font-semibold text-[10px] tracking-[0.25em] uppercase rounded-xl hover:shadow-[0_8px_25px_rgba(223,76,115,0.5)] transition-all duration-400"
                >
                  Submit Request
                </button>
              </div>
            </form>
          </motion.div>
        ) : (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center justify-center text-center py-8 relative z-10"
          >
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.2 }}
              className="w-14 h-14 rounded-full bg-white/10 border border-white/30 flex items-center justify-center mb-4 backdrop-blur-md"
            >
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
              </svg>
            </motion.div>
            <h3 className="font-display text-2xl text-white mb-2 drop-shadow-lg">Thank You</h3>
            <p className="text-white/90 text-xs font-medium leading-relaxed drop-shadow-md">
              We will contact you shortly.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
