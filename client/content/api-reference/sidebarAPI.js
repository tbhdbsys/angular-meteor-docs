Template.sidebarDesktopAPI.helpers({
  sidebarType: function () {
    return this.subSidebarType ? this.subSidebarType : "sidebarDefaultAPI";
  }
});

Template.sidebarDefaultAPI.events({
  'change #api-selector': function (event) {
    var route = Router.current().route.path(this);

    if (route.indexOf('api/angular2') > -1) {
      Router.go('/api/angular2/' + event.target.value);
    }
    else if (route.indexOf('api/meteor-rxjs') > -1) {
      Router.go('/api/meteor-rxjs/' + event.target.value);
    }
    else {
      Router.go('/api/' + event.target.value);
    }
  }
});

Template.sidebarDefaultAPI.helpers({
  apis: function () {
    var route = Router.current().route.path(this);
    var apis = ANGULAR1_API_DEFINITION;

    if (route.indexOf('api/angular2') > -1) {
      apis = ANGULAR2_API_DEFINITION;
    }

    if (route.indexOf('api/meteor-rxjs') > -1) {
      apis = METEOR_RXJS_API_DEFINITION;
    }

    return _.keys(apis);
  },
  currentApi: function (api) {
    if (Router.current().data) {
      var route = Router.current().data().route.replace('api.', '').replace("meteor-rxjs.", "").replace("angular2.", "");

      return route.substr(0, route.lastIndexOf('.')) === api;
    }
  }
});

Template.apiSelector.helpers({
  angularVersions: function () {
    var path = Router.current().route.path(this);

    if (path.indexOf('api/meteor-rxjs') > -1) {
      return [];
    }

    return [PAGES[0], PAGES[1]];
  }
});

Template.angularVersionLink.helpers({
  selected: function() {
    var path = Router.current().route.path(this);
    var currentTutorial = "Angular 1";

    if (path.indexOf('api/angular2') > -1) {
      currentTutorial = "Angular 2";
    }

    if (path.indexOf('api/meteor-rxjs') > -1) {
      currentTutorial = "Meteor-RxJS";
    }

    if (currentTutorial === this.title) {
      return "active";
    }
    else {
      return "";
    }
  }
});

Template.sidebarMobileAPI.helpers({
  selectedMobile: function () {
    return Router.current().data().route == this.route ? {selected: ""} : null;
  }
});
Template.sidebarMobileAPI.events({
  "change .component-sidebar-mobile": function (event, template) {
    $(event.currentTarget).blur();
    var dest = $(event.target).val();
    if (dest) {
      window.location = dest;
    }
  }
});

Template.sidebarLinkAPI.helpers({
  selected: function () {
    var self = this;
    var rData = Router.current().data();
    if (this.subSidebarType === "sidebarStepsCollapse") {
      var childElem = '.' + this.id + '-steps';
      if (rData.route == self.route || rData.parent.route == self.route) {
        $(childElem).collapse('show');
      } else {
        $(childElem).collapse('hide');
      }
    }
    return rData.route == self.route || rData.parent.route == self.route ? "selected" : "not-selected";
  },
  sidebarPath: function () {
    return this.pathRedirect ? this.pathRedirect : this.path;
  }
});
