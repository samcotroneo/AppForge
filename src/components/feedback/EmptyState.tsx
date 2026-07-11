import type { JSX } from 'solid-js'

type EmptyStateProps = {
  title: string
  description: string
  children?: JSX.Element
}

function EmptyState(props: EmptyStateProps) {
  return (
    <div class="rounded-lg border border-dashed border-[#3a3c42] bg-[#26272c]/70 p-6 text-sm text-[#8a8c93]">
      <div
        class="inline-block rounded px-2 py-0.5 text-xs font-semibold uppercase tracking-wide"
        style="background: rgba(58,60,66,0.4); color: #8a8c93; border: 1px solid #3a3c42;"
      >
        Empty state
      </div>
      <h3 class="mt-3 text-lg font-semibold text-[#f2f0ea]">{props.title}</h3>
      <p class="mt-2 leading-7">{props.description}</p>
      {props.children ? <div class="mt-4">{props.children}</div> : null}
    </div>
  )
}

export default EmptyState
