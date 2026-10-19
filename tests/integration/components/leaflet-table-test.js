import { find, render, settled } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import createMapLayer from 'mdeditor/tests/helpers/create-map-layer';

module('Integration | Component | leaflet table', function(hooks) {
  setupRenderingTest(hooks);

  // flashMessages was never explicitly injected on this component (relying
  // on ember-cli-flash's implicit-injection, which has been a no-op since
  // Ember 4.0 - see app/app.js/config/environment.js's flashMessageDefaults).
  // These tests stub it directly on the instance since real DI can't reach
  // it without the fix below.
  test('readData flashes success with the imported feature count for valid GeoJSON', async function (assert) {
    let flashed = null;
    const component = this.owner.factoryFor('component:leaflet-table').create({
      flashMessages: {
        success: (msg) => { flashed = msg; },
        danger: () => {},
      },
    });

    const geojson = {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          geometry: { type: 'Point', coordinates: [0, 0] },
          properties: {},
        },
      ],
    };
    const file = {
      name: 'test.geojson',
      data: new TextEncoder().encode(JSON.stringify(geojson)).buffer,
    };

    component.readData(file);
    await settled();

    assert.strictEqual(flashed, '1 features imported!');
    component.destroy();
  });

  test('readData flashes a danger message when the file fails to parse', async function (assert) {
    let flashed = null;
    const component = this.owner.factoryFor('component:leaflet-table').create({
      flashMessages: {
        success: () => {},
        danger: (msg) => { flashed = msg; },
      },
    });

    component.readData({
      name: 'bad.json',
      data: new TextEncoder().encode('not valid json').buffer,
    });
    await settled();

    assert.strictEqual(
      flashed,
      'Failed to parse file: bad.json. Is it valid JSON?'
    );
    component.destroy();
  });

  test('updateProgressFlash starts a flash message once progress begins', async function (assert) {
    let enqueued = null;
    const component = this.owner.factoryFor('component:leaflet-table').create({
      flashMessages: {
        _newFlashMessage: (options) => ({ ...options, set() {} }),
        _enqueue: (fm) => { enqueued = fm; },
      },
    });

    component.set('progress', 42);
    await settled();

    assert.ok(enqueued, 'a flash message was enqueued');
    assert.strictEqual(enqueued.message, 'Import Started.');
    component.destroy();
  });

  test('flashMessages is injected on the component (not relying on implicit injection)', function (assert) {
    const component = this.owner.factoryFor('component:leaflet-table').create();

    assert.ok(
      component.flashMessages,
      'flashMessages should be available without manual stubbing'
    );
    component.destroy();
  });

  test('it renders', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });
    this.set('layers', createMapLayer(2));

    await render(hbs `{{leaflet-table layers=this.layers.features
      resizeDebouncedEventsEnabled=true}}`);

      assert.equal(find('.feature-table')
        .textContent
        .replace(/[\s\t]/g, '\n')
        .trim()
        .replace(/[ \n]+/g, '|'),
        'ID|Name|Description|Actions|ID|Name|Description|1|Feature|1|2|Feature|2|Show|1|-|2|of|2|Clear|all|filters|Rows:|10|25|50|Page:|1'
    );
  });
});
