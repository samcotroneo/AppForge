import { describe, expect, it } from 'vitest'
import { agentTracks, summarizeTrackLanes } from './agentTracks'

describe('agentTracks', () => {
  it('preserves the expected execution lanes', () => {
    expect(summarizeTrackLanes(agentTracks)).toEqual([
      'Research',
      'Feature delivery',
      'Platform integration',
      'Validation',
    ])
  })
})
