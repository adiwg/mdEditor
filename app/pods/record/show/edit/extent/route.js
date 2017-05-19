import Ember from 'ember';
/* global L */

const {
  A,
  Route,
  computed
} = Ember;

export default Route.extend({
  model() {
    let model = this.modelFor('record.show.edit');
    let json = model.get('json');
    let info = json.metadata.resourceInfo;

    if(!info.hasOwnProperty('extent')) {
      info.extent = A();
    }

    // return Ember.Object.create({
    //   extents: info.extent,
    //   featureGroup: null
    // });
    return model;
  },

  subbar: 'control/subbar-extent',

  extents: computed('model.json.metadata.resourceInfo.extent.[]', function () {
    return this.currentRouteModel()
      .get('json.metadata.resourceInfo.extent');
  }),

  clearSubbar: function () {
    this.controllerFor('record.show.edit')
      .set('subbar', null);
  }.on('deactivate'),

  setupController: function () {
    // Call _super for default behavior
    this._super(...arguments);

    this.controllerFor('record.show.edit')
      .set('subbar', this.get('subbar'));
  },

  actions: {
    didTransition() {
      this.controllerFor('record.show.edit')
        .set('subbar', this.get('subbar'));

    },
    addExtent() {
      let extents = this.currentRouteModel()
        .get('json.metadata.resourceInfo.extent');

      extents.pushObject({
        description: '',
        geographicElement: A()
      });
    },
    deleteExtent(id) {
      let extents = this.get('extents');

      extents.removeAt(id);
    },
    editExtent(id) {
      this.transitionTo('record.show.edit.extent.spatial', id);
    },
    setupMap(features, m) {
      let map = m.target;
      let bounds = L.geoJson(features)
        .getBounds();

      map.fitBounds(bounds);
    },
    toList() {
      let me = this;

      me.transitionTo(me.get('routeName'))
        .then(function () {
          me.setupController();
        });
    }
  }
});
