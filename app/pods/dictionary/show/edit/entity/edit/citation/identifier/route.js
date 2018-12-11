import Route from '@ember/routing/route';
import {
  isEmpty
} from '@ember/utils';
import {
  isArray
} from '@ember/array';
import ScrollTo from 'mdeditor/mixins/scroll-to';

export default Route.extend(ScrollTo, {
  beforeModel(transition) {
    this.set('entityId', transition.params[
      'dictionary.show.edit.entity.edit'].entity_id);
    this.set('citationId', transition.params[
      'dictionary.show.edit.entity.edit.citation'].citation_id);
  },
  model(params) {
    this.set('identifierId', params.identifier_id);

    return this.setupModel();
  },

  setupController: function () {
    // Call _super for default behavior
    this._super(...arguments);

    this.controller.set('parentModel', this.modelFor(
      'dictionary.show.edit'));
    this.controllerFor('dictionary.show.edit')
      .setProperties({
        onCancel: this.setupModel,
        cancelScope: this
      });
  },

  setupModel() {
    let identifierId = this.identifierId;
    //let model = this.modelFor('dictionary.show.edit.citation.index');
    //let identifiers = model.get('json.dataDictionary.citation.identifier');
    let model = this.modelFor('dictionary.show.edit');
    let identifiers = model.get('json.dataDictionary.entity.' + this.entityId + '.entityReference.' + this.citationId + '.identifier');
    let identifier = identifierId && isArray(identifiers) ? identifiers.get(
      identifierId) : undefined;

    //make sure the identifier exists
    if(isEmpty(identifier)) {
      this.flashMessages
        .warning('No identifier found! Re-directing to citation...');
      this.replaceWith('dictionary.show.edit.entity.edit.citation.index');

      return;
    }

    return identifier;
  },

  actions: {
    backToReference() {
      this.transitionTo('dictionary.show.edit.entity.edit.citation',
        this.entityId, this.citationId);
    }
  }
});
