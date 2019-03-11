import { computed } from '@ember/object';
import Component from '@ember/component';

export default Component.extend({
  actionContext: computed('context', function () {
    return this.context();
  })  
});
