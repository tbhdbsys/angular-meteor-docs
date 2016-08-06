{{#template name="tutorials.socially.angular2.step_00.md"}}

Let's start building our Angular 2.0 Meteor Socially app.

In this step, we will:

- Setup Meteor and create a working app
- Become familiar with the app's structure
- Connect an Angular 2 front end
- Run the application in the browser

# Meteor Setup

First step — let's install Meteor!

Open your command line and paste this command:

    $ curl https://install.meteor.com/ | sh


> If you are on a Windows machine, go [here](https://www.meteor.com/install) to install Meteor.

Now let's create our app — write this in the command line:

    $ meteor create --example angular2-boilerplate socially
    
Alternatively, use your web browser to access the link:

    https://github.com/bsliran/angular2-meteor-base
    
Download the template application, and unzip the files inside. Rename the folder to "socially" and place it into the default directory.

Now, we install npm packages:

    $ npm install

(Note: More explanation on NPM packages on the bottom of the page.)

Now let's see what we've got. Go into the new folder:

    $ cd socially

Run the app like so:

    $ meteor

    => Started proxy
    => Started MongoDB.
    => Started your app.
    >=> App running at: http://localhost:3000/

Now go to [http://localhost:3000/](http://localhost:3000/)
and look at the amazing app that's running on your computer!

We now have a fully functional app which includes both a server and a client!

We are going to add our own files for this tutorial. So let's start by deleting these files:

    - /client             (delete)
    - /both               (delete)
    - /server             (delete)

Now we can start building our app.

Create a new `index.html` file in the client folder, and place this code inside. Then run the app again.

{{> DiffBox tutorialName="meteor-angular2-socially" step="0.3"}}

And Meteor build tool refreshes automatically and our app is updated in the browser.

Note that there is no `<html>` tag and no `<head>` tags in our code.

This is because of how Meteor structures and serves files to the client.

Meteor scans all the HTML files in your application and concatenates them together to make it simpler for us.

Concatenation means merging the content of all `HTML`, `HEAD` and `BODY` tags found inside these HTML files together.

So in our case, Meteor found our `index.html` file, recognized it was meant for the client only (because it's inside the `client` folder), found the `BODY` tag inside and added it's content to the `BODY` tag of the main generated file.

> (`right-click` -> `inspect element` on the page to see the generated file Meteor served to the client)

## Typescript

An Angular 2 Meteor app can be written in regular JavaScript (ES5), the new JavaScript (ES2015 aka ES6) or TypeScript on both the server and the client.

TypeScript is the recommended choice by the Angular team so in this tutorial, we'll be using TypeScript.

Don't worry if you're not familiar with TypeScript. Valid ES6 or ES5 JavaScript is a valid TypeScript and we will explain new concepts when we would need them in the tutorial.

> If you'd like to deep dive into TypeScript, we recommend the [official tutorial](http://www.typescriptlang.org/Tutorial).

Those are the basic configurations to run an Angular 2.0 Meteor app.

```json
{
  "compilerOptions": {
    "target": "es5",
    "module": "commonjs",
    "isolatedModules": false,
    "moduleResolution": "node",
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true,
    "removeComments": false,
    "noImplicitAny": false,
    "sourceMap": true
  },
  "exclude": [
    "node_modules"
  ],
  "compileOnSave": false
}
```

To learn more about Typescript compiler options, [click here](http://www.typescriptlang.org/docs/handbook/compiler-options.html).

### TypeScript Typings

We need to let Typescript know about all the types in the libraries we depend upon.

In order to do that — thus adding full type-checking support at this stage — we'll use a special tool for typings installation
and management called `typings`. You can find more information about it [here](https://github.com/typings/typings).

If you look into the typings folder, you'll find there a definition file called `index.d.ts`.

This is a top level definition file that links all other definition files installed by `typings`.

> Note that in some cases, your IDE can mark your code as "error" or "warning" because of missing Typings - this will not prevent you from running your app, but it is highly recommended to resolve those errors.

> Also in order to be able to use typings properly, it is recommended to install [node.js](https://nodejs.org).

# Root Component

Angular 2 code is structured as a tree of components.

Each component is a controller with an attached view.

Since it's a tree, there should be a root component and branch components
that stem out of it. So let's create our root component.

Create a new `app.component.ts` file inside of the `client` folder.

{{> DiffBox tutorialName="meteor-angular2-socially" step="0.4"}}

First we're importing the dependency we needed from `@angular/core`.

Notice, the Component's selector matches the `<app>` tag we will provide in `index.html` below, and the View template creates the view.

The class, AppComponent, inherits from `@Component` which is part of Angular 2.

We have defined the component, let's create the template:

{{> DiffBox tutorialName="meteor-angular2-socially" step="0.5"}}

Now, we can use it inside of the component:

{{> DiffBox tutorialName="meteor-angular2-socially" step="0.6"}}

**About templates**

Thanks to `angular2-compilers` package, we can import any html file into TypeScript space as a module.
"But what we get from that module?" You ask. The answer is simply, it's a string. `angular2-compilers` converts html file's contents into string.

> Since a component doesn't exist without its template, **we recommend** you to use a ***template as a string*** method, instead of loading it asynchronously (`templateUrl`).

> In our opinion, this is the best practice of creating components.

Finally, we can `bootstrap` our component, thus, marking it as the root component.

First thing to do is to add `<app/>` element to the `<body/>`:

{{> DiffBox tutorialName="meteor-angular2-socially" step="0.7"}}

Great! We still need to tell the Angular2 framework which component should be loaded:

{{> DiffBox tutorialName="meteor-angular2-socially" step="0.8"}}

As you can see, we used `angular2-meteor-auto-bootstrap` package.

In order to make Angular understand Meteor, `angular2-meteor` includes providers.

Adding those providers to each component is annoying so we've added a new `bootstrap` that overrides the basic bootstrap method from `@angular/platform-browser-dynamic` and adds some those additional providers to your app.

Let's run the app:

    $ meteor

> If the template doesn't change, it may be because your browser is caching the original template.
> Learn [how to disable caching during development](https://developer.chrome.com/devtools/docs/settings) in Chrome.

And we have our first Angular 2.0 Meteor app working!

Let's go through some of the technologies we used till now:

# npm

Npm stands for Node Packages Manager, which manages your dependencies and external packages.

Meteor supports NPM packages (starting from 1.3), and when we created our project - a file named `package.json` was created - this file contains the project's npm dependencies and some other metadata.

To install the current project dependencies, type in the command line `npm install`.

We also used Meteor packages (`meteor add ...`).  Meteor packages have some abilities that npm packages don't have yet so we will use some packages from there as well.

## ES6 Modules and CommonJS

Meteor supports [ES6 modules](https://developer.mozilla.org/en/docs/web/javascript/reference/statements/import) out of the box.

This feature provides the ability to use `import` / `export` statements and gives you a full control for modules loading and dependencies.

You can read more about how modules work and how it's based on CommonJS [on the Meteor docs](http://docs.meteor.com/#/full/modules).


# Summary

Let's continue to [step 1](/tutorials/angular2/static-template) and add some content to our application.

{{/template}}
