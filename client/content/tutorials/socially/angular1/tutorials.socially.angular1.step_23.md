{{#template name="tutorials.socially.angular1.step_23.md"}}
{{> downloadPreviousStep stepName="step_22"}}

This chapter is all about migrating your Angular1 app to **Angular2**, using Socially as an example.

It it based on the great [Upgrading from 1.x guide](https://angular.io/docs/ts/latest/guide/upgrade.html) on angular.io. 

It includes switching from JavaScript to **TypeScript**. With that we can use all of its benefits.


## Switching to TypeScript

First of all, we have to remove JS compiler, which in our case is `pbastowski:angular-babel`.

```bash
meteor remove pbastowski:angular-babel
```

At this point we could use `barbatus:typescript` package that compiles TypeScript into JavaScript but since we're migrating and part of Socially still requires `ng-annotate` we have to fix it somehow.

We recommend you to use `mys:typescript-ng-annotate`.

It is based on `barbatus:typescript` so when you will be fully ready to use only a typescript compiler, there won't be any issues.

```bash
meteor add mys:typescript-ng-annotate
```

Great! We can move to more interesting part.

At first, let's take care of our client-side entry point, which is `client/main.js` file and rename it to `client/main.ts`:

{{> DiffBox tutorialName="meteor-angular1-socially" step="23.3"}}

As you can see, we also changed the way we're importing `angular` object.

Before:

```js
import angular from 'angular';
```

After:

```js
import * as angular from 'angular';
```

Let's do the same for the Socially component:

{{> DiffBox tutorialName="meteor-angular1-socially" step="23.4"}}

And again, we changed default imports of first few packages.

Now we should take care of templates:

{{> DiffBox tutorialName="meteor-angular1-socially" step="23.5"}}

We can just import the default object and use the `Component.name` form:

{{> DiffBox tutorialName="meteor-angular1-socially" step="23.6"}}

Let's now repeat the process for every file of Socially app.

Done? Great!

Every module that imports `underscore` needs a little refactoring too:

{{> DiffBox tutorialName="meteor-angular1-socially" step="23.8"}}

To help you find those files:

- imports/api/parties/methods.ts
- imports/ui/components/partyRsvp/partyRsvp.ts
- imports/ui/filters/uninvitedFilter.ts

## Upgrading to Angular2

Ok, now is the time to install angular2 packages:

{{> DiffBox tutorialName="meteor-angular1-socially" step="23.9"}}

List of useful commands:

```bash
$ npm install --save @angular/common
$ npm install --save @angular/compiler
$ npm install --save @angular/core
$ npm install --save @angular/platform-browser
$ npm install --save @angular/platform-browser-dynamic
$ npm install --save @angular/upgrade
$ npm install --save angular2-meteor
$ npm install --save es6-shim
$ npm install --save reflect-metadata
$ npm install --save rxjs
$ npm install --save underscore
$ npm install --save zone.js
```

Since we want to have Angular1 working side by side with Angular2 we have to use UpgradeAdapter.

To read more about it, you can go to ["How the UpgradeAdapter works"](https://angular.io/docs/ts/latest/guide/upgrade.html#!#how-the-upgrade-adapter-works) chapter of Angular Docs.

At first we need an instance of `UpgradeAdapter`:

{{> DiffBox tutorialName="meteor-angular1-socially" step="23.10"}}

Now we can bootstrap Socially with using UpgradeAdapter:

{{> DiffBox tutorialName="meteor-angular1-socially" step="23.11"}}

## Filters to Pipes

Angular1's filters are similar to Angular2's pipes. In Angular Docs, there is a [good explanation](https://angular.io/docs/ts/latest/cookbook/a1-a2-quick-reference.html#!#filters-pipes) of how they works and what are the differences.

Since we'll be using filters on ng1 side and pipes on ng2's, we have to create them separately.

{{> DiffBox tutorialName="meteor-angular1-socially" step="23.12"}}

Let's me explain to you what happened there.

* import Pipe decorator.
* change name to *displayName*.
* move a function to be a class with `transform` method.
* remove everything related to Angular1

And now the same process but for `uninvited` pipe:

{{> DiffBox tutorialName="meteor-angular1-socially" step="23.13"}}

We cannot return `false` inside `ngFor` directive so let's change it to an empty array:

{{> DiffBox tutorialName="meteor-angular1-socially" step="23.14"}}

## Preparing ng1 component for migration

First of all we have to import `Component` ([read more](https://angular.io/docs/ts/latest/cookbook/a1-a2-quick-reference.html#!#controllers-components)) and use it as a decorator:

{{> DiffBox tutorialName="meteor-angular1-socially" step="23.15"}}

Now we can take care of Pipes, use them instead of Filters:

{{> DiffBox tutorialName="meteor-angular1-socially" step="23.16"}}

## Switching to angular2-meteor

We already installed `angular2-meteor`, we can now just import `MeteorComponent`.

PartyUninvited needs to be extended by MeteorComponent. We also have to call its constructor by using `super()`.

{{> DiffBox tutorialName="meteor-angular1-socially" step="23.17"}}

Replace angular-meteor API with angular2-meteor's.

{{> DiffBox tutorialName="meteor-angular1-socially" step="23.18"}}

To use this ng2 component within ng1 app we need to downgrade it.

UpgradeAdapter API contains `downgradeNg2Component` method, let's use it!

{{> DiffBox tutorialName="meteor-angular1-socially" step="23.19"}}

Did you notice that we used `directive` instead of `component`? I bet you did!

Let's now take care of bindings. We need to import `Input` and use it as an annotation of `party` property.

To learn more about it, we recommend you to read ["Component Communication"](https://angular.io/docs/ts/latest/cookbook/component-communication.html) chapter of Angular Docs.

{{> DiffBox tutorialName="meteor-angular1-socially" step="23.20"}}

We will no longer use prefixed variables inside a template, let's remove them:

{{> DiffBox tutorialName="meteor-angular1-socially" step="23.21"}}

We're using Pipes instead of Filters, so template also needs to be updated:

{{> DiffBox tutorialName="meteor-angular1-socially" step="23.22"}}

`ngFor` is equivalent to `ng-for`, this also needs a change:

{{> DiffBox tutorialName="meteor-angular1-socially" step="23.23"}}

Let me show you the difference:

```html
<div ng-for="user in users"></div>
```

```html
<div *ngFor="let user of users"></div>
```

We have to also take care of click event:

{{> DiffBox tutorialName="meteor-angular1-socially" step="23.24"}}

Since PartyUninvited is a ng2 component we have to change the way we're passing a value:

{{> DiffBox tutorialName="meteor-angular1-socially" step="23.25"}}

Instead of just an `attribute` we use `[attribute]`, which is a one-way binding.

{{> DiffBox tutorialName="meteor-angular1-socially" step="23.26"}}

Now let's do the same but for `PartyDetails`:

{{> DiffBox tutorialName="meteor-angular1-socially" step="23.27"}}

We will use ng1 component inside ng2 component. It requires a special attention!

UpgradeAdapter's API contains `upgradeNg1Component` method, let's use it:

{{> DiffBox tutorialName="meteor-angular1-socially" step="23.28"}}

And yet again, `MeteorComponent`:

{{> DiffBox tutorialName="meteor-angular1-socially" step="23.29"}}

Now we have to downgrade ng2 component. Let's do the same what we did with PartyUninvited.

{{> DiffBox tutorialName="meteor-angular1-socially" step="23.30"}}

Since we have a router on ng1 side we have to somehow pass `partyId` to `PartyDetails` component:

{{> DiffBox tutorialName="meteor-angular1-socially" step="23.31"}}

Okay, we still need to take care of bindings:

{{> DiffBox tutorialName="meteor-angular1-socially" step="23.32"}}

Output is the same as Input but works in reverse direction. It helps you to share some property with other components.

## Removing ng1 support

PartyUninvited no longer have to be working on ng1 side. We can get rid of Angular1 API:

{{> DiffBox tutorialName="meteor-angular1-socially" step="23.33"}}

## Using Material2

Yes, you read it right! We can also move our app design to Angular2 keeping the similar API.

Let's install few packages we will need:

{{> DiffBox tutorialName="meteor-angular1-socially" step="23.34"}}

List of all commands:

```bash
npm install --save @angular2-material/core
npm install --save @angular2-material/checkbox
npm install --save @angular2-material/button
npm install --save @angular2-material/input
```

We have now `md-checkbox`, `md-button` and `md-input`.

We need to register those directives inside PartyDetails component:

{{> DiffBox tutorialName="meteor-angular1-socially" step="23.35"}}

This is how it looks now, after implementing all material2 directives:

{{> DiffBox tutorialName="meteor-angular1-socially" step="23.36"}}

And that's it! You have now Angular1 working side by side with Angular2.

UpgradeAdapter is pretty awesome, right? Good luck to you in the Angular2 world. It was a nice journey!

...

{{/template}}
