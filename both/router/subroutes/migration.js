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
          title: "Angular 2",
          route: "migration.angular2",
          path: "/migration/angular2",
          pathRedirect: "/migration/angular2/intro",
          pages: [
            {
              id: "20",
              title: 'Introduction',
              route: "migration.angular2.intro",
              path: "/migration/angular2/intro",
              contentTemplate: 'migration.angular2.intro.md'
            },
            {
              id: "21",
              title: 'Understanding Angular 2',
              route: "migration.angular2.basic",
              path: "/migration/angular2/understanding-angular2",
              contentTemplate: 'migration.angular2.basic.md'
            },
            {
              id: "22",
              title: 'First Steps',
              route: "migration.angular2.first-steps",
              path: "/migration/angular2/first-steps",
              contentTemplate: 'migration.angular2.first-steps.md'
            },
            {
              id: "23",
              title: 'Coexistence',
              route: "migration.angular2.coexistence",
              path: "/migration/angular2/coexistence",
              contentTemplate: 'migration.angular2.coexistence.md'
            },
            {
              id: "24",
              title: 'Code Migration',
              route: "migration.angular2.migration",
              path: "/migration/angular2/code-migration",
              contentTemplate: 'migration.angular2.code-migration.md'
            },
            {
              id: "25",
              title: 'Next Steps',
              route: "migration.angular2.next-steps",
              path: "/migration/angular2/next-steps",
              contentTemplate: 'migration.angular2.next-steps.md'
            }
          ]
        }
      ]
    }
  ]
};
