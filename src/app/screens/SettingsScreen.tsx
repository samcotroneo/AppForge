import ErrorState from '../../components/feedback/ErrorState'
import SectionCard from '../../components/ui/SectionCard'
import type { AppFoundationContext } from '../../lib/bootstrap'
import type { EnvStatus } from '../../lib/env'

type SettingsScreenProps = {
  blockedTaskCount: number
  foundation: AppFoundationContext
  portfolioProjectCount: number
}

const statusBadgeStyles: Record<EnvStatus, string> = {
  configured: 'background: rgba(214,169,96,0.12); color: #d6a960; border: 1px solid rgba(214,169,96,0.3);',
  missing: 'background: rgba(168,56,24,0.12); color: #a83818; border: 1px solid rgba(168,56,24,0.3);',
  enabled: 'background: rgba(224,104,24,0.12); color: #e06818; border: 1px solid rgba(224,104,24,0.3);',
  disabled: 'background: rgba(58,60,66,0.3); color: #8a8c93; border: 1px solid #3a3c42;',
}

function SettingsScreen(props: SettingsScreenProps) {
  return (
    <div class="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
      <SectionCard
        eyebrow="Starter defaults"
        title="Environment and delivery setup"
        description="Keep product-level settings and readiness checks in a dedicated screen so integrations and native gaps are visible without hunting through docs."
      >
        <div class="space-y-4">
          <article class="rounded-md border border-[#3a3c42] bg-[#26272c] p-4">
            <h3 class="font-semibold text-[#f2f0ea]">Runtime configuration</h3>
            <div class="mt-3 flex flex-wrap items-end justify-between gap-3">
              <div>
                <p class="text-3xl font-black text-[#e06818]">
                  {props.foundation.envSummary.configuredRequiredCount}/
                  {props.foundation.envSummary.totalRequiredCount}
                </p>
                <p class="mt-1 text-sm text-[#8a8c93]">
                  Required public settings configured for live service wiring.
                </p>
              </div>
              <span
                class="rounded px-2 py-0.5 text-xs font-mono"
                style="background: rgba(58,60,66,0.4); color: #8a8c93; border: 1px solid #3a3c42;"
              >
                src/lib/env.ts
              </span>
            </div>
            <div class="mt-4 space-y-3">
              {props.foundation.envSummary.items.map((item) => (
                <div class="rounded-md border border-[#3a3c42] bg-[#1a1b20] p-3">
                  <div class="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <p class="font-medium text-[#f2f0ea]">{item.label}</p>
                      <p class="mt-1 text-xs text-[#8a8c93]">{item.envKey}</p>
                    </div>
                    <span class="rounded px-2 py-0.5 text-xs font-medium" style={statusBadgeStyles[item.status]}>
                      {item.value}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div class="mt-4 flex flex-wrap gap-2">
              {props.foundation.featureFlags.items.map((flag) => (
                <span
                  class="rounded px-2 py-0.5 text-xs font-medium"
                  style={
                    flag.enabled
                      ? 'background: rgba(224,104,24,0.12); color: #e06818; border: 1px solid rgba(224,104,24,0.3);'
                      : 'background: rgba(58,60,66,0.3); color: #8a8c93; border: 1px solid #3a3c42;'
                  }
                >
                  {flag.label}
                </span>
              ))}
            </div>
          </article>
          <article class="rounded-md border border-[#3a3c42] bg-[#26272c] p-4">
            <h3 class="font-semibold text-[#f2f0ea]">Bootstrap, routing, and session</h3>
            <div class="mt-3 grid gap-3 md:grid-cols-2">
              <div class="rounded-md border border-[#3a3c42] bg-[#1a1b20] p-3">
                <p class="text-sm text-[#8a8c93]">Route mode</p>
                <p class="mt-2 font-semibold text-[#f2f0ea]">{props.foundation.routePolicy.mode}</p>
                <p class="mt-1 text-sm text-[#8a8c93]">
                  Deep linking: {props.foundation.routePolicy.supportsDeepLinking ? 'on' : 'off'}
                </p>
              </div>
              <div class="rounded-md border border-[#3a3c42] bg-[#1a1b20] p-3">
                <p class="text-sm text-[#8a8c93]">Session strategy</p>
                <p class="mt-2 font-semibold text-[#f2f0ea]">{props.foundation.session.policy.authStrategy}</p>
                <p class="mt-1 text-sm text-[#8a8c93]">
                  Current state: {props.foundation.session.current.status}
                </p>
              </div>
            </div>
          </article>
          <article class="rounded-md border border-[#3a3c42] bg-[#26272c] p-4">
            <h3 class="font-semibold text-[#f2f0ea]">Persistence, data, and observability</h3>
            <div class="mt-3 grid gap-3 md:grid-cols-2">
              <div class="rounded-md border border-[#3a3c42] bg-[#1a1b20] p-3">
                <p class="text-sm text-[#8a8c93]">Persistence driver</p>
                <p class="mt-2 font-semibold text-[#f2f0ea]">{props.foundation.persistence.policy.driver}</p>
                <p class="mt-1 text-sm text-[#8a8c93]">
                  Schema v{props.foundation.persistence.policy.schemaVersion} with offline-safe writes.
                </p>
              </div>
              <div class="rounded-md border border-[#3a3c42] bg-[#1a1b20] p-3">
                <p class="text-sm text-[#8a8c93]">Observability sinks</p>
                <p class="mt-2 font-semibold text-[#f2f0ea]">{props.foundation.observability.sinks.length}</p>
                <p class="mt-1 text-sm text-[#8a8c93]">
                  {props.foundation.dataBoundary.readySinkCount} ready, rest are vendor placeholders.
                </p>
              </div>
            </div>
          </article>
          <article class="rounded-md border border-[#3a3c42] bg-[#26272c] p-4">
            <h3 class="font-semibold text-[#f2f0ea]">Design and testing seams</h3>
            <div class="mt-3 space-y-3">
              {props.foundation.designSystemRules.slice(0, 3).map((rule) => (
                <div class="rounded-md border border-[#3a3c42] bg-[#1a1b20] p-3">
                  <p class="font-medium text-[#f2f0ea]">{rule.title}</p>
                  <p class="mt-1 text-sm text-[#8a8c93]">{rule.detail}</p>
                </div>
              ))}
            </div>
          </article>
        </div>
      </SectionCard>

      <div class="space-y-6">
        <SectionCard
          eyebrow="Platform status"
          title="Native packaging still needs real targets"
          description="Capacitor and PWA support are wired, but product teams still need to add their platform projects and service contracts."
        >
          <ErrorState
            title="Platform adapters are defined before native projects exist"
            description="Run the Capacitor platform add flows when the product identity is final so Android and iOS delivery can be validated alongside the web build."
          >
            <div class="flex flex-wrap gap-2 text-xs text-[#8a8c93]">
              <span class="rounded px-2 py-0.5 font-mono" style="background: rgba(58,60,66,0.4); color: #8a8c93; border: 1px solid #3a3c42;">
                npx cap add android
              </span>
              <span class="rounded px-2 py-0.5 font-mono" style="background: rgba(58,60,66,0.4); color: #8a8c93; border: 1px solid #3a3c42;">
                npx cap add ios
              </span>
              {props.foundation.platform.capabilities.map((capability) => (
                <span
                  class="rounded px-2 py-0.5 font-medium"
                  style={
                    capability.available
                      ? 'background: rgba(214,169,96,0.12); color: #d6a960; border: 1px solid rgba(214,169,96,0.3);'
                      : 'background: rgba(248,223,102,0.1); color: #f8df66; border: 1px solid rgba(248,223,102,0.3);'
                  }
                >
                  {capability.label}
                </span>
              ))}
            </div>
          </ErrorState>
        </SectionCard>

        <SectionCard
          eyebrow="Operational signal"
          title="Current app-wide signals"
          description="Surface bootstrap notices, adapter counts, and delivery blockers so setup work stays visible during product planning."
        >
          <div class="space-y-4">
            <div class="rounded-md border border-[#3a3c42] bg-[#26272c] p-5">
              <p class="text-sm text-[#8a8c93]">Blocked tasks carried by the reference feature</p>
              <p class="mt-3 text-4xl font-black text-[#a83818]">{props.blockedTaskCount}</p>
              <p class="mt-2 text-sm text-[#8a8c93]">
                {props.foundation.envSummary.missingRequiredKeys.length > 0
                  ? `Missing public config: ${props.foundation.envSummary.missingRequiredKeys.join(', ')}.`
                  : 'Use this area for setup checks, integration warnings, and release-readiness policies.'}
              </p>
            </div>
            <div class="rounded-md border border-[#3a3c42] bg-[#26272c] p-5">
              <p class="text-sm text-[#8a8c93]">Foundation coverage</p>
              <p class="mt-3 text-4xl font-black text-[#e06818]">
                {props.portfolioProjectCount + props.foundation.dataBoundary.adapters.length}
              </p>
              <p class="mt-2 text-sm text-[#8a8c93]">
                Starter projects plus shared adapters currently mapped into the base app shell.
              </p>
            </div>
            <div class="rounded-md border border-[#3a3c42] bg-[#26272c] p-5">
              <p class="text-sm text-[#8a8c93]">App-wide notices</p>
              <p class="mt-3 text-4xl font-black text-[#f8df66]">{props.foundation.feedback.items.length}</p>
              <div class="mt-3 space-y-2 text-sm text-[#8a8c93]">
                {props.foundation.feedback.items.map((item) => (
                  <p>
                    <span class="font-medium text-[#f2f0ea]">{item.title}:</span> {item.message}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </SectionCard>
      </div>
    </div>
  )
}

export default SettingsScreen
