import { find, render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import createMapLayer from 'mdeditor/tests/helpers/create-map-layer';

module('Integration | Component | leaflet table', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });
    this.set('layers', createMapLayer(2));

    await render(hbs `{{leaflet-table layers=layers.features
      resizeDebouncedEventsEnabled=true}}`);

      assert.equal(find('.feature-table')
        .textContent
        .replace(/[\s\t]/g, '\n')
        .trim()
        .replace(/[ \n]+/g, '|'),
        'ID|Name|Description|1|Feature|1|2|Feature|2|Show|1|-|2|of|2|10|25|50|500'
    );
  });
});
