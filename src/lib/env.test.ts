import { describe, expect, it } from 'vitest'
import { readAppEnv, summarizeAppEnv } from './env'

describe('env helpers', () => {
  it('reads optional strings and boolean flags from public env input', () => {
    const env = readAppEnv({
      MODE: 'production',
      DEV: false,
      PROD: true,
      VITE_API_BASE_URL: ' https://api.example.com ',
      VITE_PUBLIC_AUTH_CLIENT_ID: ' public-client ',
      VITE_ENABLE_MOCK_DATA: 'true',
      VITE_ENABLE_EXPERIMENTAL_WORKSPACE: '1',
    })

    expect(env).toEqual({
      mode: 'production',
      isDevelopment: false,
      isProduction: true,
      endpoints: {
        apiBaseUrl: 'https://api.example.com',
      },
      clients: {
        authClientId: 'public-client',
      },
      featureFlags: {
        enableMockData: true,
        enableExperimentalWorkspace: true,
      },
    })
  })

  it('defaults blank values and unknown flags to missing or disabled', () => {
    const env = readAppEnv({
      MODE: 'development',
      DEV: true,
      PROD: false,
      VITE_API_BASE_URL: '   ',
      VITE_PUBLIC_AUTH_CLIENT_ID: '',
      VITE_ENABLE_MOCK_DATA: 'maybe',
      VITE_ENABLE_EXPERIMENTAL_WORKSPACE: 'off',
    })

    expect(env.endpoints.apiBaseUrl).toBeUndefined()
    expect(env.clients.authClientId).toBeUndefined()
    expect(env.featureFlags.enableMockData).toBe(false)
    expect(env.featureFlags.enableExperimentalWorkspace).toBe(false)
  })

  it('summarizes configured and missing settings for the settings screen', () => {
    const summary = summarizeAppEnv(
      readAppEnv({
        MODE: 'production',
        DEV: false,
        PROD: true,
        VITE_API_BASE_URL: 'https://api.example.com',
        VITE_ENABLE_MOCK_DATA: 'false',
      }),
    )

    expect(summary.configuredRequiredCount).toBe(1)
    expect(summary.totalRequiredCount).toBe(2)
    expect(summary.missingRequiredKeys).toEqual(['VITE_PUBLIC_AUTH_CLIENT_ID'])
    expect(summary.items.map((item) => item.status)).toEqual([
      'configured',
      'missing',
      'disabled',
      'disabled',
    ])
  })
})
