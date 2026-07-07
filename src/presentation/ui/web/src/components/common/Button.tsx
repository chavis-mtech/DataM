import type { JSX } from 'solid-js';

type ButtonProps = JSX.ButtonHTMLAttributes<HTMLButtonElement>;

export function Button(props: ButtonProps) {
  return <button class="dm-button" {...props} />;
}
