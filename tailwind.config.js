/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        aura: {
          espresso: '#0d0907',
          dark: '#120d0a',
          surface: '#18120e',
          card: '#1c1511',
          cardHover: '#251c16',
          border: '#2c2018',
          borderLight: '#3d2e23',
          borderGold: 'rgba(212, 163, 115, 0.25)',
          gold: {
            light: '#f3dfbf',
            DEFAULT: '#d4a373',
            muted: '#c59b6d',
            dark: '#9d7448',
            btn: '#dfbe90',
            btnHover: '#eccaa0',
          },
          cream: {
            DEFAULT: '#f5eee6',
            muted: '#c8b9aa',
            subtle: '#948373',
          },
          caramel: '#b87333',
          amber: '#e69a47',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', '"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        script: ['"Great Vibes"', '"Alex Brush"', 'cursive'],
      },
      boxShadow: {
        'glow-gold': '0 0 25px rgba(212, 163, 115, 0.18)',
        'glow-gold-lg': '0 0 45px rgba(212, 163, 115, 0.28)',
        'card-subtle': '0 12px 30px rgba(0, 0, 0, 0.45)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float-slow': 'float 6s ease-in-out infinite',
        'steam': 'steam 3s ease-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        steam: {
          '0%': { transform: 'translateY(0) scaleX(1)', opacity: '0.6' },
          '50%': { transform: 'translateY(-20px) scaleX(1.3)', opacity: '0.3' },
          '100%': { transform: 'translateY(-40px) scaleX(1.6)', opacity: '0' },
        }
      }
    },
  },
  plugins: [],
}

