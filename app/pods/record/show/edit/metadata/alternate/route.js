import Ember from 'ember';

const {
  Route,
  get,
  isEmpty,
  isArray
} = Ember;

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
    let citationId = get(this, 'citationId');
    let model = this.modelFor('record.show.edit');
    let citations = model.get(
      'json.metadata.metadataInfo.alternateMetadataReference');
    let citation = citationId && isArray(citations) ? citations.get(
      citationId) : undefined;

    //make sure the identifier exists
    if(isEmpty(citation)) {
      Ember.get(this, 'flashMessages')
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
