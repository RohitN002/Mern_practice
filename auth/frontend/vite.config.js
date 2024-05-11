import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'

dotenv.config()
// https://vitejs.dev/config/
export default defineConfig({
  define:{
'process.env.PORT': JSON.stringify(process.env.PORT)
  },
  plugins: [react()],
})