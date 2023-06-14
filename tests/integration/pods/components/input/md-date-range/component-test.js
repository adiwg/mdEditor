import { find, findAll, render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | input/md date range', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    this.set('start', new Date('2016-01-01'));
    this.set('end', new Date('2017-01-01'));
    // Handle any actions with this.on('myAction', function(val) { ... });

    await render(
      hbs`{{input/md-date-range class="testme" startDateTime=start endDateTime=end profilePath="foobar"}}`
    );

    assert.equal(
      find('.testme')
        .textContent.replace(/[ \n]+/g, '|')
        .trim(),
      'Dates|Start|Date|End|Date|Pick|Fiscal|Year|Pick|a|Fiscal|Year|'
    );

    assert.equal(
      new Date(findAll('.date input')[0].value).toISOString(),
      this.start.toISOString(),
      'set start'
    );
    assert.equal(
      new Date(findAll('.date input')[1].value).toISOString(),
      this.end.toISOString(),
      'set end'
    );
    // Template block usage:
    await render(hbs`
      {{#input/md-date-range class="testme" startDateTime=start endDateTime=end profilePath="foobar"}}
        template block text
      {{/input/md-date-range}}
    `);

    assert.equal(
      find('.testme')
        .textContent.replace(/[ \n]+/g, '|')
        .trim(),
      'Dates|Start|Date|End|Date|Pick|Fiscal|Year|Pick|a|Fiscal|Year|template|block|text|',
      'block'
    );
  });
});
