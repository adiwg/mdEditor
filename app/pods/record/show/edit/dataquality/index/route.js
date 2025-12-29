import classic from 'ember-classic-decorator';
import Route from '@ember/routing/route';
import ScrollTo from 'mdeditor/mixins/scroll-to';
import { get, getWithDefault, set, action } from '@ember/object';


@classic
export default class IndexRoute extends Route.extend(ScrollTo) {
  afterModel(m) {
    super.afterModel(...arguments);

    let model = get(m, 'json.metadata');
    set(model, 'dataQuality', getWithDefault(model, 'dataQuality', []));

  }

  setupController() {
    super.setupController(...arguments);

    this.controller.set('parentModel', this.modelFor(
      'record.show.edit'));

  }

  @action
  editDataQuality(id) {
    this.transitionTo('record.show.edit.dataquality.edit', id);
  }
}
