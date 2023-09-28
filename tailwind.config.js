/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    colors: {
      inputDefault: '#CBB6E5',
      inputError: '#ED4545',
      inputFocus: '#761BE4',
      inputBG: '#FFFFFF',
      textPrimary: '#000853',
      textSecond: '#898DA9',
      errorColor: '#ED4545',
      errorBG: '#FEECEC',
    },
  },
  plugins: [],
};
