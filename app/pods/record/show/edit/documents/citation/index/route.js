import classic from 'ember-classic-decorator';
import Route from '@ember/routing/route';
import { get } from '@ember/object';
import ScrollTo from 'mdeditor/mixins/scroll-to';

@classic
export default class IndexRoute extends Route.extend(ScrollTo) {
  setupController() {
    // Call _super for default behavior
    super.setupController(...arguments);

    this.controller.set('parentModel', this.modelFor('record.show.edit'));
    this.controller.set(
      'citationId',
      get(
        this.controllerFor('record.show.edit.documents.citation'),
        'citationId'
      )
    );
  }
}