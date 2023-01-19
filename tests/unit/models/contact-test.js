import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

import { run } from '@ember/runloop';

module('Unit | Model | contact', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let model = run(() => this.owner.lookup('service:store').createRecord('contact'));
    // var store = this.store();
    assert.ok(!!model);
  });

  test('should correctly compute title', function(assert) {
    const me = run(() => this.owner.lookup('service:store').createRecord('contact'));

    assert.expect(3);
    me.set('json.name', 'bar');
    me.set('json.positionName', 'foo');
    assert.equal(me.get('title'), 'bar');
    me.set('json.name', null);
    me.set('json.isOrganization', false);
    assert.equal(me.get('title'), 'foo');
    me.set('json.isOrganization', true);
    assert.equal(me.get('title'), null);
  });

  test('should correctly compute icon', function(assert) {
    const me = run(() => this.owner.lookup('service:store').createRecord('contact'));

    assert.expect(2);
    me.set('json.isOrganization', true);
    assert.equal(me.get('icon'), 'users');
    me.set('json.isOrganization', false);
    assert.equal(me.get('icon'), 'user');
  });
});
