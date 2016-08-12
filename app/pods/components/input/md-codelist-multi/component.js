import Ember from 'ember';
import MdCodelist from '../md-codelist/component';

export default MdCodelist.extend({
  
  /**
   * Specialized select list control for displaying and selecting
   * options in mdCodes codelists.
   * Extends md-codelist.
   * Allows selection of multiple options. 
   *
   * @class md-codelist-multi
   * @constructor
   */
  
  /**
   * Initial value, returned value. 
   * Accepts either an Array of strings or JSON formatted array
   * of strings.  Example: '["foo","bar"]'
   *
   * @property value
   * @type Array
   * @return Array
   * @required
   */
  
  /**
   * Indicates whether to allow the user to enter a new option
   * not contained in the select list.
   *
   * @property create
   * @type Boolean
   * @default false
   */
  
  /**
   * Indicates if tooltips should be rendered for the options.
   *
   * @property tooltip
   * @type Boolean
   * @default false
   */
  
  /**
   * Indicates if icons should be rendered.
   *
   * @property icon
   * @type Boolean
   * @default false
   */
  
  /**
   * Whether to render a button to clear the selection.
   *
   * @property allowClear
   * @type Boolean
   * @default false
   */
  
  /**
   * Whether to close the selection list after a selection has been made.
   *
   * @property closeOnSelect
   * @type Boolean
   * @default true
   */
  
  /**
   * The string to display when no option is selected.
   *
   * @property placeholder
   * @type String
   * @default 'Select one option'
   */
  
  /**
   * Form label for select list
   *
   * @property label
   * @type String
   * @default null
   */
  
  /**
   * Form field width
   *
   * @property width
   * @type String
   * @default 100%
   */
  
  /**
   * Indicates if input is disabled
   *
   * @property disabled
   * @type Boolean
   * @default false
   */
  
  /*
   * codelist is an array of code objects in mdCodelist format
   * the initial codelist for 'mdCodeName' is provided by the 'codelist' service;
   * if a value is provided by the user which is not in the codelist and 'create=true'
   * the new value will be added into the codelist array;
   * then a Boolean 'selected' element will be added to each codelist object where the
   * selected option will be set to true and all others false.
   */
  codelist: Ember.computed(function() {
    let codelist = [];
    let codelistName = this.get('mdCodeName');
    let mdCodelist = this.get('mdCodes')
      .get(codelistName)
      .codelist
      .sortBy('codeName');
    mdCodelist.forEach(function(item) {
      let newObject = {
        code: item['code'],
        codeName: item['codeName'],
        description: item['description'],
        selected: false
      };
      codelist.pushObject(newObject);
    });

    let val = this.get('value');
    let selectedItems = typeof val === 'string' ? JSON.parse(val) : val;
    let create = this.get('create');
    if(selectedItems) {
      if(create) {
        selectedItems.forEach(function(selectedItem) {
          let mdIndex = -1;
          codelist.forEach(function(codeObject, cIndex) {
            if(selectedItem === codeObject['codeName']) {
              mdIndex = cIndex;
            }
          });
          if(mdIndex === -1) {
            let newObject = {
              code: Math.floor(Math.random() * 100000) + 1,
              codeName: selectedItem,
              description: 'Undefined',
              selected: false
            };
            codelist.pushObject(newObject);
          }
        });
      }
      codelist.forEach(function(item) {
        let mdIndex = selectedItems.indexOf(item['codeName']);
        if(mdIndex > -1) {
          item['selected'] = true;
        }
      });
    }

    return codelist;
  })
});
