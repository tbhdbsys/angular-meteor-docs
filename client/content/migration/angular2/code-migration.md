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

So let's start with the migration - our goal now is to migrate the `App_Body` so we can remove the Blaze files in the end of this step.

The replacement of this component as the main component will be our `MainContainerComponent`.

Let's start with the HTML template - we will create a new file named `client/imports/components/main-container.ng2.html` and copy the contents of the `App_Body` template from the file (`imports/ui/layouts/app-body.html`).

Now let's start to make some modifications to make that file a valid Angular 2 template - we need to remove all the Blaze UI bindings, if, each and such.

We will replace them as follow:

- Blaze if/else - will become `ngIf`.
- Blaze each - will become `ngFor`.
- Blaze classes bindings will become `ngClass`.
- Dynamic load of Blaze Template will become `router-outlet`.

> We will also remove all the router dynamic links, and put a placeholder for them at the moment - we will take care of them later.

{{> DiffBox tutorialName="migration-angular2" step="6.1"}}

> Note that unlike Blaze, in Angular 2 we define events such click in the HTML - we will handle that later.

So now we have the HTML template - we need to add some code to the Angular 2 Component:

- We need to use the new template.
- We need to add stubs for the methods we use in the template (`isConnected`, `isCurrentList`, `emailLocalPart`)
- We need to declare the usage of `ROUTER_DIRECTIVES` (we now use `router-outlet`).

So let's do it:

{{> DiffBox tutorialName="migration-angular2" step="6.2"}}

> We also commented the code that in charge of redirection to a list page, we will handle that later.

Now, we need to provide the `lists` object to the view - this will be that lists of Todo lists.

We will create a `Mongo.Cursor` object according to the current code we have in `App_body` template helpers:

{{> DiffBox tutorialName="migration-angular2" step="6.3"}}

> Notice that we put the definition inside `autorun` scope because we use `Meteor.user` method, which can change if the user login or logout.

Now let's implement the stub methods we created earlier, starting with `isConnected`:

{{> DiffBox tutorialName="migration-angular2" step="6.4"}}

And `emailLocalPart`:

{{> DiffBox tutorialName="migration-angular2" step="6.5"}}

Great. Now our next step is to use the existing `Lists_show_page` in the `ListShowComponent` instead of the existing.

First, let's make some modifications in the routes definitions because now we want to load only the template `Lists_show_page` inside the `MainContainerComponent`, and not as root route - it should go inside the main component of Angular 2.

So let's remove the old definitions, and add `...` in the definition of the main route, to indicate that this route can have child routes:

{{> DiffBox tutorialName="migration-angular2" step="6.6"}}

And define the list-show route inside the `MainContainerComponent`:

{{> DiffBox tutorialName="migration-angular2" step="6.7"}}

Now let's update `ListShowComponent` to load `Lists_show_page` instead of `App_body`:

{{> DiffBox tutorialName="migration-angular2" step="6.8"}}

Remember the redirection we commented earlier? now let's add it, but now we will use another approach - we will create a route for that logic, and define it as default route - so when a client access `/` - the redirection component will run and redirect it to the `ListShowComponent`.

So let's add the route first:

{{> DiffBox tutorialName="migration-angular2" step="6.9"}}

And the actual component:

{{> DiffBox tutorialName="migration-angular2" step="6.10"}}

Now let's go back to the `MainContainerComponent` and keep implementing the missing logic

We need to add some booleans we use in our view, and we need to implement `isCurrentList` method, which we use in the view to check if the a list item is the selected list:

{{> DiffBox tutorialName="migration-angular2" step="6.11"}}

> We use `router.currentInstruction` to get the current active route in the Angular 2 router, and from that object we can get the active Component and it's route params.

Few steps ago, we migrated the HTML template and we used a placeholders for the router's links - now let's replace them with real links:

{{> DiffBox tutorialName="migration-angular2" step="6.12"}}

> The use `routerLink` which is a directive that creates a link to Angular 2 route.

At the moment we are still missing the Join and Signin routes, so let's defined them:

{{> DiffBox tutorialName="migration-angular2" step="6.13"}}

