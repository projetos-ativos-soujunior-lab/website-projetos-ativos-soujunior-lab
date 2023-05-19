/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.tsx',
    './index.html'
  ],
  theme: {
    extend: {
      colors: {
        bgPrimary: '#041933',
        grey: '#BDBDBD',
        blueGrid: '#1165BA',
        bgLanguages: '#041833',
        bgTeam: '#072954'
      },
      fontFamily: {
        poppins: ['Poppins']
      },
      screens: {
        '3xl': '1900px',
      },
    },
  },
  plugins: [],
}
