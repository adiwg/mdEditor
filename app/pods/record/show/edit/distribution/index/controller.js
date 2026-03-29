import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class DistributionIndexController extends Controller {
  @service router;
  @action
  addDistribution() {
    let dists = this.model.get('json.metadata.resourceDistribution');

    dists.pushObject({});

    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  }

  @action
  editDistributor(id, routeParams, scrollToId) {
    this.setScrollTo(scrollToId);
    this.router.transitionToRoute(
      'record.show.edit.distribution.distributor',
      routeParams,
      id
    );
  }

  @action
  deleteDistribution(id) {
    let dists = this.model.get('json.metadata.resourceDistribution');

    dists.removeAt(id);
  }

  @action
  setScrollTo(scrollTo) {
    this.set('scrollTo', scrollTo || '');
  }
}
