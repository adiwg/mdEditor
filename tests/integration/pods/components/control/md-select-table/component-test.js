import { find, render, click } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | control/md select table', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    assert.expect(3);

    // Set any properties with this.set('myProperty', 'value');
    this.set('data', [
      {
        title: 'foo',
        type: 'bar',
      },
      {
        title: 'biz',
        type: 'baz',
      },
    ]);

    this.set('columns', [
      {
        propertyName: 'title',
        title: 'Title',
      },
      {
        propertyName: 'type',
        title: 'Type',
      },
    ]);

    this.set('select', function (selected) {
      assert.equal(selected[0].title, 'foo', 'calls action');
    });

    await render(
      hbs`{{control/md-select-table columns=columns data=data select=select}}`
    );

    assert.equal(
      find('.md-select-table')
        .textContent.replace(/[ \n\t\s]+/g, '|')
        .trim(),
      '|Search:|Columns|Show|All|Hide|All|Restore|Defaults|Title|Type|Title|Type|Title|Type|foo|bar|biz|baz|Show|1|-|2|of|2|Clear|all|filters|Rows:|10|25|50|500|Page:|1|'
    );

    click('.md-select-table tbody tr');

    // Template block usage:
    await render(hbs`
      {{#control/md-select-table}}
        template block text
      {{/control/md-select-table}}
    `);

    assert.equal(
      find('.md-select-table')
        .textContent.replace(/[ \n\t\s]+/g, '|')
        .trim(),
      '|template|block|text|',
      'block ok'
    );
  });
});
