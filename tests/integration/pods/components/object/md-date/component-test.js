import { find, render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | object/md date', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');

    await render(
      hbs`<table><tr>{{object/md-date model=model profilePath="foobar"}}</tr></table>`
    );

    assert.equal(
      find('table')
        .textContent.replace(/[ \n]+/g, '|')
        .trim(),
      '|Choose|date|type|'
    );

    this.set('model', {
      date: '2016-10-12',
      dateType: 'dateType',
      description: 'description',
    });

    assert.equal(
      find('table')
        .textContent.replace(/[ \n]+/g, '|')
        .trim(),
      '|dateType|×|'
    );

    // Template block usage:
    await render(hbs`<table><tr>
      {{#object/md-date profilePath="foobar"}}
        template block text
      {{/object/md-date}}
    </tr></table>`);

    assert.equal(
      find('table')
        .textContent.replace(/[ \n]+/g, '|')
        .trim(),
      '|Choose|date|type|template|block|text|'
    );
  });
});
