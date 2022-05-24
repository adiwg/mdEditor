import { find, render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | feature form', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });
    this.set('model', {
      id: 'foo',
      properties: {
        name: 'bar',
        description: 'foobar'
      }
    });

    await render(hbs `{{feature-form model=model}}`);

    assert.equal(find('.ember-view').textContent
      .replace(/[ \n]+/g, '|')
      .trim(),
      '|Feature|ID|Name|Description|Other|Properties|read-only|Name|Value|None|found.|'
    );

    // Template block usage:
    await render(hbs `
      {{#feature-form model=model}}
        template block text
      {{/feature-form}}
    `);

    assert.equal(find('.ember-view').textContent
      .replace(/[ \n]+/g, '|')
      .trim(),
      '|Feature|ID|Name|Description|Other|Properties|read-only|Name|Value|None|found.|template|block|text|'
    );
  });
});
