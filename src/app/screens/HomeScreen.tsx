import { Block, Card, List, ListItem } from 'konsta/react'
import AppShell from '../../components/shell/AppShell'
import SectionCard from '../../components/ui/SectionCard'
import StarterContractCard from '../../features/bootstrap/StarterContractCard'
import type { AppFoundationContext } from '../../lib/bootstrap'
import type { OnboardingItem, PortfolioSummary, WorkspaceProject } from '../../features/workbench/workspaceData'
import { getRecentProjects } from '../../features/workbench/workspaceData'

type HomeScreenProps = {
  projects: WorkspaceProject[]
  summary: PortfolioSummary
  checklist: OnboardingItem[]
  feedbackCount: number
  foundationCount: number
  foundation: AppFoundationContext
}

function HomeScreen({ projects, summary, checklist, feedbackCount, foundationCount, foundation }: HomeScreenProps) {
  const recentProjects = getRecentProjects(projects)

  return (
    <AppShell title="Overview">
      {/* Hero */}
      <Block>
        <div style={{ borderRadius: '12px', border: '1px solid #3a3c42', background: '#1a1b20', overflow: 'hidden', position: 'relative', boxShadow: '0 0 24px 0 rgba(224, 104, 24, 0.15)' }}>
          <div style={{ position: 'absolute', inset: 0, opacity: 0.25, backgroundImage: "url('/appforge_background.png')", backgroundSize: 'cover', backgroundPosition: 'center' }} aria-hidden="true" />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(17,17,22,0.8), rgba(26,27,32,0.6), rgba(17,17,22,0.8))' }} aria-hidden="true" />
          <div style={{ position: 'relative', padding: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <img src="/appforge_emblem.png" alt="" aria-hidden="true" style={{ height: '48px', width: '48px' }} />
              <span style={{ borderRadius: '4px', padding: '2px 8px', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.25em', background: 'rgba(224,104,24,0.15)', color: '#e06818', border: '1px solid rgba(224,104,24,0.3)' }}>
                Sample app
              </span>
            </div>
            <h1 style={{ fontSize: '28px', fontWeight: 900, color: '#f2f0ea', lineHeight: 1.2, marginBottom: '12px' }}>
              Explore the AppForge starter structure
            </h1>
            <p style={{ fontSize: '14px', color: '#8a8c93', lineHeight: 1.75 }}>
              Example routes, sample data, and replaceable scaffolding built with Ionic React and KonstaUI.
            </p>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '12px' }}>
              <span style={{ borderRadius: '4px', padding: '2px 8px', fontSize: '11px', fontWeight: 600, background: 'rgba(58,60,66,0.4)', color: '#8a8c93', border: '1px solid #3a3c42' }}>Ionic React</span>
              <span style={{ borderRadius: '4px', padding: '2px 8px', fontSize: '11px', fontWeight: 600, background: 'rgba(58,60,66,0.4)', color: '#8a8c93', border: '1px solid #3a3c42' }}>Capacitor</span>
              <span style={{ borderRadius: '4px', padding: '2px 8px', fontSize: '11px', fontWeight: 600, background: 'rgba(224,104,24,0.15)', color: '#e06818', border: '1px solid rgba(224,104,24,0.3)' }}>PWA ready</span>
            </div>
          </div>
        </div>
      </Block>

      <StarterContractCard />

      {/* Metrics */}
      <Block>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
          <Card style={{ background: '#1a1b20', border: '1px solid #3a3c42', margin: 0 }}>
            <p style={{ fontSize: '12px', color: '#8a8c93' }}>Example slices</p>
            <p style={{ fontSize: '32px', fontWeight: 900, color: '#e06818', margin: '8px 0 4px' }}>{summary.active}</p>
            <p style={{ fontSize: '12px', color: '#8a8c93' }}>Starter examples to swap for real features.</p>
          </Card>
          <Card style={{ background: '#1a1b20', border: '1px solid #3a3c42', margin: 0 }}>
            <p style={{ fontSize: '12px', color: '#8a8c93' }}>Sample concepts</p>
            <p style={{ fontSize: '32px', fontWeight: 900, color: '#d6a960', margin: '8px 0 4px' }}>{summary.draft}</p>
            <p style={{ fontSize: '12px', color: '#8a8c93' }}>Placeholders still taking shape.</p>
          </Card>
          <Card style={{ background: '#1a1b20', border: '1px solid #3a3c42', margin: 0 }}>
            <p style={{ fontSize: '12px', color: '#8a8c93' }}>Example blockers</p>
            <p style={{ fontSize: '32px', fontWeight: 900, color: '#a83818', margin: '8px 0 4px' }}>{summary.blocked}</p>
            <p style={{ fontSize: '12px', color: '#8a8c93' }}>Dependency state demonstration.</p>
          </Card>
          <Card style={{ background: '#1a1b20', border: '1px solid #3a3c42', margin: 0 }}>
            <p style={{ fontSize: '12px', color: '#8a8c93' }}>Foundations</p>
            <p style={{ fontSize: '32px', fontWeight: 900, color: '#f8df66', margin: '8px 0 4px' }}>{foundationCount}</p>
            <p style={{ fontSize: '12px', color: '#8a8c93' }}>Bootstrap, data, feedback seams.</p>
          </Card>
        </div>
      </Block>

      {/* Recent projects */}
      <SectionCard
        eyebrow="Example content"
        title="Sample projects"
        description="Illustrative entries to show card layout and status handling. Replace when your app takes shape."
      >
        <List>
          {recentProjects.map((project) => (
            <ListItem
              key={project.id}
              title={project.name}
              subtitle={project.owner}
              after={
                <span style={{ borderRadius: '4px', padding: '2px 8px', fontSize: '11px', fontWeight: 600, background: 'rgba(214,169,96,0.1)', color: '#d6a960', border: '1px solid rgba(214,169,96,0.25)' }}>
                  {project.status}
                </span>
              }
            >
              <div slot="inner-end" />
            </ListItem>
          ))}
        </List>
      </SectionCard>

      {/* Onboarding checklist */}
      <SectionCard
        eyebrow="Starter checklist"
        title="Replace these sample placeholders first"
        description="Example starter content pointing developers toward the first real integration steps."
      >
        <List>
          {checklist.map((item) => (
            <ListItem
              key={item.title}
              title={item.title}
              subtitle={item.detail}
              media={<span style={{ fontSize: '18px', color: '#e06818' }}>✓</span>}
            />
          ))}
        </List>
      </SectionCard>

      {/* Starter signals */}
      <SectionCard
        eyebrow="App status"
        title="Starter signals"
        description="Example setup checks, delivery cues, and shared notifications for an AppForge-based app."
      >
        <div style={{ display: 'grid', gap: '12px' }}>
          <Card style={{ background: '#26272c', border: '1px solid #3a3c42', margin: 0 }}>
            <p style={{ fontSize: '12px', color: '#8a8c93' }}>Bootstrap example</p>
            <p style={{ fontSize: '28px', fontWeight: 900, color: '#e06818', margin: '8px 0 4px' }}>{foundation.routePolicy.mode}</p>
            <p style={{ fontSize: '12px', color: '#8a8c93' }}>Starter route policy with back-button support</p>
          </Card>
          <Card style={{ background: '#26272c', border: '1px solid #3a3c42', margin: 0 }}>
            <p style={{ fontSize: '12px', color: '#8a8c93' }}>Persistence + session sample</p>
            <p style={{ fontSize: '28px', fontWeight: 900, color: '#d6a960', margin: '8px 0 4px' }}>{foundation.persistence.policy.driver}</p>
            <p style={{ fontSize: '12px', color: '#8a8c93' }}>{foundation.session.current.status} sample session restored on boot.</p>
          </Card>
          <Card style={{ background: '#26272c', border: '1px solid #3a3c42', margin: 0 }}>
            <p style={{ fontSize: '12px', color: '#8a8c93' }}>Data + observability</p>
            <p style={{ fontSize: '28px', fontWeight: 900, color: '#f8df66', margin: '8px 0 4px' }}>{foundation.dataBoundary.adapters.length}</p>
            <p style={{ fontSize: '12px', color: '#8a8c93' }}>{foundation.observability.sinks.length} sink definitions · {feedbackCount} sample notices.</p>
          </Card>
        </div>
      </SectionCard>
    </AppShell>
  )
}

export default HomeScreen
