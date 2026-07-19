import { useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function Magnetic({ children, strength = 0.5 }) {
  const ref = useRef(null);

  // Directly track the magnetic offset on the GPU
  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  // Apply smooth physics to the offset
  const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
  const smoothX = useSpring(mx, springConfig);
  const smoothY = useSpring(my, springConfig);

  useEffect(() => {
    const handleMouse = (e) => {
      if (!ref.current) return;
      const { clientX, clientY } = e;
      const { height, width, left, top } = ref.current.getBoundingClientRect();
      const middleX = clientX - (left + width / 2);
      const middleY = clientY - (top + height / 2);
      
      // Update values directly bypassing React renders
      mx.set(middleX * strength);
      my.set(middleY * strength);
    };

    const reset = () => {
      mx.set(0);
      my.set(0);
    };

    const element = ref.current;
    if (element) {
      element.addEventListener('mousemove', handleMouse);
      element.addEventListener('mouseleave', reset);
    }

    return () => {
      if (element) {
        element.removeEventListener('mousemove', handleMouse);
        element.removeEventListener('mouseleave', reset);
      }
    };
  }, [mx, my, strength]);

  return (
    <motion.div
      style={{ position: 'relative', x: smoothX, y: smoothY }}
      ref={ref}
    >
      {children}
    </motion.div>
  );
}
