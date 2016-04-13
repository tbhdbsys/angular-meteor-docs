{{#template name="tutorials.whatsapp.meteor.step_00.md"}}


Start by installing the Meteor platform if you haven't already (See [reference](https://www.meteor.com/install)).

Create a new project by running these commands in your Terminal:

    $ meteor create whatsapp
    $ cd whatsapp

Your app now contains a live and ready example. To run our app simply type `meteor` on the command line:

    $ meteor

We can also run our app inside the iOS Simulator or Android Emulator, we just need to add the platform so Meteor will build the project for the new platform:

    $ meteor add-platform ios

Or

    $ meteor add-platform android

You can find more information about Meteor CLI and build tool here:

[https://www.meteor.com/tool](https://www.meteor.com/tool)

For now, let’s remove unnecessary files:

    $ rm -rf server client

Next, we will replace Blaze (Meteor's default templating engine) with AngularJS's template engine:

    $ meteor remove blaze-html-templates
    $ meteor add angular-templates

We also need to make sure ionic is installed:

    $ meteor add dab0mb:ionic-assets
    $ meteor npm install ionic-scripts --save

And finally, we will install angular-meteor:

    $ meteor npm install angular-meteor --save

Dependent libraries like `angular` will be added automatically so you should'nt worry about that.


{{/template}}
