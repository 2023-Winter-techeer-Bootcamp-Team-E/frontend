import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: { // 배포용 이건 주석 다 해제하기
      // '/api': {
      // target: 'BASE_URL',
      // changeOrigin: true,
      // rewrite: (path) => path.replace(/^\/api/, ''),
      // },
    },
  },
});
