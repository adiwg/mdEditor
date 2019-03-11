import LayerGroup from 'ember-leaflet-layer-control/components/layer-group';

export default LayerGroup.extend({
  createLayer() {
    let layer = this.L.featureGroup();

    this.setFeatureGroup(layer);
    return layer;
  },
  setFeatureGroup() {
    return this;
  }
});
