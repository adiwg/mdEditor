import { render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

module(
  'Integration | Component | object/md repository array',
  function (hooks) {
    setupRenderingTest(hooks);

    test('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      this.repo = [
        {
          citation: {
            title: 'Arctic LCC data.gov',
          },
          repository: 'data.gov',
        },
        {
          citation: {
            title: 'Something',
          },
          repository: 'data.gov',
        },
      ];

      await render(
        hbs`{{object/md-repository-array value=repo profilePath="foo"}}`
      );

      assert.equal(
        this.element.textContent.replace(/[\s\n]+/g, '|').trim(),
        '|Metadata|Repositories|2|Add|#|Repository|Collection|Title|0|data.gov|?|×|Delete|1|data.gov|?|×|Delete|'
      );

      assert.dom('.md-input input').hasValue('Arctic LCC data.gov');
      assert.dom('.select-value').hasText('data.gov');
      // Template block usage:
      await render(hbs`
      {{#object/md-repository-array profilePath="foo"}}
        template block text
      {{/object/md-repository-array}}
    `);

      assert.equal(
        this.element.textContent.replace(/[\s\n]+/g, '|').trim(),
        '|Metadata|Repositories|Add|#|Repository|Collection|Title|Add|Metadata|Repository|',
        'block'
      );
    });
  }
);
