import Route from '@ember/routing/route';
import { isArray } from '@ember/array';
import { isEmpty } from '@ember/utils';

export default class EditRoute extends Route {
  model(params) {
    this.set('domainId', params.domain_id);

    return this.setupModel();
  }

  get breadCrumb() {
    return {
      title: this.domainId
    };
  }

  setupController() {
    // Call super for default behavior
    super.setupController(...arguments);

    this.controller.set('setupModel', this.setupModel);
    this.controller.set('domainId', this.domainId);
    this.controllerFor('dictionary.show.edit')
      .setProperties({
        onCancel: this.setupModel,
        cancelScope: this
      });
  }
  setupModel() {
    let domainId = this.domainId;
    let model = this.modelFor('dictionary.show.edit');
    let objects = model.get('json.dataDictionary.domain');
    let resource = domainId && isArray(objects) ? objects.objectAt(domainId) :
      undefined;

    //make sure the domain exists
    if(isEmpty(resource)) {
      this.flashMessages
        .warning('No Domain object found! Re-directing to list...');
      this.replaceWith('dictionary.show.edit.domain');

      return;
    }

    return resource;
  }
}