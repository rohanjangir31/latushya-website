export default function GrainOverlay() {
  return (
    <div
      className="fixed inset-0 z-[9998] pointer-events-none opacity-[0.03] noise-overlay"
      aria-hidden="true"
    />
  );
}
