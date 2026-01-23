import Route from '@ember/routing/route';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import {
  isArray
} from '@ember/array';
import {
  isEmpty
} from '@ember/utils';
import ScrollTo from 'mdeditor/mixins/scroll-to';

export default class ItemRoute extends Route.extend(ScrollTo) {
  @service flashMessages;
  beforeModel() {
    this.set('domainId', this.paramsFor(
      'dictionary.show.edit.domain.edit').domain_id);
  }
  model(params) {
    this.set('itemId', params.item_id);

    return this.setupModel();
  }

  get breadCrumb() {
    return {
      title: 'Item ' + this.itemId
    };
  }

  setupController() {
    // Call super for default behavior
    super.setupController(...arguments);

    //let parent = this.controllerFor('dictionary.show.edit.domain.edit.index');

    this.controller.set('parentModel', this.modelFor(
      'dictionary.show.edit'));
    this.controller.set('domainId', this.domainId);
    this.controller.set('itemId', this.itemId);
    this.controllerFor('dictionary.show.edit')
      .setProperties({
        onCancel: this.setupModel,
        cancelScope: this
      });
  }
  setupModel() {
    let itemId = this.itemId;
    let model = this.modelFor('dictionary.show.edit');
    let objects = model.get('json.dataDictionary.domain.' + this.domainId + '.domainItem');
    let resource = itemId && isArray(objects) ? objects.objectAt(itemId) :
      undefined;

    //make sure the domain item exists
    if(isEmpty(resource)) {
      this.flashMessages
        .warning('No Domain Item found! Re-directing to list...');
      this.replaceWith('dictionary.show.edit.domain');

      return;
    }

    return resource;
  }

  @action
  backToDomain() {
    this.transitionTo('dictionary.show.edit.domain.edit',
      this.domainId);
  }
}