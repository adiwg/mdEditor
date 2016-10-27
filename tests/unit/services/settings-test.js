import {
  moduleFor,
  test
} from 'ember-qunit';

moduleFor('service:settings', 'Unit | Service | settings', {
  // Specify the other units that are required for this test.
  needs: [
    'adapter:application',
    'serializer:application',
    'model:setting'
  ]
});

// Replace this with your real tests.
test('it exists', function (assert) {
  let service = this.subject();
  assert.ok(service);
});
