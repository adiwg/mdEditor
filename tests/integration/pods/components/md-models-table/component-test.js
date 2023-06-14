import { render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | md models table', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });
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

    await render(hbs`{{md-models-table data=data columns=columns}}`);

    assert.equal(
      this.element.textContent.replace(/[\s\n]+/g, '|').trim(),
      '|Search:|Columns|Show|All|Hide|All|Restore|Defaults|Title|Type|Title|Type|Title|Type|foo|bar|biz|baz|Show|1|-|2|of|2|Clear|all|filters|Rows:|10|25|50|500|Page:|1|'
    );

    // Template block usage:
    await render(hbs`
      {{#md-models-table}}
        template block text
      {{/md-models-table}}
    `);

    assert.equal(
      this.element.textContent.replace(/[\s\n]+/g, '|').trim(),
      '|template|block|text|'
    );
  });
});
