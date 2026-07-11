import { For } from 'solid-js'
import SectionCard from '../../components/ui/SectionCard'
import type { OnboardingItem, PortfolioSummary, WorkspaceProject } from '../../features/workbench/workspaceData'
import { getRecentProjects } from '../../features/workbench/workspaceData'

type HomeScreenProps = {
  projects: WorkspaceProject[]
  summary: PortfolioSummary
  checklist: OnboardingItem[]
  feedbackCount: number
  foundationCount: number
  onOpenWorkspace: () => void
  onOpenSettings: () => void
}

function HomeScreen(props: HomeScreenProps) {
  const recentProjects = () => getRecentProjects(props.projects)

  return (
    <div class="space-y-6">
      <section class="rounded-box border border-base-300 bg-base-100 p-6 shadow-xl sm:p-8">
        <div class="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div class="max-w-3xl space-y-4">
            <div class="badge badge-primary badge-outline">Working starter shell</div>
            <h1 class="text-4xl font-black tracking-tight sm:text-5xl">
              Ship a real first slice instead of starting from a template landing page.
            </h1>
            <p class="section-copy text-base">
              This shell is designed to hold routes, shared states, and feature slices from day one: a
              dashboard, a reference workspace, and settings that surface delivery gaps early.
            </p>
          </div>
          <div class="flex flex-wrap gap-3">
            <button type="button" class="btn btn-primary" onClick={props.onOpenWorkspace}>
              Open workspace
            </button>
            <button type="button" class="btn btn-ghost" onClick={props.onOpenSettings}>
              Review setup
            </button>
          </div>
        </div>
      </section>

      <section class="metric-grid">
        <article class="rounded-box border border-base-300 bg-base-100 p-5 shadow-md">
          <p class="text-sm text-base-content/70">Active slices</p>
          <p class="mt-3 text-3xl font-black text-primary">{props.summary.active}</p>
          <p class="mt-2 text-sm text-base-content/75">Work ready for implementation and integration.</p>
        </article>
        <article class="rounded-box border border-base-300 bg-base-100 p-5 shadow-md">
          <p class="text-sm text-base-content/70">Draft ideas</p>
          <p class="mt-3 text-3xl font-black text-secondary">{props.summary.draft}</p>
          <p class="mt-2 text-sm text-base-content/75">Candidate product bets still shaping their contracts.</p>
        </article>
        <article class="rounded-box border border-base-300 bg-base-100 p-5 shadow-md">
          <p class="text-sm text-base-content/70">Blocked items</p>
          <p class="mt-3 text-3xl font-black text-error">{props.summary.blocked}</p>
          <p class="mt-2 text-sm text-base-content/75">Dependencies worth exposing early in the starter shell.</p>
        </article>
        <article class="rounded-box border border-base-300 bg-base-100 p-5 shadow-md">
          <p class="text-sm text-base-content/70">Shared foundations</p>
          <p class="mt-3 text-3xl font-black text-accent">{props.foundationCount}</p>
          <p class="mt-2 text-sm text-base-content/75">
            Bootstrap, data, feedback, and design contracts ready for downstream apps.
          </p>
        </article>
        <article class="rounded-box border border-base-300 bg-base-100 p-5 shadow-md">
          <p class="text-sm text-base-content/70">App-wide notices</p>
          <p class="mt-3 text-3xl font-black text-warning">{props.feedbackCount}</p>
          <p class="mt-2 text-sm text-base-content/75">Startup and configuration cues stay visible outside feature routes.</p>
        </article>
      </section>

      <div class="app-grid">
        <SectionCard
          eyebrow="Recent items"
          title="Projects updated most recently"
          description="Recent activity belongs near the dashboard so every product that forks this starter inherits useful momentum cues."
        >
          <div class="space-y-3">
            <For each={recentProjects()}>
              {(project) => (
                <article class="rounded-box border border-base-300 bg-base-200/70 p-4">
                  <div class="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <h3 class="font-semibold">{project.name}</h3>
                      <p class="mt-1 text-sm text-base-content/70">{project.owner}</p>
                    </div>
                    <div class="badge badge-outline">{project.status}</div>
                  </div>
                  <p class="mt-3 text-sm leading-7 text-base-content/75">{project.nextStep}</p>
                </article>
              )}
            </For>
          </div>
        </SectionCard>

        <SectionCard
          eyebrow="Onboarding cue"
          title="Replace the placeholders in this order"
          description="The starter should make the first production steps obvious, especially before native packaging or service integration begins."
        >
          <div class="space-y-3">
            <For each={props.checklist}>
              {(item) => (
                <label class="label cursor-default items-start gap-3 rounded-box border border-base-300 bg-base-200 p-4">
                  <input checked type="checkbox" class="checkbox checkbox-primary mt-1" />
                  <span>
                    <span class="font-medium">{item.title}</span>
                    <span class="mt-1 block text-sm text-base-content/75">{item.detail}</span>
                  </span>
                </label>
              )}
            </For>
          </div>
        </SectionCard>
      </div>
    </div>
  )
}

export default HomeScreen
