import type { FeatureFlagSummary } from './featureFlags'
import type { NetworkPolicy } from './network'
import type { ObservabilityContext } from './observability'
import type { PersistenceBoundary } from './persistence'
import type { SessionBoundary } from './session'

export type DataAdapterKind = 'api' | 'repository' | 'sync'
export type DataAdapterStatus = 'ready' | 'placeholder'

export type DataAdapterDescriptor = {
  id: string
  label: string
  kind: DataAdapterKind
  status: DataAdapterStatus
  description: string
}

export type AppDataBoundary = {
  adapters: DataAdapterDescriptor[]
  requestPolicy: NetworkPolicy
  persistenceDriver: PersistenceBoundary['policy']['driver']
  sessionStrategy: SessionBoundary['policy']['authStrategy']
  readySinkCount: number
  enabledFeatureFlagCount: number
}

type DataBoundaryOptions = {
  network: NetworkPolicy
  persistence: PersistenceBoundary
  session: SessionBoundary
  observability: ObservabilityContext
  featureFlags: FeatureFlagSummary
}

export function createAppDataBoundary(options: DataBoundaryOptions): AppDataBoundary {
  return {
    adapters: [
      {
        id: 'api-client',
        label: 'API client',
        kind: 'api',
        status: options.network.baseUrl ? 'ready' : 'placeholder',
        description: 'Own request policies, unauthorized handling, and transport concerns in one client boundary.',
      },
      {
        id: 'local-repository',
        label: 'Local repository',
        kind: 'repository',
        status: 'ready',
        description: 'Route persisted reads, cache invalidation, and offline-safe writes through one repository seam.',
      },
      {
        id: 'sync-queue',
        label: 'Sync queue',
        kind: 'sync',
        status: 'placeholder',
        description: 'Reserve a dedicated adapter for background sync, retry orchestration, and conflict handling.',
      },
    ],
    requestPolicy: options.network,
    persistenceDriver: options.persistence.policy.driver,
    sessionStrategy: options.session.policy.authStrategy,
    readySinkCount: options.observability.sinks.filter((sink) => sink.status === 'ready').length,
    enabledFeatureFlagCount: options.featureFlags.enabledCount,
  }
}
