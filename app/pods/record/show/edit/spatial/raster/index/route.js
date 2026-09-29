import Route from '@ember/routing/route';
import { defineProperty } from '@ember/object';
import { alias } from '@ember/object/computed';

export default class IndexRoute extends Route {
  setupController(controller, model) {
    super.setupController(controller, model);

    controller.setProperties({
      parentModel: this.modelFor('record.show.edit'),
      rasterId: this.paramsFor('record.show.edit.spatial.raster').raster_id,
    });

    defineProperty(
      controller,
      'refreshSpy',
      alias('model.json.metadata.resourceInfo.coverageDescription.length')
    );
  }
}
