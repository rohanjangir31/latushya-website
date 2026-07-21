import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { PROCESS_STEPS } from '../data/content';
import { TextReveal } from '../utils/animations';

const EASE   = [0.25, 0.46, 0.45, 0.94];
const DISPLAY = "'Cormorant Garamond', 'Playfair Display', Georgia, serif";
const SANS    = "'Inter', system-ui, sans-serif";

const PROCESS_IMAGES = [
  '/projects/media__1784490387524.jpg',
  '/projects/media__1784490387507.jpg',
  '/projects/media__1784490387502.jpg',
  '/projects/media__1784490387517.jpg',
  '/projects/media__1784490387392.jpg',
  '/projects/media__1784490387524.jpg'
];

function TimelineStep({ step, index, setVisibleImage }) {
  const stepRef = useRef(null);
  const inView = useInView(stepRef, { margin: '-50% 0px -50% 0px' });

  useEffect(() => {
    if (inView) setVisibleImage(index);
  }, [inView, index, setVisibleImage]);

  return (
    <div
      ref={stepRef}
      style={{
        paddingTop: '20vh',
        paddingBottom: '20vh',
        position: 'relative',
        opacity: inView ? 1 : 0.3,
        transition: 'opacity 0.6s ease',
      }}
    >
      {/* Oversized background numeral */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          transform: 'translateY(-50%)',
          left: '-40px',
          fontFamily: DISPLAY,
          fontSize: 'clamp(8rem, 15vw, 12rem)',
          fontWeight: 700,
          color: 'rgba(255,255,255,0.03)',
          lineHeight: 1,
          zIndex: 0,
          pointerEvents: 'none',
        }}
      >
        {step.step}
      </div>

      <div style={{ position: 'relative', zIndex: 1 }}>
        <h3
          style={{
            fontFamily: DISPLAY,
            fontSize: '40px',
            fontWeight: 400,
            letterSpacing: '-0.015em',
            color: 'rgba(255,255,255,0.95)',
            marginBottom: '24px',
          }}
        >
          {step.title}
        </h3>

        <div style={{ width: '40px', height: '1px', background: 'rgba(212,175,55,0.4)', marginBottom: '24px' }} />

        <p
          style={{
            fontFamily: SANS,
            fontSize: '20px',
            fontWeight: 300,
            lineHeight: 1.8,
            color: 'rgba(255,255,255,0.6)',
            maxWidth: '460px',
          }}
        >
          {step.description}
        </p>
      </div>
    </div>
  );
}

export default function Process() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: '-60px' });
  const [visibleImage, setVisibleImage] = useState(0);

  return (
    <section
      id="process"
      style={{
        background: '#0a0a0a',
        paddingTop: '160px',
        paddingBottom: '160px',
        position: 'relative',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-16">
        
        {/* SECTION HEADER */}
        <div ref={headerRef} style={{ marginBottom: '80px' }}>
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65 }}
            style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}
          >
            <div style={{ width: '18px', height: '1px', background: 'rgba(212,175,55,0.65)' }} />
            <span style={{ fontFamily: SANS, fontSize: '12px', letterSpacing: '0.38em', textTransform: 'uppercase', color: 'rgba(212,175,55,0.65)' }}>
              Methodology
            </span>
          </motion.div>

          <TextReveal
            text="The _Process_"
            style={{
              fontFamily: DISPLAY,
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              fontWeight: 300,
              letterSpacing: '-0.02em',
              lineHeight: 1.05,
              color: '#ffffff',
            }}
          />
        </div>

        {/* STICKY LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 relative">
          
          {/* Left Col: Scrolling Text */}
          <div className="process-text-col">
            <div style={{ paddingTop: '10vh', paddingBottom: '30vh' }}>
              {PROCESS_STEPS.map((step, index) => (
                <TimelineStep
                  key={step.step}
                  step={step}
                  index={index}
                  setVisibleImage={setVisibleImage}
                />
              ))}
            </div>
          </div>

          {/* Right Col: Sticky Image */}
          <div className="hidden lg:block relative">
            <div className="sticky top-32 w-full h-[70vh] overflow-hidden rounded-sm" style={{ boxShadow: '0 20px 40px rgba(0,0,0,0.4)' }}>
              {PROCESS_IMAGES.map((src, index) => (
                <motion.img
                  key={src}
                  src={src}
                  alt={`Process step ${index + 1}`}
                  className="absolute inset-0 w-full h-full object-cover"
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ 
                    opacity: visibleImage === index ? 1 : 0,
                    scale: visibleImage === index ? 1 : 1.05 
                  }}
                  transition={{ duration: 0.8, ease: EASE }}
                  style={{ zIndex: visibleImage === index ? 10 : 1 }}
                />
              ))}
              
              {/* Overlay for cinematic contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-black-deep/60 via-transparent to-transparent z-20 pointer-events-none" />
              
              {/* Progress indicator */}
              <div className="absolute bottom-8 left-8 right-8 z-30 flex gap-2">
                {PROCESS_IMAGES.map((_, i) => (
                  <div key={i} className="h-[2px] flex-1 bg-white/20 overflow-hidden">
                    <motion.div 
                      className="h-full bg-gold"
                      initial={{ width: '0%' }}
                      animate={{ width: visibleImage >= i ? '100%' : '0%' }}
                      transition={{ duration: 0.6, ease: EASE }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
