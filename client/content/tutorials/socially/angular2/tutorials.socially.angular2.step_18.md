{{#template name="tutorials.socially.angular2.step_18.md"}}
{{> downloadPreviousStep stepName="step_17"}}

In this chapter we will add angular2-material to our project, and update some style and layout in the project.

Angular2-material documentation of each component can be found [here](https://github.com/angular/material2/tree/master/src/components).

# Removing Bootstrap 4

First, let's remove our previous framework (boostrap) by running:

    $ meteor npm uninstall --save bootstrap

And let's remove the import from the `main.sass` file:

{{> DiffBox tutorialName="meteor-angular2-socially" step="18.2"}}

# Adding angular2-material

Now we need to add angular2-material to our project - so let's do that.

Run the following command in your Terminal:

    $ meteor npm install @angular2-material/core @angular2-material/button @angular2-material/card @angular2-material/checkbox @angular2-material/input @angular2-material/toolbar --save

We installed:

- core package
- button
- card
- checkbox
- input
- toolbar


Like we did in the previous chapter - let's take care of the navigation bar first.

We use directives and components from Angular2-Material - such as `md-toolbar`.

In order to use `md-toolbar`, we need to import `MdToolbar` directive in our main component:

{{> DiffBox tutorialName="meteor-angular2-socially" step="18.4"}}

And use it in the main component's template:

{{> DiffBox tutorialName="meteor-angular2-socially" step="18.5"}}

# PartiesForm component

Let's replace the `label` and the `input` with simply the `md-input` and `md-checkbox` and make the `button` look material:

{{> DiffBox tutorialName="meteor-angular2-socially" step="18.6"}}

We use the `mdInput` component which is a wrapper for regular HTML input with style and cool layout.

We still have to add directives according to our changes:

{{> DiffBox tutorialName="meteor-angular2-socially" step="18.7"}}

# PartiesList component

PartiesForm component is done, so we can move one level higher in the component's tree. Time for the list of parties:

{{> DiffBox tutorialName="meteor-angular2-socially" step="18.8"}}

As you probably know, we need import proper directives:

{{> DiffBox tutorialName="meteor-angular2-socially" step="18.9"}}

To make it all look so much better, let's add couple of rules to css:

{{> DiffBox tutorialName="meteor-angular2-socially" step="18.10"}}

# PartyDetails component

We also need to update the PartyDetails component:

{{> DiffBox tutorialName="meteor-angular2-socially" step="18.11"}}

{{> DiffBox tutorialName="meteor-angular2-socially" step="18.12"}}

# Custom Authentication Components

Our next step will replace the `login-buttons` which is a simple and non-styled login/signup component - we will add our custom authentication component with custom style.

First, let's remove the login-buttons from the navigation bar, and replace it with custom buttons for Login / Signup / Logout.

We will also add `routerLink` to each button, and add logic to hide/show buttons according to the user's login state:

{{> DiffBox tutorialName="meteor-angular2-socially" step="18.13"}}

Let's use `InjectUser` decorator, just like we did in one of the previous chapters.

{{> DiffBox tutorialName="meteor-angular2-socially" step="18.14"}}

As you can see, we used `DisplayNamePipe` in the view so we have to import it.

We also implemented `logout()` method with `Meteor.logout()`. It is, like you probably guessed, to log out the current user.

Now we can move on to create three new components.

### Login component

First component, is to log in user to the app.

We will need a form and the login method, so let's implement them:

{{> DiffBox tutorialName="meteor-angular2-socially" step="18.15"}}

You previously created a form by yourself so there's no need to explain the whole process once again.

About the login method.

Meteor's accounts system has a method called `loginWithPassword`, you can read more about it [here](http://docs.meteor.com/api/accounts.html#Meteor-loginWithPassword).

We need to provide two values, a email and a password. We could get them from the form.

In the callback of Meteor.loginWithPassword's method, we have the redirection to the homepage on success and we're saving the error message if login process failed.

Let's add the view:

{{> DiffBox tutorialName="meteor-angular2-socially" step="18.16"}}

We also need to define the `/login` route:

{{> DiffBox tutorialName="meteor-angular2-socially" step="18.17"}}

### Signup component

The Signup component looks pretty much the same as the Login component. We just use different method, `Accounts.createUser()`. Here's [the link](http://docs.meteor.com/api/passwords.html#Accounts-createUser) to the documentation.

{{> DiffBox tutorialName="meteor-angular2-socially" step="18.18"}}

And the view:

{{> DiffBox tutorialName="meteor-angular2-socially" step="18.19"}}

And the `/signup` route:

{{> DiffBox tutorialName="meteor-angular2-socially" step="18.20"}}

### Recover component

This component is helfup when a user forgets his password. We'll use `Accounts.forgotPassword` method:

{{> DiffBox tutorialName="meteor-angular2-socially" step="18.21"}}

Create the view:

{{> DiffBox tutorialName="meteor-angular2-socially" step="18.22"}}

And add the `/reset` route:

{{> DiffBox tutorialName="meteor-angular2-socially" step="18.23"}}

That's it! we just implemented our own authentication components using Meteor's Accounts API and Angular2-Material!

# Summary

In this chapter we replaced Boostrap4 with Angular2-Material, and updated all the view and layout to match the component we got from it.

We also learnt how to use Meteor's Accounts API and how to implement authentication view and components, and how to connect them to our app.

{{/template}}
