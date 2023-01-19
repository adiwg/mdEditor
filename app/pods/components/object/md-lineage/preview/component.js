import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  showMore: false,
  limit:1,
  showLimit: computed('limit','showMore', function() {
    return this.showMore ? 100: this.limit;
  }),
});
