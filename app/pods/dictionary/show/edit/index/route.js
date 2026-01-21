import Route from '@ember/routing/route';
import { action } from '@ember/object';
import { set, get } from '@ember/object';
import ScrollTo from 'mdeditor/mixins/scroll-to';

export default class IndexRoute extends Route.extend(ScrollTo) {
  afterModel(m) {
    this._super(...arguments);

    let model = get(m, 'json.dataDictionary');
    set(model, 'citation', get(model, 'citation') ?? {});
    set(model, 'responsibleParty', get(model, 'responsibleParty') ?? {});
    set(model, 'subject', get(model, 'subject') ?? []);
    set(model, 'recommendedUse', get(model, 'recommendedUse') ?? []);
    set(model, 'locale', get(model, 'locale') ?? []);
    set(model, 'domain', get(model, 'domain') ?? []);
    set(model, 'entity', get(model, 'entity') ?? []);
  }
  setupController(controller, model) {
    this._super(controller, model);

    this.controllerFor('dictionary.show.edit')
      .setProperties({
        onCancel: () => this,
        cancelScope: this
      });
  }
    editCitation(scrollTo) {
      this.transitionTo('dictionary.show.edit.citation')
        .then(function () {
          this.setScrollTo(scrollTo);
        }.bind(this));
    }
}