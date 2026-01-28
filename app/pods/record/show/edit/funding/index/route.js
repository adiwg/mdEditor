import Route from '@ember/routing/route';
import { action } from '@ember/object';
import EmberObject, { get, set } from '@ember/object';
import { A } from '@ember/array';
import ScrollTo from 'mdeditor/mixins/scroll-to';
import { inject as service } from '@ember/service';

export default class IndexRoute extends Route.extend(ScrollTo) {
  @service router;

  afterModel(m) {
    this._super(...arguments);

    let model = get(m, 'json.metadata');
    set(model, 'funding', A(get(model, 'funding', [])));
  }
  setupController() {
    // Call _super for default behavior
    this._super(...arguments);

    this.controller.set('parentModel', this.modelFor('record.show.edit'));
  }

  @action
  editAllocation(id) {
    this.router.transitionTo('record.show.edit.funding.allocation', id);
  }

  @action
  addAllocation() {
    let funding = this.currentRouteModel().get('json.metadata.funding');
    let allocation = EmberObject.create({});

    // once(this, () => {

    funding.pushObject(allocation);
    this.setScrollTo(`funding-period-${funding.length - 1}`);
    this.router.transitionTo(
      'record.show.edit.funding.allocation',
      funding.length - 1
    );

    // $("html, body").animate({
    //   scrollTop: $(document).height()
    // }, "slow");
    // });
  }

  @action
  deleteAllocation(id) {
    let all = this.currentRouteModel().get('json.metadata.funding');

    all.removeAt(id);
    this.controller.set('refresh', all.get('length'));
  }
}
