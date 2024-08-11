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
    extend: {
      screens: {
        mobile: '428px',
        tablet: '769px',
        large: '1180px',
        desk: '1440px',
        'wide-desk': '1920px',
      },
      maxWidth: {
        desk: '1440px',
        'wide-desk': '1920px',
        'container-small': '25em', // 400px
        'container-medium': '52em', // 832px
        'container-large': '78.75em', // 1260px
        'container-wide': '92.125em', // 1474px
      },
    },
  },
  plugins: [
    remToPxPlugin({
      baseFontSize: 16,
    }),
  ],
};
