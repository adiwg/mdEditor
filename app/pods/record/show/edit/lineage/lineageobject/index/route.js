import Ember from 'ember';
import ScrollTo from 'mdeditor/mixins/scroll-to';

const {
  Route,
  get
} = Ember;

export default Route.extend(ScrollTo, {
  setupController: function () {
    // Call _super for default behavior
    this._super(...arguments);

    this.controller.set('parentModel', this.modelFor(
      'record.show.edit.main'));
    this.controller.set('lineageId', get(this.controllerFor(
      'record.show.edit.lineage.lineageobject'), 'lineageId'));
  },
  actions: {
    editCitation(index) {
      this.transitionTo('record.show.edit.lineage.lineageobject.citation',
          index)
        .then(
          function () {
            this.setScrollTo('citation');
          }.bind(this));
    },
    editProcessStep(index) {
      this.transitionTo('record.show.edit.lineage.lineageobject.step',
          index)
        .then(
          function () {
            this.setScrollTo('process-step');
          }.bind(this));
    }
  }
});
