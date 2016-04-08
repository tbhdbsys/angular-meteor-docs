{{#template name="tutorials.socially.angular1.step_14.md"}}
{{> downloadPreviousStep stepName="step_13"}}

In this step we will learn how to use [Meteor methods](http://docs.meteor.com/#/full/meteor_methods) and how to use `Meteor.call` method from our AngularJS code.

Meteor methods are a way to perform more complex logic than the direct Mongo.Collection API.
The Meteor methods are also responsible for checking permissions, just like the allow method does.

In our case, we will create an invite method that invites a user to a party.

Create a new file under `imports/api/parties` called `methods.js` and paste the following code into it:

{{> DiffBox tutorialName="meteor-angular1-socially" step="14.2"}}

We have to import it in the `index.js`

{{> DiffBox tutorialName="meteor-angular1-socially" step="14.3"}}

Let's look at the code.

First, all Meteor methods are defined inside `Meteor.methods({});` object.

Each property of that object is a method and the name of that property in the name of the method. In our case - invite.

Then the value of the property is the function we call. In our case it takes 2 parameters - the party id and the invited user id.

As you can see, `invite` function is exported. It's just to make testing easier.

First, we check validation with the the [check](http://docs.meteor.com/#check_package) function.

To use [check](http://docs.meteor.com/#check_package) we need to add the [check package](https://atmospherejs.com/meteor/check):

    meteor add check

The rest of the code is pretty much self explanatory, but important thing to notice is the Email function that sends email to the invited client.
This function can't be called from the client side so we have to put it inside an `isServer` statement.

Don't forget to add the email package to your project in the command line:

    meteor add email

And import Email object from its module:

{{> DiffBox tutorialName="meteor-angular1-socially" step="14.5"}}

Now let's call that method from the client.

Add a method to the component called `PartyUninvited`:

{{> DiffBox tutorialName="meteor-angular1-socially" step="14.6"}}

We just used a regular Meteor API to call a method, inside our component.

Note that we also used another parameter, a callback function that called when Meteor is done with our method.

The callback have 2 parameters:

* Parameter 1 - `error` - which is `undefined` when the call succeeded.
* Parameter 2 - `result` - which is the return value from the server method.

Now let's add a button to invite each user we want. Edit the users list to look like this:

{{> DiffBox tutorialName="meteor-angular1-socially" step="14.7"}}

Now that we have the invite function working, we also want to publish the parties to the invited users.
Let's add that permission to the publish parties method:

{{> DiffBox tutorialName="meteor-angular1-socially" step="14.8"}}

### Serve Email

NOTE: If you want to test email functionality locally with your own gmail account, create a new file called `environments.js` in the `server/startup/` directory. Add the following lines substituting [YOUR_EMAIL] and [YOUR_PASSWORD].  

    Meteor.startup(function () {
        process.env.MAIL_URL="smtp://[YOUR_EMAIL]@gmail.com:[YOUR_PASSWORD]@smtp.gmail.com:465/";
    })

You may need to set your gmail account to use [Less Secure Apps](https://www.google.com/settings/u/2/security/lesssecureapps).

In production you could use a service like Mandrill with this [Meteor Mandrill Package](https://atmospherejs.com/wylio/mandrill).

Great!

Now test the app.  Create a private party with user1.  Then invite user2. Log in as user2 and check if he can see the party in his own parties list.

Now let's add the RSVP functionality so invited users can respond to invitations.

First let's add a `Meteor.method` to `methods.js` in the parties folder (remember to place it as a property inside the `Meteor.methods` object):

{{> DiffBox tutorialName="meteor-angular1-socially" step="14.9"}}

The function gets the party's id and the response ('yes', 'maybe' or 'no').

Like the invite method, first we check for all kinds of validations, then we do the wanted logic.

Now let's create the `PartyRsvp` component with action buttons to call the right rsvp!

{{> DiffBox tutorialName="meteor-angular1-socially" step="14.10"}}

{{> DiffBox tutorialName="meteor-angular1-socially" step="14.11"}}

Add this component to the PartiesList:

{{> DiffBox tutorialName="meteor-angular1-socially" step="14.12"}}

{{> DiffBox tutorialName="meteor-angular1-socially" step="14.13"}}

Now let's display who is coming for each party.

Create the `PartyRsvpsList` component:

{{> DiffBox tutorialName="meteor-angular1-socially" step="14.14"}}

{{> DiffBox tutorialName="meteor-angular1-socially" step="14.15"}}

Take a look at the use of filter with length to find how many people responded with each response type.

We have to add it to PartiesList:

{{> DiffBox tutorialName="meteor-angular1-socially" step="14.16"}}

{{> DiffBox tutorialName="meteor-angular1-socially" step="14.17"}}

And we also want to see list of users. Let's create `PartyRsvpUsers`:

{{> DiffBox tutorialName="meteor-angular1-socially" step="14.18"}}

{{> DiffBox tutorialName="meteor-angular1-socially" step="14.19"}}

Add it to `PartyRsvpsList`:

{{> DiffBox tutorialName="meteor-angular1-socially" step="14.20"}}

{{> DiffBox tutorialName="meteor-angular1-socially" step="14.21"}}

Now let's add a list of the users who haven't responded yet. To do this we will create the `PartyUnanswered` component:

{{> DiffBox tutorialName="meteor-angular1-socially" step="14.22"}}

{{> DiffBox tutorialName="meteor-angular1-socially" step="14.23"}}

Here we are using `filter` method, and underscore's `findWhere()` to extract the users who are invited to the party but are not exist in the rsvps array.

Add that function inside the `PartiesList` component:

{{> DiffBox tutorialName="meteor-angular1-socially" step="14.24"}}

{{> DiffBox tutorialName="meteor-angular1-socially" step="14.25"}}

Also, we forgot to subscribe!

{{> DiffBox tutorialName="meteor-angular1-socially" step="14.26"}}

# Summary

Run the application.

Looks like we have all the functionality we need but there is a lot of mess in the display.
There are stuff that we can hide if the user is not authorized to see or if they are empty.

So in the next chapter we are going to learn about a few simple but very useful Angular 1 directive to help us conditionally add or remove DOM.

# Testing

{{> DiffBox tutorialName="meteor-angular1-socially" step="14.27"}}

{{> DiffBox tutorialName="meteor-angular1-socially" step="14.28"}}

{{/template}}
