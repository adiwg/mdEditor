import Route from '@ember/routing/route';
import { set, get } from '@ember/object';
import ScrollTo from 'mdeditor/mixins/scroll-to';
import { once } from '@ember/runloop';

export default Route.extend(ScrollTo, {
  afterModel(m) {
    this._super(...arguments);

    let model = get(m, 'json.metadata.metadataInfo');

    once(this, () => {
      set(
        model,
        'metadataContact',
        get(model, 'metadataContact') !== undefined
          ? get(model, 'metadataContact')
          : [],
      );
      set(
        model,
        'metadataDate',
        get(model, 'metadataDate') !== undefined
          ? get(model, 'metadataDate')
          : [],
      );
      set(
        model,
        'metadataMaintenance',
        get(model, 'metadataMaintenance') !== undefined
          ? get(model, 'metadataMaintenance')
          : {},
      );
      set(
        model,
        'metadataOnlineResource',
        get(model, 'metadataOnlineResource') !== undefined
          ? get(model, 'metadataOnlineResource')
          : [],
      );
      set(
        model,
        'defaultMetadataLocale',
        get(model, 'defaultMetadataLocale') !== undefined
          ? get(model, 'defaultMetadataLocale')
          : {},
      );
      set(
        model,
        'metadataIdentifier',
        get(model, 'metadataIdentifier') !== undefined
          ? get(model, 'metadataIdentifier')
          : {},
      );
      set(
        model,
        'parentMetadata',
        get(model, 'parentMetadata') !== undefined
          ? get(model, 'parentMetadata')
          : {},
      );
      set(
        model,
        'alternateMetadataReference',
        get(model, 'alternateMetadataReference') !== undefined
          ? get(model, 'alternateMetadataReference')
          : [],
      );
      set(
        m,
        'json.metadataRepository',
        get(m, 'json.metadataRepository') !== undefined
          ? get(m, 'json.metadataRepository')
          : [],
      );
    });
  },

  setupController(controller, model) {
    this._super(controller, model);

    this.controllerFor('record.show.edit').setProperties({
      onCancel: () => this,
      cancelScope: this,
    });
  },

  actions: {
    editIdentifier() {
      this.transitionTo('record.show.edit.metadata.identifier').then(
        function () {
          this.setScrollTo('metadata-identifier');
        }.bind(this),
      );
    },
    editAlternate(index) {
      this.transitionTo(
        'record.show.edit.metadata.alternate.index',
        index,
      ).then(
        function () {
          this.setScrollTo('alternate-metadata');
        }.bind(this),
      );
    },
    editParent() {
      this.transitionTo('record.show.edit.metadata.parent').then(
        function () {
          this.setScrollTo('parent-metadata');
        }.bind(this),
      );
    },
  },
});
