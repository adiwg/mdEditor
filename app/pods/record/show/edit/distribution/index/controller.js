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
    } else if (typeof dists.pushObject !== 'function') {
      dists = A(dists);
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

    // Notify Glimmer that model.json changed so the #each re-renders
    // (metadata is a plain POJO, so Glimmer doesn't auto-track deeper than json)
    (this.model || this.parentModel).notifyPropertyChange('json');

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
    (this.model || this.parentModel).notifyPropertyChange('json');
  }

  @action
  setScrollTo(scrollTo) {
    this.set('scrollTo', scrollTo || '');
  }
}
