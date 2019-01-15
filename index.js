module.exports = class Application {
  constructor() {
    this.routes = {
      GET: {},
      POST: {},
      PATCH: {},
      HEAD: {}
    };
  }

  listen(event) {
    var request = event.request || null;
    if (!request) {
      return null;
    }
    var url = new URL(request.url)
    var pathname = url.pathname;
    var paths = this.routes[request.method] || {};
    var match = {};

    // Determine if there is an exact path match, or a regular
    // expression path match.
    for (var path in paths) {
      if (pathname == path) {
        return paths[path](request)
      } else if (match = pathname.match(path)) {
        if (!request.params) {
          request.params = {};
        }
        for (var group in match.groups) {
          request.params[group] = match.groups[group];
        }
        return paths[path](request)
      }
    }
  }

  get(path, f) {
    this.routes.GET[path] =  f
  }

  post(path, f) {
    this.routes.POST[path] =  f
  }

  patch(path, f) {
    this.routes.PATCH[path] =  f
  }

  head(path, f) {
    this.routes.HEAD[path] =  f
  }
};
