export type TemplateBlueprint = {
  title: string
  summary: string
  deliverables: string[]
}

export const templateBlueprints: TemplateBlueprint[] = [
  {
    title: 'Platform baseline',
    summary: 'Vite web delivery, Capacitor packaging, and PWA installability start in sync.',
    deliverables: ['Capacitor config for dist output', 'Manifest + service worker generation', 'Web/native launch checklist'],
  },
  {
    title: 'Interface system',
    summary: 'DaisyUI semantic components and Tailwind utilities give each app a clean, mobile-ready foundation.',
    deliverables: ['Shared shell and section cards', 'Responsive layout primitives', 'Theme-aware defaults'],
  },
  {
    title: 'Feature architecture',
    summary: 'Feature folders keep app logic modular while TSX views stay small and composable.',
    deliverables: ['Domain-first folder boundaries', 'Colocated types and pure helpers', 'Shared lib adapters for platform code'],
  },
  {
    title: 'Agent operating model',
    summary: 'Prompt-ready repo guidance makes future agent execution safer and more parallelizable.',
    deliverables: ['Copilot instructions', 'Claude guidance', 'Sub-agent workflow documentation'],
  },
]
