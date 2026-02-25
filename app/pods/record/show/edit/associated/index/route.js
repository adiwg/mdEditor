import Route from '@ember/routing/route';
import { action } from '@ember/object';
import { get, set } from '@ember/object';
import { inject as service } from '@ember/service';

export default class IndexRoute extends Route {
  @service router;
  afterModel(m) {
    super.afterModel(...arguments);

    let model = get(m, 'json.metadata');
    set(model, 'associatedResource', get(model, 'associatedResource') ?? []);
  }
  setupController() {
    // Call _super for default behavior
    super.setupController(...arguments);

    this.controller.set('parentModel', this.modelFor('record.show.edit'));
  }

  @action
  editResource(id) {
    this.router.transitionTo('record.show.edit.associated.resource', id);
  } //,
  // templateClass() {
  //   return Ember.Object.extend({
  //     init() {
  //       this._super(...arguments);
  //       //this.set('authority', {});
  //     }
  //   });
  // }
}
