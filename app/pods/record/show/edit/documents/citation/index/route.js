import Ember from 'ember';
import ScrollTo from 'mdeditor/mixins/scroll-to';

const {
  Route,
  get
} = Ember;

export default Route.extend(ScrollTo, {
  setupController: function() {
    // Call _super for default behavior
    this._super(...arguments);

    this.controller.set('parentModel', this.modelFor(
      'record.show.edit'));
    this.controller.set('citationId', get(this.controllerFor(
      'record.show.edit.documents.citation'), 'citationId'));
  }
});
