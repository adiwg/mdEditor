import { find, render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | object/md locale array', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    this.set('locales', [
      {
        language: 'eng',
        characterSet: 'UTF-8',
        country: 'USA',
      },
      {
        language: 'spa',
        characterSet: 'UTF-32',
        country: 'BDI',
      },
    ]);

    await render(hbs`{{object/md-locale-array value=locales}}`);

    assert.equal(
      find('.panel')
        .textContent.replace(/[\s\n]+/g, '|')
        .trim(),
      '|2|Add|#|Language|Character|Set|Country|0|eng|?|×|UTF-8|?|×|USA|?|×|Delete|1|spa|?|×|UTF-32|?|×|BDI|?|×|Delete|'
    );

    // Template block usage:
    await render(hbs`
      {{#object/md-locale-array}}
        template block text
      {{/object/md-locale-array}}
    `);

    assert.equal(
      find('.panel')
        .textContent.replace(/[\s\n]+/g, '|')
        .trim(),
      '|Add|#|Language|Character|Set|Country|Add|',
      'block'
    );
  });
});
