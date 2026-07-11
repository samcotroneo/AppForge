import type { JSX } from 'solid-js'

type SectionCardProps = {
  eyebrow: string
  title: string
  description: string
  children: JSX.Element
}

function SectionCard(props: SectionCardProps) {
  return (
    <section class="rounded-box border border-base-300 bg-base-100 p-6 shadow-lg sm:p-8">
      <p class="text-xs font-semibold uppercase tracking-[0.3em] text-primary/80">{props.eyebrow}</p>
      <h2 class="mt-3 text-2xl font-bold">{props.title}</h2>
      <p class="section-copy mt-3">{props.description}</p>
      <div class="mt-6">{props.children}</div>
    </section>
  )
}

export default SectionCard
