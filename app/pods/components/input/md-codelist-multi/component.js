import Ember from 'ember';
import MdCodelist from '../md-codelist/component';

export default MdCodelist.extend({
/**
 * Initial value. Accepts either an Array or JSON formatted array of strings.
 * Example: '["foo","bar"]'
 *
 * @property value
 * @type {Array|String}
 */

  /**
   * codelist is an array of code objects in mdCodelist format
   * the initial codelist for 'mdCodeName' is pulled from the 'codelist' service;
   * then if a new value was created by the user a new object will be added into the codelist;
   * then a new 'selected' element will be added to each codelist object to let select2
   * and the template <option> tag know this item should be selected.
   *
   * @return {Array}
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
