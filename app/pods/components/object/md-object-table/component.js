/**
 * @module mdeditor
 * @submodule components-object
 */

import Ember from 'ember';

export default Ember.Component.extend({

  /**
   * mdEditor class for managing a table of similar mdJSON objects
   * for selection for edit or deletion.
   * The class is configurable for reuse with mdJSON object arrays.
   *
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

  panelId: Ember.computed(function () {
    return Ember.generateGuid(null, 'panel');
  }),

  citems: Ember.computed(function () {
      let i = this.get('items')
        .map(function (itm) {
          return Ember.Object.create(itm);
        });
      return i;
    })
    .property('items.@each.val', 'editing'),

  attrArray: Ember.computed(function () {
      return this.get('attributes')
        .split(',');
    })
    .property('attributes'),

  editing: false,

  editingChanged: Ember.observer('editing', function () {
    // deal with the change
    //Ember.run.schedule('afterRender', this, function () {
    let panel = this.$('.panel-collapse');
    let table = this.$('table, .object-editor');
    let items = this.get('items');
    let editing = this.get('editing');

    if(editing === 'adding') {
      items.pushObject(this.get('saveItem'));
    }

    if(editing === false && items.length) {
      let last = Object.keys(items.get('lastObject'));
      //TODO: this is fixed in 2.5.1
      //https://github.com/emberjs/ember.js/issues/13050
      last = last.filter(function (itm) {
        return itm !== 'toString';
      });
      if(Ember.isEmpty(last)) {
        items.popObject();
      }
    }

    if(panel.hasClass('in')) {
      table.toggleClass('fadeOut fadeIn');
    } else { //add a one-time listener to wait until panel is open
      panel.one('shown.bs.collapse', function () {
        table.toggleClass('fadeOut fadeIn');
      });
      panel.collapse('show');
    }
    //});
  }),

  pillColor: Ember.computed('citems.[]', function () {
    let count = this.get('citems')
      .length;
    return(count > 0) ? 'label-info' : 'label-warning';
  }),

  didInsertElement: function () {
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
    deleteItem: function (items, index) {
      //if (window.confirm("Do you really want to delete this " + this.get('header') + "?")) {
      items.removeAt(index);
      //}
    },

    addItem: function () {
      //let itm = items.pushObject(Ember.Object.create({}));
      let itm = Ember.Object.create({});
      this.set('saveItem', itm);
      this.set('editing', 'adding');
    },

    editItem: function (items, index) {
      this.set('saveItem', items.objectAt(index));
      this.set('editing', 'editing');
    },

    cancelEdit: function () {
      this.set('editing', false);
    }
  }

});
