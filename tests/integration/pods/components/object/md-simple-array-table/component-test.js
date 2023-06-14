import { doubleClick, click, findAll, render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

module(
  'Integration | Component | object/md simple array table',
  function (hooks) {
    setupRenderingTest(hooks);

    test('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });

      this.model = ['biz', 'baz'];
      // this.on('addItem', function(val) {
      //   this.model.pushObject(val);
      // });
      // this.on('addItem', function(val) {
      //   this.model.pushObject(val);
      // });

      await render(hbs`{{object/md-simple-array-table}}`);

      assert.equal(
        this.element.textContent.replace(/[\s\n]+/g, '|').trim(),
        '|No|Item|found.|Add|Item|'
      );

      // Template block usage:
      await render(hbs`
      {{#object/md-simple-array-table
        title="FooBar"
        required=false
        plain=true
        value=model as |foo|
      }}
        <td>
            {{foo.item.value}}
        </td>
      {{/object/md-simple-array-table}}
    `);

      assert.equal(
        this.element.textContent.replace(/[\s\n]+/g, '|').trim(),
        '|FooBars|2|Add|FooBar|0|biz|Delete|1|baz|Delete|'
      );

      await click('.btn-info');

      assert.equal(findAll('.table tr').length, 3, 'addItem');

      await doubleClick('.btn-danger');

      assert.equal(this.model.length, 1, 'deleteItem');
    });
  }
);
