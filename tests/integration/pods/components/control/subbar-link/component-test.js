import { find, render, click } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | control/subbar link', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    assert.expect(3);

    this.set('handleClick', () => {
      assert.ok(true, 'called action');
    });

    await render(hbs`
      <Control::SubbarLink @text="foo" @click={{this.handleClick}} />
    `);

    assert.equal(find('button').textContent.trim(), 'foo');

    await click('button');

    await render(hbs`
      <Control::SubbarLink @text="foo" @click={{this.handleClick}}>
        <section>template block text</section>
      </Control::SubbarLink>
    `);

    assert.equal(find('section').textContent.trim(), 'template block text');
  });
});
