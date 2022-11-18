import Route from '@ember/routing/route';
import { get } from '@ember/object';
import ScrollTo from 'mdeditor/mixins/scroll-to';

export default Route.extend(ScrollTo, {
  setupController: function () {
    // Call _super for default behavior
    this._super(...arguments);

    this.controller.set('parentModel', this.modelFor(
      'record.show.edit.main'));
    this.controller.set('dataQualityId', get(this.controllerFor(
      'record.show.edit.dataquality.edit'), 'dataQualityId'));
  }
});
