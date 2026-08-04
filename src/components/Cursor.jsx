import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useCursor } from '../context/CursorContext';

export default function Cursor() {
  const { cursorState, setCursorState } = useCursor();
  
  // Track raw mouse position outside of React state
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth springs for the outer ring (snappy and responsive)
  const springConfig = { damping: 25, stiffness: 700, mass: 0.15 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Fast springs for the inner dot (almost instant tracking)
  const dotConfig = { damping: 20, stiffness: 1200, mass: 0.05 };
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

  // Variants for different cursor states (handles size, color, blending)
  const ringVariants = {
    default: {
      width: 32,
      height: 32,
      backgroundColor: 'rgba(201, 75, 115, 0)',
      border: '1px solid rgba(90, 185, 234, 0.3)',
      mixBlendMode: 'normal',
    },
    hover: {
      width: 64,
      height: 64,
      backgroundColor: 'rgba(201, 75, 115, 0.1)',
      border: '1px solid rgba(90, 185, 234, 0.3)',
      mixBlendMode: 'normal',
    },
    view: {
      width: 80,
      height: 80,
      backgroundColor: 'rgba(255, 255, 255, 1)',
      border: 'none',
      mixBlendMode: 'difference',
    },
    hidden: {
      opacity: 0,
    }
  };

  // Only show custom cursor on non-touch devices
  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null;
  }

  if (!isVisible) return null;

  return (
    <>
      {/* Outer Ring Wrapper (Handles purely positional GPU translation) */}
      <motion.div
        style={{ x: smoothX, y: smoothY }}
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
      >
        {/* Inner Ring (Handles centering, size, and style variants) */}
        <motion.div
          variants={ringVariants}
          animate={cursorState}
          transition={{ type: 'spring', stiffness: 700, damping: 25, mass: 0.15 }}
          className="relative -translate-x-1/2 -translate-y-1/2 flex items-center justify-center rounded-full overflow-hidden"
        >
          {cursorState === 'view' && (
            <motion.span
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="text-black-deep text-[10px] tracking-widest font-bold uppercase mix-blend-normal"
            >
              View
            </motion.span>
          )}
        </motion.div>
      </motion.div>

      {/* Tiny Center Dot Wrapper */}
      <motion.div
        style={{ x: dotX, y: dotY }}
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
      >
        <motion.div
          animate={{
            opacity: cursorState === 'view' || cursorState === 'hidden' ? 0 : 1,
            scale: cursorState === 'hover' ? 0 : 1,
          }}
          transition={{ duration: 0.2 }}
          className="relative -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-pink rounded-full"
        />
      </motion.div>
    </>
  );
}
