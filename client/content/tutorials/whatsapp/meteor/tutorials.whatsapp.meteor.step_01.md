{{#template name="tutorials.whatsapp.meteor.step_01.md"}}


We will start by creating the project’s folder structure, Meteor has a special behavior for certain folders:

* client - these files will be available only in the client side.
* server - these files will be available only in the server side.
* public - these files will be available in the client, uses for assets, images, fonts, etc.
* lib - any folder named lib (in any hierarchy) will be loaded first!
* any other folder name will be included in both client and server and uses for code-sharing.

So this will be our folder structure to the project:

* client (client side with AngularJS and Ionic code)
    * scripts
    * templates
    * styles
    * index.html
* server (server side code only)
* public (assets, images)
* lib (define methods and collections in order to make them available in both client and server)

So let’s start by creating our first file, the `index.html` which will be placed under the `client` folder:

{{> DiffBox tutorialName="whatsapp-meteor-tutorial" step="1.2"}}

We used some ionic tags to achieve mobile style:

* ion-nav-bar - Create a navigation bar in the page header.
* ion-nav-view - This is a placeholder to the real content - AngularJS and ionic will put your content inside this tag automatically.

Note that we only provide the `head` and `body` tags because Meteor takes care of appending the releant html parts into one file, and any tag we will use here will be added to Meteor’s main index.html file.

This feature is really useful because we do not need to take care of including our files in `index.html` since it will be maintained automatically.

Our next step is to create the AngularJS module and bootstrap it according to our platform.
We will create a new file called `app.js`.

This bootstrap file should be loaded first, because any other AngularJS code will depend on this module, so we need to put this file inside a folder called `lib`, so we will create a file in this path: `client/scripts/lib/app.js`.

In this file we will initialize all the modules we need and load our components, so any time we create a component it should be loaded here right after.

We will also check for the current platform (browser or mobile) and initialize the module according to the result:

{{> DiffBox tutorialName="whatsapp-meteor-tutorial" step="1.3"}}

Before we continue any further, we shall create some helpers which will help us write some AngularJS code using ES6's class system. I just wanna point out that as for now there is no official way to do so, but I recommend using the following methods.

Let's add some class helpers which will help us define some basic behaviours for each entity type we write for our app, like controllers, directives, filters and so on:

{{> DiffBox tutorialName="whatsapp-meteor-tutorial" step="1.4"}}

As you can probably notice there is a parent class called `Injector`, which will take care of injecting the dependencies into our instance, so there is no need in `angular-anotate` (A pre-processor which takes care of automatically writing our dependencies before we minifiy our scripts).

In addition, if you will take a closer look at our `Controller` class you can see that once an instance is created it will invoke a function called `Scope.viewModel()` with it. This function binds the controller to the scope and uses it as the view model, and it should match the same controller specified by `controllerAs` attribute in the view.

We will cover up the rest of the class helpers as we make progress with the tutorial.

Let's add a `Definer`, which knows how to approach our helper classes and define them in AngularJS's modules:

{{> DiffBox tutorialName="whatsapp-meteor-tutorial" step="1.5"}}

Our next step is to create the states and routes for the views.

Our app uses Ionic to create 5 tabs: Favorites, Recents, Contacts, Chats, and Settings.

We will define our routes and states with [angular-ui-router](https://atmospherejs.com/angularui/angular-ui-router) (which is included by ionic), and at the moment we will add the main page which is the `chats` tab:

{{> DiffBox tutorialName="whatsapp-meteor-tutorial" step="1.6"}}

{{> DiffBox tutorialName="whatsapp-meteor-tutorial" step="1.7"}}

And this is the HTML template for the footer that included with the tabs view:

{{> DiffBox tutorialName="whatsapp-meteor-tutorial" step="1.8"}}

Create the stub for the main page - the chats file:

{{> DiffBox tutorialName="whatsapp-meteor-tutorial" step="1.9"}}

And this is what it looks at the moment, inside a browser:

{{tutorialImage 'whatsapp-meteor' '1.png' 500}}

If you want to view your app in a better way, with mobile layout, you can add a mobile platform as described in the beginning of the step. Our app should look like so on an iOS platfrom:

{{tutorialImage 'whatsapp-meteor' '2.png' 500}}

Our next step includes creating basic views with some static data using ionic and `sass` (A css preprocessor).

First, let’s create an AngularJS controller that we will later connect to the chats view, we will call it `ChatsCtrl` and create a new file:

{{> DiffBox tutorialName="whatsapp-meteor-tutorial" step="1.11"}}

{{> DiffBox tutorialName="whatsapp-meteor-tutorial" step="1.12"}}

We will use the controller with `conrollerAs` syntax, which means we won't put our variables on the `$scope` - we will use `this` context instead.

Now we want to add some static data to this controller, we will use `moment` package to easily create time object, so let’s add it to the project using this command:

    $ meteor npm install moment --save

Now let’s add the static data, we will create a stub schema for chats and messages:

{{> DiffBox tutorialName="whatsapp-meteor-tutorial" step="1.14"}}

Connect the chats view to the `ChatsCtrl`:

{{> DiffBox tutorialName="whatsapp-meteor-tutorial" step="1.15"}}

Note that we used `controllerAs` syntax, so from now on, we will keep our controller variables on the `this` context, and we will used them with the `chats` prefix on the view.

Modify the chats list view to use the stub data.

We will use ionic’s tags to create a container with a list view (`ion-list` and `ion-item`), and add `ng-repeat` to iterate over the chats:

{{> DiffBox tutorialName="whatsapp-meteor-tutorial" step="1.16"}}

And this is how it looks like:

{{tutorialImage 'whatsapp-meteor' '3.png' 500}}

You might notice that the dates are not formatted, so let’s create a simple AngularJS filter that use `moment` package to convert the date into formatted text, we will place it in a file named `client/scripts/filters/calendar.filter.js`:

{{> DiffBox tutorialName="whatsapp-meteor-tutorial" step="1.17"}}

{{> DiffBox tutorialName="whatsapp-meteor-tutorial" step="1.18"}}

And let’s use it in our view:

{{> DiffBox tutorialName="whatsapp-meteor-tutorial" step="1.19"}}

And this how it looks like now:

{{tutorialImage 'whatsapp-meteor' '4.png' 500}}

To add a delete button to our view, we will use `ion-option-button` which is a button that’s visible when we swipe over the list item.

{{> DiffBox tutorialName="whatsapp-meteor-tutorial" step="1.20"}}

Implement the `remove(chat)` method inside our `ChatsCtrl`:

{{> DiffBox tutorialName="whatsapp-meteor-tutorial" step="1.21"}}

And this is the result:

{{tutorialImage 'whatsapp-meteor' '5.png' 500}}

Now we want to add some styles and make some small CSS modifications to make it look more like WhatsApp.

We want to use SASS in our project, so we need to add the sass package to our project:

    $ meteor add fourseven:scss

And now we will create our first SASS file, we will place it under `client/styles/chats.scss`, and add some CSS rules:

{{> DiffBox tutorialName="whatsapp-meteor-tutorial" step="1.23"}}

And we are done with this view! As you can probably see it has a Whatsapp style theme.

{{tutorialImage 'whatsapp-meteor' '6.png' 500}}


{{/template}}
