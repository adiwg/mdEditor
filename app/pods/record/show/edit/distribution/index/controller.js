import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { A } from '@ember/array';

export default class DistributionIndexController extends Controller {
  @service router;

  get distributions() {
    let model = this.model || this.parentModel;

    if (!model || typeof model.get !== 'function') {
      return null;
    }

    let dists = model.get('json.metadata.resourceDistribution');

    if (!dists) {
      dists = A([]);
      model.set('json.metadata.resourceDistribution', dists);
    }

    return dists;
  }

  @action
  addDistribution() {
    let dists = this.distributions;

    if (!dists) {
      return;
    }

    dists.pushObject({});

    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  }

  @action
  editDistributor(id, routeParams, scrollToId) {
    this.setScrollTo(scrollToId);
    this.router.transitionTo(
      'record.show.edit.distribution.distributor',
      routeParams,
      id
    );
  }

  @action
  deleteDistribution(id) {
    let dists = this.distributions;

    if (!dists) {
      return;
    }

    dists.removeAt(id);
  }

  @action
  setScrollTo(scrollTo) {
    this.set('scrollTo', scrollTo || '');
  }
}
