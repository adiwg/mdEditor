import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

import { run } from '@ember/runloop';

module('Unit | Model | dictionary', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    var model = run(() => this.owner.lookup('service:store').createRecord('dictionary'));
    // var store = this.store();
    assert.ok(!!model);
  });

  test('should correctly compute title', function(assert) {
    const me = run(() => this.owner.lookup('service:store').createRecord('dictionary'));

    assert.expect(1);
    me.set('json.dataDictionary.citation.title', 'bar');
    assert.equal(me.get('title'), 'bar');
  });
});
