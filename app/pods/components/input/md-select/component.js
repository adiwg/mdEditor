import Ember from 'ember';
import DS from 'ember-data';

export default Ember.Component.extend({
  /**
   * [objectArray description]
   * @type {Array} mdCodeName
   */

  /**
   * [valuePath description]
   * @type {String}
   */

  /**
   * [namePath description]
   * @type {String}
   */

  /**
   * [tooltipPath description]
   * @type {String}
   */
  tooltipPath: null,

  /**
   * [value description]
   * @type {Object}
   */

  /**
   * [allowClear description]
   * @type {Boolean}
   */
  allowClear: false,

  /**
   * [placeholder description]
   * @type {String}
   */
  placeholder: "Select one option",

  /**
   * [label description]
   * @type {String} label
   */

  /**
   * [width description]
   * @type {String} width
   */
  width: "100%",

  /**
   * codelist is an array of code objects re-mapped from the input 'objectArray'.
   * values from the input object array are mapped according the path parameters
   * provided. md-select does not allow creation of new objects.
   *
   * @return {Array}
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

  /**
   * Format options for the select tag
   * Add tooltips if requested
   *
   * @return {undefined}
   */
  didInsertElement: function() {
    this.get('codelist')
      .then(() => {
        function formatOption(option) {
          let text = option['text'];
          let tip = $(option.element)
            .data('tooltip');
          let $option = $(`<div> ${text}</div>`);
          if(tip) {
            $option = $option.append(
              $(
                `<span class="badge pull-right" data-toggle="tooltip"
                      data-placement="right" data-container="body"
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
    /**
     * do the binding to value
     */
    setValue: function() {
      let selectedEl = this.$('select');
      let selectedValue = selectedEl.val();
      this.set('value', selectedValue);
    }
  }

});
