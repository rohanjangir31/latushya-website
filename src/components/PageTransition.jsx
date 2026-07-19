import { motion } from 'framer-motion';

export default function PageTransition({ children }) {
  return (
    <motion.div>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -30 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.2 }}
        className="w-full flex flex-col min-h-screen pt-[78px]"
      >
        {children}
      </motion.div>

      {/* Slide Out (Exit) Curtain */}
      <motion.div
        className="fixed inset-0 z-[150] bg-black-deep pointer-events-none"
        initial={{ y: '100%' }}
        animate={{ y: '100%' }}
        exit={{ y: '0%' }}
        transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
      />

      {/* Slide In (Enter) Curtain */}
      <motion.div
        className="fixed inset-0 z-[150] bg-black-deep pointer-events-none"
        initial={{ y: '0%' }}
        animate={{ y: '-100%' }}
        exit={{ y: '-100%' }}
        transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
      />
    </motion.div>
  );
}
