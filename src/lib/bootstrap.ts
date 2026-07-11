import type { AppRoute } from '../app/routes'
import type { AppEnv, AppEnvSummary, PublicEnvSource } from './env'
import { readAppEnv, summarizeAppEnv } from './env'
import type { AppDataBoundary } from './data'
import { createAppDataBoundary } from './data'
import { designSystemRules } from './designSystem'
import type { AppFeedbackItem, AppFeedbackSummary } from './feedback'
import { summarizeFeedback } from './feedback'
import type { FeatureFlagSummary } from './featureFlags'
import { summarizeFeatureFlags } from './featureFlags'
import { parseRouteFromHash, routePolicy } from './navigation'
import type { NetworkPolicy } from './network'
import { createNetworkPolicy } from './network'
import type { ObservabilityContext } from './observability'
import { createObservabilityContext } from './observability'
import type { PersistenceBoundary, StorageLike } from './persistence'
import { createPersistenceBoundary } from './persistence'
import type { PlatformCapabilities } from './platform'
import { getPlatformCapabilities } from './platform'
import type { SessionBoundary } from './session'
import { restoreSessionBoundary } from './session'

export type AppFoundationContext = {
  env: AppEnv
  envSummary: AppEnvSummary
  featureFlags: FeatureFlagSummary
  initialRoute: AppRoute
  persistence: PersistenceBoundary
  session: SessionBoundary
  network: NetworkPolicy
  observability: ObservabilityContext
  platform: PlatformCapabilities
  dataBoundary: AppDataBoundary
  feedback: AppFeedbackSummary
  designSystemRules: typeof designSystemRules
  routePolicy: typeof routePolicy
}

export type BootstrapResult =
  | {
      status: 'ready'
      context: AppFoundationContext
    }
  | {
      status: 'error'
      message: string
    }

type BootstrapOptions = {
  envSource?: PublicEnvSource
  hash?: string
  storage?: StorageLike
  online?: boolean
  protocol?: string
  shareSupported?: boolean
  standalone?: boolean
  now?: () => string
}

function createBootstrapFeedback(context: {
  envSummary: AppEnvSummary
  featureFlags: FeatureFlagSummary
  persistence: PersistenceBoundary
  session: SessionBoundary
  network: NetworkPolicy
  platform: PlatformCapabilities
}): AppFeedbackItem[] {
  const items: AppFeedbackItem[] = []

  if (context.envSummary.missingRequiredKeys.length > 0) {
    items.push({
      id: 'missing-public-config',
      title: 'Public runtime config is still starter-only',
      message: `Downstream apps should provide ${context.envSummary.missingRequiredKeys.join(', ')} when they wire live services.`,
      tone: 'warning',
    })
  }

  if (context.persistence.policy.driver === 'memory') {
    items.push({
      id: 'memory-storage-fallback',
      title: 'Persistence is using the memory-safe fallback',
      message: 'Local storage is unavailable, so offline-safe writes stay in memory until a browser storage adapter is available.',
      tone: 'warning',
    })
  }

  if (context.session.current.status === 'anonymous') {
    items.push({
      id: 'anonymous-session',
      title: 'Auth boundary is initialized without a provider',
      message: 'The starter restored an anonymous session so downstream apps can add guarded routes and sign-in flows later.',
      tone: 'info',
    })
  }

  if (context.network.status === 'placeholder') {
    items.push({
      id: 'network-placeholder',
      title: 'Network policy is defined without a backend',
      message: 'Base URL, retries, and unauthorized handling are centralized, but the API adapter remains product-specific.',
      tone: 'info',
    })
  }

  if (!context.platform.isOnline) {
    items.push({
      id: 'offline-mode',
      title: 'Platform is currently offline',
      message: 'Offline-safe reads and writes should stay functional while remote sync adapters wait for connectivity.',
      tone: 'warning',
    })
  }

  if (context.featureFlags.enabledCount > 0) {
    items.push({
      id: 'flags-enabled',
      title: 'Starter feature flags are active',
      message: `${context.featureFlags.enabledCount} feature flag${context.featureFlags.enabledCount === 1 ? '' : 's'} currently alter starter behavior.`,
      tone: 'info',
    })
  }

  return items
}

export async function bootstrapApp(options: BootstrapOptions = {}): Promise<BootstrapResult> {
  try {
    const env = readAppEnv(options.envSource)
    const envSummary = summarizeAppEnv(env)
    const featureFlags = summarizeFeatureFlags(env)
    const persistence = createPersistenceBoundary({
      storage: options.storage,
    })
    const session = await restoreSessionBoundary(
      persistence,
      Boolean(env.clients.authClientId),
      options.now?.() ?? new Date().toISOString(),
    )
    const network = createNetworkPolicy(env)
    const observability = createObservabilityContext(env.isDevelopment)
    const platform = getPlatformCapabilities({
      online: options.online,
      protocol: options.protocol,
      shareSupported: options.shareSupported,
      standalone: options.standalone,
    })
    const dataBoundary = createAppDataBoundary({
      network,
      persistence,
      session,
      observability,
      featureFlags,
    })
    const feedback = summarizeFeedback(
      createBootstrapFeedback({
        envSummary,
        featureFlags,
        persistence,
        session,
        network,
        platform,
      }),
    )

    return {
      status: 'ready',
      context: {
        env,
        envSummary,
        featureFlags,
        initialRoute: parseRouteFromHash(
          options.hash ?? (typeof window !== 'undefined' ? window.location.hash : ''),
        ),
        persistence,
        session,
        network,
        observability,
        platform,
        dataBoundary,
        feedback,
        designSystemRules,
        routePolicy,
      },
    }
  } catch (error) {
    return {
      status: 'error',
      message: error instanceof Error ? error.message : 'Unknown app bootstrap failure.',
    }
  }
}
