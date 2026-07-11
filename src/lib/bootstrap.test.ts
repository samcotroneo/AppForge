import { describe, expect, it } from 'vitest'
import { bootstrapApp } from './bootstrap'
import { createMemoryStorage } from './persistence'

describe('bootstrapApp', () => {
  it('builds the starter foundations from generic env input', async () => {
    const result = await bootstrapApp({
      envSource: {
        MODE: 'development',
        DEV: true,
        PROD: false,
        VITE_ENABLE_MOCK_DATA: 'true',
      },
      hash: '#/workspace',
      storage: createMemoryStorage(),
      online: false,
      shareSupported: false,
      standalone: false,
      protocol: 'https:',
      now: () => '2026-07-11T00:00:00.000Z',
    })

    expect(result.status).toBe('ready')
    if (result.status !== 'ready') {
      return
    }

    expect(result.context.initialRoute).toBe('workspace')
    expect(result.context.session.current.restoredAt).toBe('2026-07-11T00:00:00.000Z')
    expect(result.context.persistence.policy.driver).toBe('memory')
    expect(result.context.dataBoundary.adapters).toHaveLength(3)
    expect(result.context.feedback.warningCount).toBeGreaterThan(0)
    expect(result.context.featureFlags.enabledCount).toBe(1)
  })
})
