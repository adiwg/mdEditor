/**
 * @module mdeditor
 * @submodule components-input
 */

import Ember from 'ember';
import MdCodelist from '../md-codelist/component';

export default MdCodelist.extend({
  classNames: ['md-codelist-multi'],
  /**
   * Specialized select list control for displaying and selecting
   * options in mdCodes codelists.
   * Extends md-codelist.
   * Allows selection of multiple options.
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
  theComponent: Ember.computed('create', function () {
    return this.get('create') ? 'power-select-with-create' :
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
  selectedItem: Ember.computed('value', function () {
    let value = this.get('value');
    let codelist = this.get('codelist');

    if(value) {
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
  codelist: Ember.computed('value', function () {
    let codelist = this.get('mapped');
    let value = this.get('value');
    let create = this.get('create');

    if(value) {
      if(create) {
        value.forEach((val) => {
          let found = codelist.findBy('codeId', val);
          if(found === undefined) {
            let newObject = this.createCode(val);
            codelist.pushObject(newObject);
          }
        });
      }
    }

    return codelist;
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
    if(this.get('create') && !Ember.isArray(selected)) {
      sel = this.get('selectedItem')
        .compact();
      sel.pushObject(selected);
    } else {
      sel = selected;
    }

    this.set('value', sel.mapBy('codeId'));
    this.change();
  }
});
