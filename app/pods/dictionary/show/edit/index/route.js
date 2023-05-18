import Route from '@ember/routing/route';
import { set, getWithDefault, get } from '@ember/object';
import ScrollTo from 'mdeditor/mixins/scroll-to';

export default Route.extend(ScrollTo, {
  afterModel(m) {
    this._super(...arguments);

    let model = get(m, 'json.dataDictionary');
    set(model, 'citation', (model.citation === undefined ? {} : model.citation));
    set(model, 'responsibleParty', (model.responsibleParty === undefined ? {} : model.responsibleParty));
    set(model, 'subject', (model.subject === undefined ? [] : model.subject));
    set(model, 'recommendedUse', (model.recommendedUse === undefined ? [] : model.recommendedUse));
    set(model, 'locale', (model.locale === undefined ? [] : model.locale));
    set(model, 'domain', (model.domain === undefined ? [] : model.domain));
    set(model, 'entity', (model.entity === undefined ? [] : model.entity));
  },

  setupController(controller, model) {
    this._super(controller, model);

    this.controllerFor('dictionary.show.edit')
      .setProperties({
        onCancel: () => this,
        cancelScope: this
      });
  },

  actions: {
    editCitation(scrollTo) {
      this.transitionTo('dictionary.show.edit.citation')
        .then(function () {
          this.setScrollTo(scrollTo);
        }.bind(this));
    }
  }
});
