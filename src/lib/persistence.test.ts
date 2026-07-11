import { describe, expect, it } from 'vitest'
import { createMemoryStorage, createPersistenceBoundary } from './persistence'

describe('persistence boundary', () => {
  it('writes and reads versioned json payloads', () => {
    const persistence = createPersistenceBoundary({
      storage: createMemoryStorage(),
    })

    persistence.writeJSON('preferences', {
      theme: 'dark',
    })

    expect(persistence.readJSON('preferences', { theme: 'light' })).toEqual({
      theme: 'dark',
    })
  })

  it('returns the fallback for invalid stored data', () => {
    const storage = createMemoryStorage()
    storage.setItem('appforge:session', 'not-json')

    const persistence = createPersistenceBoundary({
      storage,
    })

    expect(persistence.readJSON('session', { status: 'anonymous' })).toEqual({
      status: 'anonymous',
    })
  })
})
