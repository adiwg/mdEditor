import Route from '@ember/routing/route';
import { isEmpty } from '@ember/utils';
import { isArray } from '@ember/array';
// import { computed } from '@ember/object';

export default Route.extend({
  model(params) {
    this.set('platformId', params.platform_id);
    this.set(
      'acquisitionId',
      this.paramsFor('record.show.edit.acquisition.edit').acquisition_id
    );

    return this.setupModel();
  },

  // breadCrumb: computed('platformId', function () {
  //   return {
  //     title: 'Platform ' + this.platformId,
  //     linkable: true,
  //   };
  // }),

  setupController: function () {
    this._super(...arguments);

    this.controller.set('parentModel', this.modelFor('record.show.edit'));
    // this.controller.set('platformId', this.platformId);
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
