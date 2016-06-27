import Ember from 'ember';

const ObjectTable = Ember.Component.extend({

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

  init: function() {
    this._super.apply(this, arguments);
  },
  
  panelId: Ember.computed(function() {
    return Ember.generateGuid(null, 'panel');
  }),
  
  citems: Ember.computed(function() {
    return this.get('items').map(function(itm) {
      return Ember.Object.create(itm);
    });
  }).property('items.@each.val', 'editing'),
  
  attrArray: Ember.computed(function() {
    return this.get('attributes').split(',');
  }).property('attributes'),
  
  editing: false,
  
  editingChanged: Ember.observer('editing', function() {
    // deal with the change
    this.$('table, .object-editor').toggleClass('fadeOut fadeIn');
  }),
  
  didInsertElement: function() {
    let panel = this.get('panelId');
    let panelBtn = panel + '-btn';
    $('#' + panel).on('show.bs.collapse', function() {
      $('#' + panelBtn).removeClass('invisible');
    });
    $('#' + panel).on('hidden.bs.collapse', function() {
      $('#' + panelBtn).addClass('invisible');
    });
  },
  
  actions: {
    deleteItem: function(items, index) {
      if (window.confirm("Do you really want to delete this " + this.get('header') + "?")) {
        items.removeAt(index);
      }
    },
    
    addItem: function(items) {
      let itm = items.pushObject(Ember.Object.create({}));
      this.set('editing', itm);
    },
    
    editItem: function(items, index) {
      this.set('editing', items.objectAt(index));
    },
    
    cancelEdit: function() {
      this.set('editing', false);
    }
  }
  
});

export default ObjectTable;
