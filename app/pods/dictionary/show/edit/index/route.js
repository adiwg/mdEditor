import Route from '@ember/routing/route';
import { action } from '@ember/object';
import { set } from '@ember/object';
import ScrollTo from 'mdeditor/mixins/scroll-to';
import { inject as service } from '@ember/service';

export default class IndexRoute extends Route.extend(ScrollTo) {
  @service router;

  model() {
    return this.modelFor('dictionary.show.edit');
  }

  afterModel(m) {
    super.afterModel(...arguments);

    let model = m.json.dataDictionary;
    set(model, 'citation', model.citation ?? {});
    set(model, 'responsibleParty', model.responsibleParty ?? {});
    set(model, 'subject', model.subject ?? []);
    set(model, 'recommendedUse', model.recommendedUse ?? []);
    set(model, 'locale', model.locale ?? []);
    set(model, 'domain', model.domain ?? []);
    set(model, 'entity', model.entity ?? []);
  }

  setupController(controller, model) {
    super.setupController(controller, model);
    controller.set('model', model);

    this.controllerFor('dictionary.show.edit').setProperties({
      onCancel: () => this,
      cancelScope: this,
    });
  }

  @action
  setScrollTo(scrollTo) {
    this.controller.set('scrollTo', scrollTo || '');
  }

  @action
  editCitation(scrollTo) {
    this.router.transitionTo('dictionary.show.edit.citation').then(
      function () {
        this.setScrollTo(scrollTo);
      }.bind(this)
    );
  }
}
