import Route from '@ember/routing/route';
import { action } from '@ember/object';
import { set, get } from '@ember/object';
import { inject as service } from '@ember/service';
import ScrollTo from 'mdeditor/mixins/scroll-to';
import { once } from '@ember/runloop';

export default class IndexRoute extends Route.extend(ScrollTo) {
  @service router;

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

    this.controllerFor('record.show.edit').setProperties({
      onCancel: () => this,
      cancelScope: this,
    });
  }

  @action
  editIdentifier() {
    this.router.transitionTo('record.show.edit.metadata.identifier').then(
      function () {
        this.setScrollTo('metadata-identifier');
      }.bind(this)
    );
  }

  @action
  editAlternate(index) {
    this.router
      .transitionTo('record.show.edit.metadata.alternate.index', index)
      .then(
        function () {
          this.setScrollTo('alternate-metadata');
        }.bind(this)
      );
  }

  @action
  editParent() {
    this.router.transitionTo('record.show.edit.metadata.parent').then(
      function () {
        this.setScrollTo('parent-metadata');
      }.bind(this)
    );
  }
}
