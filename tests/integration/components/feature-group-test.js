import { find, render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import createMapLayer from 'mdeditor/tests/helpers/create-map-layer';


module('Integration | Component | feature group', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });
    this.set('layers', createMapLayer(2));

    // Template block usage:
    await render(hbs`
      {{#leaflet-draw lat=0 lng=0 zoom=2}}
        {{!-- Specify child layer components here --}}
        {{#layer-group name="Terrain" baselayer=true default=true}}
          {{tile-layer url="http://{s}.tile.stamen.com/terrain/{z}/{x}/{y}.png" attribution=mapAttribution}}
        {{/layer-group}}

        {{#feature-group name="Extents" default=true}}
          {{#each layers as |l|}}
            {{geojson-layer geoJSON=l draw=true}}
          {{/each}}
        {{/feature-group}}

        {{layer-control}}
      {{/leaflet-draw}}
    `);

    assert.equal(find('*').textContent.trim(), '+- Terrain Extents3000 km2000 miLeaflet');
  });
});
