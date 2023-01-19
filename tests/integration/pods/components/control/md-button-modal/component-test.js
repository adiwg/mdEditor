import {
  click,
  find,
  findAll,
  render,
  clearRender
} from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import registerHelper from '../../../../../helpers/modal-asserts';

registerHelper();

module('Integration | Component | control/md button modal', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +

    await render(hbs `{{control/md-button-modal}}`);

    assert.equal(find('.md-button-modal').innerText.trim(), '');

    // Template block usage:" + EOL +
    await render(hbs `
      {{#control/md-button-modal}}
        template block text
      {{/control/md-button-modal}}
    `);

    assert.equal(find('.md-button-modal').innerText.trim(), 'template block text', 'block');
  });

  test('shows modal and performs actions', async function(assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +
    // let modalDialogService = this.owner.lookup('service:modal-dialog');
    // modalDialogService.destinationElementId = 'test-div';

    this.set('externalAction', (type) => {
      assert.ok(type, `${type} called`);
    });

    await render(hbs `
      <div id='test-div'></div>
      {{#control/md-button-modal
          message="Hello" onConfirm=(action externalAction "confirm")
          onCancel=(action externalAction "cancel")}} Test
      {{/control/md-button-modal}}
    `);

    // click the button
    await click('.md-button-modal');

    assert.isPresentOnce('.md-modal-overlay');

    await clearRender();

    await render(hbs `
      <div id='test-div'></div>
      {{#control/md-button-modal
        renderInPlace=true
        message="Hello" onConfirm=(action externalAction "confirm")
        onCancel=(action externalAction "cancel")}} Test
      {{/control/md-button-modal}}
    `);
    // click the button
    await click('.md-button-modal');

    await click('.md-button-modal');

    assert.isAbsent('.md-modal-overlay');


    // click the modal buttons
    await click('.md-button-modal');

    let num = findAll('.md-modal-buttons button').length;
    let i = 0;

    while(i < num) {
      await click(findAll('.md-modal-buttons button')[i]);
      i++;
    }

  });
});
