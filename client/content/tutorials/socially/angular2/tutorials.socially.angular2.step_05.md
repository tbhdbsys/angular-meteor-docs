{{#template name="tutorials.socially.angular2.step_05.md"}}
{{> downloadPreviousStep stepName="step_04"}}

In this step, you will learn:

-  how to create a layout template
-  how to build an app that has multiple views with the new Angular router.

The goal for this step is to add one more page to the app that shows the details of the selected party.

By default we have a list of parties shown on the page, but when a user clicks on a list item, the app should navigate to the new page and show selected party details.


## Parties List

Since we want to have multiple views in our app we have to move the current list of parties into the separate component.

Let's move the content of AppComponent in `app.component.ts` out into a `PartiesList` component.

Create a new file called `parties-list.component.ts` and put it in `client/imports/parties` directory.

{{> DiffBox tutorialName="meteor-angular2-socially" step="5.1"}}

There are few things we did in that step:

- Updated path of the module with `Parties` collection
- Changed the name of the template
- Used `parties-list` as the selector instead of `app`
- Renamed the class

Now we can copy `app.component.html` into the `parties` directory and rename it `parties-list.component.html`:

{{> DiffBox tutorialName="meteor-angular2-socially" step="5.2"}}

Also, let's clean-up `app.component.ts` to prepare it for the next steps:

{{> DiffBox tutorialName="meteor-angular2-socially" step="5.3"}}

and the template for it, which is `app.component.html`:

You will notice that the interface of your app has disappeared. But don't worry! It will come back later on.

{{> DiffBox tutorialName="meteor-angular2-socially" step="5.4"}}

# Routing

Time for a quick talk!

`@angular/router` is completely different then the previous router which is `@angular/router-deprecated`.

With the old router, we defined routes on top of a component using `@RouteConfig` decorator. With the new route we use provider called `provideRouter` to make the routes available in our app.

Let's the code speak for himself.

**Defining routes**

We need to create an array of route definitions. The `RouterConfig` interface comes with help. This way we can be sure that properties of that object are correctly used.

The very basic two properties are `path` and `component`. The path is to define the url and the other one is to bind a component to it.

We will export our routes using `APP_ROUTER_PROVIDERS` variable.

Let's warp it in the `app.routes.ts` file, here's what it suppose to look like:

{{> DiffBox tutorialName="meteor-angular2-socially" step="5.5"}}

Now we can use `APP_ROUTER_PROVIDERS` in the `bootstrap` function.

{{> DiffBox tutorialName="meteor-angular2-socially" step="5.6"}}

Our app still has to display the view somewhere. We'll use `routerOutlet` component to do this.

{{> DiffBox tutorialName="meteor-angular2-socially" step="5.7"}}

We need to make it available in the `AppComponent`:

{{> DiffBox tutorialName="meteor-angular2-socially" step="5.8"}}

There are two ways to define the app base route.

By using `APP_BASE_HREF` from `@angular/common`:

    import { bootstrap } from '@angular/core';
    import { APP_BASE_HREF } from '@angular/common'

    bootstrap(AppComponent, [provide(APP_BASE_HREF, { useValue: '/' })]);

Or simply defining

    <base href="/">

in the main html file.

We already have it defined because of angular2-boilerplate usage.

# Parties details

Let's add another view to the app: `PartyDetailsComponent`. Since it's not possible yet to get party details in this component, we are only going to make stubs.

When we're finished, clicking on a party in the list should redirect us to the PartyDetailsComponent for more information.

{{> DiffBox tutorialName="meteor-angular2-socially" step="5.9"}}

And add a simple template outline for the party details:

{{> DiffBox tutorialName="meteor-angular2-socially" step="5.10"}}

Now we can define the route:

{{> DiffBox tutorialName="meteor-angular2-socially" step="5.11"}}

As you can see, we used `:partyId` inside of the path string. This way we define parameters. For example, `localhost:3000/party/12` will point to the PartyDetailsComponent with `12` as the value of the `partyId` parameter.

We still have to add a link that redirects to party details.

# RouterLink

Let's add links to the new router details view from the list of parties.

As we've already seen, each party link consists of two parts: the base `PartyDetailsComponent` URL and a party ID, represented by the `partyId` in the configuration. There is a special directive called `routerLink` that will help us to compose each URL.

First we'll import the directive and specify it as a view directive in the `PartiesListComponent`:

{{> DiffBox tutorialName="meteor-angular2-socially" step="5.12"}}

Now we can wrap our party in a `routerLink` and pass in the _id as a parameter. Note that the id is auto-generated when an item is inserted into a Mongo Collection.

{{> DiffBox tutorialName="meteor-angular2-socially" step="5.13"}}

As you can see, we used an array. The first element is a path that we want to use and the next one is to provide a value of a parameter.

> You can provide more than one parameter by adding more elements into an array.

# Injecting Route Params

We've just added links to the `PartyDetails` view.

The next thing is to grab the `partyId` route parameter in order to load the correct party in the `PartyDetails` view.

In Angular 2, it's as simple as passing the `ActivatedRoute` argument to the `PartyDetails` constructor:

{{> DiffBox tutorialName="meteor-angular2-socially" step="5.14"}}

Dependency injection is employed heavily here by Angular 2 to do all the work behind the scenes.
TypeScript first compiles this class with the class metadata that says what argument types this class expects in the constructor (i.e. `ActivatedRoute`),
so Angular 2 knows what types to inject if asked to create an instance of this class.

Then, when you click on a party details link, the `router-outlet` directive will create a `ActivatedRoute` provider that provides
parameters for the current URL. Right after that moment if a `PartyDetails` instance is created by means of the dependency injection API, it's created with `ActivatedRoute` injected and equalled to the current URL inside the constructor.

If you want to read more about dependency injection in Angular 2, you can find an extensive overview in this [article](http://blog.thoughtram.io/angular/2015/05/18/dependency-injection-in-angular-2.html).
If you are curious about class metadata read more about it [here](http://blog.thoughtram.io/angular/2015/09/17/resolve-service-dependencies-in-angular-2.html).

Let's now load a party instance using a received ID parameter:

{{> DiffBox tutorialName="meteor-angular2-socially" step="5.15"}}

We also have to make it reactive, because we don't know if the subscription is ready by now.

{{> DiffBox tutorialName="meteor-angular2-socially" step="5.16"}}

> To read more about Tracker.autorun [click here](http://docs.meteor.com/api/tracker.html#Tracker-autorun).

To apply any change of `party` to UI, we have to use `NgZone.run()` method.

{{> DiffBox tutorialName="meteor-angular2-socially" step="5.17"}}

> Official Angular2 docs about [NgZone](https://angular.io/docs/js/latest/api/core/index/NgZone-class.html)

And render the party details on the page:

{{> DiffBox tutorialName="meteor-angular2-socially" step="5.18"}}

# Challenge

Add a link back to the `PartiesList` component from `PartyDetails`.

# Summary

Let's list what we've accomplished in this step:

- split our app into two main views
- configured routing to use these views and created a layout template
- learned briefly how dependency injection works in Angular 2
- injected route parameters and loaded party details with the ID parameter

{{/template}}
