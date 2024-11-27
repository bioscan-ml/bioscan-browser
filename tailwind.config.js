import colors from 'tailwindcss/colors'

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        border: colors.gray[200],
        input: colors.gray[200],
        ring: colors.gray[800],
        background: colors.white,
        foreground: colors.gray[800],
        primary: {
          DEFAULT: colors.emerald[500],
          foreground: colors.white,
        },
        secondary: {
          DEFAULT: colors.gray[200],
          foreground: colors.gray[800],
        },
        destructive: {
          DEFAULT: colors.red[500],
          foreground: colors.gray[800],
        },
        muted: {
          DEFAULT: colors.gray[50],
          foreground: colors.gray[500],
        },
        accent: {
          DEFAULT: colors.sky[800],
          foreground: colors.white,
        },
        popover: {
          DEFAULT: colors.white,
          foreground: colors.gray[800],
        },
        card: {
          DEFAULT: colors.white,
          foreground: colors.gray[800],
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}
