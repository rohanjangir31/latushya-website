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
      <section id="about" className="relative py-20 lg:py-48 bg-black-deep overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[radial-gradient(circle,_var(--tw-gradient-stops))] from-pink/5 to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <div className="grid lg:grid-cols-12 gap-16 lg:gap-24 items-center">

            {/* Left — Photo */}
            <div ref={photoRef} className="lg:col-span-5 relative">
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={isPhotoInView ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 1.4, ease: EASE }} className="relative z-10 overflow-hidden" style={{ aspectRatio: '4/5' }}>
                <img src="/projects/media__1784490387524.jpg" alt="Latushya Studio Aesthetic" className="w-full h-full object-cover transition-all duration-1000" loading="lazy" decoding="async" />
              </motion.div>
              <motion.div initial={{ opacity: 0, x: -20 }} animate={isPhotoInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 1, delay: 0.6 }} className="absolute -left-8 top-1/4 w-px h-64 bg-gradient-to-b from-transparent via-pink to-transparent hidden lg:block" />
            </div>

            {/* Right — Manifesto */}
            <div className="lg:col-span-7 lg:pl-12">
              <AnimatedSection>
                <span className="block text-pink text-[10px] tracking-[0.4em] uppercase font-medium mb-8">Studio Philosophy</span>
              </AnimatedSection>
              <div className="font-display text-4xl md:text-5xl lg:text-[64px] font-light text-white leading-[1.1] mb-12">
                <TextReveal text="We do not decorate." delay={0.1} />
                <br />
                <span className="italic text-pink"><TextReveal text="We construct living spaces." delay={0.3} /></span>
              </div>
              <AnimatedSection delay={0.3}>
                <div className="space-y-8 text-gray-subtle text-lg font-light leading-relaxed max-w-2xl">
                  <p>Latushya was founded on a singular belief that a home should be an architectural extension of the people who live within. We reject the mass produced and the templated. Every wardrobe, every kitchen, and every interior space we execute is an exclusive commission.</p>
                  <p>Our process begins with silence, listening to how you move through your home, understanding your storage habits, and studying the natural light of your space. Only then do we engineer solutions using world class German hardware.</p>
                  <p>We are not just designers, we are masterful builders. We uncover brilliant ideas and craft solutions you didn't even know you needed. From the first sketch to the final soft close of a cabinet door, our commitment is to absolute, uncompromising quality.</p>
                </div>
              </AnimatedSection>
              <AnimatedSection delay={0.5}>
                <div className="mt-12 pt-10 border-t border-white/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <p className="font-display text-2xl text-white tracking-wide">The Founders</p>
                    <p className="text-pink text-[10px] tracking-widest uppercase mt-2">Chandan Kumar • Indraj Sharma • Sarita Kumari</p>
                  </div>
                  <div className="w-16 h-[2px] bg-gradient-to-r from-pink to-blue opacity-80" />
                </div>
              </AnimatedSection>
            </div>

          </div>
        </div>
      </section>

      {/* ── BRIDGE: Cinematic Quote ──────────────────────────────────────── */}
      <section ref={bridgeRef} className="relative py-28 lg:py-40 overflow-hidden" style={{ background: 'linear-gradient(to bottom, #040b14, #03070E)' }}>
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
              Once you commission us, a precise and time tested sequence begins. No shortcuts. No surprises.
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

