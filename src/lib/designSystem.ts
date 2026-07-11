export type DesignSystemRule = {
  title: string
  detail: string
}

export const designSystemRules: DesignSystemRule[] = [
  {
    title: 'Page layouts own structure, not behavior',
    detail: 'Keep route screens responsible for layout sections while feature logic stays in dedicated folders or lib adapters.',
  },
  {
    title: 'Status badges reflect one shared vocabulary',
    detail: 'Reuse consistent success, warning, error, and info semantics so delivery status looks familiar across every app slice.',
  },
  {
    title: 'Primary actions should stay visually singular',
    detail: 'Promote one dominant action per section, then use ghost or outline styles for secondary paths.',
  },
  {
    title: 'Empty and error states must explain the next step',
    detail: 'Every placeholder should tell downstream teams where to wire live data, navigation, or remediation behavior.',
  },
  {
    title: 'Accessibility checks are part of the starter contract',
    detail: 'Preserve semantic headings, button elements, readable copy, and route affordances from the first feature slice.',
  },
]
