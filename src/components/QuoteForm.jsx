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
    
    // Simulate sending email/form submission
    // Here you could integrate Web3Forms, EmailJS, or a direct mailto link
    // For now, we trigger a direct mailto as requested by the user's intent.
    const subject = encodeURIComponent(`New Quote Request from ${formData.name}`);
    const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\nMobile: ${formData.mobile}\n\nMessage:\n${formData.message}`);
    
    // Open default mail client
    window.location.href = `mailto:contact@latushya.com?subject=${subject}&body=${body}`;

    // Show beautiful success state
    setIsSubmitted(true);
    
    // Reset after 5 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', mobile: '', message: '' });
    }, 5000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1.2, delay: 1.5, ease: [0.16, 1, 0.3, 1] }}
      className="w-full max-w-[360px] p-8 rounded-3xl relative overflow-hidden"
      style={{
        background: 'rgba(255, 255, 255, 0.04)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
      }}
    >
      {/* Decorative top accent line */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#DF4C73] to-transparent opacity-60" />

      <AnimatePresence mode="wait">
        {!isSubmitted ? (
          <motion.div
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h3 className="font-display text-2xl text-white mb-2 tracking-wide">Request a Quote</h3>
            <p className="text-white/40 text-[11px] mb-6 font-light leading-relaxed">Enter your details and our design team will reach out shortly.</p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              
              {/* Name */}
              <div className="relative">
                <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Your Name"
                  className="w-full bg-white/5 border border-white/10 px-5 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#DF4C73] focus:bg-white/10 transition-colors rounded-full"
                />
              </div>

              {/* Email */}
              <div className="relative">
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="Your Email"
                  className="w-full bg-white/5 border border-white/10 px-5 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#DF4C73] focus:bg-white/10 transition-colors rounded-full"
                />
              </div>

              {/* Mobile */}
              <div className="relative">
                <input 
                  type="tel" 
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  required
                  placeholder="Your Mobile"
                  className="w-full bg-white/5 border border-white/10 px-5 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#DF4C73] focus:bg-white/10 transition-colors rounded-full"
                />
              </div>

              {/* Message */}
              <div className="relative mt-2">
                <textarea 
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="Briefly describe your requirements..."
                  rows="2"
                  className="w-full bg-white/5 border border-white/10 px-5 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#DF4C73] focus:bg-white/10 transition-colors resize-none rounded-2xl"
                ></textarea>
              </div>

              <button 
                type="submit"
                className="mt-3 w-full h-[44px] bg-gradient-to-r from-[#DF4C73] to-[#F07595] text-white shadow-[0_4px_20px_rgba(223, 76, 115,0.4)] font-semibold text-[10px] tracking-[0.2em] uppercase rounded-full hover:from-[#5AB9EA] hover:to-[#5AB9EA] hover:shadow-[0_4px_20px_rgba(90, 185, 234,0.5)] transition-all duration-400"
              >
                Submit Request
              </button>
            </form>
          </motion.div>
        ) : (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center text-center py-10"
          >
            <div className="w-16 h-16 rounded-full border border-[#DF4C73] flex items-center justify-center mb-6">
              <svg className="w-6 h-6 text-[#DF4C73]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="font-display text-2xl text-white mb-2">Thank You</h3>
            <p className="text-white/50 text-sm font-light">Your request has been prepared. We look forward to connecting with you.</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
