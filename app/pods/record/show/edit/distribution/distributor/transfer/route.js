import Route from '@ember/routing/route';
import { action } from '@ember/object';
import { isEmpty } from '@ember/utils';
import { A, isArray } from '@ember/array';
import ScrollTo from 'mdeditor/mixins/scroll-to';

export default class TransferRoute extends Route.extend(ScrollTo) {
  // breadCrumb: computed('controller.distributorId', function () {
  //   return {
  //     title: `Distributor ${this.controller.distributorId}`
  //     //title: `${get(this, 'distributionId')}: Distributors`
  //   };
  // }),
  model(params) {
    let tparams = this.paramsFor(
      'record.show.edit.distribution.distributor');

    this.set('transferId', params.transfer_id);
    this.set('distributionId', tparams.distribution_id);
    this.set('distributorId', tparams.distributor_id);

    return this.setupModel();
  }
  setupController() {
    // Call _super for default behavior
    super.setupController(...arguments);

    this.controller.set('parentModel', this.modelFor(
      'record.show.edit'));
    this.controller.set('transferId', this.transferId);
    this.controller.set('distributionId', this.distributionId);
    this.controller.set('distributorId', this.distributorId);
  }
  setupModel() {
    let transferId = this.transferId;
    let distributionId = this.distributionId;
    let distributorId = this.distributorId;
    let model = this.modelFor('record.show.edit');
    let objects = model.get('json.metadata.resourceDistribution');
    let distribution = distributionId && isArray(objects) ? A(
        objects).objectAt(distributionId) :
      undefined;
    let distributor = distribution && distributorId && isArray(distribution
        .distributor) ? A(
        distribution.distributor).objectAt(distributorId) :
      undefined;
    let transfer = distributor && transferId && isArray(distributor
        .transferOption) ? A(
        distributor.transferOption).objectAt(transferId) :
      undefined;

    if(isEmpty(distributor)) {
      this.flashMessages
        .warning(
          'No Transfer Option object found! Re-directing to Distribution...'
          );
      this.replaceWith('record.show.edit.distribution');

      return;
    }

    if(isEmpty(transfer)) {
      this.flashMessages
        .warning(
          'No Transfer Option object found! Re-directing to Distributor...'
          );
      this.replaceWith('record.show.edit.distribution.distributor');

      return;
    }

    return transfer;
  }
    deleteTransfer(id) {
      let model = this.controller.parentModel.get(
          'json.metadata.resourceDistribution')[this.controller
          .distributionId]
        .distributor[this.controller.distributorId].transferOption;

      model.removeAt(id || parseInt(this.transferId, 0));
      this.transitionTo('record.show.edit.distribution.distributor', {
        queryParams: {
          scrollTo: 'transfer-options'
        }
      });
    }
    backToDistributor() {
      this.transitionTo('record.show.edit.distribution.distributor');
    }
}