import { moduleFor, test } from 'ember-qunit';

let originalConfirm;

moduleFor('route:contacts', 'Unit | Route | contacts', {
  beforeEach() {
    originalConfirm = window.confirm;
  },

  afterEach() {
    window.confirm = originalConfirm;
  }
});

test('it exists', function(assert) {
  var route = this.subject();
  assert.ok(route);
});

test('should display a confirm', function(assert) {
  assert.expect(2);

  let route = this.subject();

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
