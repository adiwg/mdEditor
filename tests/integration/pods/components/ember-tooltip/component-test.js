import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { assertTooltipContent } from 'ember-tooltips/test-support';

module('Integration | Component | ember-tooltip', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`{{ember-tooltip}}`);

    assert.equal(this.element.textContent.trim(), '');

    // Template block usage:
    await render(hbs`
      {{#ember-tooltip isShown="true"}}
        template block text
      {{/ember-tooltip}}
    `);

    assertTooltipContent(assert, {
      contentString: 'template block text',
    });
  });
});
