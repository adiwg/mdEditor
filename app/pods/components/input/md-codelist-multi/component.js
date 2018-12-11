/**
 * @module mdeditor
 * @submodule components-input
 */

import { isArray } from '@ember/array';

import { computed } from '@ember/object';
import MdCodelist from '../md-codelist/component';

export default MdCodelist.extend({
  classNames: ['md-codelist-multi'],
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
  theComponent: computed('create', function() {
    return this.create ? 'power-select-multiple-with-create' :
      'power-select-multiple';
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
  selectedItem: computed('value', function() {
    let value = this.value;
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
  codelist: computed('value', 'filterId', 'mapped', function() {
    let codelist = this.mapped;
    let value = this.value;
    let create = this.create;
    let filter = this.filterId;

    if (value) {
      if (create) {
        value.forEach((val) => {
          let found = codelist.findBy('codeId', val);
          if (found === undefined) {
            let newObject = this.createCode(val);
            codelist.pushObject(newObject);
          }
        });
      }
    }

    return codelist.rejectBy('codeId', filter);
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

    //power-select-with-create always sends a single object oncreate
    //we need to add that object to the selectedItem array
    if (this.create && !isArray(selected)) {
      sel = this.selectedItem
        .compact();
      sel.pushObject(selected);
    } else {
      sel = selected;
    }

    this.set('value', sel.mapBy('codeId'));
    this.change();
  }
});
