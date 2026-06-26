import { For } from 'solid-js';
import type { FoundationOverview as FoundationOverviewModel } from '../../../application/use-cases/get-foundation-overview';
import StatusCard from '../../../shared/ui/components/StatusCard';

type FoundationOverviewProps = {
  overview: FoundationOverviewModel;
};

export default function FoundationOverview(props: FoundationOverviewProps) {
  return (
    <>
      <section class="relative max-w-3xl">
        <div class="absolute -left-6 top-0 h-24 w-24 rounded-full bg-amber-300/20 blur-3xl" />
        <p class="relative font-display text-xs font-semibold uppercase tracking-[0.28em] text-amber-300">
          {props.overview.eyebrow}
        </p>
        <h1 class="relative mt-3 max-w-4xl font-display text-5xl leading-none font-semibold tracking-tight text-stone-50 sm:text-6xl lg:text-[5.25rem]">
          {props.overview.title}
        </h1>
        <p class="relative mt-5 max-w-2xl text-base leading-7 text-stone-300 sm:text-lg">
          {props.overview.description}
        </p>
      </section>

      <section
        class="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2"
        aria-label="Project status"
      >
        <For each={props.overview.sections}>
          {(section) => <StatusCard title={section.title} items={section.items} />}
        </For>
      </section>
    </>
  );
}
