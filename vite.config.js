
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  esbuild: {
    drop: ['console', 'debugger'],   // strip console.log from the live site
    legalComments: 'none',
  },
  build: {
    sourcemap: false,                // never publish the readable source
    minify: 'esbuild',               // minify + shorten all names
    cssMinify: true,
    target: 'es2019',
    chunkSizeWarningLimit: 800,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
        },
      },
    },
  },
});