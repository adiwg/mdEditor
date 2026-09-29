import { findAll, render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | sb settings', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    this.set('model', { publisherEndpoint: '', 'sb-defaultParent': '' });
    this.set('save', () => {});

    await render(hbs`{{sb-settings model=this.model save=this.save}}`);

    assert.equal(findAll('input').length, 2);
  });
});
