import type { ReactNode } from 'react'

type ErrorStateProps = {
  title: string
  description: string
  children?: ReactNode
}

function ErrorState({ title, description, children }: ErrorStateProps) {
  return (
    <div style={{ borderRadius: '8px', border: '1px solid rgba(168,56,24,0.4)', background: 'rgba(168,56,24,0.1)', padding: '24px', fontSize: '14px', color: '#f2f0ea' }}>
      <div style={{ display: 'inline-block', borderRadius: '4px', padding: '2px 8px', fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', background: 'rgba(168,56,24,0.15)', color: '#a83818', border: '1px solid rgba(168,56,24,0.3)' }}>
        Needs attention
      </div>
      <h3 style={{ marginTop: '12px', fontSize: '18px', fontWeight: 600, color: '#f2f0ea' }}>{title}</h3>
      <p style={{ marginTop: '8px', lineHeight: 1.75, color: '#8a8c93' }}>{description}</p>
      {children ? <div style={{ marginTop: '16px' }}>{children}</div> : null}
    </div>
  )
}

export default ErrorState
