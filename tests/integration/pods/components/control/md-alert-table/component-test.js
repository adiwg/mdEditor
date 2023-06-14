import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, triggerEvent } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { assertTooltipContent } from 'ember-tooltips/test-support/dom';

module('Integration | Component | control/md-alert-table', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`{{control/md-alert-table
      title="Foos"
      required=true
      tipMessage="Biz is baz."
    }}`);

    assert.equal(
      this.element.textContent.replace(/[\s\n]+/g, '|').trim(),
      'No|Foos|found.|Add|Foo|'
    );

    await triggerEvent('.md-danger.ember-tooltip-target', 'mouseenter');

    assertTooltipContent(assert, { contentString: 'Biz is baz.' });

    assert.dom('.md-alert-table.alert-danger').exists();
    // Template block usage:
    await render(hbs`
      {{#control/md-alert-table title="Bars"}}
        template block text
      {{/control/md-alert-table}}
    `);

    assert.equal(
      this.element.textContent.replace(/[\s\n]+/g, '|').trim(),
      '|No|Bars|found.|Add|Bar|template|block|text|'
    );
  });
});
