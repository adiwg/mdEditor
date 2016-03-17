import Ember from 'ember';

export default Ember.Component.extend({
  /**
   * Feild labeled
   * @type {String} label
   */

  /**
   * Table header for the input column
   * @type {String}
   */
  header: 'Column1',

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

  /**
   * Array of item objects
   * 
   * @return {Array}
   */
  items: Ember.computed('model.[]', {
    get() {
        let items = this.get('model');

        if(items === undefined) {
          items = [];
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

  /**
   * Adds empty item to items
   *
   * @returns {undefined}
   */
  addItem() {
    this.get('items')
      .pushObject({
        val: ''
      });
  },

  /**
   * Removes item from items at given index
   *
   * @function
   * @param {Number} idx
   * @returns {undefined}
   */
  deleteItem(idx) {
    this.get('items')
      .removeAt(idx);
  },
});
