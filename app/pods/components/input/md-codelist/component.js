/**
 * @module mdeditor
 * @submodule components-input
 */

import { computed } from '@ember/object';

import { inject as service } from '@ember/service';
import Select from '../md-select/component';

export default Select.extend({
  /**
   * Specialized select list control for displaying and selecting
   * options in mdCodes codelists.
   * Access to codelists is provided by the 'codelist' service.
   * Descriptions of all codes (tooltips) are embedded within the codelists.
   *
   * ```handlebars
   * \{{input/md-codelist
   *   create=true
   *   required=false
   *   tooltip=fasle
   *   icon=false
   *   disabled=false
   *   allowClear=true
   *   showValidations=true
   *   mdCodeName="codeName"
   *   value=value
   *   path="path"
   *   model=model
   *   placeholder="Choose"
   * }}
   * ```
   *
   * @class md-codelist
   * @extends md-select
   * @constructor
   */

  classNames: ['md-codelist'],
  layoutName: 'components/input/md-select',

  /**
   * The name of the mdCodes's codelist to use
   *
   * @property mdCodeName
   * @type String
   * @required
   */

  /**
   * Name of the attribute in the objectArray to be used for the
   * select list's option value.
   *
   * @property valuePath
   * @type String
   * @default codeName
   * @required
   */
  valuePath: 'codeName',
  /**
   * Name of the attribute in the objectArray to be used for the
   * select list's option name or display text.
   *
   * @property namePath
   * @type String
   * @default codename
   * @required
   */
  namePath: 'codeName',

  /**
   * Name of the attribute in the objectArray to be used for the
   * select list's tooltip.  If null, no tooltip will be
   * generated.
   *
   * @property tooltipPath
   * @type String
   * @default null
   */
  tooltipPath: 'description',

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

  mdCodes: service('codelist'),

  /*
   * The currently selected item in the codelist
   *
   * @property selectedItem
   * @type Ember.computed
   * @return PromiseObject
   */
  selectedItem: computed('value', function () {
    let value = this.value;

    return this.codelist
      .find((item) => {
        return item['codeId'] === value;
      });
  }),

  /**
   * mapped is a re-mapped array of code objects.
   * The initial codelist for 'mdCodeName' is provided by the 'codelist' service.
   *
   * @property mapped
   * @type {Array}
   * @category computed
   * @requires mdCodeName
   */
  mapped: computed('mdCodeName', function () {
    let codeId = this.valuePath;
    let codeName = this.namePath;
    let tooltip = this.tooltipPath;
    let codelist = [];
    let icons = this.icons;
    let defaultIcon = this.defaultIcon;
    let codelistName = this.mdCodeName;
    let mdCodelist = this.mdCodes
      .get(codelistName)
      .codelist
      //.uniqBy(codeName)
      .sortBy(codeName);

    mdCodelist.forEach(function (item) {
      let newObject = {
        codeId: item[codeId],
        codeName: item[codeName],
        tooltip: item[tooltip],
        icon: icons.get(item[codeName]) || icons.get(defaultIcon)
      };
      codelist.pushObject(newObject);
    });

    return codelist;
  }),

  /**
   * If a value is provided by the user which is not in the codelist and 'create=true'
   * the new value will be added into the codelist array
   *
   * @property codelist
   * @type {Array}
   * @category computed
   * @requires value
   */
  codelist: computed('value', 'filterId', 'mapped', function () {
    let codelist = this.mapped;
    let value = this.value;
    let create = this.create;
    let filter = this.filterId;

    if(value) {
      if(create) {
        let found = codelist.findBy('codeId', value);
        if(found === undefined) {
          let newObject = this.createCode(value);
          codelist.pushObject(newObject);
        }
      }
    }

    return codelist.rejectBy('codeId', filter);
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
      codeId: code,
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
  /*setValue(selected) {
    let valuePath = this.get('valuePath');
    let namePath = this.get('namePath');

    if(selected) {
      this.get('codelist')
    }
    let val = selected ? selected.codeName : null;
    this.set('value', val);
    this.change();
  },*/

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
