{{#template name="migration.angular2.code-migration8.md"}}

So let's continue! now we will migrate the list of todo, so far we use an existing Blaze Template called `Lists_show_page` inside a new Angular 2 Component called `ListShowComponent`.

First, let's modify the template, we use the same techniques we learned in the previous steps - we will use the existing template and just change the events, bindings and directives:

{{> DiffBox tutorialName="migration-angular2" step="8.1"}}

Assuming you already got it, let's migrate the Template code into a Component:

{{> DiffBox tutorialName="migration-angular2" step="8.2"}}

> At the moment, we will use the exiting `Todo_item` template to show the items - we will later migrate it too - so we just pass the required params using `getContextForItem`.

Great, now we need to implement the events we had in the Blaze Template, let's add them first to the view:

{{> DiffBox tutorialName="migration-angular2" step="8.3"}}

And now let's implement and migrate the code into the Component's class:

{{> DiffBox tutorialName="migration-angular2" step="8.4"}}

That's it! we can now remove the old files of this Template (`imports/ui/components/lists-show.html`, `imports/ui/components/lists-show.js`, `imports/ui/pages/lists-show-page.js`, `imports/ui/pages/lists-show-page.html`), and we can removed the imports for those files from the routes file (`imports/startup/client/routes.js`).

{{/template}}
