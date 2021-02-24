import { find, render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | control/md record table', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {

    // Set any properties with this.set('myProperty', 'value');
    this.set('data', [{
      title: 'foo',
      type: 'bar'
    }, {
      title: 'biz',
      type: 'baz'
    }]);

    this.set('columns', [{
        propertyName: 'title',
        title: 'Title'
      }, {
        propertyName: 'type',
        title: 'Type'
      }]);

    // Handle any actions with this.on('myAction', function(val) { ... });

    await render(hbs`{{control/md-record-table dataColumns=columns data=data}}`);

    assert.equal(find('.md-record-table').textContent.replace(/[ \n\t\s]+/g, '|').trim(),
      '|Search:|Columns|Show|All|Hide|All|Restore|Defaults|Title|Type|Actions|Title|Type|Actions|Title|Type|foo|bar|Show|biz|baz|Show|Show|1|-|2|of|2|Clear|all|filters|Rows:|10|25|50|500|Page:|1|');

    // Template block usage:
    await render(hbs`
      {{#control/md-record-table dataColumns=columns data=data}}
        template block text
      {{/control/md-record-table}}
    `);

    assert.dom('.md-record-table').hasText('template block text');
  });
});
