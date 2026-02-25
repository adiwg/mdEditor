import { render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | md models table', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
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

    await render(hbs`{{md-models-table data=this.data columns=this.columns}}`);

    let text = this.element.textContent;
    assert.ok(text.includes('foo'), 'renders first record title');
    assert.ok(text.includes('bar'), 'renders first record type');
    assert.ok(text.includes('biz'), 'renders second record title');
    assert.ok(text.includes('baz'), 'renders second record type');

    // Template block usage:
    await render(hbs`
      {{#md-models-table}}
        template block text
      {{/md-models-table}}
    `);

    assert.ok(this.element.textContent.includes('template block text'));
  });
});
