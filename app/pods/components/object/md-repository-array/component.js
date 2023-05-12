import { inject as service } from '@ember/service';
import Component from '@ember/component';
import EmberObject, { set, get } from '@ember/object';

export default Component.extend({
  settings: service(),
  repositoryTemplate: EmberObject.extend({
    init() {
      this._super(...arguments);

      this.set('citation', {});
    }
  }),
  actions: {
    lookupTitle(value) {
      let defs = this.get('settings.data.repositoryDefaults');
      let titles = defs.filterBy('repository', value.repository);

      if(titles.length) {

        set(value, 'citation.title', (titles.objectAt(0)).title);
      }
    }
  }
});
