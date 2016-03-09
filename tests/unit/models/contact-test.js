import { moduleForModel, test } from 'ember-qunit';

moduleForModel('contact', 'Unit | Model | contact', {
  // Specify the other units that are required for this test.
  needs: []
});

test('it exists', function(assert) {
  let model = this.subject();
  // var store = this.store();
  assert.ok(!!model);
});

test('should correctly compute title', function(assert) {
  const me = this.subject();

  assert.expect(2);
  me.set('json.individualName', undefined);
  me.set('json.organizationName', 'bar');
  assert.equal(me.get('title'), 'bar');
  me.set('json.individualName', 'foo');
  assert.equal(me.get('title'), 'foo');
});

test('should correctly compute icon', function(assert) {
  const me = this.subject();

  assert.expect(2);
  me.set('json.individualName', undefined);
  me.set('json.organizationName', 'bar');
  assert.equal(me.get('icon'), 'users');
  me.set('json.individualName', 'foo');
  assert.equal(me.get('icon'), 'user');
});
