import FeatureGroupComponent from 'mdeditor/components/feature-group';

export default class EmberLeafletTableFeatureGroup extends FeatureGroupComponent {
  createLayer() {
    let layer = this.L.featureGroup();
    this.setFeatureGroup(layer);
    return layer;
  }

  setFeatureGroup(layer) {
    // Custom functionality for the leaflet table addon
    this.featureGroup = layer;
    return this;
  }
}
