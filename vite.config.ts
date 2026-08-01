import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Relative base keeps the gh-pages build working from any sub-path.
export default defineConfig({
  base: './',
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
});
