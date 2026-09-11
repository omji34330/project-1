/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
      },
      colors: {
        // Core brand — grounded in solar / vegetation greens rather than a
        // generic SaaS teal.
        emerald: {
          50: '#ecfdf6',
          100: '#d1fae9',
          200: '#a4f4d3',
          300: '#6ee7b8',
          400: '#38d99a',
          500: '#17bd7e',
          600: '#0d9a67',
          700: '#0c7a54',
          800: '#0b5f44',
          900: '#0a4e3a',
          950: '#032c20',
        },
        // Deep, slightly green-tinted near-black for dark surfaces — avoids
        // a generic flat #0B0B0B.
        night: {
          900: '#04120d',
          800: '#071b14',
          700: '#0b2a1f',
          600: '#0f3826',
          500: '#15452f',
        },
        // Warm gold used exclusively for solar-specific data, cyan for wind —
        // so each energy source keeps a consistent, legible identity across
        // every chart on the site.
        solar: {
          400: '#fbbf24',
          500: '#f5a623',
          600: '#d98c0f',
        },
        wind: {
          400: '#5eead4',
          500: '#22c3b0',
          600: '#0e9e94',
        },
      },
      backgroundImage: {
        'grid-glow':
          'radial-gradient(circle at 20% 20%, rgba(23,189,126,0.18), transparent 45%), radial-gradient(circle at 80% 0%, rgba(34,195,176,0.14), transparent 40%)',
      },
      boxShadow: {
        glass: '0 8px 32px 0 rgba(4, 18, 13, 0.28)',
        'glass-sm': '0 4px 16px 0 rgba(4, 18, 13, 0.18)',
        glow: '0 0 40px -8px rgba(23, 189, 126, 0.55)',
      },
      backdropBlur: {
        xs: '2px',
      },
      keyframes: {
        'spin-slow': { to: { transform: 'rotate(360deg)' } },
        'pulse-soft': {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.5 },
        },
        'flow-dash': {
          to: { strokeDashoffset: -40 },
        },
        'rise-in': {
          from: { opacity: 0, transform: 'translateY(14px)' },
          to: { opacity: 1, transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
      animation: {
        'spin-slow': 'spin-slow 9s linear infinite',
        'pulse-soft': 'pulse-soft 2.4s ease-in-out infinite',
        'flow-dash': 'flow-dash 1.4s linear infinite',
        'rise-in': 'rise-in 0.5s ease-out both',
        float: 'float 6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
