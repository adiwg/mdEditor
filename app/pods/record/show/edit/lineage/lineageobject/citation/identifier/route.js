import classic from 'ember-classic-decorator';
import Route from '@ember/routing/route';
import { get, action } from '@ember/object';
import { isEmpty } from '@ember/utils';
import { isArray } from '@ember/array';
import ScrollTo from 'mdeditor/mixins/scroll-to';

@classic
export default class IdentifierRoute extends Route.extend(ScrollTo) {
  model(params) {
    this.set('identifierId', params.identifier_id);

    return this.setupModel();
  }

  setupController() {
    // Call _super for default behavior
    super.setupController(...arguments);

    this.controller.set('parentModel', this.modelFor('record.show.edit'));
    this.controllerFor('record.show.edit').setProperties({
      onCancel: this.setupModel,
      cancelScope: this,
    });
  }

  setupModel() {
    let identifierId = this.identifierId;
    let model = this.modelFor(
      'record.show.edit.lineage.lineageobject.citation'
    );
    let identifiers = get(model, 'identifier');
    let identifier =
      identifierId && isArray(identifiers)
        ? identifiers.get(identifierId)
        : undefined;

    //make sure the identifier exists
    if (isEmpty(identifier)) {
      this.flashMessages.warning(
        'No identifier found! Re-directing to Citation...'
      );
      this.replaceWith('record.show.edit.lineage.lineageobject.citation');

      return;
    }

    return identifier;
  }

  @action
  goBack() {
    this.transitionTo('record.show.edit.lineage.lineageobject.citation');
  }
}