import { find, render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | object/md lineage', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {

    // Set any properties with this.set('myProperty', 'value');
    this.set('lineage', {
      "statement": "statement",
      "scope": {
        "scopeCode": "scopeCode"
      },
      "citation": [{
          "title": "title"
        },
        {
          "title": "title"
        }
      ],
      "source": [{
          "description": "description"
        },
        {
          "description": "description"
        }
      ],
      "sourceProcessStep": [{
          "description": "description"
        },
        {
          "description": "description"
        }
      ]
    });

    await render(hbs`<section>{{object/md-lineage profilePath="foobar" model=lineage}}</section>`);

    assert.equal(find('section').textContent.replace(/[\s\n]+/g, '|').trim(),
      '|Statement|No|Process|Step|found.|Add|Process|Step|Source|2|Add|OK|#|Description|0|More...|Delete|1|More...|Delete|OK|Citation|2|Add|OK|#|Title|0|title|More...|Delete|1|title|More...|Delete|OK|Scope|scopeCode|×|');

    // Template block usage:
    await render(hbs`<section>
      {{#object/md-lineage profilePath="foobar" model=(hash)}}
        template block text
      {{/object/md-lineage}}</section>
    `);

    assert.equal(find('section').textContent.replace(/[\s\n]+/g, '|').trim(),
      '|Statement|No|Process|Step|found.|Add|Process|Step|No|Source|found.|Add|Source|No|Citation|found.|Add|Citation|Scope|Select|type|of|resource.|template|block|text|',
      'block');
  });
});
