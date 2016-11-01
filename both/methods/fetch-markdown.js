if (Meteor.isServer) {
  cache = {};

  Meteor.methods({
    fetchMarkdown: (options) => {
      var url = 'https://raw.githubusercontent.com/' + options.repo + '/' + options.revision + '/' + options.file;

      if (cache[url]) {
        console.log("Fetching " + url + " from cache...");
        return cache[url];
      }
      else {
        console.log("Fetching " + url + " from remote...");

        cache[url] = HTTP.call("get", url).content;

        return cache[url];
      }
    }
  });
}