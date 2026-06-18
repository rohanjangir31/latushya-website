import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Vite 8 uses rolldown (not rollup) and oxc (not esbuild) by default.
// manualChunks with rolldown requires a function; esbuild minifier is no
// longer bundled — use the default oxc minifier instead.
export default defineConfig({
  plugins: [react()],

  build: {
    // Target modern browsers — smaller, faster output
    target: 'es2020',

    // Raise chunk warning threshold (framer-motion is large by design)
    chunkSizeWarningLimit: 600,

    // Use Vite 8's default oxc minifier (esbuild is no longer bundled)
    // minify: 'oxc' is the default, so no need to specify it explicitly

    // No source maps in production — smaller deploy
    sourcemap: false,

    rollupOptions: {
      output: {
        // Split vendor code into separate cacheable chunks
        // rolldown requires this as a function, not an object
        manualChunks(id) {
          if (id.includes('/react/') || id.includes('/react-dom/')) {
            return 'vendor-react';
          }
          if (id.includes('/framer-motion/')) {
            return 'vendor-motion';
          }
          if (id.includes('/lucide-react/')) {
            return 'vendor-icons';
          }
        },
      },
    },
  },

  // Pre-bundle these for faster dev starts
  optimizeDeps: {
    include: ['react', 'react-dom', 'framer-motion', 'lucide-react'],
  },

  preview: {
    port: 4173,
  },
});
