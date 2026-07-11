import { registerSW } from 'virtual:pwa-register'

export function registerPwaUpdates() {
  if (!import.meta.env.PROD) {
    return
  }

  registerSW({
    immediate: true,
  })
}
