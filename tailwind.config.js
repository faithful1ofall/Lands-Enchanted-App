module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark-700': '#2E3348',
        green: '#7cff6b',
        'carribean-green': '#00D395',
      }
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}