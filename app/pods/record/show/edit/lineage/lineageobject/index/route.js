import Route from '@ember/routing/route';
import { action } from '@ember/object';
import { get } from '@ember/object';
import ScrollTo from 'mdeditor/mixins/scroll-to';

export default class IndexRoute extends Route.extend(ScrollTo) {
  setupController() {
    // Call _super for default behavior
    this._super(...arguments);

    this.controller.set('parentModel', this.modelFor(
      'record.show.edit.main'));
    this.controller.set('lineageId', get(this.controllerFor(
      'record.show.edit.lineage.lineageobject'), 'lineageId'));
  }

  @action
  editCitation(index) {
      this.transitionTo('record.show.edit.lineage.lineageobject.citation',
          index)
        .then(
          function () {
            this.setScrollTo('citation');
          }.bind(this));
  }

  @action
  editSource(index) {
      this.transitionTo('record.show.edit.lineage.lineageobject.source',
          index)
        .then(
          function () {
            this.setScrollTo('source');
          }.bind(this));
  }

  @action
  editProcessStep(index) {
      this.transitionTo('record.show.edit.lineage.lineageobject.step',
          index)
        .then(
          function () {
            this.setScrollTo('process-step');
          }.bind(this));
  }
}