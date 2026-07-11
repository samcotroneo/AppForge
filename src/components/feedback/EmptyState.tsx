import type { JSX } from 'solid-js'

type EmptyStateProps = {
  title: string
  description: string
  children?: JSX.Element
}

function EmptyState(props: EmptyStateProps) {
  return (
    <div class="rounded-box border border-dashed border-base-300 bg-base-200/70 p-6 text-sm text-base-content/80">
      <div class="badge badge-ghost badge-sm">Empty state</div>
      <h3 class="mt-3 text-lg font-semibold text-base-content">{props.title}</h3>
      <p class="mt-2 leading-7">{props.description}</p>
      {props.children ? <div class="mt-4">{props.children}</div> : null}
    </div>
  )
}

export default EmptyState
