import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import EmberObject from '@ember/object';

module('Integration | Component | models-table/cell-content-display', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    this.set('column', {
      propertyName: 'title'
    });

    this.set('data', EmberObject.create({
      title: 'foo biz baz',
      uri: 'bar'
    }));

    await render(hbs`{{models-table/cell-content-display column=this.column record=this.data}}`);
    assert.equal(this.element.textContent.trim(), 'foo biz baz');

    this.set('column1', {
      propertyName: 'title',
      truncate: true,
      wordLimit: 2
    });

    await render(hbs`{{models-table/cell-content-display column=this.column1 record=this.data}}`);
    assert.equal(this.element.textContent.trim(), 'foo biz ...');
  });
});
