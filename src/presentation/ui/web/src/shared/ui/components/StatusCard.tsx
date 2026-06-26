import { For } from 'solid-js';

type StatusCardProps = {
  title: string;
  items: string[];
};

export default function StatusCard(props: StatusCardProps) {
  return (
    <section class="rounded-3xl border border-amber-300/20 bg-slate-950/55 p-6 shadow-[var(--shadow-panel)] backdrop-blur-sm transition-transform duration-200 hover:-translate-y-1">
      <h2 class="font-display text-lg font-semibold tracking-tight text-stone-50">
        {props.title}
      </h2>
      <ul class="mt-4 space-y-3 pl-4 text-sm leading-6 text-stone-300 sm:text-base">
        <For each={props.items}>{(item) => <li class="marker:text-amber-300">{item}</li>}</For>
      </ul>
    </section>
  );
}
