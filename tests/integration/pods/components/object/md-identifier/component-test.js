import { find, render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import createIdentifier from 'mdeditor/tests/helpers/create-identifier';

module('Integration | Component | object/md identifier', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    this.set('id', createIdentifier(1)[0]);

    await render(hbs`{{object/md-identifier model=id profilePath="foobar"}}`);

    let text = find('.md-identifier')
      .textContent.replace(/[\s\n]+/g, '|')
      .trim();

    assert.true(text.includes('|Identifier|Namespace|namespace0|'));
    assert.true(text.includes('|Authority|Basic|Information|Title|'));
    assert.true(text.includes('|Online|Resource|'));

    assert.equal(find('input').value, 'identifier0', 'assign value');

    // Template block usage:
    await render(hbs`
      {{#object/md-identifier profilePath="foobar" model=(hash)}}
        template block text
      {{/object/md-identifier}}
    `);

    text = find('.md-identifier')
      .textContent.replace(/[\s\n]+/g, '|')
      .trim();

    assert.true(
      text.includes(
        '|Identifier|Namespace|Select|or|type|a|namespace|for|the|identifier.|'
      ),
      'block'
    );
    assert.true(text.includes('|template|block|text|'), 'block content');

    await render(hbs`{{object/md-identifier profilePath="foobar"}}`);

    text = find('.md-identifier')
      .textContent.replace(/[\s\n]+/g, '|')
      .trim();

    assert.true(
      text.includes(
        '|Identifier|Namespace|Select|or|type|a|namespace|for|the|identifier.|'
      ),
      'renders without model'
    );
  });
});
