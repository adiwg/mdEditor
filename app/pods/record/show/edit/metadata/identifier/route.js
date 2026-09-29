import Route from '@ember/routing/route';
import ScrollTo from 'mdeditor/mixins/scroll-to';

export default class IdentifierRoute extends Route.extend(ScrollTo) {
  model() {
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
    let model = this.modelFor('record.show.edit');

    //make sure the identifier exists
    model.set(
      'json.metadata.metadataInfo.metadataIdentifier',
      model.get('json.metadata.metadataInfo.metadataIdentifier') || {}
    );

    return model.get('json.metadata.metadataInfo.metadataIdentifier');
  }
}
