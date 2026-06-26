import type { ParentComponent } from 'solid-js';

const AppShell: ParentComponent = (props) => {
  return (
    <main class="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-4 py-10 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
      {props.children}
    </main>
  );
};

export default AppShell;
