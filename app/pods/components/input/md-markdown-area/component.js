/**
 * @module mdeditor
 * @submodule components-input
 */

import Component from '@ember/component';

import { set, get, computed } from '@ember/object';
import { assign } from '@ember/polyfills';
import { isNone, isEmpty } from '@ember/utils';
import { run, once } from '@ember/runloop';
import EasyMDE from 'easymde';

export default Component.extend({
  /**
   * Component for markdown enabled text-area.
   *
   * @class md-markdown-editor
   * @constructor
   * @example
   *   {{md-markdown-editor
   *     value=value
   *     label="Label"
   *     placeholder="A short description of the field."
   *     change=(action (mut value))
   *     maxlength=300
   *   }}
   */

  /**
   *
   * Instantiate editor.
   * Fix fullscreen render inside of liquid-outlet.
   * Handle change event.
   *
   * @event didInsertElement
   * @public
   */
  didInsertElement() {
    this._super(...arguments);

    this.currentEditor = new EasyMDE(assign({
      element: document.getElementById(`md-${this.elementId}`)
        .querySelector(
          'textarea'),
    }, this.options));

    let $el = this.$();

    const oldEditorSetOption = this.currentEditor.codemirror.setOption;

    this.currentEditor.codemirror.setOption = function (option, value) {
      oldEditorSetOption.apply(this, arguments);

      if(option === 'fullScreen') {
        $el.parents('.liquid-child,.liquid-container, .md-card')
          .toggleClass(
            'full-screen', value);
      }
    };

    this.currentEditor.value(this.value);

    this.get('currentEditor').codemirror.on('change', () => once(this,
      function () {
        if(this.change) {
          this.change(this.get('currentEditor').value())
        }
      }));
  },

  willDestroyElement() {
    this.get('currentEditor').toTextArea();
    this.set('currentEditor', null);
  },

  /**
   * Make sure the value is not null or undefined, for EasyMDE.
   *
   * @event didReceiveAttrs
   * @public
   */
  didReceiveAttrs() {
    this._super(...arguments);

    run.once(this, () => {
      if(isNone(get(this, 'value'))) {
        set(this, 'value', '');
      }

      let editor = this.get('currentEditor');

      if(isEmpty(editor)) {
        return;
      }

      let cursor = editor.codemirror.getDoc().getCursor();

      editor.value(this.get('value') || '');
      editor.codemirror.getDoc().setCursor(cursor);
    });
  },
  /**
   * @private
   * @variable
   * to hold the EasyMDE instance
   */
  currentEditor: null,

  /**
   * action to call when the value on the editor changes
   */
  change: null,

  classNames: ['md-markdown-editor'],
  classNameBindings: ['label:form-group', 'required', 'errorClass'],
  attributeBindings: ['data-spy'],

  /**
   * The current EasyMDE editor instance.
   *
   * @property editor
   * @type {Object}
   * @privateabstract
   */

  /**
   * Bound textarea value.
   *
   * @property value
   * @type {String}
   */

  /**
   * The maximum number of characters allowed.
   *
   * @property maxlength
   * @type {Number}
   */

  /**
   * If true, the "row" the editor will be initally collapse.
   *
   * @property collapsed
   * @type {Boolean}
   * @default undefined
   */

  /**
   * If set to false, disable the spell checker.
   *
   * @property spellChecker
   * @type {Boolean}
   * @default false
   */
  spellChecker: false,

  /**
   * If set to true, use the native broswer spellChecker.
   *
   * @property nativeSpellcheck
   * @type {Boolean}
   * @default true
   */
  nativeSpellcheck: true,

  /**
   * `textarea` or `contenteditable`. 'contenteditable' option is necessary to
   * enable nativeSpellcheck.
   *
   * @property inputStyle
   * @type {String}
   * @default contenteditable
   */
  inputStyle: 'contenteditable',

  /**
   * If set to `true`, force downloads Font Awesome (used for icons). If set to
   * `false`, prevents downloading. `Undefined` will
   * intelligently check whether Font Awesome has already been included, then
   * download accordingly.
   *
   * @property autoDownloadFontAwesome
   * @type {Boolean}
   * @default false
   */
  autoDownloadFontAwesome: false,

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
  options: computed('placeholder', 'elementId', function () {
    return {
      placeholder: this.placeholder,
      spellChecker: this.spellChecker,
      nativeSpellcheck: this.nativeSpellcheck,
      inputStyle: this.inputStyle,
      autoDownloadFontAwesome: this.autoDownloadFontAwesome,
      // value: this.value,
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
      }, 'lines', 'words']
    };
  }),

  /**
   * Returns the length of the value string, 0 if falsy.
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

    if(get(this, 'required') && length < 1) {
      return 'error';
    }

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
