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
      'The entry point is limited to bootstrap, the app layer composes dependencies, and feature UI consumes an application-level view model.',
    sections: [
      {
        title: 'Clean architecture baseline',
        items: [
          'src/index.tsx only boots the application',
          'src/app owns composition and global app styling',
          'src/application owns use-case level orchestration',
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
