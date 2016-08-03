{{#template name="tutorials.socially.angular2.step_22.md"}}
{{> downloadPreviousStep stepName="step_21"}}

Ionic is a CSS and JavaScript framework. It is highly recommended that before starting this step you will get yourself familiar with its [documentation](http://ionicframework.com/docs/v2).

In this step we will learn how to add Ionic library into our project, and use its powerful directives to create cross platform mobile (Android & iOS) applications.

We will achieve this by creating separate views for web and for mobile  so be creating a separate view for the mobile applications, but we will keep the shared code parts as common code!

### Adding Ionic

Using ionic is pretty simple - first, we need to install it:

    $ meteor npm install ionic-angular@2.0.0-beta.10 --save

We also have to install one missing packages:

    $ meteor npm install @angular/http --save

### Separate web and mobile things

We're going to have one main entry point that depends on two main components.

Since there will be two main components we need to rename `app.component.ts` to `app.web.component.ts`, also `app.web.component.html`.

Great so far! You probably noticed that template also has to change:

{{> DiffBox tutorialName="meteor-angular2-socially" step="22.3"}}

Web version of the App component no longer needs web/mobile separation, it's going to use only web versions of all components.

Let's leave only the web version of the Login component inside `app.routes.ts`:

{{> DiffBox tutorialName="meteor-angular2-socially" step="22.5"}}

Since we're going to choose between mobile and web version of the App component we need to defer the bootstrap process somehow.

Let's wrap `bootstrap` with a function called `runWeb`:

{{> DiffBox tutorialName="meteor-angular2-socially" step="22.6"}}

Do the same but for the future mobile version:

{{> DiffBox tutorialName="meteor-angular2-socially" step="22.7"}}

Now we can run proper version of our app depending on `Meteor.isCordova`:

{{> DiffBox tutorialName="meteor-angular2-socially" step="22.8"}}

In the mobile environment, we need to wait for a device to be ready.
The `deviceready` event comes with help:

{{> DiffBox tutorialName="meteor-angular2-socially" step="22.9"}}

### Enhanced by Ionic

It seems like you're ready to start your journey with Ionic framework.

At the very beginning, we need to specify a navigation.
Let's put this inside `app.mobile.component.html`:

{{> DiffBox tutorialName="meteor-angular2-socially" step="22.10"}}

Now we can move on to create the App component:

{{> DiffBox tutorialName="meteor-angular2-socially" step="22.11"}}

As you can see, there is no `selector` defined.

> With Angular2, you can bootstrap your App using a component with any selector you want.
With ionic, that selector will be replaced with `ion-app`.

About other components:

> There is also no need to specify `selector` for other components but only if they are used as Pages.

Ionic is based on Pages. Think of it as a view that is very similar to Angular2 router's view.

Everything seems to be ready to be bootstraped. With Ionic, we won't be using Angular2's bootstrap, not even `angular2-meteor-auto-bootstrap`.

**Time for `ionicBootstrap`**

We have to use it to bootstrap an App. We also need to use few providers from `angular2-meteor`:

{{> DiffBox tutorialName="meteor-angular2-socially" step="22.12"}}

**Different selector problem**

Few steps ago I mentioned about `ion-app` selector. In Socially, we're using `<app/>` as the main component, so it's an issue for us, right now. But don't worry! We have a package for that! It's called [`ionic-selector`](https://github.com/jellyjs/ionic-selector).

We need to install it:

    $ meteor npm install ionic-selector --save

What it does? It's changing tag name of the main component (`app` by default but you can specify any selector you want) to `ion-app`.

An example:

```html
<body>
  <app class="main"></app>
</body>
```

will be changed to:

```html
<body>
  <ion-app class="main"></ion-app>
</body>
```

Let's now implement it:

{{> DiffBox tutorialName="meteor-angular2-socially" step="22.14"}}

**Ionicons**

Ionicons is a package that contains the premium icon font for Ionic Framework. It's 100% free and open source, which is amazing!

    $ meteor npm install ionicons --save

We could import the main scss file of ionicons directly in the `client/main.scss` but let's create a file called `ionic.scss` inside of `client/imports`:

{{> DiffBox tutorialName="meteor-angular2-socially" step="22.16"}}

**Adding styles**

We're not able to use the main scss file of ionic framework with Meteor but don't worry, we can fix it in few steps.

Let's copy the `ionic.scss` file from `node_modules/ionic-angular/ionic.scss`:

{{> DiffBox tutorialName="meteor-angular2-socially" step="22.17"}}

Now we can add proper prefix for each import:

{{> DiffBox tutorialName="meteor-angular2-socially" step="22.18"}}

Replace the import of `node_modules/ionic-angular/components.core.scss` with its contents:

{{> DiffBox tutorialName="meteor-angular2-socially" step="22.19"}}

Do the same for `fonts/ionicons`:

{{> DiffBox tutorialName="meteor-angular2-socially" step="22.20"}}

But let's remove two imports:

{{> DiffBox tutorialName="meteor-angular2-socially" step="22.21"}}

What's left? Paths update!

{{> DiffBox tutorialName="meteor-angular2-socially" step="22.22"}}

Since `ionic.scss` is ready, we can implement it inside the `client/main.scss` file:

{{> DiffBox tutorialName="meteor-angular2-socially" step="22.23"}}

There are plenty of issues with Material Design's and Ionic's CSS rules. Let's take care of one as an example, so it will be easier to fix in the future.

We will create a mechanism that adds `web` or `mobile` class to `<body/>` element depends on environment.

First thing to do is to defined those classes:

{{> DiffBox tutorialName="meteor-angular2-socially" step="22.24"}}

As you can see, we fixed an issue with scrollbar.

We all like JavaScript so let's move now to more interesting part! We will create a `setClass` function:

{{> DiffBox tutorialName="meteor-angular2-socially" step="22.25"}}

### Using Ionic components

Our main Page would be `PartiesList`, just like in the web version of Socially.

Since we want to keep the logic and only change a view, let's move whole PartiesList class to separate file `parties-list.class.ts`:

{{> DiffBox tutorialName="meteor-angular2-socially" step="22.26"}}

We need to add few import statements:

{{> DiffBox tutorialName="meteor-angular2-socially" step="22.27"}}

Let's also use `InjectUser` on that class:

{{> DiffBox tutorialName="meteor-angular2-socially" step="22.28"}}

We should also update the name:

{{> DiffBox tutorialName="meteor-angular2-socially" step="22.30"}}

It seems like we can move on to create a web version of PartiesList component.

First thing to do is to rename `parties-list.component.ts` to `parties-list.web.component.ts`.

Let's leave only necessary things:

{{> DiffBox tutorialName="meteor-angular2-socially" step="22.31"}}

What we removed here?

- `OnInit`
- Meteor related things: `Mongo`, `ReactiveVar`, `Counts`, `InjectUser`, `MeteorComponent`
- `Parties` collection with the `Party` interface

What we changed?

- Imported `PartiesList` class
- Extended `PartiesListComponent` with it
- Injected `PaginationService` and passed it to the parent class

We also have to change the `template` and renamed template file to `parties-list.web.component.html`:

{{> DiffBox tutorialName="meteor-angular2-socially" step="22.32"}}

Now we can create a basic view of the mobile version of App component:

{{> DiffBox tutorialName="meteor-angular2-socially" step="22.34"}}

And the class of that component:

{{> DiffBox tutorialName="meteor-angular2-socially" step="22.35"}}

Because we created two versions of PartiesList component, `app.routes.ts` needs to be updated:

{{> DiffBox tutorialName="meteor-angular2-socially" step="22.36"}}

We want to display a list of parties with RSVPs. We can achieve this by adding `RsvpPipe` to the component:

{{> DiffBox tutorialName="meteor-angular2-socially" step="22.37"}}

And by using `ionCard` component with few other very helpful components:

{{> DiffBox tutorialName="meteor-angular2-socially" step="22.38"}}

Let's set PartiesList component as the default Page of our App:

{{> DiffBox tutorialName="meteor-angular2-socially" step="22.39"}}

### Fixing jalik:ufs in development mode

There is an issue with `jalik:ufs` package but only in development mode.

UploadFS sets an absolute path of a file and saves it in collection.

So if you upload a file in development there might be a problem when running an app with a different port.

But we will take care of it!

{{> DiffBox tutorialName="meteor-angular2-socially" step="22.40"}}

Now we can just add it to the component:

{{> DiffBox tutorialName="meteor-angular2-socially" step="22.41"}}

and implement it in the view:

{{> DiffBox tutorialName="meteor-angular2-socially" step="22.42"}}

### Fixing fonts

As you probably notice, there are many warnings about missing fonts. We can easily fix it with the help of a package called [`mys:fonts`](https://github.com/jellyjs/meteor-fonts).

    $ meteor add mys:fonts

That plugin needs to know which font we want to use and where it should be available.

Configuration is pretty easy, you will catch it by just looking on an example:

{{> DiffBox tutorialName="meteor-angular2-socially" step="22.44"}}

Now `roboto-regular.ttf` is availbe under `http://localhost:3000/fonts/roboto-regular.ttf`.

And... You have an app that works with Ionic!

## Summary

In this tutorial we showed how to use Ionic and how to separate the whole view for both, web and mobile.

We also learned how to share component between platforms, and change the view only!

We also used Ionic directives in order to provide user-experience of mobile platform instead of regular responsive layout of website.

{{/template}}
