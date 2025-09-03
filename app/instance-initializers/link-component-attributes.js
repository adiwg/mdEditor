/**
 * Add Bootstrap data attributes to LinkComponent
 * Modern replacement for LinkComponent.reopen()
 */

export function initialize(appInstance) {
  const LinkComponent = appInstance.resolveRegistration('component:link-to');

  if (LinkComponent) {
    LinkComponent.reopen({
      attributeBindings: ['data-toggle', 'data-placement'],
    });
  }
}

export default {
  initialize,
};
