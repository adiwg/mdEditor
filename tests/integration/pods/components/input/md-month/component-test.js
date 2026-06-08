import { find, render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | input/md month', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    this.set('date', '10');

    await render(hbs`{{input/md-month date=this.date}}`);

    assert.equal(find('input').value, 'October');

    // Template block usage:
    await render(hbs`
      <Input::MdMonth @class="testme" @date="10">
        template block text
      </Input::MdMonth>
    `);

    assert.equal(find('.testme').textContent.trim(), '', 'no block');
  });
});
