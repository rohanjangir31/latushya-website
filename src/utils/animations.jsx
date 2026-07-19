import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

// ─── Canonical reveal variant — 40px fade-up, 700ms ease-out, fire once
// Used by AnimatedSection, StaggerContainer, and direct motion.div variants.
export const fadeUpVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export const fadeInVariant = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.8, ease: 'easeOut' },
  },
};

// Children stagger 80ms apart — calm, not bouncy
export const staggerContainerVariant = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

export const slideInLeftVariant = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export const slideInRightVariant = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export const scaleUpVariant = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

// Animated section wrapper
export function AnimatedSection({ children, className = '', delay = 0 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={fadeUpVariant}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Stagger container
export function StaggerContainer({ children, className = '' }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={staggerContainerVariant}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Counter hook
export function useCounter(target, duration = 2000, start = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;
    const startTime = performance.now();
    const isDecimal = target % 1 !== 0;

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = eased * target;
      setCount(isDecimal ? parseFloat(current.toFixed(1)) : Math.floor(current));
      if (progress < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, [target, duration, start]);

  return count;
}

// Section header component
export function SectionHeader({ label, title, subtitle, centered = true, light = false }) {
  return (
    <div className={`mb-16 ${centered ? 'text-center' : ''}`}>
      <AnimatedSection>
        <span className="section-label block mb-4">{label}</span>
      </AnimatedSection>
      <AnimatedSection delay={0.1}>
        <h2
          className={`font-display text-4xl md:text-5xl lg:text-6xl font-light mb-6 leading-tight ${
            light ? 'text-black-deep' : 'text-white'
          }`}
        >
          {title}
        </h2>
      </AnimatedSection>
      {subtitle && (
        <AnimatedSection delay={0.2}>
          <p
            className={`text-base md:text-lg max-w-2xl leading-relaxed ${
              centered ? 'mx-auto' : ''
            } ${light ? 'text-gray-mid' : 'text-gray-subtle'}`}
          >
            {subtitle}
          </p>
        </AnimatedSection>
      )}
      <AnimatedSection delay={0.3}>
        <div className={`mt-6 ${centered ? 'flex justify-center' : ''}`}>
          <div className="gold-line" />
        </div>
      </AnimatedSection>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// CINEMATIC TEXT REVEAL
// Splits text into words and animates them up from behind a mask
// ─────────────────────────────────────────────────────────────

export const wordAnimation = {
  hidden: { y: '110%' },
  visible: {
    y: '0%',
    transition: { ease: [0.16, 1, 0.3, 1], duration: 1.1 }
  }
};

export const wordStagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 }
  }
};

export function TextReveal({ text, className = '', delay = 0 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  
  // Parse underscores for italics
  const tokens = [];
  let isItalic = false;
  
  text.split(' ').forEach(word => {
    let currentWord = word;
    let endItalic = false;
    
    if (currentWord.startsWith('_')) {
      isItalic = true;
      currentWord = currentWord.substring(1);
    }
    
    if (currentWord.endsWith('_')) {
      endItalic = true;
      currentWord = currentWord.substring(0, currentWord.length - 1);
    }
    
    tokens.push({
      text: currentWord,
      italic: isItalic
    });
    
    if (endItalic) {
      isItalic = false;
    }
  });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.06, delayChildren: delay } }
      }}
      className={`inline-block ${className}`}
    >
      {tokens.map((token, index) => (
        <span key={index} className="inline-block overflow-hidden mr-[0.25em] align-top">
          <motion.span
            variants={wordAnimation}
            className={`inline-block ${token.italic ? 'italic text-gold' : ''}`}
          >
            {token.text}
          </motion.span>
        </span>
      ))}
    </motion.div>
  );
}
