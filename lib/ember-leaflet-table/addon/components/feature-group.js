//import Ember from 'ember';
import LayerGroup from 'ember-leaflet-layer-control/components/layer-group';
import ContainerMixin from 'ember-leaflet/mixins/container';

export default LayerGroup.extend(ContainerMixin, {
  createLayer() {
    let layer = this.L.featureGroup();

    this.setFeatureGroup(layer);
    return layer;
  },
  setFeatureGroup() {
    return this;
  }
});
