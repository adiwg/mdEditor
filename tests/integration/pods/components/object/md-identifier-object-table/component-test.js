import { find, render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import createIdentifier from 'mdeditor/tests/helpers/create-identifier';

module(
  'Integration | Component | object/md identifier object table',
  function (hooks) {
    setupRenderingTest(hooks);

    test('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      this.set('id', createIdentifier(2));

      await render(hbs`{{object/md-identifier-object-table model=id}}`);

      assert.equal(
        find('.md-object-table')
          .textContent.replace(/[\s\n]+/g, '|')
          .trim(),
        '|Identifier|2|Add|OK|#|Identifier|Namespace|0|identifier0|namespace0|Edit|Delete|1|identifier1|namespace1|Edit|Delete|'
      );

      // Template block usage:
      await render(hbs`
      {{#object/md-identifier-object-table}}
        template block text
      {{/object/md-identifier-object-table}}
    `);

      assert.equal(
        find('.md-object-table')
          .textContent.replace(/[\s\n]+/g, '|')
          .trim(),
        '|No|Identifier|found.|Add|Identifier|',
        'block'
      );
    });
  }
);
