import Route from '@ember/routing/route';
import { getWithDefault, set } from '@ember/object';
import $ from 'jquery';

export default Route.extend({
  model() {
    let model = this.modelFor('record.show.edit');
    let json = model.get('json');
    let resourceInfo = json.metadata.resourceInfo;

    set(resourceInfo, 'extent', getWithDefault(resourceInfo, 'extent', []));

    return model;
  },

  actions: {
    addExtent() {
      let extents = this.currentRouteModel().get(
        'json.metadata.resourceInfo.extent'
      );

      extents.pushObject({
        description: null,
        geographicExtent: [
          {
            containsData: true,
            identifier: {},
            boundingBox: {},
            geographicElement: [],
            description: null,
          },
        ],
        verticalExtent: [],
        temporalExtent: [],
      });

      $('html, body').animate(
        {
          scrollTop: $(document).height(),
        },
        'slow'
      );
    },
    deleteExtent(id) {
      let extents = this.currentRouteModel().get(
        'json.metadata.resourceInfo.extent'
      );
      let extent = extents[id];

      extents.removeObject(extent);
    },
    editFeatures(id) {
      this.transitionTo({ queryParams: { scrollTo: 'extent-' + id } });
      this.transitionTo('record.show.edit.extent.spatial', id);
    },
    toList() {
      this.transitionTo(this.routeName);
    },
  },
});
