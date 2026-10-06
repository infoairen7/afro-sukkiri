import { defineConfig } from 'vite';

// base: './' → dist/ can be served from any sub-directory (GitHub Pages etc.).
export default defineConfig({
  base: './',
  build: {
    target: 'es2022',
    outDir: 'dist',
    assetsDir: 'bundle',
    chunkSizeWarningLimit: 1200,
  },
  server: { host: true },
});
