import Route from '@ember/routing/route';
import ScrollTo from 'mdeditor/mixins/scroll-to';
import { isEmpty } from '@ember/utils';
import { get, set } from '@ember/object';

export default Route.extend(ScrollTo, {
  afterModel(model) {
    let domainId = this.paramsFor('dictionary.show.edit.domain.edit')
      .domain_id;

    if(isEmpty(get(model,'domainReference'))) {
      set(model,'domainReference',{});
    }

    this.set('domainId', domainId);
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
