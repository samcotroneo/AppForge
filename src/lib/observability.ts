export type ObservabilitySinkStatus = 'ready' | 'placeholder'

export type ObservabilitySink = {
  name: string
  kind: 'logger' | 'analytics' | 'error-reporting'
  status: ObservabilitySinkStatus
  description: string
}

export type ObservabilityContext = {
  logLevel: 'debug' | 'info'
  captureNavigation: boolean
  captureErrors: boolean
  sinks: ObservabilitySink[]
}

export function createObservabilityContext(isDevelopment: boolean): ObservabilityContext {
  return {
    logLevel: isDevelopment ? 'debug' : 'info',
    captureNavigation: true,
    captureErrors: true,
    sinks: [
      {
        name: 'Console logger',
        kind: 'logger',
        status: 'ready',
        description: 'Safe default logging sink for local development and starter diagnostics.',
      },
      {
        name: 'Analytics adapter',
        kind: 'analytics',
        status: 'placeholder',
        description: 'Swap in product-specific analytics without coupling screens to a vendor SDK.',
      },
      {
        name: 'Error reporting adapter',
        kind: 'error-reporting',
        status: 'placeholder',
        description: 'Connect crash or exception reporting through one shared app boundary.',
      },
    ],
  }
}
