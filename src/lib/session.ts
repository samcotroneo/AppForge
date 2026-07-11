import type { PersistenceBoundary } from './persistence'

export type SessionStatus = 'anonymous' | 'authenticated' | 'expired'

export type SessionState = {
  status: SessionStatus
  provider: 'none' | 'custom'
  subject: string | null
  restoredAt: string
}

export type SessionPolicy = {
  storageKey: string
  restoreOnBoot: boolean
  authStrategy: 'provider-adapter'
  guardedRoutes: string[]
  publicClientConfigured: boolean
}

export type SessionBoundary = {
  current: SessionState
  policy: SessionPolicy
}

const sessionStorageKey = 'session'

export function createAnonymousSession(restoredAt = new Date().toISOString()): SessionState {
  return {
    status: 'anonymous',
    provider: 'none',
    subject: null,
    restoredAt,
  }
}

export async function restoreSessionBoundary(
  persistence: PersistenceBoundary,
  publicClientConfigured: boolean,
  restoredAt = new Date().toISOString(),
): Promise<SessionBoundary> {
  const fallback = createAnonymousSession(restoredAt)
  const restoredSession = persistence.readJSON(sessionStorageKey, fallback)

  return {
    current: {
      ...fallback,
      ...restoredSession,
      restoredAt,
    },
    policy: {
      storageKey: sessionStorageKey,
      restoreOnBoot: true,
      authStrategy: 'provider-adapter',
      guardedRoutes: [],
      publicClientConfigured,
    },
  }
}
