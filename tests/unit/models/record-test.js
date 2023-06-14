import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

import { run } from '@ember/runloop';

module('Unit | Model | record', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    var model = run(() =>
      this.owner.lookup('service:store').createRecord('record')
    );
    // var store = this.store();
    assert.ok(!!model);
  });

  test('should correctly compute title', function (assert) {
    const me = run(() =>
      this.owner.lookup('service:store').createRecord('record')
    );

    assert.expect(1);
    me.set('json.metadata.resourceInfo.citation.title', 'foo');
    assert.equal(me.get('title'), 'foo');
  });

  test('should correctly compute icon', function (assert) {
    const me = run(() =>
      this.owner.lookup('service:store').createRecord('record')
    );
    const list = this.owner.lookup('service:icon');

    assert.expect(1);
    me.set(
      'json.metadata.resourceInfo.resourceType.firstObject.type',
      'project'
    );
    assert.equal(me.get('icon'), list.get('project'));
  });
});
