import { For } from 'solid-js'
import SectionCard from '../../components/ui/SectionCard'
import { starterContract } from './starterContract'

function StarterContractCard() {
  return (
    <SectionCard
      eyebrow="Fresh repo workflow"
      title="AppForge starter contract"
      description="This is the canonical base app to use when a new repo says to build on AppForge."
    >
      <div class="space-y-6">
        <article class="rounded-md border border-[#3a3c42] bg-[#26272c] p-4">
          <p class="text-sm text-[#8a8c93]">Agent prompt</p>
          <p class="mt-2 font-mono text-sm leading-7 text-[#f2f0ea]">{starterContract.prompt}</p>
          <p class="mt-3 text-sm text-[#8a8c93]">
            Bootstrap command: <span class="font-mono text-[#d6a960]">{starterContract.bootstrapCommand}</span>
          </p>
          <p class="mt-3 text-sm text-[#8a8c93]">
            Bootstrap artifact: <span class="font-mono text-[#d6a960]">{starterContract.bootstrapArtifacts[0]}</span>
          </p>
        </article>

        <div class="grid gap-4 lg:grid-cols-3">
          <For each={starterContract.layers}>
            {(layer) => (
              <article class="rounded-md border border-[#3a3c42] bg-[#26272c] p-4">
                <div class="flex items-center justify-between gap-3">
                  <h3 class="font-semibold text-[#f2f0ea]">{layer.title}</h3>
                  <span class="rounded px-2 py-0.5 text-xs font-medium uppercase tracking-[0.15em] text-[#d6a960]">
                    {layer.status}
                  </span>
                </div>
                <p class="mt-3 text-sm leading-6 text-[#8a8c93]">{layer.detail}</p>
              </article>
            )}
          </For>
        </div>

        <div class="grid gap-4 md:grid-cols-2">
          <article class="rounded-md border border-[#3a3c42] bg-[#26272c] p-4">
            <p class="text-sm text-[#8a8c93]">Required handoff docs</p>
            <ul class="mt-3 space-y-2 text-sm text-[#f2f0ea]">
              <For each={starterContract.requiredDocs}>
                {(doc) => (
                  <li class="rounded border border-[#3a3c42] bg-[#1a1b20] px-3 py-2">{doc}</li>
                )}
              </For>
            </ul>
          </article>

          <article class="rounded-md border border-[#3a3c42] bg-[#26272c] p-4">
            <p class="text-sm text-[#8a8c93]">Fresh repo steps</p>
            <div class="mt-3 space-y-3">
              <For each={starterContract.freshRepoSteps}>
                {(step, index) => (
                  <div class="rounded border border-[#3a3c42] bg-[#1a1b20] p-3">
                    <p class="text-xs font-semibold uppercase tracking-[0.25em] text-[#d6a960]">
                      Step {index() + 1}
                    </p>
                    <p class="mt-2 font-medium text-[#f2f0ea]">{step.title}</p>
                    <p class="mt-1 text-sm leading-6 text-[#8a8c93]">{step.detail}</p>
                  </div>
                )}
              </For>
            </div>
          </article>
        </div>
      </div>
    </SectionCard>
  )
}

export default StarterContractCard
