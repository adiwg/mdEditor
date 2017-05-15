import Ember from 'ember';

const {
  Component,
  computed,
  get,
  set,
  isNone,
  run
} = Ember;

export default Component.extend({
  /**
   * Component for markdown enabled text-area.
   *
   * @class md-markdown-editor
   * @constructor
   * @module mdeditor
   * @submodule components-input
   * @example
   *   {{md-markdown-editor value=value options=options}}
   */

  /**
   * Make sure the value is not null or undefined, for Simple MDE.
   *
   * @event didReceiveAttrs
   * @public
   */
  didReceiveAttrs() {
    this._super(...arguments);

    run.once(() => {
      if(isNone(get(this, 'value'))) {
        set(this, 'value', '');
      }
    });
  },

  classNames: ['md-markdown-editor'],
  classNameBindings: ['label:form-group', 'required', 'errorClass'],
  attributeBindings: ['data-spy'],

  /**
   * Bound textarea value.
   *
   * @property value
   * @type {String}
   */

  /**
   * If true, the "row" the editor will be initally collapse.
   *
   * @property collapsed
   * @type {Boolean}
   * @default undefined
   */

  /**
   * If true, the collapse control will be added to the label header.
   *
   * @property collapsible
   * @type {Boolean}
   * @default true
   */
  collapsible: true,

  /**
   * Placeholder string.
   *
   * @property placeholder
   * @type {String}
   * @default Enter text, Markdown is supported.
   */
  placeholder: 'Enter text, Markdown is supported.',

  /**
   * Options for markdown editor
   *
   * @property options
   * @type {Object}
   * @category computed
   * @requires placeholder
   */
  options: computed('placeholder', function () {
    return {
      placeholder: get(this, 'placeholder'),
      status: [{
        className: 'length',
        defaultValue: (el) => {
          el.innerHTML =
            `<span class="length md-${get(this, 'errorClass')}">length: ${get(this, 'length')}</span>`;
        },
        onUpdate: (el) => {
          el.innerHTML =
            `<span class="length md-${get(this, 'errorClass')}">length: ${get(this, 'length')}</span>`;
        }
      }, 'lines', 'words', 'cursor']
    };
  }),

  /**
   * Returns the length of hte value string, 0 if falsy.
   *
   * @property length
   * @type {Number}
   * @category computed
   * @requires value
   */
  length: computed('value', function () {
      return get(this, 'value') ? get(this, 'value')
        .length : 0;
    })
    .readOnly(),

  /**
   * Returns string indicating error or warning based on maxlength.
   *
   * @property errorClass
   * @type {String}
   * @category computed
   * @requires value|maxlength
   */
  errorClass: computed('value', 'maxlength', function () {
    let length = get(this, 'length');
    let max = get(this, 'maxlength');

    if(!max || length <= max - 25) {
      return '';
    }

    if(length > max) {
      return 'error';
    } else if(length + 25 > max) {
      return 'warning';
    }

  })
});
