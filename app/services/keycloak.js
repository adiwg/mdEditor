import Service from '@ember/service';
import Keycloak from 'keycloak-js';

const keycloakConfig = {
  realm: "Sciencebase-B",
  clientId: "mdeditor",
  url: "https://www.sciencebase.gov/auth/admin/master/console/#"
};

// const keycloakConfig = {
//   realm: "Sciencebase-B",
//   clientId: "mdeditor",
//   url: "https://www.sciencebase.gov/auth"
// };

export default Service.extend({
  keycloak: null,
  isInitialized: false,

  init() {
    console.log('keycloak init');
    this._super(...arguments);
    this.keycloak = new Keycloak(keycloakConfig);
    this.initializeKeycloak();
  },

  async initializeKeycloak() {
    try {
      await this.keycloak.init({ onLoad: 'login-required' });
      this.isInitialized = true;
      console.log('Keycloak Initialized');
    } catch (error) {
      console.error('Error initializing Keycloak:', error);
    }
  },

  async login() {
    console.log('keycloak login');
    if (!this.isInitialized) {
      await this.initializeKeycloak();
    }
    return this.keycloak.login();
  },

  async logout() {
    console.log('keycloak logout');
    if (this.isInitialized) {
      return this.keycloak.logout();
    }
  }
});
