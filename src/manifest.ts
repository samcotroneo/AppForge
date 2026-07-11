import type { ManifestOptions } from 'vite-plugin-pwa'

export const manifest: Partial<ManifestOptions> = {
  name: 'AppForge Template',
  short_name: 'AppForge',
  description: 'Agent-friendly Capacitor and SolidJS starter for high-quality cross-platform apps.',
  theme_color: '#1d232a',
  background_color: '#111827',
  display: 'standalone',
  start_url: '/',
  icons: [
    {
      src: 'icons/icon-192.png',
      sizes: '192x192',
      type: 'image/png',
    },
    {
      src: 'icons/icon-512.png',
      sizes: '512x512',
      type: 'image/png',
      purpose: 'any maskable',
    },
  ],
}
