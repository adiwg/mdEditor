import { find, findAll, render, click } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import createMapLayer from 'mdeditor/tests/helpers/create-map-layer';

module('Integration | Component | feature table', function (hooks) {
  setupRenderingTest(hooks);

  test('defaults a missing name for each row that already has a properties object', async function (assert) {
    // Plain objects, matching how leaflet-table.js's `layers` (parsed GeoJSON
    // features, not Ember Objects) actually reach this component in the app.
    // NB: an item with no `properties` key at all is *not* covered here -
    // upstream leaflet-table.js already assumes `fea.properties` exists by
    // the time a feature reaches this component (it dereferences
    // `fea.properties.id` unconditionally while splitting multi-geometries),
    // so constructing that case here would test a state this component
    // never actually receives in the app.
    this.set('data', [
      { id: 2, properties: {} },
      { id: 3, properties: { name: 'Given Name' } },
    ]);

    this.noop = function () {};

    await render(hbs`{{feature-table
      data=this.data
      columnComponents=(hash
        leaflet-table-row-actions=(component "leaflet-table-row-actions"
          showForm=this.noop
          zoomTo=this.noop
          deleteFeature=this.noop
        )
      )
    }}`);

    const names = findAll('.feature-table tbody tr td:nth-child(2)').map(
      (el) => el.textContent.trim()
    );

    assert.deepEqual(names, ['Feature1', 'Given Name']);
  });

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    this.zoomTo = function () {
      assert.ok(true, 'called zoomTo');
    };
    this.showForm = function () {
      assert.ok(true, 'clicked showForm');
    };
    this.deleteFeature = function () {
      assert.ok(true, 'clicked deleteFeature');
    };
    this.set('data', createMapLayer(2));

    assert.expect(4);

    await render(hbs `{{feature-table
      data=this.data.features
      columnComponents=(hash
        leaflet-table-row-actions=(component "leaflet-table-row-actions"
        showForm=this.showForm
        zoomTo=this.zoomTo
        deleteFeature=this.deleteFeature
      ))
    }}`);

    assert.equal(find('.feature-table')
      .textContent
      .replace(/[\s, \t]/g, '\n')
      .trim()
      .replace(/[ +\n]+/g, '|'),
      'Search:|Columns|Show|All|Hide|All|Restore|Defaults|ID|Name|Description|Actions|ID|Name|Description|Actions|ID|Name|Description|1|Feature|1|2|Feature|2|Show|1|-|2|of|2|Clear|all|filters|Rows:|10|25|50|Page:|1'
    );

    await click(find('td .btn-success'));
    await click(find('td .btn-info'));
    await click(find('td .btn-danger'));

  });
});
