import type { JSX } from 'solid-js'

type ErrorStateProps = {
  title: string
  description: string
  children?: JSX.Element
}

function ErrorState(props: ErrorStateProps) {
  return (
    <div class="rounded-lg border border-[#a83818]/40 bg-[#a83818]/10 p-6 text-sm text-[#f2f0ea]">
      <div
        class="inline-block rounded px-2 py-0.5 text-xs font-semibold uppercase tracking-wide"
        style="background: rgba(168,56,24,0.15); color: #a83818; border: 1px solid rgba(168,56,24,0.3);"
      >
        Needs attention
      </div>
      <h3 class="mt-3 text-lg font-semibold text-[#f2f0ea]">{props.title}</h3>
      <p class="mt-2 leading-7 text-[#8a8c93]">{props.description}</p>
      {props.children ? <div class="mt-4">{props.children}</div> : null}
    </div>
  )
}

export default ErrorState
