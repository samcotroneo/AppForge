import { Card } from 'konsta/react'
import SectionCard from '../../components/ui/SectionCard'
import { starterContract } from './starterContract'

function StarterContractCard() {
  return (
    <SectionCard
      eyebrow="Fresh repo workflow"
      title="AppForge starter contract"
      description="This is the canonical base app to use when a new repo says to build on AppForge."
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <Card style={{ background: '#26272c', border: '1px solid #3a3c42', margin: 0 }}>
          <p style={{ fontSize: '12px', color: '#8a8c93', marginBottom: '8px' }}>Agent prompt</p>
          <p style={{ fontFamily: 'monospace', fontSize: '13px', lineHeight: 1.75, color: '#f2f0ea' }}>{starterContract.prompt}</p>
          <p style={{ marginTop: '12px', fontSize: '13px', color: '#8a8c93' }}>
            Bootstrap command:{' '}
            <span style={{ fontFamily: 'monospace', color: '#d6a960' }}>{starterContract.bootstrapCommand}</span>
          </p>
          <p style={{ marginTop: '8px', fontSize: '13px', color: '#8a8c93' }}>
            Bootstrap artifact:{' '}
            <span style={{ fontFamily: 'monospace', color: '#d6a960' }}>{starterContract.bootstrapArtifacts[0]}</span>
          </p>
        </Card>

        {starterContract.layers.map((layer) => (
          <Card key={layer.title} style={{ background: '#26272c', border: '1px solid #3a3c42', margin: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px', marginBottom: '8px' }}>
              <h3 style={{ fontSize: '14px', fontWeight: 600, color: '#f2f0ea' }}>{layer.title}</h3>
              <span style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.15em', color: '#d6a960' }}>
                {layer.status}
              </span>
            </div>
            <p style={{ fontSize: '13px', color: '#8a8c93', lineHeight: 1.6 }}>{layer.detail}</p>
          </Card>
        ))}

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          <Card style={{ background: '#26272c', border: '1px solid #3a3c42', margin: 0 }}>
            <p style={{ fontSize: '12px', color: '#8a8c93', marginBottom: '8px' }}>Required handoff docs</p>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {starterContract.requiredDocs.map((doc) => (
                <li key={doc} style={{ background: '#1a1b20', borderRadius: '6px', padding: '8px 12px', fontSize: '13px', color: '#f2f0ea', border: '1px solid #3a3c42' }}>
                  {doc}
                </li>
              ))}
            </ul>
          </Card>

          <Card style={{ background: '#26272c', border: '1px solid #3a3c42', margin: 0 }}>
            <p style={{ fontSize: '12px', color: '#8a8c93', marginBottom: '8px' }}>Fresh repo steps</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {starterContract.freshRepoSteps.map((step, index) => (
                <div key={step.title} style={{ background: '#1a1b20', borderRadius: '6px', padding: '10px 12px', border: '1px solid #3a3c42' }}>
                  <p style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.25em', color: '#d6a960' }}>
                    Step {index + 1}
                  </p>
                  <p style={{ fontSize: '13px', fontWeight: 600, color: '#f2f0ea', marginTop: '4px' }}>{step.title}</p>
                  <p style={{ fontSize: '12px', color: '#8a8c93', marginTop: '4px', lineHeight: 1.6 }}>{step.detail}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </SectionCard>
  )
}

export default StarterContractCard
