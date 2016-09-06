import Ember from 'ember';
import DS from 'ember-data';
import {
  moduleFor, test
}
from 'ember-qunit';

moduleFor('serializer:application', 'Unit | Serializer | application', {
  // Specify the other units that are required for this test.
  needs: ['transform:json']
});

test('it serializes records', function (assert) {
  assert.expect(2);

  const { getOwner } = Ember;
  let serializer = this.subject();
  let store = getOwner(this).lookup('service:store');
  let record;
  const expected = {
    "data": {
      "attributes": {
        "name": "foo",
        "skill": "bar",
        "games-played": "[100,200]"
      },
      "type": "tests"
    }
  };
  const data = {
    id: 1,
    name: 'foo',
    skill: 'bar',
    gamesPlayed: [100,200]
  };
  let model = DS.Model.extend({
    name: DS.attr(),
    skill: DS.attr(),
    gamesPlayed: DS.attr('json')
  });

  this.register('model:test', model);

  Ember.run(function () {
    record = store.createRecord('test', data);
  });

  assert.deepEqual(record.serialize(), expected, 'record serialized OK');
  assert.deepEqual(serializer.serialize(record._createSnapshot()), expected,
    'serialized snapshot OK');
});
