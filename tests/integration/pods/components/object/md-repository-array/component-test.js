import { render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | object/md repository array', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });
    this.repo = [{
      "citation": {
        "title": "Arctic LCC data.gov"
      },
      "repository": "data.gov"
    }, {
      "citation": {
        "title": "Something"
      },
      "repository": "data.gov"
    }];

    await render(hbs`{{object/md-repository-array value=repo}}`);

    assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(),
      '|Metadata|Repositories|2|Add|#|Repository|Collection|Title|0|data.gov|?|U.S.|Government|repository|of|open|data|×|Delete|1|data.gov|?|U.S.|Government|repository|of|open|data|×|Delete|');

    // Template block usage:
    await render(hbs`
      {{#object/md-repository-array}}
        template block text
      {{/object/md-repository-array}}
    `);

    assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(),
      '|Metadata|Repositories|Add|#|Repository|Collection|Title|Add|Metadata|Repository|',
      'block');
  });
});
