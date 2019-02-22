import { find, render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import EmberObject from '@ember/object';

module('Integration | Component | object/md locale', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    this.set('settings', EmberObject.create({
      data: EmberObject.create({
        language: "eng",
        characterSet: "UTF-8",
        country: "USA"
      })
    }));

    await render(hbs`<section>{{object/md-locale settings=settings model=(hash)}}</section>`);

    assert.equal(find('section').textContent.replace(/[\s\n]+/g, '|').trim(),
      '|Language|eng|?|English|×|Character|Set|UTF-8|?|[RFC3629]|×|Country|USA|?|United|States|of|America|×|');

    // Template block usage:
    await render(hbs`<section>
      {{#object/md-locale settings=settings model=(hash)}}
        template block text
      {{/object/md-locale}}</section>
    `);

    assert.equal(find('section').textContent.replace(/[\s\n]+/g, '|').trim(),
      '|Language|eng|?|English|×|Character|Set|UTF-8|?|[RFC3629]|×|Country|USA|?|United|States|of|America|×|template|block|text|',
      'template block');
  });
});
