import Controller from '@ember/controller';
import { action } from '@ember/object';
import EmberObject from '@ember/object';
import { inject as service } from '@ember/service';

export default class FundingIndexController extends Controller {
  @service router;
  @action
  editAllocation(id) {
    this.router.transitionToRoute('record.show.edit.funding.allocation', id);
  }

  @action
  addAllocation() {
    let funding = this.model.get('json.metadata.funding');
    let allocation = EmberObject.create({});

    funding.pushObject(allocation);
    this.setScrollTo(`funding-period-${funding.length - 1}`);
    this.router.transitionToRoute(
      'record.show.edit.funding.allocation',
      funding.length - 1
    );
  }

  @action
  deleteAllocation(id) {
    let all = this.model.get('json.metadata.funding');

    all.removeAt(id);
    this.set('refresh', all.get('length'));
  }

  @action
  setScrollTo(scrollTo) {
    this.set('scrollTo', scrollTo || '');
  }
}
