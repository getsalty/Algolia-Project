module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      keyframes: {
        loadingRing: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        loadingRing: 'loadingRing 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite',
      },
      colors: {
        'stl-text-blue-800': 'rgb(0 118 155/var(--tw-text-opacity))',
        'stl-bg-blue-100': 'rgb(232 250 255/var(--tw-bg-opacity))',
        'stl-border-blue-200': 'rgb(185 239 255/var(--tw-border-opacity))',
        'stl-text-accent-700': 'rgb(2 46 185/var(--tw-text-opacity))',
        'stl-bg-accent-100': 'rgb(242 244 255/var(--tw-bg-opacity))',
        'stl-border-accent-200': 'rgb(187 209 255/var(--tw-border-opacity))',
        'stl-border-grey-300': 'rgb(182 183 213/var(--tw-border-opacity))',
      },
    },
  },
  plugins: [],
};
