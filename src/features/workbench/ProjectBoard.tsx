import { For, createEffect, createMemo, createSignal } from 'solid-js'
import EmptyState from '../../components/feedback/EmptyState'
import type { AppDataBoundary } from '../../lib/data'
import type {
  WorkspaceProject,
  WorkspaceProjectFilter,
  WorkspaceTask,
} from './workspaceData'
import { filterProjectsByStatus, getTasksForProject } from './workspaceData'

type ProjectBoardProps = {
  projects: WorkspaceProject[]
  tasks: WorkspaceTask[]
  dataBoundary: AppDataBoundary
}

const filters: WorkspaceProjectFilter[] = ['all', 'active', 'draft', 'blocked']

const statusBadgeStyle = (status: string) => {
  if (status === 'blocked') return 'background: rgba(168,56,24,0.15); color: #a83818; border: 1px solid rgba(168,56,24,0.3);'
  if (status === 'draft') return 'background: rgba(248,223,102,0.1); color: #f8df66; border: 1px solid rgba(248,223,102,0.3);'
  return 'background: rgba(214,169,96,0.12); color: #d6a960; border: 1px solid rgba(214,169,96,0.3);'
}

const taskStateBadgeStyle = (state: string) => {
  if (state === 'blocked') return 'background: rgba(168,56,24,0.15); color: #a83818; border: 1px solid rgba(168,56,24,0.3);'
  if (state === 'in-progress') return 'background: rgba(224,104,24,0.12); color: #e06818; border: 1px solid rgba(224,104,24,0.3);'
  return 'background: rgba(214,169,96,0.12); color: #d6a960; border: 1px solid rgba(214,169,96,0.3);'
}

