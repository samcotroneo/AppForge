export type WorkspaceProjectStatus = 'active' | 'draft' | 'blocked'
export type WorkspaceProjectFilter = 'all' | WorkspaceProjectStatus

export type WorkspaceProject = {
  id: string
  name: string
  owner: string
  updatedAt: string
  status: WorkspaceProjectStatus
  summary: string
  nextStep: string
  readiness: number
}

export type WorkspaceTaskState = 'ready' | 'in-progress' | 'blocked'

export type WorkspaceTask = {
  id: string
  projectId: string
  title: string
  lane: string
  priority: 'high' | 'medium' | 'low'
  state: WorkspaceTaskState
}

export type PortfolioSummary = {
  total: number
  active: number
  draft: number
  blocked: number
}

export type OnboardingItem = {
  title: string
  detail: string
}

export const starterProjects: WorkspaceProject[] = [
  {
    id: 'ops-console',
    name: 'Ops Console',
    owner: 'Platform team',
    updatedAt: '2026-07-10T18:30:00.000Z',
    status: 'active',
    summary: 'A delivery dashboard that pairs release health, queue depth, and alert acknowledgements.',
    nextStep: 'Finish the incident timeline detail screen and wire the deploy status polling adapter.',
    readiness: 78,
  },
  {
    id: 'field-guide',
    name: 'Field Guide',
    owner: 'Growth team',
    updatedAt: '2026-07-09T15:15:00.000Z',
    status: 'draft',
    summary: 'A mobile-first knowledge base for onboarding, checklists, and customer-ready walkthroughs.',
    nextStep: 'Lock the content sync contract and validate the offline cache behavior.',
    readiness: 41,
  },
  {
    id: 'returns-hub',
    name: 'Returns Hub',
    owner: 'Support systems',
    updatedAt: '2026-07-08T09:45:00.000Z',
    status: 'blocked',
    summary: 'A service workflow for intake, triage, and refund decision support across support channels.',
    nextStep: 'Unblock the payment provider contract before the review queue can ship.',
    readiness: 22,
  },
]

export const starterTasks: WorkspaceTask[] = [
  {
    id: 'task-ops-stream',
    projectId: 'ops-console',
    title: 'Add release event aggregation for the activity stream',
    lane: 'Feature delivery',
    priority: 'high',
    state: 'in-progress',
  },
  {
    id: 'task-ops-pwa',
    projectId: 'ops-console',
    title: 'Confirm background refresh limits for installed PWAs',
    lane: 'Platform integration',
    priority: 'medium',
    state: 'ready',
  },
  {
    id: 'task-guide-sync',
    projectId: 'field-guide',
    title: 'Define the content sync bootstrap contract',
    lane: 'Research',
    priority: 'high',
    state: 'ready',
  },
  {
    id: 'task-returns-auth',
    projectId: 'returns-hub',
    title: 'Resolve the service auth dependency with the payment provider',
    lane: 'Validation',
    priority: 'high',
    state: 'blocked',
  },
]

export const onboardingChecklist: OnboardingItem[] = [
  {
    title: 'Replace the bootstrap placeholders',
    detail: 'Add your real async startup work in src/lib/bootstrap.ts for config validation, session restore, and capability checks.',
  },
  {
    title: 'Wire runtime configuration',
    detail:
      'Populate src/lib/env.ts with VITE_API_BASE_URL, VITE_PUBLIC_AUTH_CLIENT_ID, and any public feature flags before wiring live services.',
  },
  {
    title: 'Swap in app-specific adapters',
    detail: 'Implement the API client, repository, and sync queue seams in src/lib/data.ts instead of calling transport or storage APIs from views.',
  },
  {
    title: 'Confirm route and session behavior',
    detail: 'Keep navigation URL-driven with src/lib/navigation.ts and extend the generic auth/session boundary in src/lib/session.ts.',
  },
  {
    title: 'Preserve observability and testing seams',
    detail: 'Plug product telemetry into src/lib/observability.ts and keep pure unit tests beside each shared adapter or helper.',
  },
  {
    title: 'Validate delivery targets',
    detail: 'Run lint, unit tests, and build after each product slice before syncing native platforms.',
  },
]

export function summarizeProjectPortfolio(projects: WorkspaceProject[]): PortfolioSummary {
  return projects.reduce<PortfolioSummary>(
    (summary, project) => {
      summary.total += 1
      summary[project.status] += 1
      return summary
    },
    {
      total: 0,
      active: 0,
      draft: 0,
      blocked: 0,
    },
  )
}

export function filterProjectsByStatus(
  projects: WorkspaceProject[],
  filter: WorkspaceProjectFilter,
): WorkspaceProject[] {
  if (filter === 'all') {
    return projects
  }

  return projects.filter((project) => project.status === filter)
}

export function getRecentProjects(projects: WorkspaceProject[], limit = 3): WorkspaceProject[] {
  return [...projects].sort((left, right) => right.updatedAt.localeCompare(left.updatedAt)).slice(0, limit)
}

export function getTasksForProject(tasks: WorkspaceTask[], projectId: string): WorkspaceTask[] {
  return tasks.filter((task) => task.projectId === projectId)
}

export function getBlockedTasks(tasks: WorkspaceTask[]): WorkspaceTask[] {
  return tasks.filter((task) => task.state === 'blocked')
}
