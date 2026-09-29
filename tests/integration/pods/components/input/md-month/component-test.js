import { find, render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | input/md month', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    this.set('date', '10');

    await render(hbs`{{input/md-month date=this.date}}`);

    // Native <input type="month"> reports its value as "YYYY-MM" -- the
    // component's own `format` (MMMM) only controls what's written back
    // to the bound model, not the native input's value attribute.
    const currentYear = new Date().getFullYear();
    assert.equal(find('input').value, `${currentYear}-10`);

    // Template block usage:
    await render(hbs`
      <Input::MdMonth @class="testme" @date="10">
        template block text
      </Input::MdMonth>
    `);

    assert.equal(find('.testme').textContent.trim(), '', 'no block');
  });
});
