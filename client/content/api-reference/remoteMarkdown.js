Template.remoteMarkdown.onCreated(function() {
  const instance = Template.instance();

  instance.autorun(() => {
    Meteor.call("fetchMarkdown", Template.currentData().options, (err, res) => {
      let template = "<do-nothing>{{#markdown}}" + res + "{{/markdown}}</do-nothing>";
      instance.$("#html-content").empty();
      Blaze.render(Template.fromString(template), instance.$("#html-content")[0]);
    });
  })
});