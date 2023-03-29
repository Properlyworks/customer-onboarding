import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
  alias:{
      '@': path.resolve(__dirname, './src'),
      '@styling': path.resolve(__dirname, './src/styling/index.ts'),
      "@assets": path.resolve(__dirname, './src/assets'),
      "@base-components": path.resolve(__dirname,"./src/base-components")
    },
}
})

