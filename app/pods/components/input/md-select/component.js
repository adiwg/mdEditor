import Ember from 'ember';
import DS from 'ember-data';

export default Ember.Component.extend({

  /**
   * A select list control for displaying and selecting options
   * provided in an array or promise array.
   *
   * @class md-select
   * @constructor
   */

  /**
   * An array or promise array containing the options for the
   * select list.
   * At a minimum the array elements should provide attributes for the
   * name value pairs displayed as select list options.
   * Tooltips may also be included.
   * Other attributes in the array elements will be ignored.
   *
   * @property objectArray
   * @type Array
   * @required
   */

  /**
   * Name of the attribute in the objectArray to be used for the
   * select list's option value.
   *
   * @property valuePath
   * @type String
   * @required
   */

  /**
   * Name of the attribute in the objectArray to be used for the
   * select list's option name or display text.
   *
   * @property namePath
   * @type String
   * @required
   */

  /**
   * Name of the attribute in the objectArray to be used for the
   * select list's tooltip.  If null, not tooltip will be
   * generated.
   *
   * @property tooltipPath
   * @type String
   * @default null
   */
  tooltipPath: null,

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

  /*
   * codelist is an array of code objects re-mapped from the input 'objectArray'.
   * values from the input object array are mapped according the path parameters
   * provided. md-select does not allow creation of new objects.
   */
  codelist: Ember.computed(function() {
    const objArray = this.get('objectArray');
    let inList = new Ember.RSVP.Promise(function(resolve, reject) {
      // succeed
      resolve(objArray);
      // or reject
      reject(new Error('Couldn\'t create a promise.'));
    });
    let codeId = this.get('valuePath');
    let codeName = this.get('namePath');
    let tooltip = this.get('tooltipPath');
    let selectedItem = this.get('value');
    let outList = [];

    return DS.PromiseArray.create({
      promise: inList.then(function(arr) {
        arr.forEach(function(item) {
          let newObject = {
            codeId: item.get(codeId),
            codeName: item.get(codeName),
            tooltip: null,
            selected: false
          };
          if(tooltip) {
            newObject.tooltip = item.get(tooltip);
          }
          outList.pushObject(newObject);
        });

        if(selectedItem) {
          outList.forEach(function(item) {
            item['selected'] = (item['codeId'] ===
              selectedItem);
          });
        }
        return outList;
      })
    });
  }),

  // Format options in the select tag
  // Add tooltips and/or icons as requested
  didInsertElement: function() {
    this.get('codelist')
      .then(() => {
        function formatOption(option) {
          let text = option['text'];
          let tip = Ember.$(option.element)
            .data('tooltip');
          let $option = Ember.$(`<div> ${text}</div>`);
          if(tip) {
            $option = $option.append(
              Ember.$(
                `<span class="badge pull-right" data-toggle="tooltip"
                      data-placement="right" data-container="body"
                      title="${tip}">?</span>`
              )
              .on('mousedown', function(e) {
                Ember.$(e.target)
                  .tooltip('destroy');
                return true;
              })
              .tooltip());
          }

          return $option;
        }

        this.$(".md-select")
          .select2({
            placeholder: this.get('placeholder'),
            allowClear: this.get('allowClear'),
            templateResult: formatOption,
            width: this.get('width'),
            minimumResultsForSearch: 10,
            theme: 'bootstrap'
          });
      });

  },

  didRender() {
    this.$('.md-select')
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
