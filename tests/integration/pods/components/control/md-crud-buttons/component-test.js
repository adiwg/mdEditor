import { click, find, render, triggerEvent } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | control/md crud buttons', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    assert.expect(3);

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +

    await render(hbs `{{control/md-crud-buttons allowCopy=true allowDelete=true}}`);
    await triggerEvent('.md-crud-buttons', 'mouseenter');

    assert.equal(find('.md-crud-buttons').textContent
      .replace(/[ \n]+/g, '|'), '|Copy|Delete|');

    // Template block usage:" + EOL +
    await render(hbs `
      {{#control/md-crud-buttons doSave=true allowCopy=true}}
        template block text
      {{/control/md-crud-buttons}}
    `);

    assert.equal(find('.md-crud-buttons').textContent
      .replace(/[ \n]+/g, '|'),
      '|Save|Cancel|Copy|template|block|text|', 'block, doSave');

    assert.equal(find('.md-crud-buttons .btn-success').disabled, true, 'save disabled');
  });

  test('should trigger external action', async function(assert) {
    assert.expect(4);

    // test double for the external action
    this.set('externalAction', (type) => {
      assert.ok(type, `${type} called`);
    });

    //enable save and delete
    this.set('model', {
      hasDirtyHash: true,
      canRevert: true
    });

    await render(hbs `{{control/md-crud-buttons model=model doSave=(action externalAction
  'doSave') doCancel=(action externalAction 'doCancel') doCopy=(action
  externalAction 'doCopy') doDelete=(action externalAction 'doDelete') allowCopy=true allowDelete=true}}`);

    // click the buttons
    await click('.md-crud-buttons .btn-success');
    await click('.md-crud-buttons .btn-warning');
    await click('.md-crud-buttons .btn-info');
    //we have to click delete twice to confirm
    await click('.md-crud-buttons .btn-danger');
    await click('.md-crud-buttons .btn-danger');
  });
});
