import classic from 'ember-classic-decorator';
import { computed } from '@ember/object';
import Route from '@ember/routing/route';
import { isArray } from '@ember/array';
import { isEmpty } from '@ember/utils';

@classic
export default class EditRoute extends Route {
  model(params) {
    this.set('entityId', params.entity_id);

    return this.setupModel();
  }

  @computed('entityId')
  get breadCrumb() {
    return {
      title: this.entityId,
    };
  }

  setupController() {
    // Call _super for default behavior
    super.setupController(...arguments);

    this.controller.set('setupModel', this.setupModel);
    this.controller.set('entityId', this.entityId);
    this.controllerFor('dictionary.show.edit').setProperties({
      onCancel: this.setupModel,
      cancelScope: this,
    });
  }

  setupModel() {
    let entityId = this.entityId;
    let model = this.modelFor('dictionary.show.edit');
    let objects = model.get('json.dataDictionary.entity');
    let resource =
      entityId && isArray(objects) ? objects.objectAt(entityId) : undefined;

    //make sure the entity exists
    if (isEmpty(resource)) {
      this.flashMessages.warning(
        'No Entity object found! Re-directing to list...'
      );
      this.replaceWith('dictionary.show.edit.entity');

      return;
    }

    return resource;
  }
}
