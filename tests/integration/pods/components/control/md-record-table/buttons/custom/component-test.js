import { find, render, click } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | control/md record table/buttons/custom', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    assert.expect(2);

    this.set('rec', {
      biz: 'baz'
    });

    this.set('column', {
      buttonConfig: {
        title: 'foobar',
        style: 'warning',
        action: function(rec){
          assert.equal(rec.biz, 'baz', 'action fired');
        }
      }
    });

    // Handle any actions with this.on('myAction', function(val) { ... });

    await render(hbs`{{control/md-record-table/buttons/custom column=column record=rec}}`);

    assert.dom('button.btn-warning').hasText('foobar');

    click('button.btn-warning');
  });
});
