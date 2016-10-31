import {
  moduleForComponent,
  test
} from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import createMapLayer from 'mdeditor/tests/helpers/create-map-layer';

moduleForComponent('leaflet-table', 'Integration | Component | leaflet table', {
  integration: true
});

test('it renders', function (assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });
  this.set('layers', createMapLayer(2));

  this.render(hbs `{{leaflet-table layers=layers.features
    resizeEventsEnabled=false resizeDebouncedEventsEnabled=false}}`);

  assert.equal($(this.$()
      .html()
      .replace('&nbsp;', '|'))
    .text()
    .trim()
    .replace(/[ \n]+/g, '|')
    .replace(/Extents.+Leaflet/g, 'Extents|Leaflet'),
    'Drop|Here!|+-|Terrain|Extents|Leaflet|||Map|tiles|by|Stamen|Design,|under|CC|BY|3.0.|Data|by|OpenStreetMap,|under|CC|BY|SA.|Feature|Properties|ID|Name|Description|||1|Feature|1|2|Feature|2|Show|1|-|2|of|2|10|25|50'
  );
});
