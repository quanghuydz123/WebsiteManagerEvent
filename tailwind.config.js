/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        customGray: 'rgba(35, 37, 44, 1)',
        customGray2: '#64646d',
        
      },
      backgroundImage: {
        'custom-gradient': `linear-gradient(40deg, rgba(31, 9, 39, 7), rgba(31, 9, 39, 0) 20%),
        linear-gradient(10deg, rgba(13, 56, 34, 0.1), rgba(13, 56, 34, 0.3) 80%),
        linear-gradient(00deg, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0) 70%);`,
      },
    },
  },
  plugins: [],
}

