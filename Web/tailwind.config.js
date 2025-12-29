/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        // Base: Clean Whites & Grays
        // Accents: Cyan (Tech), Purple (Brand), Lime (Highlighter/Doodle)
        'colabb-tech-blue': '#29A9E0',
        'colabb-lime-light': '#DEDC00',
        'colabb-brand-purple': '#42007E',
        'colabb-dark': '#0F172A',
        'colabb-tech-blue-light': '#E0F7FA',
        'colabb-brand-purple-light': '#F3E5F5',
        'colabb-lime-light-light': '#FEF9C3',
      },
      fontFamily: {
        sans: ['"Inter"', 'sans-serif'], // Asumiendo Inter, puedes cambiarlo
        mono: ['"Roboto Mono"', 'monospace'], // Asumiendo Roboto Mono
      },
    },
  },
  plugins: [],
}