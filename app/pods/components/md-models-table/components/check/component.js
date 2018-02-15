import Component from '@ember/component';
import {
  get
} from '@ember/object';

export default Component.extend({
  actions: {
    clickOnRow(index, record, event) {
      get(this, 'clickOnRow')(index, record);
      event.stopPropagation();
    }
  }
});
