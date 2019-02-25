import { A } from '@ember/array';
import Route from '@ember/routing/route';
import { get, getWithDefault, set, computed } from '@ember/object';
import $ from 'jquery';
import { on } from '@ember/object/evented';

export default Route.extend({
  model() {
    let model = this.modelFor('record.show.edit');
    let json = model.get('json');
    let info = json.metadata.resourceInfo;

    set(info, 'extent', getWithDefault(info, 'extent', A()));

    get(info, 'extent').forEach((itm) => {
      set(itm, 'geographicExtent', getWithDefault(itm, 'geographicExtent', A()));
      set(itm, 'geographicExtent.0', getWithDefault(itm, 'geographicExtent.0', {}));
      set(itm, 'geographicExtent.0.boundingBox', getWithDefault(itm, 'geographicExtent.0.boundingBox', {}));
    });
    return model;
  },

  subbar: 'control/subbar-extent',

  clearSubbar: on('deactivate', function() {
    this.controllerFor('record.show.edit')
      .set('subbar', null);
  }),

  setupController: function() {
    // Call _super for default behavior
    this._super(...arguments);

    this.controllerFor('record.show.edit')
      .set('subbar', this.subbar);
  },

  actions: {
    didTransition() {
      this.controllerFor('record.show.edit')
        .set('subbar', this.subbar);

    },
    addExtent() {
      let extents = this.currentRouteModel()
        .get('json.metadata.resourceInfo.extent');

      extents.pushObject({
        description: '',
        geographicExtent: [{
          boundingBox: {},
          geographicElement: A()
        }]
      });

      $("html, body").animate({
        scrollTop: $(document).height()
      }, "slow");

    },
    deleteExtent(id) {
      let extents = this.currentRouteModel()
        .get('json.metadata.resourceInfo.extent');

      extents.removeAt(id);
    },
    editExtent(id) {
      this.transitionTo('record.show.edit.extent.spatial', id);
    },
    toList() {
      let me = this;

      me.transitionTo(me.get('routeName'))
        .then(function() {
          me.setupController();
        });
    }
  }
});
