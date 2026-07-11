export type StorageLike = Pick<Storage, 'getItem' | 'setItem' | 'removeItem'>
export type PersistenceDriver = 'localStorage' | 'memory'
export type PersistenceStatus = 'ready' | 'fallback'

export type PersistencePolicy = {
  keyPrefix: string
  schemaVersion: string
  driver: PersistenceDriver
  status: PersistenceStatus
  offlineSafeWrites: boolean
}

export type PersistenceBoundary = {
  policy: PersistencePolicy
  toStorageKey: (key: string) => string
  readJSON: <Value>(key: string, fallback: Value) => Value
  writeJSON: <Value>(key: string, value: Value) => boolean
  remove: (key: string) => void
}

type PersistedEnvelope<Value> = {
  version: string
  updatedAt: string
  value: Value
}

type PersistenceOptions = {
  keyPrefix?: string
  schemaVersion?: string
  storage?: StorageLike
}

export function createMemoryStorage(): StorageLike {
  const store = new Map<string, string>()

  return {
    getItem(key) {
      return store.get(key) ?? null
    },
    setItem(key, value) {
      store.set(key, value)
    },
    removeItem(key) {
      store.delete(key)
    },
  }
}

function resolveStorage(storage?: StorageLike): {
  storage: StorageLike
  driver: PersistenceDriver
  status: PersistenceStatus
} {
  if (storage) {
    return {
      storage,
      driver: 'memory',
      status: 'fallback',
    }
  }

  if (typeof window === 'undefined') {
    return {
      storage: createMemoryStorage(),
      driver: 'memory',
      status: 'fallback',
    }
  }

  try {
    const probeKey = '__appforge_storage_probe__'
    window.localStorage.setItem(probeKey, probeKey)
    window.localStorage.removeItem(probeKey)

    return {
      storage: window.localStorage,
      driver: 'localStorage',
      status: 'ready',
    }
  } catch {
    return {
      storage: createMemoryStorage(),
      driver: 'memory',
      status: 'fallback',
    }
  }
}

export function createPersistenceBoundary(options: PersistenceOptions = {}): PersistenceBoundary {
  const resolved = resolveStorage(options.storage)
  const policy: PersistencePolicy = {
    keyPrefix: options.keyPrefix ?? 'appforge',
    schemaVersion: options.schemaVersion ?? '1',
    driver: resolved.driver,
    status: resolved.status,
    offlineSafeWrites: true,
  }

  const toStorageKey = (key: string) => `${policy.keyPrefix}:${key}`

  return {
    policy,
    toStorageKey,
    readJSON(key, fallback) {
      try {
        const storedValue = resolved.storage.getItem(toStorageKey(key))
        if (!storedValue) {
          return fallback
        }

        const parsed = JSON.parse(storedValue) as PersistedEnvelope<unknown>
        if (!parsed || parsed.version !== policy.schemaVersion) {
          return fallback
        }

        return (parsed.value as typeof fallback) ?? fallback
      } catch {
        return fallback
      }
    },
    writeJSON(key, value) {
      try {
        const envelope: PersistedEnvelope<typeof value> = {
          version: policy.schemaVersion,
          updatedAt: new Date().toISOString(),
          value,
        }

        resolved.storage.setItem(toStorageKey(key), JSON.stringify(envelope))
        return true
      } catch {
        return false
      }
    },
    remove(key) {
      try {
        resolved.storage.removeItem(toStorageKey(key))
      } catch {
        // Ignore storage remove failures so UI flows stay resilient offline.
      }
    },
  }
}
