import type { ParentComponent } from 'solid-js';

const AppShell: ParentComponent = (props) => {
  return <main class="app-shell">{props.children}</main>;
};

export default AppShell;
