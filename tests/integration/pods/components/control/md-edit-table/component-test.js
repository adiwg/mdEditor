import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click, find } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import EmberObject from '@ember/object';

module('Integration | Component | control/md-edit-table', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    this.set('data', [EmberObject.create({
      title: 'foo',
      type: 'bar'
    }), EmberObject.create({
      title: 'biz',
      type: 'baz'
    })]);

    this.set('columns', [{
      propertyName: 'title',
      title: 'Title'
    }, {
      propertyName: 'type',
      title: 'Type'
    }]);

    await render(hbs`{{control/md-edit-table data=data dataColumns=columns rowBodyComponent="object/md-schema"}}`);

    assert.equal(this.element.textContent.replace(/[ \s\n]+/g, '|').trim(),
      '|Search:|Columns|Show|All|Hide|All|Restore|Defaults|Title|Type|Title|Type|foo|bar|Edit|Delete|biz|baz|Edit|Delete|Show|1|-|2|of|2|10|25|50|500|');

    await click('.md-row-buttons .btn-success');

    assert.dom('.md-schema').exists('expanded row');

    assert.equal(find('.md-schema input').value, 'foo', 'render row contents');
  });
});
