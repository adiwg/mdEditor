import Route from '@ember/routing/route';
import ScrollTo from 'mdeditor/mixins/scroll-to';
import { alias } from '@ember/object/computed';
import { defineProperty } from '@ember/object';

export default class IndexRoute extends Route.extend(ScrollTo) {
  setupController() {
    super.setupController(...arguments);

    this.controller.set('parentModel', this.modelFor('record.show.edit'));
    defineProperty(
      this.controller,
      'refreshSpy',
      alias('model.json.metadata.resourceDistribution.length')
    );
  }
}
