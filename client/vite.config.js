import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/

    // const basePath = window.location.pathname.split('/').slice(0, -1).join('/') || '/';
export default defineConfig({
  plugins: [react()],
  base: '/test/', // Додайте базовий шлях
  build: {
    rollupOptions: {
      output: {
        // Явно вказуємо префікс для статичних файлів
        assetFileNames: 'test/assets/[name]-[hash].[ext]',
        entryFileNames: 'test/assets/[name]-[hash].js'
      }
    }
  }
})