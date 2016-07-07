{{#template name="migration.angular2.code-migration2.md"}}

First, let's create Angular 2 basic component in the `client/main.ts` file:

{{> DiffBox tutorialName="migration-angular2" step="2.1"}}

Let's understand what do we have here - `MainComponent` created as component, with the `app` tag selector.

With use Angular 2 `bootstrap` method to init this component as the main component of the application.

Now we need to use the `<app>` tag in order to load the application.

In order to do so, we first need to change the main HTML file name, and add `.ng2` to the extension, so it will compile as Angular 2 template:

{{> DiffBox tutorialName="migration-angular2" step="2.2"}}

> We also changed the name from "head" to "index" - it's optional.

Now we need to we the `<app>` tag, so let's add `<body>` to the main HTML file and add the tag inside:

{{> DiffBox tutorialName="migration-angular2" step="2.3"}}

{{/template}}
