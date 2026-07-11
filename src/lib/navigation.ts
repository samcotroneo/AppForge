import type { AppRoute } from '../app/routes'
import { isAppRoute } from '../app/routes'

export type RoutePolicy = {
  mode: 'hash'
  defaultRoute: AppRoute
  supportsDeepLinking: boolean
  supportsBackNavigation: boolean
}

export const routePolicy: RoutePolicy = {
  mode: 'hash',
  defaultRoute: 'home',
  supportsDeepLinking: true,
  supportsBackNavigation: true,
}

export function parseRouteFromHash(hash: string): AppRoute {
  const candidate = hash.replace(/^#\/?/, '').split('/')[0] ?? ''
  return isAppRoute(candidate) ? candidate : routePolicy.defaultRoute
}

export function buildRouteHash(route: AppRoute): string {
  return `#/${route}`
}

export function syncRouteToHash(route: AppRoute, location: Location = window.location): void {
  const nextHash = buildRouteHash(route)
  if (location.hash !== nextHash) {
    location.hash = nextHash
  }
}

export function subscribeToRouteChanges(
  onRouteChange: (route: AppRoute) => void,
  target: Window = window,
): () => void {
  const handleHashChange = () => onRouteChange(parseRouteFromHash(target.location.hash))
  target.addEventListener('hashchange', handleHashChange)
  return () => target.removeEventListener('hashchange', handleHashChange)
}
