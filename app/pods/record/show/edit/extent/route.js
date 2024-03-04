import { A } from '@ember/array';
import Route from '@ember/routing/route';
import { get, getWithDefault, set } from '@ember/object';
import $ from 'jquery';

export default Route.extend({
  model() {
    let model = this.modelFor('record.show.edit');
    let json = model.get('json');
    let info = json.metadata.resourceInfo;

    set(info, 'extent', getWithDefault(info, 'extent', A()));

    get(info, 'extent').forEach((itm) => {
      set(itm, 'geographicExtent', getWithDefault(itm,'geographicExtent', A()));
      set(itm, 'geographicExtent.0', getWithDefault(itm,'geographicExtent.0', {}));
      set(itm, 'geographicExtent.0.boundingBox', getWithDefault(itm,'geographicExtent.0.boundingBox', {}));
      set(itm, 'geographicExtent.0.identifier', getWithDefault(itm,'geographicExtent.0.identifier', {}));

      set(itm, 'temporalExtent', getWithDefault(itm,'temporalExtent', A()));
      set(itm, 'temporalExtent.0', getWithDefault(itm,'temporalExtent.0', {}));
      set(itm, 'temporalExtent.0.startDateTime', getWithDefault(itm,'temporalExtent.0.startDateTime', {}));
      set(itm, 'temporalExtent.0.endDateTime', getWithDefault(itm,'temporalExtent.0.endDateTime', {}));
      set(itm, 'temporalExtent.0.timeInstant', getWithDefault(itm,'temporalExtent.0.timeInstant', {}));
      set(itm, 'temporalExtent.0.timePeriod', getWithDefault(itm,'temporalExtent.0.timePeriod', {}));

      set(itm, 'verticalExtent', getWithDefault(itm,'verticalExtent', A()));
      set(itm, 'verticalExtent.0', getWithDefault(itm,'verticalExtent.0', {}));
      set(itm, 'verticalExtent.0.minValue', getWithDefault(itm,'verticalExtent.0.minValue', {}));
      set(itm, 'verticalExtent.0.maxValue', getWithDefault(itm,'verticalExtent.0.maxValue', {}));
      set(itm, 'verticalExtent.0.crsId', getWithDefault(itm,'verticalExtent.0.crsId', {}));
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
        temporalExtent: [{
          startDateTime: {},
          endDateTime: {},
          timeInstant: {},
          timePeriod: {}
        }],
        verticalExtent: [{
          minValue: {},
          maxValue: {},
          crsId: {}
        }],
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
