import Route from '@ember/routing/route';
import { action } from '@ember/object';
import ScrollTo from 'mdeditor/mixins/scroll-to';
import { alias } from '@ember/object/computed';
import { defineProperty } from '@ember/object';
import { inject as service } from '@ember/service';

export default class IndexRoute extends Route.extend(ScrollTo) {
  @service router;

  setupController() {
    // Call _super for default behavior
    this._super(...arguments);

    this.controller.set('parentModel', this.modelFor('record.show.edit'));
    defineProperty(
      this.controller,
      'refreshSpy',
      alias('model.json.metadata.resourceDistribution.length')
    );
  }

  @action
  addDistribution() {
    let dists = this.currentRouteModel().get(
      'json.metadata.resourceDistribution'
    );

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
    let dists = this.currentRouteModel().get(
      'json.metadata.resourceDistribution'
    );

    dists.removeAt(id);
  }
}
