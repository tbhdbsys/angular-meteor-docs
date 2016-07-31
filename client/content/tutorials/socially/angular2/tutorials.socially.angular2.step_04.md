{{#template name="tutorials.socially.angular2.step_04.md"}}  
{{> downloadPreviousStep stepName="step_03"}}

Now that we have full data binding from server to client, let's interact with the data and see the updates in action.

In this chapter we are going to:

- create a new component to add or remove a party
- learn about model-driven forms and create one
- learn how to hook up form events to component methods
- implement adding & removing party event handlers

First, let's create a simple form with a button that will add a new party.

# Component Architecture

In Angular 2, we build a tree of components with the root `App` component and
child components stemming out of it down to the leaves.

Let's make a new component called `PartiesFormComponent`, and put it inside `parties` directory on the client-side (`client/imports/parties`).

> Notice that we are placing the file inside the `imports` folder.  
> That is another Meteor special folder name that tells Meteor to load the modules inside it just when some other module is importing it.  

{{> DiffBox tutorialName="meteor-angular2-socially" step="4.1"}}

Notice that we are exporting the class `PartiesFormComponent` using ES6 module syntax.
As a result, you'll be able to import `PartiesFormComponent` in any other component as follows:

    import { PartiesFormComponent } from 'client/imports/parties/parties-form.component';

By exporting and importing different modules, you create a modular structure of your app in ES6,
which is similar to the modules in other script languages like Python.
This is what makes programming in ES6 really awesome since application structure comes out rigid and clear.

Let's add a template for the new component.

Add a file with the following form:

{{> DiffBox tutorialName="meteor-angular2-socially" step="4.2"}}

We can load the new `PartiesForm` component on the page by placing the `<parties-form>` tag in the root template `app.html`:

{{> DiffBox tutorialName="meteor-angular2-socially" step="4.3"}}

There is one more required step in Angular 2 to load a component. The `App` component is not aware of child components unless you explicitly let it know what to look for. Add the `PartiesFormComponent` class as a directive of the `App`, like this:

{{> DiffBox tutorialName="meteor-angular2-socially" step="4.4"}}

Now we have our parties-form directive showing on our app.

# Angular 2 Forms

Now let's get back to the form and make it functional.

## Model-Driven Forms

Since there was a breaking change in forms syntax, we should disable the ability of use deprecated API.
We can achieve this by using `disableDeprecatedForms` function.

We also need to add providers to our App, `provideForms()` comes with help.

Both functions can be imported from `@angular/forms` module.

{{> DiffBox tutorialName="meteor-angular2-socially" step="4.5"}}

Let's construct our form model. There is a special class for this called [`FormBuilder`](https://angular.io/docs/ts/latest/api/common/FormBuilder-class.html).
First, we should import necessary dependencies, then build the model and its future fields with help of the `FormBuilder` instance:

{{> DiffBox tutorialName="meteor-angular2-socially" step="4.6"}}

  > As you probably noticed, we used OnInit interface. It brings the ngOnInit method.
  It initialize the directive/component after Angular initializes the data-bound input properties.
  Angular will find and call methods like ngOnInit(), with or without the interfaces.
  Nonetheless, we strongly recommend adding interfaces to TypeScript directive classes in order to benefit from strong typing and editor tooling.

`FormGroup` is a set of `FormControl`s.

Alternatively, we could write:

    this.addForm = new FormGroup({
      name: new FormControl()
    });

The first value provided is the initial value for the form control. For example:

    this.addForm = this.formBuilder.group({
      name: ['Bob']
    });

will initialize name to _Bob_ value.

We can use `addForm.value` to access current state of the model:

    console.log(this.addForm.value);
    > { name: '', description: '', location: ''}

We could also access the control values individually.

    console.log(this.addForm.controls.name.value);
    > ''

Now let's move to the template. We have to bind to `formGroup` and add `formControlName` directives to our inputs.

{{> DiffBox tutorialName="meteor-angular2-socially" step="4.7"}}

By `formGroup` we provide an instance of the `FormGroup`, in our case this is the `addForm`.

But what about those `formControlName` directives? As you can see, we implemented them with values that match our `addForm` structure. Each `formControlName` binds value of a form element to the model.

Now each time the user types inside these inputs, the value of the `addForm` and its controls will be automatically updated.
Conversely, if `addForm` is changed outside of the HTML, the input values will be updated accordingly.

Since `name` and `location` are required fields in our model, let's set up validation.

In Angular2, it's less then easy, just add [`Validators.required`](https://angular.io/docs/ts/latest/api/common/Validators-class.html) as a second parameter to a required control:

{{> DiffBox tutorialName="meteor-angular2-socially" step="4.8"}}

We can check `addForm.valid` property to determine if the form is valid:  

    console.log(this.addForm.valid)
    > false


## Event Handlers

### (ngSubmit)

We just set up the form and synchronized it with the form model.

Let's start adding new parties to the `Parties` collection.
Before we start, we create a new submit button and a form submit event handler.

It's worth mentioning one more great feature that appeared in Angular 2.
It's possible now to define and use local variables in a template.

For example, if we were using `Template-driven Forms`, to add a party we would need to take the
current state of the form and pass it to an event handler.
We could take the form and print it inside the template:

    <form #f="ngForm">
        ...
        {{f.value}}
    </form>

you'll see something like:

    {name: '', description: '', location: ''}

which is exactly what we would need — the form model object.

Since we decided to use `Model-driven Forms` we won't use it, but I think it's worth to mention because of its simplicity and power.

Back to the tutorial!

Let's bind a submit event to the add button.
This event will trigger if the button is clicked, or if the user presses enter on the final field.

{{> DiffBox tutorialName="meteor-angular2-socially" step="4.9"}}

In Angular 2, events are indicated by the round bracket () syntax. Here we are telling Angular to call a method `addParty` on submit. Let's add the addParty method to our PartiesFormComponent class.

{{> DiffBox tutorialName="meteor-angular2-socially" step="4.10"}}

> Note: TypeScript doesn't know which controls properties are available so we have to put them in the squery brackets.

Open a different browser, fill out the form, submit and see how the party is added on both clients.

### (click)

Now, let's add the ability to delete parties.

Let's add an X button to each party in our party list:

{{> DiffBox tutorialName="meteor-angular2-socially" step="4.11"}}


Here again, we are binding an event to the class context and passing in the party as a parameter.

Let's go into the class and add that method.

Add the method inside the AppComponent class in `app.component.ts`:

{{> DiffBox tutorialName="meteor-angular2-socially" step="4.12"}}

The Mongo Collection Parties has a method called "remove". We search for the relevant party by its identifier, `_id`, and delete it.

Now try to delete a few parties. Since Meteor syncs data between clients, you can also watch them being removed from other browser clients.


# Summary

In this chapter we've seen:

- how easy it is to create a form and access its data using Angular 2's power
- how easy it is to save that data to the storage using Meteor's power

{{/template}}
