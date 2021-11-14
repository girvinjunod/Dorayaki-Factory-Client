const defaultTheme = require('tailwindcss/defaultTheme');
module.exports = {
  mode: 'jit',
  purge: ['./src/pages/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}', './public/**/*.html',],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors:{
        dongker : '#03045E',
        blue_button: '#0077B6',
        mid_blue : '#00B4D8',
        mid_light_blue: '#90e0ef',
        light_blue: '#CAF0F8'
      },
      fontFamily: {
        text: ['Roboto', 'Roboto-500', ...defaultTheme.fontFamily.sans],
        title: ['Poppins', ...defaultTheme.fontFamily.sans],
      },
      backgroundImage:{
        default: 'url(~/public/images/background.svg)',
        close: 'url(~/public/images/close.svg)'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
