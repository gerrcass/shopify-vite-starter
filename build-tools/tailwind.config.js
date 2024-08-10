/** @type {import('tailwindcss').Config} */

import remToPxPlugin from 'tailwindcss-rem-to-px';
import path from 'path';

export default {
  prefix: 'tw-',
  content: [
    path.resolve(__dirname, '../assets/**/*.liquid'),
    path.resolve(__dirname, '../config/**/*.{js,json,liquid}'),
    path.resolve(__dirname, '../layout/**/*.{js,json,liquid}'),
    path.resolve(__dirname, '../locales/**/*.{js,json,liquid}'),
    path.resolve(__dirname, '../sections/**/*.{js,json,liquid}'),
    path.resolve(__dirname, '../snippets/**/*.{js,json,liquid}'),
    path.resolve(__dirname, '../templates/**/*.{js,json,liquid}'),
    path.resolve(__dirname, './src/**/*.js'),
  ],
  theme: {
    extend: {},
  },
  plugins: [
    remToPxPlugin({
      baseFontSize: 16,
    }),
  ],
};
