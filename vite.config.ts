import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  build: {
    // Raise warning limit — Spline's physics engine is intentionally large
    chunkSizeWarningLimit: 2500,
    rollupOptions: {
      output: {
        manualChunks: {
          // Core React runtime
          'vendor-react': ['react', 'react-dom'],
          // Animation library
          'vendor-framer': ['framer-motion'],
          // Icon library
          'vendor-lucide': ['lucide-react'],
          // Spline 3D runtime (heaviest — cached separately)
          'vendor-spline': ['@splinetool/react-spline', '@splinetool/runtime'],
        },
      },
    },
  },
});
