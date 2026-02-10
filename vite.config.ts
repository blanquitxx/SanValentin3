
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // 'base' debe ser './' para que funcione en cualquier subcarpeta de GitHub Pages
  base: './',
});
