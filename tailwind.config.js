/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        black: {
          DEFAULT: '#0F0F0F',
          deep: '#0F0F0F',
          charcoal: '#1A1A1A',
          soft: '#222222',
          card: '#161616',
        },
        pink: {
          DEFAULT: '#D496C3',
          light: '#E2B1D6',
          dark: '#B675A2',
          muted: '#C48BAF',
          pale: '#F2DFED',
        },
        blue: {
          DEFAULT: '#67CBE1',
          light: '#8EDDF0',
          dark: '#4A9CB0',
          muted: '#5CBED4',
          pale: '#DEF4F9',
        },
        white: {
          DEFAULT: '#FFFFFF',
          off: '#F8F6F0',
          cream: '#FAF7F2',
        },
        gray: {
          luxury: '#3A3A3A',
          mid: '#555555',
          light: '#888888',
          subtle: '#BBBBBB',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Playfair Display', 'Georgia', 'serif'],
        mono: ['JetBrains Mono', 'monospace'],
        display: ['Cormorant Garamond', 'serif'],
      },
      fontSize: {
        '7xl': ['4.5rem', { lineHeight: '1.1' }],
        '8xl': ['6rem', { lineHeight: '1.05' }],
        '9xl': ['8rem', { lineHeight: '1' }],
      },
      letterSpacing: {
        widest: '0.25em',
        ultra: '0.4em',
      },
      backgroundImage: {
        'pink-gradient': 'linear-gradient(135deg, #D496C3 0%, #67CBE1 100%)',
        'dark-gradient': 'linear-gradient(180deg, #0F0F0F 0%, #1A1A1A 100%)',
        'hero-overlay': 'linear-gradient(to right, rgba(15,15,15,0.9) 0%, rgba(15,15,15,0.5) 60%, rgba(15,15,15,0.2) 100%)',
      },
      boxShadow: {
        'pink': '0 0 30px rgba(212, 150, 195, 0.15)',
        'pink-lg': '0 0 60px rgba(212, 150, 195, 0.25)',
        'luxury': '0 25px 80px rgba(0,0,0,0.6)',
        'card': '0 8px 40px rgba(0,0,0,0.4)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 3s linear infinite',
        'pulse-pink': 'pulsePink 2s ease-in-out infinite',
        'scroll': 'scroll 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        pulsePink: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(212, 150, 195, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(212, 150, 195, 0.6)' },
        },
        scroll: {
          '0%': { transform: 'translateY(0)', opacity: '1' },
          '100%': { transform: 'translateY(12px)', opacity: '0' },
        },
      },
      transitionTimingFunction: {
        'luxury': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      },
    },
  },
  plugins: [],
  // Custom variants for iOS safe area inset support
  // Used by the mobile sticky CTA bar so it doesn't overlap the iPhone home indicator
}

// Inline plugin for safe-area utilities (no extra package needed)
// Add this to your index.css if pb-safe doesn't work:
// .pb-safe { padding-bottom: env(safe-area-inset-bottom, 0px); }
