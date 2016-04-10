{{#template name="tutorials.whatsapp.meteor.step_03.md"}}


In this step we will add the chat view and the ability to send messages.

We still don’t have an identity for each user, we will add it later, but we can still send messages to existing chats.

So just like any other page, first we need to add a route and a state.

Let’s call it `chat` and we will load a template and a controller which we will add later.

{{> DiffBox tutorialName="whatsapp-meteor-tutorial" step="3.0"}}

Let’s add a very basic view with the chat’s details. The file will be located in `client/templates/chat.html`:

{{> DiffBox tutorialName="whatsapp-meteor-tutorial" step="3.1"}}

Now we need to implement the logic in the controller, so let’s create it in `client/scripts/controllers/chat.controller.js` and call it `ChatCtrl`.

We will use the `$stateParams` provider to get the chat id and then we will define a helper that will help us fetch the chat that we want.

So in order to do that we shall define a helper named `chat`, and use `findOne` to fetch the wanted document.

{{> DiffBox tutorialName="whatsapp-meteor-tutorial" step="3.2"}}

{{> DiffBox tutorialName="whatsapp-meteor-tutorial" step="3.3"}}

So now that we have the chat view and controller, all is left to do is to link these two:

{{> DiffBox tutorialName="whatsapp-meteor-tutorial" step="3.4"}}

So far this is how our chat should look like:

{{tutorialImage 'whatsapp-meteor' '7.png' 500}}

Now let’s add some CSS rules and let’s add the messages view.

Let’s create a new SASS file for our view at `client/styles/chat.scss`, and fix the image style so it won't look silly:

{{> DiffBox tutorialName="whatsapp-meteor-tutorial" step="3.5"}}

Our next step is about getting the chat messages on the controller, we will add another helper, but instead of using the whole collection we will fetch only the relevant messages for the current chat:

{{> DiffBox tutorialName="whatsapp-meteor-tutorial" step="3.6"}}

And now to add it to the view, we use `ng-repeat` to iterate the messages:

{{> DiffBox tutorialName="whatsapp-meteor-tutorial" step="3.7"}}

As for now we do not have identity for each user or message, so we will just use odd/even and this would be the indication for which message is mine and which isn’t. In the next step we will add the authentication and each message will be related to a user.

Now we will add some CSS to the messages list:

{{> DiffBox tutorialName="whatsapp-meteor-tutorial" step="3.8"}}

We also need to add some Whatsapp assets so it would look more similiar.

Note that the images are under `public/` folder so we can use them in the client side from the root directory (in the CSS file).

You can copy them from [here](https://github.com/DAB0mB/angular-meteor-whatsapp/tree/master/public).

And this is the result:

{{tutorialImage 'whatsapp-meteor' '8.png' 500}}

Now we just need to take care of the message timestamp and format it.

We will use `moment` like before, but now let’s add another package called [angular-moment](https://github.com/urish/angular-moment) that provides us the UI filters.

So adding the package is just like any other package we added so far:

    $ meteor npm install angular-moment --save

And because it’s an AngularJS extension, we need to add a dependency in our module definition:

{{> DiffBox tutorialName="whatsapp-meteor-tutorial" step="3.11"}}

And now we will use a filter from this package in our view:

{{> DiffBox tutorialName="whatsapp-meteor-tutorial" step="3.12"}}

And the result is:

{{tutorialImage 'whatsapp-meteor' '9.png' 500}}

Just like WhatsApp...

Our next step is about adding the input for adding a new message to the chat, we need to add an input at the bottom of the view. `ion-footer-bar` provides a perfect solution for that.

So we will add an input, Send button and some icons for sending images and sound recordings (it’s just icons at the moment!)

{{> DiffBox tutorialName="whatsapp-meteor-tutorial" step="3.13"}}

Let’s add the `data` object to our controller, and add a stub method for `sendMessage()`, which will be implemented later.

{{> DiffBox tutorialName="whatsapp-meteor-tutorial" step="3.14"}}

And this is what we got so far:

{{tutorialImage 'whatsapp-meteor' '10.png' 500}}

To improve the user experience in our app, we want some extra events to our input because we want to move it up when the keyboard comes from the bottom of the screen and we want to know if `return` (aka `Enter`) was pressed.

We will implement a new directive that extends the regular `input` tag and add those events to the directive:

{{> DiffBox tutorialName="whatsapp-meteor-tutorial" step="3.15"}}

{{> DiffBox tutorialName="whatsapp-meteor-tutorial" step="3.16"}}

And now we can use those events in our view:

{{> DiffBox tutorialName="whatsapp-meteor-tutorial" step="3.17"}}

And implement the controller methods which handle those events:

{{> DiffBox tutorialName="whatsapp-meteor-tutorial" step="3.18"}}

We will also add some CSS to this view:

{{> DiffBox tutorialName="whatsapp-meteor-tutorial" step="3.19"}}

So now when the user focuses on the input, it goes up, like so:

{{tutorialImage 'whatsapp-meteor' '11.png' 500}}

So now it’s time to implement the `sendMessage()` in our controller.

We will use `callMethod()` in order to call that method on the server side.

{{> DiffBox tutorialName="whatsapp-meteor-tutorial" step="3.20"}}

Now let’s create our method in `lib/methods.js`:

{{> DiffBox tutorialName="whatsapp-meteor-tutorial" step="3.21"}}

Let’s add validation to our method.

Meteor provides us with a useful package named `check` that validates data types and scheme.

Add it by running:

    $ meteor add check

And now let’s use it in the `newMessage()` method:

{{> DiffBox tutorialName="whatsapp-meteor-tutorial" step="3.23"}}

Now that it's ready you can go ahead and send a message and view it on the screen.


{{/template}}
