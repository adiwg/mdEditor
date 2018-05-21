import Ember from 'ember';
import ScrollTo from 'mdeditor/mixins/scroll-to';
import {
  once
} from '@ember/runloop';

const {
  Route,
  getWithDefault,
  get,
  set
} = Ember;

export default Route.extend(ScrollTo, {
  afterModel(m) {
    this._super(...arguments);

    let model = get(m, 'json.metadata.metadataInfo');

    once(this, () => {
      set(model, 'metadataContact', getWithDefault(model,
        'metadataContact', []));
      set(model, 'metadataDate', getWithDefault(model, 'metadataDate', []));
      set(model, 'metadataMaintenance', getWithDefault(model,
        'metadataMaintenance', {}));
      set(model, 'metadataOnlineResource', getWithDefault(model,
        'metadataOnlineResource', []));
      set(model, 'defaultMetadataLocale', getWithDefault(model,
        'defaultMetadataLocale', {}));
      set(model, 'metadataIdentifier', getWithDefault(model,
        'metadataIdentifier', {}));
      set(model, 'parentMetadata', getWithDefault(model,
        'parentMetadata', {}));
      set(model, 'alternateMetadataReference', getWithDefault(model,
        'alternateMetadataReference', []));
      set(m, 'json.metadataRepository', getWithDefault(m,
        'json.metadataRepository', []));
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
