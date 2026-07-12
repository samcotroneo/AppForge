import { Card } from 'konsta/react'
import SectionCard from '../../components/ui/SectionCard'
import { agentTracks } from './agentTracks'

function AgentWorkflow() {
  return (
    <SectionCard
      eyebrow="Sub-agent workflow"
      title="Parallelize the work that scales, centralize the work that decides architecture"
      description="Use the template boundaries to split complex product work into safe, low-conflict execution lanes."
    >
      <div style={{ display: 'grid', gap: '12px' }}>
        {agentTracks.map((track) => (
          <Card key={track.lane} style={{ background: '#26272c', border: '1px solid #3a3c42', margin: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', marginBottom: '8px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#f2f0ea' }}>{track.lane}</h3>
              <span style={{ borderRadius: '4px', padding: '2px 8px', fontSize: '11px', fontWeight: 600, background: 'rgba(224,104,24,0.12)', color: '#e06818', border: '1px solid rgba(224,104,24,0.3)' }}>
                sub-agent
              </span>
            </div>
            <p style={{ fontSize: '13px', color: '#8a8c93', lineHeight: 1.6 }}>{track.scope}</p>
            <p style={{ marginTop: '12px', fontSize: '13px', fontWeight: 600, color: '#f2f0ea' }}>Outcome: {track.outcome}</p>
          </Card>
        ))}
      </div>
    </SectionCard>
  )
}

export default AgentWorkflow
