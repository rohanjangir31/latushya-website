import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import { useCursor } from '../context/CursorContext';

export default function Cursor() {
  const { cursorState, setCursorState } = useCursor();
  
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Snappy springs for the outer shape
  const springConfig = { damping: 25, stiffness: 700, mass: 0.1 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Instant springs for the inner dot
  const dotConfig = { damping: 20, stiffness: 1200, mass: 0.02 };
  const dotX = useSpring(mouseX, dotConfig);
  const dotY = useSpring(mouseY, dotConfig);

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e) => {
      if (!isVisible) setIsVisible(true);
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      if (!target) return;
      
      const isClickable = target.closest('a') || target.closest('button');
      const isView = target.closest('[data-cursor="view"]');

      if (isView) {
        setCursorState('view');
      } else if (isClickable) {
        setCursorState('hover');
      } else {
        setCursorState('default');
      }
    };

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mouseover', handleMouseOver);
    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [mouseX, mouseY, isVisible, setCursorState]);

  // Ultra-premium minimalist variants
  const ringVariants = {
    default: {
      width: 0,
      height: 0,
      backgroundColor: 'transparent',
      border: '0px solid transparent',
      borderRadius: '50%',
      mixBlendMode: 'difference',
      opacity: 0,
    },
    hover: {
      width: 32,
      height: 32,
      backgroundColor: '#FFFFFF',
      border: '0px solid transparent',
      borderRadius: '50%',
      mixBlendMode: 'difference',
      opacity: 1,
    },
    view: {
      width: 48,
      height: 48,
      backgroundColor: 'transparent',
      border: 'none',
      borderRadius: '50%',
      mixBlendMode: 'difference',
      boxShadow: 'none',
      opacity: 1,
    },
    hidden: {
      opacity: 0,
      scale: 0.8,
    }
  };

  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null;
  }

  if (!isVisible) return null;

  return (
    <>
      <motion.div
        style={{ x: smoothX, y: smoothY }}
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
      >
        <motion.div
          variants={ringVariants}
          animate={cursorState}
          transition={{ type: 'spring', stiffness: 700, damping: 25, mass: 0.1 }}
          className="relative -translate-x-1/2 -translate-y-1/2 flex items-center justify-center overflow-hidden"
        >
          <AnimatePresence>
            {cursorState === 'view' && (
              <motion.div
                initial={{ opacity: 0, scale: 0, rotate: -45 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0, rotate: 45 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="flex items-center justify-center text-white"
              >
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="19" x2="19" y2="5"></line>
                  <polyline points="9 5 19 5 19 15"></polyline>
                </svg>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>

      <motion.div
        style={{ x: dotX, y: dotY }}
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
      >
        <motion.div
          animate={{
            opacity: cursorState === 'view' || cursorState === 'hidden' ? 0 : 1,
            scale: cursorState === 'hover' ? 0 : 1,
          }}
          transition={{ duration: 0.15 }}
          className="relative text-white -translate-x-[2px] -translate-y-[2px]"
        >
          {/* Custom thick, rounded premium pointer */}
          <svg width="28" height="28" viewBox="-2 -2 20 20" fill="currentColor" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round">
            <path d="M0 0 L0 14 L4.5 10 L11 10 Z" />
          </svg>
        </motion.div>
      </motion.div>
    </>
  );
}
