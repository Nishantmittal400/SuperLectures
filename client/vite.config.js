/**
 * Vite configuration for the React frontend.
 *
 * - Uses the React plugin.
 * - Dev server runs on port 5173 by default.
 * - You can later add a proxy to the backend if you want.
 */

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173
    // If you prefer a dev proxy instead of hardcoded URLs:
    // proxy: {
    //   '/api': 'http://localhost:5001'
    // }
  }
});
