import Ember from 'ember';
import ScrollTo from 'mdeditor/mixins/scroll-to';

const {
  Route,
  isNone,
  get
} = Ember;

export default Route.extend(ScrollTo, {
  afterModel(model) {
    this._super(...arguments);

    if(isNone(get(model, 'json.metadata.metadataInfo.parentMetadata'))) {
      Ember.get(this, 'flashMessages')
        .warning('No Parent Citation found! Re-directing to Metadata...');
      this.replaceWith('record.show.edit.metadata', {
        queryParams: {
          scrollTo: 'parent-metadata'
        }
      });
    }

    return model;
  },

  actions: {
    editIdentifier(index) {
      this.transitionTo('record.show.edit.metadata.parent.identifier',
          index)
        .then(function () {
          this.setScrollTo('identifier');
        }.bind(this));
    }
  }
});
