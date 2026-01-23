import Route from '@ember/routing/route';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { isEmpty } from '@ember/utils';
import { isArray } from '@ember/array';
import ScrollTo from 'mdeditor/mixins/scroll-to';

export default class CitationRoute extends Route.extend(ScrollTo) {
  @service flashMessages;
  model(params) {
    this.set('citationId', params.citation_id);
    this.set('stepId', this.paramsFor(
      'record.show.edit.lineage.lineageobject.step').step_id);
    this.set('lineageId', this.paramsFor(
      'record.show.edit.lineage.lineageobject').lineage_id);

    return this.setupModel();
  }
  setupController() {
    // Call _super for default behavior
    this._super(...arguments);

    this.controller.set('parentModel', this.modelFor('record.show.edit'));
    this.controller.set('stepId', this.stepId);
    this.controllerFor('record.show.edit')
      .setProperties({
        onCancel: this.setupModel,
        cancelScope: this
      });
  }
  setupModel() {
    let citationId = this.citationId;
    let lineageId = this.lineageId;
    let stepId = this.stepId;
    let model = this.modelFor('record.show.edit');
    let citations = model.get(
      `json.metadata.resourceLineage.${lineageId}.processStep.${stepId}.reference`);
    let citation = citationId && isArray(citations) ? citations.get(
      citationId) : undefined;

    //make sure the identifier exists
    if(isEmpty(citation)) {
      this.flashMessages
        .warning('No citation found! Re-directing...');
      this.replaceWith('record.show.edit.lineage.lineageobject.step');

      return;
    }

    return citation;
  }

  @action
  parentModel() {
    return this.modelFor('record.show.edit');
  }

  @action
  goBack() {
    this.transitionTo('record.show.edit.lineage.lineageobject.step');
  }
}