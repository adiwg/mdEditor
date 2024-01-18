import Service from "@ember/service";
import Keycloak from "keycloak-js";
import { action, set } from "@ember/object";
import { tracked } from "@glimmer/tracking";

const keycloakConfig = {
  realm: "ScienceBase-B",
  clientId: "catalog",
  url: "https://www.sciencebase.gov/auth",
};

export default class KeycloakService extends Service {
  keycloak = null;
  @tracked isInitialized = false;
  @tracked isLoggingIn = false;
  @tracked isAuthenticated = false;
  @tracked username = null;

  constructor() {
    super(...arguments);
    this.keycloak = new Keycloak(keycloakConfig);
    this.initializeKeycloak();
  }

  async initializeKeycloak() {
    if (this.isInitialized) {
      return;
    }
    try {
      await this.keycloak.init({
        onLoad: "check-sso",
        flow: "standard",
        pkceMethod: "S256",
        checkLoginIframe: false,
        tokenMinValidity: 30,
      });
      set(this, "isInitialized", true);
      if (this.keycloak.authenticated) {
        set(this, "isAuthenticated", true);
        const profile = await this.keycloak.loadUserProfile();
        const profileUser = profile.username;
        set(this, "username", profileUser);
      }
    } catch (error) {
      console.error("Error initializing Keycloak:", error);
    }
  }

  @action
  async login() {
    if (this.isLoggingIn) {
      return;
    }
    set(this, "isLoggingIn", true);
    return this.keycloak.login();
  }
}
