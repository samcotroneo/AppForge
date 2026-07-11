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
      <section class="space-y-4 rounded-box border border-base-300 bg-base-100 p-5 shadow-md">
        <div class="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p class="text-xs font-semibold uppercase tracking-[0.3em] text-primary/80">Reference feature</p>
            <h3 class="mt-2 text-xl font-bold">Project workspace</h3>
          </div>
          <div class="join join-horizontal flex-wrap">
            <For each={filters}>
              {(candidate) => (
                <button
                  type="button"
                  class={`btn btn-sm join-item ${filter() === candidate ? 'btn-primary' : 'btn-ghost'}`}
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
                class={`w-full rounded-box border p-4 text-left transition ${
                  selectedProjectId() === project.id
                    ? 'border-primary bg-primary/10 shadow-sm'
                    : 'border-base-300 bg-base-200/70 hover:border-primary/40 hover:bg-base-200'
                }`}
                onClick={() => setSelectedProjectId(project.id)}
              >
                <div class="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h4 class="font-semibold">{project.name}</h4>
                    <p class="mt-1 text-sm text-base-content/70">{project.owner}</p>
                  </div>
                  <div class={`badge ${project.status === 'blocked' ? 'badge-error' : project.status === 'draft' ? 'badge-warning' : 'badge-success'}`}>
                    {project.status}
                  </div>
                </div>
                <p class="mt-3 text-sm leading-7 text-base-content/75">{project.summary}</p>
                <div class="mt-4 flex items-center justify-between gap-3 text-sm text-base-content/70">
                  <span>Readiness {project.readiness}%</span>
                  <span>{new Date(project.updatedAt).toLocaleDateString()}</span>
                </div>
                <progress class="progress progress-primary mt-3 w-full" value={project.readiness} max="100" />
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
        <section class="rounded-box border border-base-300 bg-base-100 p-5 shadow-md">
          {selectedProject() ? (
            <>
              <div class="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p class="text-xs font-semibold uppercase tracking-[0.3em] text-primary/80">Selected project</p>
                  <h3 class="mt-2 text-2xl font-bold">{selectedProject()!.name}</h3>
                </div>
                <div class="badge badge-outline badge-lg">{selectedProject()!.owner}</div>
              </div>
              <p class="section-copy mt-4">{selectedProject()!.nextStep}</p>

              <div class="mt-6 space-y-3">
                <For each={selectedTasks()}>
                  {(task) => (
                    <article class="rounded-box border border-base-300 bg-base-200/70 p-4">
                      <div class="flex flex-wrap items-center justify-between gap-3">
                        <h4 class="font-semibold">{task.title}</h4>
                        <div class={`badge badge-outline ${task.state === 'blocked' ? 'badge-error' : task.state === 'in-progress' ? 'badge-info' : 'badge-success'}`}>
                          {task.state}
                        </div>
                      </div>
                      <div class="mt-3 flex flex-wrap gap-2 text-sm text-base-content/70">
                        <span class="badge badge-ghost">{task.lane}</span>
                        <span class="badge badge-ghost">{task.priority} priority</span>
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

        <section class="rounded-box border border-base-300 bg-base-100 p-5 shadow-md">
          <p class="text-xs font-semibold uppercase tracking-[0.3em] text-primary/80">Data boundary</p>
          <h3 class="mt-2 text-xl font-bold">Connected data sources</h3>
          <div class="mt-4 space-y-3">
            <For each={props.dataBoundary.adapters}>
              {(adapter) => (
                <article class="rounded-box border border-base-300 bg-base-200/70 p-4">
                  <div class="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <h4 class="font-semibold">{adapter.label}</h4>
                      <p class="mt-1 text-sm text-base-content/70">{adapter.description}</p>
                    </div>
                    <div
                      class={`badge badge-outline ${
                        adapter.status === 'ready' ? 'badge-success' : 'badge-warning'
                      }`}
                    >
                      {adapter.status}
                    </div>
                  </div>
                  <div class="mt-3 flex flex-wrap gap-2 text-sm text-base-content/70">
                    <span class="badge badge-ghost">{adapter.kind}</span>
                    <span class="badge badge-ghost">
                      {props.dataBoundary.requestPolicy.status === 'configured'
                        ? 'request policy configured'
                        : 'starter request policy'}
                    </span>
                    <span class="badge badge-ghost">{props.dataBoundary.persistenceDriver} persistence</span>
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
