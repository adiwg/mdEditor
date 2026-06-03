import Route from '@ember/routing/route';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { get } from '@ember/object';
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

    controller.set('parentModel', this.modelFor('record.show.edit'));
    this.controllerFor('record.show.edit').setProperties({
      onCancel: this.setupModel,
      cancelScope: this,
    });
  }
  setupModel() {
    let identifierId = this.identifierId;
    let model = this.modelFor('record.show.edit.metadata.alternate');
    let identifiers = get(model, 'identifier');
    let identifier = getArrayItem(identifiers, identifierId);

    //make sure the identifier exists
    if (isEmpty(identifier)) {
      this.flashMessages.warning(
        'No identifier found! Re-directing to Alternate Metadata...'
      );
      this.router.replaceWith('record.show.edit.metadata.alternate');

      return;
    }

    return identifier;
  }

  @action
  goBack() {
    this.router.transitionTo('record.show.edit.metadata.alternate');
  }
}
