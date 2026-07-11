import { describe, expect, it } from 'vitest'
import {
  filterProjectsByStatus,
  getBlockedTasks,
  getRecentProjects,
  starterProjects,
  starterTasks,
  summarizeProjectPortfolio,
} from './workspaceData'

describe('workspace data helpers', () => {
  it('summarizes project counts by status', () => {
    expect(summarizeProjectPortfolio(starterProjects)).toEqual({
      total: 3,
      active: 1,
      draft: 1,
      blocked: 1,
    })
  })

  it('returns the most recent project first', () => {
    expect(getRecentProjects(starterProjects, 1)[0]?.id).toBe('ops-console')
  })

  it('filters blocked tasks and active projects', () => {
    expect(getBlockedTasks(starterTasks)).toHaveLength(1)
    expect(filterProjectsByStatus(starterProjects, 'active').map((project) => project.id)).toEqual([
      'ops-console',
    ])
  })
})
