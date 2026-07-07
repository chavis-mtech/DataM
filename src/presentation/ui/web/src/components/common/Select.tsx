import { For } from 'solid-js';
import type { JSX } from 'solid-js';

type Option = { value: string; label: string };

type SelectProps = Omit<JSX.SelectHTMLAttributes<HTMLSelectElement>, 'children'> & {
  options: Option[];
};

export function Select(props: SelectProps) {
  return (
    <select class="dm-select" {...props}>
      <For each={props.options}>{(opt) => <option value={opt.value}>{opt.label}</option>}</For>
    </select>
  );
}
