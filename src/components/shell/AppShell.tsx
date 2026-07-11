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
      <header
        class="forge-glow relative overflow-hidden rounded-lg border border-[#3a3c42] bg-[#1a1b20] shadow-lg"
        style="border-color: #3a3c42"
      >
        <div
          class="absolute inset-0 opacity-20"
          style="background-image: url('/appforge_background.png'); background-size: cover; background-position: center top;"
          aria-hidden="true"
        />
        <div class="relative flex flex-wrap items-center gap-4 px-4 py-3 sm:px-6">
          <img
            src="/appforge_emblem.png"
            alt="AppForge emblem"
            class="h-12 w-12 flex-shrink-0 drop-shadow-lg"
          />
          <div class="min-w-0 flex-1">
            <p class="text-xs font-semibold uppercase tracking-[0.3em] text-[#d6a960]">
              AppForge
            </p>
            <h1 class="text-lg font-bold text-[#f2f0ea]">Production starter shell</h1>
            <p class="mt-0.5 text-sm text-[#8a8c93]">
              Real routes, starter states, and space for app-level signals.
            </p>
          </div>
          <div class="flex flex-wrap gap-2">
            <div class="badge badge-outline border-[#3a3c42] text-[#8a8c93]">SolidJS</div>
            <div class="badge badge-outline border-[#3a3c42] text-[#8a8c93]">Capacitor</div>
            <div class="badge border-[#e06818] bg-[#e06818]/10 text-[#e06818]">PWA ready</div>
          </div>
        </div>
      </header>

      <div class="shell-grid">
        <aside class="space-y-4 rounded-lg border border-[#3a3c42] bg-[#1a1b20] p-4 shadow-md">
          <div>
            <p class="text-xs font-semibold uppercase tracking-[0.3em] text-[#d6a960]">
              Navigation
            </p>
            <h2 class="mt-2 text-lg font-bold text-[#f2f0ea]">Starter routes</h2>
          </div>
          <nav class="space-y-2">
            <For each={props.navItems}>
              {(item) => (
                <button
                  type="button"
                  class={`w-full rounded-md border p-4 text-left transition ${
                    props.activeRoute === item.id
                      ? 'border-[#e06818] bg-[#e06818]/10 shadow-sm'
                      : 'border-[#3a3c42] bg-[#26272c] hover:border-[#e06818]/40 hover:bg-[#26272c]/80'
                  }`}
                  onClick={() => props.onNavigate(item.id)}
                >
                  <div
                    class={`font-semibold ${props.activeRoute === item.id ? 'text-[#e06818]' : 'text-[#f2f0ea]'}`}
                  >
                    {item.label}
                  </div>
                  <p class="mt-2 text-sm leading-6 text-[#8a8c93]">{item.description}</p>
                </button>
              )}
            </For>
          </nav>
        </aside>

        <main class="min-w-0 space-y-6">{props.children}</main>

        <aside class="space-y-4 rounded-lg border border-[#3a3c42] bg-[#1a1b20] p-4 shadow-md">
          <div>
            <p class="text-xs font-semibold uppercase tracking-[0.3em] text-[#d6a960]">
              App status
            </p>
            <h2 class="mt-2 text-lg font-bold text-[#f2f0ea]">Shared signals</h2>
            <p class="mt-2 text-sm leading-6 text-[#8a8c93]">
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
