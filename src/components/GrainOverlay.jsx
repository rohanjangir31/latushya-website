export default function GrainOverlay() {
  return (
    <div
      className="fixed inset-0 z-[9998] pointer-events-none opacity-[0.035]"
      style={{ mixBlendMode: 'difference' }}
    >
      <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <filter id="noiseFilter">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.85"
            numOctaves="3"
            stitchTiles="stitch"
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#noiseFilter)" />
      </svg>
    </div>
  );
}
