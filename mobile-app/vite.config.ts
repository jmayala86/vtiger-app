import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  base: '/mobile/',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['icons/icon-192.png', 'icons/icon-512.png'],
      manifest: {
        name: 'vtiger CRM Mobile',
        short_name: 'CRM',
        description: 'vtiger CRM Mobile App',
        start_url: '/mobile/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#1a73e8',
        icons: [
          {
            src: '/mobile/icons/icon-192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/mobile/icons/icon-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable',
          },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
      },
    }),
  ],
  server: {
    proxy: {
      '/modules/Mobile': {
        target: 'https://vtiger.holaenroque.com',
        changeOrigin: true,
        secure: true,
      },
    },
  },
})
