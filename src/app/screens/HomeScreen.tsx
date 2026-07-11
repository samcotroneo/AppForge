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
      {/* Hero section with circuit-board background */}
      <section class="forge-glow relative overflow-hidden rounded-lg border border-[#3a3c42] shadow-xl">
        <div
          class="absolute inset-0 opacity-30"
          style="background-image: url('/appforge_background.png'); background-size: cover; background-position: center;"
          aria-hidden="true"
        />
        <div class="absolute inset-0 bg-gradient-to-br from-[#111116]/80 via-[#1a1b20]/60 to-[#111116]/80" aria-hidden="true" />
        <div class="relative p-6 sm:p-8">
          <div class="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div class="max-w-3xl space-y-4">
              <div class="flex items-center gap-3">
                <img src="/appforge_emblem.png" alt="" class="h-14 w-14 drop-shadow-xl" aria-hidden="true" />
                <span
                  class="rounded px-2 py-0.5 text-xs font-semibold uppercase tracking-[0.25em]"
                  style="background: rgba(224,104,24,0.15); color: #e06818; border: 1px solid rgba(224,104,24,0.3);"
                >
                  Sample app
                </span>
              </div>
              <h1 class="text-4xl font-black tracking-tight text-[#f2f0ea] sm:text-5xl">
                Explore the AppForge starter structure with example routes, sample data, and replaceable scaffolding.
              </h1>
              <p class="section-copy text-base text-[#8a8c93]">
                This sample app demonstrates how an AppForge project can be organized: an overview
                route, an example feature slice, and starter setup surfaces that are meant to be
                replaced by your own product logic.
              </p>
            </div>
            <div class="flex flex-wrap gap-3">
              <button
                type="button"
                class="btn rounded-md border-0 px-5 py-2.5 font-bold transition hover:opacity-90"
                style="background: #e06818; color: #f2f0ea;"
                onClick={props.onOpenWorkspace}
              >
                View example workspace
              </button>
              <button
                type="button"
                class="btn rounded-md px-5 py-2.5 font-semibold transition hover:opacity-90"
                style="background: rgba(255,255,255,0.06); color: #f2f0ea; border: 1px solid #3a3c42;"
                onClick={props.onOpenSettings}
              >
                Inspect starter setup
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Metric cards */}
      <section class="metric-grid">
        <article class="rounded-lg border border-[#3a3c42] bg-[#1a1b20] p-5 shadow-md">
          <p class="text-sm text-[#8a8c93]">Example slices</p>
          <p class="mt-3 text-3xl font-black text-[#e06818]">{props.summary.active}</p>
          <p class="mt-2 text-sm text-[#8a8c93]">Starter examples you can swap for real feature areas.</p>
        </article>
        <article class="rounded-lg border border-[#3a3c42] bg-[#1a1b20] p-5 shadow-md">
          <p class="text-sm text-[#8a8c93]">Sample concepts</p>
          <p class="mt-3 text-3xl font-black text-[#d6a960]">{props.summary.draft}</p>
          <p class="mt-2 text-sm text-[#8a8c93]">Placeholder examples for work that is still taking shape.</p>
        </article>
        <article class="rounded-lg border border-[#3a3c42] bg-[#1a1b20] p-5 shadow-md">
          <p class="text-sm text-[#8a8c93]">Example blockers</p>
          <p class="mt-3 text-3xl font-black text-[#a83818]">{props.summary.blocked}</p>
          <p class="mt-2 text-sm text-[#8a8c93]">Sample blockers that demonstrate how dependency states can surface.</p>
        </article>
        <article class="rounded-lg border border-[#3a3c42] bg-[#1a1b20] p-5 shadow-md">
          <p class="text-sm text-[#8a8c93]">Shared foundations</p>
          <p class="mt-3 text-3xl font-black text-[#f8df66]">{props.foundationCount}</p>
          <p class="mt-2 text-sm text-[#8a8c93]">
            Starter bootstrap, data, feedback, and design seams ready to adapt.
          </p>
        </article>
        <article class="rounded-lg border border-[#3a3c42] bg-[#1a1b20] p-5 shadow-md">
          <p class="text-sm text-[#8a8c93]">Sample notices</p>
          <p class="mt-3 text-3xl font-black text-[#f8df66]">{props.feedbackCount}</p>
          <p class="mt-2 text-sm text-[#8a8c93]">Example startup and configuration cues outside feature routes.</p>
        </article>
      </section>

      <div class="app-grid">
        <SectionCard
          eyebrow="Example content"
          title="Sample projects included with the starter"
          description="These are illustrative entries to show card layout, status handling, and summary copy. Replace or remove them when your app takes shape."
        >
          <div class="space-y-3">
            <For each={recentProjects()}>
              {(project) => (
                <article class="rounded-md border border-[#3a3c42] bg-[#26272c] p-4">
                  <div class="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <h3 class="font-semibold text-[#f2f0ea]">{project.name}</h3>
                      <p class="mt-1 text-sm text-[#8a8c93]">{project.owner}</p>
                    </div>
                    <span
                      class="rounded px-2 py-0.5 text-xs font-medium"
                      style="background: rgba(214,169,96,0.1); color: #d6a960; border: 1px solid rgba(214,169,96,0.25);"
                    >
                      {project.status}
                    </span>
                  </div>
                  <p class="mt-3 text-sm leading-7 text-[#8a8c93]">{project.nextStep}</p>
                </article>
              )}
            </For>
          </div>
        </SectionCard>

        <SectionCard
          eyebrow="Starter checklist"
          title="Replace these sample placeholders first"
          description="Use this checklist as example starter content that points developers toward the first real integration steps."
        >
          <div class="space-y-3">
            <For each={props.checklist}>
              {(item) => (
                <label class="flex cursor-default items-start gap-3 rounded-md border border-[#3a3c42] bg-[#26272c] p-4">
                  <input checked type="checkbox" class="checkbox mt-1" style="accent-color: #e06818;" />
                  <span>
                    <span class="font-medium text-[#f2f0ea]">{item.title}</span>
                    <span class="mt-1 block text-sm text-[#8a8c93]">{item.detail}</span>
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
