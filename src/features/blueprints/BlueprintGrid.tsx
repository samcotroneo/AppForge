import { Card } from 'konsta/react'
import { templateBlueprints } from './templateBlueprints'

function BlueprintGrid() {
  return (
    <div style={{ display: 'grid', gap: '12px' }}>
      {templateBlueprints.map((blueprint) => (
        <Card key={blueprint.title} style={{ background: '#1a1b20', border: '1px solid #3a3c42', margin: 0 }}>
          <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#f2f0ea', marginBottom: '8px' }}>{blueprint.title}</h3>
          <p style={{ fontSize: '13px', lineHeight: 1.75, color: '#8a8c93', marginBottom: '12px' }}>{blueprint.summary}</p>
          <ul style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {blueprint.deliverables.map((deliverable) => (
              <li key={deliverable} style={{ display: 'flex', gap: '8px', fontSize: '13px', color: '#8a8c93' }}>
                <span style={{ color: '#e06818' }}>✓</span>
                <span>{deliverable}</span>
              </li>
            ))}
          </ul>
        </Card>
      ))}
    </div>
  )
}

export default BlueprintGrid
