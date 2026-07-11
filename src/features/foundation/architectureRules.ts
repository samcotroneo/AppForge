export type ArchitectureRule = {
  title: string
  detail: string
}

export const architectureRules: ArchitectureRule[] = [
  {
    title: 'Compose screens from small TSX parts',
    detail: 'Keep route-level views in src/app and build them from shared shell or feature components instead of one large file.',
  },
  {
    title: 'Keep feature data and helpers close to the feature',
    detail: 'Colocate types, fixtures, and pure functions beside the TSX component so agents can make focused edits with less risk.',
  },
  {
    title: 'Push platform-specific logic into adapters',
    detail: 'Capacitor plugins, PWA registration, and storage integrations should live in src/lib to avoid UI-level coupling.',
  },
  {
    title: 'Prefer semantic UI primitives first',
    detail: 'Reach for DaisyUI cards, badges, stats, and buttons before introducing custom wrappers, then refine with Tailwind utilities.',
  },
]
