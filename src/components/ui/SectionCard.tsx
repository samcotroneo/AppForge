import type { ReactNode } from 'react'
import { Block } from 'konsta/react'

type SectionCardProps = {
  eyebrow: string
  title: string
  description: string
  children: ReactNode
}

function SectionCard({ eyebrow, title, description, children }: SectionCardProps) {
  return (
    <Block>
      <p style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.3em', color: '#d6a960' }}>
        {eyebrow}
      </p>
      <h2 style={{ marginTop: '12px', fontSize: '22px', fontWeight: 700, color: '#f2f0ea' }}>{title}</h2>
      <p style={{ marginTop: '12px', fontSize: '14px', lineHeight: 1.75, color: '#8a8c93', maxWidth: '720px' }}>
        {description}
      </p>
      <div style={{ marginTop: '20px' }}>{children}</div>
    </Block>
  )
}

export default SectionCard
