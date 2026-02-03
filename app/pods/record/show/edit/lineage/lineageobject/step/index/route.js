import Route from '@ember/routing/route';
import { action } from '@ember/object';
import { get } from '@ember/object';
import ScrollTo from 'mdeditor/mixins/scroll-to';
import { inject as service } from '@ember/service';

export default class IndexRoute extends Route.extend(ScrollTo) {
  @service router;

  setupController() {
    // Call _super for default behavior
    this._super(...arguments);

    this.controller.set('parentModel', this.modelFor('record.show.edit.main'));
    this.controller.set(
      'stepId',
      get(
        this.controllerFor('record.show.edit.lineage.lineageobject.step'),
        'stepId'
      )
    );
  }

  @action
  editCitation(index) {
    this.router
      .transitionTo(
        'record.show.edit.lineage.lineageobject.step.citation',
        index
      )
      .then(
        function () {
          this.setScrollTo('citation');
        }.bind(this)
      );
  }

  @action
  goBack() {
    this.router.transitionTo('record.show.edit.lineage.lineageobject');
  }
}
