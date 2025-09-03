/**
 * Add Bootstrap data attributes to LinkComponent
 * Modern replacement for LinkComponent.reopen() using component override
 */

import LinkComponent from '@ember/routing/link-component';

export function initialize(application) {
  // Create a custom LinkComponent with Bootstrap attributes
  const CustomLinkComponent = LinkComponent.extend({
    attributeBindings: ['data-toggle', 'data-placement'],
  });

  // Register the custom component to override the default link-to
  application.register('component:link-to', CustomLinkComponent, { instantiate: false });
}

export default {
  initialize,
};
