import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  showMore: false,
  limit:1,
  showLimit: computed('limit','showMore', function() {
    return this.get('showMore') ? 100: this.get('limit');
  }),
});
