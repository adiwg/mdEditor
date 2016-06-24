import Ember from 'ember';

export default Ember.Component.extend({
  /**
   * Field label
   * @type {String} label
   */
  
  /**
   * Table header for the input column
   * @type {String}
   */
  header: null,
  
  /**
   * Maximum number of characters for inputs
   *
   * @type {Number} maxlength
   */
  
  /**
   * Type of input
   * @type {String}
   */
  type: 'text',
  
  /**
   * Text shown in empty inputs
   *
   * @type {String} placeholder
   */
  
  /**
   * Array of strings
   *
   * @type {Array}
   */
  model: [],
  
  items: Ember.computed('model.[]', {
    get() {
      let items = this.get('model');
  
      if (items === undefined) {
        items = [];
        items[0] = '';
      }
      
      return items.reduce(function(acc, val) {
        acc.pushObject({
          val: val
        });
        return acc;
      }, []);
    },
    
    set(key, value) {
      this.set('model', value
          .filterBy('val')
          .mapBy('val'));
      return value;
    }
  }),
  
  itemsObserver: Ember.observer('items.@each.val', function() {
    this.set('items', this.get('items'));
  }),

  actions: {
    addItem() {
      this.addItem();
    },
    deleteItem(idx) {
      this.deleteItem(idx);
    }
  },
  
  // functions for actions are isolated from actions to facilitate testing
  addItem() {
    this.get('items')
        .pushObject({
          val: ''
        });
  },
  
  deleteItem(idx) {
    this.get('items')
        .removeAt(idx);
  }
  
});
