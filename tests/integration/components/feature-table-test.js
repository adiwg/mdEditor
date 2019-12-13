import { find, render, click } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import createMapLayer from 'mdeditor/tests/helpers/create-map-layer';

module('Integration | Component | feature table', function (hooks) {
  setupRenderingTest(hooks);

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
      data=data.features
      columnComponents=(hash
        leaflet-table-row-actions=(component "leaflet-table-row-actions"
        showForm=showForm
        zoomTo=zoomTo
        deleteFeature=deleteFeature
      ))
    }}`);

    assert.equal(find('.feature-table')
      .textContent
      .replace(/[\s, \t]/g, '\n')
      .trim()
      .replace(/[ +\n]+/g, '|'),
      'Search:|Columns|Show|All|Hide|All|Restore|Defaults|ID|Name|Description|ID|Name|Description|ID|Name|Description|1|Feature|1|2|Feature|2|Show|1|-|2|of|2|Clear|all|filters|Rows:|10|25|50|500|Page:|1'
    );

    await click(find('td .btn-success'));
    await click(find('td .btn-info'));
    await click(find('td .btn-danger'));

  });
});
