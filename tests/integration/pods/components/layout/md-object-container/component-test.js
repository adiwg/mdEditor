import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module(
  'Integration | Component | layout/md-object-container',
  function (hooks) {
    setupRenderingTest(hooks);

    test('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.set('myAction', function(val) { ... });

      await render(hbs`{{layout/md-object-container
      title="Foo"
      isCollapsible=true
      index="1"
    }}`);

      assert.equal(this.element.textContent.trim(), 'Foo #1');
      assert.dom('.md-object-container').hasClass('even');

      await click('.md-object-container-header a');

      assert.dom('.md-object-container .btn-collapse').hasClass('collapsed');

      // Template block usage:
      await render(hbs`
      {{#layout/md-object-container}}
        template block text
      {{/layout/md-object-container}}
    `);

      assert.equal(
        this.element.textContent.trim(),
        'template block text',
        'block renders'
      );
    });
  }
);
