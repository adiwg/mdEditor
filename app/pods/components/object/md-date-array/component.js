import Component from '@ember/component';
import EmObject from '@ember/object';
import { isNone } from '@ember/utils';

export default class MdDateArrayComponent extends Component {
  constructor() {
    super(...arguments);

    if(isNone(this.value)) {
      this.value = [];
    }
  }

  /**
   * See [md-array-table](md-array-table.html#property_templateClass).
   *
   * @property templateClass
   * @type Ember.Object
   */
  templateClass = EmObject.extend({
    init() {
      this._super(...arguments);
      this.setProperties({
        date: null,
        dateType: null
      });
    }
  });
}
