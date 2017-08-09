import Ember from 'ember';
import ScrollTo from 'mdeditor/mixins/scroll-to';
import {
  formatCitation
} from 'mdeditor/pods/components/object/md-citation/component';

const {
  Route,
  get,
  set,
  Object: EmObject,
  getWithDefault
} = Ember;

export default Route.extend(ScrollTo, {
  sliderColumns: [{
    propertyName: 'recordId',
    title: 'ID'
  }, {
    propertyName: 'title',
    title: 'Title'
  }, {
    propertyName: 'defaultType',
    title: 'Type'
  }],
  setupController: function() {
    // Call _super for default behavior
    this._super(...arguments);

    this.controller.set('parentModel', this.modelFor(
      'record.show.edit'));
    this.controller.set('resourceId', get(this.controllerFor(
      'record.show.edit.associated.resource'), 'resourceId'));
  },
  actions: {
    insertResource(selected) {
      console.log(selected);
      let app = this.controllerFor('application');
      let rec = selected[0];
      let info = get(rec, 'json.metadata.metadataInfo') || {};
      let metadata = {
        'title': `Metadata for ${get(rec,'title')}`,
        'responsibleParty': getWithDefault(info, 'metadataContact', []),
        'date': getWithDefault(info, 'metadataDate', []),
        'onlineResource': getWithDefault(info, 'metadataOnlineResource', []),
        'identifier': [getWithDefault(info, 'metadataIdentifier', {})],
      };

      if(rec) {
        let resource = get(this, 'currentModel');
        let citation = get(rec, 'json.metadata.resourceInfo.citation') || {};

        set(resource, 'resourceCitation', EmObject.create(formatCitation(
          citation)));
        set(resource, 'metadataCitation', EmObject.create(formatCitation(
          metadata)));
      }

      app.set('showSlider', false);
    },
    selectResource() {
      let app = this.controllerFor('application');

      this.controller.set('slider', 'md-select-table');
      app.set('showSlider', true);
    },
    sliderData() {
      return this.store.peekAll('record');
    },
    sliderColumns() {
      return this.get('sliderColumns');
    }
  }
});
