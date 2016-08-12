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
