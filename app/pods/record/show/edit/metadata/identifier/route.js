import Route from '@ember/routing/route';
import { getWithDefault, get } from '@ember/object';
import ScrollTo from 'mdeditor/mixins/scroll-to';

export default class IdentifierRoute extends Route.extend(ScrollTo) {
  model() {
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
    let model = this.modelFor('record.show.edit');

    //make sure the identifier exists
    model.set('json.metadata.metadataInfo.metadataIdentifier',
      getWithDefault(model,
        'json.metadata.metadataInfo.metadataIdentifier', {}));

    return get(model,
      'json.metadata.metadataInfo.metadataIdentifier');
  }
}