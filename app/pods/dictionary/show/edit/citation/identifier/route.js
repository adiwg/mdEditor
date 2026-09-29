import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { isEmpty } from '@ember/utils';
import ScrollTo from 'mdeditor/mixins/scroll-to';
import getArrayItem from 'mdeditor/utils/get-array-item';

export default class IdentifierRoute extends Route.extend(ScrollTo) {
  @service flashMessages;
  @service router;
  model(params) {
    this.set('identifierId', params.identifier_id);

    return this.setupModel();
  }
  setupController() {
    super.setupController(...arguments);

    this.controller.set(
      'parentModel',
      this.modelFor('dictionary.show.edit.citation.index')
    );
    this.controllerFor('dictionary.show.edit').setProperties({
      onCancel: this.setupModel,
      cancelScope: this,
    });
  }
  setupModel() {
    let identifierId = this.identifierId;
    let model = this.modelFor('dictionary.show.edit.citation');
    let identifiers = model.get('json.dataDictionary.citation.identifier');
    let identifier = getArrayItem(identifiers, identifierId);

    //make sure the identifier exists
    if (isEmpty(identifier)) {
      this.flashMessages.warning(
        'No identifier found! Re-directing to citation...'
      );
      this.router.replaceWith('dictionary.show.edit.citation.index');

      return;
    }

    return identifier;
  }
}
