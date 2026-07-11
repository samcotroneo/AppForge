import { For } from 'solid-js'
import type { JSX } from 'solid-js'
import type { AppRoute, AppRouteDefinition } from '../../app/routes'

type AppShellProps = {
  activeRoute: AppRoute
  navItems: AppRouteDefinition[]
  onNavigate: (route: AppRoute) => void
  statusContent: JSX.Element
  children: JSX.Element
}

function AppShell(props: AppShellProps) {
  return (
    <div class="app-shell">
      <header class="navbar rounded-box border border-base-300 bg-base-100 shadow-sm">
        <div class="flex-1 px-2">
          <div>
            <p class="text-xs uppercase tracking-[0.3em] text-primary">AppForge</p>
            <h1 class="text-lg font-bold">Production starter shell</h1>
            <p class="mt-1 text-sm text-base-content/70">Real routes, starter states, and space for app-level signals.</p>
          </div>
        </div>
        <div class="flex flex-wrap gap-2 px-2">
          <div class="badge badge-outline">SolidJS</div>
          <div class="badge badge-outline">Capacitor</div>
          <div class="badge badge-primary badge-outline">PWA ready</div>
        </div>
      </header>

      <div class="shell-grid">
        <aside class="space-y-4 rounded-box border border-base-300 bg-base-100 p-4 shadow-md">
          <div>
            <p class="text-xs font-semibold uppercase tracking-[0.3em] text-primary/80">Navigation</p>
            <h2 class="mt-2 text-lg font-bold">Starter routes</h2>
          </div>
          <nav class="space-y-2">
            <For each={props.navItems}>
              {(item) => (
                <button
                  type="button"
                  class={`w-full rounded-box border p-4 text-left transition ${
                    props.activeRoute === item.id
                      ? 'border-primary bg-primary/10 shadow-sm'
                      : 'border-base-300 bg-base-200/60 hover:border-primary/30 hover:bg-base-200'
                  }`}
                  onClick={() => props.onNavigate(item.id)}
                >
                  <div class="font-semibold">{item.label}</div>
                  <p class="mt-2 text-sm leading-6 text-base-content/70">{item.description}</p>
                </button>
              )}
            </For>
          </nav>
        </aside>

        <main class="min-w-0 space-y-6">{props.children}</main>

        <aside class="space-y-4 rounded-box border border-base-300 bg-base-100 p-4 shadow-md">
          <div>
            <p class="text-xs font-semibold uppercase tracking-[0.3em] text-primary/80">App status</p>
            <h2 class="mt-2 text-lg font-bold">Shared signals</h2>
            <p class="mt-2 text-sm leading-6 text-base-content/70">
              Keep setup checks, delivery cues, and app-wide notifications out of route components.
            </p>
          </div>
          {props.statusContent}
        </aside>
      </div>
    </div>
  )
}

export default AppShell
