/**
 * @module mdeditor
 * @submodule components-input
 */

import Ember from 'ember';
import Select from '../md-select/component';

export default Select.extend({
  classNames: ['md-codelist'],
  layoutName: 'components/input/md-select',
  /**
   * Specialized select list control for displaying and selecting
   * options in mdCodes codelists.
   * Access to codelists is provided by the 'codelist' service.
   * Descriptions of all codes (tooltips) are embedded within the codelists.
   *
   * @class md-codelist
   * @constructor
   * @extends md-select
   */

  /**
   * The name of the mdCodes's codelist to use
   *
   * @property mdCodeName
   * @type String
   * @required
   */

  /**
   * Initial value, returned value.
   *
   * @property value
   * @type String
   * @return String
   * @required
   */

  /**
   * Whether to render a button to clear the selection.
   *
   * @property allowClear
   * @type Boolean
   * @default true
   */
  allowClear: true,

  /**
   * The string to display when no option is selected.
   *
   * @property placeholder
   * @type String
   * @default 'Select one option'
   */
  placeholder: "Select one option",

  /**
   * Form label for select list
   *
   * @property label
   * @type String
   * @default null
   */
  label: null,

  mdCodes: Ember.inject.service('codelist'),
  icons: Ember.inject.service('icon'),

  /*
   * The currently selected item in the codelist
   *
   * @property selectedItem
   * @type Ember.computed
   * @return PromiseObject
   */
  selectedItem: Ember.computed('value', function () {
    let value = this.get('value');

    return this.get('codelist')
      .find((item) => {
        return item['codeName'] === value;
      });
  }),

  /**
   * mapped is a re-mapped array of code objects.
   * The initial codelist for 'mdCodeName' is provided by the 'codelist' service.
   *
   * @property mapped
   * @type Ember.computed
   * @return Array
   */
  mapped: Ember.computed('mdCodeName', function () {
    let codelist = [];
    let icons = this.get('icons');
    let codelistName = this.get('mdCodeName');
    let mdCodelist = this.get('mdCodes')
      .get(codelistName)
      .codelist
      .sortBy('codeName');

    mdCodelist.forEach(function (item) {
      let newObject = {
        code: item['code'],
        codeName: item['codeName'],
        tooltip: item['description'],
        icon: icons.get(item['codeName']) || icons.get(
          'defaultList')
      };
      codelist.pushObject(newObject);
    });

    return codelist;
  }),

  /*
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
        let found = codelist.findBy('codeName', value);
        if(found === undefined) {
          let newObject = this.createCode(value);
          codelist.pushObject(newObject);
        }
      }
    }

    return codelist;
  }),

  /**
   * Creates a new codelist entry with a randomly generated code identifier.
   *
   * @method createCode
   * @param  {String} code The codeName
   * @return {Object}      Returns a new codelist object
   */
  createCode(code) {
    return {
      code: Math.floor(Math.random() * 100000) + 1,
      codeName: code,
      description: 'Undefined'
    };
  },

  /**
   * Set the value on the select.
   *
   * @method setValue
   * @param {Object} selected The object with the value(codeName) to set.
   */
  setValue(selected) {
    let val = selected ? selected.codeName : null;
    this.set('value', val);
    this.change();
  },

  actions: {
    // do the binding to value
    setValue: function (selected) {
      this.setValue(selected);
    },
    //handle the create
    create(selected) {
      let code = this.createCode(selected);

      this.setValue(code);
    }
  }

});
