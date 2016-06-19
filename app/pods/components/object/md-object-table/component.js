import Ember from 'ember';

const ObjectTable = Ember.Component.extend({
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
      $('#' + panelBtn).removeClass('md-button-hide');
    });
    $('#' + panel).on('hidden.bs.collapse', function() {
      $('#' + panelBtn).addClass('md-button-hide');
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
