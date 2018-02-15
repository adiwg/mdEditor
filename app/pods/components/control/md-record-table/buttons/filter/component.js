import Ember from 'ember';

const {
  Component,
  computed,
  inject,
  run: {
    once
  }
} = Ember;

export default Component.extend({
  flashMessages: inject.service(),
  showButton: computed('selectedItems.[]', function() {
    return this.get('selectedItems.length') > 1;
  }),
  actions: {
    deleteSelected(records) {
      records.forEach(rec => {
        rec.destroyRecord()
          .then((rec) => {
            rec.unloadRecord();
            once(() => {
              records.removeObject(rec);
              this.get('flashMessages')
                .danger(
                  `Deleted ${rec.constructor.modelName} "${rec.get('title')}".`
                );
            });
          });
      });
    }
  }
});
