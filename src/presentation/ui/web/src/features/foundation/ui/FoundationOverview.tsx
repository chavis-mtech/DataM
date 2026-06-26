import { For } from 'solid-js';
import type { FoundationOverview as FoundationOverviewModel } from '../../../application/use-cases/get-foundation-overview';
import StatusCard from '../../../shared/ui/components/StatusCard';

type FoundationOverviewProps = {
  overview: FoundationOverviewModel;
};

export default function FoundationOverview(props: FoundationOverviewProps) {
  return (
    <>
      <section class="hero">
        <p class="eyebrow">{props.overview.eyebrow}</p>
        <h1>{props.overview.title}</h1>
        <p class="lead">{props.overview.description}</p>
      </section>

      <section class="status-grid" aria-label="Project status">
        <For each={props.overview.sections}>
          {(section) => <StatusCard title={section.title} items={section.items} />}
        </For>
      </section>
    </>
  );
}
