import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

let originalConfirm;

module('Unit | Route | dictionaries', function(hooks) {
  setupTest(hooks);

  hooks.beforeEach(function() {
    originalConfirm = window.confirm;
  });

  hooks.afterEach(function() {
    window.confirm = originalConfirm;
  });

  test('it exists', function(assert) {
    var route = this.owner.lookup('route:dictionaries');
    assert.ok(route);
  });

  test('should display a confirm', function(assert) {
    assert.expect(2);
    
    let route = this.owner.lookup('route:dictionaries');
    
    // test _deleteItem to displays the expected window.confirm message
    const expectedTextFoo = 'foo';
    window.confirm = (message) => {
      assert.equal(message, expectedTextFoo, 'expect confirm to display ${expectedTextFoo}');
    };
    route._deleteItem(0, expectedTextFoo);
    
    // test action deleteItem calls _deleteItem and displays a window.confirm
    window.confirm = (message) => {
      assert.ok(message, 'expect confirm to display a message');
    };
    route.send('deleteItem', 0);
    
  });
});

