import classic from 'ember-classic-decorator';
import Route from '@ember/routing/route';
import { get, action } from '@ember/object';
import ScrollTo from 'mdeditor/mixins/scroll-to';

@classic
export default class IndexRoute extends Route.extend(ScrollTo) {
  // breadCrumb: computed('controller.distributorId', function () {
  //   return {
  //     title: `Distributor ${this.controller.distributorId}`
  //     //title: `${get(this, 'distributionId')}: Distributors`
  //   };
  // }),

  setupController() {
    // Call _super for default behavior
    super.setupController(...arguments);

    this.controller.set('parentModel', this.modelFor('record.show.edit'));
    this.controller.set(
      'distributionId',
      get(
        this.controllerFor('record.show.edit.distribution.distributor'),
        'distributionId'
      )
    );
    this.controller.set(
      'distributorId',
      get(
        this.controllerFor('record.show.edit.distribution.distributor'),
        'distributorId'
      )
    );
  }

  @action
  deleteDistributor(id) {
    let model = this.controller.parentModel.get(
      'json.metadata.resourceDistribution'
    )[this.controller.distributionId].distributor;

    model.removeAt(id || parseInt(this.controller.distributorId, 10));
    this.transitionTo('record.show.edit.distribution', {
      queryParams: {
        scrollTo: `distribution-${this.controller.distributionId}`,
      },
    });
  }

  @action
  editTransferOption(id, routeParams, scrollToId) {
    this.setScrollTo(scrollToId);
    this.transitionTo(
      'record.show.edit.distribution.distributor.transfer',
      this.controller.distributionId,
      this.controller.distributorId,
      id
    );
  }
}