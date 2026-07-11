import { For } from 'solid-js'
import { templateBlueprints } from './templateBlueprints'

function BlueprintGrid() {
  return (
    <div class="stack-grid">
      <For each={templateBlueprints}>
        {(blueprint) => (
          <article class="card border border-base-300 bg-base-100 shadow-md">
            <div class="card-body gap-4">
              <h3 class="card-title">{blueprint.title}</h3>
              <p class="text-sm leading-7 text-base-content/75">{blueprint.summary}</p>
              <ul class="space-y-2 text-sm text-base-content/80">
                <For each={blueprint.deliverables}>
                  {(deliverable) => (
                    <li class="flex gap-3">
                      <span class="text-primary">✓</span>
                      <span>{deliverable}</span>
                    </li>
                  )}
                </For>
              </ul>
            </div>
          </article>
        )}
      </For>
    </div>
  )
}

export default BlueprintGrid
