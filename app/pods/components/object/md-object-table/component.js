import Ember from 'ember';

const {
  computed,
  Component,
  observer,
  generateGuid,
  isEmpty
} = Ember;

export default Component.extend({

  /**
   * mdEditor class for managing a table of similar mdJSON objects
   * for selection for edit or deletion.
   * The class is configurable for reuse with mdJSON object arrays.
   *
   * @module mdeditor
   * @submodule components-object
   * @class md-object-table
   * @constructor
   */

  /**
   * Array of the mdJSON object to display in the object table for
   * selection to edit or delete.
   *
   * @property items
   * @type Array
   * @required
   */

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
   * Determines add button text
   *
   * @property buttonText
   * @type String
   * @default Add
   */
  buttonText: "Add",

  /**
   * Inital collapse state fo the panel.
   *
   * @property isCollapsed
   * @type {Boolean}
   * @default undefined
   */

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
    let value = this.get('items');

    if (isCollapsed !== undefined) {
      return isCollapsed;
    } else if (value && value.length > 0) {
      return false;
    } else {
      return true;
    }
  }),

  panelId: computed(function() {
    return generateGuid(null, 'panel');
  }),

  citems: computed(function() {
      let i = this.get('items')
        .map(function(itm) {
          return Ember.Object.create(itm);
        });
      return i;
    })
    .property('items.@each.val', 'editing'),

  attrArray: computed('attributes', function() {
    return this.get('attributes')
      .split(',');
  }),

  attrTitleArray: computed('attrArray', function() {
    return this.get('attrArray').map(function(item) {
      return item.trim().dasherize().replace(/-/g, ' ');
    });
  }),

  editing: false,

  editingChanged: observer('editing', function() {
    // deal with the change
    //Ember.run.schedule('afterRender', this, function () {
    let panel = this.$('.md-object-table > .panel-collapse');
    let table = panel.find('> .panel-body > table, > .panel-body > .object-editor');
    let items = this.get('items');
    let editing = this.get('editing');

    if (editing === 'adding') {
      items.pushObject(this.get('saveItem'));
    }

    if (editing === false && items.length) {
      let last = Object.keys(items.get('lastObject'));
      //TODO: this is fixed in 2.5.1
      //https://github.com/emberjs/js/issues/13050
      last = last.filter(function(itm) {
        return itm !== 'toString';
      });
      if (isEmpty(last)) {
        items.popObject();
      }
    }

    if (panel.hasClass('in')) {
      table.toggleClass('fadeOut fadeIn');
    } else { //add a one-time listener to wait until panel is open
      panel.one('shown.bs.collapse', function() {
        table.toggleClass('fadeOut fadeIn');
      });
      panel.collapse('show');
    }
    //});
  }),

  pillColor: computed('citems.[]', function() {
    let count = this.get('citems')
      .length;
    return (count > 0) ? 'label-info' : 'label-warning';
  }),

  didInsertElement: function() {
    /*let panel = this.get('panelId');
    let panelBtn = panel + '-btn';
    $('#' + panel).on('show.bs.collapse', function() {
      $('#' + panelBtn).removeClass('invisible');
    });
    $('#' + panel).on('hidden.bs.collapse', function() {
      $('#' + panelBtn).addClass('invisible');
    });*/
  },

  actions: {
    deleteItem: function(items, index) {
      //if (window.confirm("Do you really want to delete this " + this.get('header') + "?")) {
      items.removeAt(index);
      //}
    },

    addItem: function() {
      //let itm = items.pushObject(Object.create({}));
      let itm = Ember.Object.create({});
      this.set('saveItem', itm);
      this.set('editing', 'adding');
    },

    editItem: function(items, index) {
      this.set('saveItem', items.objectAt(index));
      this.set('editing', 'editing');
    },

    cancelEdit: function() {
      this.set('editing', false);
    }
  }

});
