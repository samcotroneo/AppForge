export type ChecklistItem = {
  title: string
  detail: string
}

export const launchChecklist: ChecklistItem[] = [
  {
    title: 'Rename product metadata and bundle identifiers',
    detail: 'Update package metadata, manifest values, and the Capacitor app id before copying the template into a new product repo.',
  },
  {
    title: 'Wire your first real feature module',
    detail: 'Replace showcase content with domain-specific features under src/features and keep shared UI in src/components.',
  },
  {
    title: 'Validate web and native delivery paths',
    detail: 'Run lint, tests, build, and cap sync so the app is ready for browser, Android, and iOS iteration.',
  },
]
