import Component from '@ember/component';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';

export default Component.extend({
  router: service(),
  title: computed('model.taxonomicSystem.0.citation.title', function () {
    let title = this.get('model.taxonomicSystem.0.citation.title');
    let index = this.index;

    return `Collection #${index}` + (title ? `: ${title}` : '');
  }),
  actions: {
    editCollection(id) {
      this.set('scrollTo', `collection-${id}`);
      this.router.transitionTo(
        'record.show.edit.taxonomy.collection.index',
        id
      );
    },
    deleteCollection(id) {
      let taxa = this.get('record.json.metadata.resourceInfo.taxonomy');
      taxa.removeAt(id);
    },
  },
});
