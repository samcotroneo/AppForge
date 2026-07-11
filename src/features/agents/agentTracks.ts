export type AgentTrack = {
  lane: string
  scope: string
  outcome: string
}

export const agentTracks: AgentTrack[] = [
  {
    lane: 'Research',
    scope: 'Investigate APIs, platform constraints, and package trade-offs.',
    outcome: 'A short recommendation with risks and integration notes.',
  },
  {
    lane: 'Feature delivery',
    scope: 'Implement a single feature folder or UI slice with minimal overlap.',
    outcome: 'Focused code changes that fit the template structure.',
  },
  {
    lane: 'Platform integration',
    scope: 'Handle Capacitor plugins, push notifications, camera, or storage adapters.',
    outcome: 'Native concerns isolated behind src/lib adapters.',
  },
  {
    lane: 'Validation',
    scope: 'Run lint, tests, and builds after code integration.',
    outcome: 'Fast feedback without cluttering the main working context.',
  },
]

export function summarizeTrackLanes(tracks: AgentTrack[]): string[] {
  return tracks.map((track) => track.lane)
}
