import classic from 'ember-classic-decorator';
import Route from '@ember/routing/route';
import ScrollTo from 'mdeditor/mixins/scroll-to';
import {
  isEmpty
} from '@ember/utils';
import { get, set, action } from '@ember/object';

@classic
export default class IndexRoute extends Route.extend(ScrollTo) {
  init() {
    super.init(...arguments);

    this.breadCrumb = {
      title: 'Reference'
    }
  }

  afterModel(model) {
    let domainId = this.paramsFor('dictionary.show.edit.domain.edit')
      .domain_id;

    if(isEmpty(get(model, 'domainReference'))) {
      set(model, 'domainReference', {});
    }

    this.set('domainId', domainId);
  }

  setupController() {
    // Call _super for default behavior
    super.setupController(...arguments);

    this.controller.set('parentModel', this.modelFor(
      'dictionary.show.edit'));
  }

  @action
  backToDomain() {
    this.transitionTo('dictionary.show.edit.domain.edit',
      this.domainId);
  }

  @action
  editIdentifier(index) {
    this.transitionTo(
        'dictionary.show.edit.domain.edit.citation.identifier',
        index)
      .then(function () {
        this.setScrollTo('identifier');
      }.bind(this));
  }
}
