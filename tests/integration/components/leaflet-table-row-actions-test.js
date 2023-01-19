import { findAll, render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | leaflet table row actions', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });
    this.zoomTo = function () {};
    this.showForm = function () {};
    this.deleteFeature = function () {};

    await render(hbs `{{leaflet-table-row-actions
      zoomTo=zoomTo
      showForm=showForm
      deleteFeature=deleteFeature
    }}`);
    assert.equal(findAll('button').length, 3);
  });
});
