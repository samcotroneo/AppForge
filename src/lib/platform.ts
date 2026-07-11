export type LaunchTarget = 'web' | 'android' | 'ios'
export type PlatformCapability = {
  key: string
  label: string
  available: boolean
  detail: string
}

export type PlatformCapabilities = {
  isNativeShell: boolean
  isOnline: boolean
  isStandalone: boolean
  capabilities: PlatformCapability[]
}

export function getLaunchTargets(includeNative: boolean): LaunchTarget[] {
  return includeNative ? ['web', 'android', 'ios'] : ['web']
}

export function createCapacitorId(slug: string): string {
  return `io.appforge.${slug.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-')}`
}

type PlatformCapabilityOptions = {
  online?: boolean
  protocol?: string
  shareSupported?: boolean
  standalone?: boolean
}

export function getPlatformCapabilities(options: PlatformCapabilityOptions = {}): PlatformCapabilities {
  const protocol = options.protocol ?? (typeof window !== 'undefined' ? window.location.protocol : 'https:')
  const isNativeShell = protocol === 'capacitor:' || protocol === 'file:'
  const isOnline = options.online ?? (typeof navigator !== 'undefined' ? navigator.onLine : true)
  const isStandalone =
    options.standalone ??
    (typeof window !== 'undefined' && typeof window.matchMedia === 'function'
      ? window.matchMedia('(display-mode: standalone)').matches
      : false)
  const shareSupported = options.shareSupported ?? (typeof navigator !== 'undefined' && 'share' in navigator)

  return {
    isNativeShell,
    isOnline,
    isStandalone,
    capabilities: [
      {
        key: 'connectivity',
        label: 'Connectivity detection',
        available: true,
        detail: isOnline ? 'Navigator online state is available for optimistic network checks.' : 'Offline mode is active, so sync and retries should degrade gracefully.',
      },
      {
        key: 'share',
        label: 'Share adapter',
        available: shareSupported,
        detail: shareSupported
          ? 'A native or browser share path can be wrapped behind one adapter.'
          : 'Downstream apps should provide a fallback share or copy interaction.',
      },
      {
        key: 'standalone',
        label: 'Installed shell detection',
        available: isStandalone || isNativeShell,
        detail: isStandalone || isNativeShell
          ? 'App is running in an installed or native-like shell.'
          : 'App is currently running in a browser tab.',
      },
    ],
  }
}
