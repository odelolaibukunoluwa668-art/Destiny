/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // PRECIOUS Restaurant Master Color Palette
        charcoal: {
          50: '#3D3B3B',
          100: '#323030',
          200: '#2A2929',
          DEFAULT: '#242323', // Deep charcoal/black
          dark: '#1C1B1B',
          darker: '#141313',
          black: '#0D0D0D',
        },
        gold: {
          50: '#FFFDF5',
          100: '#FFF8DE',
          200: '#FFECA8',
          300: '#FFDF66',
          400: '#F5B900', // Golden yellow
          500: '#D99A25', // Warm gold
          600: '#BA7E18',
          700: '#915F0D',
          800: '#694307',
          DEFAULT: '#F5B900',
          warm: '#D99A25',
          light: '#F8CE46',
        },
        foodGreen: {
          light: '#5BB03D',
          DEFAULT: '#43852C', // Natural food green
          dark: '#30631F',
        },
        ivory: {
          50: '#FCFAF6',
          100: '#F8F4EC',
          DEFAULT: '#F3EFE6',
          200: '#E8E1D3',
          300: '#D6CCB8',
        },
        pureWhite: '#FFFFFF',
      },
      fontFamily: {
        serif: ["'Playfair Display'", "'Cormorant Garamond'", 'Georgia', 'serif'],
        cormorant: ["'Cormorant Garamond'", "'Playfair Display'", 'serif'],
        sans: ["'Plus Jakarta Sans'", '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        display: ["'Playfair Display'", "'Cinzel'", 'serif'],
      },
      letterSpacing: {
        'tightest': '-0.035em',
        'tighter': '-0.02em',
        'tight': '-0.01em',
        'luxury': '0.15em',
        'widest-luxury': '0.22em',
        'ultra-wide': '0.3em',
      },
      boxShadow: {
        'gold-glow': '0 0 25px -5px rgba(245, 185, 0, 0.35)',
        'gold-subtle': '0 4px 20px -2px rgba(217, 154, 37, 0.25)',
        'dark-card': '0 20px 40px -15px rgba(0, 0, 0, 0.6)',
        'luxury-elevation': '0 25px 50px -12px rgba(13, 13, 13, 0.45)',
      },
      animation: {
        'fade-in': 'fadeIn 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'slide-up': 'slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'pulse-subtle': 'pulseSubtle 3s ease-in-out infinite',
        'float-slow': 'floatSlow 6s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.9', transform: 'scale(1.02)' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
      },
    },
  },
  plugins: [],
}
