module.exports = {
  content: ["./src/**/*.{njk,html,js}"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        crime: {
          bg: '#0f172a',
          surface: '#1e293b',
          primary: '#334155',
          accent: '#3b82f6',
          danger: '#ef4444',
          warning: '#f59e0b',
          success: '#10b981',
          text: '#f1f5f9',
          muted: '#94a3b8'
        }
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'Consolas', 'monospace'],
        sans: ['Inter', 'system-ui', 'sans-serif']
      }
    }
  },
  plugins: []
};
