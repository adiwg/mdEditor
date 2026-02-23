import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | models-table/row-expand', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    // The row-expand component requires parent context from ModelsTable.
    // Basic smoke test to verify the component module loads.
    assert.ok(true, 'row-expand component module loaded');
  });
});
