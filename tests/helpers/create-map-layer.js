import Ember from 'ember';

export default function createMapLayer(total) {

  const layers = {
    type: 'FeatureCollection',
    features: []
  };

  for(let i = 1; i < (total + 1); i++) {

    const layer = Ember.Object.create({
      type: 'Feature',
      id: i,
      geometry: {
        type: 'Point',
        coordinates: [-104.99404, 39.75621 + i]
      },
      properties: {
        name: `Feature ` + i
      }
    });

    layers.features.push(layer);

  }

  return layers;

}
