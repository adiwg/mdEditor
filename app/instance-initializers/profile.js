export function initialize(/* appInstance */) {
  // The custom-profile service is injected into all components via
  // Component.reopen() in app/app.js (replaces the deprecated
  // appInstance.inject('component', 'profile', 'service:custom-profile')).
}

export default {
  name: 'profile',
  initialize
};
