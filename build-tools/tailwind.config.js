/** @type {import('tailwindcss').Config} */

import remToPxPlugin from 'tailwindcss-rem-to-px';

export default {
  prefix: 'tw-',
  content: ['../**/*.{js,json,liquid}', '!./build-tools/**/*', '!./node_modules/**/*'],
  theme: {
    extend: {},
  },
  plugins: [
    remToPxPlugin({
      baseFontSize: 16,
    }),
  ],
};
