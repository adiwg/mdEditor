import Component from '@ember/component';

export default Component.extend({
  classNameBindings: ['muted:text-muted'],

  /**
   * Whether to render the text muted.
   *
   * @property muted
   * @type {Boolean}
   * @default "true"
   */
  muted: true
});
