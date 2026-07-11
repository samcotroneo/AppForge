export type PublicEnvSource = {
  MODE: string
  DEV: boolean
  PROD: boolean
  VITE_API_BASE_URL?: string
  VITE_PUBLIC_AUTH_CLIENT_ID?: string
  VITE_ENABLE_MOCK_DATA?: string
  VITE_ENABLE_EXPERIMENTAL_WORKSPACE?: string
}

export type AppEnv = {
  mode: string
  isDevelopment: boolean
  isProduction: boolean
  endpoints: {
    apiBaseUrl?: string
  }
  clients: {
    authClientId?: string
  }
  featureFlags: {
    enableMockData: boolean
    enableExperimentalWorkspace: boolean
  }
}

export type EnvStatus = 'configured' | 'missing' | 'enabled' | 'disabled'

export type EnvStatusItem = {
  label: string
  envKey: string
  value: string
  status: EnvStatus
}

export type AppEnvSummary = {
  configuredRequiredCount: number
  totalRequiredCount: number
  missingRequiredKeys: string[]
  items: EnvStatusItem[]
}

const enabledValues = new Set(['1', 'true', 'yes', 'on'])
const disabledValues = new Set(['0', 'false', 'no', 'off'])

function readOptionalString(value?: string): string | undefined {
  const normalized = value?.trim()
  return normalized ? normalized : undefined
}

function readBooleanFlag(value?: string): boolean {
  const normalized = value?.trim().toLowerCase()

  if (!normalized) {
    return false
  }

  if (enabledValues.has(normalized)) {
    return true
  }

  if (disabledValues.has(normalized)) {
    return false
  }

  return false
}

export function readAppEnv(source: PublicEnvSource = import.meta.env): AppEnv {
  return {
    mode: source.MODE,
    isDevelopment: source.DEV,
    isProduction: source.PROD,
    endpoints: {
      apiBaseUrl: readOptionalString(source.VITE_API_BASE_URL),
    },
    clients: {
      authClientId: readOptionalString(source.VITE_PUBLIC_AUTH_CLIENT_ID),
    },
    featureFlags: {
      enableMockData: readBooleanFlag(source.VITE_ENABLE_MOCK_DATA),
      enableExperimentalWorkspace: readBooleanFlag(source.VITE_ENABLE_EXPERIMENTAL_WORKSPACE),
    },
  }
}

export function summarizeAppEnv(env: AppEnv): AppEnvSummary {
  const items: EnvStatusItem[] = [
    {
      label: 'API base URL',
      envKey: 'VITE_API_BASE_URL',
      value: env.endpoints.apiBaseUrl ?? 'Missing',
      status: env.endpoints.apiBaseUrl ? 'configured' : 'missing',
    },
    {
      label: 'Public auth client ID',
      envKey: 'VITE_PUBLIC_AUTH_CLIENT_ID',
      value: env.clients.authClientId ?? 'Missing',
      status: env.clients.authClientId ? 'configured' : 'missing',
    },
    {
      label: 'Mock data flag',
      envKey: 'VITE_ENABLE_MOCK_DATA',
      value: env.featureFlags.enableMockData ? 'Enabled' : 'Disabled',
      status: env.featureFlags.enableMockData ? 'enabled' : 'disabled',
    },
    {
      label: 'Experimental workspace flag',
      envKey: 'VITE_ENABLE_EXPERIMENTAL_WORKSPACE',
      value: env.featureFlags.enableExperimentalWorkspace ? 'Enabled' : 'Disabled',
      status: env.featureFlags.enableExperimentalWorkspace ? 'enabled' : 'disabled',
    },
  ]

  const missingRequiredKeys = items
    .filter((item) => item.status === 'missing')
    .map((item) => item.envKey)

  return {
    configuredRequiredCount: 2 - missingRequiredKeys.length,
    totalRequiredCount: 2,
    missingRequiredKeys,
    items,
  }
}

export const appEnv = readAppEnv()
export const appEnvSummary = summarizeAppEnv(appEnv)
