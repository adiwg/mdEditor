import Component from '@ember/component';
import { computed } from '@ember/object';
import { htmlSafe } from '@ember/string';
import { interpolate, parseArgs } from 'mdeditor/utils/md-interpolate';

export default Component.extend({
  tagName: 'span',

  init() {
    const options = this.options;

    this._super(...arguments);

    if(options) {
      Object.assign(this, options);
      //this.classNames.concat(options.classNames);
    }

    this.popoverHideDelay = this.popoverHideDelay || 500;
    this.icon = this.icon || 'sticky-note';
    this.title = this.title || 'Note';
    this.type = this.type || 'default';
    this.classNames = ['md-indicator', `md-${this.type}`].concat(this
      .classNames);
  },

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
  })
});
