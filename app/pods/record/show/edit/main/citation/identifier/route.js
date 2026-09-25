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
  setupController(controller, model) {
    super.setupController(controller, model);

    controller.set('parentModel', this.modelFor('record.show.edit.main'));
    this.controllerFor('record.show.edit').setProperties({
      onCancel: this.setupModel,
      cancelScope: this,
    });
  }
  setupModel() {
    let identifierId = this.identifierId;
    let model = this.modelFor('record.show.edit.main');
    let identifiers = model.get(
      'json.metadata.resourceInfo.citation.identifier'
    );
    let identifier = getArrayItem(identifiers, identifierId);

    //make sure the identifier exists
    if (isEmpty(identifier)) {
      this.flashMessages.warning(
        'No identifier found! Re-directing to citation...'
      );
      this.router.replaceWith('record.show.edit.main.citation');

      return;
    }

    return identifier;
  }
}
