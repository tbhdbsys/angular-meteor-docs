{{#template name="migration.angular2.coexistence.md"}}

# Coexistence

This chapter will teach you how to add Angular 2 to your Blaze application and how to use both platforms at the same time.

We need coexistence of this two platform because we want to update our components step-by-step.

## What it takes?

To achieve coexistence, we need to understand few things:

1. Both Angular 2 and Blaze have a HTML files compiler - which means that we need to find a way to make a difference between the two HTML file types.

2. Angular 2 application usually written in TypeScript, while Blaze application written in ES2016 - so need need to make sure we can run both at the same time.

## How to start?

First, let's solve the HTML issue.

Your Blaze project already uses `blaze-html-templates` package, and it compiles files with `.html` extensions which means that we can't use that extension for Angular 2 HTML files.

Angular 2 has it's own HTML compiler package for Meteor, which is a part of Angular2-Meteor stack - it called `angular2-compilers`, but we can't use it because it also handles `.html` files - and Meteor allow only one compiler for each extensions.

Our solution is this case is to use `angular2-with-blaze-compilers` package, which is similar to the original package - only uses the `.ng2.html` extension instead.

> The compilers package contains compilers for LESS, TypeScript, HTML and templates files.

So let's add the package to our project:

       meteor add angular2-with-blaze-compilers

> Make sure that use Meteor <= 1.3.1 in your project.

If you already have in your project any other package that handles TypeScript or LESS files, please remove those packages by using `meteor remove` command.

#### How to know if it works?

Create a file named `client/angular-test.ng2.html` and put any content you want inside of it - now go to your browser and try to open the following URL:

http://localhost:3000/client/angular-test.html

> Note that we access the file without the `.ng2` in the browser! the `.ng2` is only there for the compiler to understand that this file is Angular 2 HTML template.

#### Adding Angular 2 and Angular2-Meteor

So now our application is capable to use both Angular 2 and Blaze at the same time - we are only missing the actual Angular 2 package.

We will add Angular2-Meteor and Angular 2 core from NPM:

    meteor npm install --save angular2-meteor @angular/platform-browser-dynamic

We also need to import Angular 2 dependencies, we also want to make sure that this dependencies loaded first and once, so in order to verify it we created an Atmosphere package that import the required dependencies.

Let's add the Angular 2 dependencies package:

    meteor add barbatus:angular2-runtime

> That's it! now our app can run both Angular 2 and Blaze and we can start coding!

## Create Angular 2 Application

So now we need to create Angular 2 application.

## Load Angular 2 Components inside Blaze Template

Our next step of coexistence is to load Angular 2 Component inside our already running app.

So let's understand how to do it.


{{/template}}
