import Ember from 'ember';
import ScrollTo from 'mdeditor/mixins/scroll-to';

const {
  Route,
  get
} = Ember;

export default Route.extend(ScrollTo, {
  sliderColumns:[{
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
    insertResource(selected){
      console.log(selected);
      let app = this.controllerFor('application');

      app.set('showSlider', false);
    },
    selectResource(){
      let app = this.controllerFor('application');

      this.controller.set('slider', 'md-select-table');
      app.set('showSlider', true);
    },
    sliderData(){
      return this.store.peekAll('record');
    },
    sliderColumns(){
      return this.get('sliderColumns');
    }
  }
});
