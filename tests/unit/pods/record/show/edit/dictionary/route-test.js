import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | record/show/edit/dictionary', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    let route = this.owner.lookup('route:record/show/edit/dictionary');
    assert.ok(route);
  });

  test('model builds selectable dictionary rows from the store', function (assert) {
    const route = this.owner.lookup('route:record/show/edit/dictionary');
    const savedIds = [];

    const rec = {
      json: {
        mdDictionary: ['existing-id'],
      },
    };

    const dictA = {
      json: {
        dictionaryId: 'existing-id',
        dataDictionary: {
          dictionaryId: 'existing-id',
          citation: { title: 'Dict A' },
          description: 'desc A',
          subject: 'subj A',
        },
      },
      save() {},
    };

    const dictB = {
      json: {
        dictionaryId: null,
        dataDictionary: {
          dictionaryId: 'new-id',
          citation: { title: 'Dict B' },
          description: 'desc B',
          subject: 'subj B',
        },
      },
      save() {
        savedIds.push(this.json.dictionaryId);
      },
    };

    route.modelFor = (name) => {
      if (name === 'application') {
        return { findBy: () => [dictA, dictB] };
      }
      return rec;
    };

    const result = route.model();

    assert.strictEqual(result.length, 2);
    assert.strictEqual(result[0].id, 'existing-id');
    assert.strictEqual(result[0].title, 'Dict A');
    assert.strictEqual(result[0].description, 'desc A');
    assert.true(result[0].selected, 'row already in json.mdDictionary is selected');
    assert.false(result[1].selected, 'row absent from json.mdDictionary is not selected');
    assert.ok(
      dictB.json.dictionaryId,
      'assigns a dictionaryId to dicts missing one'
    );
    assert.deepEqual(
      savedIds,
      [dictB.json.dictionaryId],
      'saves only the dict that needed an id assigned'
    );
  });

  test('model defaults a missing json.mdDictionary to an empty array', function (assert) {
    const route = this.owner.lookup('route:record/show/edit/dictionary');
    const rec = { json: {} };

    route.modelFor = (name) => {
      if (name === 'application') {
        return { findBy: () => [] };
      }
      return rec;
    };

    route.model();

    assert.deepEqual(rec.json.mdDictionary, []);
  });

  test('syncSelectedDictionaries persists the selected ids onto json.mdDictionary', function (assert) {
    const route = this.owner.lookup('route:record/show/edit/dictionary');
    const rec = { json: { mdDictionary: ['old-id'] } };

    route.modelFor = () => rec;

    route.syncSelectedDictionaries([{ id: 'a' }, { id: 'b' }]);

    assert.deepEqual(rec.json.mdDictionary, ['a', 'b']);
  });
});
