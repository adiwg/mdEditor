import { find, render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | object/md lineage/preview', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });
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

    await render(hbs`<section>{{object/md-lineage/preview item=lineage}}</section>`);

    assert.equal(find('section').textContent.replace(/[\s\n]+/g, '|').trim(),
      '|Lineage|#|Statement|statement|Process|Step|No|process|steps|assigned.|');

    // Template block usage:
    await render(hbs`<section>
      {{#object/md-lineage/preview}}
        template block text
      {{/object/md-lineage/preview}}</section>
    `);

    assert.equal(find('section').textContent.replace(/[\s\n]+/g, '|').trim(),
      '|Lineage|#|Statement|Not|Defined|Process|Step|No|process|steps|assigned.|',
      'template block');
  });
});
