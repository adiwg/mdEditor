import { inject as service } from '@ember/service';
import Component from '@ember/component';
import { computed } from '@ember/object';
import { once } from '@ember/runloop';

export default Component.extend({
  flashMessages: service(),
  showButton: computed('selectedItems.[]', function () {
    return this.get('selectedItems.length') > 1;
  }),

  deleteSelected(records) {
    records.forEach((rec) => {
      rec.destroyRecord().then((rec) => {
        rec.unloadRecord();
        once(() => {
          records.removeObject(rec);
          this.flashMessages.danger(
            `Deleted ${rec.constructor.modelName} "${rec.get('title')}".`
          );
        });
      });
    });
  },

  actions: {
    deleteSelected(records) {
      this.deleteSelected(records);
    },
  },
});
