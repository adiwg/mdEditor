import Route from '@ember/routing/route';

export default class MetadataRoute extends Route {
  model() {
    return this.modelFor('record.show.edit');
  }

  setupController(controller, model) {
    super.setupController(controller, model);
    controller.set('model', model);
  }
}