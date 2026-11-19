export function initialize(/* appInstance */) {
  // Implicit injections are deprecated in Ember 3.x+
  // Routes and controllers that need the settings service should use:
  //   @service settings;
  // See: https://deprecations.emberjs.com/v3.x#toc_implicit-injections
}

export default {
  name: 'settings',
  initialize
};
