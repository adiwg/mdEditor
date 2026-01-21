export function initialize(/* appInstance */) {
  // Implicit injections are deprecated in Ember 3.x+
  // Components that need the custom-profile service should use:
  //   @service('custom-profile') profile;
  // See: https://deprecations.emberjs.com/v3.x#toc_implicit-injections
}

export default {
  name: 'profile',
  initialize
};
