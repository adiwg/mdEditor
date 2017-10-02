import Ember from 'ember';
import ScrollTo from 'mdeditor/mixins/scroll-to';

const {
  Route,
  get,
  set,
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
      let slider = this.get('slider');
      let rec = selected.get('firstObject');

      if(rec) {
        let resource = this.currentRouteModel();

        set(resource, 'mdRecordId', get(rec, 'recordId'));
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
      return this.store.peekAll('record').filterBy('recordId');
    },
    sliderColumns() {
      return this.get('sliderColumns');
    },
    editLinked(rec) {
      this.transitionTo('record.show.edit', rec.get('id'));
    }
  }
});
