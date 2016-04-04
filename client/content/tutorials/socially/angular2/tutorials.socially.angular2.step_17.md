{{#template name="tutorials.socially.angular2.step_17.md"}}
{{> downloadPreviousStep stepName="step_16"}}

In this chapter we will add Twitter's bootstrap to our project, and add some style and layout to the project.

At the moment, this tutorial we will use only Bootstrap's CSS file and not the JavaScript - but note that you can use all the features of Boostrap 4.

# Adding and importing Bootstrap 4

First, we need to add Boostrap 4 to our project - so let's do that.

Run the following command in your Terminal:

    $ meteor npm install bootstrap4-webpack-package --save

> At this time, you cannot use the original Boostrap 4 package from NPM, and a wrapper is needed. Meteor 1.3.1 should resolve this issue. [Click for more information about this issue](https://github.com/meteor/meteor/issues/6098).

To import it into the project, add the following line in the top of you `app.ts`:

{{> DiffBox tutorialName="meteor-angular2-socially" step="17.2"}}

And it will import Boostrap's CSS to your project.

# First touch of style

Now let's add some style! we will add navigation bar in the top of the page.

We will also add a container with the `router-outlet` to keep that content of the page:

{{> DiffBox tutorialName="meteor-angular2-socially" step="17.3"}}

# Add LESS

OK, simple styling works, but we want to be able to use [LESS](http://lesscss.org/).

We can't add LESS from NPM because it is a compiler and we want it to be a part of Meteor build - so we will add it from Atmosphere:

    $ meteor add less

We will use LESS in a few steps!

# Moving things around

So first thing we want to do now, is to move the login buttons to another place - let's say that we want it as a part of the navigation bar.

So first let's remove it from it's current place (parties list), first the view:

{{> DiffBox tutorialName="meteor-angular2-socially" step="17.5" filename="client/imports/parties-list/parties-list.html"}}

And from the `PartiesList` component:

{{> DiffBox tutorialName="meteor-angular2-socially" step="17.5" filename="client/imports/parties-list/parties-list.ts"}}

And add it to the main component, which is the component that responsible to the navigation bar, so the view first:

{{> DiffBox tutorialName="meteor-angular2-socially" step="17.6"}}

And do not forget that we need to import it:

{{> DiffBox tutorialName="meteor-angular2-socially" step="17.7"}}

# Fonts and FontAwesome

Meteor gives you the control of your `head` tag, so you can import fonts and add your `meta` tags.

We will add a cool font and add [FontAwesome](https://fortawesome.github.io/Font-Awesome/) style file, which also contains it's font:

{{> DiffBox tutorialName="meteor-angular2-socially" step="17.8"}}

# Some more style

So now we will take advantage of all Bootstrap's features - first let's update the layout of the form:

{{> DiffBox tutorialName="meteor-angular2-socially" step="17.9"}}

And now the parties list:

{{> DiffBox tutorialName="meteor-angular2-socially" step="17.10"}}

# Use LESS

Now it's time to use less for that first time! The LESS compiler looks for `.less` files - so let's remove our old `main.css` file first.

Now we want to add a `.less` file, and we will create LESS style file for each component.

We will also add `.import` to the file, to indicate the LESS compiler that this is just an import file and not the main LESS files - we will load those files in our main LESS file.

So let's start with the parties list, and add some style (it's not that critical at the moment what is the effect of those CSS rules)

{{> DiffBox tutorialName="meteor-angular2-socially" step="17.11" filename="client/imports/parties-list/parties-list.import.less"}}

And now let's add LESS file for the party details:

{{> DiffBox tutorialName="meteor-angular2-socially" step="17.12"}}

And use those new cool styles in the view of the party details:

{{> DiffBox tutorialName="meteor-angular2-socially" step="17.13"}}

And now we will add a main LESS file, which imports the files we created, and also defines some colors:

{{> DiffBox tutorialName="meteor-angular2-socially" step="17.11" filename="client/style/main.less"}}

# Summary

So in this chapter of the tutorial we added Boostrap library and used it's layout and CSS styles.

We also learnt how to integrate LESS compiler with Meteor and how to create isolated LESS styles for each component.

{{/template}}
