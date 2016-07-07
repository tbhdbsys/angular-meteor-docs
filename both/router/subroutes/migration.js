MIGRATION = {
  groups: [
    {
      id: "0",
      title: "Migration",
      route: "migration",
      path: "/migration",
      pathRedirect: "/migration/angular1/intro",
      template: "migration",
      pages: [
        {
          id: "1",
          title: "Angular 1",
          route: "migration.angular1",
          path: "/migration/angular1",
          pathRedirect: "/migration/angular1/intro",
          pages: [
            {
              id: "10",
              title: 'Intro',
              route: "migration.angular1.intro",
              path: "/migration/angular1/intro",
              contentTemplate: 'migration.angular1.intro.md'
            },
            {
              id: "11",
              title: 'Methods',
              route: "migration.angular1.methods",
              path: "/migration/angular1/methods",
              contentTemplate: 'migration.angular1.method.md'
            },
            {
              id: "12",
              title: 'Routers',
              route: "migration.angular1.routers",
              path: "/migration/angular1/routers",
              contentTemplate: 'migration.angular1.routers.md'
            },
            {
              id: "13",
              title: 'Templates',
              route: "migration.angular1.templating",
              path: "/migration/angular1/templating",
              contentTemplate: 'migration.angular1.templating.md'
            },
            {
              id: "14",
              title: 'Bottom-up migration',
              route: "migration.angular1.bottom-up",
              path: "/migration/angular1/bottom-up",
              contentTemplate: 'migration.angular1.bottom-up.md'
            },
            {
              id: "15",
              title: '2-step migration',
              route: "migration.angular1.2-step",
              path: "/migration/angular1/2-step",
              contentTemplate: 'migration.angular1.2-step.md'
            }
          ]
        },
        {
          id: "2",
          ghRepoName: "https://github.com/dotansimha/angular2-blaze-migration-tutorial",
          title: "Angular 2",
          route: "migration.angular2",
          path: "/migration/angular2",
          pathRedirect: "/migration/angular2/intro",
          pages: [
            {
              id: "0",
              title: 'Introduction',
              route: "migration.angular2.intro",
              path: "/migration/angular2/intro",
              contentTemplate: 'migration.angular2.intro.md',
              hideCommitDiff: true
            },
            {
              id: "1",
              title: 'Understanding Angular 2',
              route: "migration.angular2.basic",
              path: "/migration/angular2/understanding-angular2",
              contentTemplate: 'migration.angular2.basic.md',
              hideCommitDiff: true
            },
            {
              id: "2",
              title: 'First Steps',
              route: "migration.angular2.first-steps",
              path: "/migration/angular2/first-steps",
              contentTemplate: 'migration.angular2.first-steps.md',
              hideCommitDiff: true
            },
            {
              id: "3",
              title: 'Coexistence',
              route: "migration.angular2.coexistence",
              path: "/migration/angular2/coexistence",
              contentTemplate: 'migration.angular2.coexistence.md',
              hideCommitDiff: true,
              diffStep: "00"
            },
            {
              id: "4",
              title: '1. TypeScript',
              route: "migration.angular2.migration1",
              path: "/migration/angular2/code-migration/typescript",
              contentTemplate: 'migration.angular2.code-migration1.md',
              diffStep: "01"
            },
            {
              id: "5",
              title: '2. Creating Angular 2 Application',
              route: "migration.angular2.migration2",
              path: "/migration/angular2/code-migration/creating-angular2-app",
              contentTemplate: 'migration.angular2.code-migration2.md',
              diffStep: "02"
            },
            {
              id: "6",
              title: '3. Router Migration',
              route: "migration.angular2.migration3",
              path: "/migration/angular2/code-migration/router",
              contentTemplate: 'migration.angular2.code-migration3.md',
              diffStep: "03"
            },
            {
              id: "7",
              title: '4. Migrate the main Blaze Template',
              route: "migration.angular2.migration4",
              path: "/migration/angular2/code-migration/main-template",
              contentTemplate: 'migration.angular2.code-migration4.md',
              diffStep: "04"
            },
            {
              id: "8",
              title: '5. Load Blaze Template',
              route: "migration.angular2.migration5",
              path: "/migration/angular2/code-migration/loan-blaze-template",
              contentTemplate: 'migration.angular2.code-migration5.md',
              diffStep: "05"
            },
            {
              id: "9",
              title: '6. Migrate Template into Component',
              route: "migration.angular2.migration6",
              path: "/migration/angular2/code-migration/migrate-blaze-template",
              contentTemplate: 'migration.angular2.code-migration6.md',
              diffStep: "06"
            },
            {
              id: "10",
              title: '7. Migrating Authentication Templates',
              route: "migration.angular2.migration7",
              path: "/migration/angular2/code-migration/authentication",
              contentTemplate: 'migration.angular2.code-migration7.md',
              diffStep: "07"
            },
            {
              id: "11",
              title: '8. Migrate the Todo List',
              route: "migration.angular2.migration8",
              path: "/migration/angular2/code-migration/migrate-todo-list",
              contentTemplate: 'migration.angular2.code-migration8.md',
              diffStep: "08"
            },
            {
              id: "12",
              title: '9. Migrate the List Item',
              route: "migration.angular2.migration9",
              path: "/migration/angular2/code-migration/migrate-list-item",
              contentTemplate: 'migration.angular2.code-migration9.md',
              diffStep: "09"
            },
            {
              id: "13",
              title: '10. Cleanup',
              route: "migration.angular2.migration10",
              path: "/migration/angular2/code-migration/cleanup",
              contentTemplate: 'migration.angular2.code-migration10.md',
              diffStep: "10"
            },
            {
              id: "14",
              title: 'Next Steps',
              route: "migration.angular2.next-steps",
              path: "/migration/angular2/next-steps",
              contentTemplate: 'migration.angular2.next-steps.md',
              hideCommitDiff: true
            }
          ]
        }
      ]
    }
  ]
};
