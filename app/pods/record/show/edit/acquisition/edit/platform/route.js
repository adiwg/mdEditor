import Route from '@ember/routing/route';
import { isEmpty } from '@ember/utils';
import { isArray } from '@ember/array';

export default Route.extend({
  model(params) {
    this.set('platformId', params.platform_id);
    this.set(
      'acquisitionId',
      this.paramsFor('record.show.edit.acquisition.edit').acquisition_id
    );

    return this.setupModel();
  },

  setupController: function () {
    // Call _super for default behavior
    this._super(...arguments);

    this.controller.set('parentModel', this.modelFor('record.show.edit'));
    this.controllerFor('record.show.edit').setProperties({
      onCancel: this.setupModel,
      cancelScope: this,
    });
  },

  setupModel() {
    let platformId = this.platformId;
    let acquisitionId = this.acquisitionId;
    let model = this.modelFor('record.show.edit');
    let platforms = model.get(
      'json.metadata.acquisition.' + acquisitionId + '.platform'
    );
    let platform =
      platformId && isArray(platforms) ? platforms.get(platformId) : undefined;

    //make sure the identifier exists
    if (isEmpty(platform)) {
      this.flashMessages.warning('No platform found! Re-directing...');
      this.replaceWith('record.show.edit.acquisition.edit');

      return;
    }

    return platform;
  },
  actions: {
    parentModel() {
      return this.modelFor('record.show.edit');
    },
  },
});
