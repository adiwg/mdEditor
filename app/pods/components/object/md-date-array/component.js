import classic from 'ember-classic-decorator';
import Component from '@ember/component';
import EmObject, { set, get } from '@ember/object';
import { isNone } from '@ember/utils';

@classic
export default class MdDateArray extends Component {
  init() {
    super.init(...arguments);

    if(isNone(this.value)) {
      set(this, 'value', []);
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
      super.init(...arguments);
      this.setProperties({
        date: null,
        dateType: null
      });
    }
  });
}