And let's create stubs Components, we will later implement them:

{{> DiffBox tutorialName="migration-angular2" step="6.14" filename="client/imports/components/join.component.ts"}}

{{> DiffBox tutorialName="migration-angular2" step="6.14" filename="client/imports/components/signin.component.ts"}}

Now the only missing things are the UI events for the buttons such logout and create new list.

So first let's migrate the create new list code, and create a method on the Component:

{{> DiffBox tutorialName="migration-angular2" step="6.15"}}

And let's add the event registration in the view:

{{> DiffBox tutorialName="migration-angular2" step="6.16"}}

We will do the same for logout:

{{> DiffBox tutorialName="migration-angular2" step="6.17"}}

And use it in the view:

{{> DiffBox tutorialName="migration-angular2" step="6.18"}}

> The only missing thing at the moment is the `currentUser` field in this Component - we will add it in the next step.

Now we can remove the old Blaze Templates from the project (commit #6.19).

So at the moment, we have fully migrated Blaze Template and all the application features works as before!

### 7. Migrating Authentication Templates

So now we will take care of the authentication Blaze Templates, such as Join and Signup.

We already created a stub Angular 2 Components for them - we just need to implement them now.

This Todos project uses AccountTemplates package, which has a default style templates for signin and join pages - we do not want to use those and we want to implement it with Angular 2.

The style and template defined in `imports/ui/accounts/accounts-templates.html` and we will copy the thing we need and create a new Angular 2 template file that looks the same.

{{> DiffBox tutorialName="migration-angular2" step="7.1"}}

So this is the basic layout without the actual form fields, let's use it:

{{> DiffBox tutorialName="migration-angular2" step="7.2"}}

Now let's add the actual form:

{{> DiffBox tutorialName="migration-angular2" step="7.3"}}

Let's understand what do we have here:

- A form, that registers an event `ngSubmit` to the Component method `join`, and we give it a name `joinForm` using variable reference ([more info here](https://angular.io/docs/ts/latest/guide/template-syntax.html))
- 3 inputs for email, password and verify password, that declared as `ngControl` which indicate that this input related to the form and effect it's validation.
- We also use two-way binding using `ngModel` for the inputs.
- Button of type `submit` that disabled when the form is not valid.

Great, now we need to add some code to the form:

- Handle errors using `errors` array.
- Implement `join()` method and create the actual user when join.
- Create a model object with our fields (email, password, verifyPassword) - note that this is optional and you can just use regular object.
- Use router to navigate the user to the main page after joining.

So let's do it:

{{> DiffBox tutorialName="migration-angular2" step="7.4"}}

> We use the root router because we are inside a child route.

This Todo base project uses packages that intent to help developing Blaze Template with Meteor Accounts, and we no longer need it, and it is also "takes control" of sign-up, so we need to remove it.

So let's remove those packages, by running:

    meteor remove useraccounts:unstyled useraccounts:flow-routing softwarerero:accounts-t9n

And we also perform some cleanup and remove some files that uses this packages - you can see those modifications in commit #7.5 (or [here](https://github.com/dotansimha/angular2-blaze-migration-tutorial/commit/6c1bab196ba03c8f5d2e933644411733acd62272))

Great! now we need to make sure that there is an indication for the user that he's logged in, so let's go back to `MainContainerComponent` and and add `currentUser` field:

{{> DiffBox tutorialName="migration-angular2" step="7.6"}}

> We put that code inside `autorun` because we want it to update when the user login or logout.

Now we should be able to see the user's name if the main page - the only missing thing is to fix and add toggle for the user menu:

{{> DiffBox tutorialName="migration-angular2" step="7.7"}}

Now, let's do the same for the `SigninComponent` - it's very similar:

{{> DiffBox tutorialName="migration-angular2" step="7.8"}}

And the Component:

{{> DiffBox tutorialName="migration-angular2" step="7.9"}}

### 8. Migrate the Todo List Template

So let's continue! now we will migrate the list of todo, so far we use an existing Blaze Template called `Lists_show_page` inside a new Angular 2 Component called `ListShowComponent`.

First, let's modify the template, we use the same techniques we learned in the previous steps - we will use the existing template and just change the events, bindings and directives:

{{> DiffBox tutorialName="migration-angular2" step="8.1"}}

Assuming you already got it, let's migrate the Template code into a Component:

{{> DiffBox tutorialName="migration-angular2" step="8.2"}}

> At the moment, we will use the exiting `Todo_item` template to show the items - we will later migrate it too - so we just pass the required params using `getContextForItem`.

Great, now we need to implement the events we had in the Blaze Template, let's add them first to the view:

{{> DiffBox tutorialName="migration-angular2" step="8.3"}}

And now let's implement and migrate the code into the Component's class:

{{> DiffBox tutorialName="migration-angular2" step="8.4"}}

That's it! we can now remove the old files of this Template (`imports/ui/components/lists-show.html`, `imports/ui/components/lists-show.js`, `imports/ui/pages/lists-show-page.js`, `imports/ui/pages/lists-show-page.html`), and we can removed the imports for those files from the routes file (`imports/startup/client/routes.js`).

### 9. Migrate the List Item Template

Our last relevant Blaze Template is the list item - this is a little bit tricky because this template need to interact with the parent Component and get the actual Todo item, and also expose events for the parent Component - so we will use a new Angular 2 features called `Input` and `Output` for that.

So let's start with the Component migration this time:

{{> DiffBox tutorialName="migration-angular2" step="9.1"}}

We copied the code from the old Blaze Template, and added two `Input`s and one `Output` in the Component declaration:

- `todo` which is the actual todo item.
- `editing` which is an indication for the current item that being edited.
- `editChange` which is an event we expose to the parent Component that triggered when starting to edit an item in the list.

Now let's migrate the HTML Template of this Component:

{{> DiffBox tutorialName="migration-angular2" step="9.2"}}

And now we need to use this new Component in the `ListShowComponent`:

{{> DiffBox tutorialName="migration-angular2" step="9.3"}}

And let's implement the actual event handler and use declare the usage of the new Component:

{{> DiffBox tutorialName="migration-angular2" step="9.4"}}

And we are done! You can now remove all the files that related to the list item and removed it's import! (we did it in commit #9.5)

### 10. Cleanup

So now that we are done with the migration, we need to perform some clean-ups and make sure that we remove all the old files.

Let's start by removing the Blaze main import from the `main.ts` file:

{{> DiffBox tutorialName="migration-angular2" step="10.1"}}

Everything should work just fine - that's means that there is no more dependencies for the Blaze Templates!

Next, let's join all the stylesheets we need under the same directory - `imports/styelsheets/`, now they are in `imports/ui/stylesheets/` (commit #10.2).

> Make sure to also take `imports/ui/components/lists-show.less` !

And we also need to update the imports in the main less file:

{{> DiffBox tutorialName="migration-angular2" step="10.3"}}

Now we can remove all the files we no longer use from `imports/ui/` directory - which are ALL of the files, except `errors.js` which we use, so let's move it to `/imports/` directory first, and them remove `imports/ui/` directory (commit #10.4).

And let's update the imports of `errors.js` file:

{{> DiffBox tutorialName="migration-angular2" step="10.5" filename="client/imports/components/list-item.component.ts"}}

{{> DiffBox tutorialName="migration-angular2" step="10.5" filename="client/imports/components/list-show.component.ts"}}

We can also removed all client startup files (`imports/startup/client`), since we no longer use them (in commit #10.6).

We can also now remove Meteor packages we no longer use that related to Blaze or Router!

So let's do it by running:

    meteor remove blaze-html-templates aldeed:template-extension kadira:flow-router kadira:blaze-layout arillo:flow-router-helpers zimme:active-route

And now we can also use the regular Angular 2 compilers package, so let's remove the old one and use the regular one:

    meteor remove angular2-with-blaze-compilers
    meteor add angular2-compilers less

And the last step, is to remove `.ng2` from the HTML files extension and update it to be `.html`, remember also to update it in the Component `templateUrl` !

That's it! In the next chapter we will take about the next step of migration from Blaze to Angular 2.

{{/template}}
