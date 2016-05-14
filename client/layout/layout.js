Template.layout.rendered = function () {
  if (window.oldIe) {
    $('body').addClass('oldIe');
  }

  twttr.ready(function (twttr) {
    twttr.events.bind('loaded', function (event) {
      Session.set("twitterWidgetLoaded", true);
      twttr.events.bind(
        'click',
        function (ev) {
          analytics.track("web.twitter-widget");
        }
      );
    });
  });
};

Template.layout.events({
  'click section': function () {
    $(".navbar-collapse").removeClass("in");
  }
});

Template.layout.helpers({
  currentApi: function (api) {
    if (Router.current().data) {
      var route = Router.current().data().route.replace('api.', '');

      return route.substr(0, route.lastIndexOf('.')) === api;
    }
  }
});
