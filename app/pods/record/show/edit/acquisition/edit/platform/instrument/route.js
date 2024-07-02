import Route from '@ember/routing/route';
import { isEmpty } from '@ember/utils';
import { isArray } from '@ember/array';
import ScrollTo from 'mdeditor/mixins/scroll-to';

export default Route.extend(ScrollTo, {
  model(params) {
    this.set('instrumentId', params.instrument_id);
    this.set(
      'platformId',
      this.paramsFor('record.show.edit.acquisition.edit.platform').platform_id
    );
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
    this.controller.set('platformId', this.platformId);
    this.controllerFor('record.show.edit').setProperties({
      onCancel: this.setupModel,
      cancelScope: this,
    });
  },

  setupModel() {
    let instrumentId = this.instrumentId;
    let acquisitionId = this.acquisitionId;
    let platformId = this.platformId;
    let model = this.modelFor('record.show.edit');
    let instruments = model.get(
      `json.metadata.acquisition.${acquisitionId}.platform.${platformId}.instrument`
    );
    let instrument =
      instrumentId && isArray(instruments)
        ? instruments.get(instrumentId)
        : undefined;

    //make sure the identifier exists
    if (isEmpty(instrument)) {
      this.flashMessages.warning('No instrument found! Re-directing...');
      this.replaceWith('record.show.edit.acquisition.edit.platform');

      return;
    }

    return instrument;
  },
  actions: {
    parentModel() {
      return this.modelFor('record.show.edit');
    },
    goBack() {
      this.transitionTo('record.show.edit.acquisition.edit.platform');
    },
  },
});
