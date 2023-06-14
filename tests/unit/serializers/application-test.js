import { run } from '@ember/runloop';
import DS from 'ember-data';
import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Serializer | application', function (hooks) {
  setupTest(hooks);

  test('it serializes records', function (assert) {
    assert.expect(2);

    let serializer = this.owner.lookup('serializer:application');
    let store = this.owner.lookup('service:store');
    let record;
    const expected = {
      data: {
        attributes: {
          name: 'foo',
          skill: 'bar',
          'games-played': '[100,200]',
        },
        type: 'tests',
      },
    };
    const data = {
      id: 1,
      name: 'foo',
      skill: 'bar',
      gamesPlayed: [100, 200],
    };
    let model = DS.Model.extend({
      name: DS.attr(),
      skill: DS.attr(),
      gamesPlayed: DS.attr('json'),
    });

    this.owner.register('model:test', model);

    run(function () {
      record = store.createRecord('test', data);
    });

    assert.deepEqual(record.serialize(), expected, 'record serialized OK');
    assert.deepEqual(
      serializer.serialize(record._createSnapshot()),
      expected,
      'serialized snapshot OK'
    );
  });
});
