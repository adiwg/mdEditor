import Component from '@ember/component';
import classic from 'ember-classic-decorator';
import EmberObject from '@ember/object';
import { action } from '@ember/object';
import { typeOf, isEmpty } from '@ember/utils';
import { ucWords } from 'mdeditor/helpers/uc-words';
import { getOwner } from '@ember/application';
import { A } from '@ember/array';
import { inject as service } from '@ember/service';
import { applyTemplateArray } from 'mdeditor/utils/object-template';

@classic
export default class MdObjectTableComponent extends Component {

  /**
   * mdEditor class for managing a table of similar mdJSON objects
   * for selection for edit or deletion.
   * The class is configurable for reuse with mdJSON object arrays.
   *
   * ```handlebars
   * \{{#object/md-object-table
   *  items=model
   *  header=label
   *  buttonText=buttonText
   *  templateClass=templateClass
   *  previewTemplate=previewTemplate
   *  ellipsis=ellipsis
   *  attributes=attributes as |editing|
   * }}
   *
   * {{/object/md-object-table}}
   * ```
   *
   * @class md-object-table
   * @submodule components-object
   * @module mdeditor
   * @constructor
   * @uses object-template
   */

  @service spotlight;

  didReceiveAttrs() {
    super.didReceiveAttrs(...arguments);

    let items = applyTemplateArray(this, this.items, this.templateClass);
    this.items = items;
  }

  attributeBindings = ['data-spy'];
  classNameBindings = ['shadow:box-shadow--4dp'];
  classNames = ['md-object-table'];

  //reset the 'editing' flag
  didUpdateAttrs() {
    super.didUpdateAttrs(...arguments);

    if(this.editing !== 'adding') this.editing = false;
  }

  /**
   * Array of the mdJSON object to display in the object table for
   * selection to edit or delete.
   *
   * @property items
   * @type Array
   * @default Ember.A()
   * @required
   */
  items = A();

  /**
   * List of items object attributes to display in
   * md-object-table to aid in choosing the item to edit or
   * delete.
   *
   * @property attributes
   * @type String
   * @required
   */

  /**
   * Name to place on the mdEditor panel header for entry and edit of
   * items objects.
   *
   * @property header
   * @type String
   * @required
   */

  /**
   * The path of template to render in the table preview for each row.
   * Template content will be wrapped in a `<td>` element.
   *
   * @property previewTemplate
   * @type {String}
   * @optional
   * @default undefined
   */

  /**
   * The path of template to render in the table preview for each row.
   * Template content will NOT be wrapped in a `<td>` element. The `property`
   * class should be applied to each `<td>`.`
   *
   * @property previewTemplateTable
   * @type {String}
   * @optional
   * @default undefined
   */

  /**
   * The prefix to use for creating the id for each row element. A dash,'-',
   * followed by the item array index will be appended to the prefix to form the
   * id.
   *
   * @property scrollToId
   * @type {String}
   * @optional
   * @default undefined
   */

  /**
   * The template class to use for new items. This should be a constructor.
   * Objects should be created by extending Ember.Object.
   *  ```javascript
   *  Ember.Object.extend({
   *    init() {
   *      this._super(...arguments);
   *
   *      this.set('foo', A());
   *      this.set('bar', A());
   *    }
   *  })
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
   * Determines add button text
   *
   * @property buttonText
   * @type String
   * @default Add
   */
  buttonText = "Add";

  /**
   * Render the row actions vertically.
   *
   * @property verticalButtons
   * @type {Boolean}
   * @default undefined
   */

  /**
   * Inital collapse state for the panel.
   *
   * @property isCollapsed
   * @type {Boolean}
   * @default undefined
   */

  /**
   * Indicates at least one object is required.
   *
   * @property required
   * @type {Boolean}
   * @default undefined
   */

  /**
   * Whether the panel is collapsible.
   *
   * @property collapsible
   * @type {Boolean}
   * @default true
   */
  collapsible = true;

  /**
   * True to truncate the preview table cell text.
   *
   * @property ellipsis
   * @type {Boolean}
   * @default undefined
   */

  /**
   * If true, a box shadow will be rendered around the panel.
   *
   * @property shadow
   * @type {Boolean}
   * @default true
   */
  shadow = true;

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
   * The error message to display, if required = true. Overrides the validation
   * message.
   *
   * @property errorMessage
   * @type {String}
   * @default undefined
   */

  /**
   * The height to offset from top of container when scrolling.
   *
   * @property offset
   * @type {Number}
   * @default 130
   */
  offset = 130;

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
    let value = this.items;

    if(isCollapsed !== undefined) {
      return isCollapsed;
    } else if(value && value.length > 0) {
      return false;
    } else {
      return true;
    }
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
    return this.items?.length === 0 && this.alertIfEmpty;
  }

  get panelId() {
    return 'panel-' + this.elementId;
  }

  get btnSize() {
    return this.verticalButtons ? 'md' : 'xs';
  }

  /**
   * Render the footer if the items array length is greater than 5.
   *
   * @property showFooter
   * @type {Boolean}
   * @readOnly
   * @category computed
   * @requires items.length
   */
  get showFooter() {
    return this.items?.length > 5;
  }

  get attrArray() {
    let attr = this.attributes;

    return attr
      ? attr.split(',').map(itm => itm.split(':')[0])
      : null;
  }

  get attrTitleArray() {
    return this.attributes.split(',')
      .map(function (item) {
        let title = item.trim().split('.').get('lastObject').split(
          ':');
        return title.length === 1 ? ucWords(
          [title[0]
            .dasherize()
            .replace(/-/g,' ')
          ], { force: false }) : title[1];
      });
  }

  editing = false;

  get pillColor() {
    let count = this.items?.length || 0;

    return (count > 0) ? 'label-info' : 'label-warning';
  }

  get alertTipMessage() {
    if (this.errorMessage) {
      return this.errorMessage;
    }

    return this.tipModel
      ? this.tipModel.get(`validations.attrs.${this.tipPath}.message`)
      : null;
  }

  @action
  deleteItem(items, index) {
    let last = Object.keys(items.get('lastObject'));

    if(isEmpty(last)) {
      items.replace();
    }

    if(items.length === 0) return;

    items.removeAt(index);
  }

  @action
  addItem() {
    const Template = this.templateClass;
    const owner = getOwner(this);
    const spotlight = this.spotlight;

    let itm = typeOf(Template) === 'class'
      ? Template.create(owner.ownerInjection())
      :EmberObject.create({});

    let items = this.items;

    this.saveItem = itm;
    this.editing = 'adding';
    items.pushObject(this.saveItem);
    spotlight.setTarget(this.elementId);
    //this.scrollTo(this.elementId);
  }

  @action
  editItem(items, index) {
    const spotlight = this.spotlight;

    this.saveItem = items.objectAt(index);
    this.editing = 'editing';
    spotlight.setTarget(this.elementId);
  }

  @action
  cancelEdit() {
    const spotlight = this.spotlight;

    this.editing = false;
    spotlight.close();
  }
}
