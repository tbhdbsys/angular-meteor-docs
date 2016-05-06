{{#template name="tutorials.socially.angular2.step_00.md"}}

> Disclaimer: Angular 2 isn't stable yet, and the API might change. For now, consider this tutorial for educational purposes.

Let's start building our Meteor Angular 2 Socially app.

In this step, we will:

- Setup Meteor and create an app
- Become familiar with the app's structure
- Connect an Angular 2 front end
- Run the application in the browser

# Meteor Setup

First step — let's install Meteor!

Open your command line and paste this command:

    $ curl https://install.meteor.com/ | sh

> If you are on a Windows machine, go [here](https://www.meteor.com/install) to install Meteor.

Now let's create our app — write this in the command line:

    $ meteor create socially

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

The default Meteor app starts life with three files in the `client` directory: one `js`, one `html` and one `css` file.

We are going to add our own files for this tutorial. So let's start by deleting these files:

    - /client/main.css    (delete)
    - /client/main.html   (delete)
    - /client/main.js     (delete)

Now we can start building our app.

Create a new `index.html` file in the client folder, and place this code inside. Then run the app again.

{{> DiffBox tutorialName="meteor-angular2-socially" step="0.1"}}

Note that there is no `<html>` tag and no `<head>` tag - it's very simple.

This is because of how Meteor structures and serves files to the client.

Meteor scans all the HTML files in your application and concatenates them together.

Concatenation means merging the content of all `HTML`, `HEAD` and `BODY` tags found inside these HTML files together.

So in our case, Meteor found our `index.html` file, recognized it was meant for the client only, found the `BODY` tag inside and added it's content to the `BODY` tag of the main generated file.

> (right-click -> inspect element on the page to see the generated file)

In the following steps we will go through some basics you should know, if you already familiar with them - you can skip the following.


# npm

Npm stands for Node Packages Manager, which manages your dependencies and external packages.

Meteor support NPM packages (starting from 1.3), and when we created our project - a file named `package.json` created - this file contains the dependencies and some other metadata regarding the project.

## CommonJS

Meteor 1.3 comes with CommonJS implementation which provides the ability to use `import` / `export` statements and gives you a full solution for modules loading.

Note that Angular 2.0 examples and tutorials mostly use SystemJS - which is another modules loader.

You can also use SystemJS, but we recommend to use CommonJS because it is built-in in Meteor 1.3.


## TypeScript

In this tutorial, we'll be using TypeScript. Don't worry if you're not familiar with TypeScript. Valid ES6 or ES5 JavaScript is valid TypeScript.

TypeScript just adds more optional features to JavaScript such as types & interfaces. You'll be able to do this tutorial fine without understanding what these are yet; but if you'd like to learn more try the TypeScript tutorial. ([Learn more](http://www.typescriptlang.org/Tutorial)).

An Angular 2 app can be written in regular JavaScript (ES5), the new JavaScript (ES2015 aka ES6) or TypeScript.

If you've chosen ES6 or TypeScript, it will eventually need to compile code into ES5 — the only language currently fully supported in modern browsers (see the [ES6 compatibility table](https://kangax.github.io/compat-table/es6/)). ES6 can be compiled to ES5 using [Babel](https://babeljs.io/) or [Traceur](https://github.com/google/traceur-compiler/wiki/Getting-Started), while Typescript has its own compiler.

TypeScript is the recommended choice by the Angular team. This is due to several reasons, one of them being that TypeScript provides the most advanced support of [decorators](http://rbuckton.github.io/ReflectDecorators/typescript.html) compared with other compilers. Decorators are still considered an experimental feature that will likely appear only in ES7, so most compilers
don't fully support them. What are decorators and how are they used in Angular 2? You'll learn more a bit later.

Besides decorator and ES6 support, TypeScript offers an opt-in type system with type-checking handled at run-time or through one of several [Typescript editor plugins](https://github.com/Microsoft/TypeScript/wiki/TypeScript-Editor-Support).

The Angular2-Meteor packages comes with a built-in TypeScript compiler plugin, which means you don't need to worry about installing additional compiler packages.

As you might already know, there are new `import` and `export` statements in ES6 to help structure your app into isolated modules.

TypeScript can compile each file into a separate module. Let's learn how we are going to use modules in our app.

TypeScript uses a file called `tsconfig.json`, so let's create it and use some default configuration:

{{> DiffBox tutorialName="meteor-angular2-socially" step="0.3"}}

Now let's understand some of the configuration we just added:

* `module` - we will use `commonjs` because that is the modules loader that Meteor 1.3 implements, so we want our TypeScript code to compile into CommonJS modules.
* `target` - specify `es5` because that's the ECMAScript version that Meteor knows how to use.
* `moduleResolution` - Meteor 1.3 supports NPM, so we will use it to get our dependencies.
* `emitDecoratorMetadata`, `experimentalDecorators` - we use these because Angular 2.0 uses decorators.

We use some more compiler options - if you want to enrich your TypeScript knowledge, you can read [here](http://www.typescriptlang.org/docs/handbook/compiler-options.html).

# Getting started with Angular 2

It's time to add Angular 2 to our stack!

First things first, let's understand a few things:

Meteor 1.3 comes with support for NPM packages - which means that we can just add Angular 2 from NPM.

Note that Meteor 1.3 still supports it's own packages system - Atmosphere - and it is still required because there are some Meteor features (such as custom files compiler and packages isolation) that are available only when using Atmopshere package.

Angular2-Meteor is splitted to two packages: an Atmosphere package that contains compilers (HTML compiler and TypeScript compiler) and NPM package which contains Angular2-Meteor data solution and the actual connection to Meteor's data solution.

Angular2-Meteor also provied a package named `barbatus:angular2-runtime` which add the core dependencies of Angular 2 by default - it's optional and you can add the dependencies by yourself - but we recommend to add it as well.

So first, we need to add the compilers package, back in the command line, launch this command:

    $ meteor add angular2-compilers
    $ meteor add barbatus:angular2-runtime

And then add the meteor package, by running:

    $ meteor npm install --save angular2-meteor

> Note that this will update your `package.json` with a new dependency.

> You might see a lot of warning messages if you are using NPM v2, it is okay and if you are interested to know more about these warning, you can [read here](http://blog.npmjs.org/post/110924823920/npm-weekly-5).

That's it! Now we can use Angular 2's power in our Meteor app!

## HTML

As you already know, Meteor processes all HTML files for you out of the box. Files will be concatenated into one page.

From the other side, regular Angular (Angular 1 or Angular 2) apps have a modular structure, i.e., consist of a set of template HTML files and JavaScript component files. Each template file might belong to some component, for example, to a custom directive.

It means we would rather avoid concatenating all of them to let Angular 2 components to load template files at the moment they need to.

That's why `angular2-compilers` overrides standard Meteor HTML processor.

Let's remove the standard HTML processor by:

    $ meteor remove blaze-html-templates

This package has its own HTML processor that recognizes two types of HTML files: one type — files that contain `<HEAD>` and `<BODY>` tags, everything else — considered as template files.

If you have multiple HTML files with, say, `<BODY>` tags, they will be concatenated together into one file in the same way as the standard HTML processor.

At the same time, template files are not touched by the processor at all and won't appear on the page initially.

They will be loaded by appropriate Angular 2 components at the time they are going to be rendered on the page.

# Root Component

Angular 2 code is structured like a tree of components inside of each other, where each component
is a controller with an attached view. Since it's a tree, there should be a root component and branch components
that stem out of it. So let's create our root component.

Create a new `app.ts` file inside of the `client` folder.

Now you can see another example of Meteor's power and simplicity - no need to include this file anywhere. Meteor will take care of it by going through all the files in the folder and include them automatically.

Let's continue defining our Angular 2 application module.

{{> DiffBox tutorialName="meteor-angular2-socially" step="0.6"}}

And let's create the `.html` file:

{{> DiffBox tutorialName="meteor-angular2-socially" step="0.7"}}

First we're importing the dependencies we needed from `angular2/core` and `angular2/platform/browser`. This is not a folder and files in your directory, but a reference to CommonJS modules aliased as `angular2/core` and `angular2/platform/browser`, which in fact located under you `node_modules` directory.

They are some of the Angular 2 main modules that are available as part of the `urigo:angular2-meteor` package.

One of the great architectural innovation of Angular 2 is that an app written with Angular 2 can run on different
platforms - as you can see in our case, we are bootstrapping using the bootstrap from the "browser" platform since our app is a regular Web app to run in a browser.

Notice the `@` syntax. In Angular 2, these are called Annotations. They are similar to a new feature coming to ES7 called Decorators.
From a consumers point of view, they are almost the same except Decorators are a proposed standard allowing us to add class metadata while Angular 2's Annotations are a realization of that metadata, implemented with the help of Decorators in TypeScript.
You can read more about the differences between the two [here](http://blog.thoughtram.io/angular/2015/05/03/the-difference-between-annotations-and-decorators.html).

For now, consider Annotations an elegant way to add metadata to classes.

Also notice, the Component's selector matches the `<app>` tag we will provide in `index.html` below, and the View template creates the view.

The class, Socially, inherits from `@Component` which is part of Angular 2.

Finally, we `bootstrap` our component, thus, marking it as the root component. An Angular 2 app can have multiple root components, but components must exist together within the same root in order to communicate with each other.

## Run the App

The only thing left before we can run our app is to import the root module and
add the `<app>` tag to `index.html`.

As you've already learned, the package uses System.js to manage ES6 modules, but System.js
does not know anything about our `app` module.

So let's manually import our `app` module and add the `<app>` tag to `index.html` as follows:

{{> DiffBox tutorialName="meteor-angular2-socially" step="0.8"}}

This will load HTML and JavaScript code necessary to launch our app.

> guarantees app loading at the appropriate time, when all necessary parts are ready.

Importing the root module every time looks like a repetitive task.
Here comes some good news — the Angular 2 package recognizes the file named `app.ts`.
If you have one in the app root folder, the package will import it for you without even having to ask.

Let's run the app:

    $ meteor

> If the template doesn't change, it may be because your browser is caching the original template.
> Learn [how to disable caching during development](https://developer.chrome.com/devtools/docs/settings) in Chrome.

## TypeScript Typings

At this moment you might see no errors from the TypeScript compiler because of the `tsconfig.json` we created earlier.

But soon, it a few steps forward, we will might encounter warnings from the TypeScript compiler regarding Meteor packages (such as `meteor/meteor` or `meteor/tracker`).

To avoid those errors - we need to add Typings for packages that aren't built with TypeScript or for packages that does not share it's Typings by default.

> Angular2-Meteor and Angular 2 provides its own typings inside the NPM folder, and you do no need to install the typings from external sources.

You will need to reference and let the TypeScript compiler know about external packages that in use - there are 2 ways of doing that:

 - One way is to directly reference typings files (`.d.ts` extension) using a special sugared syntax at the top of your TypeScript code file, for example:

        /// <reference path="typings/angular2-meteor/angular2-meteor.d.ts" />

        import {Component} from 'angular2/core';
        import {bootstrap} from 'angular2/platform/browser';

 - Another way is to create a custom [TypeScript configuration file](https://github.com/Microsoft/TypeScript/wiki/tsconfig.json) with the "files" (or "filesGlob") property set to include all required typings files.

This configuration file should be called `tsconfig.json` and placed at
the app root folder.

We will see more examples and usage with the `tsconfig.json` file later in the tutorial.

Let's make use of the typings in the second way. Angular 2 and the Meteor API will be
used in pretty much every file of our app, so adding declaration files manually might become repetitive.

Let's dive into an example for typings (`.d.ts`) file - you can see Angular2-Meteor file, inside `node_modules/angular2-meteor/meteor_component.d.ts`.

You notice that this file contain only declaration and does not have code inside - the code is inside the corresponding compiled `.js` file, and this file required for lint and type-checks only.

If you look into, you'll see there references to Angular 2 and Meteor API.

Libraries like ES6 Promise etc are so called ambient dependencies, which
means they provide information about the environment and should be available globally.

In order to install them — thus adding full type-checking support at this stage — we'll use a special tool for typings installation
and management called `typings`.

What's great about this tool is that it can install typings from different locations whether it's a Github repo, local folder, a NPM or even some HTTP path.
You can find more information about it [here](https://github.com/typings/typings).

In our case, we'll need to execute commands as follows to install all dependencies:

        $ npm install typings -g
        $ typings init
        $ typings install es6-promise --save
        $ typings install es6-shim --ambient --save

> Note that "es6-shim" for "npm" is not found in the registry now. You need install it with the ambient flag.

If you look into the typings folder after the execution, you'll find there a definition file called `main.d.ts`.

This is a top level definition file that links all other definition files installed by `typings`.

So now only one Typing is missing - which is the Meteor typings file - you need to execute this command to install.

        $ typings install registry:env/meteor --ambient

> Note that in some cases, your IDE can mark your code as "error" or "warning" because of missing Typings - there will not prevent you from running your app, but it is highly recommended to resolve those errors.

> We recommend to try and find typings for all of your packages.

**As a best practice, we recommend to add `"moduleResolution": "node"` to you `tsconfig.json` file, so TypeScript will automatically find typings and `.d.ts` files in your `node_modules` directory.**

# Summary

Let's continue to [step 1](/tutorials/angular2/static-template) and add some content to our application.

{{/template}}
