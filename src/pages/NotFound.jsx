import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function NotFound() {
  return (
    <section className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden pt-24 pb-20 px-6">
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-pink/30 rounded-full blur-[120px] mix-blend-screen" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-blue/20 rounded-full blur-[100px] mix-blend-screen" />
      </div>

      <div className="max-w-2xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="font-display text-[8rem] md:text-[12rem] leading-none text-transparent bg-clip-text bg-gradient-to-r from-pink to-blue font-light mb-4 tracking-tighter">
            404
          </h1>
          <h2 className="font-display text-3xl md:text-5xl text-white font-light mb-6">
            Page Not Found
          </h2>
          <p className="text-gray-light text-base md:text-lg mb-12 max-w-lg mx-auto leading-relaxed">
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable. Let's get you back to crafting beautiful spaces.
          </p>
          
          <Link to="/">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative inline-flex items-center gap-4 bg-white text-black px-8 py-4 rounded-full font-medium overflow-hidden"
            >
              <span className="relative z-10">Return Home</span>
              <div className="w-8 h-8 rounded-full bg-black/10 flex items-center justify-center relative z-10 transition-transform group-hover:translate-x-1">
                <ArrowRight size={16} />
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-gray-100 to-white opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
