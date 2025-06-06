import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa' 
import path from 'path'

export default defineConfig({
  plugins: [
    react(),
    
    VitePWA({
      // registerType: 'autoUpdate' -> Esta opção atualiza o PWA automaticamente.
      registerType: 'autoUpdate', // Recomendado: Pergunta ao usuário se ele quer atualizar.
      
      injectRegister: 'auto',

      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}']
      },

      manifest: {
        name: 'Meu PWA com Vite',
        short_name: 'VitePWA',
        description: 'Uma aplicação PWA de exemplo feita com Vite, React e TypeScript.',
        theme_color: '#000',
        background_color: '#000',
        display: 'standalone',
        scope: '/',
        start_url: '/',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable'
          }
        ]
      }
    })
  ],
  base: './',
  server: { host: '0.0.0.0' },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})