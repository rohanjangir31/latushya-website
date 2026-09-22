import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { AnimatedSection, TextReveal } from '../utils/animations';
import { PROCESS_STEPS } from '../data/content';

const EASE    = [0.25, 0.46, 0.45, 0.94];
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

function TimelineStep({ step, index, setVisibleImage, activeIndex }) {
  const stepRef = useRef(null);
  const inView = useInView(stepRef, { margin: '-50% 0px -50% 0px' });
  const isActive = activeIndex === index;

  useEffect(() => {
    if (inView) setVisibleImage(index);
  }, [inView, index, setVisibleImage]);

  return (
    <div
      ref={stepRef}
      style={{
        paddingTop: '10vh',
        paddingBottom: '10vh',
        position: 'relative',
        opacity: isActive ? 1 : 0.25,
        transform: isActive ? 'translateX(0)' : 'translateX(-10px)',
        transition: 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      }}
      className="pl-8 md:pl-16 border-l border-white/5"
    >
      <div
        className="absolute left-0 top-0 w-px bg-pink transition-all duration-1000"
        style={{ height: isActive ? '100%' : '0%', boxShadow: isActive ? '0 0 10px rgba(223,76,115,0.5)' : 'none' }}
      />
      <div
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 rounded-full border border-pink/40 flex items-center justify-center transition-all duration-700 bg-[#03070E]"
        style={{ width: isActive ? '24px' : '12px', height: isActive ? '24px' : '12px', borderColor: isActive ? '#DF4C73' : 'rgba(223,76,115,0.2)' }}
      >
        <div className="rounded-full bg-pink transition-all duration-700" style={{ width: isActive ? '6px' : '0px', height: isActive ? '6px' : '0px', boxShadow: isActive ? '0 0 8px rgba(223,76,115,0.8)' : 'none' }} />
      </div>
      <div style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', left: '20px', fontFamily: DISPLAY, fontSize: 'clamp(5rem, 15vw, 14rem)', fontWeight: 700, color: 'transparent', WebkitTextStroke: isActive ? '1px rgba(223,76,115,0.15)' : '1px rgba(255,255,255,0.03)', lineHeight: 1, zIndex: 0, pointerEvents: 'none', transition: 'all 0.8s ease' }}>
        {step.step}
      </div>
      <div style={{ position: 'relative', zIndex: 1 }}>
        <h3 style={{ fontFamily: DISPLAY, fontSize: 'clamp(1.8rem, 4vw, 44px)', fontWeight: 300, letterSpacing: '-0.015em', color: isActive ? '#DF4C73' : 'rgba(255,255,255,0.8)', marginBottom: '16px', transition: 'color 0.8s ease' }}>
          {step.title}
        </h3>
        <div className="h-[2px] bg-gradient-to-r from-pink to-blue opacity-80 transition-all duration-700" style={{ width: isActive ? '3.5rem' : '0px', marginBottom: '20px' }} />
        <p style={{ fontFamily: SANS, fontSize: 'clamp(0.9rem, 2vw, 18px)', fontWeight: 300, lineHeight: 1.85, color: 'rgba(255,255,255,0.6)', maxWidth: '420px' }}>
          {step.description}
        </p>
      </div>
    </div>
  );
}

export default function About() {
  const photoRef = useRef(null);
  const isPhotoInView = useInView(photoRef, { once: true, margin: '-100px' });
  const bridgeRef = useRef(null);
  const isBridgeInView = useInView(bridgeRef, { once: true, margin: '-80px' });
  const [visibleImage, setVisibleImage] = useState(0);

  return (
    <>
      {/* ── PART 1: WHO WE ARE ──────────────────────────────────────────── */}
      <section id="about" className="relative py-16 lg:py-20 bg-[#03070E] overflow-hidden">
        <div className="absolute top-0 right-0 w-[1000px] h-[1000px] bg-[radial-gradient(circle,_var(--tw-gradient-stops))] from-[#DF4C73]/[0.04] to-transparent pointer-events-none" />
        
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          
          {/* --- TOP FULL-WIDTH HEADER --- */}
          <div className="w-full mb-16 lg:mb-24 flex flex-col items-start">
            <AnimatedSection>
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-[2px] bg-[#DF4C73]" />
                <span className="text-[#DF4C73] text-[10px] tracking-[0.4em] uppercase font-semibold">
                  Studio Philosophy
                </span>
              </div>
            </AnimatedSection>
            
            {/* The heading needs to breathe! Full width prevents awkward wrapping. */}
            <h1 
              className="font-display font-light text-white leading-[1.05] tracking-tight drop-shadow-md w-full max-w-[1200px]"
              style={{ fontSize: 'clamp(2.5rem, 5.5vw, 6rem)' }}
            >
              <TextReveal text="We do not decorate." delay={0.1} />
              <br />
              <span className="italic text-white/50"><TextReveal text="We construct " delay={0.3} /></span>
              <span className="italic text-[#DF4C73] font-normal drop-shadow-lg"><TextReveal text="living spaces." delay={0.4} /></span>
            </h1>
          </div>

          {/* --- BOTTOM GRID: PHOTO & TEXT --- */}
          <div className="grid lg:grid-cols-12 gap-16 lg:gap-24 items-start">

            {/* Left — Photo */}
            <div ref={photoRef} className="lg:col-span-5 relative">
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={isPhotoInView ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 1.4, ease: EASE }} className="relative z-10 overflow-hidden rounded-[2rem] shadow-2xl h-[400px] md:h-[500px] lg:h-[700px]">
                <img src="/projects/media__1784490387524.jpg" alt="Latushya Studio Aesthetic" className="w-full h-full object-cover transition-all duration-1000" loading="lazy" decoding="async" />
              </motion.div>
              <motion.div initial={{ opacity: 0, x: -20 }} animate={isPhotoInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 1, delay: 0.6 }} className="absolute -left-8 top-1/4 w-px h-64 bg-gradient-to-b from-transparent via-[#DF4C73] to-transparent hidden lg:block" />
            </div>

            {/* Right — Manifesto text */}
            <div className="lg:col-span-7 lg:pl-12 lg:pt-8">
              <AnimatedSection delay={0.2}>
                <div className="space-y-8 text-white/70 text-base lg:text-lg font-light leading-relaxed max-w-2xl">
                   <p>Latushya started with one simple idea — most interior work in Bangalore is either too expensive for what you get, or too cheap to last. We wanted to change that. So we built a studio that does high-quality, fully custom work at a price that's actually fair.</p>
                   <p>We spend a lot of time at the start just listening. What bothers you about your current space? How do you actually use your wardrobe in the morning? Where does the clutter always end up? The answers to those questions drive the whole design.</p>
                   <p>We use German hardware — Blum, Häfele, Hettich — because it genuinely lasts. Not because it sounds impressive. When you open a drawer five years from now and it still glides silently, that's the whole point.</p>
                </div>
              </AnimatedSection>
              
              <AnimatedSection delay={0.4}>
                <div className="mt-16 pt-10 border-t border-white/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <p className="font-display text-2xl lg:text-3xl text-white tracking-wide font-light">The Founders</p>
                    <p className="text-[#DF4C73] text-[9px] lg:text-[10px] tracking-widest uppercase mt-3">Chandan Kumar <span className="mx-2 opacity-30">|</span> Indraj Sharma <span className="mx-2 opacity-30">|</span> Sarita Kumari</p>
                  </div>
                  <div className="w-16 h-[2px] bg-gradient-to-r from-[#DF4C73] to-[#5AB9EA] opacity-80" />
                </div>
              </AnimatedSection>
            </div>

          </div>
        </div>
      </section>

      {/* ── BRIDGE: Cinematic Quote ──────────────────────────────────────── */}
      <section ref={bridgeRef} className="relative py-20 lg:py-24 overflow-hidden" style={{ background: 'linear-gradient(to bottom, #040b14, #03070E)' }}>
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-pink/20 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-blue/20 to-transparent" />
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden" style={{ fontFamily: DISPLAY, fontSize: 'clamp(8rem, 20vw, 22rem)', fontWeight: 700, color: 'transparent', WebkitTextStroke: '1px rgba(255,255,255,0.025)', letterSpacing: '-0.04em', lineHeight: 1 }}>
          HOW
        </div>
        <div className="max-w-5xl mx-auto px-6 lg:px-16 text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={isBridgeInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 1, ease: EASE }}>
            <div className="flex items-center justify-center gap-4 mb-10">
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-pink/60" />
              <span className="text-pink/70 text-[10px] tracking-[0.4em] uppercase font-medium">Methodology</span>
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-pink/60" />
            </div>
            <h2 className="text-white font-light mb-6 leading-tight" style={{ fontFamily: DISPLAY, fontSize: 'clamp(2.2rem, 5vw, 4.5rem)', letterSpacing: '-0.02em' }}>
              Six steps.{' '}
              <span className="italic text-pink">One commitment.</span>
              <br />Your home, built right.
            </h2>
            <p className="text-white/40 text-base max-w-lg mx-auto leading-relaxed" style={{ fontFamily: SANS }}>
              Once you give us the go-ahead, we follow the same six steps every time. It keeps things predictable for you, and it's how we've managed to stay consistent across every project.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── PART 2: THE PROCESS ─────────────────────────────────────────── */}
      <section id="process" className="py-20 lg:pt-[80px] lg:pb-[160px] relative" style={{ background: '#03070E' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 relative">

            {/* Left: Scrolling Steps */}
            <div className="process-text-col">
              <div style={{ paddingTop: '10vh', paddingBottom: '30vh' }}>
                {PROCESS_STEPS.map((step, index) => (
                  <TimelineStep key={step.step} step={step} index={index} setVisibleImage={setVisibleImage} activeIndex={visibleImage} />
                ))}
              </div>
            </div>

            {/* Right: Sticky Image */}
            <div className="hidden lg:block relative">
              <div className="sticky top-32 w-full h-[70vh] overflow-hidden rounded-3xl" style={{ boxShadow: '0 20px 40px rgba(0,0,0,0.4)' }}>
                {PROCESS_IMAGES.map((src, index) => (
                  <motion.img key={src + index} src={src} alt={`Process step ${index + 1}`} className="absolute inset-0 w-full h-full object-cover" initial={{ opacity: 0, scale: 1.05 }} animate={{ opacity: visibleImage === index ? 1 : 0, scale: visibleImage === index ? 1 : 1.05 }} transition={{ duration: 0.8, ease: EASE }} style={{ zIndex: visibleImage === index ? 10 : 1 }} />
                ))}
                <div className="absolute inset-0 bg-gradient-to-t from-black-deep/60 via-transparent to-transparent z-20 pointer-events-none" />
                <div className="absolute bottom-8 left-8 right-8 z-30 flex gap-2">
                  {PROCESS_IMAGES.map((_, i) => (
                    <div key={i} className="h-[2px] flex-1 bg-white/20 overflow-hidden">
                      <motion.div className="h-full bg-pink" initial={{ width: '0%' }} animate={{ width: visibleImage >= i ? '100%' : '0%' }} transition={{ duration: 0.6, ease: EASE }} />
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}

