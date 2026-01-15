import Route from '@ember/routing/route';
import { action } from '@ember/object';
import { isEmpty } from '@ember/utils';
import { isArray } from '@ember/array';

export default class CitationRoute extends Route {
  model(params) {
    this.set('citationId', params.citation_id);
    this.set('lineageId', this.paramsFor(
      'record.show.edit.lineage.lineageobject').lineage_id);

    return this.setupModel();
  }
  setupController() {
    // Call _super for default behavior
    this._super(...arguments);

    this.controller.set('parentModel', this.modelFor('record.show.edit'));
    this.controllerFor('record.show.edit')
      .setProperties({
        onCancel: this.setupModel,
        cancelScope: this
      });
  }
  setupModel() {
    let citationId = this.citationId;
    let lineageId = this.lineageId;
    let model = this.modelFor('record.show.edit');
    let citations = model.get(
      'json.metadata.resourceLineage.' + lineageId + '.citation');
    let citation = citationId && isArray(citations) ? citations.get(
      citationId) : undefined;

    //make sure the identifier exists
    if(isEmpty(citation)) {
      this.flashMessages
        .warning('No citation found! Re-directing...');
      this.replaceWith('record.show.edit.lineage.lineageobject');

      return;
    }

    return citation;
  }
    parentModel() {
      return this.modelFor('record.show.edit');
    }
}