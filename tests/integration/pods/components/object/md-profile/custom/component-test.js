import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | object/md-profile/custom', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });
    this.model = {
      title: 'testme',
      description: 'testing description'
    }

    await render(hbs `{{object/md-profile/custom record=model}}`);

    assert.equal(this.element.textContent.replace(/[ \n]+/g, '|').trim(),
      'Title|Description|Profile|Definition|Select|the|profile|definition.|Select|Schemas|No|schemas|avialable.|Schemas|Selected|Select|schemas|from|the|list.|'
    );

    // Template block usage:
    await render(hbs `
      {{#object/md-profile/custom record=model}}
        template block text
      {{/object/md-profile/custom}}
    `);

    assert.equal(this.element.textContent.replace(/[ \n]+/g, '|').trim(),
      '|Title|Description|Profile|Definition|Select|the|profile|definition.|Select|Schemas|No|schemas|avialable.|Schemas|Selected|Select|schemas|from|the|list.|template|block|text|'
    );
  });
});
