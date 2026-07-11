import SectionCard from '../../components/ui/SectionCard'
import type { AppDataBoundary } from '../../lib/data'
import ProjectBoard from '../../features/workbench/ProjectBoard'
import type { WorkspaceProject, WorkspaceTask } from '../../features/workbench/workspaceData'

type WorkspaceScreenProps = {
  projects: WorkspaceProject[]
  tasks: WorkspaceTask[]
  dataBoundary: AppDataBoundary
}

function WorkspaceScreen(props: WorkspaceScreenProps) {
  return (
    <div class="space-y-6">
      <SectionCard
        eyebrow="Example feature"
        title="Sample workspace slice"
        description="This screen demonstrates how route composition can stay thin while example domain behavior lives inside a dedicated feature folder."
      >
        <ProjectBoard projects={props.projects} tasks={props.tasks} dataBoundary={props.dataBoundary} />
      </SectionCard>
    </div>
  )
}

export default WorkspaceScreen
