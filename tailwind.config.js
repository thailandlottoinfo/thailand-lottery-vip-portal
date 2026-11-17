/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        emeraldDark: '#041E18',
        emeraldCard: '#062C22',
        emeraldBorder: '#0E4D3D',
        goldAccent: '#D4AF37',
        goldLight: '#F3E5AB',
      }
    },
  },
  plugins: [],
}
