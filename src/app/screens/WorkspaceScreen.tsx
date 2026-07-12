import AppShell from '../../components/shell/AppShell'
import SectionCard from '../../components/ui/SectionCard'
import type { AppDataBoundary } from '../../lib/data'
import ProjectBoard from '../../features/workbench/ProjectBoard'
import type { WorkspaceProject, WorkspaceTask } from '../../features/workbench/workspaceData'

type WorkspaceScreenProps = {
  projects: WorkspaceProject[]
  tasks: WorkspaceTask[]
  dataBoundary: AppDataBoundary
}

function WorkspaceScreen({ projects, tasks, dataBoundary }: WorkspaceScreenProps) {
  return (
    <AppShell title="Workspace">
      <SectionCard
        eyebrow="Example feature"
        title="Sample workspace slice"
        description="This screen demonstrates how route composition can stay thin while example domain behavior lives inside a dedicated feature folder."
      >
        <ProjectBoard projects={projects} tasks={tasks} dataBoundary={dataBoundary} />
      </SectionCard>
    </AppShell>
  )
}

export default WorkspaceScreen
