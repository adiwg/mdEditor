import Ember from 'ember';
import {
  test
} from 'qunit';
import moduleForAcceptance from 'mdeditor/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | pods/contacts');

test('visiting /contacts', function (assert) {
  visit('/contacts');

  andThen(function () {
    assert.equal(currentURL(), '/contacts');
  });
});

test('delete should display a confirm', function (assert) {
  assert.expect(4);

  var store = this.application.__container__.lookup('service:store');

  //make sure there's at least one record visible
  Ember.run(function () {
    store.createRecord('contact');
  });

  visit('/contacts');

  assert.dialogOpensAndCloses({
    openSelector: 'button.md-button-modal.btn-danger:first',
    closeSelector: '.md-modal-overlay button.btn-primary',
    hasOverlay: true
  });

});
