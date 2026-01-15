import Route from '@ember/routing/route';
import { isEmpty } from '@ember/utils';
import ScrollTo from 'mdeditor/mixins/scroll-to';

export default class IdentifierRoute extends Route.extend(ScrollTo) {
  beforeModel() {
    this.set('domainId', this.paramsFor(
      'dictionary.show.edit.domain.edit').domain_id);
  }
  model(params) {
    this.set('identifierId', params.identifier_id);

    return this.setupModel();
  }
  setupController() {
    // Call _super for default behavior
    this._super(...arguments);

    this.controller.set('parentModel', this.modelFor('dictionary.show.edit'));
    this.controllerFor('dictionary.show.edit')
      .setProperties({
        onCancel: this.setupModel,
        cancelScope: this
      });
  }
  setupModel() {
    let identifierId = this.identifierId;
    //let model = this.modelFor('dictionary.show.edit.citation.index');
    //let identifiers = model.get('json.dataDictionary.citation.identifier');
    let model = this.modelFor('dictionary.show.edit');
    let identifier = model.get('json.dataDictionary.domain.' + this.domainId + '.domainReference.identifier.' + identifierId);
    //let identifier = identifierId && isArray(identifiers) ? identifiers.get(identifierId) : undefined;

    //make sure the identifier exists
    if (isEmpty(identifier)) {
      this.flashMessages
        .warning('No identifier found! Re-directing to citation...');
      this.replaceWith('dictionary.show.edit.domain.edit.citation.index');

      return;
    }

    return identifier;
  }
}