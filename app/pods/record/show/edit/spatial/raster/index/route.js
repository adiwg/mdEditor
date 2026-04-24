import Route from '@ember/routing/route';
import { get, defineProperty } from '@ember/object';
import { alias } from '@ember/object/computed';

export default class IndexRoute extends Route {
  setupController() {
    // Call _super for default behavior
    this._super(...arguments);

    this.controller.set('parentModel', this.modelFor('record.show.edit'));
    this.controller.set(
      'rasterId',
      get(this.controllerFor('record.show.edit.spatial.raster'), 'rasterId')
    );

    defineProperty(
      this.controller,
      'refreshSpy',
      alias('model.json.metadata.resourceInfo.coverageDescription.length')
    );
  }
}
