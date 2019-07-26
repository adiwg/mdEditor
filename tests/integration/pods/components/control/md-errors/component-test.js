import { find, findAll, render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | control/md errors', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    assert.expect(3);
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });
    this.set('errors', [{
      title: 'Test',
      errors: [{
        dataPath: '/foo/biz',
        message: 'message1'
      }, {
        message: 'message2'
      }]
    }, { title: 'Test2', errors: [] }]);

    await render(hbs `{{control/md-errors errors=errors}}`);

    assert.equal(find('.md-error-list').textContent.replace(/[ \n]+/g,
        '|').trim(),
      '|Test|0|message1|/foo/biz|1|message2|Test2|');

    assert.ok(findAll('.md-error-list .label')[1].classList.contains(
        'label-danger'),
      'class applied');

    // Template block usage:
    await render(hbs `
      {{#control/md-errors  errors=errors}}
        template block text
      {{/control/md-errors}}
    `);

    assert.equal(find('.md-error-list').textContent.replace(/[ \n]+/g,
        '|').trim(),
      '|Test|0|message1|/foo/biz|1|message2|Test2|template|block|text|',
      'block');

  });
});
