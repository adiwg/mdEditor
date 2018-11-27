import { click, find, findAll, render } from '@ember/test-helpers';
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

    assert.equal(find('*').textContent
      .trim(), '');

    // Template block usage:" + EOL +
    await render(hbs `
      {{#control/md-button-modal}}
        template block text
      {{/control/md-button-modal}}
    `);

    assert.equal(find('*').textContent
      .trim(), 'template block text');
  });

  test('shows modal and performs actions', async function(assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +
    let modalDialogService = this.owner.lookup('service:modal-dialog');
    modalDialogService.destinationElementId = 'test-div';

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

    let num = findAll('.md-modal-buttons button').length;

    await click('.md-modal-overlay');

    assert.isAbsent('.md-modal-overlay');

    let i = 0;

    // click the modal buttons
    while(i < num) {
      await click('.md-button-modal');
      this.$('.md-modal-buttons button')[i].click();
      i++;
    }

  });
});
