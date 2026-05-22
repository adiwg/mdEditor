import { find, render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | control/md definition', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    await render(hbs`{{control/md-definition title="foobar" text="bizbaz"}}`);

    assert.equal(this.element.textContent.replace(/[ \n]+/g, '|').trim(),
      'foobar|bizbaz|');

    await render(hbs`{{control/md-definition title="foobar"}}`);

    assert.equal(this.element.textContent.replace(/[ \n]+/g, '|').trim(),
     'foobar|Not|Defined|', 'no text');

    // Template block usage:
    await render(hbs`
      <Control::MdDefinition @title="foobar">
        template block text
      </Control::MdDefinition>
    `);

    assert.equal(this.element.textContent.replace(/[ \n]+/g, '|').trim(),
     '|foobar|template|block|text|');
  });
});
