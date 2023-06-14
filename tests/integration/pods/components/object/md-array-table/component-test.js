import { find, render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | object/md array table', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    this.set('data', [
      {
        biz: 'biz1',
        baz: 'baz1',
      },
      {
        biz: 'biz2',
        baz: 'baz2',
      },
    ]);

    await render(hbs`
      {{#object/md-array-table
        columns="biz,baz"
        value=data
        title="FooBar"
        data-spy="FooBar" as |f|
      }}
        <td>
          {{f.item.biz}}
        </td>
        <td>
          {{f.item.baz}}
        </td>
      {{/object/md-array-table}}
      `);

    assert.equal(
      find('.panel')
        .textContent.replace(/[ \n]+/g, '|')
        .trim(),
      '|FooBars|2|Add|#|Biz|Baz|0|biz1|baz1|Delete|1|biz2|baz2|Delete|'
    );

    // Template block usage:
    await render(hbs`
      {{#object/md-array-table
        columns="biz,baz"
        value=data
        title="FooBar"
      }}
        template block text
      {{/object/md-array-table}}
    `);

    assert.equal(
      find('.panel')
        .textContent.replace(/[ \n]+/g, '|')
        .trim(),
      '|FooBars|2|Add|#|Biz|Baz|0|template|block|text|Delete|1|template|block|text|Delete|',
      'block'
    );
  });
});
