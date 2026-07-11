import { describe, expect, it } from 'vitest'
import { starterContract } from './starterContract'

describe('starterContract', () => {
  it('describes the base app and fresh repo workflow', () => {
    expect(starterContract.name).toBe('AppForge starter template')
    expect(starterContract.prompt).toContain('npx @samcotroneo/appforge init')
    expect(starterContract.prompt).toContain('choose the desired native targets')
    expect(starterContract.bootstrapCommand).toBe('npx @samcotroneo/appforge init')
    expect(starterContract.bootstrapArtifacts).toEqual(['appforge.config.json'])
    expect(starterContract.layers).toHaveLength(3)
    expect(starterContract.requiredDocs).toContain('docs/agent-workflows.md')
    expect(starterContract.freshRepoSteps).toHaveLength(4)
  })
})
