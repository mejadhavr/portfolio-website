import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    target: 'esnext',
    minify: 'esbuild',
    rollupOptions: {
      output: {
        // Split Three.js into its own chunk so main bundle stays lean
        manualChunks: {
          'three': ['three'],
          'react-vendor': ['react', 'react-dom'],
        },
      },
    },
    // Raise the chunk-size warning threshold since Three.js is expected to be large
    chunkSizeWarningLimit: 900,
  },
})
