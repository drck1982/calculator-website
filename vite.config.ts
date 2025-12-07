import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Optimize chunk splitting for better caching
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-ui': ['lucide-react'],
        },
      },
    },
    // Enable minification
    minify: 'esbuild',
    // Generate source maps for production debugging
    sourcemap: false,
    // Target modern browsers for smaller bundle
    target: 'es2020',
  },
  // Optimize dev server
  server: {
    open: true,
  },
})
