import { find, render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { createAttribute } from 'mdeditor/tests/helpers/create-dictionary';

module('Integration | Component | object/md attribute', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    this.set('model', createAttribute(1)[0]);

    await render(hbs`{{object/md-attribute model=model profilePath="foobar"}}`);

    assert.equal(
      find('.md-card')
        .textContent.replace(/[ \n]+/g, '|')
        .trim(),
      '|Attribute|Information|Code|Name|Definition|Data|Type|dataType0|×|Allow|Null?|Allow|null|values|Common|Name|Domain|Select|or|enter|the|domain|for|this|attribute.|Aliases|1|Add|Alias|0|Delete|Units|Units|Resolution|Case|Sensitive?|Is|the|attribute|content|case|sensitive?|Field|Width|Missing|Value|Minimum|Value|Maximum|Value|'
    );

    // Template block usage:
    await render(hbs`
      {{#object/md-attribute model=model profilePath="foobar"}}
        template block text
      {{/object/md-attribute}}
    `);

    assert.equal(
      find('.md-card')
        .textContent.replace(/[ \n]+/g, '|')
        .trim(),
      '|Attribute|Information|Code|Name|Definition|Data|Type|dataType0|×|Allow|Null?|Allow|null|values|Common|Name|Domain|Select|or|enter|the|domain|for|this|attribute.|Aliases|1|Add|Alias|0|Delete|Units|Units|Resolution|Case|Sensitive?|Is|the|attribute|content|case|sensitive?|Field|Width|Missing|Value|Minimum|Value|Maximum|Value|',
      'block'
    );
  });
});
