import { click, find, findAll, render } from '@ember/test-helpers';
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

    await render(hbs`{{control/md-record-table dataColumns=this.columns data=this.data}}`);

    assert.equal(find('.md-record-table').textContent.replace(/[ \n\t\s]+/g, '|').trim(),
      '|Search:|Columns|Show|All|Hide|All|Restore|Defaults|Title|Type|Actions|Title|Type|Actions|Title|Type|foo|bar|Show|biz|baz|Show|Show|1|-|2|of|2|Clear|all|filters|Rows:|10|25|50|Page:|1|');

    // Template block usage:
    await render(hbs`
      <Control::MdRecordTable @dataColumns={{this.columns}} @data={{this.data}}>
        template block text
      </Control::MdRecordTable>
    `);

    assert.equal(find('.md-record-table').textContent.trim(), 'template block text');
  });

  test('shows Delete Selected button after selecting two rows when allActions is true', async function(assert) {
    this.set('data', [
      { title: 'foo', type: 'bar' },
      { title: 'biz', type: 'baz' },
    ]);
    this.set('columns', [
      { propertyName: 'title', title: 'Title' },
      { propertyName: 'type', title: 'Type' },
    ]);

    await render(
      hbs`{{control/md-record-table dataColumns=this.columns data=this.data allActions=true}}`
    );

    assert.notOk(
      find('thead button.btn-danger'),
      'Delete Selected is hidden when no rows are selected'
    );

    const rowCheckboxes = findAll('tbody tr td:first-child button');
    await click(rowCheckboxes[0]);

    assert.notOk(
      find('thead button.btn-danger'),
      'Delete Selected remains hidden when only one row is selected'
    );

    await click(rowCheckboxes[1]);

    assert.ok(
      find('thead button.btn-danger'),
      'Delete Selected appears after selecting a second row'
    );
    assert.strictEqual(
      find('thead button.btn-danger').textContent.trim(),
      'Delete Selected'
    );
  });
});
