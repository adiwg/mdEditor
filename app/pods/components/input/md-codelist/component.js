import Ember from 'ember';

export default Ember.Component.extend({

  /**
   * Specialized select list control for displaying and selecting
   * options in mdCodes codelists.
   * Access to codelists is provided by the 'codelist' service. 
   * Descriptions of all codes (tooltips) are embedded within the codelists.
   *
   * @class md-codelist
   * @constructor
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
   * Indicates whether to allow the user to enter a new option
   * not contained in the select list.
   *
   * @property create
   * @type Boolean
   * @default false
   */
  create: false,

  /**
   * Indicates if tooltips should be rendered for the options.
   *
   * @property tooltip
   * @type Boolean
   * @default false
   */
  tooltip: false,

  /**
   * Indicates if icons should be rendered.
   * 
   * @property icon
   * @type Boolean
   * @default false
   */
  icon: false,

  /**
   * Whether to render a button to clear the selection.
   * 
   * @property allowClear
   * @type Boolean
   * @default false
   */
  allowClear: false,
  
  /**
   * Whether to close the selection list after a selection has been made.
   * 
   * @property closeOnSelect
   * @type Boolean
   * @default true
   */
  closeOnSelect: true,

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

  /**
   * Form field width
   *
   * @property width
   * @type String
   * @default 100%
   */
  width: "100%",

  /**
   * Indicates if input is disabled
   *
   * @property disabled
   * @type Boolean
   * @default false
   */
  disabled: false,

  mdCodes: Ember.inject.service('codelist'),
  icons: Ember.inject.service('icon'),

  /*
   * codelist is an array of code objects in mdCodelist format
   * the initial codelist for 'mdCodeName' is provided by the 'codelist' service;
   * if a value is provided by the user which is not in the codelist and 'create=true'
   * the new value will be added into the codelist array;
   * then a Boolean 'selected' element will be added to each codelist object where the
   * selected option will be set to true and all others false.
   */
  codelist: Ember.computed('value', function() {
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

    let selectedItem = this.get('value');
    let create = this.get('create');
    if(selectedItem) {
      if(create) {
        let index = mdCodelist.indexOf(selectedItem);
        if(index === -1) {
          let newObject = {
            code: Math.floor(Math.random() * 100000) + 1,
            codeName: selectedItem,
            description: 'Undefined',
            selected: false
          };
          codelist.pushObject(newObject);
        }
      }

      codelist.forEach(function(item) {
        item['selected'] = (item['codeName'] === selectedItem);
      });
    }

    return codelist;
  }),

  // Format options in the select tag
  // Add tooltips and/or icons as requested
  didInsertElement: function() {
    let tooltip = this.get('tooltip');
    let icon = this.get('icon');
    let icons = this.get('icons');

    function formatOption(option) {
      let text = option['text'];
      let $option = $(`<div> ${text}</div>`);

      if(icon) {
        $option.prepend(
          `<span class="fa fa-${icons.get(text) || icons.get('defaultList')}"> </span>`
        );
      }

      if(tooltip) {
        let tip = $(option.element)
          .data('tooltip');

        $option = $option.append(
          $(
            `<span class="badge pull-right" data-toggle="tooltip"
            data-placement="left" data-container="body"
            title="${tip}">?</span>`
          )
          .on('mousedown', function(e) {
            $(e.target)
              .tooltip('destroy');
            return true;
          })
          .tooltip());
      }
      return $option;
    }

    this.$('.md-codelist')
      .select2({
        placeholder: this.get('placeholder'),
        allowClear: this.get('allowClear'),
        tags: this.get('create'),
        templateResult: formatOption,
        width: this.get('width'),
        minimumResultsForSearch: 10,
        closeOnSelect: (this.$('.md-codelist select').prop('multiple') === 'multiple') ? 
            false : this.get('closeOnSelect'),
        theme: 'bootstrap'
      });
  },

  didRender() {
    this.$('.md-codelist')
      .trigger('change.select2');
  },

  actions: {
    // do the binding to value
    setValue: function() {
      let selectedEl = this.$('select');
      let selectedValue = selectedEl.val();
      this.set('value', selectedValue);
    }
  }

});
