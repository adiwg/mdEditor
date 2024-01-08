import Route from "@ember/routing/route";
import { inject as service } from "@ember/service";

export default Route.extend({
  keycloak: service(),
  init() {
    this._super(...arguments);
    console.log("auth callback init");
    // this.keycloak.initializeKeycloak();
  },

  actions: {
    login() {
      console.log("auth callback login");
      return this.keycloak.login();
    },
  },
});
