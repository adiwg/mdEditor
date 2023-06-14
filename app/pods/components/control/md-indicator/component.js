import Component from '@ember/component';
import { computed } from '@ember/object';
import { htmlSafe } from '@ember/string';
import { interpolate, parseArgs } from 'mdeditor/utils/md-interpolate';

export default Component.extend({
  /**
   * @module mdeditor
   * @submodule components-control
   */

  /**
   * Icon that displays a popover.
   *
   * ```handlebars
   * \{{control/md-indicator
   *   icon="sticky-note"
   *   title="Hello"
   *   note="${foo} is a ${bar}"
   *   values=values
   *   type="danger"
   * }}
   * ```
   *
   * @class md-indicator
   * @constructor
   */

  tagName: 'span',

  init() {
    const options = this.options;

    this._super(...arguments);

    if (options) {
      Object.assign(this, options);
      //this.classNames.concat(options.classNames);
    }

    this.popoverHideDelay = this.popoverHideDelay || 500;
    this.popperContainer = this.popperContainer || 'body';
    this.icon = this.icon || 'sticky-note';
    this.event = this.event || 'hover';
    this.title = this.title || 'Note';
    this.type = this.type || 'default';
    this.classNames = ['md-indicator', `md-${this.type}`].concat(
      this.classNames
    );
  },

  /**
   * The string to display in the indicator, interpolation optional.
   *
   * @property note
   * @type {String}
   * @default undefined
   * @example
   *   "This ${foo} is named ${bar}."
   */

  /**
   * An object with property/value pairs used when interpolating the <a
   * href="#property_note">note</a>.
   *
   * @property values
   * @type {Object}
   * @default undefined
   */

  /**
   * The font-awesome icon for the indicator.
   *
   * @property icon
   * @type {String}
   * @default "sticky-note"
   */

  /**
   *  The event that the tooltip will hide and show for. Possible options are:
   *
   *  - 'hover'
   *  - 'click'
   *  - 'focus' (hides on blur)
   *  - 'none'
   *
   * @property event
   * @type {String}
   */

  /**
   * The title icon for the indicator.
   *
   * @property title
   * @type {String}
   * @default "Note"
   */

  /**
   * The style for the indicator. One of:
   *
   * - default
   * - primary
   * - info
   * - warning
   * - danger
   *
   * @property type
   * @type {String}
   * @default "default"
   */

  /**
   * The numeric value in milliseconds before the popover will hide after the user
   * exits the popover.
   *
   * @property popoverHideDelay
   * @type {Number}
   * @default 500
   *
   */

  /**
   * The string value that tells the tooltip to append to a specific element.
   * Default is set to the page `<body/>`.
   *
   * @property popperContainer
   * @type {String}
   * @default "body"
   */

  /**
   * The interpolated note string.
   *
   * @property interpolated
   * @type {String}
   * @default ""
   * @readOnly
   * @category computed
   * @requires note,values
   */
  interpolated: computed('note', 'values', function () {
    return htmlSafe(interpolate(this.note, this.values));
  }),

  /**
   * The values for interpolated variables.
   *
   * @property variables
   * @type {Object}
   * @category computed
   * @requires note
   */
  values: computed('note', function () {
    let args = parseArgs(this.note);

    return args.reduce((acc, a) => {
      acc[a] = this.get(a);

      return acc;
    }, {});
  }),
});
