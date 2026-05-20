/**
 * @module mdeditor
 * @submodule components-input
 */

import { isArray, A } from '@ember/array';

import { computed, set } from '@ember/object';
import MdCodelist from '../md-codelist/component';

export default MdCodelist.extend({
  classNames: ['md-codelist-multi'],
  localValue: null,
  /**
   * Specialized select list control for displaying and selecting options in
   * mdCodes codelists. Extends md-codelist. Allows selection of multiple
   * options.
   *
   * ```handlebars
   * \{{input/md-codelist-multi
   *   value=array
   *   create=true
   *   tooltip=true
   *   icon=false
   *   mdCodeName="codeName"
   *   closeOnSelect=false
   *   placeholder="Select or enter one or more"
   * }}
   * ```
   *
   * @class md-codelist-multi
   * @constructor
   * @extends md-codelist
   */

  /**
   * Initial value, returned value.
   * Accepts an Array of strings.
   *
   * Example: `["foo","bar"]`
   *
   * @property value
   * @type Array
   * @return Array
   * @required
   */

  /**
   * The multiple property for power-select-with-create
   *
   * @property multiple
   * @private
   * @type Boolean
   * @default true
   */
  multiple: true,

  /**
   * The component to render
   *
   * @property theComponent
   * @type Ember.computed
   * @return String
   */
  theComponent: computed('create', function () {
    return this.create
      ? 'power-select-multiple-with-create'
      : 'power-select-multiple';
  }),

  /**
   * Whether to close the selection list after a selection has been made.
   *
   * @property closeOnSelect
   * @type Boolean
   * @default false
   */
  closeOnSelect: false,

  /**
   * The string to display when no option is selected.
   *
   * @property placeholder
   * @type String
   * @default 'Select one or more options'
   */
  placeholder: 'Select one or more options',

  /**
   * The currently selected item in the codelist
   *
   * @property selectedItem
   * @type Ember.computed
   * @return PromiseObject
   */
  effectiveValue: computed('value', 'localValue', 'model', 'path', function () {
    return this.model && this.path ? this.value : this.localValue;
  }),

  selectedItem: computed('effectiveValue', 'codelist.[]', function () {
    let value = this.effectiveValue;
    let codelist = this.codelist;

    if (value) {
      return codelist.filter((item) => {
        return value.includes(item['codeId']);
      });
    }
    return null;
  }),

  /**
   * If a value is provided by the user which is not in the codelist and 'create=true'
   * the new value will be added into the codelist array
   *
   * @property codelist
   * @type Ember.computed
   * @return Array
   */
  codelist: computed('effectiveValue', 'filterId', 'mapped', function () {
    let existing = this.mapped || A([]);
    let value = this.effectiveValue;
    let create = this.create;
    let filter = this.filterId;
    let extra = [];

    if (value && create) {
      value.forEach((val) => {
        let found = existing.findBy('codeId', val);
        if (found === undefined) {
          extra.push(this.createCode(val));
        }
      });
    }

    return A([...existing, ...extra]).rejectBy('codeId', filter);
  }),

  /**
   * Set the value on the select.
   *
   * @method setValue
   * @param {Array|Object} selected The value to set. Generally, an array of
   * selected objects, unless using the create option.
   */
  setValue(selected) {
    let sel;

    //power-select-with-create always sends a single object onCreate
    //we need to add that object to the selectedItem array
    if (this.create && !isArray(selected)) {
      sel = this.selectedItem.compact();
      sel.pushObject(selected);
    } else {
      sel = selected;
    }

    let nextValue = (sel || []).mapBy('codeId');

    if (this.model && this.path) {
      set(this, 'value', nextValue);
    } else {
      set(this, 'localValue', nextValue);
    }

    this.change();
  },

  init() {
    this._super(...arguments);
    this.setValue = this.setValue.bind(this);
    if (!(this.model && this.path)) {
      set(this, 'localValue', this.value || []);
    }
  },
});
