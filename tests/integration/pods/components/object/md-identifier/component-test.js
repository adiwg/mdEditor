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

    await render(hbs `{{object/md-identifier model=id profilePath="foobar"}}`);

    assert.equal(find('.md-identifier').textContent.replace(
        /[\s\n]+/g, '|').trim(),
      'Identifier|Namespace|namespace0|×|Version|Description|Authority|Basic|Information|Title|No|Alternate|Title|found.|Add|Alternate|Title|No|Date|found.|Add|Date|No|Responsible|Party|found.|Add|Responsible|Party|No|Online|Resource|found.|Add|Online|Resource|No|Identifier|found.|Add|Identifier|No|Identifier|found.|Add|Identifier|No|Identifier|found.|Add|Identifier|'
    );

    assert.dom('input').hasValue('identifier0', 'assign value');
    // Template block usage:
    await render(hbs `
      {{#object/md-identifier profilePath="foobar" model=(hash)}}
        template block text
      {{/object/md-identifier}}
    `);

    assert.equal(find('.md-identifier').textContent.replace(
        /[\s\n]+/g, '|').trim(),
      "Identifier|Namespace|Select|or|type|a|namespace|for|the|identifier.|Version|Description|Authority|Basic|Information|Title|No|Alternate|Title|found.|Add|Alternate|Title|No|Date|found.|Add|Date|No|Responsible|Party|found.|Add|Responsible|Party|No|Online|Resource|found.|Add|Online|Resource|No|Identifier|found.|Add|Identifier|No|Identifier|found.|Add|Identifier|No|Identifier|found.|Add|Identifier|template|block|text|",
      'block');
  });
});
