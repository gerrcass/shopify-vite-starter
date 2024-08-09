/** @type {import('tailwindcss').Config} */
export default {
  prefix: 'tw-',
  content: ['../**/*.{js,json,liquid}', '!./build-tools/**/*', '!./node_modules/**/*'],
  theme: {
    extend: {},
  },
  plugins: [],
};
