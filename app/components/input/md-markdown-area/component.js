/**
 * @module mdeditor
 * @submodule components-input
 */

import Component from '@ember/component';

import { set, get, computed } from '@ember/object';
import { isNone } from '@ember/utils';
import { run } from '@ember/runloop';

export default Component.extend({
  /**
   * Component for markdown enabled text-area.
   *
   * @class md-markdown-editor
   * @constructor
   * @example
   *   {{md-markdown-editor value=value options=options}}
   */

  /**
   * Fix fullscreen render inside of liquid-outlet..
   *
   * @event didInsertElement
   * @public
   */
  didInsertElement() {
    this._super(...arguments);

    let editor = this.editor;
    let $el = this.$();

    const oldEditorSetOption = editor.codemirror.setOption;

    editor.codemirror.setOption = function (option, value) {
      oldEditorSetOption.apply(this, arguments);

      if (option === 'fullScreen') {
        $el
          .parents('.liquid-child,.liquid-container, .md-card')
          .toggleClass('full-screen', value);
      }
    };
  },

  /**
   * Make sure the value is not null or undefined, for Simple MDE.
   *
   * @event didReceiveAttrs
   * @public
   */
  didReceiveAttrs() {
    this._super(...arguments);

    run.once(this, () => {
      if (isNone(this.value)) {
        set(this, 'value', '');
      }
    });
  },

  classNames: ['md-markdown-editor'],
  classNameBindings: ['label:form-group', 'required', 'errorClass'],
  attributeBindings: ['data-spy'],

  /**
   * The current simplemde editor instance.
   *
   * @property editor
   * @type {Object}
   * @private
   */

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
      placeholder: this.placeholder,
      status: [
        {
          className: 'length',
          defaultValue: (el) => {
            el.innerHTML = `<span class="length md-${this.errorClass}">length: ${this.length}</span>`;
          },
          onUpdate: (el) => {
            el.innerHTML = `<span class="length md-${this.errorClass}">length: ${this.length}</span>`;
          },
        },
        'lines',
        'words',
        'cursor',
      ],
    };
  }),

  // fullscreen: Ember.observer('editor.codemirror.options.fullScreen', function(){
  //   console.info(this.get('editor.codemirror.options.fullScreen'));
  // }),

  /**
   * Returns the length of hte value string, 0 if falsy.
   *
   * @property length
   * @type {Number}
   * @category computed
   * @requires value
   */
  length: computed('value', function () {
    return this.value ? this.value.length : 0;
  }).readOnly(),

  /**
   * Returns string indicating error or warning based on maxlength.
   *
   * @property errorClass
   * @type {String}
   * @category computed
   * @requires value|maxlength
   */
  errorClass: computed('value', 'maxlength', function () {
    let length = this.length;
    let max = this.maxlength;

    if (this.required && length < 1) {
      return 'error';
    }

    if (!max || length <= max - 25) {
      return '';
    }

    if (length > max) {
      return 'error';
    } else if (length + 25 > max) {
      return 'warning';
    }
  }),
});
