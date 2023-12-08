import Router from "@ember/routing/router";

export function initialize(appInstance) {
  let catalogs = appInstance.lookup('service:publish').get('catalogs');

  Router.map(function() {
    this.route('publish', function() {
      catalogs.forEach((itm) => {
        this.route(itm.route);
      });
    });
  });
}

export default {
  initialize
};
