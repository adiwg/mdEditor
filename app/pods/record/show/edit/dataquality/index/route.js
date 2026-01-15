import Route from '@ember/routing/route';
import { action } from '@ember/object';
import ScrollTo from 'mdeditor/mixins/scroll-to';
import { get, getWithDefault, set } from '@ember/object';


export default class IndexRoute extends Route.extend(ScrollTo) {
  afterModel(m) {
    this._super(...arguments);

    let model = get(m, 'json.metadata');
    set(model, 'dataQuality', getWithDefault(model, 'dataQuality', []));

  }
  setupController() {
    this._super(...arguments);

    this.controller.set('parentModel', this.modelFor(
      'record.show.edit'));

  }
    editDataQuality(id) {
      this.transitionTo('record.show.edit.dataquality.edit', id);
    }
}