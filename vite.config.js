import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  server: {
    host: true,  // เปิดให้เข้าถึงจากเครือข่าย
    port: 10001,  // กำหนดพอร์ตใหม่
  },
  plugins: [react()],
})
