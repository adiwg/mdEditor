import Component from '@ember/component';
import { computed } from '@ember/object';
import { and } from '@ember/object/computed';

export default Component.extend({
  classNames: ['md-object-container'],
  classNameBindings: ['even'],
  attributeBindings: ['data-spy'],

  /**
   * The index of the container, usually representing the zero-based array index.
   *
   * @property collapsible
   * @type {Number|String}
   * @default "true"
   */

  /**
   * Determine whether the collapse control is rendered in the header.
   *
   * @property collapsible
   * @type {Boolean}
   * @default "true"
   */
  collapsible: true,

  /**
   * The value of this property must evaluate to true for the component to be
   * collapsible.
   *
   * @property collapseProperty
   * @type {Boolean}
   * @default "true"
   */
  collapseProperty: true,

  isCollapsible: and('collapsible', 'collapseProperty'),
  'data-spy': computed('title', function () {
    return `${this.title} ${this.index}`;
  }),

  /**
   * True if the position indicated by the `index` value is even on a zero-based
   * scale.
   *
   * @property even
   * @type {Boolean}
   * @default "false"
   * @readOnly
   * @category computed
   * @requires 'index'
   */
  even: computed('index', function () {
    return !!(Number.parseInt(this.index, 10) % 2);
  }),
});
