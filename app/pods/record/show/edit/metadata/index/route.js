import Route from '@ember/routing/route';
import { set } from '@ember/object';
import ScrollTo from 'mdeditor/mixins/scroll-to';
import { once } from '@ember/runloop';

export default class IndexRoute extends Route.extend(ScrollTo) {
  model() {
    return this.modelFor('record.show.edit');
  }

  afterModel(m) {
    super.afterModel(...arguments);

    let model = m.json.metadata.metadataInfo;

    once(this, () => {
      set(model, 'metadataContact', model.metadataContact ?? []);
      set(model, 'metadataDate', model.metadataDate ?? []);
      set(
        model,
        'metadataMaintenance',
        model.metadataMaintenance ?? {}
      );
      set(
        model,
        'metadataOnlineResource',
        model.metadataOnlineResource ?? []
      );
      set(
        model,
        'defaultMetadataLocale',
        model.defaultMetadataLocale ?? {}
      );
      set(model, 'metadataIdentifier', model.metadataIdentifier ?? {});
      set(model, 'parentMetadata', model.parentMetadata ?? {});
      set(
        model,
        'alternateMetadataReference',
        model.alternateMetadataReference ?? []
      );
      set(
        m,
        'json.metadataRepository',
        m.json.metadataRepository ?? []
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
