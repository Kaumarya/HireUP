/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: '#0A0A0A',
          card: '#111111',
          elevated: '#161616',
          border: '#1F1F1F',
        },
        accent: {
          green: '#22C55E',
          'green-light': '#4ADE80',
          'green-dim': '#16A34A',
          'green-glow': 'rgba(34,197,94,0.15)',
        },
        text: {
          primary: '#E5E7EB',
          muted: '#9CA3AF',
          dim: '#4B5563',
        },
      },
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        body: ['DM Sans', 'sans-serif'],
      },
      boxShadow: {
        'glow-sm': '0 0 12px rgba(34,197,94,0.2)',
        'glow-md': '0 0 24px rgba(34,197,94,0.25)',
        'glow-lg': '0 0 48px rgba(34,197,94,0.2)',
        'card': '0 4px 24px rgba(0,0,0,0.4)',
      },
      backgroundImage: {
        'grid-pattern': "linear-gradient(rgba(34,197,94,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(34,197,94,0.03) 1px, transparent 1px)",
      },
      backgroundSize: {
        'grid': '40px 40px',
      },
      animation: {
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'scan': 'scan 3s linear infinite',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { opacity: '0.6' },
          '50%': { opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
      },
    },
  },
  plugins: [],
}
