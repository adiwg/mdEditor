import Route from '@ember/routing/route';
import { action } from '@ember/object';
import EmberObject, { get, getWithDefault, set } from '@ember/object';
import { A } from '@ember/array';
import ScrollTo from 'mdeditor/mixins/scroll-to';

export default class IndexRoute extends Route.extend(ScrollTo) {
  afterModel(m) {
    this._super(...arguments);

    let model = get(m, 'json.metadata');
    set(model, 'funding', A(getWithDefault(model, 'funding', [])));
  }
  setupController() {
    // Call _super for default behavior
    this._super(...arguments);

    this.controller.set('parentModel', this.modelFor(
      'record.show.edit'));
  }
    editAllocation(id) {
      this.transitionTo('record.show.edit.funding.allocation', id);
    }
    addAllocation() {
      let funding = this.currentRouteModel()
        .get('json.metadata.funding');
      let allocation = EmberObject.create({});

      // once(this, () => {

        funding.pushObject(allocation);
        this.setScrollTo(`funding-period-${funding.length-1}`);
        this.transitionTo('record.show.edit.funding.allocation',
          funding.length - 1);

        // $("html, body").animate({
        //   scrollTop: $(document).height()
        // }, "slow");
      // });

    }
    deleteAllocation(id) {
      let all = this.currentRouteModel().get(
        'json.metadata.funding');

      all.removeAt(id);
      this.controller.set('refresh', all.get('length'));
    }
}