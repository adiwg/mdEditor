import { find, render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | object/md funding/preview', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {

    // Set any properties with this.set('myProperty', 'value');
    this.set('funding', {
      "allocation": [{
        "amount": 9.9,
        "currency": "currency"
      }],
      "timePeriod": {
        "endDateTime": "2016-12-31"
      }
    });

    await render(hbs`<section>{{object/md-funding/preview item=funding}}</section>`);

    assert.equal(find('section').textContent.replace(/[\s\n]+/g, '|').trim(),
      '|Start|Date:|Not|defined|End|Date:|12-31-2016|Amount|Currency|Source|Recipient|Match?|9.9|currency|--|--|--|');

    // Template block usage:
    await render(hbs`<section>
      {{#object/md-funding/preview item=(hash)}}
        template block text
      {{/object/md-funding/preview}}</section>
    `);

    assert.equal(find('section').textContent.replace(/[\s\n]+/g, '|').trim(),
      '|Start|Date:|Not|defined|End|Date:|Not|defined|Amount|Currency|Source|Recipient|Match?|No|allocations|found.|',
      'block');
  });
});
