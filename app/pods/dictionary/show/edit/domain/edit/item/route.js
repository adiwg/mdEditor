import Route from '@ember/routing/route';
import {
  computed
} from '@ember/object';
import {
  isArray
} from '@ember/array';
import {
  isEmpty
} from '@ember/utils';
import ScrollTo from 'mdeditor/mixins/scroll-to';

export default Route.extend(ScrollTo, {
  beforeModel(transition) {
    this.set('domainId', transition.params[
      'dictionary.show.edit.domain.edit'].domain_id);
  },
  model(params) {
    this.set('itemId', params.item_id);

    return this.setupModel();
  },

  breadCrumb: computed('itemId', function () {
    return {
      title: 'Item ' + this.itemId
    };
  }),

  setupController: function () {
    // Call _super for default behavior
    this._super(...arguments);

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
  },

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
  },

  actions: {
    backToDomain() {
      this.transitionTo('dictionary.show.edit.domain.edit',
        this.domainId);
    }
  }
});
