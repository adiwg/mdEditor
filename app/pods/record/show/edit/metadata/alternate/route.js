import Route from '@ember/routing/route';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { isArray } from '@ember/array';
import { set } from '@ember/object';

export default class AlternateRoute extends Route {
  @service flashMessages;
  @service router;
  model(params) {
    this.set('citationId', params.citation_id);

    return this.setupModel();
  }
  setupController(controller, model) {
    super.setupController(controller, model);

    controller.set('parentModel', this.modelFor('record.show.edit'));
    this.controllerFor('record.show.edit').setProperties({
      onCancel: this.setupModel,
      cancelScope: this,
    });
  }
  setupModel() {
    let citationId = this.citationId;
    let citationIndex = Number(citationId);
    let model = this.modelFor('record.show.edit');
    let citations = model.get(
      'json.metadata.metadataInfo.alternateMetadataReference'
    );
    let citation;

    if (
      citationId !== undefined &&
      Number.isInteger(citationIndex) &&
      citationIndex >= 0 &&
      isArray(citations)
    ) {
      if (typeof citations.objectAt === 'function') {
        citation = citations.objectAt(citationIndex);
      } else if (typeof citations.get === 'function') {
        citation = citations.get(citationIndex);
      } else {
        citation = citations[citationIndex];
      }
    }

    // Only redirect when the citation is actually missing.
    if (citation === undefined || citation === null) {
      this.flashMessages.warning('No citation found! Re-directing...');
      this.router.replaceWith('record.show.edit.metadata');

      return;
    }

    // Ensure identifier actions mutate the citation source array, not a local fallback.
    if (!citation.identifier) {
      if (typeof citation.set === 'function') {
        citation.set('identifier', []);
      } else {
        set(citation, 'identifier', []);
      }
    }

    return citation;
  }
  parentModel() {
    return this.modelFor('record.show.edit');
  }
}
