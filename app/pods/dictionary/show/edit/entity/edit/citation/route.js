import Route from '@ember/routing/route';
import {
  isArray
} from '@ember/array';
import {
  isEmpty
} from '@ember/utils';

export default Route.extend({
  init() {
    this._super(...arguments);

    this.breadCrumb = {
      title: 'Reference'
    };
  },

  beforeModel(transition) {
    this.set('entityId', transition.params[
      'dictionary.show.edit.entity.edit'].entity_id);
  },

  model(params) {
    this.set('citationId', params.citation_id);

    return this.setupModel();
  },

  setupController: function () {
    // Call _super for default behavior
    this._super(...arguments);

    this.controller.set('parentModel', this.modelFor(
      'dictionary.show.edit'));
    this.controllerFor('dictionary.show.edit')
      .setProperties({
        onCancel: this.setupModel,
        cancelScope: this
      });
  },

  setupModel() {
    let citationId = this.citationId;
    let model = this.modelFor('dictionary.show.edit');
    let citations = model.get('json.dataDictionary.entity.' + this.entityId + '.entityReference');
    let citation = citationId && isArray(citations) ? citations.get(
      citationId) : undefined;

    //make sure the citation exists
    if(isEmpty(citation)) {
      this.flashMessages
        .warning('No Entity Reference found! Re-directing...');
      this.replaceWith('dictionary.show.edit.entity.edit');

      return;
    }

    return citation;
  },
  actions: {
    backToEntity() {
      this.transitionTo('dictionary.show.edit.entity.edit',
        this.entityId);
    }
  }
});
