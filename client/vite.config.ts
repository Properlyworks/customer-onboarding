import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
  alias:{
      '@': path.resolve(__dirname, './src'),
      '@styling': path.resolve(__dirname, './src/styling'),
      "@assets": path.resolve(__dirname, './src/assets'),
      "@base-components": path.resolve(__dirname, "./src/base-components"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@types": path.resolve(__dirname, "./src/types"),
      "@hooks": path.resolve(__dirname, "./src/hooks"),
      "@utils": path.resolve(__dirname, "./src/utils"),
      "@context": path.resolve(__dirname, "./src/context"),
      "@constants": path.resolve(__dirname, "./src/constants")
    },
}
})

