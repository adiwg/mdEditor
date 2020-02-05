import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | control/md-indicator', function(hooks) {
  setupRenderingTest(hooks);

  test('should render the icon', async function(assert) {
    assert.expect(1)

    await render(hbs`{{control/md-indicator
      icon="sticky-note"
      title="Hello"
      note="This is a warning"
      type="danger"}}
      `);

    assert.equal(this.element.textContent.trim(), '');
  });
});
