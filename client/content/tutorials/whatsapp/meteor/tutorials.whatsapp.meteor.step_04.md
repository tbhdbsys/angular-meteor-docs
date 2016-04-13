{{#template name="tutorials.whatsapp.meteor.step_04.md"}}


On this step we will authenticate and identify users in our app.

Before we go ahead and start to extend our app, we will add few packages which will make our lives a bit less complex when it comes to authentication and users management.

Firt we will add a meteor package called `accounts-phone` which gives us the ability to verify a user using an SMS code:

    $ meteor add okland:accounts-phone

And second, we will add `angular-meteor-auth` which provides us wit authantication related functions:

    $ meteor npm install angular-meteor-auth

Ofcourse, don't forget to load the relevant modules:

{{> DiffBox tutorialName="whatsapp-meteor-tutorial" step="4.2"}}

Inorder to make the SMS verification work we will need to create a file locaed in `server/sms.js` with the following contents:

{{> DiffBox tutorialName="whatsapp-meteor-tutorial" step="4.3"}}

If you would like to test the verification with a real phone number, `accouts-phone` provides an easy access for [twilio's API](https://www.twilio.com/), for more information see [accounts-phone's repo](https://github.com/okland/accounts-phone).

For debugging purposes if you'd like to add admin phone numbers and mater verification codes which will always pass the verification stage, you may add a `settings.json` file at the root folder with the following fields:

    {
      "ACCOUNTS_PHONE": {
        "ADMIN_NUMBERS": ["123456789", "987654321"],
        "MASTER_CODE": "1234"
      }
    }

Now let’s create the same flow of WhatsApp for authentication: first we need to ask for the user’s phone number, verify it with SMS message and then ask the user to pick his name.

So these flows are created by 3 views: login, confirmation and profile.

Let’s add these states, each with HTML template and controller:

{{> DiffBox tutorialName="whatsapp-meteor-tutorial" step="4.4"}}

We will now add the view of login state which includes an input and a save button and later we will add a modal dialog to verify the user’s phone:

{{> DiffBox tutorialName="whatsapp-meteor-tutorial" step="4.5"}}

And the controller - the logic is simple, we ask the user to check again his phone number, and then we will use Accounts API in order to ask for SMS verification:

{{> DiffBox tutorialName="whatsapp-meteor-tutorial" step="4.6"}}

{{> DiffBox tutorialName="whatsapp-meteor-tutorial" step="4.7"}}

Note the we did not provide all the settings for Account-Phone, so it will run in debug mode. It means that a real SMS won’t be sent now, but if you'd like to recieve the verification code just open your terminal and view Meteor's logs.

Our next step would be preventing unauthorized users to view contents which they have no permission to. Inorder to do that we will add a pre-requirement to the relevant routes which will require the user to log-in first. `angular-meteor-auth` provides us with a service which is called `$auth`, and it has a method called `$awaitUser()` which returns a promise that will be resolved only once the user has logged in. For more information about `angular-meteor-auth` see [reference](http://www.angular-meteor.com/api/1.3.6/auth).

{{> DiffBox tutorialName="whatsapp-meteor-tutorial" step="4.8"}}

And now we want to handle a case that this promise does not resolves (in case that the user is not logged in), so let’s create new file `client/scripts/auth.js` that uses Angular’s config phase:

{{> DiffBox tutorialName="whatsapp-meteor-tutorial" step="4.9"}}

{{> DiffBox tutorialName="whatsapp-meteor-tutorial" step="4.10"}}

And now let’s add some CSS:

{{> DiffBox tutorialName="whatsapp-meteor-tutorial" step="4.11"}}

And this is how it looks like:

{{tutorialImage 'whatsapp-meteor' '13.png' 500}}

The next step is to add the confirmation view, starting with the HTML:

{{> DiffBox tutorialName="whatsapp-meteor-tutorial" step="4.12"}}

And the controller:

{{> DiffBox tutorialName="whatsapp-meteor-tutorial" step="4.13"}}

{{> DiffBox tutorialName="whatsapp-meteor-tutorial" step="4.14"}}

We will use Accounts API again to verify the user and in case of successful authentication we will transition to the `profile` state, which we add in the next step.

This is the `profile` view, which provides the ability to enter the user’s nickname and profile picture (which we will add in the next step).

{{> DiffBox tutorialName="whatsapp-meteor-tutorial" step="4.15"}}

And the controller:

{{> DiffBox tutorialName="whatsapp-meteor-tutorial" step="4.16"}}

{{> DiffBox tutorialName="whatsapp-meteor-tutorial" step="4.17"}}

And some CSS:

{{> DiffBox tutorialName="whatsapp-meteor-tutorial" step="4.18"}}

As you can see, the controller uses the server method `updateName` which we need to implement in the `lib/methods.js`:

{{> DiffBox tutorialName="whatsapp-meteor-tutorial" step="4.19"}}

Meteor sets the user identity in case of a logged in user into the `this.userId` variable, so we can check if this variable exists in order to verify that the user is logged in.

Now let’s add this validation to the `newMessage()` method we created earlier, and also add the identity of the user to each message he sends.

{{> DiffBox tutorialName="whatsapp-meteor-tutorial" step="4.20"}}

Great, now the last missing feature is logout. Let’s add a state for the settings view:

{{> DiffBox tutorialName="whatsapp-meteor-tutorial" step="4.21"}}

And create the view which contains the logout button:

{{> DiffBox tutorialName="whatsapp-meteor-tutorial" step="4.22"}}

Now let’s implement this method inside the `SettingsCtrl`:

{{> DiffBox tutorialName="whatsapp-meteor-tutorial" step="4.23"}}

{{> DiffBox tutorialName="whatsapp-meteor-tutorial" step="4.24"}}

And this is our settings view:

{{tutorialImage 'whatsapp-meteor' '14.png' 500}}

We also need to modify the way we identify our users inside the messages list, so let’s do it:

{{> DiffBox tutorialName="whatsapp-meteor-tutorial" step="4.25"}}

And the last missing feature is about adding auto-scroll to the messages list in order to keep the view scrolled down when new messages arrive.

{{> DiffBox tutorialName="whatsapp-meteor-tutorial" step="4.26"}}


{{/template}}
