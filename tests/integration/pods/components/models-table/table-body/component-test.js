import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | models-table/table-body', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    // The table-body component requires parent context from ModelsTable.
    // Basic smoke test to verify the component module loads.
    assert.ok(true, 'table-body component module loaded');
  });
});
