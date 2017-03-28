import Ember from 'ember';

const {
  computed,
  Component,
  A,
  typeOf
} = Ember;

export default Component.extend({
  /**
   * mdEditor class for input and edit of arrays of objects. The
   * component is rendered as an editable table.
   *
   * @class md-array-table
   * @submodule components-object
   * @constructor
   */

  init() {
    this._super(...arguments);

    if (!this.get('value')) {
      this.set('value', A());
    }
  },

  /**
   * The array to render in the template
   *
   * @property value
   * @type {Array}
   * @default Ember.A()
   * @required
   */
  value: [],

  /**
   * The template class to use for new items. This should be a constructor.
   * Objects should be created by extending Ember.Object.
   *  ```javascript
   *  Ember.Object.extend({
   *   foo: null,
   *   bar: Ember.A()
   *  }
   *  ```
   *
   * @property templateClass
   * @type {Any}
   * @constructor
   * @default String
   * @required
   */
  templateClass: String,

  /**
   * Comma-separated list of column headers to display in the table. If not
   * provided, the table header will not be created.
   *
   * @property columns
   * @type String
   */

  /**
   * Inital collapse staet fo the panel.
   *
   * @property isCollapsed
   * @type {Boolean}
   * @default undefined
   */

  /**
   * Indicates whether at least one item is required is required in the value
   * array.
   *
   * @property required
   * @type {Boolean}
   * @default false
   */
  required: false,

  /**
   * The title for the panel. Should be in singular form.
   *
   * @property title
   * @type {String}
   * @default Item
   */
  title: 'Item',

  /**
   * Array of column headers
   *
   * @property columnArray
   * @type {Array}
   * @readOnly
   * @category computed
   * @requires columns
   */
  columnArray: computed('columns', function() {
    let columns = this.get('columns');

    return (typeof columns === 'string') ? columns.split(',') : null;
  }),

  /**
   * Uses isCollapsed if defined, otherwise inspects array length.
   *
   * @property collapsed
   * @type {Boolean}
   * @readOnly
   * @category computed
   * @requires isCollapsed
   */
  collapsed: computed('isCollapsed', function() {
    let isCollapsed = this.get('isCollapsed');

    if (isCollapsed !== undefined) {
      return isCollapsed;
    } else if (this.get('value')
      .length > 0) {
      return false;
    } else {
      return true;
    }
  }),

  /**
   * Alias for values
   *
   * @property arrayValues
   * @type {Array}
   * @readOnly
   * @category computed
   * @requires value
   */
  arrayValues: computed.alias('value'),

  /**
   * The panel id selector
   *
   * @property panelId
   * @type {String}
   * @default "panel-{this.elementId}"
   * @readOnly
   * @category computed
   * @requires elementId
   */
  panelId: computed('elementId', function() {
    return 'panel-' + this.get('elementId');
  }),

  /**
   * The color of the counter displayed in the panel header
   *
   * @property pillColor
   * @type {String}
   * @readOnly
   * @category computed
   * @requires value.[]
   */
  pillColor: computed('value.[]', function() {
    let count = this.get('value')
      .length;
    let required = this.get('required');
    return (count === 0) ? required ? 'label-danger' : 'label-warning' :
      'label-info';
  }),

  /**
   * Focus the added row, or the last row on deletion.
   *
   * @method valueChanged
   * @return none
   */
  valueChanged() {
    Ember.run.schedule('afterRender', this, function() {
      let panel = this.$('.panel-collapse');
      let input = this.$('.panel-collapse tbody tr:last-of-type input')
        .first();

      if (panel.hasClass('in')) {
        input.focus();
      } else { //add a one-time listener to wait until panel is open
        panel.one('shown.bs.collapse', function() {
          input.focus();
        });
        panel.collapse('show');
      }
    });
  },

  actions: {
    addItem: function(value) {
      const Template = this.get('templateClass');

      value.pushObject(typeOf(Template) === 'class' ? Template.create() :
        new Template());
      this.valueChanged();
    },

    deleteItem: function(value, idx) {
      value.removeAt(idx);
      this.valueChanged();
    }
  }
});
