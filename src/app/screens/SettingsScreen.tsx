import type React from 'react'
import { Card, List, ListItem } from 'konsta/react'
import AppShell from '../../components/shell/AppShell'
import ErrorState from '../../components/feedback/ErrorState'
import SectionCard from '../../components/ui/SectionCard'
import type { AppFoundationContext } from '../../lib/bootstrap'
import type { EnvStatus } from '../../lib/env'

type SettingsScreenProps = {
  blockedTaskCount: number
  foundation: AppFoundationContext
  portfolioProjectCount: number
}

const statusColor: Record<EnvStatus, string> = {
  configured: '#d6a960',
  missing: '#a83818',
  enabled: '#e06818',
  disabled: '#8a8c93',
}

const NATIVE_PLATFORM_COMMANDS = ['npx cap add android', 'npx cap add ios'] as const

const neutralBadge: React.CSSProperties = { borderRadius: '4px', padding: '2px 8px', background: 'rgba(58,60,66,0.4)', color: '#8a8c93', border: '1px solid #3a3c42' }

function SettingsScreen({ blockedTaskCount, foundation, portfolioProjectCount }: SettingsScreenProps) {
  return (
    <AppShell title="Settings">
      <SectionCard
        eyebrow="Starter example"
        title="Environment and delivery setup"
        description="Sample config, readiness checks, and platform reminders in a dedicated setup area."
      >
        {/* Runtime config */}
        <Card style={{ background: '#26272c', border: '1px solid #3a3c42', margin: '0 0 16px' }}>
          <p style={{ fontSize: '12px', color: '#8a8c93' }}>Runtime configuration</p>
          <p style={{ fontSize: '32px', fontWeight: 900, color: '#e06818', margin: '8px 0 4px' }}>
            {foundation.envSummary.configuredRequiredCount}/{foundation.envSummary.totalRequiredCount}
          </p>
          <p style={{ fontSize: '12px', color: '#8a8c93', marginBottom: '12px' }}>
            Example public settings from the starter env layer.
          </p>
          <List>
            {foundation.envSummary.items.map((item) => (
              <ListItem
                key={item.envKey}
                title={item.label}
                subtitle={item.envKey}
                after={
                  <span style={{ fontSize: '12px', fontWeight: 600, color: statusColor[item.status] }}>
                    {item.value}
                  </span>
                }
              />
            ))}
          </List>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '12px' }}>
            {foundation.featureFlags.items.map((flag) => (
              <span
                key={flag.label}
                style={{
                  borderRadius: '4px',
                  padding: '2px 8px',
                  fontSize: '11px',
                  fontWeight: 600,
                  background: flag.enabled ? 'rgba(224,104,24,0.12)' : 'rgba(58,60,66,0.3)',
                  color: flag.enabled ? '#e06818' : '#8a8c93',
                  border: flag.enabled ? '1px solid rgba(224,104,24,0.3)' : '1px solid #3a3c42',
                }}
              >
                {flag.label}
              </span>
            ))}
          </div>
        </Card>

        {/* Bootstrap + session */}
        <Card style={{ background: '#26272c', border: '1px solid #3a3c42', margin: '0 0 16px' }}>
          <p style={{ fontSize: '14px', fontWeight: 600, color: '#f2f0ea', marginBottom: '12px' }}>Bootstrap, routing, and session</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
            <div style={{ background: '#1a1b20', borderRadius: '8px', padding: '12px', border: '1px solid #3a3c42' }}>
              <p style={{ fontSize: '12px', color: '#8a8c93' }}>Route mode</p>
              <p style={{ fontSize: '14px', fontWeight: 600, color: '#f2f0ea', margin: '4px 0' }}>{foundation.routePolicy.mode}</p>
              <p style={{ fontSize: '12px', color: '#8a8c93' }}>Deep linking: {foundation.routePolicy.supportsDeepLinking ? 'on' : 'off'}</p>
            </div>
            <div style={{ background: '#1a1b20', borderRadius: '8px', padding: '12px', border: '1px solid #3a3c42' }}>
              <p style={{ fontSize: '12px', color: '#8a8c93' }}>Session strategy</p>
              <p style={{ fontSize: '14px', fontWeight: 600, color: '#f2f0ea', margin: '4px 0' }}>{foundation.session.policy.authStrategy}</p>
              <p style={{ fontSize: '12px', color: '#8a8c93' }}>State: {foundation.session.current.status}</p>
            </div>
          </div>
        </Card>

        {/* Persistence + observability */}
        <Card style={{ background: '#26272c', border: '1px solid #3a3c42', margin: '0 0 16px' }}>
          <p style={{ fontSize: '14px', fontWeight: 600, color: '#f2f0ea', marginBottom: '12px' }}>Persistence, data, and observability</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
            <div style={{ background: '#1a1b20', borderRadius: '8px', padding: '12px', border: '1px solid #3a3c42' }}>
              <p style={{ fontSize: '12px', color: '#8a8c93' }}>Persistence driver</p>
              <p style={{ fontSize: '14px', fontWeight: 600, color: '#f2f0ea', margin: '4px 0' }}>{foundation.persistence.policy.driver}</p>
              <p style={{ fontSize: '12px', color: '#8a8c93' }}>Schema v{foundation.persistence.policy.schemaVersion}</p>
            </div>
            <div style={{ background: '#1a1b20', borderRadius: '8px', padding: '12px', border: '1px solid #3a3c42' }}>
              <p style={{ fontSize: '12px', color: '#8a8c93' }}>Observability sinks</p>
              <p style={{ fontSize: '14px', fontWeight: 600, color: '#f2f0ea', margin: '4px 0' }}>{foundation.observability.sinks.length}</p>
              <p style={{ fontSize: '12px', color: '#8a8c93' }}>{foundation.dataBoundary.readySinkCount} ready</p>
            </div>
          </div>
        </Card>

        {/* Design seams */}
        <Card style={{ background: '#26272c', border: '1px solid #3a3c42', margin: 0 }}>
          <p style={{ fontSize: '14px', fontWeight: 600, color: '#f2f0ea', marginBottom: '12px' }}>Design and testing seams</p>
          {foundation.designSystemRules.slice(0, 3).map((rule) => (
            <div key={rule.title} style={{ background: '#1a1b20', borderRadius: '8px', padding: '12px', border: '1px solid #3a3c42', marginBottom: '8px' }}>
              <p style={{ fontSize: '13px', fontWeight: 600, color: '#f2f0ea' }}>{rule.title}</p>
              <p style={{ fontSize: '12px', color: '#8a8c93', marginTop: '4px' }}>{rule.detail}</p>
            </div>
          ))}
        </Card>
      </SectionCard>

      {/* Platform */}
      <SectionCard
        eyebrow="Platform example"
        title="Sample native setup reminders"
        description="Capacitor and PWA support are wired. This card shows the kind of platform guidance a real app might surface."
      >
        <ErrorState
          title="Example native setup warning"
          description="Use reminders like this to point developers toward platform steps that still need real app-specific work."
        >
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', fontSize: '12px', color: '#8a8c93' }}>
            {NATIVE_PLATFORM_COMMANDS.map((cmd) => (
              <span key={cmd} style={{ ...neutralBadge, borderRadius: '4px', padding: '2px 8px', fontFamily: 'monospace' }}>{cmd}</span>
            ))}
            {foundation.platform.capabilities.map((capability) => (
              <span
                key={capability.label}
                style={{
                  borderRadius: '4px',
                  padding: '2px 8px',
                  fontWeight: 600,
                  background: capability.available ? 'rgba(214,169,96,0.12)' : 'rgba(248,223,102,0.1)',
                  color: capability.available ? '#d6a960' : '#f8df66',
                  border: capability.available ? '1px solid rgba(214,169,96,0.3)' : '1px solid rgba(248,223,102,0.3)',
                }}
              >
                {capability.label}
              </span>
            ))}
          </div>
        </ErrorState>
      </SectionCard>

      {/* Signals */}
      <SectionCard
        eyebrow="Signals example"
        title="Sample app-wide signals"
        description="Shared notices, adapter counts, and setup blockers visible outside feature routes."
      >
        <div style={{ display: 'grid', gap: '12px' }}>
          <Card style={{ background: '#26272c', border: '1px solid #3a3c42', margin: 0 }}>
            <p style={{ fontSize: '12px', color: '#8a8c93' }}>Blocked sample tasks</p>
            <p style={{ fontSize: '36px', fontWeight: 900, color: '#a83818', margin: '8px 0 4px' }}>{blockedTaskCount}</p>
            <p style={{ fontSize: '12px', color: '#8a8c93' }}>
              {foundation.envSummary.missingRequiredKeys.length > 0
                ? `Missing config: ${foundation.envSummary.missingRequiredKeys.join(', ')}`
                : 'Use this for setup checks, integration warnings, and release-readiness policies.'}
            </p>
          </Card>
          <Card style={{ background: '#26272c', border: '1px solid #3a3c42', margin: 0 }}>
            <p style={{ fontSize: '12px', color: '#8a8c93' }}>Starter coverage</p>
            <p style={{ fontSize: '36px', fontWeight: 900, color: '#e06818', margin: '8px 0 4px' }}>
              {portfolioProjectCount + foundation.dataBoundary.adapters.length}
            </p>
            <p style={{ fontSize: '12px', color: '#8a8c93' }}>Starter projects plus shared adapters mapped into the base shell.</p>
          </Card>
          <Card style={{ background: '#26272c', border: '1px solid #3a3c42', margin: 0 }}>
            <p style={{ fontSize: '12px', color: '#8a8c93' }}>Sample notices</p>
            <p style={{ fontSize: '36px', fontWeight: 900, color: '#f8df66', margin: '8px 0 4px' }}>{foundation.feedback.items.length}</p>
            <div style={{ marginTop: '8px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {foundation.feedback.items.map((item) => (
                <p key={item.title} style={{ fontSize: '12px', color: '#8a8c93' }}>
                  <span style={{ fontWeight: 600, color: '#f2f0ea' }}>{item.title}:</span> {item.message}
                </p>
              ))}
            </div>
          </Card>
        </div>
      </SectionCard>
    </AppShell>
  )
}

export default SettingsScreen
