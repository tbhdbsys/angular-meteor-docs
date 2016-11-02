METEOR_RXJS_API = function(version, reversion) {
  var urlBase = '/api/meteor-rxjs/' + version + '/';
  var repo = "Urigo/meteor-rxjs";
  reversion = reversion || "59772fff59f4060db63c0cce969c2beaa98c1a35";

  return {
    groups: [
      {
        id: "0",
        title: "",
        route: "api",
        path: urlBase,
        redirectRoute: "/api/meteor-rxjs/" + version + "/meteor-observable",
        template: "api",
        seoTitleSuffix: " | Meteor-RxJS API",
        seoDesc: "angular2-meteor is a realtime full stack that combines the best frameworks. use your existing Angular2.0 applications with Meteor - the best backend framework for AngularJS 2.0 applications.",
        pages: [
          {
            id: "01",
            route: "api.meteor-rxjs." + version + ".MeteorObservable",
            path: urlBase + "meteor-observable",
            title: "MeteorObservable",
            seoTitle: "MeteorObservable",
            mdContent: "",
            remoteMdContent: {
              repo: repo,
              file: "docs/MeteorObservable.md",
              revision: reversion
            }
          },
          {
            id: "02",
            route: "api.meteor-rxjs." + version + ".ObservableCollection",
            path: urlBase + "observable-collection",
            title: "ObservableCollection",
            seoTitle: "ObservableCollection",
            remoteMdContent: {
              repo: repo,
              file: "docs/ObservableCollection.md",
              revision: reversion
            }
          },
          {
            id: "03",
            route: "api.meteor-rxjs." + version + ".ObservableCursor",
            path: urlBase + "observable-cursor",
            title: "ObservableCursor",
            seoTitle: "ObservableCursor",
            remoteMdContent: {
              repo: repo,
              file: "docs/ObservableCursor.md",
              revision: reversion
            }
          }
        ]
      }
    ]
  }
};