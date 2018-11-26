import { getOwner } from '@ember/application';
import {
  moduleForModel, test
}
from 'ember-qunit';

moduleForModel('record', 'Unit | Model | record', {
  // Specify the other units that are required for this test.
  needs: ['service:icon']
});

test('it exists', function(assert) {
  var model = this.subject();
  // var store = this.store();
  assert.ok(!!model);
});

test('should correctly compute title', function(assert) {
  const me = this.subject();

  assert.expect(1);
  me.set('json.metadata.resourceInfo.citation.title', 'foo');
  assert.equal(me.get('title'), 'foo');
});

test('should correctly compute icon', function(assert) {
  const me = this.subject();
  const list = getOwner(this)
    .lookup('service:icon');

  assert.expect(1);
  me.set('json.metadata.resourceInfo.resourceType', 'project');
  assert.equal(me.get('icon'), list.get('project'));
});
