import { A } from '@ember/array';
import Route from '@ember/routing/route';
import { get, getWithDefault, set } from '@ember/object';
import $ from 'jquery';

export default Route.extend({
  model() {
    let model = this.modelFor('record.show.edit');
    let json = model.get('json');
    let info = json.metadata.resourceInfo;

    set(info, 'extent', (info.extent === undefined ? A() : info.extent));

    info.extent.forEach((itm) => {
      set(itm, 'geographicExtent', (itm.geographicExtent === undefined ? A() : itm.geographicExtent));
      set(itm, 'geographicExtent.0', (get(itm, 'geographicExtent.0') === undefined ? {} : get(itm, 'geographicExtent.0')));
      set(itm, 'geographicExtent.0.boundingBox', (get(itm, 'geographicExtent.0.boundingBox') === undefined ? {} : get(itm, 'geographicExtent.0.boundingBox')));
      set(itm, 'geographicExtent.0.identifier', (get(itm, 'geographicExtent.0.identifier') === undefined ? {} : get(itm, 'geographicExtent.0.identifier')));
      set(itm, 'verticalExtent', (itm.verticalExtent === undefined ? A() : itm.verticalExtent));
      set(itm, 'temporalExtent', (itm.temporalExtent === undefined ? A() : itm.temporalExtent));
    });
    return model;
  },

  actions: {
    addExtent() {
      let extents = this.currentRouteModel()
        .get('json.metadata.resourceInfo.extent');

      extents.pushObject({
        description: null,
        geographicExtent: [{
          description: null,
          containsData: true,
          boundingBox: {},
          geographicElement: A(),
          identifier: {}
        }],
        verticalExtent: A(),
        temporalExtent: A()
      });

      $("html, body").animate({
        scrollTop: $(document).height()
      }, "slow");

    },
    deleteExtent(id) {
      let extents = this.currentRouteModel()
        .get('json.metadata.resourceInfo.extent');
      let extent = extents[id];

      extents.removeObject(extent);
    },
    editFeatures(id) {
      this.transitionTo({ queryParams: { scrollTo: 'extent-' + id } });
      this.transitionTo('record.show.edit.extent.spatial', id);
    },
    toList() {
      this.transitionTo(this.routeName);
    }
  }
});
