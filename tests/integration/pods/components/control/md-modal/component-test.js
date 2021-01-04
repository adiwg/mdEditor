import {
  click,
  render
} from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import registerHelper from '../../../../../helpers/modal-asserts';

registerHelper();

module('Integration | Component | control/md modal', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    await render(
      hbs `{{control/md-modal isShowing=true message="The message."}}`);

    assert.ok(document.querySelector('.md-modal-container'));

    assert.dom(document.querySelector('.md-modal-container')).hasText('The message.');
    // Template block usage:
    await render(hbs `
      {{#control/md-modal isShowing=true}}
        template block text
      {{/control/md-modal}}
    `);

    assert.isPresentOnce('.md-modal-overlay');

    assert.dom(document.querySelector('.md-modal-container')).hasText('template block text');
  });

  test('shows modal and performs actions', async function (assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +

    this.showModal=false;

    assert.expect(3);

    this.set('externalAction', (type) => {
      assert.ok(type, `${type} called`);
    });

    await render(hbs `
        {{control/md-button
          class="btn btn-danger"
          icon="times"
          text="Test"
          click=(action (mut showModal) true)
        }}
        {{control/md-modal
          message="The modal message."
          confirm=(action externalAction "confirm")
          showCancel=true
          cancelType="primary"
          showConfirm=true
          confirmLabel="Confirm"
          confirmType="danger"
          isShowing=showModal
          renderInPlace=true
        }}
      `);

    await click('.md-button');

    assert.isAbsent('.md-modal-overlay');

    let num = document.querySelectorAll('.md-modal-buttons button').length;
    let i = 0;

    while(i < num) {
      let el = document.querySelector('.md-modal-buttons').querySelectorAll('button')[i];
      await click(el);
      i++;
    }

    assert.isAbsent('.ember-modal-dialog');
  });
});
