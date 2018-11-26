/**
 * @module mdeditor
 * @submodule components-input
 */

import { computed, observer } from '@ember/object';

import Component from '@ember/component';

export default Component.extend({

  /**
   * Input, edit, display an array of strings
   *
   * @class md-inputs
   * @constructor
   */

  /**
   * An array of strings to be edited.
   * The edited array is returned
   *
   * @property model
   * @type Array
   * @default []
   */
  model: [],

  /**
   * Type of data represented by string in the array.
   * HTML5 types may be specified ('text', 'number', etc.)
   *
   * @property type
   * @type String
   * @default 'text'
   */
  type: 'text',

  /**
   * Maximum number of characters for each input string.
   * If no maxlength is specified the length will not be restricted
   *
   * @property maxlength
   * @type Number
   * @default null
   */
  maxlength: null,

  /**
   * Label for the table of input rows
   *
   * @property label
   * @type String
   * @default null
   */
  label: null,

  /**
   * Determines add button text
   *
   * @property buttonText
   * @type String
   * @default Add
   */
   buttonText: "Add",

  /**
   * Determines add button placement
   *
   * @property buttonTop
   * @type Boolean
   * @default false
   */
   buttonTop: false,

  /**
   * Column header for the input column
   *
   * @property header
   * @type String
   * @default null
   */
  header: null,

  /**
   * Text displayed in empty inputs
   *
   * @property placeholder
   * @type String
   * @default null
   */
  placeholder: null,

  // convert the input 'primitive' array to an 'ember' array
  items: computed('model.[]', {
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

  itemsObserver: observer('items.@each.val', function() {
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
