import type { AppEnv } from './env'

export type FeatureFlagKey = keyof AppEnv['featureFlags']
export type FeatureFlagStage = 'stable' | 'experimental'

export type FeatureFlagDefinition = {
  key: FeatureFlagKey
  label: string
  description: string
  stage: FeatureFlagStage
}

export type FeatureFlagStatusItem = FeatureFlagDefinition & {
  enabled: boolean
}

export type FeatureFlagSummary = {
  items: FeatureFlagStatusItem[]
  enabledCount: number
  disabledCount: number
}

export const featureFlagDefinitions: FeatureFlagDefinition[] = [
  {
    key: 'enableMockData',
    label: 'Mock data mode',
    description: 'Keep seeded or fake data behind one shared flag instead of scattering conditional checks.',
    stage: 'stable',
  },
  {
    key: 'enableExperimentalWorkspace',
    label: 'Experimental workspace',
    description: 'Expose in-progress workspace behavior through one explicit release gate.',
    stage: 'experimental',
  },
]

export function summarizeFeatureFlags(env: AppEnv): FeatureFlagSummary {
  const items = featureFlagDefinitions.map((definition) => ({
    ...definition,
    enabled: env.featureFlags[definition.key],
  }))

  const enabledCount = items.filter((item) => item.enabled).length

  return {
    items,
    enabledCount,
    disabledCount: items.length - enabledCount,
  }
}
