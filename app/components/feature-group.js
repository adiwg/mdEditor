import LayerGroupComponent from './layer-group';

export default class FeatureGroupComponent extends LayerGroupComponent {
  createLayer() {
    return this.L.featureGroup();
  }
}
