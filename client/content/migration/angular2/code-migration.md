{{#template name="migration.angular2.code-migration.md"}}

# Code Migration

So let's start with the actual code migration.

What do we have so far?

- Blaze application
- Angular 2 HTML compilers + TypeScript support
- Ability to load Blaze Template inside Angular 2 Component

So let's start!

### 1. TypeScript

TypeScript is the recommended language for writing Angular 2 application.

The TypeScript compiler works for `.ts` files - so let's start by changing the main file (`client/main.js`) into TypeScript file.

{{> DiffBox tutorialName="migration-angular2" step="1.6"}}

> Don't worry! TypeScript is just an extension for ES2016 - so all of your current code should work just fine!

### 2. Creating Angular 2 Application

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

### 3. Router Migration

First step of migration is to migrate the Router.

Our example To-do application uses *FlowRouter* in order to define it's routes, we can see the definitions in `/imports/startup/client/routes.js`.

Our goal now is to migrate the router into Angular 2 Router - this step is very important and we need to do it first in order to load later Angular 2 Components with Blaze Template inside them.

So let's start by commenting or removing the FlowRouter definitions:

{{> DiffBox tutorialName="migration-angular2" step="3.1"}}

And now let's define those routes using Angular 2 Router - the definition is in our main component file:

{{> DiffBox tutorialName="migration-angular2" step="3.2"}}

So what do we have here?

- We imported and used `ROUTER_DIRECTIVES` in the Component declaration because we need to declare using those directive.
- The directives we imported in use in the Component's template - notice that we use `router-outlet` tag - this tag will be the container of the current route.
- We imported and used the `RouteConfig` decorator - we defined two routes and connected a Component for each route.
- We imported and added `ROUTER_PROVIDERS` to the `bootstrap` call in order to load the providers of the Router.

Also, we need to add `<base>` tag in our `<head>` for the router:

{{> DiffBox tutorialName="migration-angular2" step="3.3"}}


Noticed that we used two components in the routes? `MainContainerComponent` and `ListShowComponent` - let's create a stub component for those components (we will implement them later).

{{> DiffBox tutorialName="migration-angular2" step="3.4"}}

{{> DiffBox tutorialName="migration-angular2" step="3.5"}}

And now let's import these component in the main component:

{{> DiffBox tutorialName="migration-angular2" step="3.6"}}

So now our app should be empty, because non of the existing Blaze Templates loaded (they were loaded by the Router according to the current URL).

### 4. Migrate the main Blaze Template

The route `/` defined as a route that does not do much - it just finds the one of the To-do lists and redirects there (in `imports/ui/pages/root-redirector.js`) - to let's do the same!

We will need to extend `MeteorComponent` in order to use Meteor features inside our Angular 2 Component:

{{> DiffBox tutorialName="migration-angular2" step="4.1"}}

And now let's find one of the lists and redirect to it by using the Router:

{{> DiffBox tutorialName="migration-angular2" step="4.2"}}

> Note that we used Angular 2 dependency injection here - we just used the `router : Router` in the constructor and Angular 2 did his magic and provided us the instance of the Router.

But now we have a problem - because the `Lists` collection is always empty! this happens because the Blaze code was the one to use `Meteor.subscribe` and subscribed to the actual data in the collection.

So let's subscribe to the data in our collection - we need to use the `subscribe` method we get from `MeteorComponent` and wraps `Meteor.subscribe` and connects it to Angular 2 environment:

{{> DiffBox tutorialName="migration-angular2" step="4.3"}}

> Note that you have to call `super()` when using `MeteorComponent` methods.

> We also used `this.autorun` to run that code when we get the actual data from the collection.

So now our main page redirects to one of the lists page when it's loaded - let's continue!

### 5. Loaded Blaze Template

So now we get to the list page, but it's empty! we need to load the existing Blaze Template into our Component.

First, we need to use the Router parameter (in the URL) in order to get the ID of the list.

Let's do it:

{{> DiffBox tutorialName="migration-angular2" step="5.1"}}

And now we need to load the existing Blaze Template called `App_body` and with context.

{{> DiffBox tutorialName="migration-angular2" step="5.2"}}

> We use `App_body` because the architecture of the To-do is to load this template and dynamically load a child template that comes from the `main` property of the Template context.

The context of the Template is it's `this.data` that Blaze developers already familiar with, and we use it to pass the child Blaze Template we want to load (`Lists_show_page`) and the `_id` of the choosen list.

Great, now we are missing only one step to make it work.

The `Lists_show_page` Template (`imports/ui/pages/lists-show-page.js`) loads the ID of the list from the `FlowRouter`, and now it can load it from the `this.data` object, so let's change it:

{{> DiffBox tutorialName="migration-angular2" step="5.3"}}

### 6. Migrate Template into Component

So far we have Angular 2 application with Angular 2 Router, that wraps existing Blaze application and load it's Templates.

Our next step is about converting Blaze existing Template into Angular 2 Component.

In order to to so, we need to work top-down - because we can load Blaze existing Template from Angular 2 code.

So at the moment, the top most Blaze Template that loaded is the `App_Body` which contains the following:

- Full layout
- Dynamic load of child Blaze Templates
- List of To-do lists
- Other UI features such as login, sign-up and more



{{/template}}
