import classic from 'ember-classic-decorator';
import Route from '@ember/routing/route';
import { get, action } from '@ember/object';
import ScrollTo from 'mdeditor/mixins/scroll-to';

@classic
export default class IndexRoute extends Route.extend(ScrollTo) {
  setupController() {
    // Call _super for default behavior
    super.setupController(...arguments);

    this.controller.set('parentModel', this.modelFor(
      'record.show.edit.main'));
    this.controller.set('stepId', get(this.controllerFor(
      'record.show.edit.lineage.lineageobject.step'), 'stepId'));
  }

  @action
  editCitation(index) {
    this.transitionTo('record.show.edit.lineage.lineageobject.step.citation',
        index)
      .then(
        function () {
          this.setScrollTo('citation');
        }.bind(this));
  }

  @action
  goBack() {
    this.transitionTo('record.show.edit.lineage.lineageobject');
  }
}
