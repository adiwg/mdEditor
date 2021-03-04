import classic from 'ember-classic-decorator';
import Route from '@ember/routing/route';
import EmberObject, { get, getWithDefault, set, action } from '@ember/object';
import { A } from '@ember/array';
import ScrollTo from 'mdeditor/mixins/scroll-to';

@classic
export default class IndexRoute extends Route.extend(ScrollTo) {
  afterModel(m) {
    super.afterModel(...arguments);

    let model = get(m, 'json.metadata');
    set(model, 'funding', A(getWithDefault(model, 'funding', [])));
  }

  setupController() {
    // Call _super for default behavior
    super.setupController(...arguments);

    this.controller.set('parentModel', this.modelFor('record.show.edit'));
  }

  @action
  editAllocation(id) {
    this.transitionTo('record.show.edit.funding.allocation', id);
  }

  @action
  addAllocation() {
    let funding = this.currentRouteModel().get('json.metadata.funding');
    let allocation = EmberObject.create({});

    // once(this, () => {

    funding.pushObject(allocation);
    this.setScrollTo(`funding-period-${funding.length - 1}`);
    this.transitionTo(
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