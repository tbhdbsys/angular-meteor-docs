{{#template name="tutorials.socially.angular2.step_18.md"}}
{{> downloadPreviousStep stepName="step_17"}}

In this chapter we will add Ng2Material to our project, and update some style and layout in the project.

Ng2Material documentation can be found [here](https://justindujardin.github.io/ng2-material/), and we recommend to read it before this chapter, because we will use it's components now.

# Removing Bootstrap 4

First, let's remove our previous framework (boostrap) by running:

    $ meteor npm uninstall bootstrap4-webpack-package --save

And let's remove the import from the `app.ts` file:

{{> DiffBox tutorialName="meteor-angular2-socially" step="18.2"}}

# Adding and importing Ng2Material

Now we need to add Ng2Material to our project - so let's do that.

Run the following command in your Terminal:

    $ meteor npm install ng2-material --save

Now we will import it in the main page, we also need to declare that we are going to use `MATERIAL_DIRECTIVES` which is a shorthand for all of the components and directives that Ng2Material exports, and also import the module's providers in our `bootstrap` call:

{{> DiffBox tutorialName="meteor-angular2-socially" step="18.4"}}

> Note that our import in the main page is from `ng2-material/all.webpack` which have the CSS stylesheet bundled inside, and the next import is from another path without the CSS because it is needed to load only once!

And let's update our fonts to the Material official fonts:

{{> DiffBox tutorialName="meteor-angular2-socially" step="18.5"}}

That's it - now we can use it!

# Use Ng2Material

Like we did in the previous chapter - let's take care of the navigation bar first.

We use directives and components from Ng2Material - such as `md-toolbar`, and we will also use Ng2Material grid system (`flex-gt-sm`):

{{> DiffBox tutorialName="meteor-angular2-socially" step="18.6"}}

Now let's take care of the parties form, we also need to import the directives of Ng2Material first:

{{> DiffBox tutorialName="meteor-angular2-socially" step="18.7"}}

And now let's update it's layout:

{{> DiffBox tutorialName="meteor-angular2-socially" step="18.8"}}

We use the input wrapper (`md-input` and `md-input-container`) which are wrappers with style and cool layout.

And now import the directives into the parties list:

{{> DiffBox tutorialName="meteor-angular2-socially" step="18.9"}}

And now update the parties list layout:

{{> DiffBox tutorialName="meteor-angular2-socially" step="18.10"}}

Now we need to make some changes in the LESS in order to get better result, so let's start with the parties list LESS file:

{{> DiffBox tutorialName="meteor-angular2-socially" step="18.11"}}

Now let's add the import in the party details component:

{{> DiffBox tutorialName="meteor-angular2-socially" step="18.12"}}

And update it's layout:

{{> DiffBox tutorialName="meteor-angular2-socially" step="18.13"}}

# Custom Authentication Components

Our next step will replace the `login-buttons` which is a simple and non-styled login/signup component - we will add our custom authentication component with custom style.

First, let's remove the `login-buttons` from the navigation bar, and replace it with custom buttons for Login / Signup / Logout.

We will also add `routerLink` to each button, and add logic to hide/show buttons according to the user's login state:

{{> DiffBox tutorialName="meteor-angular2-socially" step="18.14"}}

Now we need to define the new routes in the `app.ts` file, where we defined our previous routes. We all use `InjectUser()` decorator to inject the user data into the component, so the `ngIf` and `[hidden]` we added will work:

{{> DiffBox tutorialName="meteor-angular2-socially" step="18.15"}}

And let's create the login component:

{{> DiffBox tutorialName="meteor-angular2-socially" step="18.16"}}

In this component we use Meteor's accounts, and use the Accounts API to login our user with email and password.

And the login view:

{{> DiffBox tutorialName="meteor-angular2-socially" step="18.17"}}

Signup component:

{{> DiffBox tutorialName="meteor-angular2-socially" step="18.18"}}

In this component we use Meteor's accounts, and use the Accounts API to add a new user.

And signup view:

{{> DiffBox tutorialName="meteor-angular2-socially" step="18.19"}}

We also have "Recover" button in the login page, so let's create a component that handles that:

{{> DiffBox tutorialName="meteor-angular2-socially" step="18.20"}}

And it's view:

{{> DiffBox tutorialName="meteor-angular2-socially" step="18.21"}}

Our last missing piece is the Logout feature, which we will add in the main component, because it is located in the navigation bar:

{{> DiffBox tutorialName="meteor-angular2-socially" step="18.22"}}

That's it! we just implemented our own authentication components using Meteor's Accounts API and Ng2Material!

# Summary

In this chapter we replaced Boostrap4 with Ng2Material, and updated all the view and layout to match the component we got from Ng2Material.

We also learnt how to use Meteor's Accounts API and how to implement authentication view and components, and how to connect them to our app.

{{/template}}
