export type FoundationOverview = {
  eyebrow: string;
  title: string;
  description: string;
  sections: Array<{
    title: string;
    items: string[];
  }>;
};

export function getFoundationOverview(): FoundationOverview {
  return {
    eyebrow: 'DataM',
    title: 'Web UI foundation',
    description:
      'Tailwind now provides the styling system, app bootstrap stays isolated, and feature UI consumes an application-level view model instead of owning setup concerns.',
    sections: [
      {
        title: 'Tailwind baseline',
        items: [
          'Tailwind v4 is wired into Vite through the official plugin',
          'Project theme tokens live in src/app/app.css',
          'Feature and shared UI now use utility classes instead of ad-hoc selectors',
        ],
      },
      {
        title: 'Still missing',
        items: [
          'Routing if the app will have multiple screens',
          'Adapters to connect infrastructure into application use cases',
          'Tests, linting, and environment configuration',
        ],
      },
    ],
  };
}
