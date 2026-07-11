import type { AppEnv } from './env'

export type NetworkPolicyStatus = 'configured' | 'placeholder'

export type NetworkPolicy = {
  baseUrl?: string
  timeoutMs: number
  retryCount: number
  unauthorizedHandling: 'clear-session-and-notify'
  headers: string[]
  status: NetworkPolicyStatus
}

export function createNetworkPolicy(env: AppEnv): NetworkPolicy {
  return {
    baseUrl: env.endpoints.apiBaseUrl,
    timeoutMs: 8000,
    retryCount: 1,
    unauthorizedHandling: 'clear-session-and-notify',
    headers: ['Accept: application/json', 'Content-Type: application/json'],
    status: env.endpoints.apiBaseUrl ? 'configured' : 'placeholder',
  }
}
