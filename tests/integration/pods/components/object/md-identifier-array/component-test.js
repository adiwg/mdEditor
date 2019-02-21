import { find, render, click, doubleClick } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | object/md identifier array', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    assert.expect(5);

    // Set any properties with this.set('myProperty', 'value');
    this.set('id', [{
      "identifier": "identifier",
      "authority": {
        "title": "title"
      }
    },{
      "identifier": "identifier1",
      "authority": {
        "title": "title1"
      }
    }]);

    this.set('edit', function(id){
      assert.ok(id, 'called edit');
    });

    await render(hbs`{{object/md-identifier-array model=id editItem=edit}}`);

    assert.equal(find('.md-object-table').textContent.replace(/[\s\n]+/g, '|').trim(), '|Identifier|2|Add|OK|#|Identifier|Namespace|Description|0|identifier|Not|Defined|Not|Defined|More...|Delete|1|identifier1|Not|Defined|Not|Defined|More...|Delete|OK|');

    await click('.btn-info');

    assert.equal(this.id.length, 3, 'add item');

    await doubleClick('.btn-danger');

    assert.equal(this.id.length, 2), 'delete item';

    // Template block usage:
    await render(hbs`<section>
      {{#object/md-identifier-array}}
        template block text
      {{/object/md-identifier-array}}
      </section>
    `);

    assert.equal(find('section').textContent.replace(/[\s\n]+/g, '|').trim(),
      '|No|Identifier|found.|Add|Identifier|template|block|text|',
      'block');
  });
});
