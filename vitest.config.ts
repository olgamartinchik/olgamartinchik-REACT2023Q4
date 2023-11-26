import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    // testEnvironmentOptions: {
    //   customExportConditions: [''],
    // },
    globals: true,
    environment: 'jsdom',
    css: true,
    setupFiles: './test/setup.ts',
    coverage: {
      provider: 'v8',
    },
  },
});
