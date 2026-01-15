import Route from '@ember/routing/route';
import { isEmpty } from '@ember/utils';
import { isArray, A } from '@ember/array';
import { get } from '@ember/object';

export default class CitationRoute extends Route {
  get breadCrumb() {
    return {
      title: this.citationId,
      linkable: true
    };
  }

  model(params) {
    this.set('citationId', params.citation_id);

    return this.setupModel();
  }
  setupController() {
    // Call _super for default behavior
    super.setupController(...arguments);

    //this.controller.set('parentModel', this.modelFor('record.show.edit.main'));
    this.controller.set('citationId', this.citationId);
    this.controllerFor('record.show.edit')
      .setProperties({
        onCancel: this.setupModel,
        cancelScope: this
      });
  }
  setupModel() {
    let citationId = this.citationId;
    let model = this.modelFor('record.show.edit');
    let objects = model.get('json.metadata.additionalDocumentation');
    let resource = citationId && isArray(objects) ? A(
        objects)
      .objectAt(citationId) :
      undefined;

    //make sure the identifier exists
    if(isEmpty(resource)) {
      this.flashMessages
        .warning('No Document object found! Re-directing to list...');
      this.replaceWith('record.show.edit.documents');

      return;
    }

    return resource;
  }
}