import Ember from 'ember';
import Template from 'mdeditor/mixins/object-template';

const {
  computed,
  Component,
  observer,
  isEmpty,
  typeOf,
  getOwner,
  A,$
} = Ember;

export default Component.extend(Template, {

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

  didReceiveAttrs() {
    this._super(...arguments);

    this.applyTemplateArray('items');
  },

  attributeBindings: ['data-spy'],
  classNameBindings: ['shadow:box-shadow--4dp'],
  //classNames: ['md-object-table', 'panel', 'panel-default'],

  //reset the 'editing' flag
  didUpdateAttrs() {
    this._super(...arguments);
    this.set('editing', false);
  },

  /**
   * Array of the mdJSON object to display in the object table for
   * selection to edit or delete.
   *
   * @property items
   * @type Array
   * @default Ember.A()
   * @required
   */
  items: A(),

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
   * The template class to use for new items. This should be a constructor.
   * Objects should be created by extending Ember.Object.
   *  ```javascript
   *  Ember.Object.extend({
   *    init() {
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
  templateClass: null,

  /**
   * Determines add button text
   *
   * @property buttonText
   * @type String
   * @default Add
   */
  buttonText: "Add",

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
  shadow: true,

  /**
   * Uses isCollapsed if defined, otherwise inspects array length.
   *
   * @property collapsed
   * @type {Boolean}
   * @readOnly
   * @category computed
   * @requires isCollapsed
   */
  collapsed: computed('isCollapsed', 'items.[]', function() {
    let isCollapsed = this.get('isCollapsed');
    let value = this.get('items');

    if(isCollapsed !== undefined) {
      return isCollapsed;
    } else if(value && value.length > 0) {
      return false;
    } else {
      return true;
    }
  }),

  panelId: computed('items.@each.val', 'editing', function() {
    return 'panel-' + this.get('elementId');
  }),

  btnSize: computed('verticalButtons', function() {
    return this.get('verticalButtons') ? 'md' : 'xs';
  }),

  /*citems: computed('items.@each.val', function () {
    let i = this.get('items')
      .map(function (itm) {
        return Ember.Object.create(itm);
      });
    return i;
  }),*/

  attrArray: computed('attributes', function() {
    let attr = this.get('attributes');

    return attr ? attr.split(',') : null;
  }),

  attrTitleArray: computed('attrArray', function() {
    return this.get('attrArray')
      .map(function(item) {
        return item.trim()
          .dasherize()
          .replace(/-/g, ' ');
      });
  }),

  editing: false,

  editingChanged: observer('editing', function() {
    // deal with the change
    //Ember.run.schedule('afterRender', this, function () {
    let panel = this.$('> .md-object-table > .panel-collapse');
    let table = panel.find(
      '> .panel-body > table, > .panel-body > .object-editor');
    let items = this.get('items');
    let editing = this.get('editing');

    if(editing === 'adding') {
      items.pushObject(this.get('saveItem'));
    }

    if(editing === false && items.length) {
      let last = Object.keys(items.get('lastObject'));

      if(isEmpty(last)) {
        items.popObject();
      }
    }

    if(panel.hasClass('in')) {
      let out = editing ? table[0] : table[1];
      let inn = editing ? table[1] : table[0];
      $(out).fadeOut(100, function() {
        $(inn).fadeIn(100, function() {
          panel.get(0).scrollIntoView({
            block: "end",
            behavior: "smooth"
          });
        });
      });

      table.toggleClass('fadeOut fadeIn');
    } else { //add a one-time listener to wait until panel is open
      panel.one('shown.bs.collapse', function() {
        table.toggleClass('fadeOut fadeIn');
        panel.get(0).scrollIntoView({
          block: "end",
          behavior: "smooth"
        });
      });
      panel.collapse('show');
    }
    //});
  }),

  pillColor: computed('items.[]', function() {
    let count = this.get('items')
      .length;
    return(count > 0) ? 'label-info' : 'label-warning';
  }),

  actions: {
    deleteItem: function(items, index) {
      items.removeAt(index);
    },

    addItem: function() {
      const Template = this.get('templateClass');
      const owner = getOwner(this);

      let itm = typeOf(Template) === 'class' ? Template.create(owner.ownerInjection()) :
        Ember.Object.create({});

      this.set('saveItem', itm);
      this.set('editing', 'adding');
      this.set('spotlight', true);
    },

    editItem: function(items, index) {
      this.set('saveItem', items.objectAt(index));
      this.set('editing', 'editing');
      this.set('spotlight', true);
    },

    cancelEdit: function() {
      this.set('editing', false);
    }
  }

});
