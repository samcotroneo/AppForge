export type AppRoute = 'home' | 'workspace' | 'settings'

export type AppRouteDefinition = {
  id: AppRoute
  label: string
  description: string
}

export const appRoutes: AppRouteDefinition[] = [
  {
    id: 'home',
    label: 'Overview',
    description: 'Starter summary, example content, and onboarding guidance.',
  },
  {
    id: 'workspace',
    label: 'Workspace',
    description: 'Example feature slice showing how AppForge structure can be composed.',
  },
  {
    id: 'settings',
    label: 'Settings',
    description: 'Example setup surfaces for config, delivery defaults, and platform readiness.',
  },
]

export function isAppRoute(value: string): value is AppRoute {
  return appRoutes.some((candidate) => candidate.id === value)
}

export function getAppRoute(route: AppRoute): AppRouteDefinition {
  return appRoutes.find((candidate) => candidate.id === route) ?? appRoutes[0]
}
