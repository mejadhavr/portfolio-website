import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    target: ['chrome90', 'firefox88', 'safari14', 'edge90'],
    minify: 'esbuild',
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          if (assetInfo.name?.endsWith('.css')) return 'assets/styles.[hash].css';
          return 'assets/[name].[hash][extname]';
        },
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('three')) return 'vendor-three';
            if (id.includes('framer-motion')) return 'vendor-motion';
            if (id.includes('react')) return 'vendor-framework';
            return 'vendor-utils';
          }
        },
      },
    },
    chunkSizeWarningLimit: 900,
  },
})
