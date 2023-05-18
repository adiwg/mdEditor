import Route from '@ember/routing/route';
import { set, get, getWithDefault } from '@ember/object';
import ScrollTo from 'mdeditor/mixins/scroll-to';
import {
  once
} from '@ember/runloop';

export default Route.extend(ScrollTo, {
  afterModel(m) {
    this._super(...arguments);

    let model = get(m, 'json.metadata.metadataInfo');

    once(this, () => {
      set(model, 'metadataContact', (model.metadataContact === undefined ? [] : model.metadataContact));
      set(model, 'metadataDate', (model.metadataDate === undefined ? [] : model.metadataDate));
      set(model, 'metadataMaintenance', (model.metadataMaintenance === undefined ? {} : model.metadataMaintenance));
      set(model, 'metadataOnlineResource', (model.metadataOnlineResource === undefined ? [] : model.metadataOnlineResource));
      set(model, 'defaultMetadataLocale', (model.defaultMetadataLocale === undefined ? {} : model.defaultMetadataLocale));
      set(model, 'metadataIdentifier', (model.metadataIdentifier === undefined ? {} : model.metadataIdentifier));
      set(model, 'parentMetadata', (model.parentMetadata === undefined ? {} : model.parentMetadata));
      set(model, 'alternateMetadataReference', (model.alternateMetadataReference === undefined ? [] : model.alternateMetadataReference));
      set(m, 'json.metadataRepository', (get(m, 'json.metadataRepository') === undefined ? [] : get(m, 'json.metadataRepository')));
    });
  },

  setupController(controller, model) {
    this._super(controller, model);

    this.controllerFor('record.show.edit')
      .setProperties({
        onCancel: () => this,
        cancelScope: this
      });
  },

  actions: {
    editIdentifier() {
      this.transitionTo('record.show.edit.metadata.identifier').then(
        function () {
          this.setScrollTo('metadata-identifier');
        }.bind(this));
    },
    editAlternate(index) {
      this.transitionTo('record.show.edit.metadata.alternate.index', index)
        .then(
          function () {
            this.setScrollTo('alternate-metadata');
          }.bind(this));
    },
    editParent() {
      this.transitionTo('record.show.edit.metadata.parent').then(function () {
        this.setScrollTo('parent-metadata');
      }.bind(this));
    }
  }
});
