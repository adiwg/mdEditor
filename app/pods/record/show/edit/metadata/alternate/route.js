import Route from '@ember/routing/route';
import { get } from '@ember/object';
import { isEmpty } from '@ember/utils';
import { isArray } from '@ember/array';

export default Route.extend({
  model(params) {
    this.set('citationId', params.citation_id);

    return this.setupModel();
  },

  setupController: function () {
    // Call _super for default behavior
    this._super(...arguments);

    this.controller.set('parentModel', this.modelFor('record.show.edit'));
    this.controllerFor('record.show.edit')
      .setProperties({
        onCancel: this.setupModel,
        cancelScope: this
      });
  },

  setupModel() {
    let citationId = this.citationId;
    let model = this.modelFor('record.show.edit');
    let citations = model.get(
      'json.metadata.metadataInfo.alternateMetadataReference');
    let citation = citationId && isArray(citations) ? citations.get(
      citationId) : undefined;

    //make sure the identifier exists
    if(isEmpty(citation)) {
      this.flashMessages
        .warning('No citation found! Re-directing...');
      this.replaceWith('record.show.edit.metadata');

      return;
    }

    return citation;
  },
  actions: {
    parentModel() {
      return this.modelFor('record.show.edit');
    }
  }
});
