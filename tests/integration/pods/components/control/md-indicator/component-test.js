import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, triggerEvent } from '@ember/test-helpers';
import { assertTooltipContent } from 'ember-tooltips/test-support/dom';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | control/md-indicator', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    assert.expect(2);
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });
    this.set('values', {
      foo: 'This',
      bar: 'warning',
    });

    await render(hbs`{{control/md-indicator
      icon="sticky-note"
      title="Hello"
      note="\${foo} is a \${bar}"
      values=values
      type="danger"}}
      `);

    assert.dom('.md-indicator').isVisible({ count: 1 });

    await triggerEvent('.md-indicator', 'mouseenter');

    assertTooltipContent(assert, {
      contentString: 'Hello\nThis is a warning',
    });
  });
});
