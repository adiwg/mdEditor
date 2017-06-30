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
   * @module mdeditor
   * @submodule components-input
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

  mdCodes: Ember.inject.service('codelist'),

  /*
   * The currently selected item in the codelist
   *
   * @property selectedItem
   * @type Ember.computed
   * @return PromiseObject
   */
  selectedItem: Ember.computed('value', function() {
    let value = this.get('value');

    return this.get('codelist')
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
  mapped: Ember.computed('mdCodeName', function() {
    let codeId = this.get('valuePath');
    let codeName = this.get('namePath');
    let tooltip = this.get('tooltipPath');
    let codelist = [];
    let icons = this.get('icons');
    let defaultIcon = this.get('defaultIcon');
    let codelistName = this.get('mdCodeName');
    let mdCodelist = this.get('mdCodes')
      .get(codelistName)
      .codelist
      .sortBy(codeName);

    mdCodelist.forEach(function(item) {
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
  codelist: Ember.computed('value','filterId', function() {
    let codelist = this.get('mapped');
    let value = this.get('value');
    let create = this.get('create');
    let filter = this.get('filterId');

    if (value) {
      if (create) {
        let found = codelist.findBy('codeId', value);
        if (found === undefined) {
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
    setValue: function(selected) {
      this.setValue(selected);
    },
    //handle the create
    create(selected) {
      let code = this.createCode(selected);

      this.setValue(code);
    }
  }

});
