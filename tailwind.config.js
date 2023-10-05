/** @type {import('tailwindcss').Config} */
export const purge = ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html']
export const theme = {
  extend: {
    screens: {
      lg: { min: '700px' },
      sm: { min: '0px', max: '699px' },
    },
  },
}
