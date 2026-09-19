/** @type {import('tailwindcss').Config} */

export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        // Semantic surface & ink tokens — values live in src/index.css as CSS
        // variables so light/dark stay perfectly in sync.
        // (Named `canvas`, not `base`, to avoid colliding with the `text-base` font size.)
        canvas: 'rgb(var(--c-base) / <alpha-value>)',
        card: 'rgb(var(--c-card) / <alpha-value>)',
        'card-muted': 'rgb(var(--c-card-muted) / <alpha-value>)',
        edge: {
          DEFAULT: 'rgb(var(--c-edge) / <alpha-value>)',
          strong: 'rgb(var(--c-edge-strong) / <alpha-value>)',
        },
        ink: {
          DEFAULT: 'rgb(var(--c-ink) / <alpha-value>)',
          muted: 'rgb(var(--c-ink-muted) / <alpha-value>)',
          faint: 'rgb(var(--c-ink-faint) / <alpha-value>)',
        },
      },
      fontFamily: {
        sans: [
          'Inter Variable',
          'Inter',
          '-apple-system',
          'PingFang SC',
          'Hiragino Sans GB',
          'Microsoft YaHei',
          'Segoe UI',
          'sans-serif',
        ],
        mono: ['JetBrains Mono Variable', 'JetBrains Mono', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      maxWidth: {
        '8xl': '88rem',
      },
      animation: {
        float: 'float 7s ease-in-out infinite',
        'float-delayed': 'float 8s ease-in-out 1.5s infinite',
        'pulse-slow': 'pulse-slow 4s ease-in-out infinite',
        'border-beam': 'border-beam calc(var(--duration, 12s)) infinite linear',
        shimmer: 'shimmer 2.5s infinite linear',
        'spin-slow': 'spin 20s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'pulse-slow': {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.05)' },
        },
        'border-beam': {
          '100%': {
            'offset-distance': '100%',
          },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [],
};
