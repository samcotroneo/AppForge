import { describe, expect, it } from 'vitest'
import { buildRouteHash, parseRouteFromHash, routePolicy } from './navigation'

describe('navigation policy', () => {
  it('parses known routes from the current hash', () => {
    expect(parseRouteFromHash('#/workspace')).toBe('workspace')
    expect(parseRouteFromHash('#/settings/details')).toBe('settings')
  })

  it('falls back to the default route for unknown hashes', () => {
    expect(parseRouteFromHash('#/unknown')).toBe(routePolicy.defaultRoute)
    expect(parseRouteFromHash('')).toBe(routePolicy.defaultRoute)
  })

  it('builds stable route hashes for navigation updates', () => {
    expect(buildRouteHash('home')).toBe('#/home')
  })
})
