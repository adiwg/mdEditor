import Component from '@ember/component';
import EmObject, { set, get } from '@ember/object';
import { isNone } from '@ember/utils';

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
