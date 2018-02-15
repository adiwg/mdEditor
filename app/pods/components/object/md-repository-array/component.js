import Ember from 'ember';
const {
  Component,
  get,
  set,
  inject
} = Ember;

export default Component.extend({
  settings: inject.service(),
  repositoryTemplate: Ember.Object.extend({
    init() {
      this._super(...arguments);

      this.set('citation', {});
    }
  }),
  actions: {
    lookupTitle(value) {
      let defs = this.get('settings.data.repositoryDefaults');
      let titles = defs.filterBy('repository', value.repository);

      if(get(titles, 'length')) {

        set(value, 'citation.title', get(titles.objectAt(0), 'title'));
      }
    }
  }
});
