import { find, render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

module('helper:word-limit', function (hooks) {
  setupRenderingTest(hooks);

  // Replace this with your real tests.
  test('it renders', async function (assert) {
    this.set(
      'inputValue',
      `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam rutrum, neque
      nec sagittis maximus, lacus lectus placerat libero, finibus varius arcu enim
      eget ante. Duis.`
    );

    await render(
      hbs`<section>{{word-limit inputValue limit=20 wordLength=10}}</section>`
    );

    assert.equal(
      find('section').textContent.trim(),
      `Lorem ipsum dolor sit amet,  consectetu... adipiscing...elit. Etiam rutrum, neque nec sagittis maximus, lacus lectus placerat libero, finibus varius ...`
    );
  });
});
