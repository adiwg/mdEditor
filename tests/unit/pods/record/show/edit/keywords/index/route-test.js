import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | record/show/edit/keywords/index', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:record/show/edit/keywords/index');
    assert.ok(route);
  });

  test('model() defaults missing thesaurus fields on each keyword', function (assert) {
    const route = this.owner.lookup(
      'route:record/show/edit/keywords/index'
    );
    const info = {
      keyword: [
        { thesaurus: { identifier: [{ identifier: 'kept' }] } },
        {},
      ],
    };
    const parentModel = {
      get(path) {
        return path === 'json'
          ? { metadata: { resourceInfo: info } }
          : undefined;
      },
    };

    route.modelFor = () => parentModel;

    const result = route.model();

    assert.strictEqual(result, parentModel);

    // Existing thesaurus.identifier is preserved, but sibling fields still
    // get defaulted in.
    assert.deepEqual(info.keyword[0].thesaurus.identifier, [
      { identifier: 'kept' },
    ]);
    assert.deepEqual(info.keyword[0].thesaurus.date, [{}]);
    assert.deepEqual(info.keyword[0].thesaurus.onlineResource, [{}]);

    // A keyword with no thesaurus at all gets fully defaulted.
    assert.deepEqual(info.keyword[1].thesaurus.identifier, [
      { identifier: 'custom' },
    ]);
    assert.deepEqual(info.keyword[1].thesaurus.date, [{}]);
    assert.deepEqual(info.keyword[1].thesaurus.onlineResource, [{}]);
  });
});
