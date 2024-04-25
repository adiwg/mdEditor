import { find, render, click } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | control/subbar link', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    assert.expect(3);
    // Set any properties with this.set('myProperty', 'value');
    this.set('test', function () {
      assert.ok(true, 'called action');
    });
    // Handle any actions with this.on('myAction', function(val) { ... });

    await render(hbs`{{control/subbar-link  text="foo" click=test}}`);

    assert.equal(find('button').textContent.trim(), 'foo');

    await click('button');

    // Template block usage:
    await render(hbs`
      {{#control/subbar-link text="foo" click=test}}
        <section>template block text</section>
      {{/control/subbar-link}}
    `);

    assert.equal(find('section').textContent.trim(), 'template block text');
  });
});
