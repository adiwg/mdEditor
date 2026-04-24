import Route from '@ember/routing/route';
import { set, get } from '@ember/object';
import ScrollTo from 'mdeditor/mixins/scroll-to';
import { once } from '@ember/runloop';

export default class IndexRoute extends Route.extend(ScrollTo) {
  model() {
    return this.modelFor('record.show.edit');
  }

  afterModel(m) {
    super.afterModel(...arguments);

    let model = get(m, 'json.metadata.metadataInfo');

    once(this, () => {
      set(model, 'metadataContact', get(model, 'metadataContact') ?? []);
      set(model, 'metadataDate', get(model, 'metadataDate') ?? []);
      set(
        model,
        'metadataMaintenance',
        get(model, 'metadataMaintenance') ?? {}
      );
      set(
        model,
        'metadataOnlineResource',
        get(model, 'metadataOnlineResource') ?? []
      );
      set(
        model,
        'defaultMetadataLocale',
        get(model, 'defaultMetadataLocale') ?? {}
      );
      set(model, 'metadataIdentifier', get(model, 'metadataIdentifier') ?? {});
      set(model, 'parentMetadata', get(model, 'parentMetadata') ?? {});
      set(
        model,
        'alternateMetadataReference',
        get(model, 'alternateMetadataReference') ?? []
      );
      set(
        m,
        'json.metadataRepository',
        get(m, 'json.metadataRepository') ?? []
      );
    });
  }
  setupController(controller, model) {
    super.setupController(controller, model);
    controller.set('model', model);

    this.controllerFor('record.show.edit').setProperties({
      onCancel: () => this,
      cancelScope: this,
    });
  }
}
