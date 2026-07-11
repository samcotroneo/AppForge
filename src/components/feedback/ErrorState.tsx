import type { JSX } from 'solid-js'

type ErrorStateProps = {
  title: string
  description: string
  children?: JSX.Element
}

function ErrorState(props: ErrorStateProps) {
  return (
    <div class="rounded-box border border-error/40 bg-error/10 p-6 text-sm text-base-content">
      <div class="badge badge-error badge-outline badge-sm">Needs attention</div>
      <h3 class="mt-3 text-lg font-semibold">{props.title}</h3>
      <p class="mt-2 leading-7 text-base-content/80">{props.description}</p>
      {props.children ? <div class="mt-4">{props.children}</div> : null}
    </div>
  )
}

export default ErrorState
