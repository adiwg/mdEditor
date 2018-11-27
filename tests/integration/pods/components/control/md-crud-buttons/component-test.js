import { click, find, render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | control/md crud buttons', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +

    await render(hbs `{{control/md-crud-buttons}}`);

    assert.equal(find('*').textContent
      .replace(/[ \n]+/g, '|'), '|Save|Cancel|Copy|Delete|');

    // Template block usage:" + EOL +
    await render(hbs `
      {{#control/md-crud-buttons}}
        template block text
      {{/control/md-crud-buttons}}
    `);

    assert.equal(find('*').textContent
      .replace(/[ \n]+/g, '|'),
      '|Save|Cancel|Copy|Delete|template|block|text|');
  });

  test('should trigger external action', async function(assert) {
    assert.expect(4);

    // test double for the external action
    this.set('externalAction', (type) => {
      assert.ok(type, `${type} called`);
    });

    await render(hbs `{{control/md-crud-buttons doSave=(action externalAction
  'doSave') doCancel=(action externalAction 'doCancel') doCopy=(action
  externalAction 'doCopy') doDelete=(action externalAction 'doDelete')}}`);

    // click the buttons
    await click('.md-crud-buttons .btn-success');
    await click('.md-crud-buttons .btn-warning');
    await click('.md-crud-buttons .btn-info');
    //we have to click delete twice to confirm
    await click('.md-crud-buttons .btn-danger').click();
  });
});
