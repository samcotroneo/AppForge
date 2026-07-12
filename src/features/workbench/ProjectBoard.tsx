import { useEffect, useMemo, useState } from 'react'
import { Card } from 'konsta/react'
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

const statusColor = (status: string) => {
  if (status === 'blocked') return { background: 'rgba(168,56,24,0.15)', color: '#a83818', border: '1px solid rgba(168,56,24,0.3)' }
  if (status === 'draft') return { background: 'rgba(248,223,102,0.1)', color: '#f8df66', border: '1px solid rgba(248,223,102,0.3)' }
  return { background: 'rgba(214,169,96,0.12)', color: '#d6a960', border: '1px solid rgba(214,169,96,0.3)' }
}

const taskStateColor = (state: string) => {
  if (state === 'blocked') return { background: 'rgba(168,56,24,0.15)', color: '#a83818', border: '1px solid rgba(168,56,24,0.3)' }
  if (state === 'in-progress') return { background: 'rgba(224,104,24,0.12)', color: '#e06818', border: '1px solid rgba(224,104,24,0.3)' }
  return { background: 'rgba(214,169,96,0.12)', color: '#d6a960', border: '1px solid rgba(214,169,96,0.3)' }
}

function ProjectBoard({ projects, tasks, dataBoundary }: ProjectBoardProps) {
  const [filter, setFilter] = useState<WorkspaceProjectFilter>('all')
  const [selectedProjectId, setSelectedProjectId] = useState(projects[0]?.id ?? '')

  const visibleProjects = useMemo(() => filterProjectsByStatus(projects, filter), [projects, filter])

  useEffect(() => {
    if (!visibleProjects.some((p) => p.id === selectedProjectId)) {
      setSelectedProjectId(visibleProjects[0]?.id ?? '')
    }
  }, [visibleProjects, selectedProjectId])

  const selectedProject = useMemo(
    () => visibleProjects.find((p) => p.id === selectedProjectId) ?? null,
    [visibleProjects, selectedProjectId],
  )

  const selectedTasks = useMemo(
    () => getTasksForProject(tasks, selectedProject?.id ?? ''),
    [tasks, selectedProject],
  )

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* Filter buttons */}
      <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
        {filters.map((candidate) => (
          <button
            key={candidate}
            type="button"
            onClick={() => setFilter(candidate)}
            style={{
              borderRadius: '6px',
              padding: '6px 14px',
              fontSize: '13px',
              fontWeight: 500,
              cursor: 'pointer',
              border: 'none',
              ...(filter === candidate
                ? { background: 'rgba(224,104,24,0.15)', color: '#e06818', outline: '1px solid rgba(224,104,24,0.4)' }
                : { background: 'transparent', color: '#8a8c93', outline: '1px solid #3a3c42' }),
            }}
          >
            {candidate === 'all' ? 'All' : candidate}
          </button>
        ))}
      </div>

      {/* Project list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {visibleProjects.length === 0 ? (
          <EmptyState
            title="No projects match this workflow view"
            description="Use this section to demonstrate filtered lists, saved views, and team-specific queues without changing the route shell."
          />
        ) : (
          visibleProjects.map((project) => (
            <button
              key={project.id}
              type="button"
              onClick={() => setSelectedProjectId(project.id)}
              style={{
                width: '100%',
                textAlign: 'left',
                borderRadius: '10px',
                padding: '14px',
                cursor: 'pointer',
                border: 'none',
                background: selectedProjectId === project.id ? 'rgba(224,104,24,0.1)' : '#26272c',
                outline: selectedProjectId === project.id ? '1px solid #e06818' : '1px solid #3a3c42',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
                <div>
                  <p style={{ fontSize: '14px', fontWeight: 600, color: '#f2f0ea' }}>{project.name}</p>
                  <p style={{ fontSize: '12px', color: '#8a8c93', marginTop: '2px' }}>{project.owner}</p>
                </div>
                <span style={{ borderRadius: '4px', padding: '2px 8px', fontSize: '11px', fontWeight: 600, ...statusColor(project.status) }}>
                  {project.status}
                </span>
              </div>
              <p style={{ fontSize: '13px', color: '#8a8c93', marginTop: '8px', lineHeight: 1.6 }}>{project.summary}</p>
              <div style={{ marginTop: '10px', height: '4px', background: '#3a3c42', borderRadius: '2px', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${project.readiness}%`, background: '#e06818', borderRadius: '2px' }} />
              </div>
              <p style={{ fontSize: '12px', color: '#8a8c93', marginTop: '4px' }}>Readiness {project.readiness}%</p>
            </button>
          ))
        )}
      </div>

      {/* Selected project detail */}
      {selectedProject ? (
        <Card style={{ background: '#1a1b20', border: '1px solid #3a3c42', margin: 0 }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '8px', marginBottom: '12px' }}>
            <div>
              <p style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.3em', color: '#d6a960' }}>Selected sample</p>
              <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#f2f0ea', marginTop: '4px' }}>{selectedProject.name}</h3>
            </div>
            <span className="forge-badge-neutral" style={{ borderRadius: '4px', padding: '2px 8px', fontSize: '12px' }}>{selectedProject.owner}</span>
          </div>
          <p style={{ fontSize: '13px', color: '#8a8c93', lineHeight: 1.75, marginBottom: '16px' }}>{selectedProject.nextStep}</p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {selectedTasks.map((task) => (
              <div key={task.title} style={{ borderRadius: '8px', border: '1px solid #3a3c42', background: '#26272c', padding: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px', marginBottom: '8px' }}>
                  <p style={{ fontSize: '13px', fontWeight: 600, color: '#f2f0ea' }}>{task.title}</p>
                  <span style={{ borderRadius: '4px', padding: '2px 8px', fontSize: '11px', fontWeight: 600, ...taskStateColor(task.state) }}>
                    {task.state}
                  </span>
                </div>
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                  <span className="forge-badge-neutral" style={{ borderRadius: '4px', padding: '2px 8px', fontSize: '11px' }}>{task.lane}</span>
                  <span className="forge-badge-neutral" style={{ borderRadius: '4px', padding: '2px 8px', fontSize: '11px' }}>{task.priority} priority</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      ) : (
        <EmptyState
          title="Select a sample project to inspect the slice"
          description="A starter should make room for project detail panels, modal entry points, and status-driven workflows."
        />
      )}

      {/* Data sources */}
      <Card style={{ background: '#1a1b20', border: '1px solid #3a3c42', margin: 0 }}>
        <p style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.3em', color: '#d6a960', marginBottom: '4px' }}>Starter seam</p>
        <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#f2f0ea', marginBottom: '12px' }}>Example data sources</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {dataBoundary.adapters.map((adapter) => (
            <div key={adapter.label} style={{ borderRadius: '8px', border: '1px solid #3a3c42', background: '#26272c', padding: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px', marginBottom: '6px' }}>
                <div>
                  <p style={{ fontSize: '13px', fontWeight: 600, color: '#f2f0ea' }}>{adapter.label}</p>
                  <p style={{ fontSize: '12px', color: '#8a8c93', marginTop: '2px' }}>{adapter.description}</p>
                </div>
                <span style={{
                  borderRadius: '4px', padding: '2px 8px', fontSize: '11px', fontWeight: 600,
                  ...(adapter.status === 'ready'
                    ? { background: 'rgba(214,169,96,0.12)', color: '#d6a960', border: '1px solid rgba(214,169,96,0.3)' }
                    : { background: 'rgba(248,223,102,0.1)', color: '#f8df66', border: '1px solid rgba(248,223,102,0.3)' }),
                }}>
                  {adapter.status}
                </span>
              </div>
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                <span className="forge-badge-neutral" style={{ borderRadius: '4px', padding: '2px 8px', fontSize: '11px' }}>{adapter.kind}</span>
                <span className="forge-badge-neutral" style={{ borderRadius: '4px', padding: '2px 8px', fontSize: '11px' }}>{dataBoundary.persistenceDriver} persistence</span>
              </div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: '12px' }}>
          <EmptyState
            title="Adapters are starter examples until product services exist"
            description="Use these seams for real API clients, repositories, and sync orchestration instead of wiring transport logic directly into feature views."
          />
        </div>
      </Card>
    </div>
  )
}

export default ProjectBoard
