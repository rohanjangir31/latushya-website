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

  // Smooth, gliding springs for the inner pointer
  const dotConfig = { damping: 28, stiffness: 500, mass: 0.05 };
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
      width: 40,
      height: 40,
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      border: '1px solid rgba(255, 255, 255, 0.5)',
      borderRadius: '50%',
      mixBlendMode: 'normal',
      opacity: 1,
    },
    view: {
      width: 60,
      height: 60,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      borderRadius: '50%',
      mixBlendMode: 'normal',
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
          transition={{ type: 'spring', stiffness: 500, damping: 28, mass: 0.1 }}
          className="relative -translate-x-1/2 -translate-y-1/2 flex items-center justify-center overflow-hidden backdrop-blur-sm"
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
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="19" x2="19" y2="5"></line>
                  <polyline points="9 5 19 5 19 15"></polyline>
                </svg>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>

      {/* Inner Stylized Pointer */}
      <motion.div
        style={{ x: dotX, y: dotY }}
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
      >
        <motion.div
          animate={{
            opacity: cursorState === 'hover' || cursorState === 'hidden' || cursorState === 'view' ? 0 : 1,
            scale: cursorState === 'hover' || cursorState === 'view' ? 0 : 1,
          }}
          transition={{ duration: 0.15, ease: "easeInOut" }}
          className="relative origin-top-left -translate-x-[9px] -translate-y-[6px]"
        >
          {/* Custom white and yellow ultra-chubby pointer requested by user */}
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ filter: 'drop-shadow(0px 2px 5px rgba(0,0,0,0.25))' }}>
            {/* Yellow Tail - shifted left by starting further down the edge, so it visually centers */}
            <line x1="12" y1="19" x2="16" y2="23" stroke="#FFB800" strokeWidth="8" strokeLinecap="round" />
            
            {/* White Arrow Body - geometrically flawless 45-degree angle with huge stroke for a bubbly look */}
            <path d="M9 6 L9 22 L14 17 L20 17 Z" fill="#FFFFFF" stroke="#FFFFFF" strokeWidth="6" strokeLinejoin="round" strokeLinecap="round" />
          </svg>
        </motion.div>
      </motion.div>
    </>
  );
}
