import Route from '@ember/routing/route';
import ScrollTo from 'mdeditor/mixins/scroll-to';
import { isEmpty } from '@ember/utils';
import { get, set } from '@ember/object';

export default Route.extend(ScrollTo, {
  breadCrumb: {
    title: 'Reference'
  },

  afterModel(model) {
    let domainId = this.paramsFor('dictionary.show.edit.domain.edit')
      .domain_id;

    if(isEmpty(get(model,'domainReference'))) {
      set(model,'domainReference',{});
    }

    this.set('domainId', domainId);
  },

  setupController: function () {
    // Call _super for default behavior
    this._super(...arguments);

    this.controller.set('parentModel', this.modelFor('dictionary.show.edit'));
  },

  actions: {
    backToDomain() {
      this.transitionTo('dictionary.show.edit.domain.edit',
        this.get('domainId'));
    },
    editIdentifier(index) {
      this.transitionTo('dictionary.show.edit.domain.edit.citation.identifier',
          index)
        .then(function () {
          this.setScrollTo('identifier');
        }.bind(this));
    }
  }
});
