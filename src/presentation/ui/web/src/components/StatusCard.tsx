import { For } from 'solid-js';

type StatusCardProps = {
  title: string;
  items: string[];
};

export default function StatusCard(props: StatusCardProps) {
  return (
    <section class="status-card">
      <h2>{props.title}</h2>
      <ul>
        <For each={props.items}>{(item) => <li>{item}</li>}</For>
      </ul>
    </section>
  );
}
