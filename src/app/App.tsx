import { createMemo, createSignal, onCleanup, onMount } from 'solid-js'
import ErrorState from '../components/feedback/ErrorState'
import LoadingState from '../components/feedback/LoadingState'
import AppShell from '../components/shell/AppShell'
import {
  getBlockedTasks,
  onboardingChecklist,
  starterProjects,
  starterTasks,
  summarizeProjectPortfolio,
} from '../features/workbench/workspaceData'
import type { AppFoundationContext } from '../lib/bootstrap'
import { bootstrapApp } from '../lib/bootstrap'
import { subscribeToRouteChanges, syncRouteToHash } from '../lib/navigation'
import type { AppRoute } from './routes'
import { appRoutes, getAppRoute } from './routes'
import HomeScreen from './screens/HomeScreen'
import SettingsScreen from './screens/SettingsScreen'
import WorkspaceScreen from './screens/WorkspaceScreen'

function App() {
  const [activeRoute, setActiveRoute] = createSignal<AppRoute>('home')
  const [foundation, setFoundation] = createSignal<AppFoundationContext | null>(null)
  const [bootStatus, setBootStatus] = createSignal<'loading' | 'ready' | 'error'>('loading')
  const [bootError, setBootError] = createSignal<string | null>(null)

  onMount(() => {
    const cleanupRouteSync = subscribeToRouteChanges((route) => setActiveRoute(route))

    const runBootstrap = async () => {
      setBootStatus('loading')
      setBootError(null)

      const result = await bootstrapApp()
      if (result.status === 'error') {
        setBootStatus('error')
        setBootError(result.message)
        return
      }

      setFoundation(result.context)
      setActiveRoute(result.context.initialRoute)
      setBootStatus('ready')
      syncRouteToHash(result.context.initialRoute)
    }

    void runBootstrap()
    onCleanup(cleanupRouteSync)
  })

  const routeMeta = createMemo(() => getAppRoute(activeRoute()))
  const portfolioSummary = createMemo(() => summarizeProjectPortfolio(starterProjects))
  const blockedTasks = createMemo(() => getBlockedTasks(starterTasks))
  const statusContext = createMemo(() => foundation())

  const handleNavigate = (route: AppRoute) => {
    setActiveRoute(route)
    syncRouteToHash(route)
  }

  const statusContent = (
    <div class="status-stack">
      <article class="rounded-md border border-[#3a3c42] bg-[#26272c] p-4">
        <p class="text-sm text-[#8a8c93]">Current route</p>
        <h3 class="mt-2 text-lg font-semibold text-[#f2f0ea]">{routeMeta().label}</h3>
        <p class="mt-2 text-sm leading-6 text-[#8a8c93]">{routeMeta().description}</p>
      </article>
      <article class="rounded-md border border-[#3a3c42] bg-[#26272c] p-4">
        <p class="text-sm text-[#8a8c93]">Bootstrap boundary</p>
        <div class="mt-3 flex items-end justify-between gap-3">
          <span class="text-3xl font-black text-[#e06818]">{statusContext()?.routePolicy.mode ?? '—'}</span>
          <span class="text-sm text-[#8a8c93]">route policy with back-button support</span>
        </div>
      </article>
      <article class="rounded-md border border-[#3a3c42] bg-[#26272c] p-4">
        <p class="text-sm text-[#8a8c93]">Persistence + session</p>
        <p class="mt-3 text-3xl font-black text-[#d6a960]">{statusContext()?.persistence.policy.driver ?? '—'}</p>
        <p class="mt-2 text-sm text-[#8a8c93]">
          {statusContext()?.session.current.status ?? 'anonymous'} session restored on boot.
        </p>
      </article>
      <article class="rounded-md border border-[#3a3c42] bg-[#26272c] p-4">
        <p class="text-sm text-[#8a8c93]">Runtime config</p>
        <p class="mt-3 text-3xl font-black text-[#d6a960]">
          {statusContext()?.envSummary.configuredRequiredCount ?? 0}/
          {statusContext()?.envSummary.totalRequiredCount ?? 0}
        </p>
        <p class="mt-2 text-sm text-[#8a8c93]">Required public settings configured.</p>
      </article>
      <article class="rounded-md border border-[#3a3c42] bg-[#26272c] p-4">
        <p class="text-sm text-[#8a8c93]">Data + observability</p>
        <p class="mt-3 text-3xl font-black text-[#f8df66]">{statusContext()?.dataBoundary.adapters.length ?? 0}</p>
        <p class="mt-2 text-sm text-[#8a8c93]">
          {statusContext()?.observability.sinks.length ?? 0} sink definitions, {blockedTasks().length} blocked starter tasks.
        </p>
      </article>
      <article class="rounded-md border border-[#3a3c42] bg-[#26272c] p-4">
        <p class="text-sm text-[#8a8c93]">App feedback</p>
        <p class="mt-3 text-3xl font-black text-[#f8df66]">{statusContext()?.feedback.items.length ?? 0}</p>
        <p class="mt-2 text-sm text-[#8a8c93]">Shared notices for startup, config, and release readiness.</p>
      </article>
    </div>
  )

  const renderRoute = () => {
    if (bootStatus() === 'loading') {
      return <LoadingState />
    }

    if (bootStatus() === 'error' || !foundation()) {
      return (
        <ErrorState
          title="App bootstrap failed"
          description={bootError() ?? 'The starter shell could not complete its initialization flow.'}
        >
          <button type="button" class="btn btn-sm btn-primary" onClick={() => window.location.reload()}>
            Reload app
          </button>
        </ErrorState>
      )
    }

    switch (activeRoute()) {
      case 'workspace':
        return (
          <WorkspaceScreen
            projects={starterProjects}
            tasks={starterTasks}
            dataBoundary={foundation()!.dataBoundary}
          />
        )
      case 'settings':
        return (
          <SettingsScreen
            blockedTaskCount={blockedTasks().length}
            foundation={foundation()!}
            portfolioProjectCount={portfolioSummary().total}
          />
        )
      case 'home':
      default:
        return (
          <HomeScreen
            projects={starterProjects}
            summary={portfolioSummary()}
            checklist={onboardingChecklist}
            feedbackCount={foundation()!.feedback.items.length}
            foundationCount={foundation()!.dataBoundary.adapters.length + foundation()!.designSystemRules.length}
            onOpenWorkspace={() => handleNavigate('workspace')}
            onOpenSettings={() => handleNavigate('settings')}
          />
        )
    }
  }

  return (
    <AppShell
      activeRoute={activeRoute()}
      navItems={appRoutes}
      onNavigate={handleNavigate}
      statusContent={statusContent}
    >
      {renderRoute()}
    </AppShell>
  )
}

export default App
