import Route from '@ember/routing/route';
import { isEmpty } from '@ember/utils';
import { isArray } from '@ember/array';
import { computed, get } from '@ember/object';
import { A } from '@ember/array';

export default Route.extend({
  breadCrumb: computed('citationId', function () {
    return {
      title: get(this, 'citationId'),
      linkable: true
    };
  }),

  model(params) {
    this.set('citationId', params.citation_id);

    return this.setupModel();
  },

  setupController: function () {
    // Call _super for default behavior
    this._super(...arguments);

    //this.controller.set('parentModel', this.modelFor('record.show.edit.main'));
    this.controller.set('citationId', get(this, 'citationId'));
    this.controllerFor('record.show.edit')
      .setProperties({
        onCancel: this.setupModel,
        cancelScope: this
      });
  },

  setupModel() {
    let citationId = get(this, 'citationId');
    let model = this.modelFor('record.show.edit');
    let objects = model.get('json.metadata.additionalDocumentation');
    let resource = citationId && isArray(objects) ? A(
        objects)
      .objectAt(citationId) :
      undefined;

    //make sure the identifier exists
    if(isEmpty(resource)) {
      get(this, 'flashMessages')
        .warning('No Document object found! Re-directing to list...');
      this.replaceWith('record.show.edit.documents');

      return;
    }

    return resource;
  }
});
