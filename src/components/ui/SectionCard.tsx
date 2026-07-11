import type { JSX } from 'solid-js'

type SectionCardProps = {
  eyebrow: string
  title: string
  description: string
  children: JSX.Element
}

function SectionCard(props: SectionCardProps) {
  return (
    <section class="rounded-lg border border-[#3a3c42] bg-[#1a1b20] p-6 shadow-lg sm:p-8">
      <p class="text-xs font-semibold uppercase tracking-[0.3em] text-[#d6a960]">{props.eyebrow}</p>
      <h2 class="mt-3 text-2xl font-bold text-[#f2f0ea]">{props.title}</h2>
      <p class="section-copy mt-3 text-[#8a8c93]">{props.description}</p>
      <div class="mt-6">{props.children}</div>
    </section>
  )
}

export default SectionCard