function ProjectBoard(props: ProjectBoardProps) {
  const [filter, setFilter] = createSignal<WorkspaceProjectFilter>('all')
  const [selectedProjectId, setSelectedProjectId] = createSignal(props.projects[0]?.id ?? '')

  const visibleProjects = createMemo(() => filterProjectsByStatus(props.projects, filter()))

  createEffect(() => {
    const firstVisibleProject = visibleProjects()[0]
    if (!visibleProjects().some((project) => project.id === selectedProjectId())) {
      setSelectedProjectId(firstVisibleProject?.id ?? '')
    }
  })

  const selectedProject = createMemo(
    () => visibleProjects().find((project) => project.id === selectedProjectId()) ?? null,
  )

  const selectedTasks = createMemo(() => getTasksForProject(props.tasks, selectedProject()?.id ?? ''))

  return (
    <div class="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
      <section class="space-y-4 rounded-lg border border-[#3a3c42] bg-[#1a1b20] p-5 shadow-md">
        <div class="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p class="text-xs font-semibold uppercase tracking-[0.3em] text-[#d6a960]">Reference feature</p>
            <h3 class="mt-2 text-xl font-bold text-[#f2f0ea]">Project workspace</h3>
          </div>
          <div class="flex flex-wrap gap-1">
            <For each={filters}>
              {(candidate) => (
                <button
                  type="button"
                  class="rounded px-3 py-1.5 text-sm font-medium transition"
                  style={
                    filter() === candidate
                      ? 'background: rgba(224,104,24,0.15); color: #e06818; border: 1px solid rgba(224,104,24,0.4);'
                      : 'background: transparent; color: #8a8c93; border: 1px solid #3a3c42;'
                  }
                  onClick={() => setFilter(candidate)}
                >
                  {candidate === 'all' ? 'All' : candidate}
                </button>
              )}
            </For>
          </div>
        </div>

        <div class="space-y-3">
          <For each={visibleProjects()}>
            {(project) => (
              <button
                type="button"
                class={`w-full rounded-md border p-4 text-left transition ${
                  selectedProjectId() === project.id
                    ? 'border-[#e06818] bg-[#e06818]/10 shadow-sm'
                    : 'border-[#3a3c42] bg-[#26272c] hover:border-[#e06818]/40'
                }`}
                onClick={() => setSelectedProjectId(project.id)}
              >
                <div class="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h4 class="font-semibold text-[#f2f0ea]">{project.name}</h4>
                    <p class="mt-1 text-sm text-[#8a8c93]">{project.owner}</p>
                  </div>
                  <span class="rounded px-2 py-0.5 text-xs font-medium" style={statusBadgeStyle(project.status)}>
                    {project.status}
                  </span>
                </div>
                <p class="mt-3 text-sm leading-7 text-[#8a8c93]">{project.summary}</p>
                <div class="mt-4 flex items-center justify-between gap-3 text-sm text-[#8a8c93]">
                  <span>Readiness {project.readiness}%</span>
                  <span>{new Date(project.updatedAt).toLocaleDateString()}</span>
                </div>
                <div class="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-[#3a3c42]">
                  <div
                    class="h-full rounded-full transition-all"
                    style={`width: ${project.readiness}%; background: #e06818;`}
                  />
                </div>
              </button>
            )}
          </For>
        </div>

        {visibleProjects().length === 0 ? (
          <EmptyState
            title="No projects match this workflow view"
            description="Use this section for filtered lists, saved views, and team-specific queues without changing the route shell."
          />
        ) : null}
      </section>

      <div class="space-y-6">
        <section class="rounded-lg border border-[#3a3c42] bg-[#1a1b20] p-5 shadow-md">
          {selectedProject() ? (
            <>
              <div class="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p class="text-xs font-semibold uppercase tracking-[0.3em] text-[#d6a960]">Selected project</p>
                  <h3 class="mt-2 text-2xl font-bold text-[#f2f0ea]">{selectedProject()!.name}</h3>
                </div>
                <span
                  class="rounded px-2 py-0.5 text-sm font-medium"
                  style="background: rgba(58,60,66,0.4); color: #8a8c93; border: 1px solid #3a3c42;"
                >
                  {selectedProject()!.owner}
                </span>
              </div>
              <p class="section-copy mt-4 text-[#8a8c93]">{selectedProject()!.nextStep}</p>

              <div class="mt-6 space-y-3">
                <For each={selectedTasks()}>
                  {(task) => (
                    <article class="rounded-md border border-[#3a3c42] bg-[#26272c] p-4">
                      <div class="flex flex-wrap items-center justify-between gap-3">
                        <h4 class="font-semibold text-[#f2f0ea]">{task.title}</h4>
                        <span class="rounded px-2 py-0.5 text-xs font-medium" style={taskStateBadgeStyle(task.state)}>
                          {task.state}
                        </span>
                      </div>
                      <div class="mt-3 flex flex-wrap gap-2 text-sm">
                        <span
                          class="rounded px-2 py-0.5 text-xs"
                          style="background: rgba(58,60,66,0.4); color: #8a8c93; border: 1px solid #3a3c42;"
                        >
                          {task.lane}
                        </span>
                        <span
                          class="rounded px-2 py-0.5 text-xs"
                          style="background: rgba(58,60,66,0.4); color: #8a8c93; border: 1px solid #3a3c42;"
                        >
                          {task.priority} priority
                        </span>
                      </div>
                    </article>
                  )}
                </For>
              </div>
            </>
          ) : (
            <EmptyState
              title="Select a project to inspect the slice"
              description="A starter should make room for project detail panels, modal entry points, and status-driven workflows."
            />
          )}
        </section>

        <section class="rounded-lg border border-[#3a3c42] bg-[#1a1b20] p-5 shadow-md">
          <p class="text-xs font-semibold uppercase tracking-[0.3em] text-[#d6a960]">Data boundary</p>
          <h3 class="mt-2 text-xl font-bold text-[#f2f0ea]">Connected data sources</h3>
          <div class="mt-4 space-y-3">
            <For each={props.dataBoundary.adapters}>
              {(adapter) => (
                <article class="rounded-md border border-[#3a3c42] bg-[#26272c] p-4">
                  <div class="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <h4 class="font-semibold text-[#f2f0ea]">{adapter.label}</h4>
                      <p class="mt-1 text-sm text-[#8a8c93]">{adapter.description}</p>
                    </div>
                    <span
                      class="rounded px-2 py-0.5 text-xs font-medium"
                      style={
                        adapter.status === 'ready'
                          ? 'background: rgba(214,169,96,0.12); color: #d6a960; border: 1px solid rgba(214,169,96,0.3);'
                          : 'background: rgba(248,223,102,0.1); color: #f8df66; border: 1px solid rgba(248,223,102,0.3);'
                      }
                    >
                      {adapter.status}
                    </span>
                  </div>
                  <div class="mt-3 flex flex-wrap gap-2 text-sm">
                    <span
                      class="rounded px-2 py-0.5 text-xs"
                      style="background: rgba(58,60,66,0.4); color: #8a8c93; border: 1px solid #3a3c42;"
                    >
                      {adapter.kind}
                    </span>
                    <span
                      class="rounded px-2 py-0.5 text-xs"
                      style="background: rgba(58,60,66,0.4); color: #8a8c93; border: 1px solid #3a3c42;"
                    >
                      {props.dataBoundary.requestPolicy.status === 'configured'
                        ? 'request policy configured'
                        : 'starter request policy'}
                    </span>
                    <span
                      class="rounded px-2 py-0.5 text-xs"
                      style="background: rgba(58,60,66,0.4); color: #8a8c93; border: 1px solid #3a3c42;"
                    >
                      {props.dataBoundary.persistenceDriver} persistence
                    </span>
                  </div>
                </article>
              )}
            </For>
          </div>
          <div class="mt-4">
            <EmptyState
              title="Adapters are defined before product services exist"
              description="Use these seams for real API clients, repositories, and sync orchestration instead of wiring transport logic directly into feature views."
            />
          </div>
        </section>
      </div>
    </div>
  )
}

export default ProjectBoard
