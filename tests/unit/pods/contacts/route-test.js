import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

let originalConfirm;

module('Unit | Route | contacts', function(hooks) {
  setupTest(hooks);

  hooks.beforeEach(function() {
    originalConfirm = window.confirm;
  });

  hooks.afterEach(function() {
    window.confirm = originalConfirm;
  });

  test('it exists', function(assert) {
    var route = this.owner.lookup('route:contacts');
    assert.ok(route);
  });
});
