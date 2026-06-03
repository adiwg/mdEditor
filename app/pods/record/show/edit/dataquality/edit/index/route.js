import Route from '@ember/routing/route';
import ScrollTo from 'mdeditor/mixins/scroll-to';

export default class IndexRoute extends Route.extend(ScrollTo) {
  setupController(controller, model) {
    super.setupController(controller, model);

    controller.setProperties({
      parentModel: this.modelFor('record.show.edit.main'),
      dataQualityId: this.paramsFor('record.show.edit.dataquality.edit')
        .data_quality_id,
    });
  }
}
