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
  getWithDefault,
  inject
} = Ember;

export default Route.extend(ScrollTo, {
  slider: inject.service(),

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
  setupController: function () {
    // Call _super for default behavior
    this._super(...arguments);

    this.controller.set('parentModel', this.modelFor(
      'record.show.edit'));
    this.controller.set('resourceId', get(this.controllerFor(
      'record.show.edit.associated.resource'), 'resourceId'));
  },
  actions: {
    insertResource(selected) {
      let slider = this.get('slider');
      let rec = selected.get('firstObject');
      let info = get(rec, 'json.metadata.metadataInfo') || {};
      let metadata = {
        'title': `Metadata for ${get(rec,'title')}`,
        'responsibleParty': getWithDefault(info, 'metadataContact', []),
        'date': getWithDefault(info, 'metadataDate', []),
        'onlineResource': getWithDefault(info, 'metadataOnlineResource', []),
        'identifier': [getWithDefault(info, 'metadataIdentifier', {})],
      };

      if(rec) {
        let resource = this.currentRouteModel();
        let citation = get(rec, 'json.metadata.resourceInfo.citation') || {};
        let resourceType = get(rec,
          'json.metadata.resourceInfo.resourceType') || [];

        set(resource, 'resourceCitation', EmObject.create(formatCitation(
          citation)));
        set(resource, 'metadataCitation', EmObject.create(formatCitation(
          metadata)));
        set(resource, 'resourceType', resourceType);
      }

      //this.controller.set('slider', false);
      slider.toggleSlider(false);
      selected.clear();
    },
    selectResource() {
      let slider = this.get('slider');

      //this.controller.set('slider', true);
      slider.toggleSlider(true);
    },
    sliderData() {
      return this.store.peekAll('record');
    },
    sliderColumns() {
      return this.get('sliderColumns');
    }
  }
});
