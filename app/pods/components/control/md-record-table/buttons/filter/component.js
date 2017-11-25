import Ember from 'ember';

const {
  Component,
  inject
} = Ember;

export default Component.extend({
  flashMessages: inject.service(),
  actions: {
    deleteSelected(records) {
      records.forEach(rec => {
        rec.destroyRecord()
          .then((rec) => {
            records.removeObject(rec);
            this.get('flashMessages')
              .danger(
                `Deleted ${rec.constructor.modelName} "${rec.get('title')}".`
              );
          });
      });
    }
  }
});
