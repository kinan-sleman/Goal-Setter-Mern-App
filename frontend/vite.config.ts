import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import dotenv from 'dotenv'

dotenv.config({ path: path.resolve(__dirname, '../.env') })
export default defineConfig({
  plugins: [react()],
  define: {
    'import.meta.env.API_BASE_URI': JSON.stringify(process.env.API_BASE_URI),
  },
})
