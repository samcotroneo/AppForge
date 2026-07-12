import type { ReactNode } from 'react'

type EmptyStateProps = {
  title: string
  description: string
  children?: ReactNode
}

function EmptyState({ title, description, children }: EmptyStateProps) {
  return (
    <div style={{ borderRadius: '8px', border: '1px dashed #3a3c42', background: 'rgba(38,39,44,0.7)', padding: '24px', fontSize: '14px', color: '#8a8c93' }}>
      <div style={{ display: 'inline-block', borderRadius: '4px', padding: '2px 8px', fontSize: '11px', fontWeight: 600, textTransform: 'uppercase' as const, letterSpacing: '0.05em', background: 'rgba(58,60,66,0.4)', color: '#8a8c93', border: '1px solid #3a3c42' }}>
        Empty state
      </div>
      <h3 style={{ marginTop: '12px', fontSize: '18px', fontWeight: 600, color: '#f2f0ea' }}>{title}</h3>
      <p style={{ marginTop: '8px', lineHeight: 1.75 }}>{description}</p>
      {children ? <div style={{ marginTop: '16px' }}>{children}</div> : null}
    </div>
  )
}

export default EmptyState
