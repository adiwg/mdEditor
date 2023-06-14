import { find, render, findAll } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { createAttribute } from 'mdeditor/tests/helpers/create-dictionary';

module(
  'Integration | Component | object/md attribute/preview',
  function (hooks) {
    setupRenderingTest(hooks);

    test('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      this.set('model', createAttribute(1)[0]);

      await render(
        hbs`<div class="testme">{{object/md-attribute/preview model=model profilePath="foobar"}}</div>`
      );

      assert.equal(
        find('.testme')
          .textContent.replace(/[ \n]+/g, '|')
          .trim(),
        '|dataType0|×|'
      );
      assert.equal(findAll('.testme input').length, 3, 'render inputs');
      assert.ok(find('.testme .md-select'), 'render select');
    });
  }
);
