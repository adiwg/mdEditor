import { find, render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | feature form', function(hooks) {
  setupRenderingTest(hooks);

  test('defaults a missing name without crashing (plain object, no properties yet)', async function (assert) {
    // Plain object, matching how an uploaded/imported feature (no name
    // assigned yet, unlike a freshly-drawn one - see leaflet-draw.js) really
    // reaches this component via leaflet-table.js's `showForm`.
    this.set('model', { id: 'foo' });

    await render(hbs`{{feature-form model=this.model}}`);

    // class='required' is a hash arg to the curly-invoked input/md-input
    // component, so it lands on md-input's own root element (classNames),
    // not on the inner <input> (which is styled via inputClass instead).
    assert.strictEqual(find('.required input').value, 'Feature');
  });

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

    await render(hbs`{{feature-form model=this.model}}`);

    assert.equal(find('.ember-view').textContent
      .replace(/[ \n]+/g, '|')
      .trim(),
      '|Feature|ID|Name|Description|Description|Other|Properties|read-only|Name|Value|None|found.|'
    );

    // Template block usage:
    await render(hbs`
      {{#feature-form model=this.model}}
        template block text
      {{/feature-form}}
    `);

    assert.equal(find('.ember-view').textContent
      .replace(/[ \n]+/g, '|')
      .trim(),
      '|Feature|ID|Name|Description|Description|Other|Properties|read-only|Name|Value|None|found.|template|block|text|'
    );
  });
});
