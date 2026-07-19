import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export default function ImageReveal({ children, delay = 0, className = '' }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      {/* The actual image or content */}
      <motion.div
        initial={{ scale: 1.1, filter: 'blur(4px)' }}
        animate={isInView ? { scale: 1, filter: 'blur(0px)' } : {}}
        transition={{ duration: 1.6, delay: delay + 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="w-full h-full"
      >
        {children}
      </motion.div>

      {/* The Curtain Overlay that slides away */}
      <motion.div
        initial={{ y: '0%' }}
        animate={isInView ? { y: '-100%' } : {}}
        transition={{ duration: 1.2, delay: delay, ease: [0.76, 0, 0.24, 1] }}
        className="absolute inset-0 bg-black-deep z-10 origin-bottom"
      />
    </div>
  );
}
