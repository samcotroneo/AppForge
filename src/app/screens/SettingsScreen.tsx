import ErrorState from '../../components/feedback/ErrorState'
import SectionCard from '../../components/ui/SectionCard'
import type { AppFoundationContext } from '../../lib/bootstrap'
import type { EnvStatus } from '../../lib/env'

type SettingsScreenProps = {
  blockedTaskCount: number
  foundation: AppFoundationContext
  portfolioProjectCount: number
}

const statusBadgeClassNames: Record<EnvStatus, string> = {
  configured: 'badge-success',
  missing: 'badge-error',
  enabled: 'badge-primary',
  disabled: 'badge-ghost',
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
          <article class="rounded-box border border-base-300 bg-base-200/70 p-4">
            <h3 class="font-semibold">Runtime configuration</h3>
            <div class="mt-3 flex flex-wrap items-end justify-between gap-3">
              <div>
                <p class="text-3xl font-black text-primary">
                  {props.foundation.envSummary.configuredRequiredCount}/
                  {props.foundation.envSummary.totalRequiredCount}
                </p>
                <p class="mt-1 text-sm text-base-content/75">
                  Required public settings configured for live service wiring.
                </p>
              </div>
              <div class="badge badge-outline">src/lib/env.ts</div>
            </div>
            <div class="mt-4 space-y-3">
              {props.foundation.envSummary.items.map((item) => (
                <div class="rounded-box border border-base-300 bg-base-100/80 p-3">
                  <div class="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <p class="font-medium">{item.label}</p>
                      <p class="mt-1 text-xs text-base-content/60">{item.envKey}</p>
                    </div>
                    <span class={`badge badge-outline ${statusBadgeClassNames[item.status]}`}>
                      {item.value}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div class="mt-4 flex flex-wrap gap-2">
              {props.foundation.featureFlags.items.map((flag) => (
                <span class={`badge badge-outline ${flag.enabled ? 'badge-primary' : 'badge-ghost'}`}>
                  {flag.label}
                </span>
              ))}
            </div>
          </article>
          <article class="rounded-box border border-base-300 bg-base-200/70 p-4">
            <h3 class="font-semibold">Bootstrap, routing, and session</h3>
            <div class="mt-3 grid gap-3 md:grid-cols-2">
              <div class="rounded-box border border-base-300 bg-base-100/80 p-3">
                <p class="text-sm text-base-content/70">Route mode</p>
                <p class="mt-2 font-semibold">{props.foundation.routePolicy.mode}</p>
                <p class="mt-1 text-sm text-base-content/75">
                  Deep linking: {props.foundation.routePolicy.supportsDeepLinking ? 'on' : 'off'}
                </p>
              </div>
              <div class="rounded-box border border-base-300 bg-base-100/80 p-3">
                <p class="text-sm text-base-content/70">Session strategy</p>
                <p class="mt-2 font-semibold">{props.foundation.session.policy.authStrategy}</p>
                <p class="mt-1 text-sm text-base-content/75">
                  Current state: {props.foundation.session.current.status}
                </p>
              </div>
            </div>
          </article>
          <article class="rounded-box border border-base-300 bg-base-200/70 p-4">
            <h3 class="font-semibold">Persistence, data, and observability</h3>
            <div class="mt-3 grid gap-3 md:grid-cols-2">
              <div class="rounded-box border border-base-300 bg-base-100/80 p-3">
                <p class="text-sm text-base-content/70">Persistence driver</p>
                <p class="mt-2 font-semibold">{props.foundation.persistence.policy.driver}</p>
                <p class="mt-1 text-sm text-base-content/75">
                  Schema v{props.foundation.persistence.policy.schemaVersion} with offline-safe writes.
                </p>
              </div>
              <div class="rounded-box border border-base-300 bg-base-100/80 p-3">
                <p class="text-sm text-base-content/70">Observability sinks</p>
                <p class="mt-2 font-semibold">{props.foundation.observability.sinks.length}</p>
                <p class="mt-1 text-sm text-base-content/75">
                  {props.foundation.dataBoundary.readySinkCount} ready, rest are vendor placeholders.
                </p>
              </div>
            </div>
          </article>
          <article class="rounded-box border border-base-300 bg-base-200/70 p-4">
            <h3 class="font-semibold">Design and testing seams</h3>
            <div class="mt-3 space-y-3">
              {props.foundation.designSystemRules.slice(0, 3).map((rule) => (
                <div class="rounded-box border border-base-300 bg-base-100/80 p-3">
                  <p class="font-medium">{rule.title}</p>
                  <p class="mt-1 text-sm text-base-content/75">{rule.detail}</p>
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
            <div class="flex flex-wrap gap-2 text-xs text-base-content/75">
              <span class="badge badge-outline">npx cap add android</span>
              <span class="badge badge-outline">npx cap add ios</span>
              {props.foundation.platform.capabilities.map((capability) => (
                <span
                  class={`badge badge-outline ${
                    capability.available ? 'badge-success' : 'badge-warning'
                  }`}
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
            <div class="rounded-box border border-base-300 bg-base-200/70 p-5">
              <p class="text-sm text-base-content/70">Blocked tasks carried by the reference feature</p>
              <p class="mt-3 text-4xl font-black text-error">{props.blockedTaskCount}</p>
              <p class="mt-2 text-sm text-base-content/75">
                {props.foundation.envSummary.missingRequiredKeys.length > 0
                  ? `Missing public config: ${props.foundation.envSummary.missingRequiredKeys.join(', ')}.`
                  : 'Use this area for setup checks, integration warnings, and release-readiness policies.'}
              </p>
            </div>
            <div class="rounded-box border border-base-300 bg-base-200/70 p-5">
              <p class="text-sm text-base-content/70">Foundation coverage</p>
              <p class="mt-3 text-4xl font-black text-primary">
                {props.portfolioProjectCount + props.foundation.dataBoundary.adapters.length}
              </p>
              <p class="mt-2 text-sm text-base-content/75">
                Starter projects plus shared adapters currently mapped into the base app shell.
              </p>
            </div>
            <div class="rounded-box border border-base-300 bg-base-200/70 p-5">
              <p class="text-sm text-base-content/70">App-wide notices</p>
              <p class="mt-3 text-4xl font-black text-warning">{props.foundation.feedback.items.length}</p>
              <div class="mt-3 space-y-2 text-sm text-base-content/75">
                {props.foundation.feedback.items.map((item) => (
                  <p>
                    <span class="font-medium">{item.title}:</span> {item.message}
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
