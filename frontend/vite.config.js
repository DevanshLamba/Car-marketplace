import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:5001',
        changeOrigin: true,
        secure: false,
        router: (req) => {
          // Fallback check if server port 5001 or 5000 is active
          return 'http://localhost:5001';
        }
      }
    }
  }
});
