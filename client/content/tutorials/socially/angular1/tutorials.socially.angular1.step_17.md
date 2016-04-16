{{#template name="tutorials.socially.angular1.step_17.md"}}
{{> downloadPreviousStep stepName="step_16"}}

In this chapter we will add Twitter's bootstrap to our project, and add some style and layout to the project.

At the moment, this tutorial we will use only Bootstrap's CSS file and not the JavaScript - but note that you can use all the features of Boostrap 4.

# Adding and importing Bootstrap 4

First, we need to add Boostrap 4 to our project - so let's do that.

Run the following command in your Terminal:

    $ meteor npm install bootstrap@4.0.0-alpha.2 --save

{{> DiffBox tutorialName="meteor-angular1-socially" step="17.4"}}

And it will import Boostrap's CSS to your project.

# Add LESS

OK, simple styling works, but we want to be able to use [LESS](http://lesscss.org/).

We can't add LESS from NPM because it is a compiler and we want it to be a part of Meteor build - so we will add it from Atmosphere:

    $ meteor add less

We will use LESS in a few steps!

# First touch of style

Now let's add some style! We will set just a background color.

{{> DiffBox tutorialName="meteor-angular1-socially" step="17.3"}}


Let's move loginButton to Navigation and set .container-fluid to the uiView directive.

{{> DiffBox tutorialName="meteor-angular1-socially" step="17.6"}}

Converting to Bootstrap doesn't stop here. By applying bootstrap styles to various other parts of our Socially app, our website will look better on different screens. Have a look at [Code Diff](https://github.com/Urigo/meteor-angular-socially/compare/step_16...step_17) to see how we changed the structure of the main files.

Now we can create .less file for Socially:

{{> DiffBox tutorialName="meteor-angular1-socially" step="17.7"}}

And apply it to main less file:

{{> DiffBox tutorialName="meteor-angular1-socially" step="17.5"}}

To make bootstrap working with all sizes of screens:

{{> DiffBox tutorialName="meteor-angular1-socially" step="17.8"}}

# Navigation

Move loginButtons under Navigation and set as a bootstrap's navbar:

{{> DiffBox tutorialName="meteor-angular1-socially" step="17.9"}}

{{> DiffBox tutorialName="meteor-angular1-socially" step="17.10"}}

# PartiesList

We will use bootstrap's grid system and make all warnings look a lot better:

{{> DiffBox tutorialName="meteor-angular1-socially" step="17.11"}}

{{> DiffBox tutorialName="meteor-angular1-socially" step="17.12"}}

We will no longer be using PartyUnanswered, time to remove it:

{{> DiffBox tutorialName="meteor-angular1-socially" step="17.42"}}

# PartyAdd

Let's use .form-group and .form-control classes:

{{> DiffBox tutorialName="meteor-angular1-socially" step="17.13"}}

{{> DiffBox tutorialName="meteor-angular1-socially" step="17.14"}}

{{> DiffBox tutorialName="meteor-angular1-socially" step="17.15"}}

# PartiesMap

{{> DiffBox tutorialName="meteor-angular1-socially" step="17.16"}}

{{> DiffBox tutorialName="meteor-angular1-socially" step="17.17"}}

{{> DiffBox tutorialName="meteor-angular1-socially" step="17.18"}}


# PartiesSort

{{> DiffBox tutorialName="meteor-angular1-socially" step="17.19"}}

# PartyCreator

Let's add a icon:

{{> DiffBox tutorialName="meteor-angular1-socially" step="17.20"}}

{{> DiffBox tutorialName="meteor-angular1-socially" step="17.21"}}

{{> DiffBox tutorialName="meteor-angular1-socially" step="17.22"}}

# PartyRemove

We will use icon of X provided by bootstrap v4:

{{> DiffBox tutorialName="meteor-angular1-socially" step="17.23"}}

# PartyRsvp

Let's make RSVP a lot prettier! User will be able to see how he responded:

{{> DiffBox tutorialName="meteor-angular1-socially" step="17.24"}}

{{> DiffBox tutorialName="meteor-angular1-socially" step="17.25"}}

{{> DiffBox tutorialName="meteor-angular1-socially" step="17.26"}}

And create few methods to check the answer:

{{> DiffBox tutorialName="meteor-angular1-socially" step="17.39"}}

# PartyRsvpsList

We will no longer use PartyRsvpUsers, so we can remove it:

{{> DiffBox tutorialName="meteor-angular1-socially" step="17.43"}}

{{> DiffBox tutorialName="meteor-angular1-socially" step="17.27"}}

{{> DiffBox tutorialName="meteor-angular1-socially" step="17.28"}}

{{> DiffBox tutorialName="meteor-angular1-socially" step="17.29"}}

# PartyUninvited

{{> DiffBox tutorialName="meteor-angular1-socially" step="17.30"}}

{{> DiffBox tutorialName="meteor-angular1-socially" step="17.31"}}

# PartyDetails

Let's do pretty much the same as we did with PartyAdd and PartyDetails:

{{> DiffBox tutorialName="meteor-angular1-socially" step="17.32"}}

{{> DiffBox tutorialName="meteor-angular1-socially" step="17.33"}}

# PartyMap

We will remove partyMap.css and replace it with partyMap.less:

{{> DiffBox tutorialName="meteor-angular1-socially" step="17.34"}}

{{> DiffBox tutorialName="meteor-angular1-socially" step="17.35"}}

{{> DiffBox tutorialName="meteor-angular1-socially" step="17.37"}}

# Update Socially

Now we can import all less files of direct Socially dependencies:

{{> DiffBox tutorialName="meteor-angular1-socially" step="17.38"}}

That's it! Now we have a nice style with a better looking CSS using Bootstrap and LESS!

# Summary

We learned how to use CSS, LESS and Bootstrap in Meteor.

{{/template}}
