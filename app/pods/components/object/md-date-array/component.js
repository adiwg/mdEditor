import Ember from 'ember';

const {
  Component,
  Object: EmObject,
  get,
  set,
  isNone
} = Ember;

export default Component.extend({
  init() {
    this._super(...arguments);

    if(isNone(get(this, 'model'))) {
      set(this, 'model', []);
    }
  },

  /**
   * See [md-array-table](md-array-table.html#property_templateClass).
   *
   * @property templateClass
   * @type Ember.Object
   */
  templateClass: EmObject.extend({
    init() {
      this._super(...arguments);
      this.setProperties({
        date: null,
        dateType: null
      });
    }
  })
});
