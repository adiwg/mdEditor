import Ember from 'ember';
import ScrollTo from 'mdeditor/mixins/scroll-to';

const {
  Route,
  get,
  isEmpty,
  isArray
} = Ember;

export default Route.extend(ScrollTo, {
  model(params, transition) {
    this.set('citationId', params.citation_id);
    this.set('stepId', transition.params[
      'record.show.edit.lineage.lineageobject.step'].step_id);
    this.set('lineageId', transition.params[
      'record.show.edit.lineage.lineageobject'].lineage_id);

    return this.setupModel();
  },

  setupController: function () {
    // Call _super for default behavior
    this._super(...arguments);

    this.controller.set('parentModel', this.modelFor('record.show.edit'));
    this.controller.set('stepId', get(this, 'stepId'));
    this.controllerFor('record.show.edit')
      .setProperties({
        onCancel: this.setupModel
      });
  },

  setupModel() {
    let citationId = get(this, 'citationId');
    let lineageId = get(this, 'lineageId');
    let stepId = get(this, 'stepId');
    let model = this.modelFor('record.show.edit');
    let citations = model.get(
      `json.metadata.resourceLineage.${lineageId}.processStep.${stepId}.reference`);
    let citation = citationId && isArray(citations) ? citations.get(
      citationId) : undefined;

    //make sure the identifier exists
    if(isEmpty(citation)) {
      Ember.get(this, 'flashMessages')
        .warning('No citation found! Re-directing...');
      this.replaceWith('record.show.edit.lineage.lineageobject.step');

      return;
    }

    return citation;
  },
  actions: {
    parentModel() {
      return this.modelFor('record.show.edit');
    },
    goBack(){
      this.transitionTo('record.show.edit.lineage.lineageobject.step');
    }
  }
});
