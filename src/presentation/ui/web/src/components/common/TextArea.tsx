import type { JSX } from 'solid-js';

type TextAreaProps = JSX.TextareaHTMLAttributes<HTMLTextAreaElement>;

export function TextArea(props: TextAreaProps) {
  return <textarea class="dm-textarea" {...props} />;
}
