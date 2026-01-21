/**
 * @submodule components-object
 * @module mdeditor
 */

import { alias } from '@ember/object/computed';
import Component from '@ember/component';
import classic from 'ember-classic-decorator';
import { getOwner } from '@ember/application';
import { isArray, A } from '@ember/array';
import { schedule } from '@ember/runloop';
import { typeOf } from '@ember/utils';
import { get, action } from '@ember/object';
import $ from 'jquery';
import { applyObjectTemplateArray } from 'mdeditor/utils/object-template';

@classic
export default class MdArrayTableComponent extends Component {
  /**
   * mdEditor class for input and edit of arrays of objects. The
   * component is rendered as an editable table.
   *
   * @class md-array-table
   * @constructor
   * @uses object-template
   */

  attributeBindings = ['dataSpy:data-spy'];

  /**
   * The array to render in the template
   *
   * @property value
   * @type {Array}
   * @default Ember.A()
   * @required
   */
  value = A();

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
   * @default null
   * @required
   */
  templateClass = null;

  /**
   * Comma-separated list of column headers to display in the table. If not
   * provided, the table header will not be created.
   *
   * @property columns
   * @type String
   */

  /**
   * Inital collapse state fo the panel.
   *
   * @property isCollapsed
   * @type {Boolean}
   * @default undefined
   */

  /**
   * The validation to apply to the array items.
   *
   * @property validation
   * @type {Ember.Mixin}
   * @default undefined
   */

  /**
   * Whether to render in a panel.
   *
   * @property plain
   * @type {Boolean}
   * @default false
   */
  plain = false;

  /**
   * Whether to render a panel drop-shadow.
   *
   * @property plain
   * @type {Boolean}
   * @default false
   */
  shadow = true;

  /**
   * Indicates whether at least one item is required is required in the value
   * array.
   *
   * @property required
   * @type {Boolean}
   * @default false
   */
  required = false;

  /**
   * The title for the panel. Should be in singular form.
   *
   * @property title
   * @type {String}
   * @default Item
   */
  title = 'Item';

  /**
   * The error message to display, if required = true. Overrides the validation
   * message.
   *
   * @property errorMessage
   * @type {String}
   * @default undefined
   */

  /**
   * The data-spy text. Defaults to the title.
   *
   * @property dataSpy
   * @type {String}
   * @default "this.title"
   * @category computed
   */
  get dataSpy() {
    return this.title;
  }

  /**
   * If true, an alert will be rendered with an "add" button when no items are
   * present.
   *
   * @property alertIfEmpty
   * @type {Boolean}
   * @default true
   */
  alertIfEmpty = true;

  /**
   * Array of column headers
   *
   * @property columnArray
   * @type {Array}
   * @readOnly
   * @category computed
   * @requires columns
   */
  get columnArray() {
    let columns = this.columns;
    return typeof columns === 'string' ? columns.split(',') : null;
  }

  /**
   * Render an alert if the items array is empty and alertIfEmpty is true.
   *
   * @property showAlert
   * @type {Boolean}
   * @default "false"
   * @readOnly
   * @category computed
   * @requires items.length,alertIfEmpty
   */
  get showAlert() {
    return this.arrayValues?.length === 0 && this.alertIfEmpty;
  }

  /**
   * Uses isCollapsed if defined, otherwise inspects array length.
   *
   * @property collapsed
   * @type {Boolean}
   * @readOnly
   * @category computed
   * @requires isCollapsed
   */
  get collapsed() {
    let isCollapsed = this.isCollapsed;
    let value = this.arrayValues;

    if (isCollapsed !== undefined) {
      return isCollapsed;
    } else if (isArray(value) && get(value, 'length') > 0) {
      return false;
    } else {
      return true;
    }
  }

  /**
   * Alias for values
   *
   * @property arrayValues
   * @type {Array}
   * @readOnly
   * @category computed
   * @requires value
   */
  @alias('value') arrayValues;

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
  get panelId() {
    return 'panel-' + this.elementId;
  }

  /**
   * The color of the counter displayed in the panel header
   *
   * @property pillColor
   * @type {String}
   * @readOnly
   * @category computed
   * @requires value.[]
   */
  get pillColor() {
    let count = this.value?.length || 0;
    let required = this.required;
    return count === 0
      ? required
        ? 'label-danger'
        : 'label-warning'
      : 'label-info';
  }

  get alertTipMessage() {
    if (this.errorMessage) {
      return this.errorMessage;
    }

    return this.tipModel
      ? this.tipModel.get(`validations.attrs.${this.tipPath}.message`)
      : null;
  }

  onChange() {}

  /**
   * Focus the added row, or the last row on deletion.
   *
   * @method valueChanged
   * @return none
   */
  valueChanged() {
    schedule('afterRender', this, function () {
      let panel = this.element.querySelector('.panel-collapse');
      let input = this.element.querySelector('.panel-collapse tbody tr:last-of-type input');

      if (panel && input) {
        if (panel.classList.contains('in')) {
          input.focus();
        } else {
          //add a one-time listener to wait until panel is open
          $(panel).one('shown.bs.collapse', function () {
            input.focus();
          });

          // Trigger Bootstrap collapse
          $(panel).collapse('show');
        }
      }
    });

    this.onChange();
  }

  didReceiveAttrs() {
    super.didReceiveAttrs(...arguments);

    if (this.value) {
      applyObjectTemplateArray(this, 'value', this.templateClass);
    }
  }

  @action
  addItem() {
    const Template = this.templateClass;
    const owner = getOwner(this);

    // Initialize value if it's not set
    if (!this.arrayValues) {
      this.set('value', A());
    }

    this.arrayValues.pushObject(
      typeOf(Template) === 'class'
        ? Template.create(owner.ownerInjection())
        : { value: null }
    );
    //this.templateAsObject ? {} : null);
    this.valueChanged();
  }

  @action
  deleteItem(item, idx) {
    if (this.arrayValues && this.arrayValues.length > idx) {
      this.arrayValues.removeAt(idx);
    }
    this.valueChanged();
  }
}
