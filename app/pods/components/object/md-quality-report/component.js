import Component from '@ember/component';

import { set } from '@ember/object'

export default Component.extend({
  actions: {
    deleteReport(index) {
      set(this, 'model', this.model.slice(index));
    }
  }
})
