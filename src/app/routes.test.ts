import { describe, expect, it } from 'vitest'
import { appRoutes, getAppRoute, isAppRoute } from './routes'

describe('app routes', () => {
  it('keeps the starter routes in the expected order', () => {
    expect(appRoutes.map((route) => route.id)).toEqual(['home', 'workspace', 'settings'])
  })

  it('returns metadata for a known route', () => {
    expect(getAppRoute('workspace').label).toBe('Workspace')
  })

  it('recognizes valid route ids', () => {
    expect(isAppRoute('settings')).toBe(true)
    expect(isAppRoute('other')).toBe(false)
  })
})
