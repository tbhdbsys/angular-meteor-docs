{{#template name="tutorials.whatsapp.ionic.step_02.md"}}

Now that we've finished making our initial setup, let's dive into the code of our app.

First, we shall create some helpers which will help us write some `Angular` code using es6's class system.

> *NOTE*: As for now there is no best pratice for writing `Angular` es6 code. There are many methods to do so, but in this tutorial we will use our helpers.

Let's add some class helpers which will help us define some basic behaviours for each entity type we write for our app, like controllers, directives, filters and so on:

{{> DiffBox tutorialName="ionic-tutorial" step="2.1"}}

As you can probably notice there is a parent class called `Injector`, which will take care of injecting the dependencies into our instance, so there is no need in [ng-anotate](https://github.com/olov/ng-annotate) (A pre-processor which takes care of automatically writing our dependencies before we minifiy our scripts).

In addition, if you will take a closer look at our `Controller` class you can see that once an instance is created it will invoke a function called `Scope.viewModel()` with it. This function binds the controller to the scope and uses it as the view model, and it should match the same controller specified by `controllerAs` attribute in the view.

We will cover up the rest of the class helpers as we make progress with the tutorial.

Let's add a `Loader`, which knows how to approach our helper classes and load them in `Angular`'s modules:

{{> DiffBox tutorialName="ionic-tutorial" step="2.2"}}

Now that our helpers are ready, let's inherit from the `Config` helper and create a `RoutesConfig`:

{{> DiffBox tutorialName="ionic-tutorial" step="2.3"}}

This will be our main app router which is implemented using [angular-ui-router](https://atmospherejs.com/angularui/angular-ui-router), and anytime we would like to add some new routes and configure them, this is where we do so.

After we define a helper, we shall always load it in the main app file. Let's do so:

{{> DiffBox tutorialName="ionic-tutorial" step="2.4"}}

As you can see there is only one route state defined as for now, called `tabs`, which is connected to the `tabs` view. Let's add it:

{{> DiffBox tutorialName="ionic-tutorial" step="2.5"}}

In our app we will have 5 tabs: `Favorites`, `Recents`, `Contacts`, `Chats`, and `Settings`. In this tutorial we will only focus on implementing the `Chats` and the `Settings` tabs, but your'e more than free to continue on with this tutorial and implement the rest of the tabs.

Let's create `Chats` view which will appear one we click on the `Chats` tab. But first, let's install an npm package called `Moment` which is a utility library for manipulating date object. It will soon come in handy:

    $ npm install moment --save

Our `package.json` should look like so:

{{> DiffBox tutorialName="ionic-tutorial" step="2.6"}}

Now that we have installed `Moment`, we need to expose it to our environment, since some libraries we load which are not using es6's module system rely on it being defined as a global variable. For these purposes we shall use the `expose-loader`. Simply, add to our `index.js` file:

{{> DiffBox tutorialName="ionic-tutorial" step="2.7"}}

After the `?` comes the variable name which shuold be defined on the global scope, and after the `!` comes the library we would like to load. In this case we load the `Moment` library and we would like to expose it as `window.global`.

> *NOTE*: Altough `Moment` is defined on the global scope, we will keep importing it in every module we wanna use it, since it's more declerative and clearer.

Now that we have `Moment` lock and loaded, we will create our `Chats` controller and we will use it to create some data stubs:

{{> DiffBox tutorialName="ionic-tutorial" step="2.8"}}

And we will load it:

{{> DiffBox tutorialName="ionic-tutorial" step="2.9"}}

> *NOTE*: From now on any component we create we will also load it right after, without any further explenations.

The data stubs are just a temporary fabricated data which will be used to test our application and how it reacts with it. You can also look at our scheme and figure out how our application is gonna look like.

Now that we have the controller with the data, we need a view to present it. We will use `ion-list` and `ion-item` directives, which provides us a list layout, and we will iterate our static data using `ng-repeat` and we will display the chat's name, image and timestamp.

Let's create it:

{{> DiffBox tutorialName="ionic-tutorial" step="2.10"}}

We also need to define the appropriate route state which will be navigated any time we press the `Chats` tab. Let's do so:

{{> DiffBox tutorialName="ionic-tutorial" step="2.11"}}

If you look closely we used the `controllerAs` syntax, which means that our data models should be stored on the controller and not on the scope.

We also used the `$urlRouterProvider.otherwise()` which defines our `Chats` state as the default one, so any unrecognized route state we navigate to our router will automatically redirect us to this state.

As for now, our chats' dates are presented in a very messy format which is not very informative for the every-day user. We wanna present it in a calendar format. Inorder to do that we need to define a `Filter`, which is provided by `Angular` and responsibe for projecting our data presented in the view. Let's add the `CalendarFilter`:

{{> DiffBox tutorialName="ionic-tutorial" step="2.12"}}

{{> DiffBox tutorialName="ionic-tutorial" step="2.13"}}

And now let's apply it to the view:

{{> DiffBox tutorialName="ionic-tutorial" step="2.14"}}

As you can see, inorder to apply a filter in the view we simply pipe it next to our data model.

We would also like to be able to remove a chat, let's add a delete button for each chat:

{{> DiffBox tutorialName="ionic-tutorial" step="2.15"}}

And implement its logic in the controller:

{{> DiffBox tutorialName="ionic-tutorial" step="2.16"}}

Now everything is ready, but it looks a bit dull. Let's add some style to it:

{{> DiffBox tutorialName="ionic-tutorial" step="2.17"}}

Since the stylesheet was written in `SASS`, we need to import it into our main `scss` file:

{{> DiffBox tutorialName="ionic-tutorial" step="2.18"}}

> *NOTE*: From now on every `scss` file we write will be imported right after without any further explenations.

Our `Chats` tab is now ready. You can run it inside a browser, or if you prefer to see it in a mobile layout, you should use `Ionic`'s simulator. Just follow the following instructions:

    $ npm install -g ios-sim
    $ cordova platform add ios
    $ ionic emulate

And it should look like that:

{{tutorialImage 'ionic' '1.png' 500}}

And if you swipe a menu item to the left:

{{tutorialImage 'ionic' '2.png' 400}}

{{/template}}
