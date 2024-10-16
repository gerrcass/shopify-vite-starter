import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  root: path.resolve(__dirname),
  build: {
    emptyOutDir: false,
    minify: true,
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'src/main.js'), // JavaScript entry entry point
      },
      output: {
        dir: path.resolve(__dirname, '../assets'),
        entryFileNames: 'bundle.js',
        assetFileNames: 'styles.css', // Bundle all styles into styles.css
        // format: 'iife', //https://shopify.dev/docs/storefronts/themes/best-practices/performance#avoid-namespace-collisions
      },
    },
  },
});
