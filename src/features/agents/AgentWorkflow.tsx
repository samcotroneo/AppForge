import { For } from 'solid-js'
import SectionCard from '../../components/ui/SectionCard'
import { agentTracks } from './agentTracks'

function AgentWorkflow() {
  return (
    <SectionCard
      eyebrow="Sub-agent workflow"
      title="Parallelize the work that scales, centralize the work that decides architecture"
      description="Use the template boundaries to split complex product work into safe, low-conflict execution lanes."
    >
      <div class="grid gap-4 lg:grid-cols-2">
        <For each={agentTracks}>
          {(track) => (
            <article class="rounded-box border border-base-300 bg-base-200 p-5">
              <div class="flex items-center justify-between gap-3">
                <h3 class="text-lg font-semibold">{track.lane}</h3>
                <div class="badge badge-outline badge-primary">sub-agent</div>
              </div>
              <p class="mt-3 text-sm text-base-content/75">{track.scope}</p>
              <p class="mt-4 text-sm font-medium text-base-content">Outcome: {track.outcome}</p>
            </article>
          )}
        </For>
      </div>
    </SectionCard>
  )
}

export default AgentWorkflow
