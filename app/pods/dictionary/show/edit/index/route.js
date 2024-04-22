import Route from '@ember/routing/route';
import { set, get } from '@ember/object';
import ScrollTo from 'mdeditor/mixins/scroll-to';

export default Route.extend(ScrollTo, {
  afterModel(m) {
    this._super(...arguments);

    let model = get(m, 'json.dataDictionary');
    set(model, 'citation', get(model, 'citation') !== undefined ? get(model, 'citation') : {});
    set(model, 'responsibleParty', get(model, 'responsibleParty') !== undefined ? get(model, 'responsibleParty') : {});
    set(model, 'subject', get(model, 'subject') !== undefined ? get(model, 'subject') : []);
    set(model, 'recommendedUse', get(model, 'recommendedUse') !== undefined ? get(model, 'recommendedUse') : []);
    set(model, 'locale', get(model, 'locale') !== undefined ? get(model, 'locale') : []);
    set(model, 'domain', get(model, 'domain') !== undefined ? get(model, 'domain') : []);
    set(model, 'entity', get(model, 'entity') !== undefined ? get(model, 'entity') : []);
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
