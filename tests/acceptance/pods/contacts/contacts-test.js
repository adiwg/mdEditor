import { run } from '@ember/runloop';
import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | pods/contacts', function(hooks) {
  setupApplicationTest(hooks);

  test('visiting /contacts', async function(assert) {
    await visit('/contacts');

    assert.equal(currentURL(), '/contacts');
  });

  test('delete should display a confirm', async function(assert) {
    assert.expect(4);

    var store = this.application.__container__.lookup('service:store');

    //make sure there's at least one record visible
    run(function () {
      store.createRecord('contact');
    });

    await visit('/contacts');

    assert.dialogOpensAndCloses({
      openSelector: 'button.md-button-modal.btn-danger:first',
      closeSelector: '.ember-modal-overlay',
      //closeSelector: '.md-modal-container button.btn-primary',
      hasOverlay: true,
      context: 'html'
    });

  });
});
