import { describe, expect, it } from 'vitest'
import { createCapacitorId, getLaunchTargets, getPlatformCapabilities } from './platform'

describe('platform helpers', () => {
  it('returns web and native targets when requested', () => {
    expect(getLaunchTargets(true)).toEqual(['web', 'android', 'ios'])
  })

  it('creates a stable capacitor id from a slug', () => {
    expect(createCapacitorId('My Demo App')).toBe('io.appforge.my-demo-app')
  })

  it('describes generic runtime capabilities for starter adapters', () => {
    expect(
      getPlatformCapabilities({
        online: false,
        protocol: 'file:',
        shareSupported: false,
        standalone: false,
      }),
    ).toMatchObject({
      isNativeShell: true,
      isOnline: false,
      isStandalone: false,
    })
  })
})
