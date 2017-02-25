import Ember from 'ember';
/* global L */

export default Ember.Route.extend({
  model() {
    let json = this.modelFor('record.show.edit').get('json');
    let info = json.metadata.resourceInfo;

    if (!info.hasOwnProperty('extent')) {
      info.extent = Ember.A();
    }

    return Ember.Object.create({
      extents: info.extent,
      featureGroup: null
    });
  },

  subbar: 'control/subbar-spatial',

  clearSubbar: function() {
    this.controllerFor('record.show.edit')
      .set('subbar', null);
  }.on('deactivate'),

  setupController: function() {
    // Call _super for default behavior
    this._super(...arguments);

    this.controllerFor('record.show.edit')
      .set('subbar', this.get('subbar'));
  },

  actions: {
    addExtent() {
      let extents = this.currentModel.get('extents');

      extents.pushObject({
        description: '',
        geographicElement: Ember.A()
      });
    },
    deleteExtent(id) {
      let extents = this.currentModel.get('extents');

      extents.removeAt(id);
    },
    editExtent(id) {
      this.transitionTo('record.show.edit.spatial.extent', id);
    },
    setupMap(features, m) {
      let map = m.target;
      let bounds = L.geoJson(features).getBounds();

      map.fitBounds(bounds);
    }
  }
});
