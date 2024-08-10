import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  root: path.resolve(__dirname),
  build: {
    emptyOutDir: false,
    minify: false,
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'src/main.js'), // JavaScript entry entry point
      },
      output: {
        dir: path.resolve(__dirname, '../assets'),
        entryFileNames: 'bundle.js',
        assetFileNames: 'styles.css', // Bundle all styles into styles.css
      },
    },
  },
});
