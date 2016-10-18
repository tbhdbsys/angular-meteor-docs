Template.stepbarButtons.helpers({
  prev: function () {
    var self = this;
    var page = prevPage(self);
    if (page) return page;

    var pathObject = {
      path: 'tutorials/socially'
    };

    return pathObject;
  },
  next: function () {
    var self = this;
    return nextPage(self);
  }
});

Template.stepbarButtonsPrevious.helpers({
  prev: function () {
    var self = this;
    var page = prevPage(self);
    if (page) return page;

    var pathObject = {
      path: 'tutorials/socially'
    };
    return pathObject;
  }
});

Template.stepbarButtonsNext.helpers({
  next: function () {
    var self = this;
    return nextPage(self);
  }
});

Template.stepbarLiveDemo.helpers({
  liveDemoLink: function () {
    var self = this;
    var zeroToStep = '';
    if (self.id < 10)
      zeroToStep = '0';

    var route = Router.current().route.path(this) || 'angular';

    if (route.indexOf('tutorials/whatsapp/ionic') !== -1) {
      return 'http://dotansimha.github.io/ionic-meteor-whatsapp-clone-step-' + zeroToStep + self.id;
    }
  },
  next: function () {
    var self = this;
    return nextPage(self);
  }
});

Template.stepbarCodeDiff.helpers({
  CommitDiff: function () {
    var self = this;
    return self.commitDiff;
  },
  ghRepoName: function () {
    var self = this;
    return self.parent.ghRepoName;
  },
  hideCommitDiff: function() {
    var self = this;
    var page = currPage(self);
    if (page) return page.hideCommitDiff;
  },
  currentCommit: function () {
    var self = this;
    var override = (currPage(self) || {}).diffStep;

    if (override) {
      return override;
    }

    var zeroToStep = '';
    if (self.id < 10)
      zeroToStep = '0';

    return zeroToStep + self.id;
  },
  previousCommit: function() {
    var self = this;
    var override = (prevPage(self) || {}).diffStep;

    if (override) {
      return override;
    }

    var zeroToStep = '';
    if ((self.id - 1) < 10)
      zeroToStep = '0';
    return zeroToStep + (self.id - 1);
  },
  next: function () {
    var self = this;
    var page = nextPage(self);
    if (page) return page;
  }
});

Template.improveDoc.helpers({
  contentDir: function () {
    var rData = Router.current().data();
    if (rData.parent && rData.parent.route == 'migration.angular2') {
      return 'migration/angular2';
    } else if (rData.parent && rData.parent.route == 'migration.angular1') {
      return 'migration/angular1';
    } else if (rData.parent && rData.parent.route == 'tutorials.socially.angular2') {
      return 'tutorials/socially/angular2';
    } else if (rData.parent && rData.parent.route == 'tutorials.whatsapp.ionic') {
      return 'tutorials/whatsapp/ionic'
    } else if (rData.parent && rData.parent.route == 'tutorials.whatsapp2.ionic') {
      return 'tutorials/whatsapp2/ionic';
    } else {
      return 'tutorials/socially/angular1';
    }
  }
});

Template.downloadPreviousStep.helpers({
  ghRepoName: function () {
    var rData = Router.current().data();

    switch (rData.parent.route) {
      case 'tutorials.socially.angular1':
        return 'https://github.com/Urigo/meteor-angular-socially';
      case 'tutorials.socially.angular2':
        return 'https://github.com/Urigo/meteor-angular2.0-socially';
      case 'tutorials.whatsapp.ionic':
        return 'https://github.com/DAB0mB/ionic-meteor-whatsapp';
      case 'tutorials.whatsapp.meteor':
        return 'https://github.com/DAB0mB/angular-meteor-whatsapp';
    }
  }
});

function currPage(view) {
  if (!view.parent.pages) return;
  var offset = parseInt(view.parent.pages[0].id);
  return view.parent.pages[parseInt(view.id, 10) - offset];
}

function nextPage(view) {
  if (!view.parent.pages) return;
  var offset = parseInt(view.parent.pages[0].id);
  return view.parent.pages[parseInt(view.id, 10) - offset + 1];
}

function prevPage(view) {
  if (!view.parent.pages) return;
  var offset = parseInt(view.parent.pages[0].id);
  return view.parent.pages[parseInt(view.id, 10) - offset - 1];
}
